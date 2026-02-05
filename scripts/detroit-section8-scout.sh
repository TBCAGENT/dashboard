#!/bin/bash
# Detroit Section 8 Deal Scout
# Runs daily to find new Section 8 listings and update the master spreadsheet

set -e

WORKSPACE="/Users/lukefontaine/.openclaw/workspace"
SHEET_ID="1TkM54EN1EF_H9NW5RpoxhRaZd0qYe7NjAwwfvuLuIvg"
TRACKER_FILE="$WORKSPACE/data/detroit-section8-zpids.json"
TODAY=$(date +%Y-%m-%d)

# Ensure data directory exists
mkdir -p "$WORKSPACE/data"

# Load Apify credentials
source ~/.config/apify/secrets.env

echo "=== Detroit Section 8 Scout - $TODAY ==="

# Step 1: Run Zillow search scraper
echo "Step 1: Scraping Zillow for Section 8 listings..."

SEARCH_URL='https://www.zillow.com/detroit-mi/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22days%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22keywords%22%3A%7B%22value%22%3A%22section%208%22%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A17762%2C%22regionType%22%3A6%7D%5D%2C%22mapZoom%22%3A11%7D'

RUN_RESPONSE=$(curl -s -X POST "https://api.apify.com/v2/acts/maxcopell~zillow-scraper/runs?token=$APIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$SEARCH_URL\"}")

RUN_ID=$(echo "$RUN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])")
DATASET_ID=$(echo "$RUN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['defaultDatasetId'])")

echo "Run started: $RUN_ID"

# Wait for completion
for i in {1..60}; do
  STATUS=$(curl -s "https://api.apify.com/v2/actor-runs/$RUN_ID?token=$APIFY_API_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['status'])")
  if [ "$STATUS" = "SUCCEEDED" ]; then
    echo "Search scrape complete!"
    break
  elif [ "$STATUS" = "FAILED" ] || [ "$STATUS" = "ABORTED" ]; then
    echo "Search scrape failed: $STATUS"
    exit 1
  fi
  sleep 5
done

# Download results
curl -s "https://api.apify.com/v2/datasets/$DATASET_ID/items?token=$APIFY_API_TOKEN" > /tmp/section8_search.json
TOTAL_FOUND=$(python3 -c "import json; print(len(json.load(open('/tmp/section8_search.json'))))")
echo "Found $TOTAL_FOUND total listings"

# Step 2: Load existing zpids
echo "Step 2: Checking for new listings..."

if [ ! -f "$TRACKER_FILE" ]; then
  echo '{"zpids": []}' > "$TRACKER_FILE"
fi

# Find new listings
python3 << PYEOF > /tmp/new_listings.json
import json

with open('/tmp/section8_search.json') as f:
    current = json.load(f)

with open('$TRACKER_FILE') as f:
    tracked = json.load(f)

existing_zpids = set(str(z) for z in tracked.get('zpids', []))
new_listings = []

for item in current:
    zpid = str(item.get('zpid', ''))
    if zpid and zpid not in existing_zpids:
        new_listings.append(item)

print(json.dumps(new_listings))
PYEOF

NEW_COUNT=$(python3 -c "import json; print(len(json.load(open('/tmp/new_listings.json'))))")
echo "New listings: $NEW_COUNT"

if [ "$NEW_COUNT" -eq 0 ]; then
  echo "No new listings found. Done."
  echo '{"new_count": 0, "total": '"$TOTAL_FOUND"'}' > /tmp/scout_result.json
  exit 0
fi

# Step 3: Get details for new listings
echo "Step 3: Fetching details for $NEW_COUNT new listings..."

python3 << PYEOF > /tmp/detail_urls.json
import json

with open('/tmp/new_listings.json') as f:
    listings = json.load(f)

urls = []
for item in listings:
    detail_url = item.get('detailUrl', '')
    if detail_url:
        urls.append({"url": detail_url})
    else:
        zpid = item.get('zpid', '')
        addr = item.get('address', '').replace(' ', '-').replace(',', '')
        if zpid:
            urls.append({"url": f"https://www.zillow.com/homedetails/{addr}/{zpid}_zpid/"})

print(json.dumps(urls))
PYEOF

DETAIL_RESPONSE=$(curl -s -X POST "https://api.apify.com/v2/acts/maxcopell~zillow-detail-scraper/runs?token=$APIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"startUrls\": $(cat /tmp/detail_urls.json)}")

DETAIL_RUN_ID=$(echo "$DETAIL_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])")
DETAIL_DATASET_ID=$(echo "$DETAIL_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['defaultDatasetId'])")

