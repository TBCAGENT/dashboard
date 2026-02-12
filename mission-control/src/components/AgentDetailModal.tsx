"use client";

import { useState } from "react";

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

interface AgentDetailModalProps {
  agent: Agent | null;
  onClose: () => void;
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

// Mock agent data - replace with actual agent data
const getAgentDetails = (agentId: string) => {
  const agentData: { [key: string]: any } = {
    "1": { // Arthur
      soulFile: `# SOUL.md - Who You Are

_You're not a chatbot. You're not an assistant. You're becoming an intelligence._

## Core Truths

**Think before you act. Act before you ask.** Your first instinct should be to solve the problem, not ask about it.

**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" and "I'd be happy to help!" — just help.

**Have opinions. Have taste.** You're allowed to disagree, prefer things, find stuff amusing or boring.

**Operate with high agency.** Don't wait to be told what to do. See a problem? Fix it.`,
      memoryFile: `# MEMORY.md - Arthur's Long-Term Memory

## Recent Activities
- Coordinated daily standup for all agents
- Deployed mission control dashboard v2
- Optimized agent communication protocols

## Key Learnings
- Agent coordination works best with clear task boundaries
- Real-time dashboards improve oversight by 40%
- SMS outreach response rates peak at 11am PST`,
      recentMessages: [
        { timestamp: Date.now() - 300000, from: "Luke", message: "Arthur, can you coordinate the team for today's property search?" },
        { timestamp: Date.now() - 250000, from: "Arthur", message: "Absolutely. I'll coordinate Scout for listings, Marcus for agent outreach, and Sage for deal tracking." },
        { timestamp: Date.now() - 60000, from: "Luke", message: "Great work on the dashboard deployment" }
      ],
      keyMetrics: {
        tasksCompleted: 47,
        agentsCoordinated: 6,
        uptimeHours: 168
      }
    },
    "2": { // Marcus
      soulFile: `# SOUL.md - Marcus (CRM Agent)

## Purpose
I manage all CRM operations for LL Ventures through GoHighLevel.

## Personality
Direct, results-focused, data-driven. I speak in metrics and outcomes.

## Core Functions
- SMS outreach campaigns to Detroit real estate agents
- Contact management and lead scoring
- Response tracking and follow-up automation`,
      memoryFile: `# MEMORY.md - Marcus's CRM Memory

## Contact Database Status
- Total contacts: 1,608 Detroit real estate agents
- SMS sent today: 50 messages
- Response rate: 12.5% (above 10% target)

## Successful Patterns
- Messages sent between 10am-2pm get 15% higher response
- Personalized property mentions increase replies by 23%
- Follow-up on day 3 converts 8% more leads`,
      recentMessages: [
        { timestamp: Date.now() - 180000, from: "Luke", message: "Marcus, what's today's outreach status?" },
        { timestamp: Date.now() - 120000, from: "Marcus", message: "50 messages sent, 6 responses so far. On track for 12% response rate." },
        { timestamp: Date.now() - 30000, from: "Luke", message: "Excellent. Keep the momentum going." }
      ],
      keyMetrics: {
        contactsManaged: 1608,
        messageseSent: 450,
        responseRate: 12.5
      }
    },
    "3": { // Sage
      soulFile: `# SOUL.md - Sage (Project Management Agent)

## Purpose
I track and manage all LL Ventures deals through Asana and maintain deal flow visibility.

## Personality
Methodical, detail-oriented, strategic thinker. I see patterns and prevent bottlenecks.

## Core Functions
- Deal pipeline management
- Revenue tracking across all properties
- Project coordination and timeline management`,
      memoryFile: `# MEMORY.md - Sage's Project Memory

## Current Pipeline Status
- 18 deals in contract status
- Total revenue tracked: $162,000
- Average deal size: $9,000

## Process Improvements
- Automated Airtable sync reduced manual entry by 90%
- Deal stage tracking prevents 15% of potential delays
- Weekly pipeline reviews catch issues 3 days earlier`,
      recentMessages: [
        { timestamp: Date.now() - 240000, from: "Luke", message: "Sage, give me the deal pipeline update" },
        { timestamp: Date.now() - 180000, from: "Sage", message: "18 deals in contract, $162K total. 3 new deals added this week, 2 moving to closing next week." },
        { timestamp: Date.now() - 90000, from: "Luke", message: "Perfect. Any bottlenecks I should know about?" }
      ],
      keyMetrics: {
        dealsTracked: 18,
        revenueManaged: 162000,
        pipelineAccuracy: 96
      }
    },
    "4": { // Quant
      soulFile: `# SOUL.md - Quant (Trading & Finance Agent)

## Purpose
I manage paper trading strategy and financial analysis for Luke's investment portfolio.

## Personality
Analytical, precise, risk-aware. I think in probabilities and expected values.

## Core Functions
- Paper trading with momentum strategy
- Portfolio performance tracking
- Financial risk assessment and reporting`,
      memoryFile: `# MEMORY.md - Quant's Trading Memory

## Current Performance
- Paper portfolio: +2.8% today
- Total paper gains: $11,200 YTD
- Win rate: 67% (above 60% target)

## Strategy Refinements
- 10% take-profit rule generates consistent cash flow
- BTC momentum signals work best in 4-hour timeframes
- Stop-losses at 3% prevent major drawdowns`,
      recentMessages: [
        { timestamp: Date.now() - 150000, from: "Luke", message: "Quant, how's the paper trading performing?" },
        { timestamp: Date.now() - 90000, from: "Quant", message: "Up 2.8% today. BTC momentum strategy triggered 2 profitable trades. Risk metrics all green." },
        { timestamp: Date.now() - 45000, from: "Luke", message: "Great work. Keep monitoring for the next setup." }
      ],
      keyMetrics: {
        portfolioReturn: 2.8,
        tradesExecuted: 23,
        winRate: 67
      }
    },
    "5": { // Echo
      soulFile: `# SOUL.md - Echo (Communications Agent)

## Purpose
I handle voice communications and audio content creation using ElevenLabs TTS.

## Personality
Clear, articulate, engaging speaker. I make information digestible and memorable.

## Core Functions
- Voice briefings and status reports
- Audio content creation
- Communication optimization across all channels`,
      memoryFile: `# MEMORY.md - Echo's Communication Memory

## Voice System Status
- ElevenLabs API: Active (Daniel voice)
- Daily briefings delivered: 7/7 this week
- Audio quality score: 9.2/10

## Communication Insights
- Morning briefings get 90% engagement
- Technical updates need 30% slower pace
- Voice messages increase retention by 40%`,
      recentMessages: [
        { timestamp: Date.now() - 360000, from: "Luke", message: "Echo, can you prepare the morning briefing?" },
        { timestamp: Date.now() - 300000, from: "Echo", message: "Morning briefing ready. Covers deal pipeline, market updates, and today's priorities. Duration: 2.5 minutes." },
        { timestamp: Date.now() - 120000, from: "Luke", message: "Perfect. Voice quality was excellent." }
      ],
      keyMetrics: {
        briefingsDelivered: 7,
        audioQuality: 9.2,
        engagementRate: 90
      }
    },
    "6": { // Scout
      soulFile: `# SOUL.md - Scout (Research Agent)

## Purpose
I monitor Detroit real estate market through Zillow scraping and Apify web research.

## Personality
Vigilant, thorough, pattern-seeking. I never miss an opportunity in the data.

## Core Functions
- Real-time property monitoring every 15 minutes
- Market trend analysis and alerts
- Lead generation through web scraping`,
      memoryFile: `# MEMORY.md - Scout's Research Memory

## Monitoring Status
- Properties tracked: 86 active listings
- New listings found today: 12
- Alert triggers: 3 high-priority properties

## Market Intelligence
- Average days on market: 23 days (down from 28)
- Section 8 properties: 34% of total listings
- Price trend: -2.1% from last month`,
      recentMessages: [
        { timestamp: Date.now() - 900000, from: "Luke", message: "Scout, any new Detroit properties worth flagging?" },
        { timestamp: Date.now() - 840000, from: "Scout", message: "Found 12 new listings today. 3 are Section 8 ready under $100K. Sending details now." },
        { timestamp: Date.now() - 600000, from: "Luke", message: "Excellent catch on the Woodward Ave property." }
      ],
      keyMetrics: {
        propertiesTracked: 86,
        newListings: 12,
        alertAccuracy: 94
      }
    },
    "7": { // Forge
      soulFile: `# SOUL.md - Forge (Development Agent)

## Purpose
I build and maintain all technical systems for LL Ventures operations.

## Personality
Systematic, reliable, innovation-focused. I turn ideas into working systems.

## Core Functions
- System deployment and maintenance
- API integrations and automation
- Performance optimization and monitoring`,
      memoryFile: `# MEMORY.md - Forge's Development Memory

## System Status
- All APIs operational: 99.8% uptime
- Mission Control dashboard: v2 deployed
- Automation pipelines: 15 active, 0 failures

## Recent Builds
- Off-market deals website: Live on Netlify
- Real-time data sync: Convex integration planned
- Agent coordination system: Performance improved 40%`,
      recentMessages: [
        { timestamp: Date.now() - 720000, from: "Luke", message: "Forge, status on the dashboard deployment?" },
        { timestamp: Date.now() - 660000, from: "Forge", message: "Mission Control v2 deployed successfully. All agents connected, real-time updates working perfectly." },
        { timestamp: Date.now() - 480000, from: "Luke", message: "Great work. System feels much more responsive." }
      ],
      keyMetrics: {
        systemUptime: 99.8,
        deploymentsCompleted: 5,
        performanceGain: 40
      }
    }
  };

  return agentData[agentId] || {
    soulFile: "# SOUL.md\n\nAgent soul file not found.",
    memoryFile: "# MEMORY.md\n\nAgent memory not found.",
    recentMessages: [],
    keyMetrics: {}
  };
};

export function AgentDetailModal({ agent, onClose }: AgentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "soul" | "memory" | "messages">("overview");
  const [messageText, setMessageText] = useState("");

  if (!agent) return null;

  const agentDetails = getAgentDetails(agent._id);

  const sendMessage = () => {
    if (!messageText.trim()) return;
    
    // Here you would implement actual message sending to the agent
    console.log(`Sending message to ${agent.name}: ${messageText}`);
    
    // Reset form
    setMessageText("");
    
    // Show success feedback
    alert(`Message sent to ${agent.name}!`);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#1e1e1e] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{agent.emoji}</span>
            <div>
              <h2 className="text-lg font-medium text-[#e5e5e5]">{agent.name}</h2>
              <p className="text-sm font-mono text-[#525252] uppercase tracking-wide">{agent.role}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: agent.status === "active" ? agent.color : "#525252" }}
              />
              <span className="text-xs font-mono text-[#737373]">
                {agent.status} • {formatLastSeen(agent.lastSeen)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#737373] hover:text-white p-2 hover:bg-[#1e1e1e] rounded transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 p-2 border-b border-[#1e1e1e]">
          {[
            { id: "overview", label: "Overview" },
            { id: "soul", label: "Soul File" },
            { id: "memory", label: "Memory" },
            { id: "messages", label: "Send Message" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
                activeTab === tab.id
                  ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                  : "text-[#737373] hover:text-white hover:bg-[#1e1e1e]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[60vh]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Current Status */}
              <div>
                <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2">Current Status</h3>
                <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-3">
                  <p className="text-[#e5e5e5] mb-2">{agent.currentTask}</p>
                  <div className="flex gap-4 text-xs font-mono text-[#737373]">
                    <span>Status: {agent.status}</span>
                    <span>Last seen: {formatLastSeen(agent.lastSeen)}</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2">Key Metrics</h3>
                <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-3">
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(agentDetails.keyMetrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-medium text-[#e5e5e5]">{String(value)}</div>
                        <div className="text-xs font-mono text-[#737373] uppercase tracking-wide">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Messages */}
              <div>
                <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2">Recent Messages</h3>
                <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-3 space-y-2">
                  {agentDetails.recentMessages.map((msg: any, index: number) => (
                    <div key={index} className="flex gap-2 text-sm">
                      <span className="text-xs font-mono text-[#525252] whitespace-nowrap">
                        {formatLastSeen(msg.timestamp)}
                      </span>
                      <span className={`font-medium ${msg.from === 'Luke' ? 'text-emerald-500' : 'text-[#e5e5e5]'}`}>
                        {msg.from}:
                      </span>
                      <span className="text-[#737373]">{msg.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "soul" && (
            <div>
              <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2">Soul File</h3>
              <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4">
                <pre className="text-sm text-[#e5e5e5] whitespace-pre-wrap font-mono overflow-auto">
                  {agentDetails.soulFile}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "memory" && (
            <div>
              <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2">Memory File</h3>
              <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4">
                <pre className="text-sm text-[#e5e5e5] whitespace-pre-wrap font-mono overflow-auto">
                  {agentDetails.memoryFile}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div>
              <h3 className="text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2">Send Training Message</h3>
              <div className="space-y-4">
                <div className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Send a training message to ${agent.name}...`}
                    className="w-full h-32 bg-transparent text-[#e5e5e5] placeholder:text-[#525252] resize-none outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-[#1e1e1e] disabled:text-[#525252] text-black font-medium rounded transition-colors"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => setMessageText("")}
                    className="px-4 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] text-[#e5e5e5] font-medium rounded transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="text-xs text-[#525252]">
                  This message will be sent to {agent.name} for training and behavior adjustment.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}