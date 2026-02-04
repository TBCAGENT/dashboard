# Second Brain Auto-Processor

## Process
Every conversation, I should:

1. **Scan for new information** about:
   - People (names, relationships, context)
   - Business entities (companies, partnerships)
   - Personal details (preferences, history)  
   - Ideas and concepts
   - Active projects

2. **Update immediately** during conversation, not later

3. **Create/update files** in real-time:
   - `brain/people/[name].md` for new people mentioned
   - `brain/business/[company].md` for business info
   - `brain/personal/[topic].md` for personal details
   - `brain/ideas/[concept].md` for new ideas

4. **Cross-reference** with existing knowledge

## Triggers
- Any proper noun (could be a person/company)
- Family references (mom, dad, brother, etc.)
- Business history mentions
- "I used to work at..." or "My company..."
- Personal preferences or details

## Current Status
- **FIXED**: All mentioned people now in brain/people/
- **ACTIVE**: Will process all future conversations automatically
- **BACKFILL**: Need to review all past conversations for missed info

## Implementation
This process should happen automatically during every response, not as a separate task.