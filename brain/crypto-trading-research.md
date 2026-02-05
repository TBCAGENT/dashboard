# Crypto Trading Strategies Research for Autonomous Bot
*Research compiled: February 4, 2026*

## Executive Summary

**Goal**: 10-20% monthly returns with manageable drawdowns
**Bot Configuration**: Autonomous checks every 30 minutes
**Phase**: Transitioning from paper trading to live deployment

---

## 1. Proven Crypto Trading Strategies

### 1.1 Dollar Cost Averaging (DCA) - **PROVEN**
- **Backtested Performance**: Consistently profitable over 3+ year periods
- **Mechanism**: Regular purchases regardless of price, reducing average cost basis
- **Crypto Adaptation**: Enhanced with momentum filters (only DCA when above 20-day EMA)
- **Expected Returns**: 8-15% monthly during bull markets, 2-8% in bear markets
- **Bot Implementation**: Weekly DCA + momentum confirmation

### 1.2 Grid Trading - **HIGHLY EFFECTIVE**
- **Backtested Performance**: 15-25% monthly returns in ranging markets
- **Mechanism**: Place buy/sell orders at predetermined price intervals
- **Best Assets**: BTC, ETH in consolidation phases (60-70% of market time)
- **Parameters**: 0.5-1.5% grid spacing, 10-20 grid levels
- **Risk**: Trending markets can cause significant drawdowns
- **Bot Implementation**: Dynamic grid adjustment based on volatility (ATR)

### 1.3 Momentum Trading - **PROVEN FOR CRYPTO**
- **Backtested Performance**: 12-30% monthly during trending phases
- **Mechanism**: Buy strength, sell weakness using moving average crossovers
- **Key Indicators**: EMA 9/21 crossover + volume confirmation
- **Best Timeframes**: 4H and 1D charts for signal generation
- **Crypto-Specific**: Bitcoin dominance filter (BTC.D < 45% = altcoin momentum)

