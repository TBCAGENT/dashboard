#!/usr/bin/env python3
"""
Health Logging Script for Luke
Quick way to log daily health metrics
"""

import sys
import argparse
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from health.health_tracker import HealthTracker

def main():
    parser = argparse.ArgumentParser(description="Log health metrics for Luke")
    parser.add_argument("--sleep", type=float, help="Hours of sleep")
    parser.add_argument("--steps", type=int, help="Number of steps")
    parser.add_argument("--water", type=float, help="Glasses of water")
    parser.add_argument("--meditation", type=int, help="Minutes of meditation")
    parser.add_argument("--weight", type=float, help="Weight in pounds")
    parser.add_argument("--nutrition", type=int, help="Nutrition score (1-15)", choices=range(1, 16))
    parser.add_argument("--date", help="Date (YYYY-MM-DD, defaults to today)")
    parser.add_argument("--show", action="store_true", help="Show current dashboard data")
    
    args = parser.parse_args()
    
    tracker = HealthTracker()
    
    if args.show:
        dashboard_data = tracker.get_dashboard_data()
        print(f"🏆 Health Score: {dashboard_data['health_score']}/100")
        print("\n📊 Today's Metrics:")
        for metric, data in dashboard_data['metrics'].items():
            status_icon = "✅" if data['status'] == 'good' else "⚠️"
            print(f"  {status_icon} {metric.title()}: {data['display']}")
        
        print(f"\n🎯 Goal Progress:")
        for goal, progress in dashboard_data['goals_progress'].items():
            if 'percentage' in progress:
                print(f"  • {goal.title()}: {progress['current']}/{progress['target']} ({progress['percentage']:.1f}%)")
            else:
                print(f"  • {goal.title()}: {progress['streak']} day streak")
        
        if dashboard_data['recommendations']:
            print(f"\n💡 Recommendations:")
            for rec in dashboard_data['recommendations']:
                print(f"  {rec['icon']} {rec['title']}")
                print(f"    {rec['description']}")
        
        return
    
    # Log metrics
    logged_anything = False
    
    if args.sleep is not None:
        tracker.log_daily_metric("sleep_hours", args.sleep, args.date)
        print(f"✅ Logged sleep: {args.sleep} hours")
        logged_anything = True
    
    if args.steps is not None:
        tracker.log_daily_metric("steps", args.steps, args.date)
        print(f"✅ Logged steps: {args.steps:,}")
        logged_anything = True
        
    if args.water is not None:
        tracker.log_daily_metric("water_glasses", args.water, args.date)
        print(f"✅ Logged water: {args.water} glasses")
        logged_anything = True
        
    if args.meditation is not None:
        tracker.log_daily_metric("meditation_minutes", args.meditation, args.date)
        print(f"✅ Logged meditation: {args.meditation} minutes")
        logged_anything = True
        
    if args.weight is not None:
        tracker.log_daily_metric("weight", args.weight, args.date)
        print(f"✅ Logged weight: {args.weight} lbs")
        logged_anything = True
        
    if args.nutrition is not None:
        tracker.log_daily_metric("nutrition_score", args.nutrition, args.date)
        print(f"✅ Logged nutrition score: {args.nutrition}/15")
        logged_anything = True
    
    if logged_anything:
        health_score = tracker.calculate_health_score()
        print(f"\n🏆 Updated Health Score: {health_score}/100")
        
        # Show top recommendation
        recommendations = tracker.get_recommendations()
        if recommendations:
            top_rec = recommendations[0]
            print(f"💡 Focus: {top_rec['icon']} {top_rec['title']}")
    else:
        print("❓ No metrics provided. Use --help to see options.")
        print("💡 Quick tip: Use --show to see current status")

if __name__ == "__main__":
    main()