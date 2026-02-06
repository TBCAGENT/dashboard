#!/usr/bin/env python3
"""
ZILLOW RENT INQUIRY SCRIPT - Protocol Compliant
- Plain text only - NO names, NO company info
- One message per agent per listing
- Add responses to Airtable for Luke's review
- NEVER send follow-up messages
"""

import requests
import json
import os
from datetime import datetime

def load_env():
    """Load API credentials"""
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

def get_sent_inquiries(env):
    """Get all rent inquiries already sent to avoid duplicates"""
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    sent_inquiries = set()
    try:
        # Check Zillow Agent Responses table for sent inquiries
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tbl3xTUxe4pG0ZelJ",  # Zillow Agent Responses table
            headers=headers
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            for record in records:
                phone = record.get('fields', {}).get('Phone')
                zpid = record.get('fields', {}).get('ZPID')
                if phone and zpid:
                    sent_inquiries.add(f"{phone}_{zpid}")
                    
    except Exception as e:
        print(f"Warning: Could not check sent inquiries: {e}")
        
    return sent_inquiries

def send_rent_inquiry(contact_id, env, listing_address):
    """Send rent inquiry for new Zillow listings"""
    
    # Luke's approved template for Zillow rent inquiries
    message = f"Hey, just saw your listing at {listing_address}. What is the current Section 8 rent?"
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(
            f"{env['GHL_BASE_URL']}/conversations/messages",
            headers=headers,
            json={
                "type": "SMS",
                "contactId": contact_id,
                "locationId": env['GHL_LOCATION_ID'],
                "message": message
            },
            timeout=10
        )
        
        if response.status_code in [200, 201]:
            return True, response.json().get('messageId', 'sent')
        else:
            return False, f"Send failed: {response.status_code}"
            
    except Exception as e:
        return False, f"Send error: {e}"

def log_inquiry_sent(env, agent_phone, zpid, address, message_id):
    """Log sent inquiry to Airtable - for tracking only, Luke will handle responses"""
    headers = {
        "Authorization": f"Bearer {env['AIRTABLE_API_KEY']}",
        "Content-Type": "application/json"
    }
    
    try:
        requests.post(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tbl3xTUxe4pG0ZelJ",  # Zillow Agent Responses
            headers=headers,
            json={
                "fields": {
                    "Phone": agent_phone,
                    "ZPID": str(zpid),
                    "Property Address": address,
                    "Message Sent": datetime.now().isoformat(),
                    "Status": "Inquiry Sent",
                    "Message ID": message_id
                }
            },
            timeout=10
        )
        
    except Exception as e:
        print(f"Warning: Could not log to Airtable: {e}")

def create_or_get_ghl_contact(env, agent_phone, agent_name):
    """Create GHL contact for agent if doesn't exist, return contact_id"""
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    # Search for existing contact
    try:
        search_resp = requests.get(
            f"{env['GHL_BASE_URL']}/contacts/",
            headers=headers,
            params={"locationId": env['GHL_LOCATION_ID'], "phone": agent_phone},
            timeout=10
        )
        
        if search_resp.status_code == 200:
            contacts = search_resp.json().get('contacts', [])
            if contacts:
                return contacts[0]['id']
        
        # Create new contact
        parts = agent_name.split(' ', 1)
        first_name = parts[0] if parts else 'Agent'
        last_name = parts[1] if len(parts) > 1 else ''
        
        create_resp = requests.post(
            f"{env['GHL_BASE_URL']}/contacts/",
            headers=headers,
            json={
                "locationId": env['GHL_LOCATION_ID'],
                "firstName": first_name,
                "lastName": last_name,
                "phone": agent_phone,
                "tags": ["zillow-agent", "rent-inquiry"]
            },
            timeout=10
        )
        
        if create_resp.status_code in [200, 201]:
            return create_resp.json().get('contact', {}).get('id')
            
    except Exception as e:
        print(f"Error creating/finding contact for {agent_phone}: {e}")
        
    return None

def send_rent_inquiries(listings_needing_rent):
    """
    Send rent inquiries for listings missing rent information
    listings_needing_rent format:
    [
        {
            'zpid': '12345',
            'address': '123 Main St',
            'agent_phone': '+15551234567',
            'agent_name': 'John Smith'
        }
    ]
    """
    env = load_env()
    sent_inquiries = get_sent_inquiries(env)
    
    print(f"🔍 ZILLOW RENT INQUIRY - {datetime.now().strftime('%I:%M:%S %p')}")
    print(f"📋 {len(listings_needing_rent)} listings need rent info")
    print(f"🚫 {len(sent_inquiries)} already inquired about")
    
    sent_count = 0
    skipped_count = 0
    
    for listing in listings_needing_rent:
        zpid = listing['zpid']
        address = listing['address']
        agent_phone = listing['agent_phone']
        agent_name = listing.get('agent_name', 'Agent')
        
        # Check if we already sent inquiry for this agent+listing
        inquiry_key = f"{agent_phone}_{zpid}"
        if inquiry_key in sent_inquiries:
            print(f"🚫 SKIP: Already inquired {agent_phone} about {address}")
            skipped_count += 1
            continue
        
        print(f"📤 SENDING: {address} to {agent_phone}")
        
        # Get or create GHL contact
        contact_id = create_or_get_ghl_contact(env, agent_phone, agent_name)
        if not contact_id:
            print(f"❌ FAILED: Could not create/find contact for {agent_phone}")
            skipped_count += 1
            continue
        
        success, result = send_rent_inquiry(contact_id, env, address)
        
        if success:
            sent_count += 1
            log_inquiry_sent(env, agent_phone, zpid, address, result)
            print(f"✅ SENT: {result}")
        else:
            print(f"❌ FAILED: {result}")
            skipped_count += 1
    
    print(f"\n📊 RESULT: {sent_count} sent, {skipped_count} skipped")
    return sent_count

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        # Load listings from input file (called by realtime monitor)
        input_file = sys.argv[1]
        try:
            with open(input_file) as f:
                listings = json.load(f)
            sent_count = send_rent_inquiries(listings)
            print(f"TOTAL_SENT:{sent_count}")
        except Exception as e:
            print(f"Error processing {input_file}: {e}")
    else:
        # Example usage for testing
        example_listings = [
            {
                'zpid': '12345',
                'address': '123 Example St, Detroit MI',
                'agent_phone': '+15551234567',
                'agent_name': 'Test Agent'
            }
        ]
        send_rent_inquiries(example_listings)