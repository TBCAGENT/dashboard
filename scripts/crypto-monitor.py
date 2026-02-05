#!/usr/bin/env python3
"""
Arthur's Crypto Trading Monitor
Uses CoinMarketCap API for real-time market data
Monitors positions and executes paper trades
"""

import json
import os
import requests
from datetime import datetime

# Load CMC API key
CMC_API_KEY = os.environ.get('CMC_API_KEY', '423a5a7835e141888915e70b884fea66')
CMC_BASE_URL = "https://pro-api.coinmarketcap.com/v1"

PAPER_TRADING_FILE = "/Users/lukefontaine/.openclaw/workspace/data/paper_trading.json"
SIGNAL_LOG_FILE = "/Users/lukefontaine/.openclaw/workspace/data/signal_log.json"

def get_cmc_prices(symbols=["BTC", "ETH"]):
    """Get prices from CoinMarketCap API"""
    headers = {"X-CMC_PRO_API_KEY": CMC_API_KEY}
    params = {"symbol": ",".join(symbols)}
    
    try:
        response = requests.get(
            f"{CMC_BASE_URL}/cryptocurrency/quotes/latest",
            headers=headers,
            params=params
        )
        if response.status_code == 200:
            data = response.json()['data']
            return {
                symbol: {
                    'price': data[symbol]['quote']['USD']['price'],
                    'change_1h': data[symbol]['quote']['USD']['percent_change_1h'],
                    'change_24h': data[symbol]['quote']['USD']['percent_change_24h'],
                    'volume_24h': data[symbol]['quote']['USD']['volume_24h'],
                    'market_cap': data[symbol]['quote']['USD']['market_cap']
                }
                for symbol in symbols if symbol in data
            }
    except Exception as e:
        print(f"Error fetching CMC data: {e}")
    return None


def load_paper_trading():
    """Load paper trading state"""
    try:
        with open(PAPER_TRADING_FILE, 'r') as f:
            return json.load(f)
    except:
        return None


def save_paper_trading(data):
    """Save paper trading state"""
    with open(PAPER_TRADING_FILE, 'w') as f:
        json.dump(data, f, indent=2)


def log_signal(signal_type, symbol, price, details):
    """Log trading signal"""
    entry = {
        "timestamp": datetime.now().isoformat(),
        "type": signal_type,
        "symbol": symbol,
        "price": price,
        "details": details
    }
    
    try:
        with open(SIGNAL_LOG_FILE, 'r') as f:
            logs = json.load(f)
    except:
        logs = []
    
    logs.append(entry)
    
    # Keep last 1000 entries
    logs = logs[-1000:]
    
    with open(SIGNAL_LOG_FILE, 'w') as f:
        json.dump(logs, f, indent=2)
    
    return entry


def check_stop_loss_take_profit(positions, prices):
    """Check if any positions hit stop loss or take profit"""
    alerts = []
    
    for pos in positions:
        symbol = pos['symbol'].replace('-USD', '')
        if symbol not in prices:
            continue
        
        current_price = prices[symbol]['price']
        entry_price = pos['entry_price']
        stop_loss = pos['stop_loss']
        take_profit = pos['take_profit']
        
        pnl_pct = ((current_price - entry_price) / entry_price) * 100
        pnl_usd = (current_price - entry_price) * pos['quantity']
        
        if current_price <= stop_loss:
            alerts.append({
                'type': 'STOP_LOSS_HIT',
                'symbol': symbol,
                'entry': entry_price,
                'current': current_price,
                'stop_loss': stop_loss,
                'pnl_pct': pnl_pct,
                'pnl_usd': pnl_usd,
                'action': 'SELL'
            })
        elif current_price >= take_profit:
            alerts.append({
                'type': 'TAKE_PROFIT_HIT',
                'symbol': symbol,
                'entry': entry_price,
                'current': current_price,
                'take_profit': take_profit,
                'pnl_pct': pnl_pct,
                'pnl_usd': pnl_usd,
                'action': 'SELL'
            })
        else:
            alerts.append({
                'type': 'POSITION_UPDATE',
                'symbol': symbol,
                'entry': entry_price,
                'current': current_price,
                'pnl_pct': pnl_pct,
                'pnl_usd': pnl_usd,
                'distance_to_stop': ((current_price - stop_loss) / current_price) * 100,
                'distance_to_tp': ((take_profit - current_price) / current_price) * 100
            })
    
    return alerts


