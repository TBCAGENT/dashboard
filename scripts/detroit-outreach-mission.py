#!/usr/bin/env python3

import requests
import json
import time
import os
from datetime import datetime

def load_env():
    env_vars = {}
    
    # Load GHL credentials
    ghl_secrets = os.path.expanduser('~/.config/gohighlevel/secrets.env')
    with open(ghl_secrets) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                env_vars[key] = value.strip('"\'')
    
    # Load Airtable credentials
    airtable_secrets = os.path.expanduser('~/.config/airtable/secrets.env')
    with open(airtable_secrets) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                env_vars[key] = value.strip('"\'')
    
    return env_vars

def achieve_mission():
    """Send 100 Detroit outreach messages - whatever it takes"""
    
    print("🚀 MISSION: 100 ADDITIONAL DETROIT MESSAGES")
    print(f"⏰ Start Time: {datetime.now().strftime('%I:%M:%S %p')}")
    
    env = load_env()
    
    # Message template
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    # API setup
    ghl_headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    # Mission tracking
    sent_count = 0
    target = 100
    attempts = 0
    skipped = 0
    start_after = None
    page = 0
    
    print("🎯 Scanning contacts and sending messages...")
    
    while sent_count < target and page < 100:  # Max 100 pages to prevent infinite loops
        
        # Get contacts batch
        params = {
            "locationId": env['GHL_LOCATION_ID'],
            "limit": 100
        }
        if start_after:
            params["startAfter"] = start_after
            
        try:
            response = requests.get(
                f"{env['GHL_BASE_URL']}/contacts/", 
                headers=ghl_headers,
                params=params,
                timeout=30
            )
            
            if response.status_code != 200:
                print(f"❌ Contact API error: {response.status_code}")
                break
                
            data = response.json()
            contacts = data.get('contacts', [])
            page += 1
            
            if not contacts:
                break
                
            print(f"📄 Page {page}: Processing {len(contacts)} contacts...")
            
            # Process each contact
            for contact in contacts:
                if sent_count >= target:
                    break
                    
                # Must have phone and tags
                if not contact.get('phone') or not contact.get('tags'):
                    continue
                    
                # Check tags
                tags = [tag.lower() for tag in contact['tags']]
                has_detroit = 'detroit' in tags
                has_sms_sent = 'sms sent' in tags
                
                if not (has_detroit and not has_sms_sent):
                    continue
                    
                # Attempt to send
                attempts += 1
                name = contact.get('contactName', 'there') or contact.get('firstName', 'there')
                message = template.replace('{name}', name)
                
                msg_payload = {
                    "type": "SMS",
                    "contactId": contact['id'],
                    "locationId": env['GHL_LOCATION_ID'],
                    "message": message
                }
                
                try:
                    # Send message
                    msg_response = requests.post(
                        f"{env['GHL_BASE_URL']}/conversations/messages",
                        headers=ghl_headers,
                        json=msg_payload,
                        timeout=15
                    )
                    
                    if msg_response.status_code in [200, 201]:
                        # Success! Add SMS sent tag
                        tag_payload = {"tags": ["SMS sent"]}
                        requests.post(
                            f"{env['GHL_BASE_URL']}/contacts/{contact['id']}/tags",
                            headers=ghl_headers,
                            json=tag_payload,
                            timeout=15
                        )
                        
                        sent_count += 1
                        print(f"   ✅ {sent_count:3d}/100 - {name} ({contact['phone']})")
                        
                        # Rate limiting - 12 seconds between successful sends
                        time.sleep(12)
                        
                    else:
                        # Failed - probably DND/unsubscribed
                        skipped += 1
                        error_data = msg_response.json() if msg_response.text else {}
                        error_msg = error_data.get('message', 'Unknown error')
                        
                        if 'unsubscribed' in error_msg.lower() or 'dnd' in error_msg.lower():
                            print(f"   ⏭️ Skipped {name} (unsubscribed/DND)")
                        else:
                            print(f"   ❌ Failed {name}: {error_msg[:50]}")
                            
                except Exception as e:
                    skipped += 1
                    print(f"   ❌ Exception for {name}: {str(e)[:50]}")
                    
            # Get next page
            start_after = data.get('meta', {}).get('startAfter')
            if not start_after:
                print("📄 Reached end of contacts")
                break
                
        except Exception as e:
            print(f"❌ Page {page} error: {str(e)[:100]}")
            break
    
    # Update Airtable tracker
    print(f"\n📊 Updating Airtable outreach tracker...")
    
    try:
        airtable_headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
        
        # Get today's record
        get_response = requests.get(
            f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
            headers=airtable_headers,
            params={"filterByFormula": "IS_SAME(Date,TODAY())"},
            timeout=15
        )
        
        if get_response.status_code == 200:
            records = get_response.json().get('records', [])
            if records:
                record_id = records[0]['id']
                current_sent = records[0]['fields'].get('Messages Sent', 0)
                new_total = current_sent + sent_count
                
                # Update the record
                update_payload = {
                    "records": [{
                        "id": record_id,
                        "fields": {"Messages Sent": new_total}
                    }]
                }
                
                update_response = requests.patch(
                    f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                    headers=airtable_headers,
                    json=update_payload,
                    timeout=15
                )
                
                if update_response.status_code in [200, 201]:
                    print(f"✅ Airtable updated: {new_total} total messages today")
                else:
                    print(f"❌ Airtable update failed: {update_response.status_code}")
            else:
                print("❌ No today's record found in Airtable")
        else:
            print(f"❌ Failed to get Airtable record: {get_response.status_code}")
            
    except Exception as e:
        print(f"❌ Airtable error: {str(e)}")
    
    # Mission results
    print(f"\n🏁 MISSION COMPLETE!")
    print(f"   🎯 Target: {target} messages")
    print(f"   ✅ Sent: {sent_count} messages")
    print(f"   ⏭️ Skipped: {skipped} (DND/errors)")
    print(f"   🔍 Attempts: {attempts} eligible contacts found")
    print(f"   📄 Pages scanned: {page}")
    print(f"   ⏰ Completed: {datetime.now().strftime('%I:%M:%S %p')}")
    
    success_rate = (sent_count / attempts * 100) if attempts > 0 else 0
    print(f"   📊 Success rate: {success_rate:.1f}%")
    
    if sent_count >= target:
        print(f"   🎉 MISSION SUCCESS: {sent_count}/{target} messages sent!")
    else:
        print(f"   ⚠️ Partial success: {sent_count}/{target} messages sent")
        
    return sent_count

if __name__ == "__main__":
    achieve_mission()