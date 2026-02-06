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

def find_smart_list_contacts():
    env = load_env()
    
    print("🔍 Accessing Detroit agents not messaged smart list")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    # Try different API endpoints to find the smart list
    endpoints_to_try = [
        f"{env['GHL_BASE_URL']}/smartlists/",
        f"{env['GHL_BASE_URL']}/contacts/lists/",
        f"{env['GHL_BASE_URL']}/lists/",
        f"{env['GHL_BASE_URL']}/contacts/groups/",
    ]
    
    for endpoint in endpoints_to_try:
        try:
            response = requests.get(
                endpoint,
                headers=headers,
                params={"locationId": env['GHL_LOCATION_ID']},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Found endpoint: {endpoint}")
                print(f"Response: {json.dumps(data, indent=2)[:500]}...")
                return data
            else:
                print(f"❌ {endpoint}: {response.status_code}")
                
        except Exception as e:
            print(f"❌ {endpoint}: {e}")
    
    print("\n🎯 Falling back to direct contact filtering approach...")
    
    # Since smart list API isn't available, let's manually recreate the smart list filter
    # Get ALL Detroit contacts without pagination issues
    
    all_contacts = []
    contacted_ids = set()
    
    # First, get all contacts that already have "SMS sent" tag
    print("📋 Getting contacts with SMS sent tag...")
    start_after = None
    page = 0
    
    while page < 100:  # Increase page limit significantly
        params = {
            "locationId": env['GHL_LOCATION_ID'],
            "limit": 100
        }
        
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
            
            # Track contacts that already have SMS sent
            for contact in contacts:
                if contact.get('tags'):
                    tags = [tag.lower() for tag in contact['tags']]
                    has_detroit = 'detroit' in tags
                    has_sms_sent = 'sms sent' in tags
                    
                    if has_detroit and has_sms_sent:
                        contacted_ids.add(contact['id'])
                    
                    if has_detroit and not has_sms_sent:
                        all_contacts.append(contact)
            
            # Print progress every 10 pages
            if page % 10 == 0:
                print(f"📄 Page {page}: Found {len(all_contacts)} eligible, {len(contacted_ids)} already contacted")
            
            start_after = data.get('meta', {}).get('startAfter')
            if not start_after:
                break
                
        except Exception as e:
            print(f"❌ Page {page} error: {e}")
            break
    
    print(f"\n✅ Manual smart list recreation complete:")
    print(f"   📱 Already contacted: {len(contacted_ids)} contacts")
    print(f"   ✅ Available to contact: {len(all_contacts)} contacts")
    
    # Now send to the first 100 available contacts
    if len(all_contacts) >= 100:
        return send_to_contacts(all_contacts[:100], env)
    else:
        return send_to_contacts(all_contacts, env)

def send_to_contacts(contacts, env):
    """Send messages to the provided list of contacts"""
    
    print(f"\n🚀 Sending messages to {len(contacts)} contacts from smart list")
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    sent_count = 0
    failed_count = 0
    
    for i, contact in enumerate(contacts):
        contact_id = contact['id']
        name = contact.get('contactName', 'there') or contact.get('firstName', 'there') or 'there'
        phone = contact.get('phone', 'Unknown')
        
        message = template.format(name=name)
        
        print(f"📱 {i+1:3d}/{len(contacts)} - {name} ({phone})... ", end='', flush=True)
        
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
                # Add SMS sent tag
                requests.post(
                    f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags",
                    headers=headers,
                    json={"tags": ["SMS sent"]},
                    timeout=10
                )
                
                sent_count += 1
                print("✅")
                
                if sent_count % 10 == 0:
                    print(f"📊 Progress: {sent_count}/{len(contacts)} sent")
                
                time.sleep(2)  # Rate limiting
                
            else:
                failed_count += 1
                error_data = msg_response.json() if msg_response.text else {}
                error_msg = error_data.get('message', 'Unknown error')[:25]
                print(f"❌ ({error_msg})")
                
        except Exception as e:
            failed_count += 1
            print(f"❌ ({str(e)[:25]})")
    
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
                current_sent = records[0]['fields'].get('Messages Sent', 0)
                new_total = current_sent + sent_count
                
                update_resp = requests.patch(
                    "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                    headers=airtable_headers,
                    json={"records": [{"id": record_id, "fields": {"Messages Sent": new_total}}]}
                )
                
                if update_resp.status_code in [200, 201]:
                    print(f"✅ Airtable updated: {new_total} total messages today")
                    
                    if new_total >= 150:
                        print(f"🎉 TARGET ACHIEVED! {new_total} >= 150 messages!")
                    else:
                        print(f"📈 Progress: {new_total}/150 ({150-new_total} remaining)")
                        
    except Exception as e:
        print(f"❌ Airtable error: {e}")
    
    print(f"\n🏁 SMART LIST RESULTS:")
    print(f"   ✅ Successfully sent: {sent_count}")
    print(f"   ❌ Failed: {failed_count}")
    print(f"   📊 Success rate: {(sent_count/(sent_count+failed_count)*100):.1f}%")
    print(f"   ⏰ Completed: {datetime.now().strftime('%I:%M:%S %p')}")
    
    return sent_count

if __name__ == "__main__":
    find_smart_list_contacts()