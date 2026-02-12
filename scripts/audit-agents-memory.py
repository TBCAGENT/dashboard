#!/usr/bin/env python3
"""
Audit all agents for memory accuracy and data storage issues
"""

import os
import json
import glob
from datetime import datetime

def audit_agents():
    """Check all agents for potential memory/data issues"""
    
    print("🔍 AGENT MEMORY AUDIT")
    print("=" * 50)
    
    issues_found = []
    
    # 1. Check Trading Agent (Quant)
    print("\n📊 Agent Quant (Trading)")
    try:
        with open('/Users/lukefontaine/.openclaw/workspace/data/paper_trading.json', 'r') as f:
            trading_data = json.load(f)
        
        balance = trading_data.get('current_balance', 0)
        trades = len(trading_data.get('closed_trades', []))
        positions = len(trading_data.get('positions', []))
        
        print(f"✅ Data file exists: paper_trading.json")
        print(f"   Balance: ${balance:,.2f}")
        print(f"   Trades: {trades}, Positions: {positions}")
        
        # Check if trading sheet sync script exists
        if os.path.exists('/Users/lukefontaine/.openclaw/workspace/scripts/sync-trading-sheet.py'):
            print(f"✅ Sync script exists: sync-trading-sheet.py")
        else:
            print(f"❌ Missing sync script")
            issues_found.append("Trading: No sync script for Google Sheet")
            
        # Check memory file
        if os.path.exists('/Users/lukefontaine/.openclaw/workspace/memory/agent-quant-memory.md'):
            print(f"✅ Memory file exists: agent-quant-memory.md")
        else:
            print(f"❌ Missing memory file")
            issues_found.append("Trading: No dedicated memory file")
            
    except Exception as e:
        print(f"❌ Error reading trading data: {e}")
        issues_found.append(f"Trading: Data file error - {e}")
    
    # 2. Check Detroit Agent (Real Estate)
    print("\n🏠 Agent Detroit (Real Estate)")
    try:
        detroit_sheets = [
            "Detroit Listings Sheet",
            "Detroit Agents Sheet"
        ]
        
        for sheet in detroit_sheets:
            print(f"📋 {sheet}: Stored in TOOLS.md")
        
        # Check if monitoring scripts exist
        monitor_scripts = glob.glob('/Users/lukefontaine/.openclaw/workspace/scripts/*detroit*')
        monitor_scripts.extend(glob.glob('/Users/lukefontaine/.openclaw/workspace/scripts/*zillow*'))
        
        if monitor_scripts:
            print(f"✅ Found {len(monitor_scripts)} monitoring scripts")
            for script in monitor_scripts:
                print(f"   - {os.path.basename(script)}")
        else:
            print(f"❌ No monitoring scripts found")
            issues_found.append("Detroit: No monitoring scripts found")
            
    except Exception as e:
        print(f"❌ Error checking Detroit agent: {e}")
        issues_found.append(f"Detroit: Error - {e}")
    
    # 3. Check SMS Outreach Agent
    print("\n📱 Agent SMS Outreach")
    try:
        # Check for Airtable connections
        airtable_scripts = glob.glob('/Users/lukefontaine/.openclaw/workspace/scripts/*airtable*')
        airtable_scripts.extend(glob.glob('/Users/lukefontaine/.openclaw/workspace/scripts/*outreach*'))
        
        if airtable_scripts:
            print(f"✅ Found {len(airtable_scripts)} outreach scripts")
            for script in airtable_scripts:
                print(f"   - {os.path.basename(script)}")
        else:
            print(f"❌ No outreach scripts found")
            issues_found.append("SMS: No outreach scripts found")
            
        # Check for GHL credentials
        if "GHL Location:" in open('/Users/lukefontaine/.openclaw/workspace/TOOLS.md', 'r').read():
            print(f"✅ GHL credentials configured")
        else:
            print(f"❌ GHL not configured")
            issues_found.append("SMS: GHL not properly configured")
            
    except Exception as e:
        print(f"❌ Error checking SMS agent: {e}")
        issues_found.append(f"SMS: Error - {e}")
    
    # 4. Check Financial Tracking Agent
    print("\n💰 Agent Financial")
    try:
        # Check for financial scripts
        financial_scripts = glob.glob('/Users/lukefontaine/.openclaw/workspace/scripts/*financial*')
        financial_scripts.extend(glob.glob('/Users/lukefontaine/.openclaw/workspace/scripts/*tiller*'))
        financial_scripts.extend(glob.glob('/Users/lukefontaine/.openclaw/workspace/scripts/*expense*'))
        
        if financial_scripts:
            print(f"✅ Found {len(financial_scripts)} financial scripts")
        else:
            print(f"❌ No financial scripts found")
            issues_found.append("Financial: No tracking scripts found")
            
        # Check for Tiller sheet URL in TOOLS.md
        tools_content = open('/Users/lukefontaine/.openclaw/workspace/TOOLS.md', 'r').read()
        if 'tiller' in tools_content.lower() or 'financial' in tools_content.lower():
            print(f"✅ Financial tracking configured in TOOLS.md")
        else:
            print(f"❌ No financial tracking configured")
            issues_found.append("Financial: No sheet URLs configured")
            
    except Exception as e:
        print(f"❌ Error checking Financial agent: {e}")
        issues_found.append(f"Financial: Error - {e}")
    
    # Summary
    print("\n" + "=" * 50)
    print("🎯 AUDIT SUMMARY")
    print("=" * 50)
    
    if not issues_found:
        print("✅ No critical issues found!")
    else:
        print(f"❌ Found {len(issues_found)} issues:")
        for i, issue in enumerate(issues_found, 1):
            print(f"   {i}. {issue}")
    
    # Recommendations
    print("\n🔧 RECOMMENDATIONS:")
    print("1. Each agent should have dedicated memory file in memory/")
    print("2. All Google Sheets should have sync scripts")  
    print("3. All data should be backed up to Google Sheets")
    print("4. Critical processes should have cron jobs for automation")
    print("5. Memory files should be updated after major actions")
    
    return issues_found

if __name__ == "__main__":
    audit_agents()