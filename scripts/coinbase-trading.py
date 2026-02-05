#!/usr/bin/env python3
"""
Arthur's Coinbase Trading Bot
Monitors BTC/ETH and executes trades based on momentum/mean reversion strategy
"""

import json
import time
import secrets
import requests
from datetime import datetime
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
import jwt

# Credentials
API_KEY = "organizations/bc883a68-5cf6-496b-b57f-79fa1bfa5599/apiKeys/f90085c2-3bc7-4b3a-aede-f5c0d5097e6b"
API_SECRET = """-----BEGIN EC PRIVATE KEY-----
MHcCAQEEICDIfovLinDUnupCPVRLfoSoGCMZ0W0eSQxt/FPgOpTNoAoGCCqGSM49
AwEHoUQDQgAEwEph7L9N+WYhZvQ8V485xW7Ok+0qNvwhD0iS2pqLw1cwTcONhvZj
hLo55PAo8cysLrNomaMVnAo3Jhm32NdogA==
-----END EC PRIVATE KEY-----"""

BASE_URL = "https://api.coinbase.com"

def build_jwt(method, path):
    """Build JWT token for Coinbase API authentication"""
    private_key = serialization.load_pem_private_key(
        API_SECRET.encode(),
        password=None,
        backend=default_backend()
    )
    
    uri = f"{method} api.coinbase.com{path}"
    
    payload = {
        "sub": API_KEY,
        "iss": "cdp",
        "nbf": int(time.time()),
        "exp": int(time.time()) + 120,
        "uri": uri
    }
    
    headers = {
        "kid": API_KEY,
        "nonce": secrets.token_hex(16),
        "typ": "JWT",
        "alg": "ES256"
    }
    
    return jwt.encode(payload, private_key, algorithm="ES256", headers=headers)


def api_request(method, path, body=None):
    """Make authenticated API request"""
    token = build_jwt(method, path)
    headers = {"Authorization": f"Bearer {token}"}
    
    if method == "GET":
        response = requests.get(f"{BASE_URL}{path}", headers=headers)
    elif method == "POST":
        headers["Content-Type"] = "application/json"
        response = requests.post(f"{BASE_URL}{path}", headers=headers, json=body)
    
    return response.json() if response.status_code == 200 else {"error": response.text}


def get_accounts():
    """Get all account balances"""
    return api_request("GET", "/api/v3/brokerage/accounts")


def get_price(symbol="BTC-USD"):
    """Get current price for a trading pair"""
    response = requests.get(f"{BASE_URL}/v2/prices/{symbol}/spot")
    if response.status_code == 200:
        return float(response.json()['data']['amount'])
    return None


def get_candles(product_id="BTC-USD", granularity=3600, limit=24):
    """Get historical candles for analysis"""
    path = f"/api/v3/brokerage/products/{product_id}/candles?granularity={granularity}&limit={limit}"
    return api_request("GET", path)


def place_order(product_id, side, size, order_type="market"):
    """Place a market order"""
    path = "/api/v3/brokerage/orders"
    body = {
        "client_order_id": secrets.token_hex(16),
        "product_id": product_id,
        "side": side.upper(),
        "order_configuration": {
            "market_market_ioc": {
                "quote_size": str(size) if side.upper() == "BUY" else None,
                "base_size": str(size) if side.upper() == "SELL" else None
            }
        }
    }
    return api_request("POST", path, body)


def calculate_rsi(prices, period=14):
    """Calculate RSI indicator"""
    if len(prices) < period + 1:
        return 50  # Default neutral
    
    deltas = [prices[i] - prices[i-1] for i in range(1, len(prices))]
    gains = [d if d > 0 else 0 for d in deltas[-period:]]
    losses = [-d if d < 0 else 0 for d in deltas[-period:]]
    
    avg_gain = sum(gains) / period
    avg_loss = sum(losses) / period
    
    if avg_loss == 0:
        return 100
    
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))


def get_portfolio_value():
    """Calculate total portfolio value in USD"""
    accounts = get_accounts()
    total = 0
    
    for acc in accounts.get('accounts', []):
        currency = acc.get('currency')
        balance = float(acc.get('available_balance', {}).get('value', 0))
        
        if balance > 0:
            if currency == 'USD':
                total += balance
            else:
                price = get_price(f"{currency}-USD")
                if price:
                    total += balance * price
    
    return total


def log_trade(action, symbol, amount, price, reason):
    """Log trade to file"""
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "action": action,
        "symbol": symbol,
        "amount": amount,
        "price": price,
        "reason": reason
    }
    
    log_file = "/Users/lukefontaine/.openclaw/workspace/data/trading_log.json"
    try:
        with open(log_file, 'r') as f:
            logs = json.load(f)
    except:
        logs = []
    
    logs.append(log_entry)
    
    with open(log_file, 'w') as f:
        json.dump(logs, f, indent=2)


if __name__ == "__main__":
    print("=== Arthur Trading Bot ===")
    print(f"Time: {datetime.now()}")
    print()
    
    # Check accounts
    accounts = get_accounts()
    print("Accounts:")
    for acc in accounts.get('accounts', []):
        currency = acc.get('currency')
        balance = acc.get('available_balance', {}).get('value', 0)
        print(f"  {currency}: {balance}")
    
    print()
    
    # Check prices
    btc_price = get_price("BTC-USD")
    eth_price = get_price("ETH-USD")
    print(f"BTC: ${btc_price:,.2f}")
    print(f"ETH: ${eth_price:,.2f}")
    
    print()
    print(f"Portfolio Value: ${get_portfolio_value():,.2f}")
