# Luke's Command Center Dashboard

A comprehensive, mobile-optimized dashboard for monitoring financial position, agent operations, and health metrics.

## 🚀 Quick Start

### Launch Dashboard
```bash
bash scripts/launch-dashboard.sh
```

### Direct File Access
Open in browser: `file:///Users/lukefontaine/.openclaw/workspace/dashboard/command-center.html`

## 📱 Dashboard Sections

### 💰 Financial Tab
- Total financial position with progress toward $10M goal
- Realized net worth breakdown with interactive chart
- LL Ventures pipeline with live deal data
- Key metrics: Investments, bank accounts, real estate, etc.

### 🤖 Agents Tab
- Agent status overview (Active/Busy/Issues)
- Kanban board showing agent assignments and tasks
- Quick actions for task creation and system monitoring
- Real-time agent communication logs

### 💪 Health Tab
- Overall health score calculation (0-100)
- Daily metrics: Sleep, steps, hydration, nutrition
- Goal progress tracking with visual indicators
- Personalized recommendations and action items

## 📊 Health Tracking System

### Log Health Data
```bash
# Log daily metrics
python3 scripts/log-health.py --steps 8500 --water 6 --sleep 7.5 --meditation 10

# View current status
python3 scripts/log-health.py --show

# Log specific metrics
python3 scripts/log-health.py --sleep 8.0  # Hours of sleep
python3 scripts/log-health.py --steps 12000  # Step count
python3 scripts/log-health.py --water 8  # Glasses of water
python3 scripts/log-health.py --meditation 15  # Minutes
python3 scripts/log-health.py --nutrition 14  # Score 1-15
```

### Health Score Calculation
- **Sleep**: 25 points (based on 8h goal)
- **Activity**: 25 points (based on 10k steps goal) 
- **Hydration**: 20 points (based on 8 glasses goal)
- **Meditation**: 15 points (based on 10min goal)
- **Nutrition**: 15 points (scored 1-15)

### Goals & Targets
- **Steps**: 10,000 daily
- **Sleep**: 8.0 hours nightly
- **Water**: 8 glasses daily
- **Meditation**: 10 minutes daily
- **Weight**: 180 lbs target

## 🔧 API Integration

### Start Agents API Server
```bash
cd /Users/lukefontaine/.openclaw/workspace
python3 agents/dashboard_api.py
```

### Available Endpoints
- `http://localhost:8888/api/dashboard` - Complete dashboard data
- `http://localhost:8888/api/agents` - Agent status list
- `http://localhost:8888/api/tasks` - Current task queue
- `http://localhost:8888/api/activity` - Recent activity stream

## 📁 File Structure

```
dashboard/
├── command-center.html      # Main dashboard (mobile-optimized)
├── financial-dashboard.html # Legacy financial-only dashboard
└── README.md               # This file

health/
├── health_tracker.py       # Health tracking system
└── health_data.json       # Stored health metrics

scripts/
├── launch-dashboard.sh     # Dashboard launcher
├── log-health.py          # Health metric logging
└── update-dashboard-balances.sh  # Financial data updates

agents/
└── dashboard_api.py        # Agent coordination API
```

## 🔄 Auto-Refresh

The dashboard automatically refreshes data every 5 minutes. Manual refresh available via the "🔄 Refresh All Data" button.

## 📱 Mobile Optimization

- Responsive design optimized for phone screens
- Touch-friendly interface
- Swipe navigation between sections
- Compact data presentation
- Works offline once loaded

## 🎯 Customization

### Modify Health Goals
Edit `health/health_tracker.py` and update the goals in `_create_default_data()`:

```python
"goals": {
    "steps": 10000,        # Daily step target
    "water_glasses": 8,    # Daily water target  
    "sleep_hours": 8.0,    # Nightly sleep target
    "meditation_minutes": 10, # Daily meditation target
    "weight_target": 180   # Weight goal (lbs)
}
```

### Add New Metrics
Extend the health tracker by adding new metrics in the `log_daily_metric()` function and updating the dashboard calculation logic.

## 🔒 Data Storage

- Health data: `health/health_data.json`
- Financial data: Connected to existing Tiller/Airtable systems
- Agent data: Live from coordination system

## ⚡ Performance

- Lightweight HTML/CSS/JS - loads instantly
- Local data storage where possible
- Efficient API calls for live data
- Optimized for mobile bandwidth

---

Built with ❤️ by Arthur for Luke's comprehensive life management.