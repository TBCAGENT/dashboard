# Agent SMS - Outreach Memory

## Current Status
- **Platform**: Go High Level (GHL) + Airtable integration
- **Location ID**: a0xDUfSzadt256BbUcgz  
- **Daily Volume**: 50 messages/day (rate limited)
- **SMS Hours**: 6am-4pm PST only
- **Current Pipeline**: Detroit agent acquisition

## Active Campaigns
### Detroit Agent Outreach
- **Target**: Detroit real estate agents
- **Template**: Approved message from Airtable SMS Templates table
- **Batches**: 7am, 11am, 2pm (16-17 messages each)
- **Rate Limit**: 5 messages per 5 minutes
- **Status**: ACTIVE

### Zillow Rent Inquiries  
- **Purpose**: Get rent data for Section 8 listings
- **Template**: Plain text "What's the rent?" (NO company info)
- **Frequency**: Realtime when new listings found
- **Target**: Specific listing agents
- **Status**: ACTIVE

## Critical Protocol Violations - NEVER REPEAT
### Tim Bender Incident (2026-02-06)
- **Contact**: +15176053666 messaged 3 times
- **Violation**: Duplicate messaging + wrong template
- **Business Impact**: Damaged professional relationship
- **Root Cause**: No duplicate prevention, unauthorized template

### Mass Template Violation (2026-02-06)  
- **Scope**: 152 messages sent with WRONG template
- **Sent**: "Hi {name}, I help investors buy..." (unauthorized)
- **Should Have**: "Hey [First Name], just following up. Do you have any Section 8..." (approved)
- **Impact**: Wrong brand voice for entire outreach batch

## Bulletproof Systems (POST-INCIDENT)
### Approved Scripts ONLY
- ✅ **safe-outreach.py**: Agent network building (bulletproof)
- ✅ **zillow-rent-inquiry.py**: Listing rent inquiries (bulletproof)
- ❌ **FORBIDDEN**: csv-outreach.py, direct-send-approach.py, zillow-agent-outreach.py

### Multi-Layer Protection
1. **Airtable Check**: Query Agent Responses for previous contact
2. **GHL Tag Check**: "SMS sent" tag prevents duplicates  
3. **Approved Templates**: Only from Airtable SMS Templates table
4. **SMS Hours**: 6am-4pm PST enforcement
5. **Rate Limiting**: 5 messages per 5 minutes

## Response Handling Protocol
### Response Categories
- **Interested**: Import to Airtable → Draft reply → Luke approval
- **Questions**: Draft contextual response → Luke approval  
- **Opt-out**: Add to Blacklist, NO response, mark "No Response Needed"
- **Not in Area**: Add to Blacklist, NO response

### GHL Pipeline Stages
- **Messaged**: faf4f864-d3cc-4b89-a153-58b09e5757fb
- **Response Received**: 3c1b7c53-c28d-4907-a350-35b98f39fd1e  
- **Blacklist**: 846fb1e6-79a8-4667-b112-b475082a23e2

## Data Tracking (MANDATORY)
### Dual System Updates
1. **Airtable**: Agent Responses table + Outreach Tracker
2. **GHL**: Contact tags + pipeline movement
- **BOTH must be updated** - never update one without the other

### Daily Metrics Tracking
- **Messages Sent**: Update Outreach Tracker daily
- **Responses**: Count and update tracker immediately
- **GHL Sync**: Pipeline movement for all contacts

## Configuration Status
- **GHL API**: ✅ CONFIGURED (Location: a0xDUfSzadt256BbUcgz)
- **Airtable**: ✅ CONFIGURED (Base: appzBa1lPvu6zBZxv)
- **SMS Delivery**: ✅ ACTIVE
- **Webhook**: ✅ CONFIGURED for incoming responses

## Key Metrics
- **Response Rate**: 3-5% (typical cold outreach)
- **Daily Outreach**: 50 messages (rate limited)
- **Agent Database**: 1,500+ Detroit contacts
- **Blacklist**: Opt-outs and non-Detroit agents

## Memory Accuracy  
- **Status**: ✅ ACCURATE - All protocols documented
- **Last Incident**: 2026-02-06 (Tim Bender + mass template violation)
- **Fixes Implemented**: ✅ COMPLETE bulletproof system
- **Zero Tolerance**: Duplicates OR wrong templates

## Critical Rules
1. **NEVER contact same person twice** (any reason, any campaign)
2. **ONLY approved templates** from Airtable SMS Templates
3. **SMS hours ONLY** (6am-4pm PST)  
4. **Context-aware responses** - read before replying
5. **Dual system updates** - Airtable AND GHL always