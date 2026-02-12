#!/bin/bash

# Agent Dashboard Startup Script
# Starts the Node.js API server and opens the dashboard

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Starting Agent Dashboard..."

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

# Install dependencies if package.json exists
PACKAGE_JSON="$WORKSPACE_DIR/package.json"
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "📦 Creating package.json..."
    cd "$WORKSPACE_DIR"
    cat > package.json << EOF
{
  "name": "agent-dashboard",
  "version": "1.0.0",
  "description": "OpenClaw Agent Dashboard",
  "main": "scripts/agent-api.js",
  "scripts": {
    "start": "node scripts/agent-api.js",
    "dev": "nodemon scripts/agent-api.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
EOF
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd "$WORKSPACE_DIR"
npm install --silent

# Check if dependencies installed successfully
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Start the API server
echo "🖥️  Starting API server on port 3001..."
echo "📊 Dashboard will be available at: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
node "$SCRIPT_DIR/agent-api.js" &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Try to open the dashboard in browser (macOS)
if command -v open &> /dev/null; then
    echo "🌐 Opening dashboard in browser..."
    open "http://localhost:3001"
fi

# Wait for server process
wait $SERVER_PID