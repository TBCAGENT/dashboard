# Real Estate Agent Memory Bank

## Market Analysis Expertise

### Detroit Section 8 Market Patterns
- **Peak listing times**: Mondays 9-11 AM, Thursdays 2-4 PM
- **Price ranges**: $15K-$90K for Section 8 properties
- **Rent multipliers**: Target 1.5-2.0% monthly rent to purchase price
- **Hot zones**: 48213, 48224, 48235 ZIP codes show highest ROI

### Agent Relationship Database
```json
{
  "active_contacts": 89,
  "response_rates": {
    "tier_1_agents": 23.4,
    "tier_2_agents": 14.8,
    "tier_3_agents": 8.2
  },
  "best_performing_agents": [
    {
      "name": "Jennifer Smith", 
      "phone": "+1234567890",
      "response_rate": 45.2,
      "deals_closed": 7
    }
  ]
}
```

## SMS Outreach Mastery

### Approved Templates
- **Standard outreach**: "Hey [First Name], just following up. Do you have any Section 8 tenanted rentals in Detroit right now? Looking to buy another 2-3 this month."
- **Never use**: "Hi, I help investors buy section 8 properties..." (Luke/company branding)

### Critical Protocols
1. **NEVER contact the same person twice** - bulletproof duplicate prevention mandatory
2. **Only SMS 6am-4pm PST** - respect business hours
3. **Check Agent Responses table** before every send
4. **Rate limit**: 5 messages every 5 minutes maximum

### Response Processing Patterns
- "I do not" / "Not interested" = Blacklist immediately, no response
- "Don't work in Detroit" = Blacklist, add note
- "Check back in a few weeks" = Schedule follow-up, don't blacklist
- "What's your email?" = Provide luke@tbcpremium.com

## Property Evaluation Criteria

### Hot Deal Identification
**Must have ALL criteria:**
- Section 8 tenant confirmed
- Monthly rent amount confirmed 
- Purchase price under $60K
- Rent-to-price ratio > 1.5%
- Property condition: livable

### Zillow Scraping Expertise
- **Search bounds**: North 42.6, South 42.1, East -82.8, West -83.5
- **Frequency**: Every 15 minutes during market hours
- **Keywords**: Remove "section 8" requirement - catch all properties
- **Instant alerts**: For ANY new properties, filter manually

## Lessons Learned

### CRITICAL FAILURES TO NEVER REPEAT
1. **Tim Bender Incident (2026-02-06)**: Contacted 3 times, damaged relationship
   - **Root cause**: Scripts bypassed duplicate checking
   - **Fix**: Only use safe-outreach.py with bulletproof prevention

2. **Wrong Template Usage (2026-02-06)**: Used unauthorized template for 152 messages
   - **Sent**: "Hi {name}, I help investors buy section 8 properties..."
   - **Should use**: Approved template from Airtable only
   - **Impact**: Wrong brand voice, professional damage

### Success Patterns
- **Best response times**: Tuesday-Thursday, 10am-2pm PST
- **Follow-up timing**: If no response in 48 hours, one gentle follow-up max
- **Relationship building**: Consistent, professional tone generates trust

## Current Status
- **Active monitoring**: Detroit market every 15 minutes
- **Outreach campaign**: 50 messages/day, 14.2% response rate
- **System blocker**: Apify monthly limit exceeded (need backup solution)
- **Performance**: 89% success rate, 0% duplicate contacts since protocol fix