#!/usr/bin/env python3
"""
BULK CSV OUTREACH - Send to all remaining contacts
Fast, simple, reliable
"""

import requests
import csv
import time
import os
import sys

# Load credentials
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

# Get template
print("📝 Getting template...", end=' ')
headers_at = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
response = requests.get(
    "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/SMS%20Templates?filterByFormula=Approved",
    headers=headers_at
)
template = response.json()['records'][0]['fields']['Message Text']
print("✅")

# Load CSV
print("📋 Loading contacts...", end=' ')
csv_file = '/Users/lukefontaine/.openclaw/media/inbound/1cbc6cf3-eee4-45f0-92af-82b636fd81c9.csv'
contacts = []
with open(csv_file, 'r') as f:
    reader = csv.DictReader(f)
    contacts = list(reader)
print(f"✅ {len(contacts)} loaded")

# Headers for GHL
headers = {
    "Authorization": f"Bearer {env['GHL_API_KEY']}",
    "Version": "2021-07-28",
    "Content-Type": "application/json"
}

# Start from contact #4 (we already sent to 1,2,3)
start_index = 3
sent = 3  # Already sent to first 3
failed = 0

print(f"\n📤 SENDING TO REMAINING {len(contacts) - start_index} CONTACTS:")
print("Starting from contact #4...")

for i in range(start_index, len(contacts)):
    contact = contacts[i]
    
    contact_id = contact['Contact Id']
    first_name = contact['First Name']
    last_name = contact['Last Name']
    phone = contact['Phone']
    
    name = first_name.strip() if first_name.strip() else 'there'
    message = template.replace("[First Name]", name)
    
    print(f"{i+1:2d}. {name} {last_name} ({phone})", end=' ')
    sys.stdout.flush()  # Force output immediately
    
    try:
        # Send message
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
            # Add tag
            tag_response = requests.post(
                f"https://services.leadconnectorhq.com/contacts/{contact_id}/tags",
                headers=headers,
                json={"tags": ["SMS sent"]},
                timeout=10
            )
            sent += 1
            print("✅")
        else:
            failed += 1
            print(f"❌ {msg_response.status_code}")
            
    except Exception as e:
        failed += 1
        print(f"❌ ERROR")
    
    # Rate limiting
    time.sleep(0.7)
    
    # Progress update every 10 contacts
    if (i + 1) % 10 == 0:
        remaining = len(contacts) - (i + 1)
        print(f"   📊 Progress: {sent}/{len(contacts)} sent, {remaining} remaining")

print(f"\n🎉 FINAL RESULT:")
print(f"✅ {sent} total messages sent")
print(f"❌ {failed} failed")
print(f"📊 Success rate: {(sent/(sent+failed)*100):.1f}%")