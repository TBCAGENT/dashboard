"use client";

interface Activity {
  _id: string;
  agent: string;
  action: string;
  detail: string;
  timestamp: number;
}

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

function formatTimestamp(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ActivityFeed({
  activities,
  agents,
  onActivityClick,
}: {
  activities: Activity[];
  agents: Agent[];
  onActivityClick?: (activity: Activity, agent: Agent) => void;
}) {
  const agentMap = new Map(agents.map((a) => [a.name, { emoji: a.emoji, color: a.color }]));

  return (
    <div className="flex-1 flex flex-col rounded-lg border border-[#1e1e1e] bg-[#111111] min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e]">
        <span className="font-mono text-xs text-[#737373] uppercase tracking-wider">
          Activity Feed
        </span>
        <span className="font-mono text-[10px] text-[#3a3a3a]">
          {activities.length} events
        </span>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activities.map((activity) => {
          const agentData = agentMap.get(activity.agent);
          const agent = agents.find(a => a.name === activity.agent);
          return (
            <div
              key={activity._id}
              onClick={() => agent && onActivityClick?.(activity, agent)}
              className={`flex items-start gap-3 p-2.5 rounded border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#2a2a2a] transition-colors ${
                onActivityClick ? 'cursor-pointer hover:bg-[#0f0f0f]' : ''
              }`}
            >
              <span className="text-lg flex-shrink-0">{agentData?.emoji || "⚡"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: agentData?.color || "#10b981" }}
                  >
                    {activity.agent}
                  </span>
                  <span className="text-[10px] text-[#3a3a3a]">•</span>
                  <span className="text-[10px] text-[#3a3a3a] font-mono">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                <div className="text-xs text-[#e5e5e5] mb-1">{activity.action}</div>
                <div className="text-[11px] text-[#525252]">{activity.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
