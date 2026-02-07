#!/usr/bin/env python3
"""
Financial Command Center - Smart Transaction Categorizer & Analyzer
Reads from Tiller Transactions, applies categorization rules, and provides conversational interface
"""
import json
import re
from datetime import datetime, timedelta
import requests
import os

class FinancialAnalyzer:
    def __init__(self):
        self.spreadsheet_id = "1pd1dt64gBni4vAWze9QzhVwsmFMcdBuufW6m_0n-OPw"
        self.token = self.get_google_token()
        
    def get_google_token(self):
        """Get fresh Google token"""
        import subprocess
        result = subprocess.run(['bash', '/Users/lukefontaine/.openclaw/workspace/scripts/google-token.sh'], 
                              capture_output=True, text=True)
        return result.stdout.strip()
    
    def read_sheet_data(self, sheet_name, range_str):
        """Read data from Google Sheet"""
        url = f"https://sheets.googleapis.com/v4/spreadsheets/{self.spreadsheet_id}/values/{sheet_name}!{range_str}"
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json().get('values', [])
        return []
    
    def write_sheet_data(self, sheet_name, range_str, values):
        """Write data to Google Sheet"""
        url = f"https://sheets.googleapis.com/v4/spreadsheets/{self.spreadsheet_id}/values/{sheet_name}!{range_str}?valueInputOption=USER_ENTERED"
        headers = {"Authorization": f"Bearer {self.token}", "Content-Type": "application/json"}
        data = {"values": values}
        response = requests.put(url, headers=headers, json=data)
        return response.status_code == 200
    
    def get_categorization_rules(self):
        """Load categorization rules from sheet"""
        rules_data = self.read_sheet_data("Category Rules", "A2:L100")
        rules = []
        for row in rules_data:
            if len(row) >= 8 and row[0]:  # Rule name exists
                rules.append({
                    'name': row[0],
                    'merchant_pattern': row[1],
                    'account_pattern': row[2],
                    'amount_min': float(row[3]) if row[3] else None,
                    'amount_max': float(row[4]) if row[4] else None,
                    'description_pattern': row[5],
                    'entity': row[6],
                    'category': row[7],
                    'confidence': row[8]
                })
        return rules
    
    def categorize_transaction(self, transaction, rules):
        """Apply rules to categorize a transaction"""
        date, description, amount, account = transaction[:4]
        amount_num = float(amount.replace('$', '').replace(',', '').replace('-', ''))
        
        for rule in rules:
            # Check merchant pattern
            if rule['merchant_pattern'] != '*' and rule['merchant_pattern']:
                if not re.search(rule['merchant_pattern'].replace('*', '.*'), description, re.IGNORECASE):
                    continue
            
            # Check account pattern
            if rule['account_pattern'] != '*' and rule['account_pattern']:
                if not re.search(rule['account_pattern'].replace('*', '.*'), account, re.IGNORECASE):
                    continue
            
            # Check amount range
            if rule['amount_min'] and amount_num < rule['amount_min']:
                continue
            if rule['amount_max'] and amount_num > rule['amount_max']:
                continue
            
            # Check description pattern
            if rule['description_pattern'] != '*' and rule['description_pattern']:
                if not re.search(rule['description_pattern'].replace('*', '.*'), description, re.IGNORECASE):
                    continue
            
            return rule['entity'], rule['category'], rule['confidence'], rule['name']
        
        # Default categorization based on account type
        if 'Business' in account:
            return 'BlackBox', 'Business Expense', '50%', 'Default Business'
        elif 'Bank of America' in account:
            return 'Giving Guidance Group LLC', 'Charitable', '90%', 'Default BoA'
        else:
            return 'Personal', 'Uncategorized', '30%', 'Default Personal'
    
    def process_new_transactions(self):
        """Process new transactions from Tiller and categorize them"""
        # Read transactions from Tiller
        transactions = self.read_sheet_data("Transactions", "A2:J100")
        if not transactions:
            return "No transactions found"
        
        # Read existing entity assignments to avoid duplicates
        existing = self.read_sheet_data("Entity Assignment", "A10:O1000")
        existing_descriptions = set()
        if existing:
            for row in existing:
                if len(row) >= 2:
                    existing_descriptions.add(f"{row[0]}_{row[1]}")  # date_description
        
        # Get categorization rules
        rules = self.get_categorization_rules()
        
        # Categorize new transactions
        new_assignments = []
        for i, transaction in enumerate(transactions):
            if len(transaction) >= 4:
                date, description, _, amount, account = transaction[1:6]
                transaction_key = f"{date}_{description}"
                
                if transaction_key not in existing_descriptions:
                    entity, category, confidence, rule_name = self.categorize_transaction(
                        [date, description, amount, account], rules)
                    
                    new_assignments.append([
                        date, description, amount, account, "", entity, category, 
                        "Auto", confidence, f"Applied rule: {rule_name}", 
                        f"tx_{len(existing) + len(new_assignments) + 1:03d}", 
                        "No", "", rule_name, ""
                    ])
        
        if new_assignments:
            # Write to Entity Assignment sheet
            start_row = len(existing) + 10  # Start after existing data
            range_str = f"A{start_row}:O{start_row + len(new_assignments) - 1}"
            self.write_sheet_data("Entity Assignment", range_str, new_assignments)
            return f"Categorized {len(new_assignments)} new transactions"
        else:
            return "No new transactions to process"
    
    def query_expenses(self, entity=None, category=None, days=30, question_type="total"):
        """Answer natural language questions about expenses"""
        # Read entity assignments
        assignments = self.read_sheet_data("Entity Assignment", "A10:O1000")
        if not assignments:
            return "No transaction data available"
        
        # Filter by date range
        cutoff_date = datetime.now() - timedelta(days=days)
        filtered_transactions = []
        
        for row in assignments:
            if len(row) >= 7:
                try:
                    # Handle various date formats
                    date_str = row[0]
                    if '/' in date_str:
                        parts = date_str.split('/')
                        if len(parts) == 3:
                            # Convert to consistent format
                            month, day, year = parts
                            if len(year) == 2:
                                year = '20' + year
                            trans_date = datetime(int(year), int(month), int(day))
                        else:
                            continue
                    else:
                        continue
                    
                    if trans_date >= cutoff_date:
                        amount = float(row[2].replace('$', '').replace(',', ''))
                        filtered_transactions.append({
                            'date': row[0],
                            'description': row[1],
                            'amount': amount,
                            'account': row[3],
                            'entity': row[5],
                            'category': row[6]
                        })
                except:
                    continue
        
        # Apply filters
        if entity:
            filtered_transactions = [t for t in filtered_transactions if entity.lower() in t['entity'].lower()]
        if category:
            filtered_transactions = [t for t in filtered_transactions if category.lower() in t['category'].lower()]
        
        # Calculate result based on question type
        if question_type == "total":
            total = sum(abs(t['amount']) for t in filtered_transactions if t['amount'] < 0)  # Expenses are negative
            return f"Total spent: ${total:,.2f} over {days} days"
        
        elif question_type == "breakdown":
            categories = {}
            for t in filtered_transactions:
                if t['amount'] < 0:  # Expenses only
                    cat = t['category']
                    categories[cat] = categories.get(cat, 0) + abs(t['amount'])
            
            result = f"Expense breakdown over {days} days:\n"
            for cat, amount in sorted(categories.items(), key=lambda x: x[1], reverse=True):
                result += f"  {cat}: ${amount:,.2f}\n"
            return result
        
        elif question_type == "largest":
            if not filtered_transactions:
                return "No expenses found"
            largest = max([t for t in filtered_transactions if t['amount'] < 0], 
                         key=lambda x: abs(x['amount']))
            return f"Largest expense: ${abs(largest['amount']):,.2f} - {largest['description']} ({largest['category']})"
    
    def get_net_worth(self):
        """Calculate total net worth from all sources"""
        # Get investment account values
        assets = self.read_sheet_data("Asset Tracker", "B5:B7")
        investment_total = 0
        for row in assets:
            if row and row[0] and row[0] != '':
                try:
                    value = float(row[0].replace('$', '').replace(',', ''))
                    investment_total += value
                except:
                    continue
        
        # Get real estate values - Luke's ownership percentage values  
        real_estate = self.read_sheet_data("Asset Tracker", "C12:C18")  # Luke's ownership column
        real_estate_total = 0
        for row in real_estate:
            if row and row[0] and row[0] not in ['0', 'TBD', '']:
                try:
                    value_str = row[0].replace('$', '').replace(',', '')
                    value = float(value_str)
                    real_estate_total += value
                except:
                    continue
        
        return {
            'investments': investment_total,
            'real_estate': real_estate_total,
            'total': investment_total + real_estate_total
        }

def main():
    analyzer = FinancialAnalyzer()
    
    import sys
    if len(sys.argv) < 2:
        print("Usage: python financial-analyzer.py <command>")
        print("Commands: process, query, networth")
        return
    
    command = sys.argv[1]
    
    if command == "process":
        result = analyzer.process_new_transactions()
        print(result)
    
    elif command == "query":
        # Example: python financial-analyzer.py query BlackBox 7 total
        entity = sys.argv[2] if len(sys.argv) > 2 else None
        days = int(sys.argv[3]) if len(sys.argv) > 3 else 30
        query_type = sys.argv[4] if len(sys.argv) > 4 else "total"
        result = analyzer.query_expenses(entity=entity, days=days, question_type=query_type)
        print(result)
    
    elif command == "networth":
        net_worth = analyzer.get_net_worth()
        print(f"Investment Accounts: ${net_worth['investments']:,.2f}")
        print(f"Real Estate: ${net_worth['real_estate']:,.2f}")
        print(f"Total Net Worth: ${net_worth['total']:,.2f}")

if __name__ == "__main__":
    main()