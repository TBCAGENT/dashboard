#!/bin/bash
# Detroit Section 8 REALTIME Deal Monitor v2
# Two-step: Search for Section 8 listings, then detail scrape new ones

set -e

WORKSPACE="/Users/lukefontaine/.openclaw/workspace"
DATA_DIR="$WORKSPACE/data"
TRACKER_FILE="$DATA_DIR/detroit-section8-zpids.json"
RESULT_OUTPUT="$DATA_DIR/realtime_result.json"
NOW=$(date "+%Y-%m-%d %H:%M")

mkdir -p "$DATA_DIR"
source ~/.config/apify/secrets.env

echo "[$NOW] Realtime scan starting..."

# STEP 1: Search for Section 8 listings
SEARCH_URL='https://www.zillow.com/homes/Detroit,-MI_rb/?searchQueryState={%22pagination%22:{},%22mapBounds%22:{%22north%22:42.515,%22east%22:-82.91,%22south%22:42.25,%22west%22:-83.35},%22filterState%22:{%22sort%22:{%22value%22:%22days%22},%22ah%22:{%22value%22:true},%22keywords%22:{%22value%22:%22section%208%22}},%22isListVisible%22:true}'

RUN_RESPONSE=$(curl -s -X POST "https://api.apify.com/v2/acts/maxcopell~zillow-scraper/runs?token=$APIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"searchUrls\": [{\"url\": \"$SEARCH_URL\"}]}")

RUN_ID=$(echo "$RUN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('id',''))" 2>/dev/null)
DATASET_ID=$(echo "$RUN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('defaultDatasetId',''))" 2>/dev/null)

if [ -z "$RUN_ID" ]; then
  echo "[$NOW] ERROR: Failed to start search"
  exit 1
fi

echo "[$NOW] Search started: $RUN_ID"

# Wait for search
for i in {1..40}; do
  STATUS=$(curl -s "https://api.apify.com/v2/actor-runs/$RUN_ID?token=$APIFY_API_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('status',''))" 2>/dev/null)
  if [ "$STATUS" = "SUCCEEDED" ]; then break; fi
  if [ "$STATUS" = "FAILED" ] || [ "$STATUS" = "ABORTED" ]; then
    echo "[$NOW] Search failed: $STATUS"
    exit 1
  fi
  sleep 3
done

curl -s "https://api.apify.com/v2/datasets/$DATASET_ID/items?token=$APIFY_API_TOKEN" > "$DATA_DIR/search_results.json"

# Initialize tracker if needed
if [ ! -f "$TRACKER_FILE" ]; then
  echo '{"zpids":[],"lastUpdated":"'$NOW'"}' > "$TRACKER_FILE"
fi

# STEP 2: Find new listings and get details
python3 << PYEOF
import json, subprocess, time

data_dir = "$DATA_DIR"
tracker_file = "$TRACKER_FILE"
result_output = "$RESULT_OUTPUT"
now = "$NOW"
token = "$APIFY_API_TOKEN"

with open(f"{data_dir}/search_results.json") as f:
    search_results = json.load(f)

with open(tracker_file) as f:
    tracker = json.load(f)

existing = set(str(z) for z in tracker.get('zpids', []))

# Find new listings
new_listings = []
for item in search_results:
    zpid = str(item.get('zpid', ''))
    if zpid and zpid not in existing:
        url = item.get('detailUrl', '')
        if url and not url.startswith('http'):
            url = 'https://www.zillow.com' + url
        new_listings.append({
            'zpid': zpid,
            'url': url,
            'price': item.get('price', 0),
            'address': item.get('address', ''),
            'beds': item.get('bedrooms', '?'),
            'baths': item.get('bathrooms', '?')
        })

print(f"Found {len(new_listings)} new listings")

if not new_listings:
    output = {'hot_deals': [], 'all_new': [], 'hot_count': 0, 'total_new': 0}
    with open(result_output, 'w') as f:
        json.dump(output, f, indent=2)
    print("No new listings - done")
    exit(0)

# Get details for new listings (max 20 at a time to stay fast)
urls_to_scrape = [{"url": item['url']} for item in new_listings[:20] if item['url']]

