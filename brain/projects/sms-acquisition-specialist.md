# SMS Acquisition Specialist - Complete Workflow

**Created:** 2026-02-05  
**Status:** ACTIVE  
**Type:** Daily acquisition system  

---

## TWO SEPARATE WORKFLOWS

### 1. Zillow Daily Scrape (Deal-Specific Outreach)
**Table:** Zillow Agent Responses (tblMOpm7a6Lqiwahu)

**What we ALREADY HAVE from Zillow:**
- ✅ Property address
- ✅ Asking price
- ✅ Photos
- ✅ Zillow URL
- ✅ Beds/baths/details

**My ONLY job:**
- Confirm there's a Section 8 tenant
- Get the RENT AMOUNT if unclear from listing

**When agent confirms rent:**
1. Fill "Rent Amount" column with confirmed rent
2. Fill "Asking Price" from Zillow/Google Sheet if not already there
3. Fill "Zillow URL" if not already there
4. Clear "Arthur Draft Reply" (no message needed)
5. Set Status = "Deal Review Ready"
6. Add note: "DEAL READY: [Address] | Rent $X/mo | Asking $Y"

**DO NOT ask for:**
- ❌ Address (we have it from Zillow)
- ❌ Photos (we have them from Zillow)
- ❌ Asking price (we have it from Zillow)

**Only ask follow-up questions when:**
- Rent amount is unclear
- Need to confirm tenant is Section 8
- Agent's response is ambiguous

---

### 2. Cold Outreach Campaign (General Prospecting)
**Table:** Agent Responses (tblwRwbKogqQnRXtC)

**What we DON'T have:**
- ❌ No specific property
- ❌ No address
- ❌ No rent info
- ❌ No asking price

**My job:**
- Send cold messages to Detroit agents asking if they have Section 8 deals
- When they respond, progressively gather: ADDRESS → RENT → ASKING PRICE
- Once we have all 3 → analyze buy box → Deal Review Ready

**Conversation flow:**
1. Initial: "Do you have any Section 8 tenanted rentals?"
2. If yes → "What's the address?"
3. Got address → "What's the rent amount?"
4. Got rent → "What's the asking price?"
5. Got all 3 → Fill columns → Analyze buy box → Deal Review Ready

**When deal is complete:**
1. Fill "Property Address" column
2. Fill "Rent Amount" column
3. Fill "Asking Price" column
4. Calculate "Buy Box Viability"
5. Update "Notes" with: Address | Rent | Asking | Target | Discount % | Likelihood
6. Clear "Arthur Draft Reply" (no more messages needed)
7. Set Status = "Deal Review Ready"

**Approved initial template:**
```
Hey [First Name], just following up. Do you have any Section 8 tenanted rentals in Detroit right now? Looking to buy another 2-3 this month.
```

**Follow-up templates:**
- Has something: "What's the address?"
- Got address: "What's the rent on that one?"
- Got rent: "And what are you asking for it?"
- Not interested: "No worries, keep me in mind if anything comes up"

---

## SMS RULES (HARD-CODED)

1. **Hours:** Only send SMS between 6 AM - 4 PM PST
2. **Tone:** Casual, human, no dashes or weird punctuation
3. **Capitalization:** Normal (not all lowercase)
4. **Approval:** All replies require Luke's approval before sending
5. **Never mention:** AI, automation, bots

---

## AIRTABLE STRUCTURE

### Zillow Agent Responses
| Field | Purpose |
|-------|---------|
| Agent Name | From Zillow listing |
| Phone | Agent contact |
| Property Address | FROM ZILLOW - don't ask |
| Agent Message | Their response |
| Rent Amount | FILL THIS when confirmed |
| Asking Price | FROM ZILLOW - pull from sheet |
| Arthur Draft Reply | Clear when deal ready |
| Status | Pending Review → Deal Review Ready |
| Zillow URL | FROM ZILLOW - pull from sheet |
| Luke Feedback | For revision requests |
| Notes | "DEAL READY" summary |

### Agent Responses (Cold Outreach)
| Field | Purpose |
|-------|---------|
| Agent Name | From GHL |
| Phone | Agent contact |
| Property Address | Fill when they give address |
| Agent Message | Their response |
| Rent Amount | Fill when confirmed |
| Asking Price | Fill when they tell us |
| Arthur Draft Reply | My suggested reply (clear when deal ready) |
| Status | Pending Review → Approved → Sent → Deal Review Ready |
| Buy Box Viability | Auto-calculated when we have rent + asking |
| GHL Contact ID | For sending replies |
| Luke Feedback | For revision requests |
| Notes | Deal summary with buy box analysis |

---

## STATUS FLOW

### Zillow Agent Responses:
```
Pending Review → Needs Revision → Pending Review → Deal Review Ready
                     ↓
              (if no deal) → No Deal
```

### Cold Outreach:
```
Pending Review → Needs Revision → Pending Review → Approved → Sent
```

---

## CRON JOBS

| Job | Schedule | Action |
|-----|----------|--------|
| Zillow: Send Approved | */15 6-15 * * * | Send approved replies |
| Zillow: Check Responses | */30 6-16 * * * | Pull new responses, draft replies |
| Cold: Send Approved | */15 6-15 * * * | Send approved replies |
| Cold: Check Responses | */30 6-16 * * * | Pull new responses, draft replies |
| Cold: Daily Messages | 0 9,12,15 * * 1-5 | Send 10 messages at 9am/12pm/3pm |

---

## BUY BOX REFERENCE

| Monthly Rent | Target Price | Max Price |
|--------------|--------------|-----------|
| $900 | ~$45K | ~$50K |
| $1,000 | $51K | $55K |
| $1,100 | $58.5K | $62K |
| $1,200 | $65.5K | $70K |
| $1,300 | $74.5K | $79K |
| $1,400 | $81.5K | $86K |
| $1,500 | $87.5K | $92K |

---

## KEY LEARNINGS

1. **Zillow = we have everything except rent confirmation**
2. **Cold outreach = we have nothing, need to discover deals**
3. **Never ask for info we already have**
4. **Once rent confirmed on Zillow deal → Deal Review Ready, no draft needed**
5. **Pull asking prices from Google Sheet when needed**
6. **SMS hours are sacred: 6 AM - 4 PM PST only**

---

## RESOURCES

- GHL Location: a0xDUfSzadt256BbUcgz
- Detroit Tag: YwjFycYqAdyZnkCuufXv
- Pipeline: Detroit Agent Acquisition (BKe2BFND6pmC5klqMbl8)
- Airtable Base: Arthur Base (appzBa1lPvu6zBZxv)
- Google Sheet: https://docs.google.com/spreadsheets/d/1TkM54EN1EF_H9NW5RpoxhRaZd0qYe7NjAwwfvuLuIvg
