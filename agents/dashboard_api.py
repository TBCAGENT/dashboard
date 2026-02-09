#!/usr/bin/env python3
"""
Mission Control Dashboard API
Serves real-time agent data to the dashboard
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
import sys
from urllib.parse import urlparse, parse_qs
import threading
import time

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from coordination_system import AgentCoordinator, TaskPriority

class DashboardAPIHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, coordinator=None, **kwargs):
        self.coordinator = coordinator
        super().__init__(*args, **kwargs)
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Enable CORS
        self.send_cors_headers()
        
        if path == "/api/dashboard":
            self._handle_dashboard_data()
        elif path == "/api/agents":
            self._handle_agents_list()
        elif path.startswith("/api/agent/"):
            agent_id = path.split("/")[-1]
            self._handle_agent_detail(agent_id)
        elif path == "/api/tasks":
            self._handle_tasks_list()
        elif path == "/api/activity":
            self._handle_activity_stream()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"error": "Not found"}')
    
    def do_POST(self):
        """Handle POST requests"""
        self.send_cors_headers()
        
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
        except json.JSONDecodeError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'{"error": "Invalid JSON"}')
            return
        
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == "/api/tasks":
            self._handle_create_task(data)
        elif path == "/api/delegate":
            self._handle_delegate_task(data)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"error": "Not found"}')
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_cors_headers()
        self.send_response(200)
        self.end_headers()
    
    def send_cors_headers(self):
        """Send CORS headers"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def _handle_dashboard_data(self):
        """Return complete dashboard data"""
        try:
            dashboard_data = self.coordinator.get_dashboard_data()
            
            # Add some real-time simulated data
            dashboard_data["system_status"] = {
                "uptime": "99.7%",
                "api_health": "Good",
                "last_update": time.strftime("%I:%M %p"),
                "alerts": self._get_current_alerts()
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = json.dumps(dashboard_data, default=str, indent=2)
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"error": "{str(e)}"}}'.encode('utf-8'))
    
    def _handle_agents_list(self):
        """Return agent list with status"""
        try:
            agents_data = []
            for agent_id, agent in self.coordinator.agent_config["agents"].items():
                status_info = self.coordinator.get_agent_status(agent_id)
                agents_data.append(status_info)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = json.dumps(agents_data, default=str, indent=2)
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"error": "{str(e)}"}}'.encode('utf-8'))
    
    def _handle_agent_detail(self, agent_id):
        """Return detailed agent information"""
        try:
            agent_detail = self.coordinator.get_agent_status(agent_id)
            
            if "error" in agent_detail:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(agent_detail).encode('utf-8'))
                return
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = json.dumps(agent_detail, default=str, indent=2)
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"error": "{str(e)}"}}'.encode('utf-8'))
    
    def _handle_tasks_list(self):
        """Return current task queue"""
        try:
            tasks = []
            for task in self.coordinator.task_queue:
                if task.status != "completed":
                    tasks.append({
                        "id": task.id,
                        "title": task.title,
                        "description": task.description,
                        "priority": task.priority.value,
                        "assigned_agent": task.assigned_agent,
                        "status": task.status,
                        "created_at": task.created_at.isoformat(),
                        "due_at": task.due_at.isoformat() if task.due_at else None
                    })
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = json.dumps({"tasks": tasks}, default=str, indent=2)
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"error": "{str(e)}"}}'.encode('utf-8'))
    
    def _handle_activity_stream(self):
        """Return recent activity"""
        try:
            activity = []
            for message in self.coordinator.message_history[-20:]:
                activity.append({
                    "timestamp": message.timestamp.isoformat(),
                    "from_agent": message.from_agent,
                    "to_agent": message.to_agent,
                    "message_type": message.message_type,
                    "content": message.content,
                    "time_display": message.timestamp.strftime("%I:%M %p")
                })
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = json.dumps({"activity": activity}, default=str, indent=2)
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"error": "{str(e)}"}}'.encode('utf-8'))
    
    def _handle_create_task(self, data):
        """Create a new task"""
        try:
            required_fields = ["title", "description", "priority", "assigned_agent"]
            if not all(field in data for field in required_fields):
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"error": "Missing required fields"}')
                return
            
            priority = TaskPriority(data["priority"])
            task_id = self.coordinator.create_task(
                title=data["title"],
                description=data["description"],
                priority=priority,
                assigned_agent=data["assigned_agent"],
                metadata=data.get("metadata", {})
            )
            
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = json.dumps({"task_id": task_id, "status": "created"})
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"error": "{str(e)}"}}'.encode('utf-8'))
    
    def _handle_delegate_task(self, data):
        """Delegate a task intelligently"""
        try:
            if "description" not in data:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"error": "Description required"}')
                return
            
            task_id = self.coordinator.delegate_task_to_specialist(
                task_description=data["description"],
                task_type=data.get("task_type", "general")
            )
            
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            response = json.dumps({"task_id": task_id, "status": "delegated"})
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"error": "{str(e)}"}}'.encode('utf-8'))
    
    def _get_current_alerts(self):
        """Get current system alerts"""
        alerts = []
        
        # Check for known issues
        apify_issue = {
            "severity": "high",
            "message": "Apify monthly usage limit exceeded - Property monitoring disrupted",
            "time": "3 hours ago",
            "category": "api_limit"
        }
        alerts.append(apify_issue)
        
        return alerts
    
    def log_message(self, format, *args):
        """Suppress default logging"""
        pass

def make_handler(coordinator):
    """Create handler with coordinator instance"""
    def handler(*args, **kwargs):
        return DashboardAPIHandler(*args, coordinator=coordinator, **kwargs)
    return handler

def start_api_server(port=8888):
    """Start the dashboard API server"""
    print(f"🚀 Starting Mission Control API server on port {port}...")
    
    # Initialize coordinator
    coordinator = AgentCoordinator()
    
    # Create some sample tasks and messages for demo
    coordinator.create_task(
        "Monitor Detroit property market",
        "Check Zillow for new Section 8 listings and hot deals",
        TaskPriority.HIGH,
        "real_estate"
    )
    
    coordinator.create_task(
        "Weekly financial analysis",
        "Generate comprehensive financial report for Luke",
        TaskPriority.MEDIUM,
        "cfo"
    )
    
    coordinator.create_task(
        "Andy Antiles lawsuit update",
        "Review latest legal documents and evidence",
        TaskPriority.MEDIUM,
        "legal"
    )
    
    coordinator.send_message(
        "operations",
        "real_estate",
        "system_alert",
        "Apify API limit exceeded - need backup monitoring solution"
    )
    
    coordinator.send_message(
        "real_estate",
        "cfo", 
        "data_request",
        "Need ROI analysis for 3 potential Detroit properties"
    )
    
    # Start server
    handler = make_handler(coordinator)
    httpd = HTTPServer(('localhost', port), handler)
    
    print(f"📊 Dashboard API ready at http://localhost:{port}/api/dashboard")
    print(f"🔧 Agent endpoints available at /api/agents, /api/tasks, /api/activity")
    print("💡 Use Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down API server...")
        httpd.shutdown()

if __name__ == "__main__":
    start_api_server()