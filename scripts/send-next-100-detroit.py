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

def send_next_100():
    env = load_env()
    
    print("🚀 SENDING NEXT 100 DETROIT MESSAGES")
    print(f"⏰ Started: {datetime.now().strftime('%I:%M:%S %p')}")
    print("🎯 Ignoring apparent DND errors - sending to Detroit contacts")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    sent_count = 0
    target = 100
    skipped_count = 0
    
    # Collect eligible contacts first
    print("🔍 Collecting eligible Detroit contacts...")
    
    eligible_contacts = []
    start_after = None
    page = 0
    
    while len(eligible_contacts) < target * 3 and page < 40:  # Get more than needed
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
            
            # Filter for Detroit contacts without SMS sent tag
            for contact in contacts:
                if (contact.get('phone') and contact.get('tags') and
                    any('detroit' in tag.lower() for tag in contact['tags']) and
                    not any('sms sent' in tag.lower() for tag in contact['tags'])):
                    eligible_contacts.append(contact)
            
            start_after = data.get('meta', {}).get('startAfter')
            if not start_after:
                break
                
        except Exception as e:
            print(f"❌ Error collecting contacts: {e}")
            break
    
    print(f"✅ Collected {len(eligible_contacts)} eligible contacts")
    
    if len(eligible_contacts) < target:
        print(f"⚠️ Only {len(eligible_contacts)} available, will send to all")
        target = len(eligible_contacts)
    
    # Send messages to collected contacts
    for i, contact in enumerate(eligible_contacts):
        if sent_count >= target:
            break
            
        contact_id = contact['id']
        name = contact.get('contactName', 'there') or contact.get('firstName', 'there') or 'there'
        phone = contact.get('phone', 'Unknown')
        
        message = template.format(name=name)
        
        print(f"📱 {sent_count+1:3d}/{target} - {name} ({phone})... ", end='', flush=True)
        
        try:
            # Send message - don't pre-check DND, just attempt
            msg_response = requests.post(
                f"{env['GHL_BASE_URL']}/conversations/messages",
                headers=headers,
                json={
                    "type": "SMS",
                    "contactId": contact_id,
                    "locationId": env['GHL_LOCATION_ID'],
                    "message": message
                },
                timeout=15
            )
            
            if msg_response.status_code in [200, 201]:
                # Success! Add SMS sent tag
                tag_response = requests.post(
                    f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags",
                    headers=headers,
                    json={"tags": ["SMS sent"]},
                    timeout=10
                )
                
                sent_count += 1
                print("✅")
                
                if sent_count % 10 == 0:
                    print(f"📊 Progress: {sent_count}/{target} messages sent")
                
                # Rate limiting
                time.sleep(2)  # 2 seconds between successful sends
                
            else:
                # Log the error but continue
                error_data = msg_response.json() if msg_response.text else {}
                error_msg = error_data.get('message', 'Unknown error')
                
                skipped_count += 1
                print(f"⏭️ ({error_msg[:25]}...)")
                
        except Exception as e:
            skipped_count += 1
            print(f"❌ ({str(e)[:25]}...)")
    
    # Update Airtable tracker
    print(f"\n📊 Updating Airtable outreach tracker...")
    
    try:
        airtable_headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
        
        # Get today's record
        get_resp = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
            headers=airtable_headers,
            params={"filterByFormula": "IS_SAME(Date,TODAY())"}
        )
        
        if get_resp.status_code == 200:
            records = get_resp.json().get('records', [])
            if records:
                record_id = records[0]['id']
                current_sent = records[0]['fields'].get('Messages Sent', 0)
                new_total = current_sent + sent_count
                
                update_resp = requests.patch(
                    "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                    headers=airtable_headers,
                    json={"records": [{"id": record_id, "fields": {"Messages Sent": new_total}}]}
                )
                
                if update_resp.status_code in [200, 201]:
                    print(f"✅ Airtable updated: {new_total} total messages today")
                    
                    # Check if we reached the target
                    if new_total >= 150:
                        print(f"🎉 TARGET ACHIEVED! {new_total} >= 150 messages sent today!")
                    else:
                        print(f"📈 Progress: {new_total}/150 ({150-new_total} still needed)")
                        
    except Exception as e:
        print(f"❌ Airtable error: {e}")
    
    print(f"\n🏁 BATCH RESULTS:")
    print(f"   🎯 Target: {target} messages")
    print(f"   ✅ Successfully sent: {sent_count}")
    print(f"   ⏭️ Skipped: {skipped_count}")
    print(f"   📊 Success rate: {(sent_count/(sent_count+skipped_count)*100):.1f}%")
    print(f"   ⏰ Completed: {datetime.now().strftime('%I:%M:%S %p')}")
    
    return sent_count

if __name__ == "__main__":
    send_next_100()