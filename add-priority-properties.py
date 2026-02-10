#!/usr/bin/env python3
import requests
import json
import subprocess

def get_google_token():
    result = subprocess.run(['bash', '/Users/lukefontaine/.openclaw/workspace/scripts/google-token.sh'], 
                          capture_output=True, text=True)
    return result.stdout.strip()

# Priority properties with analysis data
priority_properties = [
    {"Address": "15409 Pinehurst, Detroit, MI 48238", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$95,000", "Potential_Equity": "$45,000", "Monthly_Rent": "$1,615", "Priority": "EXCEPTIONAL"},
    {"Address": "19447 Huntington Rd, Detroit, MI 48227", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$89,900", "Potential_Equity": "$39,900", "Monthly_Rent": "$1,360", "Priority": "EXCELLENT"},
    {"Address": "14243 Cruse St, Detroit, MI 48227", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$85,000", "Potential_Equity": "$35,000", "Monthly_Rent": "$1,360", "Priority": "EXCELLENT"},
    {"Address": "15352 Littlefield St, Detroit, MI 48227", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$85,000", "Potential_Equity": "$35,000", "Monthly_Rent": "$1,360", "Priority": "EXCELLENT"},
    {"Address": "12707 Strathmoor St, Detroit, MI 48227", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$85,000", "Potential_Equity": "$35,000", "Monthly_Rent": "$1,360", "Priority": "EXCELLENT"},
    {"Address": "15066 Beaverland St, Detroit, MI 48223", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$85,000", "Potential_Equity": "$35,000", "Monthly_Rent": "$1,360", "Priority": "EXCELLENT"},
    {"Address": "11591 Roxbury, Detroit, MI 48224", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$80,000", "Potential_Equity": "$30,000", "Monthly_Rent": "$1,200", "Priority": "EXCELLENT"},
    {"Address": "9075 Grandville Ave, Detroit, MI 48228", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$75,000", "Potential_Equity": "$25,000", "Monthly_Rent": "$1,050", "Priority": "GOOD"},
    {"Address": "7357 Artesian, Detroit, MI 48228", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$75,000", "Potential_Equity": "$25,000", "Monthly_Rent": "$1,050", "Priority": "GOOD"},
    {"Address": "8325 Coyle, Detroit, MI 48228", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$75,000", "Potential_Equity": "$25,000", "Monthly_Rent": "$1,050", "Priority": "GOOD"}
]

def add_properties_to_sheet():
    token = get_google_token()
    spreadsheet_id = "1TkM54EN1EF_H9NW5RpoxhRaZd0qYe7NjAwwfvuLuIvg"
    
    # First, get current headers to see what columns exist
    headers_url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Listings!A1:Z1"
    headers_response = requests.get(headers_url, headers={"Authorization": f"Bearer {token}"})
    
    if headers_response.status_code == 200:
        current_headers = headers_response.json().get('values', [[]])[0]
        print(f"Current headers: {current_headers}")
        
        # Add new columns if they don't exist
        new_columns = ["Estimated_ARV", "Potential_Equity", "Monthly_Rent", "Priority_Level", "Analysis_Notes"]
        
        # Check current row count
        count_url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Listings!A:A"
        count_response = requests.get(count_url, headers={"Authorization": f"Bearer {token}"})
        current_rows = len(count_response.json().get('values', []))
        
        print(f"Current rows in sheet: {current_rows}")
        
        # Add headers if they don't exist
        if len(current_headers) < len(new_columns) + 9:  # 9 original columns
            extended_headers = current_headers + new_columns
            header_data = {"values": [extended_headers]}
            header_url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Listings!A1"
            requests.put(f"{header_url}?valueInputOption=USER_ENTERED", 
                        headers={"Authorization": f"Bearer {token}"}, 
                        json=header_data)
        
        # Add priority properties starting from the next row
        start_row = current_rows + 1
        values_to_add = []
        
        for prop in priority_properties:
            row_data = [
                prop["Address"],
                prop["Price"], 
                prop["Beds"],
                prop["Baths"],
                "",  # Days on Market - empty
                prop["Monthly_Rent"],  # Section 8 Rent
                "",  # Zillow Link - empty for now
                "2026-02-09",  # Date Added
                "",  # Agent Response - empty
                prop["Estimated_ARV"],
                prop["Potential_Equity"],
                prop["Monthly_Rent"],
                prop["Priority"],
                f"Verified opportunity: {prop['Potential_Equity']} equity potential"
            ]
            values_to_add.append(row_data)
        
        if values_to_add:
            range_name = f"Listings!A{start_row}:N{start_row + len(values_to_add) - 1}"
            data = {"values": values_to_add}
            
            url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/{range_name}"
            response = requests.put(f"{url}?valueInputOption=USER_ENTERED", 
                                  headers={"Authorization": f"Bearer {token}"}, 
                                  json=data)
            
            if response.status_code == 200:
                print(f"✅ Successfully added {len(values_to_add)} priority properties to the sheet!")
                return True
            else:
                print(f"❌ Error adding properties: {response.text}")
                return False
        else:
            print("No properties to add")
            return False
    else:
        print(f"❌ Error getting headers: {headers_response.text}")
        return False

if __name__ == "__main__":
    add_properties_to_sheet()