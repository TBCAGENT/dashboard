---
name: apify
description: |
  Run Apify actors and scrapers to extract data from any website. Use this skill when you need to scrape websites, extract structured data, search Google, scrape social media, or automate web tasks.
compatibility: Requires APIFY_API_TOKEN
metadata:
  author: workspace
  version: "1.0"
---

# Apify — Web Scraping & Automation

Run any Apify actor to scrape websites, extract data, and automate web tasks. Arthur's account has access to 27+ proxy servers and the full Apify Store.

## Setup

```bash
source ~/.config/apify/secrets.env
```

## Quick Start — Run Any Actor

```bash
# Run an actor and wait for results
bash ~/.openclaw/workspace/scripts/apify-run.sh <actor-id> '<input-json>'

# Example: Scrape a website
bash ~/.openclaw/workspace/scripts/apify-run.sh "apify/website-content-crawler" '{"startUrls":[{"url":"https://example.com"}],"maxCrawlPages":5}'

# Example: Google search
bash ~/.openclaw/workspace/scripts/apify-run.sh "apify/google-search-scraper" '{"queries":"best AI tools 2026","maxPagesPerQuery":1}'
```

## Useful Actors (from Apify Store)

### Web Scraping
- `apify/website-content-crawler` — Crawl any website, extract text/markdown
- `apify/web-scraper` — General web scraper with custom page functions
- `apify/cheerio-scraper` — Fast HTML scraper (no browser needed)
- `apify/puppeteer-scraper` — Browser-based scraper for JS-heavy sites

### Search
- `apify/google-search-scraper` — Google search results
- `apify/google-maps-scraper` — Google Maps places & reviews

### Social Media
- `apify/instagram-scraper` — Instagram profiles, posts, stories
- `apify/twitter-scraper` — Twitter/X posts and profiles
- `apify/youtube-scraper` — YouTube videos, channels, comments
- `apify/tiktok-scraper` — TikTok videos and profiles
- `apify/facebook-posts-scraper` — Facebook page posts

### Business Data
- `apify/linkedin-profile-scraper` — LinkedIn profiles
- `epctex/realtor-scraper` — Realtor.com listings (already in account)
- `maxcopell/zillow-detail-scraper` — Zillow property details (already in account)

### Utilities
- `apify/ai-content-extractor` — Extract structured data using AI
- `lukaskrivka/article-extractor-smart` — Clean article text extraction

## Direct API Usage

All API calls use: `https://api.apify.com/v2`
Auth: `?token=$APIFY_API_TOKEN` or header `Authorization: Bearer $APIFY_API_TOKEN`

### Run Actor (synchronous — wait for results)
```bash
source ~/.config/apify/secrets.env
curl -s -X POST "https://api.apify.com/v2/acts/apify~website-content-crawler/run-sync-get-dataset-items?token=$APIFY_API_TOKEN&timeout=120" \
  -H "Content-Type: application/json" \
  -d '{"startUrls":[{"url":"https://example.com"}],"maxCrawlPages":3}'
```

### Run Actor (async — for long jobs)
```bash
# Start the run
RUN_ID=$(curl -s -X POST "https://api.apify.com/v2/acts/apify~website-content-crawler/runs?token=$APIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"startUrls":[{"url":"https://example.com"}]}' | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])")

# Check status
curl -s "https://api.apify.com/v2/actor-runs/$RUN_ID?token=$APIFY_API_TOKEN" | python3 -c "import sys,json; d=json.load(sys.stdin)['data']; print(d['status'])"

# Get results when done
curl -s "https://api.apify.com/v2/actor-runs/$RUN_ID/dataset/items?token=$APIFY_API_TOKEN"
```

### Search Apify Store for Actors
```bash
curl -s "https://api.apify.com/v2/store?token=$APIFY_API_TOKEN&search=<query>&limit=5" | python3 -c "
import sys, json
for a in json.load(sys.stdin)['data']['items']:
    print(f'{a[\"username\"]}/{a[\"name\"]} — {a.get(\"title\",\"\")}')
"
```

## Decision Guide

| Need | Actor to use |
|------|-------------|
| Scrape a specific URL for content | `apify/website-content-crawler` |
| Search Google for something | `apify/google-search-scraper` |
| Get data from a JS-heavy site | `apify/puppeteer-scraper` |
| Extract article text cleanly | `lukaskrivka/article-extractor-smart` |
| Scrape Instagram/Twitter/etc | `apify/<platform>-scraper` |
| Real estate data | `epctex/realtor-scraper` or `maxcopell/zillow-detail-scraper` |
| Custom scraping logic | `apify/web-scraper` with custom pageFunction |

## Notes
- Sync runs timeout after 300s by default. Use `&timeout=60` for faster fails.
- For large scrapes, use async runs and poll for completion.
- Account has proxy access (27 US proxies + Google SERP proxies).
- Results are returned as JSON arrays of objects.
