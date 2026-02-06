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

def find_and_send_20():
    env = load_env()
    
    print(f"🔍 FINDING CLEAN CONTACTS - {datetime.now().strftime('%I:%M:%S %p')}")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    # Try different starting points to find clean contacts
    start_after_options = [
        None,
        "EIUaIaGt7CqNrwBr1ywP",  # Try starting from known working contact
        "yFT3nQG1Fi37xwntNYDa",
        "BpduvaoStdwiYHp7kEwN",
    ]
    
    sent_count = 0
    target = 20
    
    for start_after in start_after_options:
        if sent_count >= target:
            break
            
        print(f"\n📄 Trying page with startAfter: {start_after or 'None'}")
        
        try:
            params = {
                "locationId": env['GHL_LOCATION_ID'],
                "limit": 100
            }
            if start_after:
                params["startAfter"] = start_after
                
            response = requests.get(
                f"{env['GHL_BASE_URL']}/contacts/",
                headers=headers,
                params=params,
                timeout=30
            )
            
            if response.status_code != 200:
                continue
                
            contacts = response.json().get('contacts', [])
            print(f"📋 Got {len(contacts)} contacts")
            
            # Try sending to eligible contacts
            batch_sent = 0
            for contact in contacts:
                if sent_count >= target:
                    break
                    
                # Check eligibility
                if (not contact.get('phone') or not contact.get('tags') or
                    not any('detroit' in tag.lower() for tag in contact['tags']) or
                    any('sms sent' in tag.lower() for tag in contact['tags'])):
                    continue
                
                contact_id = contact['id']
                name = contact.get('contactName', 'there') or contact.get('firstName', 'there') or 'there'
                phone = contact.get('phone')
                
                message = template.format(name=name)
                
                print(f"📱 {sent_count+1:2d}/20 - {name} ({phone})... ", end='', flush=True)
                
                try:
                    # Quick send attempt
                    msg_response = requests.post(
                        f"{env['GHL_BASE_URL']}/conversations/messages",
                        headers=headers,
                        json={
                            "type": "SMS",
                            "contactId": contact_id,
                            "locationId": env['GHL_LOCATION_ID'],
                            "message": message
                        },
                        timeout=10
                    )
                    
                    if msg_response.status_code in [200, 201]:
                        # Success! Add tag
                        requests.post(
                            f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags",
                            headers=headers,
                            json={"tags": ["SMS sent"]},
                            timeout=8
                        )
                        
                        sent_count += 1
                        batch_sent += 1
                        print("✅")
                        
                        time.sleep(1)  # Quick rate limit
                        
                    else:
                        print("⏭️")
                        
                except Exception:
                    print("❌")
                    continue
            
            print(f"📊 This batch: {batch_sent} sent")
            
        except Exception as e:
            print(f"❌ Error with startAfter {start_after}: {e}")
            continue
    
    # Update Airtable if we sent any
    if sent_count > 0:
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
                    current_sent = records[0]['fields'].get('Messages Sent', 0)
                    new_total = current_sent + sent_count
                    
                    update_resp = requests.patch(
                        "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                        headers=airtable_headers,
                        json={"records": [{"id": record_id, "fields": {"Messages Sent": new_total}}]}
                    )
                    
                    if update_resp.status_code in [200, 201]:
                        print(f"✅ Airtable updated: {new_total} total today")
                        
                        if new_total >= 150:
                            print(f"🎉 TARGET REACHED! {new_total}/150")
                        else:
                            print(f"📈 Progress: {new_total}/150 ({150-new_total} more needed)")
                            
        except Exception as e:
            print(f"❌ Airtable error: {e}")
    
    print(f"\n🎯 BATCH COMPLETE: {sent_count}/20 messages sent")
    return sent_count

if __name__ == "__main__":
    find_and_send_20()