#!/usr/bin/env python3
"""
DETROIT AGENT FINDER - Find 100 unmessaged Detroit agents
Simple focused approach to find agents quickly
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

def find_detroit_agents(env, needed_count=100):
    """Find unmessaged Detroit agents efficiently"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    detroit_agents = []
    start_after_id = ""
    start_after_time = ""
    page = 1
    
    print(f"🔍 Searching for {needed_count} unmessaged Detroit agents...")
    
    while len(detroit_agents) < needed_count and page <= 50:  # Safety limit
        try:
            params = {
                "locationId": env['GHL_LOCATION_ID'], 
                "limit": 100
            }
            
            # Add pagination if not first page
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
                    break
                
                batch_detroit = 0
                for contact in batch:
                    if len(detroit_agents) >= needed_count:
                        break
                        
                    if not contact.get('phone'):
                        continue
                        
                    tags = [tag.lower() for tag in contact.get('tags', [])]
                    
                    # Look for Detroit indicators
                    is_detroit = 'detroit' in ' '.join(tags)
                    is_messaged = 'sms sent' in ' '.join(tags)
                    
                    if is_detroit and not is_messaged:
                        detroit_agents.append(contact)
                        batch_detroit += 1
                
                print(f"📋 Page {page}: Found {batch_detroit} unmessaged Detroit agents | Total: {len(detroit_agents)}/{needed_count}")
                
                # Get next page info
                meta = data.get('meta', {})
                start_after_id = meta.get('startAfterId')
                start_after_time = meta.get('startAfter')
                
                if not start_after_id:
                    print("📋 Reached end of contacts")
                    break
                    
                page += 1
                time.sleep(0.1)  # Minimal rate limiting
                
            else:
                print(f"❌ API error {response.status_code}")
                break
                
        except Exception as e:
            print(f"❌ Error: {e}")
            break
    
    return detroit_agents

def send_messages_batch(agents, env, target=100):
    """Send messages to Detroit agents"""
    # Get approved template
    headers_airtable = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    try:
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/SMS%20Templates?filterByFormula=Approved",
            headers=headers_airtable
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            if records:
                template = records[0]['fields']['Message Text']
                print(f"✅ Template: {template}")
            else:
                print("❌ No approved template!")
                return 0
        else:
            print("❌ Could not fetch template!")
            return 0
    except Exception as e:
        print(f"❌ Template error: {e}")
        return 0
    
    # Send messages
    headers_ghl = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    sent_count = 0
    
    print(f"\n📤 SENDING {min(target, len(agents))} MESSAGES:")
    
    for i, agent in enumerate(agents[:target]):
        contact_id = agent['id']
        phone = agent.get('phone')
        name = agent.get('contactName', '').split()[0] or agent.get('firstName', '') or 'there'
        
        message = template.replace("[First Name]", name)
        
        print(f"{i+1:3d}. {name} ({phone})", end=' ... ')
        
        try:
            # Send SMS
            msg_response = requests.post(
                "https://services.leadconnectorhq.com/conversations/messages",
                headers=headers_ghl,
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
                    headers=headers_ghl,
                    json={"tags": ["SMS sent"]},
                    timeout=8
                )
                sent_count += 1
                print("✅")
                time.sleep(0.8)  # Rate limiting
            else:
                print(f"❌ {msg_response.status_code}")
                
        except Exception as e:
            print(f"❌ {e}")
    
    return sent_count

def main():
    env = load_env()
    print(f"🚀 DETROIT AGENT OUTREACH - {datetime.now().strftime('%I:%M:%S %p')}")
    
    # Find agents
    agents = find_detroit_agents(env, 100)
    print(f"\n🎯 Found {len(agents)} unmessaged Detroit agents")
    
    if not agents:
        print("❌ No unmessaged Detroit agents found!")
        return 0
    
    # Send messages
    sent = send_messages_batch(agents, env, 100)
    print(f"\n🎉 SUCCESS: {sent} messages sent to Detroit agents!")
    
    return sent

if __name__ == "__main__":
    main()