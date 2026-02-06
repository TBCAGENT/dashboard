#!/bin/bash
# Session Cleanup Script for Arthur/OpenClaw
# Prevents token overflow by automatically pruning large session files
# Run via cron every 15 minutes

set -euo pipefail

SESSION_DIR="$HOME/.openclaw/agents/main/sessions"
MAX_SIZE_KB=500  # Delete sessions larger than 500KB
LOG_FILE="$HOME/.openclaw/workspace/logs/session-cleanup.log"

mkdir -p "$(dirname "$LOG_FILE")"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "Starting session cleanup check..."

CLEANED=0

# Find and remove session files larger than threshold
for f in "$SESSION_DIR"/*.jsonl; do
  [ -f "$f" ] || continue

  SIZE_KB=$(du -k "$f" | cut -f1)

  if [ "$SIZE_KB" -gt "$MAX_SIZE_KB" ]; then
    FILENAME=$(basename "$f")
    log "Removing large session: $FILENAME (${SIZE_KB}KB)"
    rm -f "$f"
    CLEANED=$((CLEANED + 1))
  fi
done

if [ "$CLEANED" -gt 0 ]; then
  log "Cleaned $CLEANED session(s). Restarting gateway..."
  cd "$HOME/.openclaw" && npx openclaw@latest gateway restart >> "$LOG_FILE" 2>&1
  log "Gateway restarted."
else
  log "No cleanup needed. All sessions under ${MAX_SIZE_KB}KB."
fi

# Keep log file from growing too large (last 500 lines)
if [ -f "$LOG_FILE" ]; then
  tail -500 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"
fi
