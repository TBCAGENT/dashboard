#!/bin/bash
# Create Google Calendar event from arthur@blackboxalchemist.com
# Usage: create-event.sh <summary> <start_iso> <end_iso> [attendee1,attendee2,...]
# Example: create-event.sh "Team Meeting" "2026-02-05T12:00:00-08:00" "2026-02-05T13:00:00-08:00" "luke@blackboxalchemist.com"
# Dates must be ISO 8601 with timezone offset (e.g. -08:00 for PST)

SUMMARY="$1"
START="$2"
END="$3"
ATTENDEES="$4"

if [ -z "$SUMMARY" ] || [ -z "$START" ] || [ -z "$END" ]; then
  echo "Usage: create-event.sh <summary> <start_iso> <end_iso> [attendee_emails_comma_separated]"
  exit 1
fi

TOKEN=$(bash "$(dirname "$0")/google-token.sh")

# Build attendees JSON
ATTENDEES_JSON="[]"
if [ -n "$ATTENDEES" ]; then
  ATTENDEES_JSON=$(python3 -c "
import json
emails = '$ATTENDEES'.split(',')
print(json.dumps([{'email': e.strip()} for e in emails]))
")
fi

RESULT=$(curl -s -X POST "https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"summary\": \"$SUMMARY\",
    \"start\": {\"dateTime\": \"$START\", \"timeZone\": \"America/Los_Angeles\"},
    \"end\": {\"dateTime\": \"$END\", \"timeZone\": \"America/Los_Angeles\"},
    \"attendees\": $ATTENDEES_JSON
  }")

echo "$RESULT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
if 'error' in d:
    print(f'ERROR: {d[\"error\"][\"message\"]}')
    sys.exit(1)
else:
    attendees = [a['email'] for a in d.get('attendees', [])]
    print(f'Created: {d[\"summary\"]}')
    print(f'When: {d[\"start\"][\"dateTime\"]}')
    print(f'Attendees: {attendees}')
    print(f'Link: {d[\"htmlLink\"]}')
"
