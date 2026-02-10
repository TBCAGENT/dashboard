#!/usr/bin/env python3
import requests
import json
import subprocess

def get_google_token():
    result = subprocess.run(['bash', '/Users/lukefontaine/.openclaw/workspace/scripts/google-token.sh'], 
                          capture_output=True, text=True)
    return result.stdout.strip()

# Remaining properties from the analysis
remaining_properties = [
    {"Address": "20044 Stotter, Detroit, MI 48234", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$70,000", "Potential_Equity": "$20,000", "Monthly_Rent": "$910", "Priority": "GOOD"},
    {"Address": "19387 Fleming St, Detroit, MI 48234", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$70,000", "Potential_Equity": "$20,000", "Monthly_Rent": "$910", "Priority": "GOOD"},
    {"Address": "19408 Keystone, Detroit, MI 48234", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$70,000", "Potential_Equity": "$20,000", "Monthly_Rent": "$910", "Priority": "GOOD"},
    {"Address": "19343 Harned St, Detroit, MI 48234", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$70,000", "Potential_Equity": "$20,000", "Monthly_Rent": "$910", "Priority": "GOOD"},
    {"Address": "19625 Concord St, Detroit, MI 48234", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$70,000", "Potential_Equity": "$20,000", "Monthly_Rent": "$910", "Priority": "GOOD"},
    {"Address": "16071 Manning St, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "19399 Waltham, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "18653 Runyon, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "15226 Faircrest St, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "19703 Rowe St, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "11268 Lakepointe, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "16229 Liberal St, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "16301 Liberal St, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "19393 Pelkey St, Detroit, MI 48205", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$65,000", "Potential_Equity": "$15,000", "Monthly_Rent": "$909", "Priority": "FAIR"},
    {"Address": "5372 Garland St, Detroit, MI 48213", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$60,000", "Potential_Equity": "$10,000", "Monthly_Rent": "$720", "Priority": "FAIR"},
    {"Address": "11083 Wilshire, Detroit, MI 48213", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$60,000", "Potential_Equity": "$10,000", "Monthly_Rent": "$720", "Priority": "FAIR"},
    {"Address": "12624 Wade St, Detroit, MI 48213", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$60,000", "Potential_Equity": "$10,000", "Monthly_Rent": "$720", "Priority": "FAIR"},
    {"Address": "19266 Greeley St, Highland Park, MI 48203", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$55,000", "Potential_Equity": "$5,000", "Monthly_Rent": "$605", "Priority": "POOR"},
    {"Address": "20479 Greeley, Detroit, MI 48203", "Price": "$50,000", "Beds": "3", "Baths": "1", 
     "Estimated_ARV": "$55,000", "Potential_Equity": "$5,000", "Monthly_Rent": "$605", "Priority": "POOR"}
]

def add_remaining_properties():
    token = get_google_token()
    spreadsheet_id = "1TkM54EN1EF_H9NW5RpoxhRaZd0qYe7NjAwwfvuLuIvg"
    
    # Get current row count
    count_url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Listings!A:A"
    count_response = requests.get(count_url, headers={"Authorization": f"Bearer {token}"})
    current_rows = len(count_response.json().get('values', []))
    
    print(f"Current rows in sheet: {current_rows}")
    
    # Add remaining properties starting from the next row
    start_row = current_rows + 1
    values_to_add = []
    
    for prop in remaining_properties:
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
            f"Analyzed opportunity: {prop['Potential_Equity']} equity potential"
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
            print(f"✅ Successfully added {len(values_to_add)} remaining analyzed properties to the sheet!")
            print(f"Total properties now in sheet: {current_rows + len(values_to_add) - 1}")  # -1 for header row
            return True
        else:
            print(f"❌ Error adding properties: {response.text}")
            return False
    else:
        print("No properties to add")
        return False

if __name__ == "__main__":
    add_remaining_properties()