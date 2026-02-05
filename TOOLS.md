# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## Cameras
*(None configured yet)*

## SSH
*(None configured yet)*

## TTS (ElevenLabs — Daniel Voice)
- **Voice**: Daniel (British broadcaster) — ID: `onwK4e9ZLuTAKqWW03F9`
- **Model**: eleven_turbo_v2_5 (faster)
- **Settings**: stability 0.3, similarity 0.8, speed 1.15x
- **Previous voices**: 
  - JARVIS MCU clone (staticky): `3MYE8EKer63bPDk874wF`
  - George (JARVIS-style): `JBFqnCBsd6RMkjVDRZzb`
  - JARVIS library: `wDsJlOXPqcvIUKdLXjDs`
- **Credentials**: `source ~/.config/elevenlabs/secrets.env`
- **Speak (generate audio)**: `bash ~/.openclaw/workspace/scripts/speak.sh "text" [--play] [--send +1234567890] [--file out.mp3]`
  - `--play` plays on Mac speakers
  - `--send +13397931673` sends as WhatsApp voice note to Luke
  - `--file /tmp/output.mp3` saves to specific path
- **When to use voice**: Send voice replies when Luke sends a voice note, for important alerts, or when asked to "say" something
- **Status**: ACTIVE (Creator tier, 137k chars/month)

## Email Access
- **Email**: arthur@blackboxalchemist.com
- **Read inbox**: `himalaya envelope list` to check inbox, `himalaya message read <id>` to read
- **Send email (quick)**: `bash ~/. openclaw/workspace/scripts/send-email.sh <to> <subject> <body>`
  - Example: `bash ~/.openclaw/workspace/scripts/send-email.sh luke@blackboxalchemist.com "Hello" "Hey Luke!"`
- **Status**: Active

## Google Workspace (arthur@blackboxalchemist.com)
- **Token refresh** (do this before any API call): `TOKEN=$(bash ~/.openclaw/workspace/scripts/google-token.sh)`
- **Helper scripts** (handle token refresh automatically):
  - **Send email**: `bash ~/.openclaw/workspace/scripts/send-email.sh <to> <subject> <body>`
  - **Create event**: `bash ~/.openclaw/workspace/scripts/create-event.sh <title> <start_iso> <end_iso> [attendees_comma_separated]`
    - Example: `bash ~/.openclaw/workspace/scripts/create-event.sh "Meeting" "2026-02-05T14:00:00-08:00" "2026-02-05T15:00:00-08:00" "luke@blackboxalchemist.com"`
    - Dates use ISO 8601 with offset. PST = -08:00, PDT = -07:00
- **Calendar**: Read events via `gcalcli agenda` or the Google Calendar API
- **Drive**: Google Drive API — list, upload, download files
  - `TOKEN=$(bash ~/.openclaw/workspace/scripts/google-token.sh)`
  - `curl -H "Authorization: Bearer $TOKEN" "https://www.googleapis.com/drive/v3/files?pageSize=10"`
- **Sheets**: Create and edit Google Spreadsheets
  - `bash ~/.openclaw/workspace/scripts/create-sheet.sh "Title" "luke@blackboxalchemist.com"`
  - Write data: `curl -X PUT "https://sheets.googleapis.com/v4/spreadsheets/{ID}/values/Sheet1!A1?valueInputOption=USER_ENTERED" -H "Authorization: Bearer $TOKEN" -d '{"values":[["Col1","Col2"],["val1","val2"]]}'`
- **Docs**: Create and edit Google Documents
  - Create: `curl -X POST "https://docs.googleapis.com/v1/documents" -H "Authorization: Bearer $TOKEN" -d '{"title":"Doc Title"}'`
  - Insert text: `curl -X POST "https://docs.googleapis.com/v1/documents/{ID}:batchUpdate" -H "Authorization: Bearer $TOKEN" -d '{"requests":[{"insertText":{"location":{"index":1},"text":"Content"}}]}'`
- **Gmail API**: For programmatic email (read + send). For daily use prefer the helper scripts above.
- **Status**: ACTIVE — Calendar, Drive, Gmail all authorized

## Apify (Web Scraping & Automation)
- **Account**: olive_omelet (Luke Fontaine)
- **Credentials**: `source ~/.config/apify/secrets.env`
- **Run any actor**: `bash ~/.openclaw/workspace/scripts/apify-run.sh <actor-id> '<input-json>' [timeout]`
- **Common actors**:
  - `apify/website-content-crawler` — scrape any website for content
  - `apify/google-search-scraper` — Google search results
  - `apify/web-scraper` — general scraper with custom logic
  - `apify/instagram-scraper` — Instagram data
  - `epctex/realtor-scraper` — Realtor.com (already in account)
  - `maxcopell/zillow-detail-scraper` — Zillow (already in account)
