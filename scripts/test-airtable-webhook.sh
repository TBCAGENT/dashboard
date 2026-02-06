#!/bin/bash

# Test script for Airtable webhook - simulates what GHL will send
source ~/.config/airtable/secrets.env

echo "Testing Airtable webhook endpoint..."

# Test payload (simulating GHL webhook)
curl -X POST \
  -H "Authorization: Bearer $AIRTABLE_API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblwRwbKogqQnRXtC" \
  -d '{
    "records": [
      {
        "fields": {
          "Agent Name": "Test Agent",
          "Phone": "+1234567890",
          "Agent Message": "Hi, I have a property you might be interested in. 3br/2ba, Section 8 approved, asking $75k.",
          "Status": "Pending Review",
          "GHL Contact ID": "test-webhook-123"
        }
      }
    ]
  }'

echo -e "\n\nWebhook test complete. Check Airtable Agent Responses table for the test record."