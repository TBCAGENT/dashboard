#!/usr/bin/env python3
"""
Health & Longevity Tracker for Luke
Tracks daily metrics, goals, and provides recommendations
"""

import json
import os
from datetime import datetime, date
from typing import Dict, List, Optional

class HealthTracker:
    def __init__(self, data_file="health/health_data.json"):
        self.data_file = data_file
        self.data = self._load_data()
        
    def _load_data(self) -> Dict:
        """Load health data from JSON file"""
        if not os.path.exists(self.data_file):
            return self._create_default_data()
        
        try:
            with open(self.data_file, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return self._create_default_data()
    
    def _create_default_data(self) -> Dict:
        """Create default health data structure"""
        return {
            "profile": {
                "name": "Luke Fontaine",
                "age": 31,
                "goals": {
                    "steps": 10000,
                    "water_glasses": 8,
                    "sleep_hours": 8.0,
                    "meditation_minutes": 10,
                    "weight_target": 180  # lbs
                }
            },
            "daily_records": {},
            "weekly_averages": {},
            "health_score_history": [],
            "last_updated": datetime.now().isoformat()
        }
    
    def _save_data(self):
        """Save data to JSON file"""
        os.makedirs(os.path.dirname(self.data_file), exist_ok=True)
        self.data["last_updated"] = datetime.now().isoformat()
        
        with open(self.data_file, 'w') as f:
            json.dump(self.data, f, indent=2, default=str)
    
    def log_daily_metric(self, metric: str, value: float, date_str: str = None):
        """Log a daily health metric"""
        if date_str is None:
            date_str = date.today().isoformat()
        
        if date_str not in self.data["daily_records"]:
            self.data["daily_records"][date_str] = {}
        
        self.data["daily_records"][date_str][metric] = value
        self._save_data()
    
    def get_today_metrics(self) -> Dict:
        """Get today's health metrics"""
        today = date.today().isoformat()
        return self.data["daily_records"].get(today, {})
    
    def get_recent_average(self, metric: str, days: int = 7) -> float:
        """Get average for a metric over recent days"""
        recent_dates = sorted(self.data["daily_records"].keys())[-days:]
        values = []
        
        for date_str in recent_dates:
            if metric in self.data["daily_records"][date_str]:
                values.append(self.data["daily_records"][date_str][metric])
        
        return sum(values) / len(values) if values else 0.0
    
    def calculate_health_score(self) -> int:
        """Calculate overall health score (0-100)"""
        today_metrics = self.get_today_metrics()
        goals = self.data["profile"]["goals"]
        
        scores = []
        
        # Sleep score (0-25 points)
        sleep = today_metrics.get("sleep_hours", 0)
        sleep_score = min(25, (sleep / goals["sleep_hours"]) * 25)
        scores.append(sleep_score)
        
        # Activity score (0-25 points)  
        steps = today_metrics.get("steps", 0)
        activity_score = min(25, (steps / goals["steps"]) * 25)
        scores.append(activity_score)
        
        # Hydration score (0-20 points)
        water = today_metrics.get("water_glasses", 0)
        hydration_score = min(20, (water / goals["water_glasses"]) * 20)
        scores.append(hydration_score)
        
        # Meditation score (0-15 points)
        meditation = today_metrics.get("meditation_minutes", 0)
        meditation_score = min(15, (meditation / goals["meditation_minutes"]) * 15)
        scores.append(meditation_score)
        
        # Nutrition score (0-15 points) - placeholder
        nutrition_score = today_metrics.get("nutrition_score", 12)  # Default good
        scores.append(min(15, nutrition_score))
        
        total_score = int(sum(scores))
        
        # Store in history
        today = date.today().isoformat()
        if "health_score_history" not in self.data:
            self.data["health_score_history"] = []
        
        # Remove today's score if it exists, add new one
        self.data["health_score_history"] = [
            entry for entry in self.data["health_score_history"] 
            if entry["date"] != today
        ]
        self.data["health_score_history"].append({
            "date": today,
            "score": total_score,
            "timestamp": datetime.now().isoformat()
        })
        
        self._save_data()
        return total_score
    
    def get_recommendations(self) -> List[Dict]:
        """Get personalized health recommendations"""
        today_metrics = self.get_today_metrics()
        goals = self.data["profile"]["goals"]
        recommendations = []
        
        # Steps recommendation
        steps = today_metrics.get("steps", 0)
        if steps < goals["steps"]:
            remaining = goals["steps"] - steps
            recommendations.append({
                "priority": "high" if remaining > 5000 else "medium",
                "icon": "🏃",
                "title": f"Get {remaining:,} more steps",
                "description": f"You're {remaining:,} steps away from your daily goal. Consider a walk or standing desk session."
            })
        
        # Water recommendation
        water = today_metrics.get("water_glasses", 0)
        if water < goals["water_glasses"]:
            remaining = goals["water_glasses"] - water
            recommendations.append({
                "priority": "medium",
                "icon": "💧",
                "title": f"Drink {remaining} more glasses",
                "description": f"Stay hydrated! You need {remaining} more glasses to hit your goal."
            })
        
        # Sleep recommendation (for tonight)
        current_hour = datetime.now().hour
        if current_hour > 22:  # After 10 PM
            recommendations.append({
                "priority": "high",
                "icon": "😴",
                "title": "Consider winding down",
                "description": "It's getting late. Start your bedtime routine for quality sleep."
            })
        
        # Meditation recommendation
        meditation = today_metrics.get("meditation_minutes", 0)
        if meditation < goals["meditation_minutes"]:
            remaining = goals["meditation_minutes"] - meditation
            recommendations.append({
                "priority": "low",
                "icon": "🧘",
                "title": f"{remaining} minutes meditation",
                "description": f"Take {remaining} minutes for mindfulness before bed."
            })
        
        return sorted(recommendations, key=lambda x: {"high": 3, "medium": 2, "low": 1}[x["priority"]], reverse=True)
    
    def get_dashboard_data(self) -> Dict:
        """Get all data for dashboard display"""
        today_metrics = self.get_today_metrics()
        goals = self.data["profile"]["goals"]
        health_score = self.calculate_health_score()
        
        return {
            "health_score": health_score,
            "metrics": {
                "sleep": {
                    "value": today_metrics.get("sleep_hours", 0),
                    "goal": goals["sleep_hours"],
                    "display": f"{today_metrics.get('sleep_hours', 0):.1f}h avg",
                    "status": "good" if today_metrics.get("sleep_hours", 0) >= goals["sleep_hours"] * 0.9 else "warning"
                },
                "steps": {
                    "value": today_metrics.get("steps", 0),
                    "goal": goals["steps"],
                    "display": f"{today_metrics.get('steps', 0):,} steps",
                    "status": "good" if today_metrics.get("steps", 0) >= goals["steps"] * 0.8 else "warning"
                },
                "water": {
                    "value": today_metrics.get("water_glasses", 0),
                    "goal": goals["water_glasses"],
                    "display": f"{today_metrics.get('water_glasses', 0):.1f}L today",
                    "status": "good" if today_metrics.get("water_glasses", 0) >= goals["water_glasses"] * 0.8 else "warning"
                },
                "nutrition": {
                    "value": today_metrics.get("nutrition_score", 12),
                    "goal": 15,
                    "display": "Clean eating",
                    "status": "good"
                }
            },
            "goals_progress": {
                "steps": {
                    "current": today_metrics.get("steps", 0),
                    "target": goals["steps"],
                    "percentage": min(100, (today_metrics.get("steps", 0) / goals["steps"]) * 100)
                },
                "water": {
                    "current": today_metrics.get("water_glasses", 0),
                    "target": goals["water_glasses"],
                    "percentage": min(100, (today_metrics.get("water_glasses", 0) / goals["water_glasses"]) * 100)
                },
                "sleep": {
                    "current": self.get_recent_average("sleep_hours", 7),
                    "target": goals["sleep_hours"],
                    "percentage": min(100, (self.get_recent_average("sleep_hours", 7) / goals["sleep_hours"]) * 100)
                },
                "meditation": {
                    "current": today_metrics.get("meditation_minutes", 0),
                    "target": goals["meditation_minutes"],
                    "streak": self._get_meditation_streak()
                }
            },
            "recommendations": self.get_recommendations(),
            "last_updated": self.data.get("last_updated", datetime.now().isoformat())
        }
    
    def _get_meditation_streak(self) -> int:
        """Calculate current meditation streak"""
        streak = 0
        dates = sorted(self.data["daily_records"].keys(), reverse=True)
        goal_minutes = self.data["profile"]["goals"]["meditation_minutes"]
        
        for date_str in dates:
            meditation = self.data["daily_records"][date_str].get("meditation_minutes", 0)
            if meditation >= goal_minutes:
                streak += 1
            else:
                break
        
        return streak

def init_sample_data():
    """Initialize with sample data for demonstration"""
    tracker = HealthTracker()
    
    # Add some sample data for the past few days
    today = date.today()
    
    # Today's data
    tracker.log_daily_metric("sleep_hours", 7.5, today.isoformat())
    tracker.log_daily_metric("steps", 3247, today.isoformat())
    tracker.log_daily_metric("water_glasses", 6, today.isoformat())
    tracker.log_daily_metric("meditation_minutes", 10, today.isoformat())
    tracker.log_daily_metric("nutrition_score", 13, today.isoformat())
    
    return tracker

if __name__ == "__main__":
    # Initialize with sample data and print dashboard data
    tracker = init_sample_data()
    dashboard_data = tracker.get_dashboard_data()
    print(json.dumps(dashboard_data, indent=2, default=str))