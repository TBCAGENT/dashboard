"use client";

import { useMockActionLogs } from "@/hooks/useMockData";
import { useState } from "react";

type Category = "outreach" | "content" | "code" | "research" | "other";
type Status = "pending" | "success" | "failure" | "partial" | "unknown";

const categoryColors: Record<Category, string> = {
  outreach: "cyan",
  content: "purple",
  code: "emerald",
  research: "blue",
  other: "gray",
};

const statusColors: Record<Status, string> = {
  pending: "amber",
  success: "green",
  failure: "red",
  partial: "orange",
  unknown: "gray",
};

export function ActionLog() {
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");

  const allActions = useMockActionLogs();

  const actions = allActions.filter(a => {
    if (filterCategory !== "all" && a.category !== filterCategory) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    return true;
  });

  const successCount = allActions.filter(a => a.status === "success").length;
  const stats = {
    total: allActions.length,
    successRate: allActions.length > 0 ? (successCount / allActions.length) * 100 : 0,
  };

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const diffMins = Math.floor(diff / 60000);
    const diffHours = Math.floor(diff / 3600000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;

    return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-sm text-emerald-500 tracking-widest uppercase">
          Action Log
        </h2>

        <div className="flex gap-4 items-center">
          <div className="text-right">
            <div className="text-xs text-[#525252] font-mono">SUCCESS RATE</div>
            <div className="font-mono text-lg text-emerald-500">
              {stats.successRate.toFixed(1)}%
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-[#525252] font-mono">TOTAL ACTIONS</div>
            <div className="font-mono text-lg text-white">{stats.total}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as Category | "all")}
          className="bg-[#0c0c0c] border border-[#1e1e1e] rounded px-3 py-1 font-mono text-xs text-cyan-500"
        >
          <option value="all">ALL CATEGORIES</option>
          <option value="outreach">OUTREACH</option>
          <option value="content">CONTENT</option>
          <option value="code">CODE</option>
          <option value="research">RESEARCH</option>
          <option value="other">OTHER</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Status | "all")}
          className="bg-[#0c0c0c] border border-[#1e1e1e] rounded px-3 py-1 font-mono text-xs text-purple-500"
        >
          <option value="all">ALL STATUS</option>
          <option value="pending">PENDING</option>
          <option value="success">SUCCESS</option>
          <option value="failure">FAILURE</option>
          <option value="partial">PARTIAL</option>
        </select>
      </div>

      <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded max-h-[600px] overflow-y-auto">
        <div className="divide-y divide-[#1e1e1e]">
          {actions.map(action => (
            <div key={action._id} className="p-4 hover:bg-[#1e1e1e] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-emerald-500">{action.agent}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded bg-${categoryColors[action.category]}-500/20 text-${categoryColors[action.category]}-500 border border-${categoryColors[action.category]}-500/30`}>
                    {action.category}
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded bg-${statusColors[action.status]}-500/20 text-${statusColors[action.status]}-500 border border-${statusColors[action.status]}-500/30`}>
                    {action.status}
                  </span>
                </div>
                <div className="text-xs text-[#525252] font-mono">
                  {formatTimestamp(action.createdAt)}
                </div>
              </div>

              <div className="text-sm text-white mb-2">{action.action}</div>

              {action.prediction && (
                <div className="text-xs text-[#737373] mb-2">
                  🎯 <span className="italic">Predicted: {action.prediction}</span>
                </div>
              )}

              {action.result && (
                <div className="text-xs text-cyan-500 mb-2">
                  ✓ {action.result}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
