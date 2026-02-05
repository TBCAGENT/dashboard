#!/usr/bin/env python3
"""
Cold Outreach SMS Sender
- Sends cold outreach messages to Detroit agents
- Creates opportunities in GHL pipeline (Messaged stage)
- Tracks state to avoid re-messaging
- Logs to Airtable Outreach Tracker
- Respects SMS hours (6am-4pm PST)
"""

import requests
import os
import json
from datetime import datetime

# === CONFIG ===
GHL_LOCATION_ID = 'a0xDUfSzadt256BbUcgz'
GHL_PIPELINE_ID = 'BKe2BFND6pmC5klqMbl8'
GHL_MESSAGED_STAGE = 'faf4f864-d3cc-4b89-a153-58b09e5757fb'

AIRTABLE_BASE = 'appzBa1lPvu6zBZxv'
TRACKER_TABLE = 'tblJJ6aYNQTKp5FMv'

STATE_FILE = os.path.expanduser('~/.openclaw/workspace/data/cold-outreach-state.json')

TEMPLATE = "Hey {first_name}, just following up. Do you have any Section 8 tenanted rentals in Detroit right now? Looking to buy another 2-3 this month."

def load_env(path):
    env = {}
    path = os.path.expanduser(path)
    if os.path.exists(path):
        with open(path) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, val = line.strip().split('=', 1)
                    env[key] = val.strip('"\'')
    return env

def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {'messaged_contacts': [], 'total_sent': 0, 'today_date': None, 'today_sent': 0}

def save_state(state):
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2)

def update_outreach_tracker(airtable_key, messages_sent):
    """Update or create today's record in Outreach Tracker"""
    headers = {
        'Authorization': f'Bearer {airtable_key}',
        'Content-Type': 'application/json'
    }
    
    today = datetime.now().strftime('%Y-%m-%d')
    
    r = requests.get(
        f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{TRACKER_TABLE}",
        headers=headers,
        params={'filterByFormula': f"{{Date}}='{today}'"}
    )
    existing = r.json().get('records', [])
    
    if existing:
        rec_id = existing[0]['id']
        current = existing[0]['fields'].get('Messages Sent', 0)
        requests.patch(
            f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{TRACKER_TABLE}/{rec_id}",
            headers=headers,
            json={'fields': {'Messages Sent': current + messages_sent}}
        )
    else:
        requests.post(
            f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{TRACKER_TABLE}",
            headers=headers,
            json={'records': [{
                'fields': {
                    'Date': today,
                    'Messages Sent': messages_sent,
                    'Responses Received': 0,
                    'Deals Surfaced': 0,
                    'Approvals Pending': 0
                }
            }]}
        )

def create_opportunity(ghl_headers, contact_id, contact_name):
    """Create opportunity in GHL pipeline for messaged contact"""
    r = requests.post(
        "https://services.leadconnectorhq.com/opportunities/",
        headers=ghl_headers,
        json={
            'locationId': GHL_LOCATION_ID,
            'pipelineId': GHL_PIPELINE_ID,
            'pipelineStageId': GHL_MESSAGED_STAGE,
            'contactId': contact_id,
            'name': contact_name,
            'status': 'open'
        }
    )
    return r.status_code in [200, 201]

def send_cold_outreach(count=13):
    """Send cold outreach messages to Detroit agents"""
    
    # Check SMS hours (6am-4pm PST)
    hour = datetime.now().hour
    if hour < 6 or hour >= 16:
        print("❌ Outside SMS hours (6am-4pm PST) - not sending")
        return 0
    
    # Load credentials
    ghl = load_env('~/.config/gohighlevel/secrets.env')
    airtable = load_env('~/.config/airtable/secrets.env')
    
    GHL_API_KEY = ghl.get('GHL_API_KEY')
    AIRTABLE_API_KEY = airtable.get('AIRTABLE_API_KEY')
    
    if not GHL_API_KEY:
        print("❌ Missing GHL_API_KEY")
        return 0
    
    ghl_headers = {
        'Authorization': f'Bearer {GHL_API_KEY}',
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
    }
    
    # Load state
    state = load_state()
    messaged = set(state.get('messaged_contacts', []))
    
    # Reset daily counter if new day
    today = datetime.now().strftime('%Y-%m-%d')
    if state.get('today_date') != today:
        state['today_date'] = today
        state['today_sent'] = 0
    
    print(f"📱 Cold Outreach - {datetime.now().strftime('%I:%M %p')}")
    print(f"Previously messaged: {len(messaged)} contacts")
    print(f"Today's sent: {state.get('today_sent', 0)}")
    
    # Get contacts with detroit tag
    r = requests.get(
        "https://services.leadconnectorhq.com/contacts/",
        headers=ghl_headers,
        params={'locationId': GHL_LOCATION_ID, 'limit': 100}
    )
    all_contacts = r.json().get('contacts', [])
    
    # Filter for unmessaged detroit contacts
    eligible = [
        c for c in all_contacts 
        if c['id'] not in messaged 
        and c.get('phone') 
        and 'detroit' in c.get('tags', [])
    ]
    
    print(f"Eligible contacts: {len(eligible)}\n")
    
    # Send messages
    sent = 0
    for c in eligible[:count]:
        first_name = c.get('firstName') or 'there'
        last_name = c.get('lastName') or ''
        contact_name = f"{first_name} {last_name}".strip() or 'Unknown'
        message = TEMPLATE.format(first_name=first_name)
        
        r = requests.post(
            "https://services.leadconnectorhq.com/conversations/messages",
            headers=ghl_headers,
            json={'type': 'SMS', 'contactId': c['id'], 'message': message}
        )
        
        # Accept both 200 and 201 as success
        if r.status_code in [200, 201]:
            print(f"✓ {sent+1}. {contact_name} ({c['phone']})")
            state['messaged_contacts'].append(c['id'])
            sent += 1
            
            # Create opportunity in GHL pipeline
            if create_opportunity(ghl_headers, c['id'], contact_name):
                print(f"   → Added to pipeline (Messaged)")
        else:
            resp = r.json() if r.text else {}
            if 'DND' in str(resp):
                print(f"⚠ {first_name}: DND active, skipped")
            else:
                print(f"✗ {first_name}: {r.status_code}")
    
    # Update state
    state['total_sent'] = state.get('total_sent', 0) + sent
    state['today_sent'] = state.get('today_sent', 0) + sent
    save_state(state)
    
    # Update Airtable tracker
    if sent > 0 and AIRTABLE_API_KEY:
        update_outreach_tracker(AIRTABLE_API_KEY, sent)
        print(f"   → Airtable Outreach Tracker updated")
    
    print(f"\n{'='*40}")
    print(f"🚀 Sent: {sent} | Today: {state['today_sent']} | All-time: {state['total_sent']}")
    
    return sent

if __name__ == '__main__':
    import sys
    count = int(sys.argv[1]) if len(sys.argv) > 1 else 13
    send_cold_outreach(count)
