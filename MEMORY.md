# MEMORY.md - Arthur's Long-Term Memory

## Critical Learnings

### 🚨 CRITICAL PROTOCOL VIOLATION - NEVER REPEAT (2026-02-06)

**INCIDENT:** Tim Bender (+15176053666) was messaged 3 times:
- 2/5: First message → He responded "I do not."
- 2/6: Messaged AGAIN twice → He complained about duplicates

**ROOT CAUSE:** Scripts failed to check Agent Responses table before sending

**SECOND VIOLATION SAME DAY:** Used unauthorized message template for ALL 152 messages
- ❌ **SENT:** "Hi {name}, I help investors buy section 8 properties in Detroit..."
- ✅ **APPROVED:** "Hey [First Name], just following up. Do you have any Section 8 tenanted rentals in Detroit right now? Looking to buy another 2-3 this month."

**BUSINESS IMPACT:** Damaged relationship with real estate agent, professional reputation risk, WRONG BRAND VOICE for all 152 messages

**MANDATORY PROTOCOL GOING FORWARD:**
- ✅ **ONLY use `scripts/safe-outreach.py`** (bulletproof duplicate prevention + approved template)
- ✅ **ALWAYS use approved template from Airtable SMS Templates table**
- ✅ **ALWAYS check Airtable Agent Responses** (anyone who responded = blacklisted forever)
- ✅ **ALWAYS check GHL "SMS sent" tags**
- ❌ **NEVER use unauthorized message templates**
- ❌ **NEVER use csv-outreach.py or direct-send-approach.py again**
- ❌ **ZERO TOLERANCE for duplicates OR wrong templates**

**🏠 ZILLOW RENT INQUIRY PROTOCOL (2026-02-06):**
- ✅ **ONE MESSAGE ONLY** per listing agent - plain text asking about rent
- ✅ **NO NAMES/COMPANY** - no Luke, LL Ventures, or company identification
- ✅ **RESPONSE HANDLING** - add to Airtable for Luke's review, NEVER send same message again
- ❌ **NEVER send follow-up messages** or repeat the same rent inquiry
- ❌ **NO EXCEPTIONS** - one inquiry per agent per listing, period

**CRITICAL DISTINCTION - TWO DIFFERENT OUTREACH TYPES:**

**TYPE 1: AGENT OUTREACH (Building Agent Network)**
- Purpose: Find new Detroit agents to add to our network
- Frequency: 50 messages/day (7am, 11am, 2pm batches)
- Template: ONLY approved template from Airtable SMS Templates table
- Target: Detroit real estate agents (not specific listing agents)
- Rule: ONE message per contact EVER

**TYPE 2: ZILLOW RENT INQUIRIES (Listing-Specific)**
- Purpose: Get rent info for Section 8 listings without rent data
- Frequency: As needed when new listings found (realtime monitor)
- Template: Plain text "What's the rent?" - NO names, NO company info
- Target: Specific listing agents for specific properties
- Rule: ONE inquiry per agent per listing**FORBIDDEN SCRIPTS:**
- ❌ `zillow-agent-outreach.py` - uses unauthorized "Luke/LL Ventures" template
- ❌ `zillow-daily-outreach.py` - uses unauthorized "Luke/LL Ventures" template

**APPROVED SCRIPTS:**
- ✅ `scripts/safe-outreach.py` - agent network building (Type 1) 
- ✅ `scripts/zillow-rent-inquiry.py` - automated rent inquiries (Type 2)
- ✅ Detroit realtime monitor auto-sends rent inquiries during SMS hours

**BULLETPROOF FEATURES:**
- Airtable approved template retrieval
- Multi-layer duplicate prevention (GHL + Airtable)
- SMS hours enforcement (6am-4pm PST)
- Automatic GHL contact creation for new agents
- Comprehensive inquiry tracking and logging

**LESSON:** Professional reputation depends on NEVER contacting the same person twice. Agent relationships are fragile and valuable.

### COMPLETE SMS OUTREACH WORKFLOW (2026-02-06)

**🌅 DAILY STARTUP PROCESS (7:00 AM PST):**

1. **Find Target Contacts in GHL:**
   - Filter: Tag = "Detroit" AND NOT tag = "SMS sent"
   - Select: 50 contacts

2. **Send Messages (Rate Limited):**
   - Template: Approved message from Airtable base
   - Rate limit: 5 messages every 5 minutes
   - Complete: All 50 within 1 hour

3. **Update GHL After Sending:**
   - Add tag: "SMS sent" to all 50 contacts
   - Move pipeline: "message sent" stage
   - Opportunity name: Contact's actual name

4. **Update Airtable Tracker:**
   - Create ONE record only per day
   - Fields: Date, Messages Sent: 50

**🔄 ONGOING MONITORING (Every 15-30 min, 7 AM - 6 PM PST):**

**Response Processing:**
- Check GHL for new responses
- If response → Import to Airtable, draft reply, status "Review Ready"
- Update GHL pipeline to "responded" category

**Approval Processing:**
- Check Airtable for "Approved" status → Send immediately  
- If feedback given → Revise, set "Review Ready"

**Rejection Handling:**
- "Stop"/"Not interested" → Airtable: "Rejected", GHL: "Blacklist"

