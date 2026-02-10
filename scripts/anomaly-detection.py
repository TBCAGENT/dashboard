#!/usr/bin/env python3
"""
LL Ventures Anomaly Detection System
Monitors Airtable data for unusual patterns and triggers smart alerts
"""

import requests
import json
import os
from datetime import datetime, timedelta
import subprocess

# Configuration
AIRTABLE_API_KEY = os.getenv('AIRTABLE_API_KEY', 'pat7OpXE5AOmY2Vsx.a9022cbf9afe775f5f3a27f7900c77049a3d56fa715e34d0821cb7a756c036d7')
BASE_ID = 'appEmn0HdyfUfZ429'
TABLE_NAME = 'Offers'
STATE_FILE = '/Users/lukefontaine/.openclaw/workspace/data/anomaly-state.json'

class AnomalyDetector:
    def __init__(self):
        self.headers = {'Authorization': f'Bearer {AIRTABLE_API_KEY}'}
        self.base_url = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE_NAME}'
        
    def fetch_all_records(self):
        """Fetch all records from Airtable"""
        records = []
        offset = None
        
        while True:
            params = {'pageSize': 100}
            if offset:
                params['offset'] = offset
                
            response = requests.get(self.base_url, headers=self.headers, params=params)
            if response.status_code != 200:
                print(f"Error fetching data: {response.status_code}")
                return []
                
            data = response.json()
            records.extend(data.get('records', []))
            
            offset = data.get('offset')
            if not offset:
                break
                
        return records
    
    def load_previous_state(self):
        """Load previous state for comparison"""
        try:
            if os.path.exists(STATE_FILE):
                with open(STATE_FILE, 'r') as f:
                    return json.load(f)
        except Exception as e:
            print(f"Error loading state: {e}")
        
        return {
            'last_check': None,
            'deal_counts': {},
            'revenue_totals': {},
            'stale_deals': [],
            'last_new_deal': None
        }
    
    def save_current_state(self, state):
        """Save current state for next comparison"""
        os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
        try:
            with open(STATE_FILE, 'w') as f:
                json.dump(state, f, indent=2)
        except Exception as e:
            print(f"Error saving state: {e}")
    
    def analyze_records(self, records):
        """Analyze records for anomalies"""
        now = datetime.now().isoformat()
        
        # Current metrics
        in_contract = [r for r in records if r['fields'].get('Select') == 'In Contract']
        pending_contract = [r for r in records if r['fields'].get('Select') == 'Pending Contract']
        active_deals = in_contract + pending_contract
        
        total_revenue = sum(r['fields'].get('Gross Revenue', 0) for r in active_deals)
        deal_count = len(active_deals)
        
        # Find stale deals (>14 days without updates)
        fourteen_days_ago = datetime.now() - timedelta(days=14)
        stale_deals = []
        
        for deal in in_contract:
            offer_date = deal['fields'].get('Offer Made')
            in_contract_date = deal['fields'].get('In Contract')
            
            # Check if deal has been stale
            latest_date = in_contract_date or offer_date
            if latest_date:
                try:
                    deal_date = datetime.strptime(latest_date, '%Y-%m-%d')
                    if deal_date < fourteen_days_ago:
                        stale_deals.append({
                            'address': deal['fields'].get('Address', 'Unknown'),
                            'revenue': deal['fields'].get('Gross Revenue', 0),
                            'days_old': (datetime.now() - deal_date).days
                        })
                except Exception:
                    pass
        
        # Recent new deals (last 24 hours)
        yesterday = datetime.now() - timedelta(days=1)
        recent_deals = []
        
        for deal in active_deals:
            created = deal.get('createdTime')
            if created:
                try:
                    created_date = datetime.fromisoformat(created.replace('Z', '+00:00'))
                    if created_date.replace(tzinfo=None) > yesterday:
                        recent_deals.append({
                            'address': deal['fields'].get('Address', 'Unknown'),
                            'revenue': deal['fields'].get('Gross Revenue', 0),
                            'status': deal['fields'].get('Select')
                        })
                except Exception:
                    pass
        
        return {
            'timestamp': now,
            'deal_count': deal_count,
            'total_revenue': total_revenue,
            'stale_deals': stale_deals,
            'recent_deals': recent_deals,
            'in_contract_count': len(in_contract),
            'pending_count': len(pending_contract)
        }
    
    def detect_anomalies(self, current, previous):
        """Detect anomalies by comparing current vs previous state"""
        anomalies = []
        
        if not previous.get('last_check'):
            return anomalies  # First run, no anomalies
        
        # 1. Significant revenue change (>$20K swing)
        prev_revenue = previous.get('revenue_totals', {}).get('total', 0)
        revenue_change = current['total_revenue'] - prev_revenue
        
        if abs(revenue_change) > 20000:
            anomalies.append({
                'type': 'revenue_change',
                'severity': 'high' if abs(revenue_change) > 50000 else 'medium',
                'message': f"Revenue {'increased' if revenue_change > 0 else 'decreased'} by ${abs(revenue_change):,.0f}",
                'details': f"From ${prev_revenue:,.0f} to ${current['total_revenue']:,.0f}"
            })
        
        # 2. Deal count significant change
        prev_count = previous.get('deal_counts', {}).get('total', 0)
        count_change = current['deal_count'] - prev_count
        
        if abs(count_change) > 3:
            anomalies.append({
                'type': 'deal_count_change',
                'severity': 'medium',
                'message': f"Deal count {'increased' if count_change > 0 else 'decreased'} by {abs(count_change)} deals",
                'details': f"From {prev_count} to {current['deal_count']} active deals"
            })
        
        # 3. New stale deals
        prev_stale = {d['address'] for d in previous.get('stale_deals', [])}
        current_stale = {d['address'] for d in current['stale_deals']}
        newly_stale = current_stale - prev_stale
        
        if newly_stale:
            anomalies.append({
                'type': 'stale_deals',
                'severity': 'medium',
                'message': f"{len(newly_stale)} deal(s) have become stale",
                'details': f"Deals >14 days old: {', '.join(list(newly_stale)[:3])}"
            })
        
        # 4. No new deals in 48 hours
        if not current['recent_deals']:
            time_since_last = datetime.now() - datetime.fromisoformat(previous.get('last_check', datetime.now().isoformat()))
            if time_since_last > timedelta(hours=48):
                anomalies.append({
                    'type': 'no_new_deals',
                    'severity': 'low',
                    'message': "No new deals in 48+ hours",
                    'details': f"Last activity check: {previous.get('last_check', 'Unknown')}"
                })
        
        return anomalies
    
    def send_alert(self, anomalies, current):
        """Send WhatsApp alert for detected anomalies"""
        if not anomalies:
            return
        
        high_severity = [a for a in anomalies if a['severity'] == 'high']
        
        if high_severity:
            # High severity - immediate alert
            message = f"🚨 CRITICAL LL Ventures Alert\n\n"
            for anomaly in high_severity:
                message += f"• {anomaly['message']}\n  {anomaly['details']}\n\n"
            
            message += f"Current Status:\n"
            message += f"• {current['deal_count']} active deals\n"
            message += f"• ${current['total_revenue']:,.0f} total revenue\n"
            message += f"• {len(current['stale_deals'])} stale deals"
            
            subprocess.run([
                'bash', '/Users/lukefontaine/.openclaw/workspace/scripts/speak.sh',
                message, '--send', '+13397931673'
            ])
        
        elif len(anomalies) >= 2:
            # Multiple medium/low alerts - consolidate
            message = f"⚠️ LL Ventures Alerts ({len(anomalies)})\n\n"
            for anomaly in anomalies[:3]:  # Top 3
                message += f"• {anomaly['message']}\n"
            
            if len(anomalies) > 3:
                message += f"• +{len(anomalies)-3} more alerts\n"
            
            message += f"\nCurrent: {current['deal_count']} deals, ${current['total_revenue']:,.0f}"
            
            subprocess.run([
                'bash', '/Users/lukefontaine/.openclaw/workspace/scripts/speak.sh',
                message, '--send', '+13397931673'
            ])
    
    def run(self):
        """Main anomaly detection run"""
        print(f"[{datetime.now()}] Running anomaly detection...")
        
        # Fetch current data
        records = self.fetch_all_records()
        if not records:
            print("No records fetched, exiting")
            return
        
        # Analyze current state
        current = self.analyze_records(records)
        
        # Load previous state
        previous = self.load_previous_state()
        
        # Detect anomalies
        anomalies = self.detect_anomalies(current, previous)
        
        # Send alerts if needed
        self.send_alert(anomalies, current)
        
        # Save current state for next run
        new_state = {
            'last_check': current['timestamp'],
            'deal_counts': {
                'total': current['deal_count'],
                'in_contract': current['in_contract_count'],
                'pending': current['pending_count']
            },
            'revenue_totals': {
                'total': current['total_revenue']
            },
            'stale_deals': current['stale_deals'],
            'recent_deals': current['recent_deals']
        }
        
        self.save_current_state(new_state)
        
        print(f"Anomaly detection complete. Found {len(anomalies)} anomalies.")
        for anomaly in anomalies:
            print(f"  {anomaly['severity'].upper()}: {anomaly['message']}")

if __name__ == "__main__":
    detector = AnomalyDetector()
    detector.run()