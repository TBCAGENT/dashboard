#!/usr/bin/env python3
"""
FULL CONTACT SEARCH - Access all 4,473 contacts
Properly paginate through ALL contacts to find Detroit agents not messaged
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

def search_all_contacts_properly(env):
    """Search through ALL 4,473 contacts using proper pagination"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    all_detroit_contacts = []
    start_after_id = ""
    start_after_time = ""
    batch_count = 0
    total_contacts_checked = 0
    
    print("🔍 Searching ALL 4,473 contacts for Detroit agents...")
    
    while batch_count < 50:  # Safety limit (50 * 100 = 5000 max)
        try:
            params = {
                "locationId": env['GHL_LOCATION_ID'], 
                "limit": 100
            }
            
            # Use proper pagination parameters
            if start_after_id and start_after_time:
                params["startAfterId"] = start_after_id
                params["startAfter"] = start_after_time
                
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
                total_contacts_checked += len(batch)
                
                # Filter for Detroit agents
                batch_detroit = []
                for contact in batch:
                    if not contact.get('phone'):
                        continue
                        
                    tags = [tag.lower() for tag in contact.get('tags', [])]
                    name = (contact.get('contactName', '') or '').lower()
                    city = (contact.get('city', '') or '').lower()
                    
                    # Check if this is a Detroit agent
                    is_detroit = (
                        'detroit' in ' '.join(tags) or 
                        'detroit' in name or 
                        'detroit' in city
                    )
                    
                    if is_detroit:
                        # Check if not already messaged
                        if 'sms sent' not in ' '.join(tags):
                            batch_detroit.append(contact)
                
                all_detroit_contacts.extend(batch_detroit)
                
                print(f"📋 Batch {batch_count}: {len(batch)} contacts, {len(batch_detroit)} unmessaged Detroit, total found: {len(all_detroit_contacts)} | Progress: {total_contacts_checked}/4473")
                
                # Get pagination info for next batch
                meta = data.get('meta', {})
                start_after_id = meta.get('startAfterId')
                start_after_time = meta.get('startAfter')
                
                if not start_after_id:
                    print(f"📋 Reached end of contacts")
                    break
                    
                time.sleep(0.3)  # Rate limiting
                
            else:
                print(f"❌ API error {response.status_code}: {response.text}")
                break
                
        except Exception as e:
            print(f"❌ Error: {e}")
            break
    
    print(f"\n🎯 SEARCH COMPLETE:")
    print(f"Contacts checked: {total_contacts_checked}")
    print(f"Unmessaged Detroit agents: {len(all_detroit_contacts)}")
    
    return all_detroit_contacts

def send_messages_to_contacts(contacts, env, template, target_count=100):
    """Send messages to selected contacts"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    sent_count = 0
    failed_count = 0
    
    print(f"\n📤 SENDING MESSAGES TO {min(target_count, len(contacts))} CONTACTS:")
    
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
                print(f"❌ {error_msg}")
                
        except Exception as e:
            failed_count += 1
            print(f"❌ Error: {e}")
    
    return sent_count, failed_count

def full_contact_outreach(target_count=100):
    """Main function - search all contacts and send messages"""
    env = load_env()
    
    print(f"🚀 FULL CONTACT OUTREACH - {datetime.now().strftime('%I:%M:%S %p')}")
    print(f"🎯 Target: {target_count} messages from 4,473 total contacts")
    
    # Get approved template
    template = get_approved_template(env)
    if not template:
        print("❌ Cannot proceed without approved template!")
        return 0
    
    # Get blacklisted numbers
    blacklisted = get_blacklisted_phones(env)
    print(f"🚫 Blacklisted: {len(blacklisted)} numbers")
    
    # Search for unmessaged Detroit agents
    detroit_contacts = search_all_contacts_properly(env)
    
    if not detroit_contacts:
        print("❌ No unmessaged Detroit agents found!")
        return 0
    
    # Filter out blacklisted
    filtered_contacts = [
        c for c in detroit_contacts 
        if c.get('phone') not in blacklisted
    ]
    
    print(f"📬 Available to message: {len(filtered_contacts)} contacts")
    
    if len(filtered_contacts) < target_count:
        print(f"⚠️  Only {len(filtered_contacts)} available (less than target {target_count})")
        target_count = len(filtered_contacts)
    
    # Send messages
    sent_count, failed_count = send_messages_to_contacts(filtered_contacts, env, template, target_count)
    
    print(f"\n🎉 FINAL RESULT: {sent_count} sent, {failed_count} failed out of {len(filtered_contacts)} available")
    return sent_count

if __name__ == "__main__":
    import sys
    target = int(sys.argv[1]) if len(sys.argv) > 1 else 100
    full_contact_outreach(target)