#!/usr/bin/env python3

import requests
import json
import time
import os

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

def send_batch_messages(batch_size=20):
    env = load_env()
    
    print(f"🚀 BATCH DETROIT OUTREACH - {batch_size} MESSAGES")
    
    # Message template
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    # API headers
    ghl_headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    sent_count = 0
    skipped_count = 0
    target = batch_size
    
    # Get contacts
    print("🔍 Finding eligible contacts...")
    
    try:
        response = requests.get(
            f"{env['GHL_BASE_URL']}/contacts/",
            headers=ghl_headers,
            params={
                "locationId": env['GHL_LOCATION_ID'],
                "limit": 100
            },
            timeout=30
        )
        
        if response.status_code != 200:
            print(f"❌ Failed to get contacts: {response.status_code}")
            return 0
            
        contacts = response.json().get('contacts', [])
        print(f"📄 Retrieved {len(contacts)} contacts")
        
        # Filter for eligible contacts
        eligible = []
        for contact in contacts:
            if not contact.get('phone') or not contact.get('tags'):
                continue
                
            tags = [tag.lower() for tag in contact['tags']]
            has_detroit = 'detroit' in tags
            has_sms_sent = 'sms sent' in tags
            
            if has_detroit and not has_sms_sent:
                eligible.append(contact)
                if len(eligible) >= target * 2:  # Get extras in case of failures
                    break
        
        print(f"✅ Found {len(eligible)} eligible contacts")
        
        # Send messages
        for i, contact in enumerate(eligible):
            if sent_count >= target:
                break
                
            name = contact.get('contactName', 'there') or contact.get('firstName', 'there')
            message = template.replace('{name}', name)
            
            print(f"📱 {sent_count+1:2d}/{target} - Sending to {name}...", end=' ')
            
            # Send message
            try:
                msg_response = requests.post(
                    f"{env['GHL_BASE_URL']}/conversations/messages",
                    headers=ghl_headers,
                    json={
                        "type": "SMS",
                        "contactId": contact['id'],
                        "locationId": env['GHL_LOCATION_ID'],
                        "message": message
                    },
                    timeout=15
                )
                
                if msg_response.status_code in [200, 201]:
                    # Success - add tag
                    requests.post(
                        f"{env['GHL_BASE_URL']}/contacts/{contact['id']}/tags",
                        headers=ghl_headers,
                        json={"tags": ["SMS sent"]},
                        timeout=10
                    )
                    
                    sent_count += 1
                    print("✅")
                    
                else:
                    error_data = msg_response.json() if msg_response.text else {}
                    error_msg = error_data.get('message', 'Unknown error')
                    skipped_count += 1
                    print(f"⏭️ ({error_msg[:30]})")
                    
            except Exception as e:
                skipped_count += 1
                print(f"❌ ({str(e)[:30]})")
            
            # Rate limiting
            time.sleep(2)  # 2 seconds between attempts
            
    except Exception as e:
        print(f"❌ Batch error: {str(e)}")
        
    print(f"\n🎯 Batch Results:")
    print(f"   ✅ Sent: {sent_count}")
    print(f"   ⏭️ Skipped: {skipped_count}")
    
    return sent_count

if __name__ == "__main__":
    import sys
    batch_size = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    result = send_batch_messages(batch_size)
    print(f"Final count: {result}")