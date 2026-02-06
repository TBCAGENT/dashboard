#!/usr/bin/env python3

import requests
import json
import time
import os
from datetime import datetime

# Load environment
def load_env():
    env = {}
    with open(os.path.expanduser('~/.config/gohighlevel/secrets.env')) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                env[k] = v.strip('"\'')
    
    with open(os.path.expanduser('~/.config/airtable/secrets.env')) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                env[k] = v.strip('"\'')
    return env

# Main mission
def complete_mission():
    env = load_env()
    
    print("🚀 MISSION: COMPLETE 100 DETROIT MESSAGES")
    print(f"⏰ Started: {datetime.now().strftime('%I:%M:%S %p')}")
    print("📝 Already sent: 3 messages (Toni, Bryan, Matt)")
    print("🎯 Target: 97 more messages needed")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    sent_count = 0
    target = 97  # Already sent 3
    
    # Get all contacts in one call
    print("🔍 Getting eligible contacts...")
    
    try:
        response = requests.get(
            f"{env['GHL_BASE_URL']}/contacts/",
            headers=headers,
            params={"locationId": env['GHL_LOCATION_ID'], "limit": 100},
            timeout=30
        )
        
        contacts = response.json().get('contacts', [])
        
        # Filter eligible contacts
        eligible = []
        for c in contacts:
            if (c.get('phone') and c.get('tags') and 
                'detroit' in [t.lower() for t in c['tags']] and
                'sms sent' not in [t.lower() for t in c['tags']]):
                eligible.append(c)
        
        print(f"✅ Found {len(eligible)} eligible contacts")
        
        # Send messages
        for i, contact in enumerate(eligible):
            if sent_count >= target:
                break
                
            name = contact.get('contactName', 'there') or 'there'
            message = template.format(name=name)
            
            print(f"📱 {sent_count+1:2d}/97 - {name}... ", end='', flush=True)
            
            # Send message
            msg_response = requests.post(
                f"{env['GHL_BASE_URL']}/conversations/messages",
                headers=headers,
                json={
                    "type": "SMS",
                    "contactId": contact['id'],
                    "locationId": env['GHL_LOCATION_ID'],
                    "message": message
                },
                timeout=15
            )
            
            if msg_response.status_code in [200, 201]:
                # Add tag
                requests.post(
                    f"{env['GHL_BASE_URL']}/contacts/{contact['id']}/tags",
                    headers=headers,
                    json={"tags": ["SMS sent"]},
                    timeout=10
                )
                
                sent_count += 1
                print("✅")
                
                if sent_count % 10 == 0:
                    print(f"📊 Progress: {sent_count + 3}/100 total messages sent")
                
                time.sleep(1)  # Quick rate limit
                
            else:
                error = msg_response.json().get('message', 'Unknown error')[:30]
                print(f"⏭️ ({error})")
                
    except Exception as e:
        print(f"❌ Error: {e}")
        
    # Update Airtable
    total_sent = sent_count + 3  # Include the 3 already sent
    print(f"\n📊 Updating Airtable tracker...")
    
    try:
        # Get today's record
        airtable_headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
        get_resp = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
            headers=airtable_headers,
            params={"filterByFormula": "IS_SAME(Date,TODAY())"}
        )
        
        if get_resp.status_code == 200:
            records = get_resp.json().get('records', [])
            if records:
                record_id = records[0]['id']
                current = records[0]['fields'].get('Messages Sent', 0)
                new_total = current + sent_count  # Add only new messages sent
                
                update_resp = requests.patch(
                    "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                    headers=airtable_headers,
                    json={"records": [{"id": record_id, "fields": {"Messages Sent": new_total}}]}
                )
                
                if update_resp.status_code in [200, 201]:
                    print(f"✅ Airtable updated: {new_total} total messages today")
                    
    except Exception as e:
        print(f"❌ Airtable error: {e}")
    
    print(f"\n🏁 MISSION RESULTS:")
    print(f"   🎯 Target: 100 messages")
    print(f"   ✅ This session: {sent_count} new messages")
    print(f"   📊 Total today: {total_sent} messages")
    print(f"   🎉 Success: {'YES' if total_sent >= 100 else f'Need {100 - total_sent} more'}")
    print(f"   ⏰ Completed: {datetime.now().strftime('%I:%M:%S %p')}")

if __name__ == "__main__":
    complete_mission()