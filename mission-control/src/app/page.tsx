"use client";

import { useMockAgents, useMockTasks, useMockActivities, useMockMetrics } from "@/hooks/useMockData";
import { AgentCards } from "@/components/AgentCards";
import { ActivityFeed } from "@/components/ActivityFeed";
import { TaskBoard } from "@/components/TaskBoard";
import { MetricsBar } from "@/components/MetricsBar";
import { Header } from "@/components/Header";
import { RevenueTrackerV2 } from "@/components/RevenueTrackerV2";
import { BuildQueue } from "@/components/BuildQueue";
import { TaskCreator } from "@/components/TaskCreator";
import { LeadTracker } from "@/components/LeadTracker";
import { ActionLog } from "@/components/ActionLog";
import { FinancialsTab } from "@/components/FinancialsTab";
import { AgentDetailModal } from "@/components/AgentDetailModal";
import { ActivityDetailModal } from "@/components/ActivityDetailModal";
import { useState } from "react";

type TabType = "dashboard" | "leads" | "actions" | "financials";

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

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
        isActive
          ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
          : "text-[#737373] hover:text-white hover:bg-[#1e1e1e] border border-transparent"
      }`}
    >
      {label}
    </button>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [selectedActivityAgent, setSelectedActivityAgent] = useState<Agent | null>(null);

  const agents = useMockAgents();
  const tasks = useMockTasks();
  const activities = useMockActivities();
  const metrics = useMockMetrics();

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleActivityClick = (activity: any, agent: Agent) => {
    setSelectedActivity(activity);
    setSelectedActivityAgent(agent);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "leads":
        return (
          <div className="flex-1 px-4 pb-3 overflow-auto">
            <LeadTracker />
          </div>
        );

      case "actions":
        return (
          <div className="flex-1 px-4 pb-3 overflow-auto">
            <ActionLog />
          </div>
        );

      case "financials":
        return (
          <div className="flex-1 px-4 pb-3 overflow-auto">
            <FinancialsTab />
          </div>
        );

      default: // dashboard
        return (
          <div className="flex-1 overflow-auto">
            {/* Agent Status Cards */}
            <div className="px-4 py-3">
              <AgentCards agents={agents} onAgentClick={handleAgentClick} />
            </div>

            {/* Main Content: Activity Feed + Task Board */}
            <div className="flex-1 flex gap-4 px-4 pb-3 min-h-0">
              {/* Activity Feed - 60% */}
              <div className="w-[60%] flex flex-col min-h-0">
                <ActivityFeed 
                  activities={activities} 
                  agents={agents} 
                  onActivityClick={handleActivityClick} 
                />
              </div>

              {/* Task Board - 40% */}
              <div className="w-[40%] flex flex-col min-h-0">
                <TaskBoard tasks={tasks} agents={agents} />
              </div>
            </div>

            {/* Mission Control+ Features */}
            <div className="px-4 pb-6 pt-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-sm text-emerald-500 tracking-widest uppercase">
                  Mission Control+
                </h2>
                <span className="font-mono text-xs text-[#525252]">REVENUE + QUEUE + TASK CREATION</span>
              </div>

              <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4">
                <RevenueTrackerV2 />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2 bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4">
                  <BuildQueue />
                </div>
                <div className="xl:col-span-1">
                  <TaskCreator agents={agents} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header agentCount={agents.length} activeCount={agents.filter(a => a.status === "active").length} />

      {/* Tab Navigation */}
      <div className="px-4 py-2 border-b border-[#1e1e1e]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <TabButton
              label="Dashboard"
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <TabButton
              label="Leads"
              isActive={activeTab === "leads"}
              onClick={() => setActiveTab("leads")}
            />
            <TabButton
              label="Actions"
              isActive={activeTab === "actions"}
              onClick={() => setActiveTab("actions")}
            />
            <TabButton
              label="Financials"
              isActive={activeTab === "financials"}
              onClick={() => setActiveTab("financials")}
            />
          </div>
          <a
            href="/settings"
            className="px-3 py-1 font-mono text-xs text-[#737373] hover:text-emerald-500 hover:bg-[#1e1e1e] rounded transition-colors uppercase tracking-wider"
          >
            ⚙️ Settings
          </a>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Metrics Bar (only on dashboard) */}
      {activeTab === "dashboard" && (
        <MetricsBar metrics={metrics} tasks={tasks} />
      )}

      {/* Agent Detail Modal */}
      <AgentDetailModal 
        agent={selectedAgent} 
        onClose={() => setSelectedAgent(null)} 
      />

      {/* Activity Detail Modal */}
      <ActivityDetailModal 
        activity={selectedActivity}
        agent={selectedActivityAgent}
        onClose={() => {
          setSelectedActivity(null);
          setSelectedActivityAgent(null);
        }} 
      />
    </div>
  );
}
