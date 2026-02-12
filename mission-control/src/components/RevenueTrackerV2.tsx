"use client";

import { useAirtableData } from "@/hooks/useAirtableData";
import { useMemo } from "react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RevenueTrackerV2() {
  const { data: airtableData, loading, error, refresh } = useAirtableData();

  const overview = {
    totalRevenue: airtableData?.totalRevenue || 0,
    last24hDeals: airtableData?.last24h || 0,
    dealsInContract: airtableData?.dealsCount || 0,
    totalActiveDeals: (airtableData?.offerMade?.count || 0) + (airtableData?.pendingContract?.count || 0) + (airtableData?.inContract?.count || 0),
    averageDealSize: airtableData && airtableData.dealsCount > 0 ? airtableData.totalRevenue / airtableData.dealsCount : 0,
    deals: airtableData?.deals || [],
    allActiveDeals: [
      ...(airtableData?.offerMade?.deals || []),
      ...(airtableData?.pendingContract?.deals || []),
      ...(airtableData?.inContract?.deals || [])
    ],
    lastUpdatedAt: airtableData ? new Date(airtableData.timestamp).getTime() : Date.now()
  };

  const monthlyGoal = 30;
  const progressPercentage = (overview.totalActiveDeals / monthlyGoal) * 100;

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-center py-8">
          <div className="text-emerald-500 font-mono text-sm">Loading deal data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-mono text-sm text-red-500 tracking-widest uppercase">Deal Revenue Tracker</h2>
            <p className="text-xs text-red-400 font-mono mt-1">Error: {error}</p>
          </div>
          <button onClick={refresh} className="px-3 py-1 bg-red-500/20 text-red-400 rounded font-mono text-xs">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-sm text-emerald-500 tracking-widest uppercase">Deal Revenue Tracker</h2>
          <p className="text-xs text-[#737373] font-mono mt-1">
            Live from Airtable • Updates every 15 min
          </p>
        </div>
        <button onClick={refresh} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded font-mono text-xs">
          🔄 Refresh
        </button>
      </div>

      {/* Deal Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="border border-blue-500/20 bg-blue-500/5 rounded p-4">
          <div className="font-mono text-xs text-blue-300 uppercase">Offer Made</div>
          <div className="font-mono text-sm text-white mt-1">{airtableData?.offerMade?.count || 0} homes</div>
          <div className="font-mono text-lg text-blue-400">{formatCurrency(airtableData?.offerMade?.revenue || 0)}</div>
        </div>
        <div className="border border-amber-500/20 bg-amber-500/5 rounded p-4">
          <div className="font-mono text-xs text-amber-300 uppercase">Pending Contract</div>
          <div className="font-mono text-sm text-white mt-1">{airtableData?.pendingContract?.count || 0} homes</div>
          <div className="font-mono text-lg text-amber-400">{formatCurrency(airtableData?.pendingContract?.revenue || 0)}</div>
        </div>
        <div className="border border-emerald-500/20 bg-emerald-500/5 rounded p-4">
          <div className="font-mono text-xs text-emerald-300 uppercase">In Contract</div>
          <div className="font-mono text-sm text-white mt-1">{airtableData?.inContract?.count || 0} homes</div>
          <div className="font-mono text-lg text-emerald-400">{formatCurrency(airtableData?.inContract?.revenue || 0)}</div>
        </div>
        <div className="border border-cyan-500/20 bg-cyan-500/5 rounded p-4">
          <div className="font-mono text-xs text-cyan-300 uppercase">New deals added to pipeline (24H)</div>
          <div className="font-mono text-xl text-white mt-1">{overview.last24hDeals}</div>
        </div>
      </div>

      {/* Monthly Goal Progress */}
      <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-[#737373] uppercase tracking-wider">Monthly Goal Progress</span>
          <span className="font-mono text-xs text-emerald-400">{overview.totalActiveDeals} of {monthlyGoal} deals</span>
        </div>
        <div className="h-3 bg-[#1a1a1a] rounded overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000" 
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-xs text-[#5f5f5f]">0</span>
          <span className="font-mono text-xs text-emerald-400 font-bold">{progressPercentage.toFixed(1)}%</span>
          <span className="font-mono text-xs text-[#5f5f5f]">{monthlyGoal}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded p-4">
          <h3 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-3">Recent Active Deals</h3>
          <div className="space-y-3 max-h-72 overflow-auto pr-1">
            {overview.allActiveDeals.slice(0, 8).map((deal) => {
              const statusColor = deal.status === 'In Contract' ? 'text-emerald-400' : 
                                 deal.status === 'Pending Contract' ? 'text-amber-400' : 'text-blue-400';
              return (
                <div key={deal.id}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-white font-mono truncate">{deal.address}</span>
                    <span className="text-sm text-emerald-400 font-mono">{formatCurrency(deal.revenue)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className={`text-xs font-mono ${statusColor}`}>
                      {deal.status}
                    </span>
                    <span className="text-xs text-[#5f5f5f] font-mono">
                      {deal.date ? new Date(deal.date).toLocaleDateString() : 'No date'}
                    </span>
                  </div>
                </div>
              );
            })}
            {overview.allActiveDeals.length === 0 && (
              <div className="text-sm text-[#5f5f5f] font-mono text-center py-4">
                No active deals
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded p-4">
          <h3 className="font-mono text-xs text-[#737373] uppercase tracking-wider mb-3">Deal Size Distribution</h3>
          <div className="space-y-3">
            {(() => {
              const ranges = [
                { label: '$20K+', min: 20000, max: Infinity },
                { label: '$15K-$19K', min: 15000, max: 19999 },
                { label: '$10K-$14K', min: 10000, max: 14999 },
                { label: '$5K-$9K', min: 5000, max: 9999 },
                { label: 'Under $5K', min: 0, max: 4999 }
              ];
              
              return ranges.map((range) => {
                const count = overview.allActiveDeals.filter(d => 
                  d.revenue >= range.min && d.revenue <= range.max
                ).length;
                const percentage = overview.allActiveDeals.length > 0 ? (count / overview.allActiveDeals.length) * 100 : 0;
                
                return (
                  <div key={range.label}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-white font-mono">{range.label}</span>
                      <span className="text-sm text-cyan-400 font-mono">{count} deals</span>
                    </div>
                    <div className="mt-1 h-2 bg-[#1a1a1a] rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-[#5f5f5f] font-mono">{percentage.toFixed(1)}% of portfolio</div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}