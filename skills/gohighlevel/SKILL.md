---
name: gohighlevel
description: Full GoHighLevel CRM integration — manage contacts, send SMS/email, pipelines, calendars, tags, and more via the GHL API.
metadata:
  {
    "openclaw": {
      "emoji": "📊",
      "skillKey": "gohighlevel",
      "requires": {
        "bins": ["curl"],
        "env": ["GHL_API_KEY"]
      }
    }
  }
---

# GoHighLevel Integration

Full CRM access to Luke's GoHighLevel account. Arthur can manage contacts, read conversations, work pipelines, and more.

## CRITICAL GUARDRAILS — READ BEFORE ANY ACTION

**NEVER send any outbound message (SMS, email, or any communication) to ANY contact in GHL without Luke's explicit instruction.** This is a hard rule with zero exceptions.

- **READ: ALLOWED** — Searching contacts, reading conversations, viewing pipelines, checking calendars, pulling data — all fine anytime.
- **WRITE (non-messaging): ALLOWED** — Creating contacts, updating records, adding tags, moving pipeline stages — fine when relevant to a task.
- **OUTBOUND MESSAGING: BLOCKED unless Luke explicitly tells you to.** This includes:
  - SMS messages
  - Email messages
  - Any reply to an inbound conversation
  - Any proactive outreach
  - Any automated responses
  - Any follow-ups

**If you see an inbound message or conversation that needs a response, INFORM Luke and wait for his instruction. Do NOT respond on his behalf.**

This applies to all contexts: direct CLI usage, OpenClaw agent sessions, WhatsApp-triggered workflows, automated scripts, and any other pathway.

## Configuration

Credentials stored at: `~/.config/gohighlevel/secrets.env`
- `GHL_API_KEY` — Private Integration Token
- `GHL_LOCATION_ID` — Sub-account location ID
- `GHL_BASE_URL` — API base URL

## Quick Reference

All commands via: `bash ~/.openclaw/workspace/scripts/ghl.sh <command>`

| Action | Command |
|--------|---------|
| List contacts | `ghl.sh contacts list [--limit 50] [--query "name"]` |
| Search contacts | `ghl.sh contacts search "John"` |
| Get contact | `ghl.sh contacts get <contactId>` |
| Create contact | `ghl.sh contacts create --name "First Last" --email "x" --phone "+1..." --tags "a,b"` |
| Update contact | `ghl.sh contacts update <contactId> --name "x" --email "x" --phone "x"` |
| Delete contact | `ghl.sh contacts delete <contactId>` |
| Send SMS | `ghl.sh message send <contactId> --body "Hello!" --type SMS` |
| Send Email | `ghl.sh message send <contactId> --body "Hello!" --type Email` |
| List conversations | `ghl.sh conversations list [--contactId <id>]` |
| Get conversation | `ghl.sh conversations get <conversationId>` |
| List pipelines | `ghl.sh pipelines list` |
| List opportunities | `ghl.sh opportunities list [--pipelineId <id>]` |
| Create opportunity | `ghl.sh opportunities create --pipelineId <id> --stageId <id> --contactId <id> --name "Deal" [--value 5000]` |
| List calendars | `ghl.sh calendars list` |
| Get free slots | `ghl.sh calendars slots <calendarId> --start "2026-02-05" --end "2026-02-06"` |
| List tags | `ghl.sh tags list` |
| Create tag | `ghl.sh tags create --name "New Tag"` |
| List custom fields | `ghl.sh custom-fields list` |
| Raw API call | `ghl.sh raw GET /endpoint` |

## Messaging Notes

- SMS messages are sent through GHL's LC Phone (LeadConnector)
- A2P 10DLC compliance applies for US numbers
- Messages appear in GHL conversations UI
- Daily SMS limits apply per sub-account (ramp-up period for new accounts)
- Contact must have a phone number for SMS, email for Email type

## Common Workflows

### Add a new lead and text them
```bash
# Create the contact
ghl.sh contacts create --name "John Smith" --phone "+13135551234" --email "john@example.com" --tags "Section 8,Detroit"

# Send welcome SMS (use the contactId from create response)
ghl.sh message send <contactId> --body "Hey John, this is Luke from TBC Premium. Got a few Section 8 properties I think you'd be interested in. When's a good time to chat?"
```

### Move a deal through the pipeline
```bash
# List pipelines to get IDs
ghl.sh pipelines list

# Create opportunity
ghl.sh opportunities create --pipelineId <id> --stageId <id> --contactId <id> --name "123 Main St - Section 8" --value 85000
```

## API Details

- **Base URL:** https://services.leadconnectorhq.com
- **Auth:** Private Integration Token (Bearer)
- **Version:** 2021-07-28
- **Rate Limits:** 100 requests per 10 seconds, 200,000 per day
- **Location:** a0xDUfSzadt256BbUcgz
- **Total Contacts:** 1,608