if urls_to_scrape:
    print(f"Scraping details for {len(urls_to_scrape)} new listings...")
    
    import subprocess
    result = subprocess.run([
        'curl', '-s', '-X', 'POST',
        f'https://api.apify.com/v2/acts/maxcopell~zillow-detail-scraper/runs?token={token}',
        '-H', 'Content-Type: application/json',
        '-d', json.dumps({"startUrls": urls_to_scrape})
    ], capture_output=True, text=True)
    
    run_data = json.loads(result.stdout)
    detail_run_id = run_data.get('data', {}).get('id', '')
    detail_dataset_id = run_data.get('data', {}).get('defaultDatasetId', '')
    
    if detail_run_id:
        # Wait for detail scrape
        for i in range(60):
            result = subprocess.run([
                'curl', '-s',
                f'https://api.apify.com/v2/actor-runs/{detail_run_id}?token={token}'
            ], capture_output=True, text=True)
            status = json.loads(result.stdout).get('data', {}).get('status', '')
            if status == 'SUCCEEDED':
                break
            if status in ['FAILED', 'ABORTED']:
                print(f"Detail scrape failed: {status}")
                break
            time.sleep(3)
        
        # Get detailed results
        result = subprocess.run([
            'curl', '-s',
            f'https://api.apify.com/v2/datasets/{detail_dataset_id}/items?token={token}'
        ], capture_output=True, text=True)
        
        detailed = json.loads(result.stdout)
        
        # Merge details back
        detail_by_zpid = {str(d.get('zpid', '')): d for d in detailed}
        for listing in new_listings:
            if listing['zpid'] in detail_by_zpid:
                detail = detail_by_zpid[listing['zpid']]
                listing['description'] = detail.get('description', '')
                listing['daysOnZillow'] = detail.get('daysOnZillow', 0)

# Analyze for hot deals
import re

def analyze_listing(desc):
    if not desc:
        return False, None
    desc_lower = desc.lower()
    
    rent_patterns = [
        r'currently\s+(?:rented|leased).*?\$(\d{1,3}(?:,\d{3})*)',
        r'tenant.*?paying\s+\$(\d{1,3}(?:,\d{3})*)',
        r'(?:generates?|generating)\s+\$(\d{1,3}(?:,\d{3})*)',
        r'(?:rent|rental)\s+(?:is|of)\s+\$(\d{1,3}(?:,\d{3})*)',
        r'\$(\d{1,3}(?:,\d{3})*)\s*/\s*(?:mo|month)',
    ]
    
    tenant_signals = [
        r'tenant\s+(?:occupied|in\s+place)',
        r'currently\s+(?:rented|leased|occupied)',
        r'(?:rented|leased)\s+to',
        r'fully\s+(?:rented|occupied)',
    ]
    
    has_tenant = any(re.search(p, desc_lower) for p in tenant_signals)
    
    for pattern in rent_patterns:
        match = re.search(pattern, desc_lower)
        if match:
            try:
                amount = int(match.group(1).replace(',', ''))
                if 500 <= amount <= 5000:
                    return has_tenant, amount
            except:
                continue
    
    return has_tenant, None

hot_deals = []
all_new = []

for listing in new_listings:
    has_tenant, rent = analyze_listing(listing.get('description', ''))
    
    result_listing = {
        'zpid': listing['zpid'],
        'address': listing['address'],
        'price': listing['price'],
        'beds': listing['beds'],
        'baths': listing['baths'],
        'rent': rent,
        'has_tenant': has_tenant,
        'link': f"https://www.zillow.com/homedetails/{listing['zpid']}_zpid/"
    }
    
    all_new.append(result_listing)
    tracker['zpids'].append(listing['zpid'])
    
    if has_tenant and rent:
        hot_deals.append(result_listing)

# Save results
output = {
    'hot_deals': hot_deals,
    'all_new': all_new,
    'hot_count': len(hot_deals),
    'total_new': len(all_new)
}

with open(result_output, 'w') as f:
    json.dump(output, f, indent=2)

tracker['lastUpdated'] = now
with open(tracker_file, 'w') as f:
    json.dump(tracker, f, indent=2)

print(f"NEW={len(all_new)} HOT={len(hot_deals)}")
PYEOF

echo "[$NOW] Scan complete"
