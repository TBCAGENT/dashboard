#!/usr/bin/env python3

import requests
import os

def load_env():
    env = {}
    with open(os.path.expanduser('~/.config/airtable/secrets.env')) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                env[k] = v.strip('"\'')
    return env

def get_all_contacted_phones():
    """Get all phone numbers that have been contacted (ever)"""
    env = load_env()
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    contacted_phones = set()
    
    try:
        # Get all records from Agent Responses table
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblwRwbKogqQnRXtC",
            headers=headers
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            for record in records:
                phone = record.get('fields', {}).get('Phone')
                if phone:
                    contacted_phones.add(phone)
                    
        print(f"📞 Found {len(contacted_phones)} phone numbers that have already been contacted")
        return contacted_phones
        
    except Exception as e:
        print(f"❌ Error getting contacted phones: {e}")
        return set()

def is_phone_already_contacted(phone):
    """Check if a phone number was already contacted"""
    contacted_phones = get_all_contacted_phones()
    return phone in contacted_phones

if __name__ == "__main__":
    # Test with Tim Bender's number
    test_phone = "+15176053666"
    result = is_phone_already_contacted(test_phone)
    print(f"Phone {test_phone} already contacted: {result}")