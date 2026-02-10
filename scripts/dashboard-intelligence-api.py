#!/usr/bin/env python3
"""
Dashboard Intelligence API
Serves real-time analytics data to the web dashboard
"""

import json
import os
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse

class IntelligenceHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests for dashboard data"""
        
        # Enable CORS
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        path = urllib.parse.urlparse(self.path).path
        
        if path == '/api/performance':
            self.serve_performance_analytics()
        elif path == '/api/anomalies':
            self.serve_anomaly_data()
        elif path == '/api/dashboard':
            self.serve_dashboard_data()
        elif path == '/api/health':
            self.serve_health_status()
        else:
            self.serve_error(404, "Endpoint not found")
    
    def serve_performance_analytics(self):
        """Serve performance analytics data"""
        try:
            analytics_file = '/Users/lukefontaine/.openclaw/workspace/data/performance-analytics.json'
            if os.path.exists(analytics_file):
                with open(analytics_file, 'r') as f:
                    data = json.load(f)
                self.wfile.write(json.dumps(data).encode())
            else:
                self.serve_error(404, "Analytics data not found")
        except Exception as e:
            self.serve_error(500, f"Error loading analytics: {str(e)}")
    
    def serve_anomaly_data(self):
        """Serve anomaly detection data"""
        try:
            anomaly_file = '/Users/lukefontaine/.openclaw/workspace/data/anomaly-state.json'
            if os.path.exists(anomaly_file):
                with open(anomaly_file, 'r') as f:
                    data = json.load(f)
                self.wfile.write(json.dumps(data).encode())
            else:
                # Return empty state if no anomalies yet
                empty_state = {
                    "last_check": None,
                    "status": "No anomalies detected",
                    "deal_counts": {},
                    "revenue_totals": {}
                }
                self.wfile.write(json.dumps(empty_state).encode())
        except Exception as e:
            self.serve_error(500, f"Error loading anomaly data: {str(e)}")
    
    def serve_dashboard_data(self):
        """Serve integrated dashboard data"""
        try:
            dashboard_file = '/Users/lukefontaine/.openclaw/workspace/data/dashboard-data.json'
            if os.path.exists(dashboard_file):
                with open(dashboard_file, 'r') as f:
                    data = json.load(f)
                self.wfile.write(json.dumps(data).encode())
            else:
                self.serve_error(404, "Dashboard data not found")
        except Exception as e:
            self.serve_error(500, f"Error loading dashboard data: {str(e)}")
    
    def serve_health_status(self):
        """Serve system health status"""
        health_data = {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "services": {
                "analytics": os.path.exists('/Users/lukefontaine/.openclaw/workspace/data/performance-analytics.json'),
                "anomaly_detection": True,
                "dashboard_integration": os.path.exists('/Users/lukefontaine/.openclaw/workspace/data/dashboard-data.json')
            }
        }
        self.wfile.write(json.dumps(health_data).encode())
    
    def serve_error(self, code, message):
        """Serve error response"""
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        error_data = {"error": message, "timestamp": datetime.now().isoformat()}
        self.wfile.write(json.dumps(error_data).encode())
    
    def log_message(self, format, *args):
        """Override to reduce logging noise"""
        pass

def start_intelligence_server(port=8080):
    """Start the intelligence API server"""
    server = HTTPServer(('localhost', port), IntelligenceHandler)
    print(f"Intelligence API server starting on port {port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Server stopped")
        server.server_close()

if __name__ == "__main__":
    start_intelligence_server()