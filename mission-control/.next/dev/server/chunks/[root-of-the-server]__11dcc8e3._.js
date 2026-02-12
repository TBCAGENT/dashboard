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
"[project]/src/app/api/airtable/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const AIRTABLE_API_KEY = 'pat7OpXE5AOmY2Vsx.a9022cbf9afe775f5f3a27f7900c77049a3d56fa715e34d0821cb7a756c036d7';
const BASE_ID = 'appEmn0HdyfUfZ429'; // Buyers Club Control Center
const TABLE_NAME = 'Offers';
async function GET() {
    try {
        let allRecords = [];
        let offset;
        // Handle pagination to get ALL records
        do {
            const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`);
            if (offset) {
                url.searchParams.append('offset', offset);
            }
            const response = await fetch(url.toString(), {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            allRecords = allRecords.concat(data.records);
            offset = data.offset;
        }while (offset)
        // Categorize deals by status
        const dealsByStatus = {
            'Offer Made': allRecords.filter((record)=>record.fields.Select === 'Offer Made'),
            'Pending Contract': allRecords.filter((record)=>record.fields.Select === 'Pending Contract'),
            'In Contract': allRecords.filter((record)=>record.fields.Select === 'In Contract')
        };
        // Calculate metrics for each category
        const calculateMetrics = (deals)=>({
                count: deals.length,
                revenue: deals.reduce((sum, record)=>sum + (record.fields['Gross Revenue'] || 0), 0),
                deals: deals.map((record)=>({
                        id: record.id,
                        address: record.fields['Address'] || 'Unknown Address',
                        revenue: record.fields['Gross Revenue'] || 0,
                        date: record.fields['Created'],
                        status: record.fields.Select
                    }))
            });
        const offerMade = calculateMetrics(dealsByStatus['Offer Made']);
        const pendingContract = calculateMetrics(dealsByStatus['Pending Contract']);
        const inContract = calculateMetrics(dealsByStatus['In Contract']);
        // Calculate ALL deals added to pipeline in last 24 hours (regardless of current status)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const last24hDeals = allRecords.filter((record)=>{
            const dateField = record.fields['Created'];
            if (!dateField) return false;
            const recordDate = new Date(dateField);
            return recordDate >= yesterday;
        }).length;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            // Legacy fields for compatibility
            totalRevenue: inContract.revenue,
            dealsCount: inContract.count,
            last24h: last24hDeals,
            deals: inContract.deals,
            // New detailed breakdown
            offerMade,
            pendingContract,
            inContract,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching Airtable data:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__11dcc8e3._.js.map