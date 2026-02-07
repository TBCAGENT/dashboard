#!/usr/bin/env python3
"""
SEND TO CSV CONTACTS - Send messages to the 95 contacts Luke provided
"""

import requests
import json
import time
import os
import csv

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
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    try:
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/SMS%20Templates?filterByFormula=Approved",
            headers=headers
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            if records:
                return records[0]['fields']['Message Text']
    except:
        pass
    return None

def send_message_to_contact(contact, env, template, headers):
    """Send message to one contact"""
    contact_id = contact['Contact Id']
    first_name = contact['First Name']
    phone = contact['Phone']
    
    # Use first name, fall back to 'there'
    name = first_name if first_name and first_name.strip() else 'there'
    message = template.replace("[First Name]", name)
    
    print(f"  {name} ({phone})", end=' ... ')
    
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
            print("✅ SENT + TAGGED")
            return True
        else:
            print(f"❌ MSG FAILED {msg_response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False

def main():
    env = load_env()
    
    print("🚀 SENDING TO CSV CONTACTS")
    
    # Get template
    template = get_approved_template(env)
    if not template:
        print("❌ No approved template found!")
        return
    
    print(f"✅ Template: {template}")
    
    # Load CSV contacts
    csv_file = '/Users/lukefontaine/.openclaw/media/inbound/1cbc6cf3-eee4-45f0-92af-82b636fd81c9.csv'
    contacts = []
    
    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            contacts.append(row)
    
    print(f"📋 Loaded {len(contacts)} contacts from CSV")
    
    # Setup headers
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    # Send messages
    sent_count = 0
    failed_count = 0
    
    print(f"\n📤 SENDING MESSAGES TO {len(contacts)} CONTACTS:")
    
    for i, contact in enumerate(contacts):
        print(f"{i+1:2d}.", end=' ')
        
        success = send_message_to_contact(contact, env, template, headers)
        
        if success:
            sent_count += 1
        else:
            failed_count += 1
        
        # Rate limiting
        time.sleep(0.6)  
    
    print(f"\n🎉 FINAL RESULT:")
    print(f"✅ {sent_count} messages sent successfully")
    print(f"❌ {failed_count} messages failed")
    print(f"📊 Success rate: {(sent_count/(sent_count+failed_count)*100):.1f}%")

if __name__ == "__main__":
    main()