# Agent Detroit - Real Estate Memory

## Current Status
- **Market**: Detroit Section 8 properties
- **Target**: 25-30 deals/month
- **Revenue**: $8-10K per home placed
- **Partners**: Mikey, Nate
- **Current Pipeline**: 18 deals in contract

## Active Systems
- **Realtime Monitor**: Every 15min Zillow scraping
- **Detroit Listings Sheet**: https://docs.google.com/spreadsheets/d/1TkM54EN1EF_H9NW5RpoxhRaZd0qYe7NjAwwfvuLuIvg
- **Detroit Agents Sheet**: https://docs.google.com/spreadsheets/d/1ykBgBx3oYIagPLp5dWYMbPrJYQFkTo8o2W-2OObsiHk

## Critical System Issues
- **Apify Monthly Limit**: EXCEEDED (usage: 28.65 / 25 GB)
- **Impact**: Realtime monitor disabled until Feb 24, 2026
- **Missed Properties**: 2 properties discovered manually (should have been auto-detected)
- **Action Needed**: Luke to upgrade Apify plan or wait for reset

## Agent Network Progress
- **Total Detroit Agents**: 1,500+ in GHL database
- **Daily Outreach**: 50 messages/day (7am, 11am, 2pm batches)
- **Response Rate**: ~3-5% typical for cold outreach
- **Current Status**: Active outreach ongoing

## Recent Critical Fixes (2026-02-06)
- ❌ **DUPLICATE MESSAGING PREVENTED**: Multi-layer duplicate prevention implemented
- ✅ **APPROVED TEMPLATES ONLY**: Airtable SMS Templates table enforced
- ✅ **SAFE SCRIPTS DEPLOYED**: safe-outreach.py and zillow-rent-inquiry.py bulletproof
- ❌ **FORBIDDEN SCRIPTS**: zillow-agent-outreach.py (wrong template), csv-outreach.py (no duplicate check)

## Search Parameters (FIXED 2026-02-08)
- **Bounds**: North 42.6, South 42.1, East -82.8, West -83.5 (EXPANDED)
- **Keywords**: ALL properties (removed "section 8" filter)  
- **Frequency**: Every 15min (increased from 30min)
- **Alerts**: Instant WhatsApp for ALL new properties

## Data Storage
- **Listings**: Google Sheets (auto-updated)
- **Agents**: GHL + Google Sheets  
- **Responses**: Airtable Agent Responses table
- **Scripts**: 18 monitoring/outreach scripts available

## Key Metrics
- **Properties Tracked**: 200+ active listings
- **Agent Database**: 1,500+ Detroit agents
- **Outreach Volume**: 50 messages/day
- **Pipeline**: 18 contracts signed ($149.5K gross revenue)

## Memory Accuracy
- **Status**: ✅ ACCURATE - All systems properly tracked
- **Last Audit**: 2026-02-11 18:45 PST
- **Next Review**: Daily via heartbeat monitoring

## Critical Protocols
1. **ONE MESSAGE PER AGENT EVER** (agent outreach)
2. **ONE INQUIRY PER LISTING** (rent inquiries)
3. **ONLY APPROVED TEMPLATES** from Airtable
4. **SMS HOURS ONLY**: 6am-4pm PST
5. **MULTI-LAYER DUPLICATE PREVENTION** mandatory