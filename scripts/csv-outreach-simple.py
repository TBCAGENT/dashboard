#!/usr/bin/env python3
"""
CSV OUTREACH - Send to all remaining contacts from CSV
"""

import requests
import csv
import time
import os

# Load env vars
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
print("📝 Getting approved template...")
headers_at = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
response = requests.get(
    "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/SMS%20Templates?filterByFormula=Approved",
    headers=headers_at
)
template = response.json()['records'][0]['fields']['Message Text']
print(f"✅ Template: {template}")

# Load contacts from CSV
csv_file = '/Users/lukefontaine/.openclaw/media/inbound/1cbc6cf3-eee4-45f0-92af-82b636fd81c9.csv'
contacts = []

with open(csv_file, 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        contacts.append(row)

print(f"📋 Loaded {len(contacts)} contacts")

# Setup headers for GHL
headers = {
    "Authorization": f"Bearer {env['GHL_API_KEY']}",
    "Version": "2021-07-28",
    "Content-Type": "application/json"
}

# Send messages
sent = 0
failed = 0

print(f"\n📤 SENDING MESSAGES (starting from #2 since #1 already sent):")

for i, contact in enumerate(contacts[1:], 2):  # Skip first contact (already sent)
    contact_id = contact['Contact Id']
    first_name = contact['First Name']
    phone = contact['Phone']
    
    name = first_name if first_name and first_name.strip() else 'there'
    message = template.replace("[First Name]", name)
    
    print(f"{i:2d}. {name} ({phone})", end=' ... ')
    
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
            }
        )
        
        if msg_response.status_code in [200, 201]:
            # Add SMS sent tag
            requests.post(
                f"https://services.leadconnectorhq.com/contacts/{contact_id}/tags",
                headers=headers,
                json={"tags": ["SMS sent"]}
            )
            sent += 1
            print("✅")
        else:
            failed += 1
            print(f"❌ {msg_response.status_code}")
            
    except Exception as e:
        failed += 1
        print(f"❌ {e}")
    
    time.sleep(0.6)  # Rate limiting

print(f"\n🎉 COMPLETE:")
print(f"✅ {sent + 1} total sent (including #1 sent earlier)")  # +1 for the first contact we sent manually
print(f"❌ {failed} failed")
print(f"📊 Success rate: {((sent + 1)/(len(contacts))*100):.1f}%")