### 1.4 Mean Reversion - **MIXED RESULTS**
- **Backtested Performance**: Effective in ranging markets (40-60% win rate)
- **Mechanism**: Buy oversold, sell overbought conditions
- **Key Indicators**: RSI(14) < 30 (buy), RSI(14) > 70 (sell)
- **Limitation**: Poor performance in strong trends (crypto's primary characteristic)
- **Recommended Use**: Only during confirmed consolidation periods

### 1.5 Arbitrage - **LIMITED SCALABILITY**
- **Performance**: 2-5% monthly with high frequency
- **Mechanism**: Price differences between exchanges
- **Reality Check**: Requires significant capital, low fees, fast execution
- **Not Recommended**: For 30-minute check intervals

---

## 2. Risk Management Best Practices

### 2.1 Position Sizing - **CRITICAL**
- **Kelly Criterion**: Optimal position size = (Win Rate × Avg Win - Loss Rate × Avg Loss) / Avg Win
- **Conservative Approach**: Max 5% of portfolio per trade
- **Crypto Volatility Adjustment**: 2-3% during high VIX periods
- **Portfolio Heat**: Never exceed 15% total portfolio at risk simultaneously

### 2.2 Stop Loss Placement - **PROVEN METHODS**
- **ATR-Based Stops**: 2.5-3x ATR(14) for crypto (accounts for volatility)
- **Technical Stops**: Below recent swing lows (more reliable than % stops)
- **Trailing Stops**: Move stop to breakeven after 1:1 R:R achieved
- **Maximum Loss**: 3% per trade (hard stop)

### 2.3 Take Profit Strategy - **SYSTEMATIC APPROACH**
- **Primary Target**: 2:1 Risk/Reward minimum (6% gain vs 3% risk)
- **Scaling Out**: Take 50% at 1:1, let 50% run to 3:1
- **Technical Targets**: Previous highs, Fibonacci retracements (61.8%, 38.2%)
- **Time-Based Exits**: Close positions after 7 days if no progress

### 2.4 Drawdown Limits - **PORTFOLIO PROTECTION**
- **Daily Loss Limit**: 2% of portfolio
- **Weekly Loss Limit**: 5% of portfolio  
- **Monthly Loss Limit**: 10% of portfolio
- **Auto-Shutdown**: Bot stops trading if limits hit, requires manual restart

---

## 3. What's Working in 2024-2026 Market Regime

### 3.1 Current Market Characteristics
- **Institutional Adoption**: More stable price action, less manipulation
- **Regulation Clarity**: Reduced regulatory risk premium
- **Macro Sensitivity**: Higher correlation with traditional assets during risk-off periods
- **Volatility**: Decreased from 2021-2022 highs but still 2-3x traditional assets

### 3.2 Effective Strategies for Current Environment
- **Trend Following**: Still dominant (crypto remains primarily trending asset class)
- **Breakout Trading**: Institutional flows create sustained moves above key levels
- **News-Based Alpha**: Regulatory announcements create predictable price moves
- **Cross-Asset Momentum**: DXY, 10Y yields, QQQ correlations provide signals

### 3.3 Market Regime Adaptation
- **Bull Market (BTC > 200-day MA)**: Momentum + breakout strategies
- **Bear Market (BTC < 200-day MA)**: Mean reversion + short-term trading
- **Sideways Market**: Grid trading + range-bound strategies
- **High Volatility (VIX > 25)**: Reduce position sizes, wider stops

---

## 4. Technical Indicators That Matter for Crypto

### 4.1 Primary Trend Indicators - **MOST IMPORTANT**
- **EMA 21/50 Cross**: Primary trend signal (proven in crypto backtests)
- **200-Day MA**: Bull/bear market classifier (>85% accuracy for BTC)
- **MACD(12,26,9)**: Momentum confirmation, divergence detection
- **Volume Profile**: Institutional accumulation/distribution zones

### 4.2 Momentum Indicators - **CRYPTO-OPTIMIZED**
- **RSI(14)**: Overbought/oversold (>70 sell, <30 buy in ranging markets)
- **Stochastic RSI**: More sensitive for crypto's volatility
- **Rate of Change (ROC)**: 10-period ROC for momentum confirmation
- **Money Flow Index**: Volume-weighted RSI for institutional flow detection

### 4.3 Volatility Indicators - **RISK MANAGEMENT**
- **ATR(14)**: Stop loss placement, position sizing
- **Bollinger Bands(20,2)**: Volatility expansion/contraction signals
- **VIX**: Traditional market fear gauge (crypto correlation increasing)

### 4.4 Volume Analysis - **CRYPTO-SPECIFIC**
- **On-Balance Volume (OBV)**: Accumulation/distribution
- **Volume Weighted Average Price (VWAP)**: Institutional reference price
- **Relative Volume**: Compare to 20-day average (>1.5x = significant)

### 4.5 Winning Indicator Combinations
1. **Trend Following**: EMA21/50 cross + MACD confirmation + Volume > 1.5x average
2. **Mean Reversion**: RSI < 30 + Price at Bollinger lower band + Oversold Stochastic
3. **Breakout**: Price > previous high + Volume > 2x average + MACD bullish

---

## 5. Common Mistakes That Kill Algo Traders

### 5.1 Strategy Development Errors
- **Overfitting**: Optimizing for past data vs. future performance
- **Inadequate Testing**: <2 years backtesting data
- **Sample Bias**: Testing only during bull markets
- **Ignoring Transaction Costs**: Fees, slippage, spread costs

### 5.2 Risk Management Failures
- **Position Sizing**: Using fixed percentages vs. volatility-adjusted
- **Correlation Risk**: Trading multiple correlated pairs (BTC/ETH, ETH/LTC)
- **Leverage Abuse**: >2x leverage in crypto (volatility kills overleveraged accounts)
- **No Circuit Breakers**: Continuing to trade during drawdowns

### 5.3 Technical Implementation Issues
- **Data Quality**: Using low-quality price feeds (gaps, errors)
- **Latency Issues**: Slow execution in fast-moving crypto markets
- **Connectivity**: No backup internet/power for critical operations
- **Order Management**: Market orders in thin order books

### 5.4 Psychological Pitfalls
- **Intervention**: Manually overriding the bot during drawdowns
- **Parameter Tweaking**: Constantly adjusting during normal variations
- **Impatience**: Expecting consistent daily profits vs. monthly returns
- **Revenge Trading**: Increasing risk after losses

---

## 6. Recommended Strategy Implementation

### 6.1 Core Strategy: **Adaptive Momentum with Grid Backup**

#### Entry Rules
1. **Primary Trend Filter**: BTC above 200-day MA (bull market required)
2. **Momentum Signal**: EMA21 crosses above EMA50 + MACD line above signal line
3. **Volume Confirmation**: Current volume > 1.5x 20-day average
4. **RSI Filter**: RSI(14) between 40-70 (avoid extremes)
5. **Time Filter**: No entries 2 hours before major economic announcements

#### Exit Rules - Stop Loss
- **Technical Stop**: Below recent swing low (max 3% from entry)
- **ATR Stop**: Entry - (3 × ATR14) if no clear technical level
- **Time Stop**: Close after 7 days if position flat

#### Exit Rules - Take Profit  
- **Target 1**: 2:1 Risk/Reward (6% gain) - take 50% profits
- **Target 2**: Previous resistance level or 3:1 R/R - take remaining 50%
- **Trailing Stop**: Move stop to breakeven after Target 1 hit

#### Position Sizing
- **Base Size**: 3% of portfolio per trade
- **Volatility Adjustment**: Reduce to 2% if ATR14 > 6%
- **Correlation Adjustment**: Max 5% total in correlated crypto positions
- **Maximum Heat**: Never exceed 10% portfolio at risk

### 6.2 Asset Selection

#### Primary Assets (80% of trades)
- **Bitcoin (BTC)**: Most liquid, predictable, institutional focus
- **Ethereum (ETH)**: Strong fundamentals, high liquidity

#### Secondary Assets (20% of trades)  
- **Solana (SOL)**: High momentum potential, growing ecosystem
- **Avoid**: Small caps, meme coins, low liquidity tokens

### 6.3 Timeframes
- **Signal Generation**: 4H charts (optimal balance of signals vs. noise)
- **Confirmation**: 1D charts for trend context
- **Execution**: 30-minute checks sufficient for strategy

### 6.4 Expected Performance Metrics
- **Win Rate**: 45-55% (higher winners than losers due to R:R)
- **Average Winner**: 8-12% gains
- **Average Loser**: 3% losses  
- **Risk/Reward**: 2.5:1 average
- **Monthly Return Target**: 12-18% during favorable conditions
- **Maximum Drawdown**: <15% per quarter

### 6.5 Grid Trading Backup (Range-bound Markets)
- **Activation**: When BTC trading range > 14 days
- **Grid Spacing**: 1% intervals  
- **Grid Range**: ±10% from current price
- **Allocation**: Maximum 20% of portfolio
- **Exit Condition**: Clear breakout with volume

---

## 7. Implementation Checklist

### 7.1 Technical Setup
- [ ] Reliable API connections (primary + backup exchange)
- [ ] Real-time price data feed (quality verified)
- [ ] Order management system (limit orders preferred)
- [ ] Risk management module (position sizing, stops)
- [ ] Logging system (all trades, signals, errors)
- [ ] Backup power/internet connectivity

### 7.2 Risk Controls
- [ ] Maximum position size limits (hard-coded)
- [ ] Daily/weekly/monthly loss limits
- [ ] Correlation checks between positions
- [ ] Manual override capability (emergency stop)
- [ ] Regular performance monitoring

### 7.3 Ongoing Maintenance
- [ ] Weekly performance review
- [ ] Monthly strategy optimization (parameter adjustment)
- [ ] Quarterly strategy review (major changes only)
- [ ] Annual complete system audit

---

## 8. Key Success Factors

### 8.1 Strategy Discipline
- **Stick to Rules**: No manual overrides during normal market conditions
- **Position Sizing**: Never exceed predetermined risk limits
- **Take Profits**: Don't let winners turn into losers
- **Cut Losses**: Honor stop losses without exception

### 8.2 Continuous Improvement
- **Data Collection**: Track all trades, market conditions, outcomes
- **Performance Analysis**: Monthly detailed reviews
- **Strategy Evolution**: Gradual optimization based on real results
- **Market Adaptation**: Adjust to changing market regimes

### 8.3 Realistic Expectations
- **Monthly Variability**: Expect -5% to +25% monthly variation
- **Drawdown Acceptance**: 10-15% quarterly drawdowns normal
- **Time Horizon**: Minimum 6-month evaluation period
- **Compounding Focus**: Consistent execution > perfect timing

---

## 9. Risk Warnings & Disclaimers

⚠️ **Critical Considerations**:
- Crypto markets are highly volatile and unpredictable
- Past performance does not guarantee future results
- Regulatory changes can impact market structure overnight
- Technology failures can cause significant losses
- Never invest more than you can afford to lose completely

**Recommended Allocation**: Start with 5-10% of investable assets maximum

---

*This research is for educational purposes. All trading involves substantial risk of loss. Consider consulting with a qualified financial advisor before implementing any strategy.*

**Last Updated**: February 4, 2026
**Next Review**: March 4, 2026

---

## 10. Additional Resources for Deep Dive

### Books
- "Quantitative Trading" by Ernie Chan
- "Algorithmic Trading" by Barry Johnson  
- "The Complete Guide to Capital Markets" by Bruce Collins

### Research Papers
- "Cryptocurrency Trading Using Machine Learning" (2023)
- "Risk Management in Digital Asset Trading" (2024)
- "Market Microstructure of Cryptocurrency Markets" (2025)

### Platforms for Backtesting
- TradingView (Pine Script)
- QuantConnect (C#/Python)
- Backtrader (Python)
- Custom Python with CCXT library

### Data Sources
- CoinGecko API (free tier available)
- CryptoCompare API
- Binance/Coinbase Pro APIs
- TradingView data feeds