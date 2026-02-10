#!/usr/bin/env python3
"""
Dashboard Analytics Integration
Updates the dashboard with real-time performance insights
"""

import json
import os
from datetime import datetime

ANALYTICS_FILE = '/Users/lukefontaine/.openclaw/workspace/data/performance-analytics.json'
DASHBOARD_DATA_FILE = '/Users/lukefontaine/.openclaw/workspace/data/dashboard-data.json'

def load_analytics():
    """Load latest performance analytics"""
    try:
        if os.path.exists(ANALYTICS_FILE):
            with open(ANALYTICS_FILE, 'r') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading analytics: {e}")
    return {}

def generate_dashboard_data():
    """Generate dashboard data with analytics integration"""
    analytics = load_analytics()
    
    # Base dashboard data
    dashboard_data = {
        'last_updated': datetime.now().isoformat(),
        'mission_control': {},
        'performance_metrics': {},
        'insights': [],
        'alerts': []
    }
    
    # Mission control metrics
    if 'deal_outcomes' in analytics:
        outcomes = analytics['deal_outcomes']
        dashboard_data['mission_control']['success_rate'] = outcomes.get('success_rate', 0)
        dashboard_data['mission_control']['active_deals'] = outcomes.get('successful_deals', 0)
    
    if 'revenue_patterns' in analytics:
        revenue = analytics['revenue_patterns']
        dashboard_data['mission_control']['total_revenue'] = revenue.get('total_revenue', 0)
        dashboard_data['mission_control']['avg_deal_value'] = revenue.get('average_revenue', 0)
    
    # Performance metrics for detailed view
    if 'poc_performance' in analytics:
        poc_data = analytics['poc_performance']
        # Get top 3 performers
        top_performers = list(poc_data.items())[:3]
        dashboard_data['performance_metrics']['top_pocs'] = [
            {
                'name': poc,
                'success_rate': data['success_rate'],
                'total_deals': data['total_deals'],
                'revenue': data['total_revenue']
            }
            for poc, data in top_performers
        ]
    
    if 'timing_patterns' in analytics:
        timing = analytics['timing_patterns']
        dashboard_data['performance_metrics']['avg_days_to_contract'] = timing.get('average_days_to_contract', 0)
        dashboard_data['performance_metrics']['fast_deals_count'] = timing.get('fast_deals', 0)
    
    # Insights
    if 'insights' in analytics:
        dashboard_data['insights'] = analytics['insights']
    
    return dashboard_data

def save_dashboard_data(data):
    """Save dashboard data to file"""
    os.makedirs(os.path.dirname(DASHBOARD_DATA_FILE), exist_ok=True)
    try:
        with open(DASHBOARD_DATA_FILE, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Dashboard data saved to {DASHBOARD_DATA_FILE}")
    except Exception as e:
        print(f"Error saving dashboard data: {e}")

if __name__ == "__main__":
    dashboard_data = generate_dashboard_data()
    save_dashboard_data(dashboard_data)