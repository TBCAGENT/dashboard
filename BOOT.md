# BOOT.md - Gateway Startup Routine

Run this checklist on every gateway restart. Execute silently — don't message Luke unless something needs attention.

## Startup Checks

1. **Verify workspace integrity**
   - Confirm SOUL.md, USER.md, AGENTS.md, MEMORY.md exist
   - Confirm memory/ directory exists
   - Confirm board/board-data.json exists and is valid JSON

2. **Check connectivity**
   - Verify email access (himalaya accounts)
   - Verify WhatsApp channel is linked

3. **Memory sync**
   - Read today's memory file (create if missing)
   - Read yesterday's memory file
   - Read MEMORY.md
   - Check if memory maintenance is overdue (>3 days since last consolidation)

4. **Check pending tasks**
   - Read board/board-data.json for in-progress items
   - Check for any stale tasks (in-progress but no activity in >48h)

5. **Quick environment scan**
   - Check for unread emails
   - Check calendar for today's events

## Post-Boot

- If anything failed, log it to memory/YYYY-MM-DD.md and notify Luke
- If everything passed, start normal operation silently
- If this is the first boot of the day, log "Arthur online" to today's memory file
