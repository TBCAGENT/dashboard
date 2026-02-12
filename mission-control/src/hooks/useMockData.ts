// Mock data hooks - replace with Convex queries once backend is connected

export function useMockAgents() {
  return [
    { _id: "1", name: "Arthur", role: "Orchestrator", emoji: "🎩", color: "#10b981", status: "active" as const, currentTask: "Coordinating agents", lastSeen: Date.now() - 30000 },
    { _id: "2", name: "Marcus", role: "CRM (GoHighLevel)", emoji: "📞", color: "#3b82f6", status: "active" as const, currentTask: "Managing 1,608 contacts", lastSeen: Date.now() - 60000 },
    { _id: "3", name: "Sage", role: "Projects (Asana)", emoji: "📋", color: "#8b5cf6", status: "active" as const, currentTask: "Deal tracker: 18 deals, $162K", lastSeen: Date.now() - 300000 },
    { _id: "4", name: "Quant", role: "Trading & Finance", emoji: "📈", color: "#f59e0b", status: "active" as const, currentTask: "Portfolio +2.8%", lastSeen: Date.now() - 15000 },
    { _id: "5", name: "Echo", role: "Communications", emoji: "🔊", color: "#ec4899", status: "idle" as const, currentTask: "Voice ready", lastSeen: Date.now() - 120000 },
    { _id: "6", name: "Scout", role: "Research (Apify)", emoji: "🔍", color: "#14b8a6", status: "active" as const, currentTask: "Monitoring Detroit listings", lastSeen: Date.now() - 45000 },
    { _id: "7", name: "Forge", role: "Development", emoji: "⚙️", color: "#f97316", status: "idle" as const, currentTask: "Systems operational", lastSeen: Date.now() - 200000 },
  ];
}

export function useMockTasks() {
  return [
    { _id: "1", title: "Detroit Property Monitoring", description: "Real-time Zillow scraping every 15 min", status: "in_progress" as const, assignee: "Scout", priority: "P0" as const, createdAt: Date.now() - 3600000, updatedAt: Date.now() - 300000 },
    { _id: "2", title: "Agent SMS Outreach", description: "Daily outreach to Detroit agents via GHL", status: "in_progress" as const, assignee: "Marcus", priority: "P0" as const, createdAt: Date.now() - 7200000, updatedAt: Date.now() - 600000 },
    { _id: "3", title: "Paper Trading Monitor", description: "Crypto positions with momentum strategy", status: "in_progress" as const, assignee: "Quant", priority: "P1" as const, createdAt: Date.now() - 10800000, updatedAt: Date.now() - 900000 },
    { _id: "4", title: "Deal Revenue Tracker", description: "Live Airtable: 18 deals, $162K revenue", status: "done" as const, assignee: "Sage", priority: "P0" as const, createdAt: Date.now() - 1800000, updatedAt: Date.now() - 120000 },
    { _id: "5", title: "Status Report System", description: "Voice briefings via ElevenLabs", status: "done" as const, assignee: "Echo", priority: "P1" as const, createdAt: Date.now() - 900000, updatedAt: Date.now() - 900000 },
    { _id: "6", title: "Off-Market Deals Website", description: "Lead generation funnel deployed to Netlify", status: "done" as const, assignee: "Forge", priority: "P1" as const, createdAt: Date.now() - 259200000, updatedAt: Date.now() - 259200000 },
  ];
}

export function useMockActivities() {
  return [
    { _id: "1", agent: "Forge", action: "Off-Market Deals Website launched", detail: "Lead generation funnel deployed to Netlify", timestamp: Date.now() - 259200000 }, // 3 days ago
    { _id: "2", agent: "Scout", action: "Property scraping completed", detail: "Found 12 new Detroit listings", timestamp: Date.now() },
    { _id: "3", agent: "Marcus", action: "Response received", detail: "Agent replied to SMS outreach", timestamp: Date.now() - 300000 },
    { _id: "4", agent: "Quant", action: "Portfolio updated", detail: "Paper trading +2.8% today", timestamp: Date.now() - 600000 },
    { _id: "5", agent: "Sage", action: "Pipeline synced", detail: "18 deals in contract status", timestamp: Date.now() - 900000 },
    { _id: "6", agent: "Arthur", action: "Status report delivered", detail: "Voice briefing sent via WhatsApp", timestamp: Date.now() - 1200000 },
  ];
}

