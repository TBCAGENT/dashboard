# GHL → Airtable Webhook Setup for Detroit Agent SMS Responses

## Overview
This webhook captures SMS replies ONLY from Detroit tagged agents we're actively messaging and sends them to Airtable for review/approval.

## Manual Setup Steps:

### 1. Open Arthur Workflow in GHL
- Go to Automation → Workflows
- Find "Arthur" workflow (ID: dcbb28fc-e4e6-4314-bfe7-9ef7a52b8546)
- Click Edit

### 2. Set Up Trigger
**Trigger Type:** SMS Received
**Trigger Name:** Detroit Agent Reply Filter

**Filters to Add:**
- Contact has tag: "Detroit" (AND)
- Contact has tag: "SMS sent" (AND)

This ensures ONLY replies from agents we're actively messaging get processed.

### 3. Add Webhook Action
**Action Type:** Custom Webhook
**Action Name:** Send to Airtable Agent Responses

### 4. Webhook Configuration

**URL:** 
```
https://api.airtable.com/v0/appzBa1lPvu6zBZxv/tblwRwbKogqQnRXtC
```

**Method:** POST

**Event:** CUSTOM (for JSON payload)

**Headers:**
```
Authorization: Bearer pat7OpXE5AOmY2Vsx.df7776fba043b98f82b3a544703c958e4f7428a100660a19455cdc5f202bd2fd
Content-Type: application/json
```

**JSON Payload:**
```json
{
  "records": [
    {
      "fields": {
        "Agent Name": "{{contact.first_name}} {{contact.last_name}}",
        "Phone": "{{contact.phone}}",
        "Agent Message": "{{trigger.message}}",
        "Status": "Pending Review",
        "GHL Contact ID": "{{contact.id}}"
      }
    }
  ]
}
```

### 5. Add Second Action - Move to Response Received
**Action Type:** Update Opportunity
**Pipeline Stage:** Response Received (3c1b7c53-c28d-4907-a350-35b98f39fd1e)

### 6. Test the Workflow
- Save and publish
- Send a test SMS from a Detroit tagged contact
- Check Airtable Agent Responses table

## What This Achieves:
1. **Filtered capture** - Only Detroit agents we're messaging
2. **Automatic Airtable entry** - No more manual checking
3. **Pipeline update** - Moves opportunity to correct stage
4. **Ready for review** - Status set to "Pending Review"

## Variables Available in GHL:
- {{contact.first_name}} - Contact first name
- {{contact.last_name}} - Contact last name  
- {{contact.phone}} - Contact phone number
- {{contact.id}} - GHL contact ID
- {{trigger.message}} - The SMS message content
- {{trigger.from}} - From phone number
- {{trigger.to}} - To phone number