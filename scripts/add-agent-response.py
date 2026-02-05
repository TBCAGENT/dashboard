#!/usr/bin/env python3
"""
Add Agent Response - ALWAYS updates Outreach Tracker
This script ensures the tracker is NEVER missed.
"""

import requests
import os
import sys
from datetime import datetime

def load_env(path):
    env = {}
    with open(os.path.expanduser(path)) as f:
        for line in f:
            line = line.strip()
            if line.startswith('export '):
                line = line[7:]
            if '=' in line and not line.startswith('#'):
                key, val = line.split('=', 1)
                env[key] = val.strip('"\'')
    return env

# Load credentials
airtable = load_env('~/.config/airtable/secrets.env')
AIRTABLE_API_KEY = airtable.get('AIRTABLE_API_KEY')

BASE_ID = 'appzBa1lPvu6zBZxv'
AGENT_RESPONSES_TABLE = 'tblwRwbKogqQnRXtC'
OUTREACH_TRACKER_TABLE = 'tblJJ6aYNQTKp5FMv'

headers = {
    'Authorization': f'Bearer {AIRTABLE_API_KEY}',
    'Content-Type': 'application/json'
}

def update_tracker():
    """Count actual responses and update tracker - called after EVERY add"""
    # Count records in Agent Responses
    r = requests.get(f"https://api.airtable.com/v0/{BASE_ID}/{AGENT_RESPONSES_TABLE}", headers=headers)
    actual_count = len(r.json().get('records', []))
    
    # Get today's tracker record
    today = datetime.now().strftime('%Y-%m-%d')
    r2 = requests.get(
        f"https://api.airtable.com/v0/{BASE_ID}/{OUTREACH_TRACKER_TABLE}",
        headers=headers,
        params={'filterByFormula': f"{{Date}}='{today}'"}
    )
    
    tracker = r2.json().get('records', [])
    if tracker:
        rec_id = tracker[0]['id']
        r3 = requests.patch(
            f"https://api.airtable.com/v0/{BASE_ID}/{OUTREACH_TRACKER_TABLE}/{rec_id}",
            headers=headers,
            json={'fields': {'Responses Received': actual_count}}
        )
        if r3.status_code == 200:
            print(f"✅ Outreach Tracker: {actual_count} responses")
            return True
    else:
        # Create today's record
        r3 = requests.post(
            f"https://api.airtable.com/v0/{BASE_ID}/{OUTREACH_TRACKER_TABLE}",
            headers=headers,
            json={'records': [{
                'fields': {
                    'Date': today,
                    'Messages Sent': 0,
                    'Responses Received': actual_count
                }
            }]}
        )
        if r3.status_code == 200:
            print(f"✅ Created tracker with {actual_count} responses")
            return True
    
    print("❌ FAILED TO UPDATE TRACKER")
    return False

def add_response(name, phone, message, draft, contact_id):
    """Add a response and IMMEDIATELY update tracker"""
    
    # Step 1: Add to Agent Responses
    r = requests.post(
        f"https://api.airtable.com/v0/{BASE_ID}/{AGENT_RESPONSES_TABLE}",
        headers=headers,
        json={'records': [{
            'fields': {
                'Agent Name': name,
                'Phone': phone,
                'Agent Message': message,
                'Arthur Draft Reply': draft,
                'Status': 'Pending Review',
                'GHL Contact ID': contact_id
            }
        }]}
    )
    
    if r.status_code != 200:
        print(f"❌ Failed to add response: {r.text[:100]}")
        return False
    
    print(f"✅ Added: {name}")
    
    # Step 2: IMMEDIATELY update tracker (this is MANDATORY)
    if not update_tracker():
        print("⚠️ WARNING: Response added but tracker update failed!")
        return False
    
    return True

if __name__ == '__main__':
    # If called with no args, just sync the tracker
    if len(sys.argv) == 1:
        print("Syncing Outreach Tracker...")
        update_tracker()
    else:
        print("Usage: python add-agent-response.py")
        print("       (imports add_response function for use in other scripts)")
