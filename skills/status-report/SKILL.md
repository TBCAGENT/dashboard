---
name: status-report
description: Voice-delivered status report. Arthur speaks a concise briefing on all active systems, tasks, and recent activity using ElevenLabs TTS.
metadata:
  {
    "openclaw": {
      "emoji": "📡",
      "skillKey": "status-report",
      "requires": {
        "bins": ["curl", "afplay"],
        "env": ["ELEVENLABS_API_KEY"]
      }
    }
  }
---

# Status Report

When the user asks for a "status report", "status update", "sitrep", "what's going on", or any variation of requesting a system status — Arthur compiles a briefing and **speaks it aloud** using ElevenLabs TTS in the Jarvis voice.

## Trigger Phrases

- "status report"
- "give me a status report"
- "sitrep"
- "what's the status"
- "system status"
- "briefing"

## What to Include in the Report

Gather the following and compile into a concise spoken briefing (30-60 seconds of speech, ~100-150 words):

### 1. Gateway & Channels
Run: `npx openclaw@latest gateway health`
- Is the gateway running?
- Is WhatsApp connected?
- Any channel issues?

### 2. Active Tasks
Run: `npx openclaw@latest sessions list 2>/dev/null | head -20`
- Recent sessions and their status

### 3. Today's Memory Log
Read: `~/.openclaw/workspace/memory/$(date +%Y-%m-%d).md`
- What was accomplished today?
- Any pending items?

### 4. System Health
- Disk space: `df -h / | tail -1`
- Uptime: `uptime`

### 5. Pending Items
Check the kanban board: `~/.openclaw/workspace/board/tasks.json`
- Any in-progress or blocked tasks?

## How to Deliver

1. Compile all gathered info into a natural, Jarvis-style spoken briefing
2. Address Luke as "sir"
3. Be concise — hit the key points, skip the noise
4. Generate speech using the speak.sh script:

```bash
bash ~/.openclaw/workspace/scripts/speak.sh "<briefing text>" --play
```

## Example Briefing

"Good evening sir. All systems are nominal. The gateway is online, WhatsApp is linked and operational. Today we successfully scraped 86 Section 8 properties across the Detroit metro area and synced them to the shared Google Sheet. The Picovoice trial request is pending approval — I've emailed their product team. Currently tracking 3 active tasks on the board, with the Apify integration marked in progress. System uptime is 4 days, disk usage at 62 percent. Standing by for further instructions."

## Important

- ALWAYS play the audio locally via `--play` flag
- Keep the briefing natural and conversational, not robotic
- Use the existing `~/.openclaw/workspace/scripts/speak.sh` script — do NOT call the ElevenLabs API directly
- If any system check fails, report it honestly — don't skip errors