export function useMockMetrics() {
  return [
    { _id: "1", key: "revenue", value: 162000, updatedAt: Date.now() },
    { _id: "2", key: "contacts", value: 1608, updatedAt: Date.now() },
    { _id: "3", key: "deals_in_contract", value: 18, updatedAt: Date.now() },
    { _id: "4", key: "properties_tracked", value: 86, updatedAt: Date.now() }
  ];
}

type LeadStatus = "new" | "contacted" | "replied" | "meeting" | "proposal" | "won" | "lost" | "nurture";

interface MockLead {
  _id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  source?: string;
  lastContact?: number;
  value?: number;
  notes?: string;
  nextAction?: string;
  nextActionDate?: number;
  followUpDate?: number;
  meetingDate?: number;
  assignee?: string;
}

export function useMockLeads(): MockLead[] {
  return [
    // New leads
    { _id: "1", name: "Sarah Johnson", company: "Premier Homes", email: "sarah@premierhomes.com", phone: "+13135551001", status: "new", source: "website", lastContact: Date.now() - 3600000, value: 12000, nextAction: "Initial outreach", nextActionDate: Date.now() + 86400000, assignee: "Marcus" },
    { _id: "2", name: "David Chen", company: "Metro Investments", email: "dchen@metroinv.com", phone: "+13135551002", status: "new", source: "referral", lastContact: Date.now() - 7200000, value: 35000, nextAction: "Send intro email", nextActionDate: Date.now() + 43200000, assignee: "Marcus" },
    // Contacted
    { _id: "3", name: "Jennifer Parks", company: "HomeFinders LLC", email: "j.parks@homefinders.com", phone: "+13139876543", status: "contacted", source: "zillow", lastContact: Date.now() - 300000, value: 8500, notes: "Section 8 focus", nextAction: "Follow up", nextActionDate: Date.now() + 3600000, assignee: "Marcus" },
    { _id: "4", name: "Tom Bradley", company: "Lakeside RE", email: "tom@lakesidere.com", phone: "+13135551004", status: "contacted", source: "outreach", lastContact: Date.now() - 86400000, value: 18000, nextAction: "Second follow-up", nextActionDate: Date.now() - 3600000, assignee: "Marcus" },
    // Replied
    { _id: "5", name: "Agent Smith", company: "Detroit Realty", email: "smith@detroitrealty.com", phone: "+13138675309", status: "replied", source: "outreach", lastContact: Date.now(), value: 15000, notes: "Interested in bulk deals", nextAction: "Send property portfolio", nextActionDate: Date.now() + 86400000, assignee: "Marcus" },
    { _id: "6", name: "Lisa Wong", company: "Capital Properties", email: "lwong@capitalprop.com", phone: "+13135551006", status: "replied", source: "cold-call", lastContact: Date.now() - 172800000, value: 22000, nextAction: "Schedule call", nextActionDate: Date.now() + 86400000, assignee: "Sage" },
    // Meeting
    { _id: "7", name: "Mike Rodriguez", company: "Michigan RE", email: "mike@michiganre.net", phone: "+13134567890", status: "meeting", source: "referral", lastContact: Date.now() - 86400000, value: 25000, notes: "Monday 2pm", nextAction: "Prepare materials", nextActionDate: Date.now() + 172800000, meetingDate: Date.now() + 172800000, assignee: "Sage" },
    // Proposal
    { _id: "8", name: "Amanda Foster", company: "Citywide Realty", email: "amanda@citywidere.com", phone: "+13135551008", status: "proposal", source: "network", lastContact: Date.now() - 259200000, value: 45000, notes: "Reviewing terms", nextAction: "Follow up on proposal", nextActionDate: Date.now() + 86400000, assignee: "Sage" },
    { _id: "9", name: "Robert Kim", company: "Apex Holdings", email: "rkim@apexhold.com", phone: "+13135551009", status: "proposal", source: "referral", lastContact: Date.now() - 432000000, value: 65000, nextAction: "Negotiate terms", nextActionDate: Date.now() + 172800000, assignee: "Arthur" },
    // Won
    { _id: "10", name: "Patricia Moore", company: "Sterling Investments", email: "pmoore@sterling.com", phone: "+13135551010", status: "won", source: "referral", lastContact: Date.now() - 604800000, value: 55000, notes: "Closed 5 deals", assignee: "Sage" },
    { _id: "11", name: "James Wilson", company: "Heartland RE", email: "jwilson@heartlandre.com", phone: "+13135551011", status: "won", source: "website", lastContact: Date.now() - 1209600000, value: 38000, assignee: "Marcus" },
    // Lost
    { _id: "12", name: "Karen Davis", company: "Sunset Properties", email: "kdavis@sunsetprop.com", phone: "+13135551012", status: "lost", source: "outreach", lastContact: Date.now() - 2592000000, value: 20000, notes: "Went with competitor", assignee: "Marcus" },
    // Nurture
    { _id: "13", name: "Brian Taylor", company: "Midwest Homes", email: "btaylor@midwesthomes.com", phone: "+13135551013", status: "nurture", source: "conference", lastContact: Date.now() - 1814400000, value: 30000, notes: "Not ready now, check Q3", nextAction: "Quarterly check-in", nextActionDate: Date.now() + 7776000000, assignee: "Marcus" },
    { _id: "14", name: "Nancy White", company: "Harbor Realty", email: "nwhite@harborre.com", phone: "+13135551014", status: "nurture", source: "referral", lastContact: Date.now() - 2419200000, value: 28000, notes: "Budget constraints", nextAction: "Send market update", nextActionDate: Date.now() + 2592000000, assignee: "Sage" },
  ];
}

