#!/bin/bash
# Create a Google Sheet and optionally populate it with data
# Usage: create-sheet.sh <title> [share_with_email]
# Returns the spreadsheet URL. Use the Sheets API to add data after creation.
#
# Example: create-sheet.sh "Q1 Report" "luke@blackboxalchemist.com"

TITLE="$1"
SHARE_WITH="$2"

if [ -z "$TITLE" ]; then
  echo "Usage: create-sheet.sh <title> [share_with_email]"
  exit 1
fi

TOKEN=$(bash "$(dirname "$0")/google-token.sh")

# Create the spreadsheet
RESULT=$(curl -s -X POST "https://sheets.googleapis.com/v4/spreadsheets" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"properties\": {\"title\": \"$TITLE\"}}")

SHEET_ID=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['spreadsheetId'])" 2>/dev/null)
SHEET_URL=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['spreadsheetUrl'])" 2>/dev/null)

if [ -z "$SHEET_ID" ]; then
  echo "ERROR: Failed to create spreadsheet"
  echo "$RESULT"
  exit 1
fi

# Share if email provided
if [ -n "$SHARE_WITH" ]; then
  curl -s -X POST "https://www.googleapis.com/drive/v3/files/$SHEET_ID/permissions" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"role\": \"writer\", \"type\": \"user\", \"emailAddress\": \"$SHARE_WITH\"}" > /dev/null
  echo "Shared with $SHARE_WITH"
fi

echo "Created: $TITLE"
echo "URL: $SHEET_URL"
echo "ID: $SHEET_ID"
