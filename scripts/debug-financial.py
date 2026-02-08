#!/usr/bin/env python3
"""Quick debug script to check financial data"""
import sys
sys.path.append('/Users/lukefontaine/.openclaw/workspace/scripts')
from financial_analyzer import FinancialAnalyzer

analyzer = FinancialAnalyzer()

# Check what data we're reading
assignments = analyzer.read_sheet_data("Entity Assignment", "A10:O15")
print("Raw assignments data:")
for i, row in enumerate(assignments):
    print(f"Row {i}: {row}")

print("\nProcessing dates:")
from datetime import datetime, timedelta
cutoff_date = datetime.now() - timedelta(days=30)
print(f"Cutoff date: {cutoff_date}")

for row in assignments:
    if len(row) >= 7:
        print(f"Processing row: {row[0]} | {row[2]}")
        try:
            # Handle various date formats
            date_str = row[0]
            if '/' in date_str:
                parts = date_str.split('/')
                if len(parts) == 3:
                    month, day, year = parts
                    if len(year) == 2:
                        year = '20' + year
                    trans_date = datetime(int(year), int(month), int(day))
                    print(f"  Parsed date: {trans_date}")
                    if trans_date >= cutoff_date:
                        amount_str = row[2]
                        print(f"  Amount string: '{amount_str}'")
                        amount = float(amount_str.replace('$', '').replace(',', '').replace('-', ''))
                        print(f"  Parsed amount: {amount}")
                        if amount > 0:  # This was originally < 0, let me check
                            print(f"  This is an expense: ${amount}")
        except Exception as e:
            print(f"  Error: {e}")