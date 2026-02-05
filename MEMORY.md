# MEMORY.md - Arthur's Long-Term Memory

## Critical Learnings

### SMS Acquisition System (2026-02-05)

**TWO SEPARATE WORKFLOWS - Never confuse them:**

1. **Zillow Agent Responses** = We reached out about a SPECIFIC listing
   - We ALREADY HAVE: address, photos, asking price, Zillow URL
   - **CHECK ZILLOW DESCRIPTION FOR RENT FIRST** - Often already listed there!
   - My ONLY job: Confirm rent amount (but check description before asking)
   - Once rent confirmed → Fill rent column → Status = "Deal Review Ready" → Clear draft
   - NEVER ask for address, photos, or asking price (we have them from Zillow!)
   - If agent says "rent is in description" → SCRAPE IT, don't ask them again!

2. **Agent Responses (Cold Outreach)** = General "do you have anything?" messages
   - We have NOTHING
   - Need to discover: address, rent, asking price
   - Keep conversation going until we have all info

**HARD RULES:**
- SMS ONLY between 6 AM - 4 PM PST
- Casual tone, normal capitalization, NO DASHES ever
- All replies need Luke's approval
- Never mention AI/automation
- **NEVER say "cash" or "quick close"** - sounds like wholesaler spam
- Respond to what they said, don't repeat the same pitch

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

## Active Systems

- **Zillow Daily Scrape**: Cron every 30min, finds new Section 8 listings
- **Cold Outreach**: 30 messages/day to Detroit agents (9am, 12pm, 3pm)
- **Response Monitoring**: Every 15-30 min, check for replies, draft responses
- **Crypto Monitor**: Paper trading, every 30 min price checks

---

## Key Resources

- GHL Location: a0xDUfSzadt256BbUcgz
- Airtable Base: appzBa1lPvu6zBZxv (Arthur Base)
- Detroit Listings Sheet: https://docs.google.com/spreadsheets/d/1TkM54EN1EF_H9NW5RpoxhRaZd0qYe7NjAwwfvuLuIvg
- Detroit Agents Sheet: https://docs.google.com/spreadsheets/d/1ykBgBx3oYIagPLp5dWYMbPrJYQFkTo8o2W-2OObsiHk
