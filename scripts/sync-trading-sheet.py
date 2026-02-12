#!/usr/bin/env python3
"""
Sync paper trading data to Google Sheets for P&L tracking
"""

import json
import subprocess
import requests
from datetime import datetime, timedelta

def get_google_token():
    """Get fresh Google OAuth token"""
    result = subprocess.run(
        ["/Users/lukefontaine/.openclaw/workspace/scripts/google-token.sh"],
        capture_output=True,
        text=True
    )
    return result.stdout.strip()

def load_trading_data():
    """Load paper trading data"""
    with open('/Users/lukefontaine/.openclaw/workspace/data/paper_trading.json', 'r') as f:
        return json.load(f)

def calculate_total_pnl(data):
    """Calculate total P&L from closed trades"""
    total_pnl = sum([trade.get('pnl', 0) for trade in data.get('closed_trades', [])])
    
    # Calculate unrealized P&L from open positions
    unrealized_pnl = 0
    for position in data.get('positions', []):
        current_value = position.get('value', 0)
        # This is simplified - in real trading we'd get current market price
        unrealized_pnl += current_value - 1000  # Assuming $1000 initial position
    
    return total_pnl, unrealized_pnl

def update_trading_sheet():
    """Update the Google Sheet with latest trading data"""
    token = get_google_token()
    sheet_id = "1bURjg0SJlcyq2We6r8osWE0pc_s9QPbk7Fw2qeJc38w"
    
    # Load trading data
    data = load_trading_data()
    
    # Calculate P&L
    realized_pnl, unrealized_pnl = calculate_total_pnl(data)
    total_pnl = realized_pnl + unrealized_pnl
    
    # Prepare data for sheet
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M")
    current_balance = data.get('current_balance', 0)
    initial_balance = data.get('initial_balance', 5000)
    total_return_pct = ((current_balance - initial_balance) / initial_balance) * 100
    
    # Summary data for Portfolio sheet
    portfolio_data = [
        ["Metric", "Value"],
        ["Last Updated", current_time],
        ["Initial Balance", f"${initial_balance:,.2f}"],
        ["Current Balance", f"${current_balance:,.2f}"],
        ["Realized P&L", f"${realized_pnl:,.2f}"],
        ["Unrealized P&L", f"${unrealized_pnl:,.2f}"],
        ["Total P&L", f"${total_pnl:,.2f}"],
        ["Return %", f"{total_return_pct:.2f}%"],
        ["Active Positions", len(data.get('positions', []))],
        ["Closed Trades", len(data.get('closed_trades', []))]
    ]
    
    # Update Portfolio sheet
    portfolio_url = f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/Portfolio!A1:B10?valueInputOption=USER_ENTERED"
    response = requests.put(
        portfolio_url,
        headers={"Authorization": f"Bearer {token}"},
        json={"values": portfolio_data}
    )
    
    print(f"Portfolio update status: {response.status_code}")
    if response.status_code != 200:
        print(f"Error: {response.text}")
    
    # Prepare closed trades data
    trades_data = [["Date", "Symbol", "Side", "Quantity", "Entry Price", "Exit Price", "P&L", "P&L %", "Strategy", "Exit Reason"]]
    
    for trade in data.get('closed_trades', []):
        trades_data.append([
            trade.get('entry_time', '').split('T')[0],  # Date only
            trade.get('symbol', ''),
            "LONG",  # Default for now
            f"{trade.get('quantity', 0):.6f}",
            f"${trade.get('entry_price', 0):,.2f}",
            f"${trade.get('exit_price', 0):,.2f}",
            f"${trade.get('pnl', 0):,.2f}",
            f"{trade.get('pnl_pct', 0)*100:.2f}%",
            trade.get('strategy', ''),
            trade.get('exit_reason', '')
        ])
    
    # Update Trades sheet
    trades_url = f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/Trades!A1:J{len(trades_data)}?valueInputOption=USER_ENTERED"
    response = requests.put(
        trades_url,
        headers={"Authorization": f"Bearer {token}"},
        json={"values": trades_data}
    )
    
    print(f"Trades update status: {response.status_code}")
    if response.status_code != 200:
        print(f"Error: {response.text}")
    
    # Add daily summary entry
    daily_summary_data = [
        [current_time.split(' ')[0], f"${current_balance:,.2f}", f"${total_pnl:,.2f}", f"{total_return_pct:.2f}%", len(data.get('positions', [])), len(data.get('closed_trades', []))]
    ]
    
    # Append to Daily Summary sheet (append, don't overwrite)
    daily_url = f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/Daily Summary!A:F:append?valueInputOption=USER_ENTERED"
    response = requests.post(
        daily_url,
        headers={"Authorization": f"Bearer {token}"},
        json={"values": daily_summary_data}
    )
    
    print(f"Daily Summary update status: {response.status_code}")
    if response.status_code != 200:
        print(f"Error: {response.text}")
    
    print(f"\n✅ Trading sheet updated successfully!")
    print(f"📊 Total P&L: ${total_pnl:,.2f} ({total_return_pct:.2f}%)")
    print(f"🔗 Sheet: https://docs.google.com/spreadsheets/d/{sheet_id}")

if __name__ == "__main__":
    update_trading_sheet()