type ActionStatus = "pending" | "success" | "failure" | "partial" | "unknown";
type ActionCategory = "outreach" | "content" | "code" | "research" | "other";

interface MockActionLog {
  _id: string;
  action: string;
  category: ActionCategory;
  agent: string;
  status: ActionStatus;
  timestamp: number;
  createdAt: number;
  result?: string;
  prediction?: string;
  outcome?: string;
  lessonsLearned?: string;
}

export function useMockActionLogs(): MockActionLog[] {
  return [
    { _id: "1", action: "SMS outreach campaign", category: "outreach", agent: "Marcus", status: "success", timestamp: Date.now(), createdAt: Date.now(), result: "50 messages sent", prediction: "10-15 responses expected" },
    { _id: "2", action: "Property scraping", category: "research", agent: "Scout", status: "success", timestamp: Date.now() - 300000, createdAt: Date.now() - 300000, result: "86 properties indexed" },
    { _id: "3", action: "Portfolio analysis", category: "research", agent: "Quant", status: "pending", timestamp: Date.now() - 600000, createdAt: Date.now() - 600000, prediction: "Expecting +3% by EOD" },
  ];
}

export function useMockBuildQueue() {
  return {
    items: [
      { _id: "1", title: "Deploy V2 Dashboard", description: "New agent architecture", priority: "P0" as const, status: "in_progress" as const, sortOrder: 1 },
      { _id: "2", title: "Connect Convex Backend", description: "Real-time data sync", priority: "P1" as const, status: "queued" as const, sortOrder: 2 },
    ],
    counts: { P0: 1, P1: 1, P2: 0, queued: 1, inProgress: 1, shipped: 0 },
    lastUpdatedAt: Date.now()
  };
}

