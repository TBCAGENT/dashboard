#!/usr/bin/env python3

import requests
import json
import time
import os
from datetime import datetime

def load_env():
    env_vars = {}
    
    # Load GHL credentials
    ghl_secrets = os.path.expanduser('~/.config/gohighlevel/secrets.env')
    if os.path.exists(ghl_secrets):
        with open(ghl_secrets) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value.strip('"\'')
    
    # Load Airtable credentials  
    airtable_secrets = os.path.expanduser('~/.config/airtable/secrets.env')
    if os.path.exists(airtable_secrets):
        with open(airtable_secrets) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value.strip('"\'')
    
    return env_vars

def get_approved_template():
    """Get approved SMS template from Airtable"""
    env = load_env()
    
    # Default template for Detroit agents
    return "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."

def find_detroit_contacts(target_count=100):
    """Find contacts with Detroit tag but no SMS sent tag"""
    env = load_env()
    
    url = f"{env['GHL_BASE_URL']}/contacts/"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    eligible_contacts = []
    start_after = None
    pages_scanned = 0
    max_pages = 50  # Should be plenty to find 100 contacts
    
    print(f"🔍 Searching for {target_count} Detroit contacts without SMS sent tag...")
    
    while len(eligible_contacts) < target_count and pages_scanned < max_pages:
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
        pages_scanned += 1
        
        if not contacts:
            print(f"⚠️ No more contacts found after {pages_scanned} pages")
            break
        
        # Filter this batch
        batch_eligible = 0
        for contact in contacts:
            if len(eligible_contacts) >= target_count:
                break
                
            # Must have phone and tags
            if not contact.get('phone') or not contact.get('tags'):
                continue
                
            tags = [tag.lower() for tag in contact['tags']]
            has_detroit = 'detroit' in tags
            has_sms_sent = 'sms sent' in tags
            
            if has_detroit and not has_sms_sent:
                eligible_contacts.append(contact)
                batch_eligible += 1
                
                # Show first few found
                if len(eligible_contacts) <= 5:
                    name = contact.get('contactName', 'Unknown')
                    phone = contact.get('phone', 'No phone')
                    print(f"   ✅ Found: {name} - {phone}")
        
        print(f"   Page {pages_scanned}: +{batch_eligible} eligible (Total: {len(eligible_contacts)})")
        
        # Get next page cursor
        start_after = data.get('meta', {}).get('startAfter') 
        if not start_after:
            print(f"   📄 Reached end of contacts")
            break
    
    print(f"\n🎯 Found {len(eligible_contacts)} eligible contacts from {pages_scanned} pages")
    return eligible_contacts

def send_sms(contact_id, message):
    """Send SMS via GHL"""
    env = load_env()
    
    url = f"{env['GHL_BASE_URL']}/conversations/messages"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",  
        "Content-Type": "application/json"
    }
    
    data = {
        "type": "SMS",
        "contactId": contact_id,
        "locationId": env['GHL_LOCATION_ID'],
        "message": message
    }
    
    response = requests.post(url, headers=headers, json=data)
    return response.status_code in [200, 201]

def add_sms_sent_tag(contact_id):
    """Add SMS sent tag to contact"""
    env = load_env()
    
    url = f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"  
    }
    
    data = {"tags": ["SMS sent"]}
    
    response = requests.post(url, headers=headers, json=data)
    return response.status_code in [200, 201]

def update_outreach_tracker(additional_sent):
    """Update Airtable outreach tracker"""
    env = load_env()
    
    # Get today's record
    url = f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv"
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    params = {"filterByFormula": "IS_SAME(Date,TODAY())"}
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        records = response.json().get('records', [])
        if records:
            record_id = records[0]['id']
            current_sent = records[0]['fields'].get('Messages Sent', 0)
            new_total = current_sent + additional_sent
            
            # Update record
            update_data = {
                "records": [{
                    "id": record_id,
                    "fields": {"Messages Sent": new_total}
                }]
            }
            
            update_response = requests.patch(url, headers=headers, json=update_data)
            return update_response.status_code in [200, 201], new_total
    
    return False, 0

def main():
    print("🚀 DETROIT OUTREACH: 100 ADDITIONAL MESSAGES")
    print(f"⏰ Started: {datetime.now().strftime('%I:%M:%S %p PST')}")
    
    # Get template
    template = get_approved_template()
    print(f"📝 Template: {template[:50]}...")
    
    # Find eligible contacts
    contacts = find_detroit_contacts(100)
    
    if len(contacts) < 100:
        print(f"⚠️ Warning: Only found {len(contacts)} eligible contacts")
    
    if not contacts:
        print("❌ No eligible contacts found")
        return
    
    # Send messages
    sent_count = 0
    failed_count = 0
    
    print(f"\n📱 SENDING MESSAGES TO {len(contacts)} CONTACTS:")
    
    for i, contact in enumerate(contacts):
        name = contact.get('contactName', '') or contact.get('firstName', '') or 'there'
        phone = contact.get('phone')
        message = template.replace('{name}', name)
        
        print(f"   {i+1:3d}/{len(contacts)} - {name} ({phone})", end='')
        
        # Send SMS
        if send_sms(contact['id'], message):
            # Add tag
            if add_sms_sent_tag(contact['id']):
                sent_count += 1
                print(" ✅")
            else:
                failed_count += 1
                print(" ⚠️ (sent, tag failed)")
        else:
            failed_count += 1
            print(" ❌ (send failed)")
        
        # Rate limiting: 5 messages per 5 minutes = 1 per minute
        if (i + 1) % 5 == 0 and i + 1 < len(contacts):
            print(f"   ⏱️ Rate limit pause (5 minutes)...")
            time.sleep(300)
        else:
            time.sleep(12)  # 12 seconds between messages
    
    # Update tracker
    success, new_total = update_outreach_tracker(sent_count)
    
    print(f"\n🎯 FINAL RESULTS:")
    print(f"   ✅ Successfully sent: {sent_count}")
    print(f"   ❌ Failed: {failed_count}")
    print(f"   📊 Success rate: {sent_count/(sent_count+failed_count)*100:.1f}%")
    if success:
        print(f"   📈 Total messages today: {new_total}")
        print(f"   📱 Outreach tracker updated ✅")
    else:
        print(f"   ❌ Failed to update outreach tracker")

if __name__ == "__main__":
    main()