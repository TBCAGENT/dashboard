#!/usr/bin/env python3
"""
SMS Acquisition Engine for Detroit Section 8 Agent Outreach
Handles: outbound drip, response monitoring, Airtable approval workflow
"""

import os
import json
import requests
import random
from datetime import datetime, timedelta
from pathlib import Path

# Load credentials
def load_env(path):
    env = {}
    if os.path.exists(path):
        with open(path) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, val = line.strip().split('=', 1)
                    env[key] = val.strip('"\'')
    return env

GHL = load_env(os.path.expanduser('~/.config/gohighlevel/secrets.env'))
AIRTABLE = load_env(os.path.expanduser('~/.config/airtable/secrets.env'))

GHL_API_KEY = GHL.get('GHL_API_KEY')
GHL_LOCATION_ID = GHL.get('GHL_LOCATION_ID', 'a0xDUfSzadt256BbUcgz')
AIRTABLE_API_KEY = AIRTABLE.get('AIRTABLE_API_KEY')

# Airtable config
AIRTABLE_BASE = 'appzBa1lPvu6zBZxv'
AGENT_RESPONSES_TABLE = 'tblwRwbKogqQnRXtC'
OUTREACH_TRACKER_TABLE = 'tblJJ6aYNQTKp5FMv'
SMS_TEMPLATES_TABLE = 'tblWBmLI6D3B6PMFj'

# GHL config
DETROIT_TAG_ID = 'YwjFycYqAdyZnkCuufXv'
PIPELINE_ID = 'BKe2BFND6pmC5klqMbl8'
STAGES = {
    'fresh_lead': '2c68f86b-5c2c-45f4-a824-94d62842076b',
    'messaged': 'faf4f864-d3cc-4b89-a153-58b09e5757fb',
    'response_received': '3c1b7c53-c28d-4907-a350-35b98f39fd1e',
    'sent_deal': 'eaa7a302-f1a1-4ea2-ad7c-9b5eee72392e',
    'follow_up_later': '289e899c-4d6c-463c-a3eb-5471a5c73015',
    'not_interested': '846fb1e6-79a8-4667-b112-b475082a23e2',
    'agent_no_longer_active': '7ce77eb6-98cd-4f4d-b45c-d68cdfa00c18'
}

# State file for tracking
STATE_FILE = os.path.expanduser('~/.openclaw/workspace/data/sms-outreach-state.json')

def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {
        'messaged_contacts': [],
        'last_response_check': None,
        'messages_sent_today': 0,
        'today_date': None
    }

def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2)

def ghl_request(method, endpoint, data=None):
    """Make GHL API request"""
    url = f"https://services.leadconnectorhq.com{endpoint}"
    headers = {
        'Authorization': f'Bearer {GHL_API_KEY}',
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
    }
    if method == 'GET':
        r = requests.get(url, headers=headers, params=data)
    else:
        r = requests.request(method, url, headers=headers, json=data)
    return r.json()

def airtable_request(method, table, data=None, record_id=None):
    """Make Airtable API request"""
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{table}"
    if record_id:
        url += f"/{record_id}"
    headers = {
        'Authorization': f'Bearer {AIRTABLE_API_KEY}',
        'Content-Type': 'application/json'
    }
    if method == 'GET':
        r = requests.get(url, headers=headers, params=data)
    else:
        r = requests.request(method, url, headers=headers, json=data)
    return r.json()

def get_approved_template():
    """Get the approved outreach template"""
    result = airtable_request('GET', SMS_TEMPLATES_TABLE, {
        'filterByFormula': "AND({Use Case}='Initial Outreach', {Approved}='Approved')"
    })
    records = result.get('records', [])
    if records:
        return records[0]['fields'].get('Message Text', '')
    return None

