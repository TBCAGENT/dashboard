#!/usr/bin/env python3
"""
SEND TO FOUND AGENTS - Send messages to discovered Detroit agents
"""

import requests
import json
import time
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

def find_more_agents(env, current_count, target=100):
    """Find more agents to reach target"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    found_agents = []
    start_after_id = ""
    start_after_time = ""
    pages_checked = 0
    
    print(f"🔍 Searching for {target - current_count} more Detroit agents...")
    
    while len(found_agents) < (target - current_count) and pages_checked < 30:
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
                
                for contact in batch:
                    if len(found_agents) >= (target - current_count):
                        break
                        
                    if not contact.get('phone'):
                        continue
                    
                    tags = [tag.lower() for tag in contact.get('tags', [])]
                    name = (contact.get('contactName', '') or '').lower()
                    
                    is_detroit = (
                        'detroit' in ' '.join(tags) or 
                        'detroit' in name or
                        'michigan' in name
                    )
                    
                    is_messaged = 'sms sent' in ' '.join(tags)
                    
                    if is_detroit and not is_messaged and contact.get('phone'):
                        found_agents.append({
                            'name': contact.get('contactName', 'Unknown'),
                            'phone': contact.get('phone'),
                            'id': contact['id']
                        })
                
                pages_checked += 1
                if pages_checked % 5 == 0:
                    print(f"  Checked {pages_checked} pages, found {len(found_agents)} more agents")
                
                # Get next page
                meta = data.get('meta', {})
                start_after_id = meta.get('startAfterId')
                start_after_time = meta.get('startAfter')
                
                if not start_after_id:
                    break
                    
            else:
                break
                
        except Exception as e:
            print(f"Error: {e}")
            break
    
    return found_agents

def send_messages_to_agents(agents, env, template):
    """Send messages to the list of agents"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    sent_count = 0
    failed_count = 0
    
    print(f"\n📤 SENDING MESSAGES TO {len(agents)} DETROIT AGENTS:")
    
    for i, agent in enumerate(agents):
        name = agent['name'].split()[0] if agent['name'] else 'there'
        message = template.replace("[First Name]", name)
        
        print(f"{i+1:3d}. {name} ({agent['phone']})", end=' ... ')
        
        try:
            # Send SMS
            msg_response = requests.post(
                "https://services.leadconnectorhq.com/conversations/messages",
                headers=headers,
                json={
                    "type": "SMS",
                    "contactId": agent['id'],
                    "locationId": env['GHL_LOCATION_ID'],
                    "message": message
                },
                timeout=10
            )
            
            if msg_response.status_code in [200, 201]:
                # Add SMS sent tag
                requests.post(
                    f"https://services.leadconnectorhq.com/contacts/{agent['id']}/tags",
                    headers=headers,
                    json={"tags": ["SMS sent"]},
                    timeout=8
                )
                sent_count += 1
                print("✅ SENT")
                time.sleep(0.8)  # Rate limiting
            else:
                failed_count += 1
                error_msg = msg_response.text[:30] if msg_response.text else f"HTTP {msg_response.status_code}"
                print(f"❌ {error_msg}")
                
        except Exception as e:
            failed_count += 1
            print(f"❌ Error: {e}")
    
    return sent_count, failed_count

def main():
    env = load_env()
    
    print("🚀 SENDING TO FOUND DETROIT AGENTS")
    
    # Get template
    template = get_approved_template(env)
    if not template:
        print("❌ No approved template found!")
        return
    
    print(f"✅ Template: {template}")
    
    # Initial batch from quick search (26 agents)
    initial_agents = [
        {'name': 'anne sloan', 'phone': '+17344763444', 'id': 'contact_id_1'},
        {'name': 'maureen peterson', 'phone': '+17349154399', 'id': 'contact_id_2'},
        # ... We'll get the real IDs from a fresh search
    ]
    
    # First, let's get a fresh list of unmessaged agents
    print("🔍 Getting fresh list of unmessaged Detroit agents...")
    
    fresh_agents = []
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    # Quick search for the first batch
    params = {"locationId": env['GHL_LOCATION_ID'], "limit": 100}
    
    try:
        response = requests.get(
            "https://services.leadconnectorhq.com/contacts/",
            headers=headers,
            params=params,
            timeout=10
        )
        
        if response.status_code == 200:
            contacts = response.json().get('contacts', [])
            
            for contact in contacts:
                if not contact.get('phone'):
                    continue
                
                tags = [tag.lower() for tag in contact.get('tags', [])]
                
                if 'detroit' in ' '.join(tags) and 'sms sent' not in ' '.join(tags):
                    fresh_agents.append({
                        'name': contact.get('contactName', 'Unknown'),
                        'phone': contact.get('phone'),
                        'id': contact['id']
                    })
    
    except Exception as e:
        print(f"Error getting fresh list: {e}")
        return
    
    print(f"Found {len(fresh_agents)} agents ready to message")
    
    if not fresh_agents:
        print("❌ No unmessaged Detroit agents found!")
        return
    
    # Send to first batch
    sent, failed = send_messages_to_agents(fresh_agents, env, template)
    
    print(f"\n🎉 FIRST BATCH COMPLETE: {sent} sent, {failed} failed")
    
    # Get more agents if needed
    if sent < 100:
        more_agents = find_more_agents(env, sent, 100)
        if more_agents:
            print(f"\n🔍 Found {len(more_agents)} additional agents")
            sent2, failed2 = send_messages_to_agents(more_agents, env, template)
            print(f"\n🎉 FINAL RESULT: {sent + sent2} total sent, {failed + failed2} total failed")
        else:
            print(f"\n🎉 FINAL RESULT: {sent} total sent (no more agents found)")

if __name__ == "__main__":
    main()