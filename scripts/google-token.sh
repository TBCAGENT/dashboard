#!/bin/bash
# Refreshes Google OAuth access token and prints it.
# Usage: source this or capture output: TOKEN=$(bash google-token.sh)
source ~/.config/google-arthur/secrets.env

NEW_TOKEN=$(curl -s -X POST "https://oauth2.googleapis.com/token" \
  -d "client_id=$GOOGLE_CLIENT_ID" \
  -d "client_secret=$GOOGLE_CLIENT_SECRET" \
  -d "refresh_token=$GOOGLE_REFRESH_TOKEN" \
  -d "grant_type=refresh_token" | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

# Update secrets.env
sed -i '' "s|export GOOGLE_ACCESS_TOKEN=.*|export GOOGLE_ACCESS_TOKEN='$NEW_TOKEN'|" ~/.config/google-arthur/secrets.env
sed -i '' "s|export GOOGLE_ACCESS_TOKEN=.*|export GOOGLE_ACCESS_TOKEN='$NEW_TOKEN'|" ~/.config/google-calendar/secrets.env 2>/dev/null

echo "$NEW_TOKEN"