- **Search for actors**: see `apify` skill for full API reference and store search
- **Status**: ACTIVE

## Second Brain Status
- **ISSUE IDENTIFIED**: Was not updating in real-time during conversations
- **FIXED**: Now contains all mentioned people (Holly, Orie, Ike, Alyse, business contacts)
- **ONGOING**: Will automatically update during every conversation going forward

---

## Airtable API
- **API Key**: `~/.config/airtable/secrets.env`
- **Bases**: 105 bases including Finance Alchemy, My Brain, Black Box Agency, BBA CRM, etc.
- **List bases**: `curl -H "Authorization: Bearer $AIRTABLE_API_KEY" "https://api.airtable.com/v0/meta/bases"`
- **List tables**: `curl -H "Authorization: Bearer $AIRTABLE_API_KEY" "https://api.airtable.com/v0/meta/bases/{baseId}/tables"`
- **Get records**: `curl -H "Authorization: Bearer $AIRTABLE_API_KEY" "https://api.airtable.com/v0/{baseId}/{tableName}"`
- **Docs**: https://airtable.com/developers/web/api/introduction
- **Status**: ACTIVE

---

## CoinMarketCap API (Market Data)
- **API Key**: `~/.config/coinmarketcap/secrets.env`
- **Plan**: Hobby ($29/mo) - 110K credits/month
- **Get prices**: `curl -s -H "X-CMC_PRO_API_KEY: $CMC_API_KEY" "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH"`
- **Docs**: https://coinmarketcap.com/api/documentation/v1/
- **Status**: ACTIVE

---

## Coinbase Trading (Paper Trading Phase)
- **API Credentials**: `~/.config/coinbase/secrets.env`
- **Trading Script**: `~/.openclaw/workspace/scripts/coinbase-trading.py`
- **Paper Trading Data**: `~/.openclaw/workspace/data/paper_trading.json`
- **Trading Sheet**: https://docs.google.com/spreadsheets/d/1bURjg0SJlcyq2We6r8osWE0pc_s9QPbk7Fw2qeJc38w
- **Monitoring Cron**: Every 30 min, checks positions, executes trades
- **Phase**: Paper trading until 2026-02-18, then evaluate for live trading
- **Rules**: Max 5% per trade, 3% stop-loss, 10% take-profit, BTC/ETH only

---

---

## HeyGen API (AI Video Generation)
- **API Key**: `~/.config/heygen/secrets.env`
- **Create video**: POST to `https://api.heygen.com/v2/video/generate`
- **Check status**: GET `https://api.heygen.com/v1/video_status.get?video_id=<id>`
- **List avatars**: GET `https://api.heygen.com/v2/avatars`
- **List voices**: GET `https://api.heygen.com/v2/voices`
- **Docs**: https://docs.heygen.com/
- **Status**: ACTIVE

---

## Zapier AI Actions
- **API Key**: `~/.config/zapier/secrets.env`
- **Configure actions**: https://actions.zapier.com/custom/actions/
- **List actions**: `curl -s -H "x-api-key: $ZAPIER_API_KEY" "https://actions.zapier.com/api/v1/exposed/"`
- **Run action**: `curl -X POST -H "x-api-key: $ZAPIER_API_KEY" "https://actions.zapier.com/api/v1/exposed/<action_id>/execute/" -d '{"instructions": "..."}'`
- **Status**: ACTIVE (needs actions enabled in dashboard)

---

## Replicate (AI Model Platform)
- **API Token**: `~/.config/replicate/secrets.env`
- **Account**: tbcagent
- **Run any model**: POST to `https://api.replicate.com/v1/predictions`
- **Popular models**:
  - `stability-ai/sdxl` — Image generation (SDXL)
  - `black-forest-labs/flux-schnell` — Fast image gen
  - `nightmareai/real-esrgan` — Image upscaling
  - `lucataco/remove-bg` — Background removal
  - `meta/llama-2-70b` — Open-source LLM
- **Docs**: https://replicate.com/docs
- **Status**: ACTIVE

---

*Updated 2026-02-04: Added Coinbase trading, CoinMarketCap, Zapier, Replicate*
---

## Asana (Project Management)
- **Account**: luke@tbcpremium.com (Luke Fontaine)
- **Workspace**: tbcpremium.com (GID: 1210382351336303)
- **API Token**: `~/.config/asana/secrets.env`
- **Get tasks**: `curl -H "Authorization: Bearer $ASANA_API_TOKEN" "https://app.asana.com/api/1.0/tasks?project=<project_gid>"`
- **List projects**: `curl -H "Authorization: Bearer $ASANA_API_TOKEN" "https://app.asana.com/api/1.0/projects?workspace=1210382351336303"`
- **Docs**: https://developers.asana.com/docs
- **Status**: ACTIVE
