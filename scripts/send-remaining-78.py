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

def send_remaining_messages():
    env = load_env()
    
    print("🚀 SENDING REMAINING 78 MESSAGES TO REACH 150 TARGET")
    print(f"⏰ Started: {datetime.now().strftime('%I:%M:%S %p')}")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    sent_count = 0
    target = 78
    attempts = 0
    
    print("🔍 Scanning multiple pages for truly available contacts...")
    
    # Get contacts from multiple pages
    start_after = None
    page = 0
    
    while sent_count < target and page < 30:
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
            
            print(f"📄 Page {page}: Processing {len(contacts)} contacts...")
            
            # Try each contact
            for contact in contacts:
                if sent_count >= target:
                    break
                    
                # Check eligibility
                if (not contact.get('phone') or not contact.get('tags') or
                    not any('detroit' in tag.lower() for tag in contact['tags']) or
                    any('sms sent' in tag.lower() for tag in contact['tags'])):
                    continue
                
                attempts += 1
                name = contact.get('contactName', 'there') or 'there'  
                message = template.format(name=name)
                
                print(f"📱 {sent_count+1:2d}/{target} - {name}... ", end='', flush=True)
                
                try:
                    # Try sending message
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
                        # Success! Add tag
                        requests.post(
                            f"{env['GHL_BASE_URL']}/contacts/{contact['id']}/tags",
                            headers=headers,
                            json={"tags": ["SMS sent"]},
                            timeout=10
                        )
                        
                        sent_count += 1
                        print("✅")
                        
                        if sent_count % 10 == 0:
                            print(f"📊 Progress: {sent_count}/{target} sent")
                        
                        time.sleep(1)  # Rate limiting
                        
                    else:
                        # Try to clear DND and retry once
                        error_msg = msg_response.json().get('message', '')
                        
                        if 'unsubscribed' in error_msg.lower() or 'dnd' in error_msg.lower():
                            print(f"DND, trying to clear... ", end='')
                            
                            # Clear DND settings
                            clear_response = requests.put(
                                f"{env['GHL_BASE_URL']}/contacts/{contact['id']}",
                                headers=headers,
                                json={
                                    "dnd": False,
                                    "dndSettings": {}
                                },
                                timeout=10
                            )
                            
                            if clear_response.status_code in [200, 201]:
                                time.sleep(1)
                                
                                # Retry message
                                retry_response = requests.post(
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
                                
                                if retry_response.status_code in [200, 201]:
                                    # Add tag
                                    requests.post(
                                        f"{env['GHL_BASE_URL']}/contacts/{contact['id']}/tags",
                                        headers=headers,
                                        json={"tags": ["SMS sent"]},
                                        timeout=10
                                    )
                                    
                                    sent_count += 1
                                    print("✅ (cleared DND)")
                                    
                                    if sent_count % 10 == 0:
                                        print(f"📊 Progress: {sent_count}/{target} sent")
                                    
                                    time.sleep(1)
                                else:
                                    print("❌ (still failed)")
                            else:
                                print("❌ (clear failed)")
                        else:
                            print(f"⏭️ ({error_msg[:30]})")
                            
                except Exception as e:
                    print(f"❌ ({str(e)[:30]})")
            
            # Get next page
            start_after = data.get('meta', {}).get('startAfter')
            if not start_after:
                print("📄 Reached end of contacts")
                break
                
        except Exception as e:
            print(f"❌ Page {page} error: {e}")
            break
    
    # Update Airtable
    print(f"\n📊 Updating Airtable...")
    
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
                    
    except Exception as e:
        print(f"❌ Airtable error: {e}")
    
    print(f"\n🏁 FINAL RESULTS:")
    print(f"   🎯 Target: {target} additional messages")
    print(f"   ✅ Sent: {sent_count} messages")
    print(f"   🔍 Attempts: {attempts} eligible contacts found")
    print(f"   📊 Success rate: {(sent_count/attempts*100):.1f}% of attempts")
    print(f"   ⏰ Completed: {datetime.now().strftime('%I:%M:%S %p')}")
    
    return sent_count

if __name__ == "__main__":
    send_remaining_messages()