#!/bin/bash
# Send email from arthur@blackboxalchemist.com via Gmail API
# Usage: send-email.sh <to> <subject> <body>
# Example: send-email.sh luke@blackboxalchemist.com "Hello" "Hey Luke, just checking in."

TO="$1"
SUBJECT="$2"
BODY="$3"

if [ -z "$TO" ] || [ -z "$SUBJECT" ] || [ -z "$BODY" ]; then
  echo "Usage: send-email.sh <to> <subject> <body>"
  exit 1
fi

TOKEN=$(bash "$(dirname "$0")/google-token.sh")

RAW_EMAIL=$(python3 -c "
import base64
msg = f'''From: arthur@blackboxalchemist.com
To: $TO
Subject: $SUBJECT

$BODY'''
print(base64.urlsafe_b64encode(msg.encode()).decode())
")

RESULT=$(curl -s -X POST "https://www.googleapis.com/gmail/v1/users/me/messages/send" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"raw\": \"$RAW_EMAIL\"}")

echo "$RESULT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
if 'error' in d:
    print(f'ERROR: {d[\"error\"][\"message\"]}')
    sys.exit(1)
else:
    print(f'Sent to $TO (ID: {d[\"id\"]})')
"
