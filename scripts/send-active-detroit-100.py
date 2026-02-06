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

def is_contact_active(contact):
    """Check if contact can receive SMS (no DND)"""
    if contact.get('dnd', False):
        return False
        
    dnd_settings = contact.get('dndSettings', {})
    sms_dnd = dnd_settings.get('SMS', {})
    
    # Check if SMS is blocked
    if sms_dnd.get('status') in ['permanent', 'temporary']:
        return False
    
    return True

def send_messages():
    env = load_env()
    
    print("🚀 DETROIT OUTREACH - 100 ACTIVE CONTACTS")
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    url = f"{env['GHL_BASE_URL']}/contacts/"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    sent_count = 0
    skipped_count = 0
    target = 100
    start_after = None
    pages = 0
    
    print("🔍 Finding active Detroit contacts...")
    
    while sent_count < target and pages < 50:
        params = {
            "locationId": env['GHL_LOCATION_ID'],
            "limit": 100
        }
        
        if start_after:
            params["startAfter"] = start_after
            
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code != 200:
            print(f"❌ API Error: {response.status_code}")
            break
            
        data = response.json()
        contacts = data.get('contacts', [])
        pages += 1
        
        if not contacts:
            print(f"📄 No more contacts after {pages} pages")
            break
            
        page_sent = 0
        page_skipped = 0
        
        for contact in contacts:
            if sent_count >= target:
                break
                
            # Basic eligibility
            if not contact.get('phone') or not contact.get('tags'):
                continue
                
            tags = [tag.lower() for tag in contact['tags']]
            has_detroit = 'detroit' in tags
            has_sms_sent = 'sms sent' in tags
            
            if not (has_detroit and not has_sms_sent):
                continue
                
            # Check if active (can receive SMS)
            if not is_contact_active(contact):
                skipped_count += 1
                page_skipped += 1
                continue
            
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
                requests.post(
                    f"{env['GHL_BASE_URL']}/contacts/{contact['id']}/tags",
                    headers={**headers, "Content-Type": "application/json"},
                    json=tag_data
                )
                
                sent_count += 1 
                page_sent += 1
                print(f"  ✅ {sent_count:3d}/100 - {name} ({contact['phone']})")
                
                # Rate limit: 12 seconds between messages
                time.sleep(12)
            else:
                error_msg = msg_response.json().get('message', 'Unknown error')
                if 'unsubscribed' in error_msg.lower():
                    skipped_count += 1
                    page_skipped += 1
                    print(f"  ⏭️ Skipped {name} (unsubscribed)")
                else:
                    print(f"  ❌ Failed {name}: {error_msg}")
        
        print(f"📄 Page {pages}: Sent {page_sent}, Skipped {page_skipped}")
        
        # Get next page
        start_after = data.get('meta', {}).get('startAfter')
        if not start_after:
            break
    
    # Update Airtable
    print("📊 Updating outreach tracker...")
    
    airtable_url = f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv"
    airtable_headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
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
            
            update_data = {
                "records": [{
                    "id": record_id,
                    "fields": {"Messages Sent": new_total}
                }]
            }
            
            update_response = requests.patch(airtable_url, headers=airtable_headers, json=update_data)
            
            if update_response.status_code in [200, 201]:
                print(f"✅ Outreach Tracker Updated: {new_total} total messages today")
    
    print(f"\n🎯 FINAL RESULTS:")
    print(f"   ✅ Messages sent: {sent_count}")
    print(f"   ⏭️ Skipped (DND/unsubscribed): {skipped_count}")
    print(f"   📄 Pages scanned: {pages}")
    print(f"   🎯 Target achieved: {'YES' if sent_count == 100 else 'NO'}")

if __name__ == "__main__":
    send_messages()