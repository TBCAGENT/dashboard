#!/usr/bin/env python3

import requests
import json
import os

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
    
    return env_vars

def count_detroit_contacts():
    env = load_env()
    
    url = f"{env['GHL_BASE_URL']}/contacts/"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    detroit_total = 0
    sms_sent_total = 0
    eligible_total = 0
    start_after = None
    
    print("🔍 Scanning all GHL contacts for Detroit inventory...")
    
    while True:
        params = {
            "locationId": env['GHL_LOCATION_ID'],
            "limit": 100
        }
        
        if start_after:
            params["startAfter"] = start_after
        
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code != 200:
            print(f"Error: {response.status_code} - {response.text}")
            break
            
        data = response.json()
        contacts = data.get('contacts', [])
        
        if not contacts:
            break
            
        # Process this batch
        for contact in contacts:
            if not contact.get('tags'):
                continue
                
            tags = [tag.lower() for tag in contact['tags']]
            has_detroit = 'detroit' in tags
            has_sms_sent = 'sms sent' in tags
            
            if has_detroit:
                detroit_total += 1
                
                if has_sms_sent:
                    sms_sent_total += 1
                else:
                    eligible_total += 1
        
        # Check if there are more pages
        start_after = data.get('meta', {}).get('startAfter')
        if not start_after:
            break
            
        print(f"   Processed batch... Detroit contacts found so far: {detroit_total}")
    
    print(f"\n📊 DETROIT INVENTORY REPORT:")
    print(f"   🏢 Total Detroit contacts: {detroit_total:,}")
    print(f"   📱 Already messaged (SMS sent): {sms_sent_total:,}")  
    print(f"   ✅ Available for outreach: {eligible_total:,}")
    print(f"   📈 Utilization: {(sms_sent_total/detroit_total*100):.1f}% contacted")
    
    return eligible_total

if __name__ == "__main__":
    count_detroit_contacts()