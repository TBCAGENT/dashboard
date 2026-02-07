#!/usr/bin/env python3
"""
QUICK DETROIT SEARCH - Find a few unmessaged Detroit agents immediately
"""

import requests
import json
import os

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

env = load_env()

headers = {
    "Authorization": f"Bearer {env['GHL_API_KEY']}",
    "Version": "2021-07-28"
}

print("🔍 Quick search for unmessaged Detroit agents...")

found_agents = []
start_after_id = ""
start_after_time = ""
pages_checked = 0

# Search through several pages
while len(found_agents) < 20 and pages_checked < 10:
    params = {
        "locationId": env['GHL_LOCATION_ID'], 
        "limit": 100
    }
    
    if start_after_id and start_after_time:
        params["startAfterId"] = start_after_id
        params["startAfter"] = start_after_time
    
    try:
        response = requests.get(
            "https://services.leadconnectorhq.com/contacts/",
            headers=headers,
            params=params,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            batch = data.get('contacts', [])
            
            if not batch:
                break
            
            batch_found = 0
            for contact in batch:
                if not contact.get('phone'):
                    continue
                
                tags = [tag.lower() for tag in contact.get('tags', [])]
                name = (contact.get('contactName', '') or '').lower()
                
                # Look for Detroit indicators (broader search)
                is_detroit = (
                    'detroit' in ' '.join(tags) or 
                    'detroit' in name or
                    'michigan' in name or
                    'mi' in name
                )
                
                is_messaged = 'sms sent' in ' '.join(tags)
                
                if is_detroit and not is_messaged and contact.get('phone'):
                    found_agents.append({
                        'name': contact.get('contactName', 'Unknown'),
                        'phone': contact.get('phone'),
                        'id': contact['id'],
                        'tags': contact.get('tags', [])
                    })
                    batch_found += 1
            
            pages_checked += 1
            print(f"Page {pages_checked}: Found {batch_found} unmessaged Detroit agents | Total: {len(found_agents)}")
            
            # Get next page
            meta = data.get('meta', {})
            start_after_id = meta.get('startAfterId')
            start_after_time = meta.get('startAfter')
            
            if not start_after_id:
                break
                
        else:
            print(f"API Error: {response.status_code}")
            break
            
    except Exception as e:
        print(f"Error: {e}")
        break

print(f"\n🎯 FOUND {len(found_agents)} unmessaged Detroit agents:")

for i, agent in enumerate(found_agents[:10]):
    print(f"{i+1:2d}. {agent['name']} | {agent['phone']} | Tags: {agent['tags']}")

if len(found_agents) > 10:
    print(f"... and {len(found_agents) - 10} more")

print(f"\nReady to message {len(found_agents)} Detroit agents!")