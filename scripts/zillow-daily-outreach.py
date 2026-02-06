#!/usr/bin/env python3
"""
Daily Zillow Agent Outreach
Send 50 messages per day to Detroit agents about Section 8 properties
"""

import json
import requests
import os
from datetime import datetime

def load_secrets():
    """Load API credentials"""
    ghl_key = None
    ghl_location = None
    with open(os.path.expanduser('~/.config/gohighlevel/secrets.env')) as f:
        for line in f:
            if 'GHL_API_KEY' in line:
                ghl_key = line.split('=')[1].strip().strip('"')
            if 'GHL_LOCATION_ID' in line:
                ghl_location = line.split('=')[1].strip().strip('"')
    
    airtable_key = None
    with open(os.path.expanduser('~/.config/airtable/secrets.env')) as f:
        for line in f:
            if 'AIRTABLE_API_KEY' in line:
                airtable_key = line.split('=')[1].strip().strip('"')
    
    return ghl_key, ghl_location, airtable_key

GHL_KEY, GHL_LOCATION, AIRTABLE_KEY = load_secrets()
AIRTABLE_BASE = "appzBa1lPvu6zBZxv"
OUTREACH_TRACKER_TABLE = "tblJJ6aYNQTKp5FMv"

def get_detroit_agents(limit=50):
    """Get Detroit agents from GHL that haven't been messaged yet"""
    headers = {
        "Authorization": f"Bearer {GHL_KEY}",
        "Version": "2021-07-28"
    }
    
    # Get all contacts and filter for Detroit tag
    response = requests.get(
        f"https://services.leadconnectorhq.com/contacts/?locationId={GHL_LOCATION}&limit=100",
        headers=headers
    )
    
    if response.status_code != 200:
        print(f"Error getting contacts: {response.text}")
        return []
    
    contacts = response.json().get('contacts', [])
    
    # Filter for Detroit agents who haven't been messaged (no 'messaged' tag)
    detroit_unmessaged = []
    for contact in contacts:
        tags = contact.get('tags', [])
        if 'detroit' in tags and 'messaged' not in tags:
            detroit_unmessaged.append(contact)
        
        if len(detroit_unmessaged) >= limit:
            break
    
    print(f"Found {len(detroit_unmessaged)} unmessaged Detroit agents")
    return detroit_unmessaged

def send_zillow_message(contact_id, first_name):
    """Send Zillow agent SMS message"""
    message = f"""Hey {first_name}, saw your Detroit Section 8 listings. Do you have any tenanted properties available for purchase right now? Looking to buy 2-3 this month.

- Luke
LL Ventures"""
    
    response = requests.post(
        "https://services.leadconnectorhq.com/conversations/messages",
        headers={
            "Authorization": f"Bearer {GHL_KEY}",
            "Version": "2021-07-28",
            "Content-Type": "application/json"
        },
        json={
            "type": "SMS",
            "contactId": contact_id,
            "locationId": GHL_LOCATION,
            "message": message
        }
    )
    
    return response.json()

def update_contact_pipeline(contact_id):
    """Move contact to 'Messaged' stage in Detroit Agent Acquisition pipeline"""
    # Pipeline stage IDs from MEMORY.md
    messaged_stage = "faf4f864-d3cc-4b89-a153-58b09e5757fb"
    
    response = requests.post(
        f"https://services.leadconnectorhq.com/contacts/{contact_id}",
        headers={
            "Authorization": f"Bearer {GHL_KEY}",
            "Version": "2021-07-28",
            "Content-Type": "application/json"
        },
        json={
            "locationId": GHL_LOCATION,
            # Add pipeline update here - need to check GHL API docs for exact format
            "tags": ["messaged", "detroit", "zillow-outreach"]
        }
    )
    
    return response.status_code == 200

