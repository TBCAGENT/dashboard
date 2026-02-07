#!/usr/bin/env python3
"""
AGGRESSIVE CONTACT SEARCH
Try multiple approaches to find all 3,322 contacts in the Smart List
"""

import requests
import time
import os

def load_env():
    env = {}
    with open(os.path.expanduser('~/.config/gohighlevel/secrets.env')) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                env[k] = v.strip('"\'')
    return env

def aggressive_search():
    env = load_env()
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    print("🔍 AGGRESSIVE SEARCH for all contacts...")
    
    all_contacts = []
    start_after = ""
    batch_count = 0
    max_batches = 100  # Safety limit
    
    while batch_count < max_batches:
        try:
            params = {
                "locationId": env['GHL_LOCATION_ID'], 
                "limit": 100
            }
            if start_after:
                params["startAfter"] = start_after
                
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
                    print(f"📋 No more contacts found after {batch_count} batches")
                    break
                
                all_contacts.extend(batch)
                batch_count += 1
                
                # Count Detroit-related contacts in this batch
                detroit_count = 0
                for contact in batch:
                    tags = [tag.lower() for tag in contact.get('tags', [])]
                    name = (contact.get('contactName', '') or '').lower()
                    
                    if 'detroit' in ' '.join(tags) or 'detroit' in name:
                        detroit_count += 1
                
                print(f"📋 Batch {batch_count}: {len(batch)} contacts, {detroit_count} Detroit, total: {len(all_contacts)}")
                
                # Get next page
                meta = data.get('meta', {})
                start_after = meta.get('nextPageStartAfter')
                
                if not start_after:
                    print(f"📋 Reached end - no more pagination")
                    break
                    
                time.sleep(0.5)  # Rate limiting
                
            else:
                print(f"❌ API error {response.status_code}: {response.text}")
                break
                
        except Exception as e:
            print(f"❌ Error: {e}")
            break
    
    # Analysis
    detroit_contacts = []
    for contact in all_contacts:
        tags = [tag.lower() for tag in contact.get('tags', [])]
        name = (contact.get('contactName', '') or '').lower()
        
        if 'detroit' in ' '.join(tags) or 'detroit' in name:
            detroit_contacts.append(contact)
    
    print(f"\n🎯 FINAL RESULTS:")
    print(f"Total contacts found: {len(all_contacts)}")
    print(f"Detroit-related contacts: {len(detroit_contacts)}")
    print(f"Batches processed: {batch_count}")
    
    # Show sample of what we found
    if all_contacts:
        sample = all_contacts[:5]
        print(f"\nSample contacts:")
        for i, c in enumerate(sample):
            print(f"  {i+1}. {c.get('contactName', 'No name')} | Tags: {c.get('tags', [])} | Phone: {c.get('phone', 'No phone')}")
    
    return len(all_contacts), len(detroit_contacts)

if __name__ == "__main__":
    aggressive_search()