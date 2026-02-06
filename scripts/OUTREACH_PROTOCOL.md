# CRITICAL OUTREACH PROTOCOL
## NEVER SEND DUPLICATES - MANDATORY COMPLIANCE

### PROTOCOL VIOLATION INCIDENT: 2026-02-06
**WHAT HAPPENED:**
- Tim Bender (+15176053666) was messaged 3 times total
- 2/5: First message → Responded "I do not."  
- 2/6: Messaged AGAIN (twice) → Complained about duplicates
- **CRITICAL FAILURE:** Damaged relationship with real estate agent

### ROOT CAUSES:
1. ❌ Scripts only checked GHL "SMS sent" tag, not Airtable responses
2. ❌ No verification against Agent Responses table  
3. ❌ Faulty loop logic in CSV processing script
4. ❌ No cross-reference between systems

### MANDATORY PROTOCOL (NEVER DEVIATE):

#### BEFORE EVERY SINGLE MESSAGE:
1. ✅ Check Airtable Agent Responses table (anyone who responded = BLACKLISTED FOREVER)
2. ✅ Check GHL "SMS sent" tag  
3. ✅ Verify phone number not in blacklist
4. ✅ Only proceed if ALL checks pass

#### APPROVED SCRIPT ONLY:
- **File:** `scripts/safe-outreach.py`
- **Features:** Multi-layer duplicate prevention
- **Blocks:** All previously contacted numbers
- **Status:** MANDATORY for all outreach

#### FORBIDDEN ACTIONS:
- ❌ NEVER use csv-outreach.py again
- ❌ NEVER use direct-send-approach.py again  
- ❌ NEVER send without safety checks
- ❌ NEVER ignore Agent Responses table

### BUSINESS IMPACT:
- **Risk:** Damaged relationships with real estate agents
- **Trust:** Professional reputation at stake
- **Legal:** Potential compliance violations
- **Revenue:** Lost referral opportunities

### ENFORCEMENT:
- **Only safe-outreach.py is authorized**
- **All other scripts are deprecated** 
- **Zero tolerance for duplicates**
- **Immediate stop if any violation detected**

---
*This protocol is NON-NEGOTIABLE*  
*Updated: 2026-02-06 after critical incident*