#!/usr/bin/env python3
"""
LARGE BATCH OUTREACH - Find 100+ unmessaged contacts
- Searches ALL contacts with pagination
- ONLY approved template from Airtable
- Multi-layer duplicate prevention
- Handles large datasets (3000+ contacts)
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
    """MANDATORY: Get ONLY the approved template from Airtable"""
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
                print(f"📝 MESSAGE: {template}")
                return template
            else:
                print("❌ CRITICAL: No approved template found in Airtable!")
                return None
        else:
            print("❌ CRITICAL: Could not fetch templates from Airtable!")
            return None
            
    except Exception as e:
        print(f"❌ CRITICAL: Template fetch error: {e}")
        return None

def get_blacklisted_phones(env):
    """Get all phone numbers that should NEVER be contacted"""
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    blacklisted = set()
    
    try:
        # Get ALL records from Agent Responses (anyone who already responded)
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
                    
        return blacklisted
        
    except Exception as e:
        print(f"❌ Error getting blacklist: {e}")
        return set()

def get_all_detroit_contacts(env):
    """Get ALL contacts with Detroit tag using pagination"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    all_contacts = []
    limit = 100
    start_after = ""
    batch_count = 0
    
    print("🔍 Searching ALL Detroit contacts (may take a moment)...")
    
    while True:
        try:
            params = {
                "locationId": env['GHL_LOCATION_ID'], 
                "limit": limit
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
                    break  # No more contacts
                
                # Filter for Detroit contacts
                detroit_contacts = [
                    c for c in batch 
                    if c.get('tags') and 'detroit' in [tag.lower() for tag in c.get('tags', [])]
                ]
                
                all_contacts.extend(detroit_contacts)
                batch_count += 1
                
                print(f"📋 Batch {batch_count}: Found {len(detroit_contacts)} Detroit contacts, total so far: {len(all_contacts)}")
                
                # Get pagination info
                meta = data.get('meta', {})
                start_after = meta.get('nextPageStartAfter')
                
                if not start_after or len(batch) < limit:
                    break  # Last batch
                
            else:
                print(f"❌ GHL API error: {response.status_code}")
                break
                
        except Exception as e:
            print(f"❌ Error fetching contacts: {e}")
            break
    
    print(f"🎯 TOTAL DETROIT CONTACTS: {len(all_contacts)}")
    return all_contacts

def find_unmessaged_contacts(all_contacts, blacklisted):
    """Find contacts that haven't been messaged yet"""
    unmessaged = []
    
    for contact in all_contacts:
        if not contact.get('phone'):
            continue
            
        phone = contact.get('phone')
        if phone in blacklisted:
            continue
            
        tags = [tag.lower() for tag in contact.get('tags', [])]
        if 'sms sent' in ' '.join(tags):
            continue
            
        unmessaged.append(contact)
    
    return unmessaged

def send_message_batch(contacts, env, approved_template, target_count=100):
    """Send messages to unmessaged contacts"""
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    sent_count = 0
    
    for contact in contacts[:target_count]:
        contact_id = contact['id']
        phone = contact.get('phone')
        name = contact.get('contactName', '').split()[0] or contact.get('firstName', '') or 'there'
        
        # Use approved template
        message = approved_template.replace("[First Name]", name)
        
        print(f"📤 {sent_count+1:3d}/100 - Sending to {name} ({phone})", end='... ')
        
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
                requests.post(
                    f"https://services.leadconnectorhq.com/contacts/{contact_id}/tags",
                    headers=headers,
                    json={"tags": ["SMS sent"]},
                    timeout=8
                )
                sent_count += 1
                print("✅ SENT")
                time.sleep(1)  # Rate limiting
            else:
                print(f"❌ Failed: {msg_response.status_code}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    return sent_count

def large_batch_outreach(target_count=100):
    """Send messages to large batch of unmessaged contacts"""
    env = load_env()
    
    print(f"🚀 LARGE BATCH OUTREACH - {datetime.now().strftime('%I:%M:%S %p')}")
    print(f"🎯 TARGET: {target_count} messages")
    
    # CRITICAL: Get approved template FIRST
    approved_template = get_approved_template(env)
    if not approved_template:
        print("❌ CRITICAL: Cannot proceed without approved template!")
        return 0
    
    # Get blacklisted numbers
    blacklisted = get_blacklisted_phones(env)
    print(f"🚫 BLACKLIST: {len(blacklisted)} numbers will be skipped")
    
    # Get ALL Detroit contacts
    all_contacts = get_all_detroit_contacts(env)
    
    # Find unmessaged contacts
    unmessaged = find_unmessaged_contacts(all_contacts, blacklisted)
    print(f"📬 UNMESSAGED: {len(unmessaged)} contacts available")
    
    if len(unmessaged) == 0:
        print("❌ No unmessaged contacts found!")
        return 0
    
    if len(unmessaged) < target_count:
        print(f"⚠️  Only {len(unmessaged)} unmessaged contacts available (less than target {target_count})")
        target_count = len(unmessaged)
    
    # Send messages
    sent_count = send_message_batch(unmessaged, env, approved_template, target_count)
    
    print(f"\n🎉 FINAL RESULT: {sent_count}/{target_count} messages sent successfully")
    return sent_count

if __name__ == "__main__":
    import sys
    target = int(sys.argv[1]) if len(sys.argv) > 1 else 100
    large_batch_outreach(target)