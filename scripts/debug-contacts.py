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

def debug_contacts():
    env = load_env()
    
    url = f"{env['GHL_BASE_URL']}/contacts/"
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    params = {
        "locationId": env['GHL_LOCATION_ID'],
        "limit": 100
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        contacts = response.json().get('contacts', [])
        
        print(f"Total contacts retrieved: {len(contacts)}")
        
        detroit_contacts = []
        sms_sent_contacts = []
        eligible_contacts = []
        
        for contact in contacts:
            if not contact.get('tags'):
                continue
                
            tags = [tag.lower() for tag in contact['tags']]
            has_detroit = 'detroit' in tags
            has_sms_sent = 'sms sent' in tags
            
            if has_detroit:
                detroit_contacts.append(contact)
                
                if has_sms_sent:
                    sms_sent_contacts.append(contact)
                else:
                    eligible_contacts.append(contact)
        
        print(f"Contacts with 'detroit' tag: {len(detroit_contacts)}")
        print(f"Contacts with 'detroit' + 'sms sent': {len(sms_sent_contacts)}")
        print(f"Eligible (detroit, no sms sent): {len(eligible_contacts)}")
        
        if eligible_contacts:
            print(f"\nFirst 3 eligible contacts:")
            for i, contact in enumerate(eligible_contacts[:3]):
                print(f"{i+1}. {contact.get('contactName', 'Unknown')} - {contact.get('phone', 'No phone')} - Tags: {contact.get('tags', [])}")
    else:
        print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    debug_contacts()