def calculate_momentum_signal(prices):
    """Simple momentum signal based on 1h and 24h changes"""
    signals = []
    
    for symbol, data in prices.items():
        change_1h = data['change_1h']
        change_24h = data['change_24h']
        
        # Bullish: Both 1h and 24h positive, 1h > 1%
        if change_1h > 1 and change_24h > 0:
            signals.append({
                'symbol': symbol,
                'signal': 'BUY',
                'strength': 'STRONG' if change_1h > 2 else 'MODERATE',
                'reason': f"Momentum up: 1h={change_1h:.2f}%, 24h={change_24h:.2f}%"
            })
        # Bearish: Both negative, 1h < -1%
        elif change_1h < -1 and change_24h < 0:
            signals.append({
                'symbol': symbol,
                'signal': 'SELL',
                'strength': 'STRONG' if change_1h < -2 else 'MODERATE',
                'reason': f"Momentum down: 1h={change_1h:.2f}%, 24h={change_24h:.2f}%"
            })
        else:
            signals.append({
                'symbol': symbol,
                'signal': 'HOLD',
                'strength': 'NEUTRAL',
                'reason': f"Mixed signals: 1h={change_1h:.2f}%, 24h={change_24h:.2f}%"
            })
    
    return signals


def is_oversold_bounce(data):
    """Detect oversold bounce: 24h down big but 1h recovering"""
    return data['change_24h'] < -5 and data['change_1h'] > 0.5


def has_strong_momentum(data):
    """Detect strong upward momentum"""
    return data['change_1h'] > 1 and data['change_24h'] > 0


def should_enter_trade(symbol, data, paper):
    """Decide if we should enter a trade. Returns strategy name or None."""
    # Check if we already have a position in this symbol
    for pos in paper['positions']:
        if pos['symbol'] == f"{symbol}-USD":
            return None

    # Check daily loss limit (2% of initial balance)
    daily_loss = sum(t['pnl'] for t in paper.get('closed_trades', [])
                     if t.get('exit_time', '').startswith(datetime.now().strftime('%Y-%m-%d')))
    if daily_loss <= -(paper['initial_balance'] * 0.02):
        return None

    # Check max portfolio heat (max 2 open positions, max 10% at risk)
    if len(paper['positions']) >= 2:
        return None

    # Strategy 1: Strong momentum (trend following)
    if has_strong_momentum(data):
        return "Strategy 1 - Momentum"

    # Strategy 2: Oversold bounce (mean reversion)
    if is_oversold_bounce(data):
        return "Strategy 2 - Oversold Bounce"

    return None


def execute_paper_trade(paper, symbol, price, strategy):
    """Execute a paper trade entry"""
    # Determine position sizing and params based on strategy
    if "Momentum" in strategy:
        size_pct = 0.05  # 5% of portfolio
        sl_pct = 0.03    # 3% stop loss
        tp_pct = 0.10    # 10% take profit
    elif "Oversold" in strategy:
        size_pct = 0.03  # 3% of portfolio (smaller for mean reversion)
        sl_pct = 0.03    # 3% stop loss
        tp_pct = 0.06    # 6% take profit
    else:
        size_pct = 0.03
        sl_pct = 0.03
        tp_pct = 0.06

    position_value = paper['current_balance'] * size_pct
    quantity = position_value / price
    stop_loss = price * (1 - sl_pct)
    take_profit = price * (1 + tp_pct)

    position = {
        "symbol": f"{symbol}-USD",
        "quantity": quantity,
        "entry_price": price,
        "entry_time": datetime.now().isoformat(),
        "stop_loss": stop_loss,
        "take_profit": take_profit,
        "value": position_value,
        "strategy": strategy
    }

    paper['positions'].append(position)
    save_paper_trading(paper)

    log_signal('TRADE_ENTRY', symbol, price, {
        "strategy": strategy,
        "quantity": quantity,
        "value": position_value,
        "stop_loss": stop_loss,
        "take_profit": take_profit
    })

    return position


