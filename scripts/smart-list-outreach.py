#!/usr/bin/env python3
"""
SMART LIST OUTREACH - Detroit Agents Not Messaged
Access the "Detroit agents not messaged" Smart List (3,322 contacts)
and send messages to 100 unmessaged agents
"""

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

def get_approved_template(env):
    """Get the approved template from Airtable"""
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    try:
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/SMS%20Templates?filterByFormula=Approved",
            headers=headers
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            if records:
                template = records[0]['fields']['Message Text']
                template_name = records[0]['fields']['Template Name']
                print(f"✅ APPROVED TEMPLATE: {template_name}")
                return template
        
        print("❌ No approved template found!")
        return None
            
    except Exception as e:
        print(f"❌ Template fetch error: {e}")
        return None

def get_blacklisted_phones(env):
    """Get blacklisted phone numbers from Airtable"""
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    blacklisted = set()
    
    try:
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblwRwbKogqQnRXtC",
            headers=headers
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            for record in records:
                phone = record.get('fields', {}).get('Phone')
                if phone:
                    blacklisted.add(phone.strip())
    except Exception as e:
        print(f"Warning: Could not get blacklist: {e}")
        
    return blacklisted

def search_all_contacts(env, batch_size=100):
    """Search through ALL contacts to find Detroit agents not messaged"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    all_unmessaged = []
    start_after = ""
    total_checked = 0
    batch_count = 0
    
    print("🔍 Searching through ALL contacts for Detroit agents not messaged...")
    
    while len(all_unmessaged) < 200 and batch_count < 50:  # Safety limit
        try:
            params = {
                "locationId": env['GHL_LOCATION_ID'], 
                "limit": batch_size
            }
            if start_after:
                params["startAfter"] = start_after
                
            response = requests.get(
                "https://services.leadconnectorhq.com/contacts/",
                headers=headers,
                params=params,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                batch = data.get('contacts', [])
                
                if not batch:
                    print(f"📋 No more contacts found after {batch_count} batches")
                    break
                
                batch_count += 1
                total_checked += len(batch)
                
                # Filter for Detroit agents not messaged
                for contact in batch:
                    if not contact.get('phone'):
                        continue
                        
                    tags = [tag.lower() for tag in contact.get('tags', [])]
                    
                    # Look for Detroit-related criteria
                    is_detroit = any(keyword in ' '.join(tags) for keyword in ['detroit'])
                    
                    # Also check if contact name/address contains Detroit
                    name = (contact.get('contactName', '') or '').lower()
                    address = (contact.get('address1', '') or '').lower()
                    city = (contact.get('city', '') or '').lower()
                    
                    if not is_detroit:
                        is_detroit = any(keyword in f"{name} {address} {city}" for keyword in ['detroit'])
                    
                    # Skip if not Detroit-related
                    if not is_detroit:
                        continue
                    
                    # Skip if already messaged
                    if 'sms sent' in ' '.join(tags):
                        continue
                        
                    all_unmessaged.append(contact)
                
                print(f"📋 Batch {batch_count}: Found {len([c for c in batch if any(t.lower() == 'detroit' or 'detroit' in c.get('contactName', '').lower() for t in c.get('tags', []))])} Detroit contacts, {len(all_unmessaged)} unmessaged total")
                
                # Get pagination info
                meta = data.get('meta', {})
                start_after = meta.get('nextPageStartAfter')
                
                if not start_after:
                    print(f"📋 Reached end of contacts after checking {total_checked} contacts")
                    break
                    
            else:
                print(f"❌ API error {response.status_code}: {response.text}")
                break
                
        except Exception as e:
            print(f"❌ Error: {e}")
            break
    
    print(f"🎯 TOTAL FOUND: {len(all_unmessaged)} unmessaged Detroit agents from {total_checked} contacts checked")
    return all_unmessaged

def send_messages_to_contacts(contacts, env, template, target_count=100):
    """Send messages to selected contacts"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    sent_count = 0
    failed_count = 0
    
    for i, contact in enumerate(contacts[:target_count]):
        contact_id = contact['id']
        phone = contact.get('phone')
        name = contact.get('contactName', '').split()[0] or contact.get('firstName', '') or 'there'
        
        # Use approved template
        message = template.replace("[First Name]", name)
        
        print(f"📤 {i+1:3d}/{min(target_count, len(contacts))} - {name} ({phone})", end='... ')
        
        try:
            # Send SMS
            msg_response = requests.post(
                "https://services.leadconnectorhq.com/conversations/messages",
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
                # Add SMS sent tag
                tag_response = requests.post(
                    f"https://services.leadconnectorhq.com/contacts/{contact_id}/tags",
                    headers=headers,
                    json={"tags": ["SMS sent"]},
                    timeout=8
                )
                sent_count += 1
                print("✅ SENT")
                time.sleep(1)  # Rate limiting
            else:
                failed_count += 1
                error_msg = msg_response.text[:50] if msg_response.text else f"HTTP {msg_response.status_code}"
                print(f"❌ Failed: {error_msg}")
                
        except Exception as e:
            failed_count += 1
            print(f"❌ Error: {e}")
    
    return sent_count, failed_count

def smart_list_outreach(target_count=100):
    """Main function to send messages from Smart List"""
    env = load_env()
    
    print(f"🎯 SMART LIST OUTREACH - {datetime.now().strftime('%I:%M:%S %p')}")
    print(f"📋 Target: {target_count} messages to Detroit agents not messaged")
    
    # Get approved template
    template = get_approved_template(env)
    if not template:
        print("❌ Cannot proceed without approved template!")
        return 0
    
    # Get blacklisted numbers
    blacklisted = get_blacklisted_phones(env)
    print(f"🚫 Blacklisted: {len(blacklisted)} numbers")
    
    # Search for unmessaged Detroit agents
    unmessaged_contacts = search_all_contacts(env)
    
    if not unmessaged_contacts:
        print("❌ No unmessaged Detroit agents found!")
        return 0
    
    # Filter out blacklisted
    filtered_contacts = [
        c for c in unmessaged_contacts 
        if c.get('phone') not in blacklisted
    ]
    
    print(f"📬 Available to message: {len(filtered_contacts)} contacts")
    
    if len(filtered_contacts) < target_count:
        print(f"⚠️  Only {len(filtered_contacts)} available (less than target {target_count})")
        target_count = len(filtered_contacts)
    
    # Send messages
    sent_count, failed_count = send_messages_to_contacts(filtered_contacts, env, template, target_count)
    
    print(f"\n🎉 FINAL RESULT: {sent_count} sent, {failed_count} failed")
    return sent_count

if __name__ == "__main__":
    import sys
    target = int(sys.argv[1]) if len(sys.argv) > 1 else 100
    smart_list_outreach(target)