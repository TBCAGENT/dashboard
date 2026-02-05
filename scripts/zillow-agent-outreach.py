#!/usr/bin/env python3
"""
Zillow Agent Outreach Script
1. Scrapes Zillow listings for agent contact info
2. Creates contacts in GoHighLevel
3. Sends SMS asking about Section 8 rent
"""

import csv
import json
import os
import time
import subprocess
import requests

# Load secrets
def load_secrets():
    apify_token = None
    with open(os.path.expanduser('~/.config/apify/secrets.env')) as f:
        for line in f:
            if 'APIFY_API_TOKEN' in line:
                apify_token = line.split('=')[1].strip()
    
    ghl_key = None
    ghl_location = None
    with open(os.path.expanduser('~/.config/gohighlevel/secrets.env')) as f:
        for line in f:
            if 'GHL_API_KEY' in line:
                ghl_key = line.split('=')[1].strip().strip('"')
            if 'GHL_LOCATION_ID' in line:
                ghl_location = line.split('=')[1].strip().strip('"')
    
    return apify_token, ghl_key, ghl_location

APIFY_TOKEN, GHL_KEY, GHL_LOCATION = load_secrets()

def get_zillow_urls():
    """Get all Zillow URLs from the CSV"""
    urls = []
    with open('/Users/lukefontaine/.openclaw/workspace/zillow-section8-detroit.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row.get('Zillow Link', '')
            address = row.get('Address', '')
            price = row.get('Price', '')
            if url and 'zillow.com' in url:
                urls.append({'url': url, 'address': address, 'price': price})
    return urls

def scrape_zillow_details(urls):
    """Run Apify scraper to get agent info"""
    print(f"Scraping {len(urls)} listings for agent info...")
    
    start_urls = [{"url": u['url']} for u in urls]
    
    response = requests.post(
        f"https://api.apify.com/v2/acts/maxcopell~zillow-detail-scraper/runs?token={APIFY_TOKEN}",
        json={
            "startUrls": start_urls,
            "maxItems": len(urls)
        }
    )
    
    run_data = response.json()
    run_id = run_data['data']['id']
    dataset_id = run_data['data']['defaultDatasetId']
    
    print(f"Run started: {run_id}")
    print(f"Dataset: {dataset_id}")
    
    # Wait for completion
    while True:
        status_resp = requests.get(f"https://api.apify.com/v2/actor-runs/{run_id}?token={APIFY_TOKEN}")
        status = status_resp.json()['data']['status']
        print(f"Status: {status}")
        
        if status in ['SUCCEEDED', 'FAILED', 'ABORTED']:
            break
        time.sleep(10)
    
    if status != 'SUCCEEDED':
        print(f"Scrape failed with status: {status}")
        return []
    
    # Get results
    results_resp = requests.get(f"https://api.apify.com/v2/datasets/{dataset_id}/items?token={APIFY_TOKEN}")
    return results_resp.json()

def extract_agents(scraped_data, original_urls):
    """Extract unique agents with their listings"""
    agents = {}  # phone -> agent info
    
    # Build URL to address/price lookup
    url_lookup = {u['url']: u for u in original_urls}
    
    for item in scraped_data:
        agent_name = item.get('attributionInfo', {}).get('agentName')
        agent_phone = item.get('attributionInfo', {}).get('agentPhoneNumber')
        address = item.get('address', {}).get('streetAddress', 'Unknown')
        zpid = item.get('zpid')
        price = item.get('price')
        
        if not agent_phone:
            continue
        
        # Clean phone number
        phone = ''.join(c for c in agent_phone if c.isdigit())
        if len(phone) == 10:
            phone = '+1' + phone
        elif len(phone) == 11 and phone.startswith('1'):
            phone = '+' + phone
        else:
            continue
        
        if phone not in agents:
            agents[phone] = {
                'name': agent_name or 'Unknown Agent',
                'phone': phone,
                'listings': []
            }
        
        agents[phone]['listings'].append({
            'address': address,
            'price': price,
            'zpid': zpid
        })
    
    return agents

def create_ghl_contact(name, phone):
    """Create contact in GoHighLevel"""
    parts = name.split(' ', 1)
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ''
    
    response = requests.post(
        "https://services.leadconnectorhq.com/contacts/",
        headers={
            "Authorization": f"Bearer {GHL_KEY}",
            "Version": "2021-07-28",
            "Content-Type": "application/json"
        },
        json={
            "locationId": GHL_LOCATION,
            "firstName": first_name,
            "lastName": last_name,
            "phone": phone,
            "tags": ["zillow-agent", "section-8-outreach"]
        }
    )
    
    data = response.json()
    return data.get('contact', {}).get('id')

def send_sms(contact_id, message):
    """Send SMS via GoHighLevel"""
    response = requests.post(
        "https://services.leadconnectorhq.com/conversations/messages",
        headers={
            "Authorization": f"Bearer {GHL_KEY}",
            "Version": "2021-07-28",
            "Content-Type": "application/json"
        },
        json={
            "type": "SMS",
            "contactId": contact_id,
            "message": message
        }
    )
    return response.json()

def main():
    # Get URLs
    urls = get_zillow_urls()
    print(f"Found {len(urls)} listings to process")
    
    # Scrape for agent info
    scraped = scrape_zillow_details(urls)
    print(f"Scraped {len(scraped)} listings")
    
    # Extract unique agents
    agents = extract_agents(scraped, urls)
    print(f"Found {len(agents)} unique agents")
    
    # Save agents data
    with open('/Users/lukefontaine/.openclaw/workspace/data/zillow-agents.json', 'w') as f:
        json.dump(agents, f, indent=2)
    
    # Create contacts and send SMS
    results = []
    for phone, agent in agents.items():
        print(f"\nProcessing: {agent['name']} ({phone})")
        
        # Build message with listing addresses
        listings_text = '\n'.join([f"- {l['address']}" for l in agent['listings'][:3]])
        if len(agent['listings']) > 3:
            listings_text += f"\n...and {len(agent['listings']) - 3} more"
        
        message = f"""Hi {agent['name'].split()[0]}, I'm reaching out about your Section 8 listing(s) in Detroit:

{listings_text}

What's the approved Section 8 rent for these properties? We have qualified tenants ready to move.

Thanks!
LL Ventures"""

        # Create contact
        contact_id = create_ghl_contact(agent['name'], phone)
        print(f"  Created contact: {contact_id}")
        
        if contact_id:
            # Send SMS
            result = send_sms(contact_id, message)
            print(f"  SMS sent: {result.get('messageId', 'error')}")
            results.append({
                'agent': agent['name'],
                'phone': phone,
                'listings': len(agent['listings']),
                'contact_id': contact_id,
                'status': 'sent' if result.get('messageId') else 'failed'
            })
        else:
            results.append({
                'agent': agent['name'],
                'phone': phone,
                'listings': len(agent['listings']),
                'status': 'contact_failed'
            })
        
        time.sleep(1)  # Rate limiting
    
    # Save results
    with open('/Users/lukefontaine/.openclaw/workspace/data/agent-outreach-results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n=== COMPLETE ===")
    print(f"Processed {len(results)} agents")
    sent = sum(1 for r in results if r['status'] == 'sent')
    print(f"SMS sent: {sent}")
    print(f"Results saved to data/agent-outreach-results.json")

if __name__ == "__main__":
    main()