def get_unmessaged_detroit_contacts(limit=50):
    """Get Detroit-tagged contacts who haven't been messaged yet"""
    state = load_state()
    messaged = set(state.get('messaged_contacts', []))
    
    # Get contacts with detroit tag
    result = ghl_request('GET', '/contacts/', {
        'locationId': GHL_LOCATION_ID,
        'limit': 100,
        'query': 'detroit'  # Search by tag
    })
    
    contacts = []
    for c in result.get('contacts', []):
        if c['id'] not in messaged and c.get('phone'):
            # Check if has detroit tag
            tags = [t.lower() for t in c.get('tags', [])]
            if 'detroit' in tags:
                contacts.append({
                    'id': c['id'],
                    'name': f"{c.get('firstName', '')} {c.get('lastName', '')}".strip(),
                    'firstName': c.get('firstName', ''),
                    'phone': c.get('phone', '')
                })
                if len(contacts) >= limit:
                    break
    
    return contacts

def send_sms(contact_id, message):
    """Send SMS via GHL"""
    result = ghl_request('POST', '/conversations/messages', {
        'type': 'SMS',
        'contactId': contact_id,
        'message': message
    })
    return result

def update_pipeline_stage(contact_id, stage_key):
    """Update contact's pipeline stage"""
    # First check if opportunity exists, if not create one
    opps = ghl_request('GET', '/opportunities/search', {
        'location_id': GHL_LOCATION_ID,
        'contact_id': contact_id,
        'pipeline_id': PIPELINE_ID
    })
    
    if opps.get('opportunities'):
        opp_id = opps['opportunities'][0]['id']
        ghl_request('PUT', f'/opportunities/{opp_id}', {
            'pipelineStageId': STAGES[stage_key]
        })
    else:
        # Create new opportunity
        ghl_request('POST', '/opportunities/', {
            'pipelineId': PIPELINE_ID,
            'pipelineStageId': STAGES[stage_key],
            'locationId': GHL_LOCATION_ID,
            'contactId': contact_id,
            'name': 'Detroit Agent Outreach',
            'status': 'open'
        })

def send_daily_outbound(count=25):
    """Send outbound messages to unmessaged contacts"""
    state = load_state()
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Reset daily counter if new day
    if state.get('today_date') != today:
        state['messages_sent_today'] = 0
        state['today_date'] = today
    
    # Check if we've hit daily limit
    remaining = count - state['messages_sent_today']
    if remaining <= 0:
        print(f"Daily limit reached ({count} messages)")
        return 0
    
    template = get_approved_template()
    if not template:
        print("ERROR: No approved template found")
        return 0
    
    contacts = get_unmessaged_detroit_contacts(limit=remaining)
    sent = 0
    
    for contact in contacts:
        # Personalize message
        first_name = contact['firstName'] or 'there'
        message = template.replace('[First Name]', first_name)
        
        # Send SMS
        result = send_sms(contact['id'], message)
        
        if result.get('messageId') or result.get('conversationId'):
            print(f"✓ Sent to {contact['name']} ({contact['phone']})")
            state['messaged_contacts'].append(contact['id'])
            state['messages_sent_today'] += 1
            sent += 1
            
            # Update pipeline
            update_pipeline_stage(contact['id'], 'messaged')
        else:
            print(f"✗ Failed: {contact['name']} - {result}")
    
    save_state(state)
    print(f"\nSent {sent} messages today (total: {state['messages_sent_today']})")
    return sent

def draft_reply(agent_message, agent_name):
    """Generate a casual draft reply based on agent's message"""
    msg_lower = agent_message.lower()
    
    # Not interested responses
    if any(x in msg_lower for x in ['not at the moment', 'no', 'nothing right now', "don't have", 'dont have']):
        return f"no worries, appreciate you getting back to me. ill check back in a few weeks"
    
    # Has something responses
    if any(x in msg_lower for x in ['yes', 'i have', 'i do', 'got one', 'got a few', 'might have']):
        return f"awesome, whats the address and rent amount"
    
    # Asking who this is
    if any(x in msg_lower for x in ['who is this', 'who are you', "who's this"]):
        return f"arthur, i buy section 8 rentals in detroit. you have anything right now"
    
    # Price/details shared
    if '$' in agent_message or any(x in msg_lower for x in ['rent is', 'asking', 'listed at']):
        return f"got it, can you send me the address and any pics you have"
    
    # Address shared
    if any(x in msg_lower for x in ['street', 'ave', 'rd', 'detroit', 'mi 48']):
        return f"thanks, whats the monthly rent on this one"
    
    # Default - keep conversation going
    return f"thanks for getting back. do you have any section 8 tenanted properties available right now"

