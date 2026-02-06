#!/usr/bin/env python3

import requests
import json
import time
import os
from datetime import datetime

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

def final_push():
    env = load_env()
    
    print("🚀 FINAL PUSH: 28 MORE MESSAGES TO REACH 100 TOTAL")
    print(f"⏰ Started: {datetime.now().strftime('%I:%M:%S %p')}")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    sent_count = 0
    target = 28
    start_after = None
    page = 0
    
    print("🔍 Scanning multiple pages for eligible contacts...")
    
    # Scan multiple pages to find enough contacts
    eligible_contacts = []
    
    while len(eligible_contacts) < target * 2 and page < 20:  # Get extras, max 20 pages
        params = {"locationId": env['GHL_LOCATION_ID'], "limit": 100}
        if start_after:
            params["startAfter"] = start_after
            
        try:
            response = requests.get(
                f"{env['GHL_BASE_URL']}/contacts/",
                headers=headers,
                params=params,
                timeout=30
            )
            
            if response.status_code != 200:
                break
                
            data = response.json()
            contacts = data.get('contacts', [])
            page += 1
            
            if not contacts:
                break
            
            # Filter eligible contacts from this page
            page_eligible = 0
            for c in contacts:
                if (c.get('phone') and c.get('tags') and 
                    'detroit' in [t.lower() for t in c['tags']] and
                    'sms sent' not in [t.lower() for t in c['tags']]):
                    eligible_contacts.append(c)
                    page_eligible += 1
            
            print(f"📄 Page {page}: Found {page_eligible} eligible contacts (Total: {len(eligible_contacts)})")
            
            start_after = data.get('meta', {}).get('startAfter')
            if not start_after:
                break
                
        except Exception as e:
            print(f"❌ Page {page} error: {e}")
            break
    
    print(f"✅ Total eligible contacts found: {len(eligible_contacts)}")
    
    if len(eligible_contacts) < target:
        print(f"⚠️ Only found {len(eligible_contacts)} contacts, will send to all available")
        target = len(eligible_contacts)
    
    # Send messages to eligible contacts
    for i, contact in enumerate(eligible_contacts):
        if sent_count >= target:
            break
            
        name = contact.get('contactName', 'there') or 'there'
        message = template.format(name=name)
        
        print(f"📱 {sent_count+1:2d}/{target} - {name}... ", end='', flush=True)
        
        try:
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
                    print(f"📊 Progress: {sent_count}/{target} messages sent")
                
                time.sleep(1)
                
            else:
                error = msg_response.json().get('message', 'Unknown error')[:30]
                print(f"⏭️ ({error})")
                
        except Exception as e:
            print(f"❌ ({str(e)[:30]})")
    
    # Update Airtable
    print(f"\n📊 Updating Airtable tracker...")
    
    try:
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
                new_total = current + sent_count
                
                update_resp = requests.patch(
                    "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                    headers=airtable_headers,
                    json={"records": [{"id": record_id, "fields": {"Messages Sent": new_total}}]}
                )
                
                if update_resp.status_code in [200, 201]:
                    print(f"✅ Airtable updated: {new_total} total messages today")
                    
                    print(f"\n🏁 FINAL MISSION RESULTS:")
                    print(f"   🎯 Target: 100 messages")
                    print(f"   ✅ Final push: {sent_count} messages")
                    print(f"   📊 Grand total: {new_total} messages today")
                    
                    if new_total >= 100:
                        print(f"   🎉 MISSION ACCOMPLISHED! 100+ messages sent!")
                    else:
                        print(f"   📈 Progress: {new_total}/100 ({100-new_total} still needed)")
                        
    except Exception as e:
        print(f"❌ Airtable error: {e}")
    
    print(f"⏰ Completed: {datetime.now().strftime('%I:%M:%S %p')}")

if __name__ == "__main__":
    final_push()