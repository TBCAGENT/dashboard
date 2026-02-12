module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/app/api/tiller/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const TILLER_SHEET_ID = '1pd1dt64gBni4vAWze9QzhVwsmFMcdBuufW6m_0n-OPw';
async function GET() {
    try {
        // Get Google token
        const { exec } = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
        const { promisify } = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
        const execAsync = promisify(exec);
        const { stdout: tokenOutput } = await execAsync('bash ~/.openclaw/workspace/scripts/google-token.sh');
        const token = tokenOutput.trim();
        // Fetch recent transactions from Tiller sheet
        const range = 'Transactions!A2:J1000'; // Adjust range as needed
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${TILLER_SHEET_ID}/values/${range}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Google Sheets API error: ${response.status}`);
        }
        const data = await response.json();
        const rows = data.values || [];
        // Process transactions (assuming columns: Date, Account, Amount, Description, Category, etc.)
        const transactions = rows.filter((row)=>row[0] && row[1] && row[2]) // Filter out empty rows
        .map((row, index)=>({
                id: `txn-${index}`,
                date: row[0],
                account: row[1],
                amount: parseFloat(row[2]) || 0,
                description: row[3] || '',
                category: row[4] || 'Other',
                institution: row[5] || '',
                accountType: row[6] || ''
            })).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date desc
        .slice(0, 50); // Get most recent 50 transactions
        // Calculate summary metrics
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        const thisMonthTransactions = transactions.filter((t)=>{
            const txnDate = new Date(t.date);
            return txnDate.getMonth() === thisMonth && txnDate.getFullYear() === thisYear;
        });
        const monthlySpend = thisMonthTransactions.filter((t)=>t.amount < 0) // Only negative (outgoing) amounts
        .reduce((sum, t)=>sum + Math.abs(t.amount), 0);
        // Mock other financial data for now (will enhance later)
        const summary = {
            netWorth: 1430000,
            monthlySpend: Math.round(monthlySpend),
            liquidAssets: 863000,
            financialHealth: 'B-'
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            transactions: transactions.slice(0, 20),
            summary,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching Tiller data:', error);
        // Return mock data as fallback
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Unknown error',
            transactions: [
                {
                    id: '1',
                    account: 'Business Platinum •1002',
                    amount: -2745.00,
                    description: 'Office rent',
                    date: '2026-02-11',
                    category: 'Business'
                },
                {
                    id: '2',
                    account: 'Chase Sapphire •5406',
                    amount: -45.67,
                    description: 'Uber ride',
                    date: '2026-02-11',
                    category: 'Transportation'
                },
                {
                    id: '3',
                    account: 'Amex Gold •2004',
                    amount: -89.23,
                    description: 'Restaurant',
                    date: '2026-02-11',
                    category: 'Dining'
                }
            ],
            summary: {
                netWorth: 1430000,
                monthlySpend: 32300,
                liquidAssets: 863000,
                financialHealth: 'B-'
            },
            timestamp: new Date().toISOString()
        }, {
            status: 200
        }); // Return 200 even on error for graceful fallback
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fa964bbb._.js.map