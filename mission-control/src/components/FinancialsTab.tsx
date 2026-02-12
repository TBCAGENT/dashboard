"use client";

import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  account: string;
  accountLast4: string;
  accountIcon: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  isExpense: boolean;
  institution: string;
}

interface Account {
  name: string;
  last4: string;
  icon: string;
  institution: string;
  monthlySpend: number;
  currentBalance?: number;
  lastTransaction?: {
    description: string;
    amount: number;
    date: string;
  };
  transactionCount: number;
}

interface FinancialSummary {
  netWorth: number;
  monthlySpend: number;
  liquidAssets: number;
  financialHealth: string;
  totalAccounts: number;
  totalTransactions: number;
}

interface TillerData {
  transactions: Transaction[];
  accounts: Account[];
  summary: FinancialSummary;
  error?: string;
}

export function FinancialsTab() {
  const [tillerData, setTillerData] = useState<TillerData>({
    transactions: [],
    accounts: [],
    summary: {
      netWorth: 1430000,
      monthlySpend: 32300,
      liquidAssets: 863000,
      financialHealth: 'B-',
      totalAccounts: 0,
      totalTransactions: 0
    }
  });
  const [loading, setLoading] = useState(true);

  // Fetch Tiller data
  useEffect(() => {
    fetch('/api/tiller')
      .then(res => res.json())
      .then(data => {
        console.log('📊 Received Tiller data:', data);
        setTillerData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch Tiller data:', err);
        setLoading(false);
      });
  }, []);

  const { transactions, accounts, summary } = tillerData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyPrecise = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getTransactionIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'business': return '💼';
      case 'transportation': return '🚗';
      case 'dining': case 'food': return '🍽️';
      case 'shopping': return '🛒';
      case 'travel': return '✈️';
      case 'entertainment': return '🎬';
      case 'health': return '🏥';
      case 'utilities': return '⚡';
      default: return '💳';
    }
  };

  const getAccountColor = (institution: string) => {
    switch (institution?.toLowerCase()) {
      case 'american express': return 'blue';
      case 'chase': return 'cyan';
      default: return 'slate';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-emerald-500 font-mono text-sm">Loading financial data from Tiller...</div>
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

      {/* Account Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-sm text-emerald-500 tracking-widest uppercase">Credit Cards & Accounts</h3>
          <div className="text-xs text-[#737373] font-mono">
            {summary.totalAccounts} accounts • Last 30 days activity
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((account, index) => {
            const color = getAccountColor(account.institution);
            return (
              <div 
                key={`${account.name}-${account.last4}`} 
                className={`border border-${color}-500/20 bg-${color}-500/5 rounded-lg p-4 hover:border-${color}-500/40 transition-colors`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{account.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-white font-mono">{account.name}</div>
                      <div className={`text-xs text-${color}-300 font-mono`}>{account.last4}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {account.currentBalance !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#737373] font-mono uppercase">Current Balance</span>
                      <span className={`text-lg font-bold font-mono text-${color}-300`}>
                        {formatCurrency(account.currentBalance)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#737373] font-mono uppercase">Monthly Spend</span>
                    <span className={`text-sm font-mono text-${color}-400`}>
                      {formatCurrency(account.monthlySpend)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#737373] font-mono uppercase">Transactions</span>
                    <span className="text-sm font-mono text-[#e5e5e5]">
                      {account.transactionCount}
                    </span>
                  </div>

                  {account.lastTransaction && (
                    <div className="pt-2 border-t border-[#2a2a2a]">
                      <div className="text-xs text-[#525252] font-mono mb-1">Latest:</div>
                      <div className="text-xs text-[#737373] truncate">
                        {account.lastTransaction.description}
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-[#525252]">
                          {account.lastTransaction.date}
                        </span>
                        <span className={`text-xs font-mono ${
                          account.lastTransaction.amount < 0 ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {formatCurrencyPrecise(Math.abs(account.lastTransaction.amount))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Transaction Feed */}
      <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-mono text-sm text-emerald-500 tracking-widest uppercase">Live Transaction Feed</h3>
            <p className="text-xs text-[#737373] font-mono mt-1">
              {tillerData.error 
                ? `Using fallback data • ${tillerData.error}` 
                : `Connected to Tiller Google Sheet • ${summary.totalTransactions} transactions`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${tillerData.error ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`}></div>
            <span className={`font-mono text-xs uppercase ${tillerData.error ? 'text-amber-500' : 'text-emerald-500'}`}>
              {tillerData.error ? 'Fallback' : 'Live'}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-auto">
          {transactions.slice(0, 200).map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-3 p-3 bg-[#111111] rounded border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-sm flex-shrink-0">
                {transaction.accountIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white font-mono">
                      {transaction.account}
                    </span>
                    <span className="text-xs text-[#525252] font-mono">
                      {transaction.accountLast4}
                    </span>
                  </div>
                  <span className={`text-sm font-mono font-medium ${
                    transaction.isExpense ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {transaction.isExpense ? '-' : '+'}{formatCurrencyPrecise(Math.abs(transaction.amount))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737373] font-mono truncate flex-1 pr-2">
                    {transaction.description}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {transaction.category && (
                      <span className="text-xs text-[#525252] font-mono">
                        {getTransactionIcon(transaction.category)}
                      </span>
                    )}
                    <span className="text-xs text-[#5f5f5f] font-mono">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {transactions.length > 200 && (
          <div className="mt-3 pt-3 border-t border-[#1e1e1e] text-center">
            <span className="text-xs text-[#5f5f5f] font-mono">
              Showing 200 of {transactions.length} transactions • Full feed available in Tiller
            </span>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-[#1e1e1e] text-center">
          <span className="text-xs text-[#5f5f5f] font-mono">
            Last updated: {new Date().toLocaleTimeString()} • Auto-refreshes every 5 minutes
          </span>
        </div>
      </div>
    </div>
  );
}