def close_position(paper, pos, current_price, reason):
    """Close a position and update the portfolio"""
    pnl = (current_price - pos['entry_price']) * pos['quantity']
    pnl_pct = (current_price - pos['entry_price']) / pos['entry_price']

    closed = {
        "symbol": pos['symbol'],
        "quantity": pos['quantity'],
        "entry_price": pos['entry_price'],
        "exit_price": current_price,
        "entry_time": pos['entry_time'],
        "exit_time": datetime.now().isoformat(),
        "exit_reason": reason,
        "pnl": round(pnl, 2),
        "pnl_pct": round(pnl_pct, 4),
        "value": pos['value'],
        "strategy": pos.get('strategy', 'unknown')
    }

    paper['closed_trades'].append(closed)
    paper['current_balance'] += pnl
    paper['positions'] = [p for p in paper['positions'] if p != pos]
    save_paper_trading(paper)

    log_signal('TRADE_EXIT', pos['symbol'], current_price, {
        "reason": reason,
        "pnl": round(pnl, 2),
        "pnl_pct": f"{pnl_pct*100:.2f}%"
    })

    return closed


def main():
    print("=" * 50)
    print(f"CRYPTO TRADING MONITOR - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

    # Get market data from CMC
    prices = get_cmc_prices(["BTC", "ETH"])
    if not prices:
        print("ERROR: Could not fetch market data")
        return

    print("\n📊 MARKET DATA (CoinMarketCap)")
    for symbol, data in prices.items():
        print(f"  {symbol}: ${data['price']:,.2f} | 1h: {data['change_1h']:+.2f}% | 24h: {data['change_24h']:+.2f}%")

    # Load paper trading state
    paper = load_paper_trading()
    if not paper:
        print("\nERROR: Could not load paper trading data")
        return

    # Check positions — auto-close on stop loss / take profit
    print(f"\n💼 PORTFOLIO")
    print(f"  Cash: ${paper['current_balance']:,.2f}")

    if paper['positions']:
        print(f"  Positions:")
        alerts = check_stop_loss_take_profit(paper['positions'], prices)

        for alert in alerts:
            if alert['type'] == 'POSITION_UPDATE':
                print(f"    {alert['symbol']}: ${alert['current']:,.2f} | P&L: {alert['pnl_pct']:+.2f}% (${alert['pnl_usd']:+.2f})")
                print(f"      Stop: {alert['distance_to_stop']:.2f}% away | TP: {alert['distance_to_tp']:.2f}% away")
            elif alert['type'] in ['STOP_LOSS_HIT', 'TAKE_PROFIT_HIT']:
                # Auto-close the position
                for pos in paper['positions']:
                    sym = pos['symbol'].replace('-USD', '')
                    if sym == alert['symbol']:
                        closed = close_position(paper, pos, alert['current'], alert['type'].lower())
                        print(f"    🚨 AUTO-CLOSED: {alert['symbol']} | {alert['type']} | P&L: ${closed['pnl']:+.2f} ({closed['pnl_pct']*100:+.2f}%)")
                        break
    else:
        print("  No open positions")

    # Generate signals
    print(f"\n📈 TRADING SIGNALS")
    signals = calculate_momentum_signal(prices)
    for sig in signals:
        emoji = "🟢" if sig['signal'] == 'BUY' else "🔴" if sig['signal'] == 'SELL' else "⚪"
        print(f"  {emoji} {sig['symbol']}: {sig['signal']} ({sig['strength']}) - {sig['reason']}")
        log_signal('SIGNAL', sig['symbol'], prices[sig['symbol']]['price'], sig)

    # Auto-execute trades when conditions are met
    print(f"\n🤖 AUTO-TRADING")
    paper = load_paper_trading()  # Reload in case positions were closed above
    traded = False
    for symbol, data in prices.items():
        strategy = should_enter_trade(symbol, data, paper)
        if strategy:
            pos = execute_paper_trade(paper, symbol, data['price'], strategy)
            print(f"  ✅ ENTERED: {symbol}-USD @ ${data['price']:,.2f} | {strategy}")
            print(f"     Size: ${pos['value']:,.2f} | SL: ${pos['stop_loss']:,.2f} | TP: ${pos['take_profit']:,.2f}")
            traded = True
            paper = load_paper_trading()  # Reload after each trade

    if not traded:
        print("  No setups met entry criteria — standing by")

    print("\n" + "=" * 50)


if __name__ == "__main__":
    main()
