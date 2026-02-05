#!/bin/bash
# Run an Apify actor and return results
# Usage: apify-run.sh <actor-id> '<input-json>' [timeout_secs]
# Example: apify-run.sh "apify/website-content-crawler" '{"startUrls":[{"url":"https://example.com"}],"maxCrawlPages":3}'
# Example: apify-run.sh "apify/google-search-scraper" '{"queries":"AI news","maxPagesPerQuery":1}' 60

ACTOR="$1"
INPUT="$2"
TIMEOUT="${3:-120}"

if [ -z "$ACTOR" ] || [ -z "$INPUT" ]; then
  echo "Usage: apify-run.sh <actor-id> '<input-json>' [timeout_secs]"
  echo ""
  echo "Popular actors:"
  echo "  apify/website-content-crawler  — Crawl websites for content"
  echo "  apify/google-search-scraper    — Google search results"
  echo "  apify/web-scraper              — General web scraper"
  echo "  apify/cheerio-scraper          — Fast HTML scraper"
  echo "  apify/instagram-scraper        — Instagram data"
  exit 1
fi

source ~/.config/apify/secrets.env

# Convert actor-id format: "apify/name" -> "apify~name"
ACTOR_SLUG=$(echo "$ACTOR" | sed 's|/|~|g')

echo "Running $ACTOR (timeout: ${TIMEOUT}s)..." >&2

RESULT=$(curl -s -X POST \
  "https://api.apify.com/v2/acts/${ACTOR_SLUG}/run-sync-get-dataset-items?token=$APIFY_API_TOKEN&timeout=$TIMEOUT" \
  -H "Content-Type: application/json" \
  -d "$INPUT" 2>&1)

# Check if it's valid JSON array (success) or error
echo "$RESULT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if isinstance(data, list):
        print(f'Success: {len(data)} results', file=sys.stderr)
        print(json.dumps(data, indent=2))
    elif isinstance(data, dict) and 'error' in data:
        print(f'Error: {data[\"error\"].get(\"message\", data[\"error\"])}', file=sys.stderr)
        sys.exit(1)
    else:
        print(json.dumps(data, indent=2))
except json.JSONDecodeError:
    raw = sys.stdin.read()
    print(f'Non-JSON response', file=sys.stderr)
    print(raw)
    sys.exit(1)
"
