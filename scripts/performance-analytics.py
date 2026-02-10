#!/usr/bin/env python3
"""
LL Ventures Performance Analytics
Analyzes which properties, agents, and strategies work best
"""

import requests
import json
import os
from datetime import datetime, timedelta
from collections import defaultdict, Counter
import subprocess

# Configuration
AIRTABLE_API_KEY = os.getenv('AIRTABLE_API_KEY', 'pat7OpXE5AOmY2Vsx.a9022cbf9afe775f5f3a27f7900c77049a3d56fa715e34d0821cb7a756c036d7')
BASE_ID = 'appEmn0HdyfUfZ429'
TABLE_NAME = 'Offers'
ANALYTICS_FILE = '/Users/lukefontaine/.openclaw/workspace/data/performance-analytics.json'

class PerformanceAnalyzer:
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
    
    def analyze_deal_outcomes(self, records):
        """Analyze success rates by various factors"""
        
        # Success rates by status
        status_counts = Counter()
        status_revenue = defaultdict(int)
        
        for record in records:
            status = record['fields'].get('Select', 'Unknown')
            revenue = record['fields'].get('Gross Revenue', 0)
            
            status_counts[status] += 1
            status_revenue[status] += revenue
        
        # Calculate success rate
        successful_statuses = ['In Contract', 'Pending Contract']
        total_deals = len(records)
        successful_deals = sum(status_counts[status] for status in successful_statuses)
        success_rate = (successful_deals / total_deals) * 100 if total_deals > 0 else 0
        
        return {
            'total_deals': total_deals,
            'successful_deals': successful_deals,
            'success_rate': success_rate,
            'status_breakdown': dict(status_counts),
            'revenue_by_status': dict(status_revenue)
        }
    
    def analyze_revenue_patterns(self, records):
        """Analyze revenue patterns and performance"""
        
        # Filter successful deals
        successful = [r for r in records if r['fields'].get('Select') in ['In Contract', 'Pending Contract']]
        
        if not successful:
            return {'error': 'No successful deals to analyze'}
        
        revenues = [r['fields'].get('Gross Revenue', 0) for r in successful]
        revenues = [r for r in revenues if r > 0]  # Remove zero revenues
        
        if not revenues:
            return {'error': 'No revenue data available'}
        
        total_revenue = sum(revenues)
        avg_revenue = total_revenue / len(revenues)
        max_revenue = max(revenues)
        min_revenue = min(revenues)
        
        # Revenue buckets
        buckets = {
            'low': [r for r in revenues if r < 7500],
            'medium': [r for r in revenues if 7500 <= r < 12500], 
            'high': [r for r in revenues if r >= 12500]
        }
        
        return {
            'total_revenue': total_revenue,
            'average_revenue': avg_revenue,
            'max_revenue': max_revenue,
            'min_revenue': min_revenue,
            'deal_count': len(successful),
            'revenue_distribution': {
                'low_count': len(buckets['low']),
                'medium_count': len(buckets['medium']),
                'high_count': len(buckets['high'])
            }
        }
    
    def analyze_timing_patterns(self, records):
        """Analyze timing from offer to contract"""
        
        timing_data = []
        
        for record in records:
            if record['fields'].get('Select') not in ['In Contract', 'Pending Contract']:
                continue
                
            offer_date = record['fields'].get('Offer Made')
            contract_date = record['fields'].get('In Contract')
            
            if offer_date and contract_date:
                try:
                    offer_dt = datetime.strptime(offer_date, '%Y-%m-%d')
                    contract_dt = datetime.strptime(contract_date, '%Y-%m-%d')
                    
                    days_to_contract = (contract_dt - offer_dt).days
                    if days_to_contract >= 0:  # Valid timing
                        timing_data.append({
                            'address': record['fields'].get('Address', 'Unknown'),
                            'days_to_contract': days_to_contract,
                            'revenue': record['fields'].get('Gross Revenue', 0)
                        })
                except Exception:
                    continue
        
        if not timing_data:
            return {'error': 'No timing data available'}
        
        days_list = [t['days_to_contract'] for t in timing_data]
        avg_days = sum(days_list) / len(days_list)
        
        # Fast vs slow deals
        fast_deals = [t for t in timing_data if t['days_to_contract'] <= 7]
        slow_deals = [t for t in timing_data if t['days_to_contract'] > 14]
        
        return {
            'average_days_to_contract': avg_days,
            'fastest_deal': min(days_list) if days_list else 0,
            'slowest_deal': max(days_list) if days_list else 0,
            'fast_deals': len(fast_deals),
            'slow_deals': len(slow_deals),
            'total_analyzed': len(timing_data)
        }
    
    def analyze_poc_performance(self, records):
        """Analyze performance by Point of Contact (POC)"""
        
        poc_stats = defaultdict(lambda: {
            'total_deals': 0,
            'successful_deals': 0,
            'total_revenue': 0,
            'avg_revenue': 0,
            'success_rate': 0
        })
        
        for record in records:
            poc = record['fields'].get('POC', 'Unknown')
            status = record['fields'].get('Select', '')
            revenue = record['fields'].get('Gross Revenue', 0)
            
            poc_stats[poc]['total_deals'] += 1
            poc_stats[poc]['total_revenue'] += revenue
            
            if status in ['In Contract', 'Pending Contract']:
                poc_stats[poc]['successful_deals'] += 1
        
        # Calculate rates
        for poc, stats in poc_stats.items():
            if stats['total_deals'] > 0:
                stats['success_rate'] = (stats['successful_deals'] / stats['total_deals']) * 100
            if stats['successful_deals'] > 0:
                stats['avg_revenue'] = stats['total_revenue'] / stats['successful_deals']
        
        # Sort by success rate
        sorted_pocs = sorted(poc_stats.items(), key=lambda x: x[1]['success_rate'], reverse=True)
        
        return dict(sorted_pocs)
    
    def analyze_property_areas(self, records):
        """Analyze performance by property location/area"""
        
        area_stats = defaultdict(lambda: {
            'count': 0,
            'successful': 0,
            'total_revenue': 0,
            'success_rate': 0
        })
        
        for record in records:
            address = record['fields'].get('Address', '')
            status = record['fields'].get('Select', '')
            revenue = record['fields'].get('Gross Revenue', 0)
            
            # Extract area from address (street name as proxy)
            area = 'Unknown'
            if address:
                parts = address.split()
                if len(parts) >= 2:
                    # Use street name as area identifier
                    area = parts[1] if len(parts) > 1 else parts[0]
            
            area_stats[area]['count'] += 1
            
            if status in ['In Contract', 'Pending Contract']:
                area_stats[area]['successful'] += 1
                area_stats[area]['total_revenue'] += revenue
        
        # Calculate success rates
        for area, stats in area_stats.items():
            if stats['count'] > 0:
                stats['success_rate'] = (stats['successful'] / stats['count']) * 100
        
        # Filter areas with at least 2 deals and sort by success rate
        significant_areas = {k: v for k, v in area_stats.items() if v['count'] >= 2}
        sorted_areas = sorted(significant_areas.items(), key=lambda x: x[1]['success_rate'], reverse=True)
        
        return dict(sorted_areas[:10])  # Top 10 areas
    
    def generate_insights(self, analytics):
        """Generate actionable insights from analytics"""
        insights = []
        
        # Deal success insights
        if 'deal_outcomes' in analytics:
            outcomes = analytics['deal_outcomes']
            if outcomes['success_rate'] < 30:
                insights.append({
                    'type': 'warning',
                    'title': 'Low Success Rate',
                    'message': f"Success rate is only {outcomes['success_rate']:.1f}%. Focus on higher-quality leads."
                })
            elif outcomes['success_rate'] > 50:
                insights.append({
                    'type': 'success',
                    'title': 'High Success Rate',
                    'message': f"Excellent {outcomes['success_rate']:.1f}% success rate. Current strategy is working well."
                })
        
        # Revenue insights
        if 'revenue_patterns' in analytics:
            revenue = analytics['revenue_patterns']
            if 'average_revenue' in revenue:
                if revenue['average_revenue'] < 8000:
                    insights.append({
                        'type': 'opportunity',
                        'title': 'Revenue Optimization',
                        'message': f"Average deal revenue is ${revenue['average_revenue']:,.0f}. Consider targeting higher-value properties."
                    })
        
        # POC performance insights
        if 'poc_performance' in analytics:
            pocs = analytics['poc_performance']
            if pocs:
                top_poc = next(iter(pocs.items()))
                if top_poc[1]['success_rate'] > 60:
                    insights.append({
                        'type': 'success',
                        'title': 'Top Performer',
                        'message': f"{top_poc[0]} has {top_poc[1]['success_rate']:.1f}% success rate. Prioritize deals from this contact."
                    })
        
        # Timing insights
        if 'timing_patterns' in analytics:
            timing = analytics['timing_patterns']
            if 'average_days_to_contract' in timing:
                if timing['average_days_to_contract'] > 14:
                    insights.append({
                        'type': 'warning',
                        'title': 'Slow Contract Process',
                        'message': f"Average {timing['average_days_to_contract']:.1f} days to contract. Look for process improvements."
                    })
        
        return insights
    
    def save_analytics(self, analytics):
        """Save analytics to file"""
        analytics['generated_at'] = datetime.now().isoformat()
        
        os.makedirs(os.path.dirname(ANALYTICS_FILE), exist_ok=True)
        try:
            with open(ANALYTICS_FILE, 'w') as f:
                json.dump(analytics, f, indent=2)
        except Exception as e:
            print(f"Error saving analytics: {e}")
    
    def send_daily_report(self, analytics, insights):
        """Send daily performance report via WhatsApp"""
        
        report = "📊 LL Ventures Daily Analytics\n\n"
        
        # Key metrics
        if 'deal_outcomes' in analytics:
            outcomes = analytics['deal_outcomes']
            report += f"Deal Success: {outcomes['success_rate']:.1f}%\n"
            report += f"Active Deals: {outcomes['successful_deals']}\n\n"
        
        if 'revenue_patterns' in analytics:
            revenue = analytics['revenue_patterns']
            if 'total_revenue' in revenue:
                report += f"Revenue Pipeline: ${revenue['total_revenue']:,.0f}\n"
                report += f"Avg Deal Value: ${revenue.get('average_revenue', 0):,.0f}\n\n"
        
        # Top insights
        if insights:
            report += "🎯 Key Insights:\n"
            for insight in insights[:2]:  # Top 2 insights
                report += f"• {insight['message']}\n"
        
        # Send via voice note
        subprocess.run([
            'bash', '/Users/lukefontaine/.openclaw/workspace/scripts/speak.sh',
            report, '--send', '+13397931673'
        ])
    
    def run(self, send_report=False):
        """Main analytics run"""
        print(f"[{datetime.now()}] Running performance analytics...")
        
        # Fetch data
        records = self.fetch_all_records()
        if not records:
            print("No records fetched, exiting")
            return
        
        # Run all analyses
        analytics = {
            'deal_outcomes': self.analyze_deal_outcomes(records),
            'revenue_patterns': self.analyze_revenue_patterns(records),
            'timing_patterns': self.analyze_timing_patterns(records),
            'poc_performance': self.analyze_poc_performance(records),
            'property_areas': self.analyze_property_areas(records)
        }
        
        # Generate insights
        insights = self.generate_insights(analytics)
        analytics['insights'] = insights
        
        # Save analytics
        self.save_analytics(analytics)
        
        # Send report if requested
        if send_report:
            self.send_daily_report(analytics, insights)
        
        print(f"Analytics complete. Generated {len(insights)} insights.")
        return analytics

if __name__ == "__main__":
    import sys
    send_report = '--report' in sys.argv
    
    analyzer = PerformanceAnalyzer()
    analyzer.run(send_report=send_report)