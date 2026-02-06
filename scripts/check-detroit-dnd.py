#!/usr/bin/env python3

import requests
import json
import os

def load_env():
    env_vars = {}
    ghl_secrets = os.path.expanduser('~/.config/gohighlevel/secrets.env')
    with open(ghl_secrets) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                env_vars[key] = value.strip('"\'')
    return env_vars

def check_detroit_dnd():
    env = load_env()
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    # Get all contacts in batches
    all_detroit_contacts = []
    start_after = None
    page = 0
    
    print("🔍 Scanning all Detroit contacts for DND status...")
    
    while page < 50:  # Max 50 pages
        params = {
            "locationId": env['GHL_LOCATION_ID'],
            "limit": 100
        }
        
        if start_after:
            params["startAfter"] = start_after
            
        try:
            response = requests.get(
                f"{env['GHL_BASE_URL']}/contacts/",
                headers=headers,
                params=params,
                timeout=30
            )
            
            if response.status_code != 200:
                print(f"❌ API Error: {response.status_code}")
                break
                
            data = response.json()
            contacts = data.get('contacts', [])
            page += 1
            
            if not contacts:
                break
            
            # Filter for Detroit contacts
            for contact in contacts:
                if contact.get('tags') and any('detroit' in tag.lower() for tag in contact['tags']):
                    all_detroit_contacts.append(contact)
            
            print(f"📄 Page {page}: Found {len(all_detroit_contacts)} Detroit contacts so far...")
            
            start_after = data.get('meta', {}).get('startAfter')
            if not start_after:
                break
                
        except Exception as e:
            print(f"❌ Error on page {page}: {e}")
            break
    
    print(f"\n📊 DETROIT CONTACT ANALYSIS:")
    print(f"   Total Detroit contacts: {len(all_detroit_contacts)}")
    
    # Analyze DND status
    clean_contacts = []
    dnd_contacts = []
    sms_sent_contacts = []
    eligible_contacts = []
    
    for contact in all_detroit_contacts:
        has_sms_sent = any('sms sent' in tag.lower() for tag in contact.get('tags', []))
        
        # Check DND status
        dnd_settings = contact.get('dndSettings', {})
        sms_dnd = dnd_settings.get('SMS', {})
        is_dnd = sms_dnd.get('status') in ['permanent', 'temporary']
        
        if has_sms_sent:
            sms_sent_contacts.append(contact)
        elif is_dnd:
            dnd_contacts.append(contact)
        else:
            eligible_contacts.append(contact)
            
        if not is_dnd:
            clean_contacts.append(contact)
    
    print(f"   📱 Already messaged (SMS sent): {len(sms_sent_contacts)}")
    print(f"   ❌ DND/Unsubscribed: {len(dnd_contacts)}")
    print(f"   ✅ Clean & eligible: {len(eligible_contacts)}")
    print(f"   📋 Total clean contacts: {len(clean_contacts)}")
    
    if dnd_contacts:
        print(f"\n⚠️ DND CONTACTS (first 5):")
        for i, contact in enumerate(dnd_contacts[:5]):
            name = contact.get('contactName', 'Unknown')
            phone = contact.get('phone', 'No phone')
            dnd_msg = contact.get('dndSettings', {}).get('SMS', {}).get('message', 'Unknown')
            print(f"   {i+1}. {name} ({phone}) - {dnd_msg}")
    
    if eligible_contacts:
        print(f"\n✅ ELIGIBLE FOR MESSAGING (first 10):")
        for i, contact in enumerate(eligible_contacts[:10]):
            name = contact.get('contactName', 'Unknown')  
            phone = contact.get('phone', 'No phone')
            print(f"   {i+1}. {name} ({phone})")
    
    return len(eligible_contacts)

if __name__ == "__main__":
    eligible_count = check_detroit_dnd()
    print(f"\n🎯 RESULT: {eligible_count} contacts ready for messaging!")