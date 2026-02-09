#!/bin/bash
# Send email from arthur@blackboxalchemist.com via Gmail API with CC support
# Usage: send-email-with-cc.sh <to> <subject> <body> [cc_email]

TO="$1"
SUBJECT="$2"
BODY="$3"
CC="${4:-}"

if [ -z "$TO" ] || [ -z "$SUBJECT" ] || [ -z "$BODY" ]; then
  echo "Usage: send-email-with-cc.sh <to> <subject> <body> [cc_email]"
  exit 1
fi

TOKEN=$(bash "$(dirname "$0")/google-token.sh")

RAW_EMAIL=$(python3 -c "
import base64
cc_line = 'Cc: $CC\n' if '$CC' else ''
msg = f'''From: arthur@blackboxalchemist.com
To: $TO
{cc_line.rstrip()}
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
    cc_text = ' (CC: $CC)' if '$CC' else ''
    print(f'Sent to $TO{cc_text} (ID: {d[\"id\"]})')
"