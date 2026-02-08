#!/usr/bin/env python3
"""
Auto-update Luke's Financial Dashboard
- Pulls LL Ventures pipeline from Airtable
- Updates Google Sheet with current data
- Maintains real-time financial position tracking
"""

import requests
import json
import os
from datetime import datetime

def load_env():
    """Load environment variables"""
    env = {}
    
    # Load Airtable credentials
    with open(os.path.expanduser('~/.config/airtable/secrets.env')) as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                # Handle export prefix
                if key.startswith('export '):
                    key = key.replace('export ', '')
                env[key] = value.strip('"\'')
    
    return env

def get_ll_ventures_pipeline():
    """Get current LL Ventures pipeline from Airtable (ONLY 'In Contract' deals)"""
    env = load_env()
    
    headers = {"Authorization": f"Bearer {env['AIRTABLE_API_KEY']}"}
    
    # Get all offers data with pagination
    all_records = []
    url = "https://api.airtable.com/v0/appEmn0HdyfUfZ429/Offers?pageSize=100"
    
    while url:
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            print(f"Error fetching Airtable data: {response.status_code}")
            return None
        
        data = response.json()
        all_records.extend(data['records'])
        
        # Check for pagination
        offset = data.get('offset')
        if offset:
            url = f"https://api.airtable.com/v0/appEmn0HdyfUfZ429/Offers?pageSize=100&offset={offset}"
        else:
            url = None
    
    # Filter for ONLY "In Contract" deals (contracts signed by both sides)
    in_contract_deals = []
    total_revenue = 0
    
    for record in all_records:
        status = record['fields'].get('Select', '')
        # ONLY count "In Contract" - not "Pending Contract"
        if status == 'In Contract':
            address = record['fields'].get('Address', 'TBD')
            revenue = record['fields'].get('Gross Revenue', 0)
            contract_date = record['fields'].get('In Contract', '')
            poc = record['fields'].get('POC', 'TBD')
            notes = record['fields'].get('Notes', '')
            
            in_contract_deals.append({
                'address': address,
                'status': status,
                'revenue': revenue,
                'contract_date': contract_date,
                'poc': poc,
                'notes': notes
            })
            
            total_revenue += revenue
    
    return {
        'deals': in_contract_deals,
        'count': len(in_contract_deals),
        'total_revenue': total_revenue,
        'lukes_share': total_revenue * 0.4
    }

def update_google_sheet(pipeline_data):
    """Update Google Sheet with current pipeline data"""
    env = load_env()
    
    # Get fresh Google token
    os.system("bash ~/.openclaw/workspace/scripts/google-token.sh > /tmp/token.txt")
    with open("/tmp/token.txt", "r") as f:
        token = f.read().strip()
    
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    sheet_id = "1kxHhdscGWUkd9UIVQS773FBaq3izsCCVVn13yJF3OP0"
    
    # Prepare sheet data
    sheet_data = [
        ["LL VENTURES PIPELINE - DEALS IN CONTRACT", "", "", "", "", ""],
        ["Updated:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "", "", "", ""],
        ["", "", "", "", "", ""],
        ["Address", "Status", "Gross Revenue", "Contract Date", "POC", "Notes"]
    ]
    
    # Add deal rows
    for deal in pipeline_data['deals']:
        sheet_data.append([
            deal['address'],
            deal['status'],
            deal['revenue'],
            deal['contract_date'],
            deal['poc'],
            deal['notes']
        ])
    
    # Add summary rows
    sheet_data.extend([
        ["", "", "", "", "", ""],
        ["TOTALS:", "", "", "", "", ""],
        [f"Total Deals: {pipeline_data['count']}", "", "", "", "", ""],
        [f"Total Gross Revenue: ${pipeline_data['total_revenue']:,}", "", "", "", "", ""],
        [f"Luke's 40% Share: ${pipeline_data['lukes_share']:,}", "", "", "", "", ""]
    ])
    
    # Update sheet
    response = requests.put(
        f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/LL%20Ventures%20Pipeline!A1?valueInputOption=USER_ENTERED",
        headers=headers,
        json={"values": sheet_data}
    )
    
    if response.status_code == 200:
        print(f"✅ Updated pipeline data: {pipeline_data['count']} deals, ${pipeline_data['lukes_share']:,} Luke's share")
        return True
    else:
        print(f"❌ Error updating sheet: {response.status_code}")
        return False

def main():
    """Main execution"""
    print("🔄 Updating Luke's Financial Dashboard...")
    
    # Get current pipeline data
    pipeline_data = get_ll_ventures_pipeline()
    if not pipeline_data:
        print("❌ Failed to get pipeline data")
        return
    
    print(f"📊 Found {pipeline_data['count']} deals worth ${pipeline_data['total_revenue']:,}")
    
    # Update Google Sheet
    success = update_google_sheet(pipeline_data)
    if success:
        print("✅ Dashboard updated successfully!")
        print(f"💰 Total Pipeline: ${pipeline_data['total_revenue']:,}")
        print(f"💵 Luke's Share: ${pipeline_data['lukes_share']:,}")
    else:
        print("❌ Dashboard update failed")

if __name__ == "__main__":
    main()