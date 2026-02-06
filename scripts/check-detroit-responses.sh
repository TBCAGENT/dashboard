#!/bin/bash

# Fixed script to check for SMS responses ONLY from Detroit tagged contacts
source ~/.config/gohighlevel/secrets.env
source ~/.config/airtable/secrets.env

echo "Checking for new responses from Detroit tagged agents..."

# Get all conversations with inbound messages from today
TEMP_FILE="/tmp/ghl_responses_$(date +%s).json"
curl -s -H "Authorization: Bearer $GHL_API_KEY" -H "Version: 2021-07-28" \
  "$GHL_BASE_URL/conversations/search?locationId=$GHL_LOCATION_ID&limit=50" > "$TEMP_FILE"

# Process each inbound conversation and check contact tags
jq -r '.conversations[] | select(.lastMessageDirection == "inbound") | "\(.contactId)|\(.contactName)|\(.phone)|\(.lastMessageBody)|\(.lastMessageDate)"' "$TEMP_FILE" | \
while IFS='|' read -r contact_id contact_name phone message date; do
    # Skip if already processed today (check Airtable)
    existing_count=$(curl -s -H "Authorization: Bearer $AIRTABLE_API_KEY" \
        "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblwRwbKogqQnRXtC?filterByFormula=AND(Phone%3D%27$phone%27%2CVALUE(Created)%3E%3DTODAY())" | \
        jq '.records | length')
    
    if [ "$existing_count" -gt 0 ]; then
        echo "Already processed: $contact_name ($phone)"
        continue
    fi
    
    # Get contact details and check tags
    contact_info=$(curl -s -H "Authorization: Bearer $GHL_API_KEY" -H "Version: 2021-07-28" \
        "$GHL_BASE_URL/contacts/$contact_id")
    
    # Check if contact has both "Detroit" and "SMS sent" tags
    has_detroit=$(echo "$contact_info" | jq -r '.contact.tags[]?' | grep -i "detroit" | wc -l)
    has_sms_sent=$(echo "$contact_info" | jq -r '.contact.tags[]?' | grep -i "sms sent" | wc -l)
    
    if [ "$has_detroit" -gt 0 ] && [ "$has_sms_sent" -gt 0 ]; then
        echo "✅ VALID: $contact_name - Detroit + SMS sent tags found"
        echo "Contact ID: $contact_id"
        echo "Phone: $phone" 
        echo "Message: $message"
        echo "---"
        
        # Here you would add the contact to Airtable
        # (This is where the processing logic would go)
        
    else
        echo "❌ FILTERED OUT: $contact_name - Missing required tags"
        echo "  Detroit tag: $([ $has_detroit -gt 0 ] && echo "YES" || echo "NO")"
        echo "  SMS sent tag: $([ $has_sms_sent -gt 0 ] && echo "YES" || echo "NO")"
        echo "  Contact ID: $contact_id"
        echo "---"
    fi
done

rm -f "$TEMP_FILE"
echo "Response check complete."