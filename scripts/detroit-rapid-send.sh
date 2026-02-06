#!/bin/bash

# Detroit Rapid Send Script
# Load environment variables
source ~/.config/gohighlevel/secrets.env
source ~/.config/airtable/secrets.env

echo "🚀 DETROIT RAPID OUTREACH MISSION"
echo "⏰ Started: $(date '+%I:%M:%S %p')"

# Message template
TEMPLATE_BASE="Hi NAME_PLACEHOLDER, I help investors buy section 8 properties in Detroit. Do you have any coming available that need buyers? We close quickly with cash."

# Get eligible contacts
echo "🔍 Finding eligible contacts..."

CONTACTS=$(curl -s -H "Authorization: Bearer $GHL_API_KEY" -H "Version: 2021-07-28" \
  "$GHL_BASE_URL/contacts/?locationId=$GHL_LOCATION_ID&limit=100" | \
  jq -r '.contacts[] | select(.tags != null and (.tags[] | test("detroit"; "i")) and (.tags | map(test("sms sent"; "i")) | any | not) and .phone != null) | "\(.id)|\(.contactName)|\(.phone)"')

echo "📋 Processing contacts..."

sent_count=0
target=98  # Need 98 more (already sent 2)

echo "$CONTACTS" | while IFS='|' read -r contact_id name phone; do
  if [ $sent_count -ge $target ]; then
    break
  fi
  
  if [ -z "$contact_id" ]; then
    continue
  fi
  
  # Create message for this contact
  message=$(echo "$TEMPLATE_BASE" | sed "s/NAME_PLACEHOLDER/${name:-there}/g")
  
  echo -n "📱 $((sent_count + 1))/98 - Sending to $name..."
  
  # Send SMS
  response=$(curl -s -X POST \
    -H "Authorization: Bearer $GHL_API_KEY" \
    -H "Version: 2021-07-28" \
    -H "Content-Type: application/json" \
    "$GHL_BASE_URL/conversations/messages" \
    -d "{
      \"type\": \"SMS\",
      \"contactId\": \"$contact_id\",
      \"locationId\": \"$GHL_LOCATION_ID\",
      \"message\": \"$message\"
    }")
  
  # Check if successful
  if echo "$response" | jq -e '.conversationId' > /dev/null 2>&1; then
    # Success - add tag
    curl -s -X POST \
      -H "Authorization: Bearer $GHL_API_KEY" \
      -H "Version: 2021-07-28" \
      -H "Content-Type: application/json" \
      "$GHL_BASE_URL/contacts/$contact_id/tags" \
      -d '{"tags": ["SMS sent"]}' > /dev/null
    
    sent_count=$((sent_count + 1))
    echo " ✅"
    
    # Rate limiting
    sleep 2
    
  else
    # Failed - check error
    error_msg=$(echo "$response" | jq -r '.message // "Unknown error"')
    echo " ⏭️ ($error_msg)"
  fi
  
  # Update progress every 10 messages
  if [ $((sent_count % 10)) -eq 0 ] && [ $sent_count -gt 0 ]; then
    echo "📊 Progress: $sent_count/98 messages sent"
  fi
done

echo "🎯 Batch complete: $sent_count additional messages sent"
echo "🔄 Total today: $((sent_count + 2)) messages (including 2 already sent)"
echo "⏰ Finished: $(date '+%I:%M:%S %p')"