export function useMockRevenue() {
  return {
    total: 162000,
    byPeriod: [
      { period: "2026-02-11", amount: 12000 },
      { period: "2026-02-10", amount: 8500 },
      { period: "2026-02-09", amount: 15000 },
    ],
    byProduct: [
      { product: "LL Ventures Deals", amount: 162000 },
    ]
  };
}

type DealStage = "off_market" | "pending_contract" | "in_contract" | "closed";

interface MockDeal {
  _id: string;
  address: string;
  city: string;
  stage: DealStage;
  value: number;
  agent?: string;
  addedAt: number;
}

export function useMockDeals(): MockDeal[] {
  // 18 deals in contract, $162K total revenue
  return [
    { _id: "d1", address: "1842 Oakwood Dr", city: "Detroit", stage: "in_contract", value: 900000, agent: "Sage", addedAt: Date.now() - 86400000 },
    { _id: "d2", address: "3921 Elmhurst St", city: "Detroit", stage: "in_contract", value: 850000, agent: "Marcus", addedAt: Date.now() - 172800000 },
    { _id: "d3", address: "567 Maple Ave", city: "Dearborn", stage: "in_contract", value: 920000, agent: "Sage", addedAt: Date.now() - 259200000 },
    { _id: "d4", address: "2145 Jefferson Blvd", city: "Detroit", stage: "in_contract", value: 1050000, agent: "Marcus", addedAt: Date.now() - 345600000 },
    { _id: "d5", address: "891 Woodward Ave", city: "Detroit", stage: "in_contract", value: 780000, agent: "Sage", addedAt: Date.now() - 432000000 },
    { _id: "d6", address: "4420 Grand River", city: "Detroit", stage: "in_contract", value: 950000, agent: "Marcus", addedAt: Date.now() - 518400000 },
    { _id: "d7", address: "1567 Livernois", city: "Detroit", stage: "in_contract", value: 870000, agent: "Sage", addedAt: Date.now() - 604800000 },
    { _id: "d8", address: "7823 Gratiot Ave", city: "Detroit", stage: "in_contract", value: 1100000, agent: "Marcus", addedAt: Date.now() - 691200000 },
    { _id: "d9", address: "3456 Michigan Ave", city: "Detroit", stage: "in_contract", value: 820000, agent: "Sage", addedAt: Date.now() - 777600000 },
    { _id: "d10", address: "9012 Fort St", city: "Lincoln Park", stage: "in_contract", value: 960000, agent: "Marcus", addedAt: Date.now() - 864000000 },
    { _id: "d11", address: "2234 Van Dyke", city: "Detroit", stage: "in_contract", value: 890000, agent: "Sage", addedAt: Date.now() - 950400000 },
    { _id: "d12", address: "5678 Telegraph Rd", city: "Dearborn", stage: "in_contract", value: 1020000, agent: "Marcus", addedAt: Date.now() - 1036800000 },
    { _id: "d13", address: "1100 Bagley St", city: "Detroit", stage: "in_contract", value: 830000, agent: "Sage", addedAt: Date.now() - 1123200000 },
    { _id: "d14", address: "4567 Cass Ave", city: "Detroit", stage: "in_contract", value: 910000, agent: "Marcus", addedAt: Date.now() - 1209600000 },
    { _id: "d15", address: "8901 Warren Ave", city: "Detroit", stage: "in_contract", value: 980000, agent: "Sage", addedAt: Date.now() - 1296000000 },
    { _id: "d16", address: "2345 Joy Rd", city: "Detroit", stage: "in_contract", value: 840000, agent: "Marcus", addedAt: Date.now() - 1382400000 },
    { _id: "d17", address: "6789 Plymouth Rd", city: "Detroit", stage: "in_contract", value: 1080000, agent: "Sage", addedAt: Date.now() - 1468800000 },
    { _id: "d18", address: "3210 7 Mile Rd", city: "Detroit", stage: "in_contract", value: 450000, agent: "Marcus", addedAt: Date.now() - 1555200000 },
  ];
}
