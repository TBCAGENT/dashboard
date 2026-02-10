#!/bin/bash

# Launch Luke's Command Center Dashboard
# This script opens the dashboard in the default browser

DASHBOARD_PATH="/Users/lukefontaine/.openclaw/workspace/dashboard/command-center.html"

echo "🚀 Launching Luke's Command Center..."

# Check if file exists
if [[ ! -f "$DASHBOARD_PATH" ]]; then
    echo "❌ Dashboard file not found at $DASHBOARD_PATH"
    exit 1
fi

# Open in default browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "file://$DASHBOARD_PATH"
    echo "✅ Dashboard opened in your default browser"
    echo "📊 Access URL: file://$DASHBOARD_PATH"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "file://$DASHBOARD_PATH"
    echo "✅ Dashboard opened in your default browser"
else
    echo "🖥️  Open this URL in your browser:"
    echo "file://$DASHBOARD_PATH"
fi

# Optional: Start the API server for dynamic data
read -p "🤖 Start the agents API server? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting agents API server on port 8888..."
    cd /Users/lukefontaine/.openclaw/workspace
    python3 agents/dashboard_api.py &
    API_PID=$!
    echo "📡 API server running (PID: $API_PID)"
    echo "🛑 Press Ctrl+C to stop the API server"
    
    # Wait for Ctrl+C
    trap "echo '\n🛑 Stopping API server...'; kill $API_PID; exit 0" SIGINT
    wait $API_PID
fi