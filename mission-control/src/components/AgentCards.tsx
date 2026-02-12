"use client";

interface Agent {
  _id: string;
  name: string;
  role: string;
  emoji: string;
  color: string;
  status: "active" | "idle";
  currentTask: string;
  lastSeen: number;
}

function formatLastSeen(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  return `${hours}h ago`;
}

export function AgentCards({ agents }: { agents: Agent[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {agents.map((agent) => (
        <div
          key={agent._id}
          className={`
            relative rounded-lg border bg-[#111111] p-3
            transition-all duration-300 w-[160px] flex-shrink-0
            ${agent.status === "active" ? "agent-active" : "agent-idle"}
          `}
          style={{ borderColor: `${agent.color}40` }}
        >
          {/* Agent Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{agent.emoji}</span>
              <div>
                <div className="text-sm font-medium text-[#e5e5e5]">{agent.name}</div>
                <div className="text-[10px] font-mono text-[#525252] uppercase tracking-wide">
                  {agent.role}
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: agent.status === "active" ? agent.color : "#525252" }}
              />
              {agent.status === "active" && (
                <div
                  className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: agent.color }}
                />
              )}
            </div>
          </div>

          {/* Current Task */}
          <div className="text-xs text-[#737373] truncate mb-2 font-mono">
            {agent.currentTask}
          </div>

          {/* Last Seen */}
          <div className="text-[10px] font-mono text-[#3a3a3a]">
            {formatLastSeen(agent.lastSeen)}
          </div>

          {/* Glow effect for active agents */}
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ backgroundColor: `${agent.color}08` }}
          />
        </div>
      ))}
    </div>
  );
}
