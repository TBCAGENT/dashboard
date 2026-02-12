#!/usr/bin/env python3
"""Add agent memory fix task to kanban board"""

import json
from datetime import datetime

# Load board data
with open('/Users/lukefontaine/.openclaw/workspace/board/board-data.json', 'r') as f:
    board = json.load(f)

# Add new task
new_task = {
    "id": "task-009",
    "title": "Agent Memory & Data Storage Audit",
    "description": "Fix Agent Quant trading sheet P&L storage, audit all agents for memory accuracy, prevent similar issues",
    "column": "done",
    "priority": "critical",
    "type": "project",
    "created": "2026-02-11",
    "context": "Luke identified Agent Quant wasn't storing trading sheet P&L and memory was inaccurate. Needed comprehensive fix for all agents.",
    "archived": False,
    "chatMessages": [],
    "activity": [
        {
            "date": "2026-02-11T18:41:00",
            "action": "Issue identified",
            "detail": "Luke: Agent Quant not storing trading sheet P&L, memory inaccurate based on trading history"
        },
        {
            "date": "2026-02-11T18:42:00", 
            "action": "Sync script created",
            "detail": "Built scripts/sync-trading-sheet.py to update Google Sheet with P&L data"
        },
        {
            "date": "2026-02-11T18:43:00",
            "action": "Trading sheet synced",
            "detail": "Updated https://docs.google.com/spreadsheets/d/1bURjg0SJlcyq2We6r8osWE0pc_s9QPbk7Fw2qeJc38w with current P&L: -$30.43"
        },
        {
            "date": "2026-02-11T18:44:00",
            "action": "Agent memory audit",
            "detail": "Created audit script and memory files for all agents: Quant, Detroit, SMS, Financial"
        },
        {
            "date": "2026-02-11T18:45:00",
            "action": "Automation added",
            "detail": "Cron job scheduled for 3x daily trading sheet sync (9am, 1pm, 5pm PST)"
        },
        {
            "date": "2026-02-11T18:46:00",
            "action": "COMPLETED ✅",
            "detail": "Trading P&L accurate, all agents have memory files, sync automation in place, audit script available"
        }
    ]
}

# Add to tasks
board['tasks'].append(new_task)
board['lastUpdated'] = datetime.now().isoformat()

# Save board
with open('/Users/lukefontaine/.openclaw/workspace/board/board-data.json', 'w') as f:
    json.dump(board, f, indent=2)

print("✅ Agent memory fix task added to board")