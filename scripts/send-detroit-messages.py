#!/usr/bin/env python3

import requests
import json
import time
import sys
import os

# Load environment variables
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
    """Get the approved SMS template from Airtable"""
    env = load_env()
    
    url = f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblWBmLI6D3B6PMFj"
    headers = {
        "Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"
    }
    
    params = {
        "filterByFormula": "Approved='Approved'"
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        records = response.json().get('records', [])
        if records:
            return records[0]['fields']['Message Text']
    
    # Default template if none found
    return "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."

def get_detroit_contacts(limit=100):
    """Get contacts with Detroit tag but no SMS sent tag - with pagination"""
    env = load_env()
    
    url = f"{env['GHL_BASE_URL']}/contacts/"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    eligible = []
    start_after = None
    pages_checked = 0
    max_pages = 20  # Prevent infinite loops
    
    print(f"🔍 Scanning GHL contacts for Detroit inventory...")
    
    while len(eligible) < limit and pages_checked < max_pages:
        params = {
            "locationId": env['GHL_LOCATION_ID'],
            "limit": 100
        }
        
        if start_after:
            params["startAfter"] = start_after
        
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code != 200:
            print(f"   API Error: {response.status_code}")
            break
            
        data = response.json()
        contacts = data.get('contacts', [])
        pages_checked += 1
        
        if not contacts:
            print(f"   No more contacts found after {pages_checked} pages")
            break
        
        # Filter this batch for Detroit tag but no SMS sent tag
        batch_found = 0
        for contact in contacts:
            if len(eligible) >= limit:
                break
                
            if not contact.get('tags') or not contact.get('phone'):
                continue
                
            has_detroit = any('detroit' in tag.lower() for tag in contact['tags'])
            has_sms_sent = any('sms sent' in tag.lower() for tag in contact['tags'])
            
            if has_detroit and not has_sms_sent:
                eligible.append(contact)
                batch_found += 1
                if len(eligible) <= 5:  # Only show first few
                    print(f"   Found: {contact.get('contactName', 'Unknown')} - {contact.get('phone')}")
        
        print(f"   Page {pages_checked}: Found {batch_found} eligible contacts (Total: {len(eligible)})")
        
        # Check if there are more pages
        start_after = data.get('meta', {}).get('startAfter')
        if not start_after:
            print(f"   Reached end of contacts after {pages_checked} pages")
            break
    
    print(f"🎯 Final result: {len(eligible)} eligible contacts found from {pages_checked} pages")
    return eligible

def send_sms(contact_id, message):
    """Send SMS via GHL API"""
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
    
    data = {
        "tags": ["SMS sent"]
    }
    
    response = requests.post(url, headers=headers, json=data)
    return response.status_code in [200, 201]

def update_outreach_tracker(additional_messages):
    """Update the outreach tracker in Airtable"""
    env = load_env()
    
    # First, get today's record
    url = f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv"
    headers = {
        "Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"
    }
    
    params = {
        "filterByFormula": "IS_SAME(Date,TODAY())"
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        records = response.json().get('records', [])
        if records:
            record_id = records[0]['id']
            current_messages = records[0]['fields'].get('Messages Sent', 0)
            new_total = current_messages + additional_messages
            
            # Update the record
            update_url = f"https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv"
            update_data = {
                "records": [
                    {
                        "id": record_id,
                        "fields": {
                            "Messages Sent": new_total
                        }
                    }
                ]
            }
            
            update_response = requests.patch(update_url, headers=headers, json=update_data)
            return update_response.status_code in [200, 201]
    
    return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 send-detroit-messages.py <number_of_messages>")
        sys.exit(1)
    
    try:
        num_messages = int(sys.argv[1])
    except ValueError:
        print("Error: Number of messages must be an integer")
        sys.exit(1)
    
    print(f"🚀 Starting Detroit outreach: {num_messages} messages")
    
    # Get approved template
    template = get_approved_template()
    print(f"📝 Using template: {template[:50]}...")
    
    # Get eligible contacts
    print("🔍 Finding eligible contacts...")
    contacts = get_detroit_contacts(num_messages)
    
    if len(contacts) < num_messages:
        print(f"⚠️ Warning: Only {len(contacts)} eligible contacts found, requested {num_messages}")
        num_messages = len(contacts)
    
    print(f"👥 Found {len(contacts)} eligible contacts")
    
    # Send messages
    sent_count = 0
    failed_count = 0
    
    for i, contact in enumerate(contacts):
        name = contact.get('firstName', '') or contact.get('contactName', 'there')
        message = template.replace('{name}', name)
        
        print(f"📱 Sending {i+1}/{num_messages} to {name} ({contact['phone']})")
        
        # Send SMS
        if send_sms(contact['id'], message):
            # Add SMS sent tag
            if add_sms_sent_tag(contact['id']):
                sent_count += 1
                print(f"   ✅ Sent + tagged")
            else:
                print(f"   ⚠️ Sent but tagging failed")
        else:
            failed_count += 1
            print(f"   ❌ Failed to send")
        
        # Rate limiting: 5 messages every 5 minutes (1 per minute)
        if (i + 1) % 5 == 0 and i + 1 < len(contacts):
            print("⏱️ Rate limit pause (5 minutes)...")
            time.sleep(300)  # 5 minutes
        else:
            time.sleep(12)  # 12 seconds between messages
    
    # Update outreach tracker
    print("📊 Updating outreach tracker...")
    if update_outreach_tracker(sent_count):
        print("✅ Outreach tracker updated")
    else:
        print("❌ Failed to update outreach tracker")
    
    print(f"\n🎯 RESULTS:")
    print(f"   ✅ Sent: {sent_count}")
    print(f"   ❌ Failed: {failed_count}")
    if sent_count + failed_count > 0:
        print(f"   📊 Success rate: {sent_count/(sent_count+failed_count)*100:.1f}%")
    else:
        print(f"   📊 Success rate: 0% (no messages attempted)")
    
    return sent_count

if __name__ == "__main__":
    main()