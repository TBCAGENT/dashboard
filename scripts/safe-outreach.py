#!/usr/bin/env python3
"""
BULLETPROOF OUTREACH SYSTEM
- NEVER sends to previously contacted numbers
- ONLY uses APPROVED template from Airtable
- Checks both GHL tags AND Airtable responses
- Multi-layer verification before each send
- Mandatory protocol for all outreach
"""

import requests
import json
import time
import os
from datetime import datetime

def load_env():
    env = {}
    
    # Load GHL environment
    try:
        with open(os.path.expanduser('~/.config/gohighlevel/secrets.env')) as f:
            for line in f:
                line = line.strip()
                if '=' in line and not line.startswith('#') and not line.startswith('export'):
                    k, v = line.split('=', 1)
                    env[k] = v.strip('"\'')
                elif line.startswith('export') and '=' in line:
                    line = line.replace('export ', '')
                    k, v = line.split('=', 1)
                    env[k] = v.strip('"\'')
    except FileNotFoundError:
        print("❌ GHL secrets file not found")
    
    # Load Airtable environment  
    try:
        with open(os.path.expanduser('~/.config/airtable/secrets.env')) as f:
            for line in f:
                line = line.strip()
                if '=' in line and not line.startswith('#') and not line.startswith('export'):
                    k, v = line.split('=', 1)
                    env[k] = v.strip('"\'')
                elif line.startswith('export') and '=' in line:
                    line = line.replace('export ', '')
                    k, v = line.split('=', 1)
                    env[k] = v.strip('"\'')
    except FileNotFoundError:
        print("❌ Airtable secrets file not found")
    
    return env

def get_approved_template(env):
    """MANDATORY: Get ONLY the approved template from Airtable"""
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    try:
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/SMS%20Templates?filterByFormula=Approved",
            headers=headers
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            if records:
                template = records[0]['fields']['Message Text']
                template_name = records[0]['fields']['Template Name']
                print(f"✅ APPROVED TEMPLATE: {template_name}")
                print(f"📝 MESSAGE: {template}")
                return template
            else:
                print("❌ CRITICAL: No approved template found in Airtable!")
                return None
        else:
            print("❌ CRITICAL: Could not fetch templates from Airtable!")
            return None
            
    except Exception as e:
        print(f"❌ CRITICAL: Template fetch error: {e}")
        return None

def get_blacklisted_phones(env):
    """Get all phone numbers that should NEVER be contacted"""
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    blacklisted = set()
    
    try:
        # Get ALL records from Agent Responses (anyone who already responded)
        response = requests.get(
            "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblwRwbKogqQnRXtC",
            headers=headers
        )
        
        if response.status_code == 200:
            records = response.json().get('records', [])
            for record in records:
                phone = record.get('fields', {}).get('Phone')
                if phone:
                    blacklisted.add(phone.strip())
                    
        return blacklisted
        
    except Exception as e:
        print(f"❌ Error getting blacklist: {e}")
        return set()

def is_safe_to_contact(phone, contact_id, env, blacklisted):
    """
    MANDATORY MULTI-LAYER CHECK before ANY message send
    Returns: (safe: bool, reason: str)
    """
    # Layer 1: Check Airtable blacklist (anyone who already responded)
    if phone in blacklisted:
        return False, f"BLACKLISTED: {phone} already responded/contacted"
    
    # Layer 2: Check GHL SMS sent tag
    try:
        headers = {
            "Authorization": f"Bearer {env['GHL_API_KEY']}",
            "Version": "2021-07-28"
        }
        
        contact_resp = requests.get(
            f"{env['GHL_BASE_URL']}/contacts/{contact_id}",
            headers=headers,
            timeout=10
        )
        
        if contact_resp.status_code == 200:
            contact = contact_resp.json().get('contact', {})
            tags = [tag.lower() for tag in contact.get('tags', [])]
            
            if 'sms sent' in ' '.join(tags):
                return False, f"GHL TAG: {phone} already has 'SMS sent' tag"
                
    except Exception as e:
        return False, f"ERROR checking GHL: {e}"
    
    return True, "SAFE TO CONTACT"

def safe_send_message(contact_id, phone, name, env, approved_template, blacklisted):
    """Send message ONLY using approved template and after safety checks"""
    
    # MANDATORY SAFETY CHECK
    safe, reason = is_safe_to_contact(phone, contact_id, env, blacklisted)
    if not safe:
        return False, reason
    
    # Use ONLY approved template with proper placeholder substitution
    message = approved_template.replace("[First Name]", name)
    
    # Proceed with send
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    try:
        msg_response = requests.post(
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
        
        if msg_response.status_code in [200, 201]:
            # Add SMS sent tag
            requests.post(
                f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags",
                headers=headers,
                json={"tags": ["SMS sent"]},
                timeout=8
            )
            return True, "SENT"
        else:
            return False, f"Send failed: {msg_response.status_code}"
            
    except Exception as e:
        return False, f"Send error: {e}"

def safe_outreach_batch(target_count=15):
    """Bulletproof batch sender with approved template and safety checks"""
    env = load_env()
    
    print(f"🔒 SAFE OUTREACH - {datetime.now().strftime('%I:%M:%S %p')}")
    print("🛡️  PROTOCOL: ONLY approved template + No duplicates")
    
    # CRITICAL: Get approved template FIRST
    approved_template = get_approved_template(env)
    if not approved_template:
        print("❌ CRITICAL: Cannot proceed without approved template!")
        return 0
    
    # Get blacklist
    blacklisted = get_blacklisted_phones(env)
    print(f"🚫 BLACKLIST: {len(blacklisted)} numbers will be skipped")
    
    sent_count = 0
    blocked_count = 0
    
    # Get contacts from GHL
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28"
    }
    
    try:
        response = requests.get(
            f"{env['GHL_BASE_URL']}/contacts/",
            headers=headers,
            params={"locationId": env['GHL_LOCATION_ID'], "limit": 100},
            timeout=30
        )
        
        if response.status_code == 200:
            contacts = response.json().get('contacts', [])
            
            for contact in contacts:
                if sent_count >= target_count:
                    break
                
                # Basic filters
                if not contact.get('phone') or not contact.get('tags'):
                    continue
                    
                tags = [tag.lower() for tag in contact['tags']]
                if 'detroit' not in ' '.join(tags):
                    continue
                
                contact_id = contact['id']
                phone = contact.get('phone')
                name = contact.get('contactName', '').split()[0] or contact.get('firstName', '') or 'there'
                
                print(f"🔍 {sent_count+1:2d}/{target_count} - Checking {name}... ", end='', flush=True)
                
                # CRITICAL: Safety check and send with approved template
                success, reason = safe_send_message(contact_id, phone, name, env, approved_template, blacklisted)
                
                if success:
                    sent_count += 1
                    print("✅ SENT")
                    time.sleep(2)  # Rate limiting
                else:
                    blocked_count += 1
                    print(f"🚫 {reason}")
    
    except Exception as e:
        print(f"❌ Batch error: {e}")
    
    print(f"\n🎯 RESULT: {sent_count} sent, {blocked_count} blocked")
    print(f"📝 TEMPLATE USED: {approved_template}")
    return sent_count

if __name__ == "__main__":
    safe_outreach_batch(15)