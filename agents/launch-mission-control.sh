#!/bin/bash

# Mission Control Launch Script
# Starts the agent coordination API and opens the dashboard

echo "🎯 Launching Mission Control Dashboard..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"

echo "📁 Workspace: $WORKSPACE_DIR"
echo "🔧 Starting API server..."

# Start the API server in background
cd "$SCRIPT_DIR"
python3 dashboard_api.py &
API_PID=$!

# Wait for server to start
sleep 3

# Check if server started successfully
if kill -0 $API_PID 2>/dev/null; then
    echo "✅ API server running (PID: $API_PID)"
    
    # Open dashboard in browser
    DASHBOARD_PATH="$WORKSPACE_DIR/dashboard/mission-control.html"
    
    if [[ -f "$DASHBOARD_PATH" ]]; then
        echo "🌐 Opening Mission Control Dashboard..."
        
        # Try to open in browser (macOS)
        if command -v open &> /dev/null; then
            open "file://$DASHBOARD_PATH"
        # Linux
        elif command -v xdg-open &> /dev/null; then
            xdg-open "file://$DASHBOARD_PATH"
        # Windows (WSL)
        elif command -v cmd.exe &> /dev/null; then
            cmd.exe /c start "file://$DASHBOARD_PATH"
        else
            echo "📋 Open this file in your browser:"
            echo "   file://$DASHBOARD_PATH"
        fi
    else
        echo "❌ Dashboard HTML file not found at $DASHBOARD_PATH"
    fi
    
    echo ""
    echo "🎮 Mission Control is ready!"
    echo "📊 API running at: http://localhost:8888"
    echo "🔧 Dashboard endpoints:"
    echo "   - /api/dashboard   (complete dashboard data)"
    echo "   - /api/agents      (agent status)"
    echo "   - /api/tasks       (task queue)"
    echo "   - /api/activity    (recent activity)"
    echo ""
    echo "🛑 Press Ctrl+C to stop the server"
    
    # Wait for user to stop
    trap "echo ''; echo '🛑 Shutting down Mission Control...'; kill $API_PID 2>/dev/null; exit 0" INT
    wait $API_PID
    
else
    echo "❌ Failed to start API server"
    exit 1
fi