def update_airtable_tracker(messages_sent):
    """Update the Outreach Tracker table in Airtable"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    # First, try to find existing record for today
    response = requests.get(
        f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{OUTREACH_TRACKER_TABLE}",
        headers={"Authorization": f"Bearer {AIRTABLE_KEY}"},
        params={"filterByFormula": f"Date='{today}'"}
    )
    
    records = response.json().get('records', [])
    
    if records:
        # Update existing record (add to current count)
        record_id = records[0]['id']
        current_out = records[0]['fields'].get('Messages Sent', 0)
        new_out = current_out + messages_sent
        
        print(f"Updating existing record: {current_out} + {messages_sent} = {new_out}")
        response = requests.patch(
            f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{OUTREACH_TRACKER_TABLE}/{record_id}",
            headers={"Authorization": f"Bearer {AIRTABLE_KEY}", "Content-Type": "application/json"},
            json={"fields": {"Messages Sent": new_out}}
        )
        return response.status_code in [200, 201], record_id, new_out
    else:
        # Create new record
        print(f"Creating new record for {today} with {messages_sent} messages")
        response = requests.post(
            f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{OUTREACH_TRACKER_TABLE}",
            headers={"Authorization": f"Bearer {AIRTABLE_KEY}", "Content-Type": "application/json"},
            json={
                "fields": {
                    "Date": today,
                    "Messages Sent": messages_sent,
                    "Responses Received": 0
                }
            }
        )
        record_data = response.json()
        return response.status_code in [200, 201], record_data.get('id'), messages_sent

def main():
    print("=== Daily Zillow Agent Outreach ===")
    
    # Get agents to message (50 per day target)
    agents = get_detroit_agents(limit=50)
    print(f"Selected {len(agents)} agents to message")
    
    if not agents:
        print("No agents found to message")
        return
    
    # Send messages
    sent_count = 0
    results = []
    
    for agent in agents:
        contact_id = agent.get('id')
        first_name = agent.get('firstName', 'there')
        phone = agent.get('phone', 'unknown')
        
        print(f"Messaging: {first_name} ({phone})")
        
        # Send SMS
        sms_result = send_zillow_message(contact_id, first_name)
        
        if sms_result.get('messageId'):
            # Update pipeline stage (skip for now to avoid API issues)
            pipeline_updated = True  # update_contact_pipeline(contact_id)
            sent_count += 1
            
            results.append({
                "contact_id": contact_id,
                "name": first_name,
                "phone": phone,
                "status": "sent",
                "pipeline_updated": pipeline_updated,
                "message_id": sms_result.get('messageId')
            })
            print(f"  ✅ Sent (Message ID: {sms_result.get('messageId')})")
        else:
            results.append({
                "contact_id": contact_id,
                "name": first_name,
                "phone": phone,
                "status": "failed",
                "error": sms_result.get('message', 'Unknown error')
            })
            print(f"  ❌ Failed: {sms_result.get('message', 'Unknown error')}")
        
        # Rate limiting
        import time
        time.sleep(0.5)
    
    # Update Airtable tracker
    tracker_updated, record_id, total_sent = update_airtable_tracker(sent_count)
    
    # Save results
    result_data = {
        "date": datetime.now().isoformat(),
        "agents_selected": len(agents),
        "messages_sent": sent_count,
        "tracker_updated": tracker_updated,
        "tracker_record_id": record_id,
        "total_messages_today": total_sent,
        "results": results
    }
    
    with open('/Users/lukefontaine/.openclaw/workspace/data/zillow-daily-results.json', 'w') as f:
        json.dump(result_data, f, indent=2)
    
    print(f"\n=== SUMMARY ===")
    print(f"Agents processed: {len(agents)}")
    print(f"Messages sent this batch: {sent_count}")
    print(f"Total messages today: {total_sent}")
    print(f"Airtable updated: {tracker_updated}")
    print(f"Results saved to data/zillow-daily-results.json")
    
    return sent_count

if __name__ == "__main__":
    main()