(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useMockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data hooks - replace with Convex queries once backend is connected
__turbopack_context__.s([
    "useMockActionLogs",
    ()=>useMockActionLogs,
    "useMockActivities",
    ()=>useMockActivities,
    "useMockAgents",
    ()=>useMockAgents,
    "useMockBuildQueue",
    ()=>useMockBuildQueue,
    "useMockDeals",
    ()=>useMockDeals,
    "useMockLeads",
    ()=>useMockLeads,
    "useMockMetrics",
    ()=>useMockMetrics,
    "useMockRevenue",
    ()=>useMockRevenue,
    "useMockTasks",
    ()=>useMockTasks
]);
function useMockAgents() {
    return [
        {
            _id: "1",
            name: "Arthur",
            role: "Orchestrator",
            emoji: "🎩",
            color: "#10b981",
            status: "active",
            currentTask: "Coordinating agents",
            lastSeen: Date.now() - 30000
        },
        {
            _id: "2",
            name: "Marcus",
            role: "CRM (GoHighLevel)",
            emoji: "📞",
            color: "#3b82f6",
            status: "active",
            currentTask: "Managing 1,608 contacts",
            lastSeen: Date.now() - 60000
        },
        {
            _id: "3",
            name: "Sage",
            role: "Projects (Asana)",
            emoji: "📋",
            color: "#8b5cf6",
            status: "active",
            currentTask: "Deal tracker: 18 deals, $162K",
            lastSeen: Date.now() - 300000
        },
        {
            _id: "4",
            name: "Quant",
            role: "Trading & Finance",
            emoji: "📈",
            color: "#f59e0b",
            status: "active",
            currentTask: "Portfolio +2.8%",
            lastSeen: Date.now() - 15000
        },
        {
            _id: "5",
            name: "Echo",
            role: "Communications",
            emoji: "🔊",
            color: "#ec4899",
            status: "idle",
            currentTask: "Voice ready",
            lastSeen: Date.now() - 120000
        },
        {
            _id: "6",
            name: "Scout",
            role: "Research (Apify)",
            emoji: "🔍",
            color: "#14b8a6",
            status: "active",
            currentTask: "Monitoring Detroit listings",
            lastSeen: Date.now() - 45000
        },
        {
            _id: "7",
            name: "Forge",
            role: "Development",
            emoji: "⚙️",
            color: "#f97316",
            status: "idle",
            currentTask: "Systems operational",
            lastSeen: Date.now() - 200000
        }
    ];
}
function useMockTasks() {
    return [
        {
            _id: "1",
            title: "Detroit Property Monitoring",
            description: "Real-time Zillow scraping every 15 min",
            status: "in_progress",
            assignee: "Scout",
            priority: "P0",
            createdAt: Date.now() - 3600000,
            updatedAt: Date.now() - 300000
        },
        {
            _id: "2",
            title: "Agent SMS Outreach",
            description: "Daily outreach to Detroit agents via GHL",
            status: "in_progress",
            assignee: "Marcus",
            priority: "P0",
            createdAt: Date.now() - 7200000,
            updatedAt: Date.now() - 600000
        },
        {
            _id: "3",
            title: "Paper Trading Monitor",
            description: "Crypto positions with momentum strategy",
            status: "in_progress",
            assignee: "Quant",
            priority: "P1",
            createdAt: Date.now() - 10800000,
            updatedAt: Date.now() - 900000
        },
        {
            _id: "4",
            title: "Deal Revenue Tracker",
            description: "Live Airtable: 18 deals, $162K revenue",
            status: "done",
            assignee: "Sage",
            priority: "P0",
            createdAt: Date.now() - 1800000,
            updatedAt: Date.now() - 120000
        },
        {
            _id: "5",
            title: "Status Report System",
            description: "Voice briefings via ElevenLabs",
            status: "done",
            assignee: "Echo",
            priority: "P1",
            createdAt: Date.now() - 900000,
            updatedAt: Date.now() - 900000
        },
        {
            _id: "6",
            title: "Off-Market Deals Website",
            description: "Lead generation funnel deployed to Netlify",
            status: "done",
            assignee: "Forge",
            priority: "P1",
            createdAt: Date.now() - 259200000,
            updatedAt: Date.now() - 259200000
        }
    ];
}
function useMockActivities() {
    return [
        {
            _id: "1",
            agent: "Forge",
            action: "Off-Market Deals Website launched",
            detail: "Lead generation funnel deployed to Netlify",
            timestamp: Date.now() - 259200000
        },
        {
            _id: "2",
            agent: "Scout",
            action: "Property scraping completed",
            detail: "Found 12 new Detroit listings",
            timestamp: Date.now()
        },
        {
            _id: "3",
            agent: "Marcus",
            action: "Response received",
            detail: "Agent replied to SMS outreach",
            timestamp: Date.now() - 300000
        },
        {
            _id: "4",
            agent: "Quant",
            action: "Portfolio updated",
            detail: "Paper trading +2.8% today",
            timestamp: Date.now() - 600000
        },
        {
            _id: "5",
            agent: "Sage",
            action: "Pipeline synced",
            detail: "18 deals in contract status",
            timestamp: Date.now() - 900000
        },
        {
            _id: "6",
            agent: "Arthur",
            action: "Status report delivered",
            detail: "Voice briefing sent via WhatsApp",
            timestamp: Date.now() - 1200000
        }
    ];
}
function useMockMetrics() {
    return [
        {
            _id: "1",
            key: "revenue",
            value: 162000,
            updatedAt: Date.now()
        },
        {
            _id: "2",
            key: "contacts",
            value: 1608,
            updatedAt: Date.now()
        },
        {
            _id: "3",
            key: "deals_in_contract",
            value: 18,
            updatedAt: Date.now()
        },
        {
            _id: "4",
            key: "properties_tracked",
            value: 86,
            updatedAt: Date.now()
        }
    ];
}
function useMockLeads() {
    return [
        // New leads
        {
            _id: "1",
            name: "Sarah Johnson",
            company: "Premier Homes",
            email: "sarah@premierhomes.com",
            phone: "+13135551001",
            status: "new",
            source: "website",
            lastContact: Date.now() - 3600000,
            value: 12000,
            nextAction: "Initial outreach",
            nextActionDate: Date.now() + 86400000,
            assignee: "Marcus"
        },
        {
            _id: "2",
            name: "David Chen",
            company: "Metro Investments",
            email: "dchen@metroinv.com",
            phone: "+13135551002",
            status: "new",
            source: "referral",
            lastContact: Date.now() - 7200000,
            value: 35000,
            nextAction: "Send intro email",
            nextActionDate: Date.now() + 43200000,
            assignee: "Marcus"
        },
        // Contacted
        {
            _id: "3",
            name: "Jennifer Parks",
            company: "HomeFinders LLC",
            email: "j.parks@homefinders.com",
            phone: "+13139876543",
            status: "contacted",
            source: "zillow",
            lastContact: Date.now() - 300000,
            value: 8500,
            notes: "Section 8 focus",
            nextAction: "Follow up",
            nextActionDate: Date.now() + 3600000,
            assignee: "Marcus"
        },
        {
            _id: "4",
            name: "Tom Bradley",
            company: "Lakeside RE",
            email: "tom@lakesidere.com",
            phone: "+13135551004",
            status: "contacted",
            source: "outreach",
            lastContact: Date.now() - 86400000,
            value: 18000,
            nextAction: "Second follow-up",
            nextActionDate: Date.now() - 3600000,
            assignee: "Marcus"
        },
        // Replied
        {
            _id: "5",
            name: "Agent Smith",
            company: "Detroit Realty",
            email: "smith@detroitrealty.com",
            phone: "+13138675309",
            status: "replied",
            source: "outreach",
            lastContact: Date.now(),
            value: 15000,
            notes: "Interested in bulk deals",
            nextAction: "Send property portfolio",
            nextActionDate: Date.now() + 86400000,
            assignee: "Marcus"
        },
        {
            _id: "6",
            name: "Lisa Wong",
            company: "Capital Properties",
            email: "lwong@capitalprop.com",
            phone: "+13135551006",
            status: "replied",
            source: "cold-call",
            lastContact: Date.now() - 172800000,
            value: 22000,
            nextAction: "Schedule call",
            nextActionDate: Date.now() + 86400000,
            assignee: "Sage"
        },
        // Meeting
        {
            _id: "7",
            name: "Mike Rodriguez",
            company: "Michigan RE",
            email: "mike@michiganre.net",
            phone: "+13134567890",
            status: "meeting",
            source: "referral",
            lastContact: Date.now() - 86400000,
            value: 25000,
            notes: "Monday 2pm",
            nextAction: "Prepare materials",
            nextActionDate: Date.now() + 172800000,
            meetingDate: Date.now() + 172800000,
            assignee: "Sage"
        },
        // Proposal
        {
            _id: "8",
            name: "Amanda Foster",
            company: "Citywide Realty",
            email: "amanda@citywidere.com",
            phone: "+13135551008",
            status: "proposal",
            source: "network",
            lastContact: Date.now() - 259200000,
            value: 45000,
            notes: "Reviewing terms",
            nextAction: "Follow up on proposal",
            nextActionDate: Date.now() + 86400000,
            assignee: "Sage"
        },
        {
            _id: "9",
            name: "Robert Kim",
            company: "Apex Holdings",
            email: "rkim@apexhold.com",
            phone: "+13135551009",
            status: "proposal",
            source: "referral",
            lastContact: Date.now() - 432000000,
            value: 65000,
            nextAction: "Negotiate terms",
            nextActionDate: Date.now() + 172800000,
            assignee: "Arthur"
        },
        // Won
        {
            _id: "10",
            name: "Patricia Moore",
            company: "Sterling Investments",
            email: "pmoore@sterling.com",
            phone: "+13135551010",
            status: "won",
            source: "referral",
            lastContact: Date.now() - 604800000,
            value: 55000,
            notes: "Closed 5 deals",
            assignee: "Sage"
        },
        {
            _id: "11",
            name: "James Wilson",
            company: "Heartland RE",
            email: "jwilson@heartlandre.com",
            phone: "+13135551011",
            status: "won",
            source: "website",
            lastContact: Date.now() - 1209600000,
            value: 38000,
            assignee: "Marcus"
        },
        // Lost
        {
            _id: "12",
            name: "Karen Davis",
            company: "Sunset Properties",
            email: "kdavis@sunsetprop.com",
            phone: "+13135551012",
            status: "lost",
            source: "outreach",
            lastContact: Date.now() - 2592000000,
            value: 20000,
            notes: "Went with competitor",
            assignee: "Marcus"
        },
        // Nurture
        {
            _id: "13",
            name: "Brian Taylor",
            company: "Midwest Homes",
            email: "btaylor@midwesthomes.com",
            phone: "+13135551013",
            status: "nurture",
            source: "conference",
            lastContact: Date.now() - 1814400000,
            value: 30000,
            notes: "Not ready now, check Q3",
            nextAction: "Quarterly check-in",
            nextActionDate: Date.now() + 7776000000,
            assignee: "Marcus"
        },
        {
            _id: "14",
            name: "Nancy White",
            company: "Harbor Realty",
            email: "nwhite@harborre.com",
            phone: "+13135551014",
            status: "nurture",
            source: "referral",
            lastContact: Date.now() - 2419200000,
            value: 28000,
            notes: "Budget constraints",
            nextAction: "Send market update",
            nextActionDate: Date.now() + 2592000000,
            assignee: "Sage"
        }
    ];
}
function useMockActionLogs() {
    return [
        {
            _id: "1",
            action: "SMS outreach campaign",
            category: "outreach",
            agent: "Marcus",
            status: "success",
            timestamp: Date.now(),
            createdAt: Date.now(),
            result: "50 messages sent",
            prediction: "10-15 responses expected"
        },
        {
            _id: "2",
            action: "Property scraping",
            category: "research",
            agent: "Scout",
            status: "success",
            timestamp: Date.now() - 300000,
            createdAt: Date.now() - 300000,
            result: "86 properties indexed"
        },
        {
            _id: "3",
            action: "Portfolio analysis",
            category: "research",
            agent: "Quant",
            status: "pending",
            timestamp: Date.now() - 600000,
            createdAt: Date.now() - 600000,
            prediction: "Expecting +3% by EOD"
        }
    ];
}
function useMockBuildQueue() {
    return {
        items: [
            {
                _id: "1",
                title: "Deploy V2 Dashboard",
                description: "New agent architecture",
                priority: "P0",
                status: "in_progress",
                sortOrder: 1
            },
            {
                _id: "2",
                title: "Connect Convex Backend",
                description: "Real-time data sync",
                priority: "P1",
                status: "queued",
                sortOrder: 2
            }
        ],
        counts: {
            P0: 1,
            P1: 1,
            P2: 0,
            queued: 1,
            inProgress: 1,
            shipped: 0
        },
        lastUpdatedAt: Date.now()
    };
}
function useMockRevenue() {
    return {
        total: 162000,
        byPeriod: [
            {
                period: "2026-02-11",
                amount: 12000
            },
            {
                period: "2026-02-10",
                amount: 8500
            },
            {
                period: "2026-02-09",
                amount: 15000
            }
        ],
        byProduct: [
            {
                product: "LL Ventures Deals",
                amount: 162000
            }
        ]
    };
}
function useMockDeals() {
    // 18 deals in contract, $162K total revenue
    return [
        {
            _id: "d1",
            address: "1842 Oakwood Dr",
            city: "Detroit",
            stage: "in_contract",
            value: 900000,
            agent: "Sage",
            addedAt: Date.now() - 86400000
        },
        {
            _id: "d2",
            address: "3921 Elmhurst St",
            city: "Detroit",
            stage: "in_contract",
            value: 850000,
            agent: "Marcus",
            addedAt: Date.now() - 172800000
        },
        {
            _id: "d3",
            address: "567 Maple Ave",
            city: "Dearborn",
            stage: "in_contract",
            value: 920000,
            agent: "Sage",
            addedAt: Date.now() - 259200000
        },
        {
            _id: "d4",
            address: "2145 Jefferson Blvd",
            city: "Detroit",
            stage: "in_contract",
            value: 1050000,
            agent: "Marcus",
            addedAt: Date.now() - 345600000
        },
        {
            _id: "d5",
            address: "891 Woodward Ave",
            city: "Detroit",
            stage: "in_contract",
            value: 780000,
            agent: "Sage",
            addedAt: Date.now() - 432000000
        },
        {
            _id: "d6",
            address: "4420 Grand River",
            city: "Detroit",
            stage: "in_contract",
            value: 950000,
            agent: "Marcus",
            addedAt: Date.now() - 518400000
        },
        {
            _id: "d7",
            address: "1567 Livernois",
            city: "Detroit",
            stage: "in_contract",
            value: 870000,
            agent: "Sage",
            addedAt: Date.now() - 604800000
        },
        {
            _id: "d8",
            address: "7823 Gratiot Ave",
            city: "Detroit",
            stage: "in_contract",
            value: 1100000,
            agent: "Marcus",
            addedAt: Date.now() - 691200000
        },
        {
            _id: "d9",
            address: "3456 Michigan Ave",
            city: "Detroit",
            stage: "in_contract",
            value: 820000,
            agent: "Sage",
            addedAt: Date.now() - 777600000
        },
        {
            _id: "d10",
            address: "9012 Fort St",
            city: "Lincoln Park",
            stage: "in_contract",
            value: 960000,
            agent: "Marcus",
            addedAt: Date.now() - 864000000
        },
        {
            _id: "d11",
            address: "2234 Van Dyke",
            city: "Detroit",
            stage: "in_contract",
            value: 890000,
            agent: "Sage",
            addedAt: Date.now() - 950400000
        },
        {
            _id: "d12",
            address: "5678 Telegraph Rd",
            city: "Dearborn",
            stage: "in_contract",
            value: 1020000,
            agent: "Marcus",
            addedAt: Date.now() - 1036800000
        },
        {
            _id: "d13",
            address: "1100 Bagley St",
            city: "Detroit",
            stage: "in_contract",
            value: 830000,
            agent: "Sage",
            addedAt: Date.now() - 1123200000
        },
        {
            _id: "d14",
            address: "4567 Cass Ave",
            city: "Detroit",
            stage: "in_contract",
            value: 910000,
            agent: "Marcus",
            addedAt: Date.now() - 1209600000
        },
        {
            _id: "d15",
            address: "8901 Warren Ave",
            city: "Detroit",
            stage: "in_contract",
            value: 980000,
            agent: "Sage",
            addedAt: Date.now() - 1296000000
        },
        {
            _id: "d16",
            address: "2345 Joy Rd",
            city: "Detroit",
            stage: "in_contract",
            value: 840000,
            agent: "Marcus",
            addedAt: Date.now() - 1382400000
        },
        {
            _id: "d17",
            address: "6789 Plymouth Rd",
            city: "Detroit",
            stage: "in_contract",
            value: 1080000,
            agent: "Sage",
            addedAt: Date.now() - 1468800000
        },
        {
            _id: "d18",
            address: "3210 7 Mile Rd",
            city: "Detroit",
            stage: "in_contract",
            value: 450000,
            agent: "Marcus",
            addedAt: Date.now() - 1555200000
        }
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AgentCards.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentCards",
    ()=>AgentCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function formatLastSeen(timestamp) {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
}
function AgentCards({ agents, onAgentClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap justify-center gap-3",
        children: agents.map((agent)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>onAgentClick?.(agent),
                className: `
            relative rounded-lg border bg-[#111111] p-3
            transition-all duration-300 w-[160px] flex-shrink-0
            ${agent.status === "active" ? "agent-active" : "agent-idle"}
            ${onAgentClick ? "cursor-pointer hover:bg-[#1a1a1a] hover:border-opacity-60" : ""}
          `,
                style: {
                    borderColor: `${agent.color}40`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: agent.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AgentCards.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-medium text-[#e5e5e5]",
                                                children: agent.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AgentCards.tsx",
                                                lineNumber: 51,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] font-mono text-[#525252] uppercase tracking-wide",
                                                children: agent.role
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AgentCards.tsx",
                                                lineNumber: 52,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AgentCards.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AgentCards.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full",
                                        style: {
                                            backgroundColor: agent.status === "active" ? agent.color : "#525252"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AgentCards.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    agent.status === "active" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-75",
                                        style: {
                                            backgroundColor: agent.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AgentCards.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AgentCards.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AgentCards.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-[#737373] truncate mb-2 font-mono",
                        children: agent.currentTask
                    }, void 0, false, {
                        fileName: "[project]/src/components/AgentCards.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] font-mono text-[#3a3a3a]",
                        children: formatLastSeen(agent.lastSeen)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AgentCards.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-lg pointer-events-none",
                        style: {
                            backgroundColor: `${agent.color}08`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/AgentCards.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                ]
            }, agent._id, true, {
                fileName: "[project]/src/components/AgentCards.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/AgentCards.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = AgentCards;
var _c;
__turbopack_context__.k.register(_c, "AgentCards");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ActivityFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityFeed",
    ()=>ActivityFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function formatTimestamp(timestamp) {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}
function ActivityFeed({ activities, agents, onActivityClick }) {
    const agentMap = new Map(agents.map((a)=>[
            a.name,
            {
                emoji: a.emoji,
                color: a.color
            }
        ]));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col rounded-lg border border-[#1e1e1e] bg-[#111111] min-h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[#737373] uppercase tracking-wider",
                        children: "Activity Feed"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActivityFeed.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] text-[#3a3a3a]",
                        children: [
                            activities.length,
                            " events"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActivityFeed.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActivityFeed.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-3 space-y-2",
                children: activities.map((activity)=>{
                    const agentData = agentMap.get(activity.agent);
                    const agent = agents.find((a)=>a.name === activity.agent);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>agent && onActivityClick?.(activity, agent),
                        className: `flex items-start gap-3 p-2.5 rounded border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#2a2a2a] transition-colors ${onActivityClick ? 'cursor-pointer hover:bg-[#0f0f0f]' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg flex-shrink-0",
                                children: agentData?.emoji || "⚡"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActivityFeed.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-xs font-medium",
                                                style: {
                                                    color: agentData?.color || "#10b981"
                                                },
                                                children: activity.agent
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityFeed.tsx",
                                                lineNumber: 71,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-[#3a3a3a]",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityFeed.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-[#3a3a3a] font-mono",
                                                children: formatTimestamp(activity.timestamp)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ActivityFeed.tsx",
                                                lineNumber: 78,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActivityFeed.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[#e5e5e5] mb-1",
                                        children: activity.action
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ActivityFeed.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11px] text-[#525252]",
                                        children: activity.detail
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ActivityFeed.tsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ActivityFeed.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this)
                        ]
                    }, activity._id, true, {
                        fileName: "[project]/src/components/ActivityFeed.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ActivityFeed.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActivityFeed.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = ActivityFeed;
var _c;
__turbopack_context__.k.register(_c, "ActivityFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TaskBoard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaskBoard",
    ()=>TaskBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const COLUMNS = [
    {
        key: "inbox",
        label: "INBOX",
        color: "#525252"
    },
    {
        key: "in_progress",
        label: "IN PROGRESS",
        color: "#10b981"
    },
    {
        key: "review",
        label: "REVIEW",
        color: "#f59e0b"
    },
    {
        key: "done",
        label: "DONE",
        color: "#3b82f6"
    }
];
function TaskCard({ task, agentMap }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded border border-[#1e1e1e] bg-[#0a0a0a] p-2.5 hover:border-[#2a2a2a] transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2 mb-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-[#e5e5e5] font-medium leading-tight line-clamp-2",
                        children: task.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskBoard.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${task.priority === "P0" ? "priority-p0" : task.priority === "P1" ? "priority-p1" : "priority-p2"}`,
                        children: task.priority
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskBoard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TaskBoard.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs",
                        children: agentMap.get(task.assignee) || "⚡"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskBoard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] text-[#525252]",
                        children: task.assignee
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskBoard.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TaskBoard.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TaskBoard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = TaskCard;
function TaskBoard({ tasks, agents }) {
    const agentMap = new Map(agents.map((a)=>[
            a.name,
            a.emoji
        ]));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col rounded-lg border border-[#1e1e1e] bg-[#111111] min-h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[#737373] uppercase tracking-wider",
                        children: "Task Board"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskBoard.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] text-[#3a3a3a]",
                        children: [
                            tasks.length,
                            " tasks"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TaskBoard.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TaskBoard.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-4 gap-2 h-full",
                    children: COLUMNS.map((col)=>{
                        const columnTasks = tasks.filter((t)=>t.status === col.key);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col min-h-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2 px-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] uppercase tracking-wider",
                                            style: {
                                                color: col.color
                                            },
                                            children: col.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TaskBoard.tsx",
                                            lineNumber: 76,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-[#3a3a3a]",
                                            children: columnTasks.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TaskBoard.tsx",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TaskBoard.tsx",
                                    lineNumber: 75,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 space-y-2 overflow-y-auto",
                                    children: columnTasks.map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskCard, {
                                            task: task,
                                            agentMap: agentMap
                                        }, task._id, false, {
                                            fileName: "[project]/src/components/TaskBoard.tsx",
                                            lineNumber: 88,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TaskBoard.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, col.key, true, {
                            fileName: "[project]/src/components/TaskBoard.tsx",
                            lineNumber: 74,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/TaskBoard.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TaskBoard.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TaskBoard.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c1 = TaskBoard;
var _c, _c1;
__turbopack_context__.k.register(_c, "TaskCard");
__turbopack_context__.k.register(_c1, "TaskBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MetricsBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricsBar",
    ()=>MetricsBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const METRIC_CONFIG = {
    deals_in_contract: {
        label: "In Contract",
        icon: "📝"
    },
    revenue: {
        label: "Revenue",
        icon: "💵",
        format: (v)=>`$${v.toLocaleString()}`
    },
    contacts: {
        label: "Contacts",
        icon: "👥"
    },
    properties_tracked: {
        label: "Properties",
        icon: "🏠"
    },
    active_tasks: {
        label: "Active Tasks",
        icon: "📋"
    }
};
function MetricsBar({ metrics, tasks }) {
    const metricMap = new Map(metrics.map((m)=>[
            m.key,
            m
        ]));
    // Calculate active tasks from actual task data
    const activeTasks = tasks.filter((t)=>t.status === "in_progress" || t.status === "review").length;
    const displayMetrics = [
        ...Object.entries(METRIC_CONFIG).map(([key, config])=>{
            const metric = metricMap.get(key);
            const value = key === "active_tasks" ? activeTasks : metric?.value ?? 0;
            return {
                key,
                ...config,
                value
            };
        })
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-[#1e1e1e] px-4 py-2.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-6",
                    children: displayMetrics.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: m.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MetricsBar.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-baseline gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-sm text-[#e5e5e5] tabular-nums",
                                            children: m.format ? m.format(m.value) : m.value.toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MetricsBar.tsx",
                                            lineNumber: 44,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] text-[#3a3a3a] uppercase tracking-wider",
                                            children: m.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MetricsBar.tsx",
                                            lineNumber: 47,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MetricsBar.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, m.key, true, {
                            fileName: "[project]/src/components/MetricsBar.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/MetricsBar.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-mono text-[9px] text-[#2a2a2a]",
                    children: "MISSION CONTROL v1.0"
                }, void 0, false, {
                    fileName: "[project]/src/components/MetricsBar.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MetricsBar.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/MetricsBar.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = MetricsBar;
var _c;
__turbopack_context__.k.register(_c, "MetricsBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Header({ agentCount, activeCount }) {
    _s();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const updateTime = {
                "Header.useEffect.updateTime": ()=>{
                    setTime(new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                    }));
                }
            }["Header.useEffect.updateTime"];
            updateTime();
            const interval = setInterval(updateTime, 1000);
            return ({
                "Header.useEffect": ()=>clearInterval(interval)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "border-b border-[#1e1e1e] px-4 py-3 flex items-center justify-between relative scanline overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-emerald-500 tracking-widest uppercase",
                                children: "Mission Control"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-[#2a2a2a]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[#525252]",
                        children: [
                            activeCount,
                            "/",
                            agentCount,
                            " AGENTS ACTIVE"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[#525252]",
                        children: "SYS: NOMINAL"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-[#2a2a2a]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-sm text-[#737373] tabular-nums",
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Header, "BOCfeVG4OKCNzybCuynup9cQfu8=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAirtableData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAirtableData",
    ()=>useAirtableData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function isError(response) {
    return 'error' in response;
}
function useAirtableData() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = async ()=>{
        try {
            setLoading(true);
            const response = await fetch('/api/airtable');
            const result = await response.json();
            if (isError(result)) {
                setError(result.error);
                setData(null);
            } else {
                setData(result);
                setError(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setData(null);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAirtableData.useEffect": ()=>{
            fetchData();
            // Auto-refresh every 15 minutes
            const interval = setInterval(fetchData, 15 * 60 * 1000);
            return ({
                "useAirtableData.useEffect": ()=>clearInterval(interval)
            })["useAirtableData.useEffect"];
        }
    }["useAirtableData.useEffect"], []);
    // Manual refresh function
    const refresh = ()=>{
        fetchData();
    };
    return {
        data,
        loading,
        error,
        refresh
    };
}
_s(useAirtableData, "RiL7vLwmC7ZWXKL/bXt2EIBjBYk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RevenueTrackerV2.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RevenueTrackerV2",
    ()=>RevenueTrackerV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAirtableData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAirtableData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(amount);
}
function RevenueTrackerV2() {
    _s();
    const { data: airtableData, loading, error, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAirtableData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAirtableData"])();
    const overview = {
        totalRevenue: airtableData?.totalRevenue || 0,
        last24hDeals: airtableData?.last24h || 0,
        dealsInContract: airtableData?.dealsCount || 0,
        totalActiveDeals: (airtableData?.offerMade?.count || 0) + (airtableData?.pendingContract?.count || 0) + (airtableData?.inContract?.count || 0),
        averageDealSize: airtableData && airtableData.dealsCount > 0 ? airtableData.totalRevenue / airtableData.dealsCount : 0,
        deals: airtableData?.deals || [],
        allActiveDeals: [
            ...airtableData?.offerMade?.deals || [],
            ...airtableData?.pendingContract?.deals || [],
            ...airtableData?.inContract?.deals || []
        ],
        lastUpdatedAt: airtableData ? new Date(airtableData.timestamp).getTime() : Date.now()
    };
    const monthlyGoal = 30;
    const progressPercentage = overview.totalActiveDeals / monthlyGoal * 100;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-emerald-500 font-mono text-sm",
                    children: "Loading deal data..."
                }, void 0, false, {
                    fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-mono text-sm text-red-500 tracking-widest uppercase",
                                children: "Deal Revenue Tracker"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-400 font-mono mt-1",
                                children: [
                                    "Error: ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: refresh,
                        className: "px-3 py-1 bg-red-500/20 text-red-400 rounded font-mono text-xs",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-mono text-sm text-emerald-500 tracking-widest uppercase",
                                children: "Deal Revenue Tracker"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#737373] font-mono mt-1",
                                children: "Live from Airtable • Updates every 15 min"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: refresh,
                        className: "px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded font-mono text-xs",
                        children: "🔄 Refresh"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-blue-500/20 bg-blue-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-blue-300 uppercase",
                                children: "Offer Made"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-sm text-white mt-1",
                                children: [
                                    airtableData?.offerMade?.count || 0,
                                    " homes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-lg text-blue-400",
                                children: formatCurrency(airtableData?.offerMade?.revenue || 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-amber-500/20 bg-amber-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-amber-300 uppercase",
                                children: "Pending Contract"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-sm text-white mt-1",
                                children: [
                                    airtableData?.pendingContract?.count || 0,
                                    " homes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-lg text-amber-400",
                                children: formatCurrency(airtableData?.pendingContract?.revenue || 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-emerald-500/20 bg-emerald-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-emerald-300 uppercase",
                                children: "In Contract"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-sm text-white mt-1",
                                children: [
                                    airtableData?.inContract?.count || 0,
                                    " homes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-lg text-emerald-400",
                                children: formatCurrency(airtableData?.inContract?.revenue || 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-cyan-500/20 bg-cyan-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-cyan-300 uppercase",
                                children: "New deals added to pipeline (24H)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white mt-1",
                                children: overview.last24hDeals
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-[#737373] uppercase tracking-wider",
                                children: "Monthly Goal Progress"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-emerald-400",
                                children: [
                                    overview.totalActiveDeals,
                                    " of ",
                                    monthlyGoal,
                                    " deals"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-3 bg-[#1a1a1a] rounded overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000",
                            style: {
                                width: `${Math.min(progressPercentage, 100)}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-[#5f5f5f]",
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-emerald-400 font-bold",
                                children: [
                                    progressPercentage.toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-[#5f5f5f]",
                                children: monthlyGoal
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 xl:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-mono text-xs text-[#737373] uppercase tracking-wider mb-3",
                                children: "Recent Active Deals"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 max-h-72 overflow-auto pr-1",
                                children: [
                                    overview.allActiveDeals.slice(0, 8).map((deal)=>{
                                        const statusColor = deal.status === 'In Contract' ? 'text-emerald-400' : deal.status === 'Pending Contract' ? 'text-amber-400' : 'text-blue-400';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-white font-mono truncate",
                                                            children: deal.address
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                            lineNumber: 127,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-emerald-400 font-mono",
                                                            children: formatCurrency(deal.revenue)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-xs font-mono ${statusColor}`,
                                                            children: deal.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-[#5f5f5f] font-mono",
                                                            children: deal.date ? new Date(deal.date).toLocaleDateString() : 'No date'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, deal.id, true, {
                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    overview.allActiveDeals.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-[#5f5f5f] font-mono text-center py-4",
                                        children: "No active deals"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-mono text-xs text-[#737373] uppercase tracking-wider mb-3",
                                children: "Deal Size Distribution"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: (()=>{
                                    const ranges = [
                                        {
                                            label: '$20K+',
                                            min: 20000,
                                            max: Infinity
                                        },
                                        {
                                            label: '$15K-$19K',
                                            min: 15000,
                                            max: 19999
                                        },
                                        {
                                            label: '$10K-$14K',
                                            min: 10000,
                                            max: 14999
                                        },
                                        {
                                            label: '$5K-$9K',
                                            min: 5000,
                                            max: 9999
                                        },
                                        {
                                            label: 'Under $5K',
                                            min: 0,
                                            max: 4999
                                        }
                                    ];
                                    return ranges.map((range)=>{
                                        const count = overview.allActiveDeals.filter((d)=>d.revenue >= range.min && d.revenue <= range.max).length;
                                        const percentage = overview.allActiveDeals.length > 0 ? count / overview.allActiveDeals.length * 100 : 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-white font-mono",
                                                            children: range.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-cyan-400 font-mono",
                                                            children: [
                                                                count,
                                                                " deals"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 h-2 bg-[#1a1a1a] rounded overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full bg-gradient-to-r from-cyan-500 to-emerald-500",
                                                        style: {
                                                            width: `${percentage}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 text-xs text-[#5f5f5f] font-mono",
                                                    children: [
                                                        percentage.toFixed(1),
                                                        "% of portfolio"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, range.label, true, {
                                            fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this);
                                    });
                                })()
                            }, void 0, false, {
                                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RevenueTrackerV2.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RevenueTrackerV2.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(RevenueTrackerV2, "Y7AotqDhrDioi+NB2PcINM3Rt3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAirtableData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAirtableData"]
    ];
});
_c = RevenueTrackerV2;
var _c;
__turbopack_context__.k.register(_c, "RevenueTrackerV2");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BuildQueue.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuildQueue",
    ()=>BuildQueue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMockData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const statusStyles = {
    queued: "text-slate-300 border-slate-400/30 bg-slate-500/10",
    in_progress: "text-amber-300 border-amber-400/30 bg-amber-500/10",
    shipped: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10"
};
const priorityStyles = {
    P0: "text-red-300 border-red-400/30 bg-red-500/10",
    P1: "text-amber-300 border-amber-400/30 bg-amber-500/10",
    P2: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10"
};
function BuildQueue() {
    _s();
    const queueData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockBuildQueue"])();
    const [selectedPriority, setSelectedPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BuildQueue.useMemo[filteredItems]": ()=>{
            const items = queueData.items;
            if (selectedPriority === "all") return items;
            return items.filter({
                "BuildQueue.useMemo[filteredItems]": (item)=>item.priority === selectedPriority
            }["BuildQueue.useMemo[filteredItems]"]);
        }
    }["BuildQueue.useMemo[filteredItems]"], [
        queueData.items,
        selectedPriority
    ]);
    const counts = queueData.counts;
    const lastUpdatedLabel = queueData.lastUpdatedAt ? new Date(queueData.lastUpdatedAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    }) : "--";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm text-emerald-500 tracking-widest uppercase",
                        children: "Build Queue"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuildQueue.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[#737373]",
                        children: [
                            "LAST SYNC ",
                            lastUpdatedLabel
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BuildQueue.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BuildQueue.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-slate-400/20 bg-slate-500/5 rounded px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-slate-300 uppercase",
                                children: "Queued"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white",
                                children: counts.queued
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BuildQueue.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-amber-400/20 bg-amber-500/5 rounded px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-amber-300 uppercase",
                                children: "In Progress"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white",
                                children: counts.inProgress
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BuildQueue.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-emerald-400/20 bg-emerald-500/5 rounded px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-emerald-300 uppercase",
                                children: "Shipped"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white",
                                children: counts.shipped
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BuildQueue.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BuildQueue.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 p-1 bg-[#0c0c0c] border border-[#1e1e1e] rounded inline-flex",
                children: [
                    "all",
                    "P0",
                    "P1",
                    "P2"
                ].map((priority)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedPriority(priority),
                        className: `px-3 py-1 font-mono text-xs uppercase tracking-wider rounded transition-colors ${selectedPriority === priority ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" : "text-[#737373] hover:text-white hover:bg-[#1e1e1e]"}`,
                        children: priority === "all" ? "ALL" : priority
                    }, priority, false, {
                        fileName: "[project]/src/components/BuildQueue.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/BuildQueue.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 max-h-[400px] overflow-auto pr-1",
                children: filteredItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-[#1e1e1e] rounded p-3 bg-[#0c0c0c]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-0.5 rounded border font-mono text-xs uppercase ${statusStyles[item.status]}`,
                                        children: item.status.replace("_", " ")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BuildQueue.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-0.5 rounded border font-mono text-xs ${priorityStyles[item.priority]}`,
                                        children: item.priority
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BuildQueue.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-white font-medium leading-tight flex-1",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BuildQueue.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#8a8a8a]",
                                children: item.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuildQueue.tsx",
                                lineNumber: 88,
                                columnNumber: 34
                            }, this)
                        ]
                    }, item._id, true, {
                        fileName: "[project]/src/components/BuildQueue.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/BuildQueue.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BuildQueue.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(BuildQueue, "0D+tm7xAoZKHdsCicLe6tglAd+E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockBuildQueue"]
    ];
});
_c = BuildQueue;
var _c;
__turbopack_context__.k.register(_c, "BuildQueue");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TaskCreator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaskCreator",
    ()=>TaskCreator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TaskCreator({ agents }) {
    _s();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [priority, setPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("P1");
    const [assignee, setAssignee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [statusMessage, setStatusMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const canSubmit = title.trim().length > 0 && description.trim().length > 0 && assignee.length > 0;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!canSubmit) return;
        setIsSubmitting(true);
        setStatusMessage(null);
        // Mock task creation
        console.log("Creating task:", {
            title,
            description,
            assignee,
            priority
        });
        await new Promise((r)=>setTimeout(r, 300));
        setTitle("");
        setDescription("");
        setPriority("P1");
        setAssignee("");
        setStatusMessage("Task created");
        setIsSubmitting(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4 h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm text-emerald-500 tracking-widest uppercase",
                        children: "One-Click Task Creator"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskCreator.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[#737373] mt-1",
                        children: "Fill fields and submit to push a task into inbox."
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskCreator.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TaskCreator.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-mono text-xs text-[#737373] uppercase mb-1",
                                children: "Title"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TaskCreator.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: title,
                                onChange: (e)=>setTitle(e.target.value),
                                placeholder: "Task title",
                                className: "w-full bg-[#151515] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-[#525252] focus:border-emerald-500/40 focus:outline-none",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/TaskCreator.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TaskCreator.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block font-mono text-xs text-[#737373] uppercase mb-1",
                                children: "Description"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TaskCreator.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: description,
                                onChange: (e)=>setDescription(e.target.value),
                                placeholder: "Task description",
                                rows: 4,
                                className: "w-full bg-[#151515] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-[#525252] resize-none focus:border-emerald-500/40 focus:outline-none",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/TaskCreator.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TaskCreator.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block font-mono text-xs text-[#737373] uppercase mb-1",
                                        children: "Assignee"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TaskCreator.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: assignee,
                                        onChange: (e)=>setAssignee(e.target.value),
                                        className: "w-full bg-[#151515] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white focus:border-emerald-500/40 focus:outline-none",
                                        required: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select agent"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TaskCreator.tsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this),
                                            agents.map((agent)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: agent.name,
                                                    children: agent.name
                                                }, agent.name, false, {
                                                    fileName: "[project]/src/components/TaskCreator.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TaskCreator.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TaskCreator.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block font-mono text-xs text-[#737373] uppercase mb-1",
                                        children: "Priority"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TaskCreator.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: priority,
                                        onChange: (e)=>setPriority(e.target.value),
                                        className: "w-full bg-[#151515] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white focus:border-emerald-500/40 focus:outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "P0",
                                                children: "P0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TaskCreator.tsx",
                                                lineNumber: 95,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "P1",
                                                children: "P1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TaskCreator.tsx",
                                                lineNumber: 96,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "P2",
                                                children: "P2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TaskCreator.tsx",
                                                lineNumber: 97,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TaskCreator.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TaskCreator.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TaskCreator.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: !canSubmit || isSubmitting,
                        className: "w-full px-3 py-2 rounded bg-emerald-500 text-black font-mono text-sm uppercase tracking-wide hover:bg-emerald-400 disabled:bg-[#2a2a2a] disabled:text-[#666] disabled:cursor-not-allowed transition-colors",
                        children: isSubmitting ? "Creating..." : "Create Task"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TaskCreator.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TaskCreator.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            statusMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 text-xs font-mono text-[#737373]",
                children: statusMessage
            }, void 0, false, {
                fileName: "[project]/src/components/TaskCreator.tsx",
                lineNumber: 111,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TaskCreator.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(TaskCreator, "0i5C9V3/oIjBmszoXnHjOLLxunU=");
_c = TaskCreator;
var _c;
__turbopack_context__.k.register(_c, "TaskCreator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LeadTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadTracker",
    ()=>LeadTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const statusColumns = [
    {
        status: "new",
        label: "New",
        color: "emerald"
    },
    {
        status: "contacted",
        label: "Contacted",
        color: "cyan"
    },
    {
        status: "replied",
        label: "Replied",
        color: "blue"
    },
    {
        status: "meeting",
        label: "Meeting",
        color: "purple"
    },
    {
        status: "proposal",
        label: "Proposal",
        color: "amber"
    },
    {
        status: "won",
        label: "Won",
        color: "green"
    },
    {
        status: "lost",
        label: "Lost",
        color: "red"
    },
    {
        status: "nurture",
        label: "Nurture",
        color: "gray"
    }
];
function LeadTracker() {
    _s();
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("kanban");
    const leads = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockLeads"])();
    const stats = {
        total: leads.length,
        totalValue: leads.reduce((sum, l)=>sum + (l.value || 0), 0)
    };
    const overdue = leads.filter((l)=>l.nextActionDate && l.nextActionDate < Date.now());
    const formatCurrency = (cents)=>{
        if (!cents) return "";
        return `$${cents.toLocaleString()}`;
    };
    const formatDate = (timestamp)=>{
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    };
    const renderKanbanView = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-3 overflow-x-auto pb-4",
            children: statusColumns.map(({ status, label })=>{
                const columnLeads = leads.filter((lead)=>lead.status === status);
                const count = columnLeads.length;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0 w-72",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-b border-[#1e1e1e]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xs text-[#737373] uppercase tracking-wider",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeadTracker.tsx",
                                            lineNumber: 50,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xs text-emerald-500",
                                            children: count
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeadTracker.tsx",
                                            lineNumber: 53,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeadTracker.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 space-y-2 max-h-[600px] overflow-y-auto",
                                children: columnLeads.map((lead)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#1e1e1e] border border-[#2e2e2e] rounded p-3 hover:border-emerald-500/30 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-sm text-white mb-1",
                                                children: lead.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LeadTracker.tsx",
                                                lineNumber: 63,
                                                columnNumber: 21
                                            }, this),
                                            lead.company && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[#737373] mb-2",
                                                children: lead.company
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LeadTracker.tsx",
                                                lineNumber: 65,
                                                columnNumber: 23
                                            }, this),
                                            lead.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-emerald-500 font-mono mb-2",
                                                children: formatCurrency(lead.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LeadTracker.tsx",
                                                lineNumber: 69,
                                                columnNumber: 23
                                            }, this),
                                            lead.nextAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[#525252] mb-1",
                                                children: [
                                                    "📌 ",
                                                    lead.nextAction
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LeadTracker.tsx",
                                                lineNumber: 75,
                                                columnNumber: 23
                                            }, this),
                                            lead.nextActionDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-xs font-mono ${lead.nextActionDate < Date.now() ? "text-red-500" : "text-[#525252]"}`,
                                                children: formatDate(lead.nextActionDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LeadTracker.tsx",
                                                lineNumber: 81,
                                                columnNumber: 23
                                            }, this),
                                            lead.assignee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-cyan-500 font-mono mt-2",
                                                children: [
                                                    "👤 ",
                                                    lead.assignee
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LeadTracker.tsx",
                                                lineNumber: 89,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, lead._id, true, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 59,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeadTracker.tsx",
                        lineNumber: 47,
                        columnNumber: 13
                    }, this)
                }, status, false, {
                    fileName: "[project]/src/components/LeadTracker.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/LeadTracker.tsx",
            lineNumber: 40,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm text-emerald-500 tracking-widest uppercase",
                        children: "Lead Tracker"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeadTracker.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[#525252] font-mono",
                                        children: "TOTAL LEADS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-lg text-white",
                                        children: stats.total
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[#525252] font-mono",
                                        children: "PIPELINE VALUE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-lg text-emerald-500",
                                        children: formatCurrency(stats.totalValue)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView("kanban"),
                                        className: `px-3 py-1 font-mono text-xs rounded transition-colors ${view === "kanban" ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" : "text-[#737373] hover:text-white bg-[#1e1e1e]"}`,
                                        children: "KANBAN"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView("list"),
                                        className: `px-3 py-1 font-mono text-xs rounded transition-colors ${view === "list" ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" : "text-[#737373] hover:text-white bg-[#1e1e1e]"}`,
                                        children: "LIST"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeadTracker.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LeadTracker.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            overdue.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-500/10 border border-red-500/20 rounded p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-red-500 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-red-500 uppercase tracking-wider",
                                children: [
                                    overdue.length,
                                    " Overdue Follow-ups"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeadTracker.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: overdue.slice(0, 3).map((lead)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-[#737373]",
                                children: [
                                    lead.name,
                                    " — ",
                                    lead.nextAction
                                ]
                            }, lead._id, true, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeadTracker.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LeadTracker.tsx",
                lineNumber: 149,
                columnNumber: 9
            }, this),
            view === "kanban" ? renderKanbanView() : renderListView(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full py-2 bg-emerald-500/10 border border-emerald-500/30 rounded font-mono text-sm text-emerald-500 hover:bg-emerald-500/20 transition-colors",
                children: "+ ADD LEAD"
            }, void 0, false, {
                fileName: "[project]/src/components/LeadTracker.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LeadTracker.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
    //TURBOPACK unreachable
    ;
    function renderListView() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "border-b border-[#1e1e1e]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-left font-mono text-xs text-[#525252] uppercase tracking-wider",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeadTracker.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-left font-mono text-xs text-[#525252] uppercase tracking-wider",
                                    children: "Company"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeadTracker.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-left font-mono text-xs text-[#525252] uppercase tracking-wider",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeadTracker.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-left font-mono text-xs text-[#525252] uppercase tracking-wider",
                                    children: "Value"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeadTracker.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-left font-mono text-xs text-[#525252] uppercase tracking-wider",
                                    children: "Next Action"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeadTracker.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-left font-mono text-xs text-[#525252] uppercase tracking-wider",
                                    children: "Assignee"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeadTracker.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeadTracker.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeadTracker.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: leads.map((lead)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-[#1e1e1e] hover:bg-[#1e1e1e] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 font-mono text-sm text-white",
                                        children: lead.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-sm text-[#737373]",
                                        children: lead.company || "—"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-[#1e1e1e] border border-[#2e2e2e] rounded px-2 py-1 text-xs text-emerald-500 font-mono uppercase",
                                            children: lead.status
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeadTracker.tsx",
                                            lineNumber: 197,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-sm text-emerald-500 font-mono",
                                        children: formatCurrency(lead.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-sm text-[#737373]",
                                        children: lead.nextAction || "—"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 204,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-sm text-cyan-500 font-mono",
                                        children: lead.assignee || "—"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeadTracker.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, lead._id, true, {
                                fileName: "[project]/src/components/LeadTracker.tsx",
                                lineNumber: 193,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeadTracker.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LeadTracker.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/LeadTracker.tsx",
            lineNumber: 179,
            columnNumber: 7
        }, this);
    }
}
_s(LeadTracker, "Pm2sOaHl5hIn0zebCrWTFG4qgss=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockLeads"]
    ];
});
_c = LeadTracker;
var _c;
__turbopack_context__.k.register(_c, "LeadTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ActionLog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionLog",
    ()=>ActionLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const categoryColors = {
    outreach: "cyan",
    content: "purple",
    code: "emerald",
    research: "blue",
    other: "gray"
};
const statusColors = {
    pending: "amber",
    success: "green",
    failure: "red",
    partial: "orange",
    unknown: "gray"
};
function ActionLog() {
    _s();
    const [filterCategory, setFilterCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const allActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockActionLogs"])();
    const actions = allActions.filter((a)=>{
        if (filterCategory !== "all" && a.category !== filterCategory) return false;
        if (filterStatus !== "all" && a.status !== filterStatus) return false;
        return true;
    });
    const successCount = allActions.filter((a)=>a.status === "success").length;
    const stats = {
        total: allActions.length,
        successRate: allActions.length > 0 ? successCount / allActions.length * 100 : 0
    };
    const formatTimestamp = (timestamp)=>{
        const diff = Date.now() - timestamp;
        const diffMins = Math.floor(diff / 60000);
        const diffHours = Math.floor(diff / 3600000);
        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-mono text-sm text-emerald-500 tracking-widest uppercase",
                        children: "Action Log"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ActionLog.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[#525252] font-mono",
                                        children: "SUCCESS RATE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ActionLog.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-lg text-emerald-500",
                                        children: [
                                            stats.successRate.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ActionLog.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[#525252] font-mono",
                                        children: "TOTAL ACTIONS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ActionLog.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-lg text-white",
                                        children: stats.total
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ActionLog.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActionLog.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActionLog.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filterCategory,
                        onChange: (e)=>setFilterCategory(e.target.value),
                        className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded px-3 py-1 font-mono text-xs text-cyan-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: "ALL CATEGORIES"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "outreach",
                                children: "OUTREACH"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "content",
                                children: "CONTENT"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "code",
                                children: "CODE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "research",
                                children: "RESEARCH"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "other",
                                children: "OTHER"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActionLog.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filterStatus,
                        onChange: (e)=>setFilterStatus(e.target.value),
                        className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded px-3 py-1 font-mono text-xs text-purple-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: "ALL STATUS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "pending",
                                children: "PENDING"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "success",
                                children: "SUCCESS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "failure",
                                children: "FAILURE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "partial",
                                children: "PARTIAL"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ActionLog.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ActionLog.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ActionLog.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded max-h-[600px] overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-[#1e1e1e]",
                    children: actions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 hover:bg-[#1e1e1e] transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-sm text-emerald-500",
                                                    children: action.agent
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ActionLog.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs font-mono px-2 py-0.5 rounded bg-${categoryColors[action.category]}-500/20 text-${categoryColors[action.category]}-500 border border-${categoryColors[action.category]}-500/30`,
                                                    children: action.category
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ActionLog.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs font-mono px-2 py-0.5 rounded bg-${statusColors[action.status]}-500/20 text-${statusColors[action.status]}-500 border border-${statusColors[action.status]}-500/30`,
                                                    children: action.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ActionLog.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ActionLog.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-[#525252] font-mono",
                                            children: formatTimestamp(action.createdAt)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ActionLog.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ActionLog.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-white mb-2",
                                    children: action.action
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ActionLog.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                action.prediction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-[#737373] mb-2",
                                    children: [
                                        "🎯 ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: [
                                                "Predicted: ",
                                                action.prediction
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ActionLog.tsx",
                                            lineNumber: 127,
                                            columnNumber: 22
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ActionLog.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, this),
                                action.result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-cyan-500 mb-2",
                                    children: [
                                        "✓ ",
                                        action.result
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ActionLog.tsx",
                                    lineNumber: 132,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, action._id, true, {
                            fileName: "[project]/src/components/ActionLog.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/ActionLog.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ActionLog.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ActionLog.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(ActionLog, "FYlDDR6w8ca4I6yQWYfD+hatVf0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockActionLogs"]
    ];
});
_c = ActionLog;
var _c;
__turbopack_context__.k.register(_c, "ActionLog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FinancialsTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinancialsTab",
    ()=>FinancialsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function FinancialsTab() {
    _s();
    const [tillerData, setTillerData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        transactions: [],
        summary: {
            netWorth: 1430000,
            monthlySpend: 32300,
            liquidAssets: 863000,
            financialHealth: 'B-'
        }
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Fetch Tiller data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinancialsTab.useEffect": ()=>{
            fetch('/api/tiller').then({
                "FinancialsTab.useEffect": (res)=>res.json()
            }["FinancialsTab.useEffect"]).then({
                "FinancialsTab.useEffect": (data)=>{
                    setTillerData(data);
                    setLoading(false);
                }
            }["FinancialsTab.useEffect"]).catch({
                "FinancialsTab.useEffect": (err)=>{
                    console.error('Failed to fetch Tiller data:', err);
                    setLoading(false);
                }
            }["FinancialsTab.useEffect"]);
        }
    }["FinancialsTab.useEffect"], []);
    const { transactions, summary } = tillerData;
    const formatCurrency = (amount)=>{
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(amount);
    };
    const getTransactionIcon = (category)=>{
        switch(category){
            case 'Business':
                return '💼';
            case 'Transportation':
                return '🚗';
            case 'Dining':
                return '🍽️';
            default:
                return '💳';
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-emerald-500 font-mono text-sm",
                    children: "Loading financial data..."
                }, void 0, false, {
                    fileName: "[project]/src/components/FinancialsTab.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/FinancialsTab.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/FinancialsTab.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-emerald-500/20 bg-emerald-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-emerald-300 uppercase",
                                children: "Net Worth"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white mt-1",
                                children: formatCurrency(summary.netWorth)
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FinancialsTab.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-amber-500/20 bg-amber-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-amber-300 uppercase",
                                children: "Monthly Spend"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white mt-1",
                                children: formatCurrency(summary.monthlySpend)
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FinancialsTab.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-cyan-500/20 bg-cyan-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-cyan-300 uppercase",
                                children: "Liquid Assets"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white mt-1",
                                children: formatCurrency(summary.liquidAssets)
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FinancialsTab.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-slate-500/20 bg-slate-500/5 rounded p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xs text-slate-300 uppercase",
                                children: "Financial Health"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl text-white mt-1",
                                children: summary.financialHealth
                            }, void 0, false, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FinancialsTab.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FinancialsTab.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-mono text-sm text-emerald-500 tracking-widest uppercase",
                                        children: "Live Transaction Feed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-[#737373] font-mono mt-1",
                                        children: tillerData.error ? 'Using fallback data' : 'Connected to Tiller Google Sheet'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-2 h-2 rounded-full ${tillerData.error ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-mono text-xs uppercase ${tillerData.error ? 'text-amber-500' : 'text-emerald-500'}`,
                                        children: tillerData.error ? 'Fallback' : 'Live'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FinancialsTab.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 max-h-96 overflow-auto",
                        children: transactions.map((transaction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 p-3 bg-[#111111] rounded border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-sm",
                                        children: getTransactionIcon(transaction.category)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-white font-mono truncate",
                                                        children: transaction.account
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-sm font-mono ${transaction.amount < 0 ? 'text-red-400' : 'text-emerald-400'}`,
                                                        children: formatCurrency(Math.abs(transaction.amount))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-[#737373] font-mono truncate",
                                                        children: transaction.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-[#5f5f5f] font-mono",
                                                        children: transaction.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/FinancialsTab.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, transaction.id, true, {
                                fileName: "[project]/src/components/FinancialsTab.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/FinancialsTab.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pt-3 border-t border-[#1e1e1e] text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-[#5f5f5f] font-mono",
                            children: [
                                "Last updated: ",
                                new Date().toLocaleTimeString(),
                                " • Auto-refreshes every 5 minutes"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FinancialsTab.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/FinancialsTab.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FinancialsTab.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FinancialsTab.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(FinancialsTab, "sZUNNb4cElIbjGxRwAuARqPzZdU=");
_c = FinancialsTab;
var _c;
__turbopack_context__.k.register(_c, "FinancialsTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AgentDetailModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentDetailModal",
    ()=>AgentDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function formatLastSeen(timestamp) {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
}
// Mock agent data - replace with actual agent data
const getAgentDetails = (agentId)=>{
    const agentData = {
        "1": {
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
                {
                    timestamp: Date.now() - 300000,
                    from: "Luke",
                    message: "Arthur, can you coordinate the team for today's property search?"
                },
                {
                    timestamp: Date.now() - 250000,
                    from: "Arthur",
                    message: "Absolutely. I'll coordinate Scout for listings, Marcus for agent outreach, and Sage for deal tracking."
                },
                {
                    timestamp: Date.now() - 60000,
                    from: "Luke",
                    message: "Great work on the dashboard deployment"
                }
            ],
            keyMetrics: {
                tasksCompleted: 47,
                agentsCoordinated: 6,
                uptimeHours: 168
            }
        },
        "2": {
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
                {
                    timestamp: Date.now() - 180000,
                    from: "Luke",
                    message: "Marcus, what's today's outreach status?"
                },
                {
                    timestamp: Date.now() - 120000,
                    from: "Marcus",
                    message: "50 messages sent, 6 responses so far. On track for 12% response rate."
                },
                {
                    timestamp: Date.now() - 30000,
                    from: "Luke",
                    message: "Excellent. Keep the momentum going."
                }
            ],
            keyMetrics: {
                contactsManaged: 1608,
                messageseSent: 450,
                responseRate: 12.5
            }
        },
        "3": {
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
                {
                    timestamp: Date.now() - 240000,
                    from: "Luke",
                    message: "Sage, give me the deal pipeline update"
                },
                {
                    timestamp: Date.now() - 180000,
                    from: "Sage",
                    message: "18 deals in contract, $162K total. 3 new deals added this week, 2 moving to closing next week."
                },
                {
                    timestamp: Date.now() - 90000,
                    from: "Luke",
                    message: "Perfect. Any bottlenecks I should know about?"
                }
            ],
            keyMetrics: {
                dealsTracked: 18,
                revenueManaged: 162000,
                pipelineAccuracy: 96
            }
        },
        "4": {
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
                {
                    timestamp: Date.now() - 150000,
                    from: "Luke",
                    message: "Quant, how's the paper trading performing?"
                },
                {
                    timestamp: Date.now() - 90000,
                    from: "Quant",
                    message: "Up 2.8% today. BTC momentum strategy triggered 2 profitable trades. Risk metrics all green."
                },
                {
                    timestamp: Date.now() - 45000,
                    from: "Luke",
                    message: "Great work. Keep monitoring for the next setup."
                }
            ],
            keyMetrics: {
                portfolioReturn: 2.8,
                tradesExecuted: 23,
                winRate: 67
            }
        },
        "5": {
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
                {
                    timestamp: Date.now() - 360000,
                    from: "Luke",
                    message: "Echo, can you prepare the morning briefing?"
                },
                {
                    timestamp: Date.now() - 300000,
                    from: "Echo",
                    message: "Morning briefing ready. Covers deal pipeline, market updates, and today's priorities. Duration: 2.5 minutes."
                },
                {
                    timestamp: Date.now() - 120000,
                    from: "Luke",
                    message: "Perfect. Voice quality was excellent."
                }
            ],
            keyMetrics: {
                briefingsDelivered: 7,
                audioQuality: 9.2,
                engagementRate: 90
            }
        },
        "6": {
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
                {
                    timestamp: Date.now() - 900000,
                    from: "Luke",
                    message: "Scout, any new Detroit properties worth flagging?"
                },
                {
                    timestamp: Date.now() - 840000,
                    from: "Scout",
                    message: "Found 12 new listings today. 3 are Section 8 ready under $100K. Sending details now."
                },
                {
                    timestamp: Date.now() - 600000,
                    from: "Luke",
                    message: "Excellent catch on the Woodward Ave property."
                }
            ],
            keyMetrics: {
                propertiesTracked: 86,
                newListings: 12,
                alertAccuracy: 94
            }
        },
        "7": {
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
                {
                    timestamp: Date.now() - 720000,
                    from: "Luke",
                    message: "Forge, status on the dashboard deployment?"
                },
                {
                    timestamp: Date.now() - 660000,
                    from: "Forge",
                    message: "Mission Control v2 deployed successfully. All agents connected, real-time updates working perfectly."
                },
                {
                    timestamp: Date.now() - 480000,
                    from: "Luke",
                    message: "Great work. System feels much more responsive."
                }
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
function AgentDetailModal({ agent, onClose }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [messageText, setMessageText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    if (!agent) return null;
    const agentDetails = getAgentDetails(agent._id);
    const sendMessage = ()=>{
        if (!messageText.trim()) return;
        // Here you would implement actual message sending to the agent
        console.log(`Sending message to ${agent.name}: ${messageText}`);
        // Reset form
        setMessageText("");
        // Show success feedback
        alert(`Message sent to ${agent.name}!`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#111111] border border-[#1e1e1e] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-4 border-b border-[#1e1e1e]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl",
                                    children: agent.emoji
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-medium text-[#e5e5e5]",
                                            children: agent.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 320,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-mono text-[#525252] uppercase tracking-wide",
                                            children: agent.role
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 321,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 ml-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full",
                                            style: {
                                                backgroundColor: agent.status === "active" ? agent.color : "#525252"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 324,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-mono text-[#737373]",
                                            children: [
                                                agent.status,
                                                " • ",
                                                formatLastSeen(agent.lastSeen)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 328,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-[#737373] hover:text-white p-2 hover:bg-[#1e1e1e] rounded transition-colors",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1 p-2 border-b border-[#1e1e1e]",
                    children: [
                        {
                            id: "overview",
                            label: "Overview"
                        },
                        {
                            id: "soul",
                            label: "Soul File"
                        },
                        {
                            id: "memory",
                            label: "Memory"
                        },
                        {
                            id: "messages",
                            label: "Send Message"
                        }
                    ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab(tab.id),
                            className: `px-3 py-1 font-mono text-xs uppercase tracking-wider rounded transition-colors ${activeTab === tab.id ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" : "text-[#737373] hover:text-white hover:bg-[#1e1e1e]"}`,
                            children: tab.label
                        }, tab.id, false, {
                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                            lineNumber: 349,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                    lineNumber: 342,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 overflow-auto max-h-[60vh]",
                    children: [
                        activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2",
                                            children: "Current Status"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 369,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[#e5e5e5] mb-2",
                                                    children: agent.currentTask
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-4 text-xs font-mono text-[#737373]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Status: ",
                                                                agent.status
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Last seen: ",
                                                                formatLastSeen(agent.lastSeen)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 370,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2",
                                            children: "Key Metrics"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 381,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-4",
                                                children: Object.entries(agentDetails.keyMetrics).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-lg font-medium text-[#e5e5e5]",
                                                                children: String(value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-mono text-[#737373] uppercase tracking-wide",
                                                                children: key.replace(/([A-Z])/g, " $1").replace(/^./, (str)=>str.toUpperCase())
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                lineNumber: 383,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 382,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 380,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2",
                                            children: "Recent Messages"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-3 space-y-2",
                                            children: agentDetails.recentMessages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-mono text-[#525252] whitespace-nowrap",
                                                            children: formatLastSeen(msg.timestamp)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `font-medium ${msg.from === 'Luke' ? 'text-emerald-500' : 'text-[#e5e5e5]'}`,
                                                            children: [
                                                                msg.from,
                                                                ":"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#737373]",
                                                            children: msg.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 399,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this),
                        activeTab === "soul" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2",
                                    children: "Soul File"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 418,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        className: "text-sm text-[#e5e5e5] whitespace-pre-wrap font-mono overflow-auto",
                                        children: agentDetails.soulFile
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AgentDetailModal.tsx",
                                        lineNumber: 420,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 419,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                            lineNumber: 417,
                            columnNumber: 13
                        }, this),
                        activeTab === "memory" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2",
                                    children: "Memory File"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        className: "text-sm text-[#e5e5e5] whitespace-pre-wrap font-mono overflow-auto",
                                        children: agentDetails.memoryFile
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AgentDetailModal.tsx",
                                        lineNumber: 431,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 430,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                            lineNumber: 428,
                            columnNumber: 13
                        }, this),
                        activeTab === "messages" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-mono text-emerald-500 uppercase tracking-wider mb-2",
                                    children: "Send Training Message"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 440,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: messageText,
                                                onChange: (e)=>setMessageText(e.target.value),
                                                placeholder: `Send a training message to ${agent.name}...`,
                                                className: "w-full h-32 bg-transparent text-[#e5e5e5] placeholder:text-[#525252] resize-none outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 442,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: sendMessage,
                                                    disabled: !messageText.trim(),
                                                    className: "px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-[#1e1e1e] disabled:text-[#525252] text-black font-medium rounded transition-colors",
                                                    children: "Send Message"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setMessageText(""),
                                                    className: "px-4 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] text-[#e5e5e5] font-medium rounded transition-colors",
                                                    children: "Clear"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 450,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-[#525252]",
                                            children: [
                                                "This message will be sent to ",
                                                agent.name,
                                                " for training and behavior adjustment."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                                            lineNumber: 465,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AgentDetailModal.tsx",
                            lineNumber: 439,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AgentDetailModal.tsx",
                    lineNumber: 364,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AgentDetailModal.tsx",
            lineNumber: 314,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AgentDetailModal.tsx",
        lineNumber: 313,
        columnNumber: 5
    }, this);
}
_s(AgentDetailModal, "PGLK2tvE13+5WBB3ywBWfeZDmNY=");
_c = AgentDetailModal;
var _c;
__turbopack_context__.k.register(_c, "AgentDetailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AgentCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AgentCards.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActivityFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ActivityFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TaskBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TaskBoard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MetricsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MetricsBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RevenueTrackerV2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RevenueTrackerV2.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BuildQueue$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BuildQueue.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TaskCreator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TaskCreator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeadTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LeadTracker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActionLog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ActionLog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FinancialsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FinancialsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AgentDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AgentDetailModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function TabButton({ label, isActive, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `px-4 py-2 font-mono text-xs uppercase tracking-wider rounded transition-colors ${isActive ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" : "text-[#737373] hover:text-white hover:bg-[#1e1e1e] border border-transparent"}`,
        children: label
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = TabButton;
function Dashboard() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    const [selectedAgent, setSelectedAgent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedActivity, setSelectedActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedActivityAgent, setSelectedActivityAgent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const agents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockAgents"])();
    const tasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockTasks"])();
    const activities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockActivities"])();
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockMetrics"])();
    const handleAgentClick = (agent)=>{
        setSelectedAgent(agent);
    };
    const handleActivityClick = (activity, agent)=>{
        setSelectedActivity(activity);
        setSelectedActivityAgent(agent);
    };
    const renderTabContent = ()=>{
        switch(activeTab){
            case "leads":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 px-4 pb-3 overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeadTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadTracker"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this);
            case "actions":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 px-4 pb-3 overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActionLog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionLog"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this);
            case "financials":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 px-4 pb-3 overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FinancialsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FinancialsTab"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 94,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AgentCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgentCards"], {
                                agents: agents,
                                onAgentClick: handleAgentClick
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex gap-4 px-4 pb-3 min-h-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[60%] flex flex-col min-h-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ActivityFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActivityFeed"], {
                                        activities: activities,
                                        agents: agents,
                                        onActivityClick: handleActivityClick
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[40%] flex flex-col min-h-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TaskBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskBoard"], {
                                        tasks: tasks,
                                        agents: agents
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 pb-6 pt-1 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-mono text-sm text-emerald-500 tracking-widest uppercase",
                                            children: "Mission Control+"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xs text-[#525252]",
                                            children: "REVENUE + QUEUE + TASK CREATION"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RevenueTrackerV2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RevenueTrackerV2"], {}, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 xl:grid-cols-3 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "xl:col-span-2 bg-[#0c0c0c] border border-[#1e1e1e] rounded-lg p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BuildQueue$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuildQueue"], {}, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "xl:col-span-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TaskCreator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskCreator"], {
                                                agents: agents
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 141,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                agentCount: agents.length,
                activeCount: agents.filter((a)=>a.status === "active").length
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-2 border-b border-[#1e1e1e]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                    label: "Dashboard",
                                    isActive: activeTab === "dashboard",
                                    onClick: ()=>setActiveTab("dashboard")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                    label: "Leads",
                                    isActive: activeTab === "leads",
                                    onClick: ()=>setActiveTab("leads")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                    label: "Actions",
                                    isActive: activeTab === "actions",
                                    onClick: ()=>setActiveTab("actions")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                    label: "Financials",
                                    isActive: activeTab === "financials",
                                    onClick: ()=>setActiveTab("financials")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/settings",
                            className: "px-3 py-1 font-mono text-xs text-[#737373] hover:text-emerald-500 hover:bg-[#1e1e1e] rounded transition-colors uppercase tracking-wider",
                            children: "⚙️ Settings"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            renderTabContent(),
            activeTab === "dashboard" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MetricsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricsBar"], {
                metrics: metrics,
                tasks: tasks
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 193,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AgentDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgentDetailModal"], {
                agent: selectedAgent,
                onClose: ()=>setSelectedAgent(null)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "lH6RxWxo/fLYaSJSHmnVS4HWHmw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockAgents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockTasks"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockActivities"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMockMetrics"]
    ];
});
_c1 = Dashboard;
var _c, _c1;
__turbopack_context__.k.register(_c, "TabButton");
__turbopack_context__.k.register(_c1, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_5355f5be._.js.map