def check_responses():
    """Check for new inbound SMS responses and add to Airtable"""
    state = load_state()
    last_check = state.get('last_response_check')
    
    # Get recent SMS conversations
    result = ghl_request('GET', '/conversations/search', {
        'locationId': GHL_LOCATION_ID,
        'limit': 50
    })
    
    new_responses = []
    
    for convo in result.get('conversations', []):
        if convo.get('lastMessageType') != 'TYPE_SMS':
            continue
        if convo.get('unreadCount', 0) == 0:
            continue
            
        # Get messages to find inbound ones
        msgs = ghl_request('GET', f"/conversations/{convo['id']}/messages", {'limit': 5})
        
        for msg in msgs.get('messages', {}).get('messages', []):
            if msg.get('direction') == 'inbound' and msg.get('messageType') == 'TYPE_SMS':
                contact_id = convo.get('contactId')
                contact_name = convo.get('contactName', 'Unknown')
                phone = convo.get('phone', '')
                agent_message = msg.get('body', '')
                
                # Check if already in Airtable
                existing = airtable_request('GET', AGENT_RESPONSES_TABLE, {
                    'filterByFormula': f"{{GHL Contact ID}}='{contact_id}'"
                })
                
                if not existing.get('records'):
                    # Draft a reply
                    draft = draft_reply(agent_message, contact_name)
                    
                    # Add to Airtable
                    airtable_request('POST', AGENT_RESPONSES_TABLE, {
                        'records': [{
                            'fields': {
                                'Agent Name': contact_name,
                                'Phone': phone,
                                'Agent Message': agent_message,
                                'Arthur Draft Reply': draft,
                                'Status': 'Pending Review',
                                'GHL Contact ID': contact_id
                            }
                        }]
                    })
                    
                    # Update pipeline
                    update_pipeline_stage(contact_id, 'response_received')
                    
                    new_responses.append({
                        'name': contact_name,
                        'message': agent_message,
                        'draft': draft
                    })
                    print(f"✓ New response from {contact_name}: {agent_message[:50]}...")
                break  # Only process most recent message
    
    state['last_response_check'] = datetime.now().isoformat()
    save_state(state)
    
    return new_responses

def send_approved_replies():
    """Check Airtable for approved replies and send them"""
    # Get approved records
    result = airtable_request('GET', AGENT_RESPONSES_TABLE, {
        'filterByFormula': "{Status}='Approved'"
    })
    
    sent = 0
    for record in result.get('records', []):
        fields = record['fields']
        contact_id = fields.get('GHL Contact ID')
        reply = fields.get('Arthur Draft Reply', '')
        
        if contact_id and reply:
            # Send the message
            result = send_sms(contact_id, reply)
            
            if result.get('messageId') or result.get('conversationId'):
                # Update Airtable status to Sent
                airtable_request('PATCH', AGENT_RESPONSES_TABLE, {
                    'fields': {'Status': 'Sent'}
                }, record['id'])
                
                print(f"✓ Sent approved reply to {fields.get('Agent Name')}")
                sent += 1
            else:
                print(f"✗ Failed to send to {fields.get('Agent Name')}: {result}")
    
    return sent

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: sms-acquisition-engine.py [outbound|check|send-approved|status]")
        sys.exit(1)
    
    action = sys.argv[1]
    
    if action == 'outbound':
        count = int(sys.argv[2]) if len(sys.argv) > 2 else 25
        send_daily_outbound(count)
    
    elif action == 'check':
        responses = check_responses()
        if responses:
            print(f"\n{len(responses)} new responses added to Airtable for review")
        else:
            print("No new responses")
    
    elif action == 'send-approved':
        sent = send_approved_replies()
        print(f"Sent {sent} approved replies")
    
    elif action == 'status':
        state = load_state()
        print(f"Messages sent today: {state.get('messages_sent_today', 0)}")
        print(f"Total contacts messaged: {len(state.get('messaged_contacts', []))}")
        print(f"Last response check: {state.get('last_response_check', 'Never')}")
    
    else:
        print(f"Unknown action: {action}")

if __name__ == '__main__':
    main()
