"use client";

import { useMockAgents } from "@/hooks/useMockData";
import Link from "next/link";

export default function SettingsPage() {
  const agents = useMockAgents();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#1e1e1e] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-xs text-[#525252] hover:text-emerald-500 transition-colors"
          >
            ← BACK TO DASHBOARD
          </Link>
          <div className="h-4 w-px bg-[#2a2a2a]" />
          <span className="font-mono text-xs text-emerald-500 tracking-widest uppercase">
            Agent Settings
          </span>
        </div>
      </header>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-[#0c0c0c] border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-lg p-6 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${agent.color}20` }}
                  >
                    {agent.emoji}
                  </div>
                  <div>
                    <div className="font-mono text-sm text-white">{agent.name}</div>
                    <div className="font-mono text-xs text-[#737373]">{agent.role}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: agent.color }}
                      />
                      <span className="font-mono text-xs text-[#525252]">{agent.color}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#525252]">
                  {agent.status === "active" ? "🟢 Active" : "⚪ Idle"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
