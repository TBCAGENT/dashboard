#!/bin/bash
# Update dashboard credit card balances from Tiller
# Run daily via cron

set -e

TILLER_SHEET="1pd1dt64gBni4vAWze9QzhVwsmFMcdBuufW6m_0n-OPw"
DASHBOARD_DIR="/tmp/clean-dashboard"

# Get Google token
TOKEN=$(bash ~/.openclaw/workspace/scripts/google-token.sh)

# Pull balances from Tiller
BALANCES=$(curl -s -H "Authorization: Bearer $TOKEN" \
  "https://sheets.googleapis.com/v4/spreadsheets/$TILLER_SHEET/values/Balances!A1:J25" | python3 -c "
import json, sys
data = json.load(sys.stdin)
rows = data.get('values', [])

platinum = gold = chase = 'N/A'

for row in rows:
    if len(row) >= 8:
        account = row[5] if len(row) > 5 else ''
        balance = row[7] if len(row) > 7 else ''
        
        if 'Business Platinum' in account or 'Platinum Card' in account:
            platinum = balance
        elif 'American Express Gold' in account or 'Gold Card (2004)' in account:
            gold = balance
        elif 'Ultimate Rewards' in account or '5406' in account:
            chase = balance

print(f'{platinum}|{gold}|{chase}')
")

# Parse balances
PLATINUM=$(echo "$BALANCES" | cut -d'|' -f1)
GOLD=$(echo "$BALANCES" | cut -d'|' -f2)
CHASE=$(echo "$BALANCES" | cut -d'|' -f3)

echo "Tiller Balances:"
echo "  Platinum: $PLATINUM"
echo "  Gold: $GOLD"
echo "  Chase: $CHASE"

# Clone/update dashboard repo if needed
if [ ! -d "$DASHBOARD_DIR" ]; then
    git clone https://github.com/TBCAGENT/dashboard.git "$DASHBOARD_DIR"
fi

cd "$DASHBOARD_DIR"
git pull origin main 2>/dev/null || true

# Update the HTML with new balances
# Find and replace the credit card balance lines
python3 << EOF
import re

with open('index.html', 'r') as f:
    content = f.read()

# Update Platinum balance
content = re.sub(
    r'(Business Platinum.*?<span>)\$[\d,]+\.?\d*',
    r'\g<1>$PLATINUM',
    content
)

# Update Gold balance  
content = re.sub(
    r'(Business Gold.*?<span>)\$[\d,]+\.?\d*',
    r'\g<1>$GOLD', 
    content
)

# Update Chase balance
content = re.sub(
    r'(Chase Sapphire.*?<span>)\$[\d,]+\.?\d*',
    r'\g<1>$CHASE',
    content
)

with open('index.html', 'w') as f:
    f.write(content)

print("Dashboard updated with new balances")
EOF

# Commit and push if there are changes
if git diff --quiet; then
    echo "No balance changes detected"
else
    git add index.html
    git commit -m "auto: update credit card balances from Tiller

Platinum: $PLATINUM
Gold: $GOLD
Chase: $CHASE"
    git push origin main
    echo "Dashboard updated and pushed!"
fi
