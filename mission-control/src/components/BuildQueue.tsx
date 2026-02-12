"use client";

import { useMemo, useState } from "react";
import { useMockBuildQueue } from "@/hooks/useMockData";

type QueuePriority = "P0" | "P1" | "P2";
type QueueStatus = "queued" | "in_progress" | "shipped";

const statusStyles: Record<QueueStatus, string> = {
  queued: "text-slate-300 border-slate-400/30 bg-slate-500/10",
  in_progress: "text-amber-300 border-amber-400/30 bg-amber-500/10",
  shipped: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
};

const priorityStyles: Record<QueuePriority, string> = {
  P0: "text-red-300 border-red-400/30 bg-red-500/10",
  P1: "text-amber-300 border-amber-400/30 bg-amber-500/10",
  P2: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10",
};

export function BuildQueue() {
  const queueData = useMockBuildQueue();
  const [selectedPriority, setSelectedPriority] = useState<"all" | QueuePriority>("all");

  const filteredItems = useMemo(() => {
    const items = queueData.items;
    if (selectedPriority === "all") return items;
    return items.filter((item) => item.priority === selectedPriority);
  }, [queueData.items, selectedPriority]);

  const counts = queueData.counts;

  const lastUpdatedLabel = queueData.lastUpdatedAt
    ? new Date(queueData.lastUpdatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "--";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-sm text-emerald-500 tracking-widest uppercase">Build Queue</h2>
        <span className="font-mono text-xs text-[#737373]">LAST SYNC {lastUpdatedLabel}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="border border-slate-400/20 bg-slate-500/5 rounded px-3 py-2">
          <div className="font-mono text-xs text-slate-300 uppercase">Queued</div>
          <div className="font-mono text-xl text-white">{counts.queued}</div>
        </div>
        <div className="border border-amber-400/20 bg-amber-500/5 rounded px-3 py-2">
          <div className="font-mono text-xs text-amber-300 uppercase">In Progress</div>
          <div className="font-mono text-xl text-white">{counts.inProgress}</div>
        </div>
        <div className="border border-emerald-400/20 bg-emerald-500/5 rounded px-3 py-2">
          <div className="font-mono text-xs text-emerald-300 uppercase">Shipped</div>
          <div className="font-mono text-xl text-white">{counts.shipped}</div>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-[#0c0c0c] border border-[#1e1e1e] rounded inline-flex">
        {(["all", "P0", "P1", "P2"] as const).map((priority) => (
          <button
            key={priority}
            onClick={() => setSelectedPriority(priority)}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
              selectedPriority === priority
                ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                : "text-[#737373] hover:text-white hover:bg-[#1e1e1e]"
            }`}
          >
            {priority === "all" ? "ALL" : priority}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-[400px] overflow-auto pr-1">
        {filteredItems.map((item) => (
          <div key={item._id} className="border border-[#1e1e1e] rounded p-3 bg-[#0c0c0c]">
            <div className="flex items-start gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded border font-mono text-xs uppercase ${statusStyles[item.status]}`}>
                {item.status.replace("_", " ")}
              </span>
              <span className={`px-2 py-0.5 rounded border font-mono text-xs ${priorityStyles[item.priority]}`}>
                {item.priority}
              </span>
              <div className="text-sm text-white font-medium leading-tight flex-1">{item.title}</div>
            </div>

            {item.description && <p className="text-xs text-[#8a8a8a]">{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
