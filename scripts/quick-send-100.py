#!/usr/bin/env python3

import requests
import json
import time
import os

def load_env():
    env_vars = {}
    ghl_secrets = os.path.expanduser('~/.config/gohighlevel/secrets.env')
    if os.path.exists(ghl_secrets):
        with open(ghl_secrets) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value.strip('"\'')
    
    airtable_secrets = os.path.expanduser('~/.config/airtable/secrets.env')
    if os.path.exists(airtable_secrets):
        with open(airtable_secrets) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value.strip('"\'')
    
    return env_vars

def main():
    env = load_env()
    
    print("🚀 Quick Detroit Outreach - 100 Messages")
    
    # Template
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    # Get contacts in batches and send immediately
    url = f"{env['GHL_BASE_URL']}/contacts/"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    sent_count = 0
    target = 100
    start_after = None
    pages = 0
    
    print("🔍 Scanning contacts and sending messages...")
    
    while sent_count < target and pages < 50:
        # Get batch of contacts
        params = {
            "locationId": env['GHL_LOCATION_ID'],
            "limit": 100
        }
        if start_after:
            params["startAfter"] = start_after
            
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print(f"Error getting contacts: {response.status_code}")
            break
            
        data = response.json()
        contacts = data.get('contacts', [])
        pages += 1
        
        if not contacts:
            break
            
        print(f"Page {pages}: Processing {len(contacts)} contacts...")
        
        # Process each contact
        for contact in contacts:
            if sent_count >= target:
                break
                
            # Check eligibility
            if not contact.get('phone') or not contact.get('tags'):
                continue
                
            tags = [tag.lower() for tag in contact['tags']]
            has_detroit = 'detroit' in tags  
            has_sms_sent = 'sms sent' in tags
            
            if has_detroit and not has_sms_sent:
                # Send message
                name = contact.get('contactName', 'there') or contact.get('firstName', 'there')
                message = template.replace('{name}', name)
                
                # Send SMS
                msg_data = {
                    "type": "SMS",
                    "contactId": contact['id'], 
                    "locationId": env['GHL_LOCATION_ID'],
                    "message": message
                }
                
                msg_response = requests.post(
                    f"{env['GHL_BASE_URL']}/conversations/messages",
                    headers={**headers, "Content-Type": "application/json"},
                    json=msg_data
                )
                
                if msg_response.status_code in [200, 201]:
                    # Add SMS sent tag
                    tag_data = {"tags": ["SMS sent"]}
                    tag_response = requests.post(
                        f"{env['GHL_BASE_URL']}/contacts/{contact['id']}/tags",
                        headers={**headers, "Content-Type": "application/json"},
                        json=tag_data
                    )
                    
                    if tag_response.status_code in [200, 201]:
                        sent_count += 1
                        print(f"  ✅ {sent_count:3d}/100 - {name} ({contact['phone']})")
                    
                    # Rate limit: 12 seconds between messages  
                    time.sleep(12)
                else:
                    print(f"  ❌ Failed to send to {name}")
        
        # Get next page
        start_after = data.get('meta', {}).get('startAfter')
        if not start_after:
            break
    
    # Update Airtable tracker
    print("📊 Updating outreach tracker...")
    
    airtable_url = f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv"
    airtable_headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    # Get today's record
    get_response = requests.get(
        airtable_url,
        headers=airtable_headers,
        params={"filterByFormula": "IS_SAME(Date,TODAY())"}
    )
    
    if get_response.status_code == 200:
        records = get_response.json().get('records', [])
        if records:
            record_id = records[0]['id']
            current_sent = records[0]['fields'].get('Messages Sent', 0)
            new_total = current_sent + sent_count
            
            # Update
            update_data = {
                "records": [{
                    "id": record_id,
                    "fields": {"Messages Sent": new_total}
                }]
            }
            
            update_response = requests.patch(airtable_url, headers=airtable_headers, json=update_data)
            if update_response.status_code in [200, 201]:
                print(f"✅ Tracker updated: {new_total} total messages today")
            else:
                print("❌ Failed to update tracker")
    
    print(f"\n🎯 COMPLETE: {sent_count} messages sent!")

if __name__ == "__main__":
    main()