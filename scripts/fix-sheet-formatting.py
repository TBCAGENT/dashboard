#!/usr/bin/env python3
import json
import sys
import re
import os

# Load environment
os.system('source ~/.config/google-arthur/secrets.env')

# Read sheet data from stdin
data = json.load(sys.stdin)
rows = data.get('values', [])

# Fix formatting issues
cleaned_rows = []
for i, row in enumerate(rows):
    if i == 0:  # Header row
        cleaned_rows.append(row)
        continue
    
    # Ensure row has all columns
    while len(row) < 9:
        row.append('')
    
    # Fix obvious data errors (like '46' beds should be '4')
    if len(row) > 2 and row[2] and row[2].isdigit():
        beds = int(row[2])
        if beds > 20:  # Obviously wrong, likely missing space
            row[2] = str(beds // 10)  # 46 -> 4, etc.
    
    # Standardize rent format
    if len(row) > 5 and row[5]:
        rent = row[5].strip()
        # Extract just the number if it exists  
        rent_num = re.search(r'\$?(\d+)', rent)
        if rent_num:
            row[5] = f'${rent_num.group(1)}/mo'
        elif rent == '':
            row[5] = 'TBD'
    else:
        if len(row) > 5:
            row[5] = 'TBD'
    
    # Ensure price has $ sign and proper formatting
    if len(row) > 1 and row[1]:
        price_str = row[1].replace('$', '').replace(',', '')
        if price_str.isdigit():
            price_num = int(price_str)
            row[1] = f'${price_num:,}'
    
    cleaned_rows.append(row)

# Output the cleaned data structure ready for Google Sheets API
output = {
    "values": cleaned_rows
}

print(json.dumps(output, indent=2))