#!/usr/bin/env python3
"""
LL Ventures Pipeline Tracker
Pulls deal pipeline from Airtable and calculates revenue projections
"""
import os
import requests
import subprocess

def get_google_token():
    """Get fresh Google token"""
    result = subprocess.run(['bash', '/Users/lukefontaine/.openclaw/workspace/scripts/google-token.sh'], 
                          capture_output=True, text=True)
    return result.stdout.strip()

def get_airtable_pipeline():
    """Get current LL Ventures pipeline from Airtable"""
    airtable_token = os.environ.get('AIRTABLE_API_KEY')
    if not airtable_token:
        return None
    
    base_id = "appEmn0HdyfUfZ429"
    table_id = "tblU9w1zdy8jbYBQq"
    
    url = f"https://api.airtable.com/v0/{base_id}/{table_id}?maxRecords=100"
    headers = {"Authorization": f"Bearer {airtable_token}"}
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None
    
    data = response.json()
    
    # Filter for "In Contract" deals
    in_contract_deals = []
    for record in data.get('records', []):
        fields = record.get('fields', {})
        if fields.get('Select') == 'In Contract':
            gross_revenue = fields.get('Gross Revenue', 0)
            address = fields.get('Address', 'No Address')
            in_contract_deals.append({
                'address': address,
                'gross_revenue': gross_revenue
            })
    
    total_deals = len(in_contract_deals)
    total_gross = sum(deal['gross_revenue'] for deal in in_contract_deals)
    
    # Calculate shares (40% Luke, 40% Nate, 20% Mikey)
    luke_share = total_gross * 0.4
    nate_share = total_gross * 0.4
    mikey_share = total_gross * 0.2
    
    return {
        'deals_count': total_deals,
        'total_gross': total_gross,
        'luke_share': luke_share,
        'nate_share': nate_share,
        'mikey_share': mikey_share,
        'deals': in_contract_deals
    }

def update_pipeline_tracker(pipeline_data):
    """Update Google Sheet with latest pipeline data"""
    if not pipeline_data:
        return False
    
    spreadsheet_id = "1pd1dt64gBni4vAWze9QzhVwsmFMcdBuufW6m_0n-OPw"
    token = get_google_token()
    
    # Update pipeline section
    values = [
        [pipeline_data['deals_count']],
        [f"${pipeline_data['total_gross']:,.0f}"],
        [f"${pipeline_data['luke_share']:,.0f}"]
    ]
    
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Asset%20Tracker!B29:B31?valueInputOption=USER_ENTERED"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    data = {"values": values}
    
    response = requests.put(url, headers=headers, json=data)
    return response.status_code == 200

def get_pipeline_summary():
    """Get current pipeline summary for conversational interface"""
    pipeline = get_airtable_pipeline()
    if not pipeline:
        return "Unable to access LL Ventures pipeline data"
    
    summary = f"""**LL Ventures Pipeline Summary:**
    
**{pipeline['deals_count']} deals in contract**
**Total Gross Revenue:** ${pipeline['total_gross']:,}

**Revenue Split:**
- Luke (40%): ${pipeline['luke_share']:,.0f}
- Nate (40%): ${pipeline['nate_share']:,.0f}  
- Mikey (20%): ${pipeline['mikey_share']:,.0f}

**Recent Deals:**"""
    
    # Show top 5 deals
    for i, deal in enumerate(pipeline['deals'][:5]):
        summary += f"\n- {deal['address']}: ${deal['gross_revenue']:,}"
    
    if len(pipeline['deals']) > 5:
        summary += f"\n- ...and {len(pipeline['deals']) - 5} more deals"
    
    return summary

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python ll-ventures-pipeline.py <command>")
        print("Commands: update, summary")
        return
    
    command = sys.argv[1]
    
    if command == "update":
        pipeline = get_airtable_pipeline()
        if pipeline:
            success = update_pipeline_tracker(pipeline)
            if success:
                print(f"Pipeline updated: {pipeline['deals_count']} deals, ${pipeline['total_gross']:,} gross, ${pipeline['luke_share']:,.0f} Luke's share")
            else:
                print("Failed to update Google Sheet")
        else:
            print("Failed to fetch pipeline data")
    
    elif command == "summary":
        summary = get_pipeline_summary()
        print(summary)

if __name__ == "__main__":
    main()