**CRITICAL RULES:**
- SMS ONLY between 6 AM - 4 PM PST
- Casual tone, normal capitalization, NO DASHES
- All replies need Luke's approval
- Never mention AI/automation
- Rate limiting prevents API failures

**OPT-OUT / BLACKLIST HANDLING:**
Move to Blacklist (formerly "Not Interested") ONLY when:
- Explicit opt-out: "stop", "remove", "unsubscribe"
- Not in area: "don't work in Detroit", "too far away"

When blacklisting:
1. Add to Agent Responses table BUT:
   - **DO NOT draft a reply** (leave Arthur Draft Reply empty)
   - Set Status = "No Response Needed"
   - Add note explaining why (opt-out or not in area)
2. Move GHL opportunity to Blacklist stage
3. NEVER contact again

**NOT blacklist material** (keep in Response Received):
- "I don't have anything right now" → follow up later
- "Who is this?" → respond and continue
- "Check back in a few weeks" → follow up later
- General declines → still worth nurturing

**CRITICAL - CONTEXT-AWARE RESPONSES:**
- READ THE MESSAGE before drafting a reply
- "What's your email?" → Give them the email (luke@tbcpremium.com)
- "I don't do Detroit" / "Take me off list" → NO RESPONSE, mark as blacklist
- "STOP" → NO RESPONSE, mark as blacklist, NO DRAFT
- Never use templated "awesome, whats the address" when it doesn't fit
- Think like a human - would this response make sense in a real conversation?

**TWO-PART SYSTEM - ALWAYS DO BOTH:**
- **Airtable**: Track responses, drafts, approvals
- **GHL Pipeline**: Track opportunity stages (Messaged → Response Received → Not Interested, etc.)
- When status changes, update BOTH systems. Never update one without the other.

**CRITICAL: ALWAYS UPDATE OUTREACH TRACKER**
When adding new responses to Agent Responses table:
1. Add records to Agent Responses table
   - **Include Phone number** (pull from GHL contact)
   - Include GHL Contact ID
   - Include Agent Name, Message, Draft Reply
2. **IMMEDIATELY update Outreach Tracker** (tblJJ6aYNQTKp5FMv)
   - Increment "Responses Received" for today's date
   - If no record for today, create one first
3. **VERIFY the update completed** - check the response status code
4. Never forget step 2 - Luke checks this for metrics

**I KEEP MISSING THIS** - Every single time I add a response, I MUST:
1. Update Airtable (Agent Responses table)
2. Update Outreach Tracker (COUNT actual records, don't increment)
3. **Move GHL opportunity from "Messaged" to "Response Received"** (or "Not Interested" if declining)

**Pipeline Stage IDs (Detroit Agent Acquisition):**
- Messaged: faf4f864-d3cc-4b89-a153-58b09e5757fb
- Response Received: 3c1b7c53-c28d-4907-a350-35b98f39fd1e
- Not Interested: 846fb1e6-79a8-4667-b112-b475082a23e2

---

## People

### Luke Fontaine (Boss)
- Serial entrepreneur, operator type
- Runs LL Ventures (Section 8 real estate)
- Partners: Mikey, Nate
- Primary market: Detroit
- Girlfriend: Alyse
- Twin brother: Ike
- Night owl, works late

---

## Cost Efficiency (2026-02-05)

**Default model switched to Sonnet** to reduce costs (was $362/day on Opus).

- **Sonnet**: Default for 90% of tasks
- **Opus**: Only escalate for complex reasoning, then return to Sonnet
- **Target**: <$100/day
- **Protocol**: See `brain/efficiency-protocol.md`

---

## Recent Major Projects (2026-02-06)

### Amy Sangster Instagram Intelligence Report - COMPLETED
- **Google Sheet:** https://docs.google.com/spreadsheets/d/1SssG3FqEySVKcMspfwM_36m67OMH6q1mlKEDH_EqJmg/edit
- **Profile:** @amysangster53 (96.2K followers, 3,423 posts)
- **Analysis:** 5 comprehensive tabs (Top Posts, Top Reels, Expert Insights, All Posts, Followers)
- **Key Discovery:** Bank job → $10M transformation + free value offers = viral formula
- **Performance:** 8.2% engagement rate (vs 3-5% industry standard)
- **Strategic Value:** Complete blueprint for replicating her viral success patterns

## Active Systems

- **Zillow Daily Scrape**: Cron every 30min, finds new Section 8 listings
- **Cold Outreach**: 50 messages/day to Detroit agents (7am daily) - Complete automated workflow
- **Response Monitoring**: Every 15-30 min, check for replies, draft responses - 14% conversion rate achieved
- **Crypto Monitor**: Paper trading, every 30 min price checks
- **GHL Webhook**: Arthur workflow captures SMS replies → Airtable (Detroit + "SMS sent" tags only)

---

## Key Resources

- GHL Location: a0xDUfSzadt256BbUcgz
- Airtable Base: appzBa1lPvu6zBZxv (Arthur Base)
- Detroit Listings Sheet: https://docs.google.com/spreadsheets/d/1TkM54EN1EF_H9NW5RpoxhRaZd0qYe7NjAwwfvuLuIvg
- Detroit Agents Sheet: https://docs.google.com/spreadsheets/d/1ykBgBx3oYIagPLp5dWYMbPrJYQFkTo8o2W-2OObsiHk
