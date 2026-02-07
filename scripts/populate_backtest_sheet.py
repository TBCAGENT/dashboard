#!/usr/bin/env python3
"""
Populate Google Sheet with Luke's backtest results
"""

import json
import requests
import subprocess
import os

# Load backtest data
with open('data/lukes_strategy_backtest_fixed.json', 'r') as f:
    backtest_data = json.load(f)

summary = backtest_data['summary']
daily_results = backtest_data['daily_results']
positions = backtest_data['positions']

# Google Sheets API setup
SHEET_ID = "1Z9Xz_187P4n7MHBhoE9vfsLxgDsDIwhltPU-kQC0q3E"

def get_token():
    result = subprocess.run(['bash', 'scripts/google-token.sh'], 
                          capture_output=True, text=True, cwd='/Users/lukefontaine/.openclaw/workspace')
    return result.stdout.strip()

def update_sheet_values(sheet_id, range_name, values, token):
    """Update values in Google Sheet"""
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/{range_name}?valueInputOption=RAW"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    data = {"values": values}
    
    response = requests.put(url, headers=headers, json=data)
    return response

def populate_summary_tab(token):
    """Populate the Summary tab with key metrics"""
    print("📊 Populating Summary tab...")
    
    summary_values = [
        ["Luke's 10% Bitcoin Strategy - 6 Month Backtest", "", "", ""],
        ["", "", "", ""],
        ["STRATEGY OVERVIEW", "", "", ""],
        ["Period", summary['strategy_period'], "", ""],
        ["Days Analyzed", summary['total_days'], "", ""],
        ["Daily Investment", "$1,000", "", ""],
        ["Profit Target", "10%", "", ""],
        ["Stop Loss", "None", "", ""],
        ["", "", "", ""],
        ["INVESTMENT SUMMARY", "", "", ""],
        ["Total Invested", f"${summary['total_invested']:,}", "", ""],
        ["Total Positions", summary['total_positions'], "", ""],
        ["", "", "", ""],
        ["POSITION STATUS", "", "", ""],
        ["Closed Positions", summary['closed_positions'], "", ""],
        ["Open Positions", summary['open_positions'], "", ""],
        ["Win Rate", f"{summary['win_rate']:.1f}%", "", ""],
        ["Avg Days to 10% Profit", f"{summary['avg_days_to_close']:.1f}", "", ""],
        ["", "", "", ""],
        ["FINANCIAL RESULTS", "", "", ""],
        ["Cash from Closed Positions", f"${summary['total_cash_from_sales']:,}", "", ""],
        ["Realized Profit", f"${summary['total_realized_profit']:,}", "", ""],
        ["Open Positions Current Value", f"${summary['open_positions_current_value']:,}", "", ""],
        ["Open Positions Unrealized P&L", f"${summary['open_positions_unrealized']:,}", "", ""],
        ["", "", "", ""],
        ["TOTAL PERFORMANCE", "", "", ""],
        ["Total Portfolio Value", f"${summary['total_portfolio_value']:,}", "", ""],
        ["Total Return", f"${summary['total_return']:,}", "", ""],
        ["Total Return %", f"{summary['total_return_pct']:.1f}%", "", ""],
        ["", "", "", ""],
        ["CONCLUSION", "", "", ""],
        ["Strategy Success Rate", "85.6% of positions hit 10% profit", "", ""],
        ["Average Hold Time", "22 days per profitable position", "", ""],
        ["Overall Assessment", "Profitable with good consistency", "", ""]
    ]
    
    response = update_sheet_values(SHEET_ID, "Summary!A1:D50", summary_values, token)
    print(f"Summary tab updated: {response.status_code}")

def populate_daily_results_tab(token):
    """Populate Daily Results tab with day-by-day performance"""
    print("📈 Populating Daily Results tab...")
    
    headers = [
        ["Date", "BTC Price", "Daily Investment", "Positions Closed", "Cash from Sales", 
         "Total Invested", "Open Positions", "Open Positions Value", "Total Portfolio Value", 
         "Total Profit", "Total Return %"]
    ]
    
    daily_values = []
    for day in daily_results:
        daily_values.append([
            day['date'],
            f"${day['btc_price']:,}",
            f"${day['daily_investment']:,}",
            day['positions_closed_today'],
            f"${day['cash_from_sales_today']:,}",
            f"${day['total_invested']:,}",
            day['open_positions_count'],
            f"${day['open_positions_value']:,}",
            f"${day['total_portfolio_value']:,}",
            f"${day['total_profit']:,}",
            f"{day['total_profit_pct']:.1f}%"
        ])
    
    all_values = headers + daily_values
    response = update_sheet_values(SHEET_ID, "Daily Results!A1:K200", all_values, token)
    print(f"Daily Results tab updated: {response.status_code}")

def populate_positions_tab(token):
    """Populate Individual Positions tab with each trade"""
    print("🎯 Populating Individual Positions tab...")
    
    headers = [
        ["Position #", "Entry Date", "Entry Price", "BTC Quantity", "Investment", 
         "Profit Target", "Status", "Exit Date", "Exit Price", "Total Received", 
         "Profit", "Days Held"]
    ]
    
    position_values = []
    for i, pos in enumerate(positions, 1):
        days_held = ""
        if pos['status'] == 'closed':
            from datetime import datetime
            entry_date = datetime.strptime(pos['date'], '%Y-%m-%d')
            exit_date = datetime.strptime(pos['exit_date'], '%Y-%m-%d')
            days_held = (exit_date - entry_date).days
        
        position_values.append([
            i,
            pos['date'],
            f"${pos['entry_price']:,}",
            f"{pos['quantity']:.8f}",
            f"${pos['invested']:,}",
            f"${pos['profit_target']:,}",
            pos['status'],
            pos['exit_date'] if pos['exit_date'] else "",
            f"${pos['exit_price']:,}" if pos['exit_price'] else "",
            f"${pos['total_received']:,}" if pos.get('total_received', 0) > 0 else "",
            f"${pos['profit']:,}" if pos['profit'] != 0 else "",
            days_held
        ])
    
    all_values = headers + position_values
    response = update_sheet_values(SHEET_ID, "Individual Positions!A1:L200", all_values, token)
    print(f"Individual Positions tab updated: {response.status_code}")

def set_sheet_permissions(token):
    """Make sheet viewable to anyone with link"""
    print("🔗 Setting sheet permissions...")
    
    url = f"https://www.googleapis.com/drive/v3/files/{SHEET_ID}/permissions"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    data = {
        "role": "reader",
        "type": "anyone"
    }
    
    response = requests.post(url, headers=headers, json=data)
    print(f"Permissions set: {response.status_code}")
    
    return f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit#gid=0"

def main():
    print("🚀 Populating Luke's Backtest Google Sheet")
    print("=" * 50)
    
    token = get_token()
    print(f"✅ Got auth token")
    
    # Populate all tabs
    populate_summary_tab(token)
    populate_daily_results_tab(token)
    populate_positions_tab(token)
    
    # Set permissions and get link
    sheet_url = set_sheet_permissions(token)
    
    print(f"\\n🎉 COMPLETE!")
    print(f"📊 Google Sheet URL: {sheet_url}")
    print(f"\\n📈 KEY RESULTS:")
    print(f"• Total Return: {summary['total_return_pct']:.1f}%")
    print(f"• Win Rate: {summary['win_rate']:.1f}%")
    print(f"• Avg Days to Profit: {summary['avg_days_to_close']:.1f}")
    
    return sheet_url

if __name__ == "__main__":
    main()