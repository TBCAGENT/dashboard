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

def direct_send_approach():
    env = load_env()
    
    print(f"🚀 DIRECT SEND APPROACH - {datetime.now().strftime('%I:%M:%S %p')}")
    print("🎯 Trying to send to ALL Detroit contacts, let successes come through")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    sent_count = 0
    target = 20
    attempts = 0
    
    # Get contacts from multiple pages
    pages_to_try = 5
    
    for page_num in range(pages_to_try):
        if sent_count >= target:
            break
            
        start_after = None
        if page_num > 0:
            # Use different startAfter values to access different pages
            start_afters = [
                "SI1vovYaLgYyZ1EG2U0g",
                "EIUaIaGt7CqNrwBr1ywP", 
                "yFT3nQG1Fi37xwntNYDa",
                "BpduvaoStdwiYHp7kEwN"
            ]
            if page_num <= len(start_afters):
                start_after = start_afters[page_num - 1]
        
        print(f"\n📄 Page {page_num + 1}: {start_after or 'First page'}")
        
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
                print(f"❌ API error: {response.status_code}")
                continue
                
            contacts = response.json().get('contacts', [])
            print(f"📋 Retrieved {len(contacts)} contacts")
            
            # Try sending to ALL contacts with detroit tag
            for contact in contacts:
                if sent_count >= target:
                    break
                
                # Minimal filtering - detroit tag, phone, and NOT already sent
                if (not contact.get('phone') or not contact.get('tags')):
                    continue
                    
                tags = [tag.lower() for tag in contact['tags']]
                has_detroit = any('detroit' in tag for tag in tags)
                already_sent = any('sms sent' in tag for tag in tags)
                
                if not has_detroit or already_sent:
                    continue
                
                attempts += 1
                contact_id = contact['id']
                name = contact.get('contactName', 'there') or contact.get('firstName', 'there') or 'there'
                phone = contact.get('phone')
                
                message = template.format(name=name)
                
                print(f"📱 {sent_count+1:2d}/20 - {name}... ", end='', flush=True)
                
                try:
                    # Just attempt to send - don't overthink it
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
                        print("✅")
                        
                        if sent_count % 5 == 0:
                            print(f"📊 Progress: {sent_count}/20")
                        
                        time.sleep(1)
                        
                    else:
                        print("⏭️")
                        
                except Exception:
                    print("❌")
                    continue
            
        except Exception as e:
            print(f"❌ Page {page_num + 1} error: {e}")
            continue
    
    # Update Airtable
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
                        print(f"✅ Airtable: {new_total} total today")
                        
                        if new_total >= 150:
                            print(f"🎉 TARGET ACHIEVED! {new_total}/150")
                        else:
                            print(f"📈 Progress: {new_total}/150")
                            
        except Exception as e:
            print(f"❌ Airtable error: {e}")
    
    print(f"\n🎯 RESULT: {sent_count}/20 messages sent from {attempts} attempts")
    return sent_count

if __name__ == "__main__":
    direct_send_approach()