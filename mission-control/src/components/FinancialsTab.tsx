"use client";

import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  account: string;
  amount: number;
  description: string;
  date: string;
  category: string;
}

interface FinancialSummary {
  netWorth: number;
  monthlySpend: number;
  liquidAssets: number;
  financialHealth: string;
}

interface TillerData {
  transactions: Transaction[];
  summary: FinancialSummary;
  error?: string;
}

export function FinancialsTab() {
  const [tillerData, setTillerData] = useState<TillerData>({
    transactions: [],
    summary: {
      netWorth: 1430000,
      monthlySpend: 32300,
      liquidAssets: 863000,
      financialHealth: 'B-'
    }
  });
  const [loading, setLoading] = useState(true);

  // Fetch Tiller data
  useEffect(() => {
    fetch('/api/tiller')
      .then(res => res.json())
      .then(data => {
        setTillerData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch Tiller data:', err);
        setLoading(false);
      });
  }, []);

  const { transactions, summary } = tillerData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTransactionIcon = (category: string) => {
    switch (category) {
      case 'Business': return '💼';
      case 'Transportation': return '🚗';
      case 'Dining': return '🍽️';
      default: return '💳';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-emerald-500 font-mono text-sm">Loading financial data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="border border-emerald-500/20 bg-emerald-500/5 rounded p-4">
          <div className="font-mono text-xs text-emerald-300 uppercase">Net Worth</div>
          <div className="font-mono text-xl text-white mt-1">{formatCurrency(summary.netWorth)}</div>
        </div>
        <div className="border border-amber-500/20 bg-amber-500/5 rounded p-4">
          <div className="font-mono text-xs text-amber-300 uppercase">Monthly Spend</div>
          <div className="font-mono text-xl text-white mt-1">{formatCurrency(summary.monthlySpend)}</div>
        </div>
        <div className="border border-cyan-500/20 bg-cyan-500/5 rounded p-4">
          <div className="font-mono text-xs text-cyan-300 uppercase">Liquid Assets</div>
          <div className="font-mono text-xl text-white mt-1">{formatCurrency(summary.liquidAssets)}</div>
        </div>
        <div className="border border-slate-500/20 bg-slate-500/5 rounded p-4">
          <div className="font-mono text-xs text-slate-300 uppercase">Financial Health</div>
          <div className="font-mono text-xl text-white mt-1">{summary.financialHealth}</div>
        </div>
      </div>

      {/* Live Transaction Feed */}
      <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-mono text-sm text-emerald-500 tracking-widest uppercase">Live Transaction Feed</h3>
            <p className="text-xs text-[#737373] font-mono mt-1">
              {tillerData.error ? 'Using fallback data' : 'Connected to Tiller Google Sheet'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${tillerData.error ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`}></div>
            <span className={`font-mono text-xs uppercase ${tillerData.error ? 'text-amber-500' : 'text-emerald-500'}`}>
              {tillerData.error ? 'Fallback' : 'Live'}
            </span>
          </div>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-auto">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-4 p-3 bg-[#111111] rounded border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-sm">
                {getTransactionIcon(transaction.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white font-mono truncate">{transaction.account}</span>
                  <span className={`text-sm font-mono ${transaction.amount < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#737373] font-mono truncate">{transaction.description}</span>
                  <span className="text-xs text-[#5f5f5f] font-mono">{transaction.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#1e1e1e] text-center">
          <span className="text-xs text-[#5f5f5f] font-mono">
            Last updated: {new Date().toLocaleTimeString()} • Auto-refreshes every 5 minutes
          </span>
        </div>
      </div>
    </div>
  );
}