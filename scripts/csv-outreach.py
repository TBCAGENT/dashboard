#!/usr/bin/env python3

import requests
import json
import csv
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

def process_csv_contacts(csv_file_path, target_count=20):
    env = load_env()
    
    print(f"🚀 CSV OUTREACH APPROACH - {datetime.now().strftime('%I:%M:%S %p')}")
    print(f"📁 Processing CSV: {csv_file_path}")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    sent_count = 0
    processed = 0
    
    # Read CSV and process contacts
    with open(csv_file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            if sent_count >= target_count:
                break
                
            processed += 1
            
            # Extract data from CSV
            first_name = row.get('First Name', '').strip()
            last_name = row.get('Last Name', '').strip()
            phone = row.get('Phone', '').strip()
            email = row.get('Email', '').strip()
            
            if not phone or not first_name:
                continue
                
            name = f"{first_name} {last_name}".strip()
            
            # Check if this contact exists in GHL already
            try:
                # Search for existing contact by phone
                search_response = requests.get(
                    f"{env['GHL_BASE_URL']}/contacts/",
                    headers=headers,
                    params={
                        "locationId": env['GHL_LOCATION_ID'],
                        "query": phone
                    },
                    timeout=10
                )
                
                if search_response.status_code == 200:
                    existing_contacts = search_response.json().get('contacts', [])
                    
                    contact_exists = False
                    contact_id = None
                    
                    for contact in existing_contacts:
                        if contact.get('phone') == phone:
                            contact_exists = True
                            contact_id = contact['id']
                            
                            # Check if already has "SMS sent" tag
                            tags = contact.get('tags', [])
                            if any('sms sent' in tag.lower() for tag in tags):
                                print(f"⏭️  {processed:3d}. {name} - Already messaged")
                                break
                            else:
                                # Contact exists but not messaged - we can message them
                                print(f"📱 {sent_count+1:2d}/20 - {name} (existing)... ", end='', flush=True)
                                break
                    
                    if contact_exists and any('sms sent' in tag.lower() for tag in contact.get('tags', [])):
                        continue
                    
                    if not contact_exists:
                        # Create new contact in GHL first
                        print(f"📱 {sent_count+1:2d}/20 - {name} (new)... ", end='', flush=True)
                        
                        create_response = requests.post(
                            f"{env['GHL_BASE_URL']}/contacts/",
                            headers=headers,
                            json={
                                "locationId": env['GHL_LOCATION_ID'],
                                "firstName": first_name,
                                "lastName": last_name,
                                "phone": phone,
                                "email": email,
                                "tags": ["detroit"]
                            },
                            timeout=10
                        )
                        
                        if create_response.status_code in [200, 201]:
                            contact_id = create_response.json().get('contact', {}).get('id')
                        else:
                            print("❌ (create failed)")
                            continue
                    
                    # Send message
                    if contact_id:
                        message = template.format(name=first_name)
                        
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
                            # Success! Add SMS sent tag
                            requests.post(
                                f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags",
                                headers=headers,
                                json={"tags": ["SMS sent"]},
                                timeout=8
                            )
                            
                            sent_count += 1
                            print("✅")
                            
                            if sent_count % 5 == 0:
                                print(f"📊 Progress: {sent_count}/20")
                            
                            time.sleep(1)
                            
                        else:
                            print("❌ (send failed)")
                
            except Exception as e:
                print(f"❌ {processed:3d}. {name} - Error: {e}")
                continue
    
    # Update Airtable if we sent any messages
    if sent_count > 0:
        print(f"\n📊 Updating Airtable...")
        
        try:
            airtable_headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
            
            get_resp = requests.get(
                "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                headers=airtable_headers,
                params={"filterByFormula": "IS_SAME(Date,TODAY())"}
            )
            
            if get_resp.status_code == 200:
                records = get_resp.json().get('records', [])
                if records:
                    record_id = records[0]['id']
                    current_sent = records[0]['fields'].get('Messages Sent', 0)
                    new_total = current_sent + sent_count
                    
                    update_resp = requests.patch(
                        "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblJJ6aYNQTKp5FMv",
                        headers=airtable_headers,
                        json={"records": [{"id": record_id, "fields": {"Messages Sent": new_total}}]}
                    )
                    
                    if update_resp.status_code in [200, 201]:
                        print(f"✅ Airtable: {new_total} total today")
                        
                        if new_total >= 150:
                            print(f"🎉 TARGET ACHIEVED! {new_total}/150")
                        else:
                            print(f"📈 Progress: {new_total}/150")
                            
        except Exception as e:
            print(f"❌ Airtable error: {e}")
    
    print(f"\n🎯 RESULT: {sent_count}/20 messages sent from {processed} CSV contacts processed")
    return sent_count

if __name__ == "__main__":
    # Use the uploaded CSV file
    csv_file = "/Users/lukefontaine/.openclaw/media/inbound/88d249b8-4e21-4e1c-9255-ba4e77e00b20.csv"
    process_csv_contacts(csv_file, target_count=20)