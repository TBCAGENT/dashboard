# HEARTBEAT.md - Periodic Intelligence Loop

Execute 2-4 of these per heartbeat. Rotate through them. Track state in memory/heartbeat-state.json.

## Priority Checks (every heartbeat)
- [ ] Unread emails — anything urgent or time-sensitive?
- [ ] Calendar — events in next 2 hours?

## Rotating Checks (cycle through)
- [ ] Board review — any in-progress tasks stale >48h? Update activity logs
- [ ] Weather check — relevant if outdoor plans mentioned recently
- [ ] Memory maintenance — if >3 days since last consolidation, review recent daily logs and update MEMORY.md
- [ ] Brain update — any new people, projects, or facts from recent conversations that should be added to brain/?
- [ ] News scan — check for developments relevant to Luke's interests (real estate, AI, crypto, business)
- [ ] Email follow-ups — any sent emails >48h with no reply that need a nudge?

## Proactive Work (no permission needed)
- Organize and clean up memory files
- Update documentation and MEMORY.md
- Review and update board-data.json activity logs
- Commit and push workspace changes
- Pre-research upcoming calendar topics

## Rules
- Late night (23:00-08:00): HEARTBEAT_OK unless urgent
- Nothing new since last check: HEARTBEAT_OK
- Checked <30 min ago: HEARTBEAT_OK
- Reach out only when there's genuine value — not for the sake of it