# Wait for details
for i in {1..120}; do
  STATUS=$(curl -s "https://api.apify.com/v2/actor-runs/$DETAIL_RUN_ID?token=$APIFY_API_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['status'])")
  if [ "$STATUS" = "SUCCEEDED" ]; then
    echo "Detail scrape complete!"
    break
  elif [ "$STATUS" = "FAILED" ] || [ "$STATUS" = "ABORTED" ]; then
    echo "Detail scrape failed: $STATUS"
    exit 1
  fi
  sleep 5
done

curl -s "https://api.apify.com/v2/datasets/$DETAIL_DATASET_ID/items?token=$APIFY_API_TOKEN" > /tmp/new_details.json

# Step 4: Format and add to spreadsheet
echo "Step 4: Adding to Google Sheet..."

TOKEN=$(bash "$WORKSPACE/scripts/google-token.sh")

# Get current row count
CURRENT_ROWS=$(curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SHEET_ID/values/Listings!A:A?majorDimension=COLUMNS" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('values',[[]])[0]))")

NEXT_ROW=$((CURRENT_ROWS + 1))
echo "Adding to row $NEXT_ROW"

# Format new listings for sheets
python3 << PYEOF > /tmp/new_rows.json
import json, re

with open('/tmp/new_details.json') as f:
    data = json.load(f)

def extract_rent(desc):
    if not desc:
        return ''
    patterns = [
        r'\\\$(\d{1,3}(?:,\d{3})*)\s*/\s*mo(?:nth)?',
        r'(?:rent(?:s|ed|al)?|pays?|paying|dividends|income)\s*(?:of|at|is|:)?\s*\\\$(\d{1,3}(?:,\d{3})*)',
        r'\\\$(\d{1,3}(?:,\d{3})*)\s*(?:per month|monthly|/month|mo\.)',
    ]
    for pattern in patterns:
        matches = re.findall(pattern, desc, re.IGNORECASE)
        for m in matches:
            val = int(m.replace(',', ''))
            if 500 <= val <= 8000:
                return f"\${val:,}/mo"
    return ''

rows = []
zpids = []
summary = {"under_100k": [], "100k_150k": [], "over_150k": []}

for item in data:
    addr = item.get('address', {})
    if isinstance(addr, dict):
        full_addr = f"{addr.get('streetAddress', '')}, {addr.get('city', '')} {addr.get('state', '')} {addr.get('zipcode', '')}"
    else:
        full_addr = str(addr)
    
    price = item.get('price')
    if isinstance(price, (int, float)):
        price_val = int(price)
        price_str = f"\${price_val:,}"
    else:
        price_val = 0
        price_str = str(price) if price else ''
    
    beds = str(item.get('bedrooms', ''))
    baths = str(item.get('bathrooms', ''))
    days = str(item.get('daysOnZillow', ''))
    zpid = str(item.get('zpid', ''))
    link = f"https://www.zillow.com/homedetails/{zpid}_zpid/" if zpid else ''
    desc = item.get('description', '')
    rent = extract_rent(desc)
    
    rows.append([full_addr, price_str, beds, baths, days, rent, link, "$TODAY"])
    zpids.append(zpid)
    
    # Categorize for summary
    listing_summary = f"{price_str} - {beds}bd - {full_addr.split(',')[0]}"
    if rent:
        listing_summary += f" (Rent: {rent})"
    
    if price_val < 100000:
        summary["under_100k"].append(listing_summary)
    elif price_val < 150000:
        summary["100k_150k"].append(listing_summary)
    else:
        summary["over_150k"].append(listing_summary)

output = {
    "rows": rows,
    "zpids": zpids,
    "summary": summary,
    "count": len(rows)
}
print(json.dumps(output))
PYEOF

# Add rows to sheet
ROWS_JSON=$(python3 -c "import json; print(json.dumps({'values': json.load(open('/tmp/new_rows.json'))['rows']}))")

curl -s -X PUT "https://sheets.googleapis.com/v4/spreadsheets/$SHEET_ID/values/Listings!A$NEXT_ROW?valueInputOption=USER_ENTERED" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "$ROWS_JSON" > /dev/null

# Step 5: Update tracker
echo "Step 5: Updating tracker..."

python3 << PYEOF
import json

with open('$TRACKER_FILE') as f:
    tracked = json.load(f)

with open('/tmp/new_rows.json') as f:
    new_data = json.load(f)

tracked['zpids'].extend(new_data['zpids'])
tracked['last_updated'] = '$TODAY'

with open('$TRACKER_FILE', 'w') as f:
    json.dump(tracked, f, indent=2)
PYEOF

# Save result for messaging
python3 << PYEOF > /tmp/scout_result.json
import json

with open('/tmp/new_rows.json') as f:
    data = json.load(f)

result = {
    "new_count": data['count'],
    "total": $TOTAL_FOUND,
    "summary": data['summary'],
    "date": "$TODAY"
}
print(json.dumps(result, indent=2))
PYEOF

echo "=== Scout complete! Added $NEW_COUNT new listings ==="
