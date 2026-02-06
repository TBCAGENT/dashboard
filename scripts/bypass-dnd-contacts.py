#!/usr/bin/env python3

import requests
import json
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

def bypass_dnd_and_send():
    env = load_env()
    
    print("🚀 SMART LIST: Detroit agents not messaged - BYPASS DND APPROACH")
    print(f"⏰ Started: {datetime.now().strftime('%I:%M:%S %p')}")
    
    headers = {
        "Authorization": f"Bearer {env['GHL_API_KEY']}",
        "Version": "2021-07-28",
        "Content-Type": "application/json"
    }
    
    template = "Hi {name}, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."
    
    # Known problematic contact IDs to skip
    problem_contacts = {
        "SsEN21BfqY9WDGKsUrs3",  # Anne Sloan
        "a1Ix1atlfaEIHRike4z2",  # Maureen Peterson  
        "eAC8svdfcSTilFbDLdcn",  # Terrance Still
        "0soyCszMwqoHWKSdeINL",  # Nancy Hansen
        "HCyisivudQkVmuf4NTMT",  # Patrick Daum
    }
    
    sent_count = 0
    target = 100
    attempts = 0
    skipped_dnd = 0
    
    print("🔍 Scanning extensively for clean Detroit contacts...")
    
    # Use multiple strategies to find clean contacts
    strategies = [
        {"limit": 100, "startAfter": None},
        {"limit": 50, "startAfter": None},  
        {"limit": 25, "startAfter": None},
    ]
    
    for strategy_idx, base_params in enumerate(strategies):
        if sent_count >= target:
            break
            
        print(f"\n📋 Strategy {strategy_idx + 1}: Using limit={base_params['limit']}")
        
        start_after = None
        pages_this_strategy = 0
        
        while sent_count < target and pages_this_strategy < 100:
            params = {
                "locationId": env['GHL_LOCATION_ID'],
                "limit": base_params["limit"]
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
                    print(f"❌ API error: {response.status_code}")
                    break
                    
                data = response.json()
                contacts = data.get('contacts', [])
                pages_this_strategy += 1
                
                if not contacts:
                    print(f"📄 No more contacts on page {pages_this_strategy}")
                    break
                
                # Process each contact
                for contact in contacts:
                    if sent_count >= target:
                        break
                        
                    # Skip if not eligible
                    if (not contact.get('phone') or not contact.get('tags') or
                        not any('detroit' in tag.lower() for tag in contact['tags']) or
                        any('sms sent' in tag.lower() for tag in contact['tags'])):
                        continue
                    
                    # Skip known problem contacts
                    if contact['id'] in problem_contacts:
                        skipped_dnd += 1
                        continue
                    
                    attempts += 1
                    contact_id = contact['id']
                    name = contact.get('contactName', 'there') or contact.get('firstName', 'there') or 'there'
                    phone = contact.get('phone', 'Unknown')
                    
                    message = template.format(name=name)
                    
                    print(f"📱 {sent_count+1:3d}/{target} - {name} ({phone})... ", end='', flush=True)
                    
                    try:
                        # Attempt to send message
                        msg_response = requests.post(
                            f"{env['GHL_BASE_URL']}/conversations/messages",
                            headers=headers,
                            json={
                                "type": "SMS",
                                "contactId": contact_id,
                                "locationId": env['GHL_LOCATION_ID'],
                                "message": message
                            },
                            timeout=15
                        )
                        
                        if msg_response.status_code in [200, 201]:
                            # SUCCESS! Add SMS sent tag immediately
                            tag_response = requests.post(
                                f"{env['GHL_BASE_URL']}/contacts/{contact_id}/tags",
                                headers=headers,
                                json={"tags": ["SMS sent"]},
                                timeout=10
                            )
                            
                            sent_count += 1
                            print("✅")
                            
                            if sent_count % 10 == 0:
                                print(f"📊 Progress: {sent_count}/{target} sent (Strategy {strategy_idx + 1})")
                            
                            time.sleep(1.5)  # Rate limiting
                            
                        else:
                            # Failed - add to problem list if DND
                            error_data = msg_response.json() if msg_response.text else {}
                            error_msg = error_data.get('message', '')
                            
                            if 'unsubscribed' in error_msg.lower() or 'dnd' in error_msg.lower():
                                problem_contacts.add(contact_id)
                                skipped_dnd += 1
                                print(f"⏭️ DND (added to skip list)")
                            else:
                                print(f"❌ ({error_msg[:20]})")
                                
                    except Exception as e:
                        print(f"❌ ({str(e)[:20]})")
                
                # Get next page
                start_after = data.get('meta', {}).get('startAfter')
                if not start_after:
                    print(f"📄 Strategy {strategy_idx + 1} complete: {pages_this_strategy} pages")
                    break
                    
            except Exception as e:
                print(f"❌ Strategy {strategy_idx + 1}, page {pages_this_strategy} error: {e}")
                break
    
    # Update Airtable with results
    print(f"\n📊 Updating Airtable outreach tracker...")
    
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
                    print(f"✅ Airtable updated: {new_total} total messages today")
                    
                    if new_total >= 150:
                        print(f"🎉 🎉 TARGET ACHIEVED! {new_total} >= 150 messages! 🎉 🎉")
                    else:
                        print(f"📈 Progress: {new_total}/150 ({150-new_total} still needed)")
                        
    except Exception as e:
        print(f"❌ Airtable error: {e}")
    
    print(f"\n🏁 SMART LIST RESULTS:")
    print(f"   🎯 Target: {target} messages")
    print(f"   ✅ Successfully sent: {sent_count}")
    print(f"   ⏭️ Skipped DND: {skipped_dnd}")
    print(f"   🔍 Total attempts: {attempts}")
    
    if sent_count > 0:
        print(f"   📊 Success rate: {(sent_count/attempts*100):.1f}%")
        print(f"   🔄 Smart list automatically updated (SMS sent tags added)")
    
    print(f"   ⏰ Completed: {datetime.now().strftime('%I:%M:%S %p')}")
    
    return sent_count

if __name__ == "__main__":
    bypass_dnd_and_send()