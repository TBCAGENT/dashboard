#!/usr/bin/env python3
"""
SIMPLE OUTREACH - Direct approach to find and message Detroit agents
"""

import requests
import json
import time
import os

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

# Get approved template
print("📝 Getting approved template...")
headers_at = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
response = requests.get(
    "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/SMS%20Templates?filterByFormula=Approved",
    headers=headers_at
)
template = response.json()['records'][0]['fields']['Message Text']
print(f"✅ Template: {template}")

# Search for contacts
headers = {
    "Authorization": f"Bearer {env['GHL_API_KEY']}",
    "Version": "2021-07-28"
}

print("🔍 Searching for unmessaged Detroit agents...")
found_agents = []
page = 1
start_after_id = ""
start_after_time = ""

while page <= 5 and len(found_agents) < 50:  # Limit to first 5 pages
    params = {
        "locationId": env['GHL_LOCATION_ID'], 
        "limit": 100
    }
    
    if start_after_id and start_after_time:
        params["startAfterId"] = start_after_id
        params["startAfter"] = start_after_time
    
    response = requests.get(
        "https://services.leadconnectorhq.com/contacts/",
        headers=headers,
        params=params
    )
    
    if response.status_code != 200:
        break
    
    data = response.json()
    contacts = data.get('contacts', [])
    
    if not contacts:
        break
    
    page_found = 0
    for contact in contacts:
        if not contact.get('phone'):
            continue
            
        tags = contact.get('tags', [])
        tags_lower = [tag.lower() for tag in tags]
        
        # Check for Detroit
        is_detroit = 'detroit' in tags_lower
        
        # Check for NOT messaged (looking for absence of "SMS sent")
        is_messaged = any('sms sent' in tag.lower() for tag in tags)
        
        if is_detroit and not is_messaged:
            found_agents.append({
                'name': contact.get('contactName', 'Unknown'),
                'phone': contact.get('phone'),
                'id': contact['id'],
                'tags': tags
            })
            page_found += 1
    
    print(f"Page {page}: Found {page_found} unmessaged Detroit agents | Total: {len(found_agents)}")
    
    # Get next page
    meta = data.get('meta', {})
    start_after_id = meta.get('startAfterId')
    start_after_time = meta.get('startAfter')
    
    if not start_after_id:
        break
    
    page += 1

print(f"\n🎯 Found {len(found_agents)} unmessaged Detroit agents")

if not found_agents:
    print("❌ No unmessaged agents found!")
    exit(0)

# Show first few
for i, agent in enumerate(found_agents[:10]):
    print(f"{i+1}. {agent['name']} | {agent['phone']} | {agent['tags']}")

if len(found_agents) > 10:
    print(f"... and {len(found_agents) - 10} more")

# Send messages
sent_count = 0
print(f"\n📤 SENDING MESSAGES TO {len(found_agents)} AGENTS:")

for i, agent in enumerate(found_agents):
    name = agent['name'].split()[0] if agent['name'] and agent['name'] != 'Unknown' else 'there'
    message = template.replace("[First Name]", name)
    
    print(f"{i+1:2d}. {name} ({agent['phone']})", end=' ... ')
    
    try:
        # Send SMS
        msg_response = requests.post(
            "https://services.leadconnectorhq.com/conversations/messages",
            headers={**headers, "Content-Type": "application/json"},
            json={
                "type": "SMS",
                "contactId": agent['id'],
                "locationId": env['GHL_LOCATION_ID'],
                "message": message
            }
        )
        
        if msg_response.status_code in [200, 201]:
            # Add SMS sent tag
            requests.post(
                f"https://services.leadconnectorhq.com/contacts/{agent['id']}/tags",
                headers={**headers, "Content-Type": "application/json"},
                json={"tags": ["SMS sent"]}
            )
            sent_count += 1
            print("✅")
            time.sleep(0.5)  # Rate limiting
        else:
            print(f"❌ {msg_response.status_code}")
            
    except Exception as e:
        print(f"❌ {e}")

print(f"\n🎉 FINAL RESULT: {sent_count} messages sent successfully!")