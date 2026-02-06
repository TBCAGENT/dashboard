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

def send_batch_20():
    env = load_env()
    
    print(f"🚀 BATCH 20 MESSAGES - {datetime.now().strftime('%I:%M:%S %p')}")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    sent_count = 0
    target = 20
    attempts = 0
    
    # Get contacts and try sending immediately
    print("📋 Getting Detroit contacts...")
    
    try:
        response = requests.get(
            f"{env['GHL_BASE_URL']}/contacts/",
            headers=headers,
            params={
                "locationId": env['GHL_LOCATION_ID'],
                "limit": 100
            },
            timeout=30
        )
        
        if response.status_code != 200:
            print(f"❌ API Error: {response.status_code}")
            return 0
            
        contacts = response.json().get('contacts', [])
        
        # Filter and attempt to send
        for contact in contacts:
            if sent_count >= target:
                break
                
            # Basic eligibility check
            if (not contact.get('phone') or not contact.get('tags') or
                not any('detroit' in tag.lower() for tag in contact['tags']) or
                any('sms sent' in tag.lower() for tag in contact['tags'])):
                continue
            
            attempts += 1
            contact_id = contact['id']
            name = contact.get('contactName', 'there') or contact.get('firstName', 'there') or 'there'
            phone = contact.get('phone')
            
            message = template.format(name=name)
            
            print(f"📱 {sent_count+1:2d}/20 - {name} ({phone})... ", end='', flush=True)
            
            try:
                # Send message
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
                    requests.post(
                        f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags",
                        headers=headers,
                        json={"tags": ["SMS sent"]},
                        timeout=10
                    )
                    
                    sent_count += 1
                    print("✅")
                    
                    # Short delay between sends
                    time.sleep(2)
                    
                else:
                    # Skip and continue
                    print("⏭️")
                    
            except Exception as e:
                print("❌")
                continue
    
    except Exception as e:
        print(f"❌ Batch error: {e}")
    
    # Update Airtable
    if sent_count > 0:
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
                        print(f"✅ Airtable: {new_total} total messages today")
                        
        except Exception as e:
            print(f"❌ Airtable error: {e}")
    
    print(f"🎯 Batch result: {sent_count}/20 sent")
    return sent_count

if __name__ == "__main__":
    send_batch_20()