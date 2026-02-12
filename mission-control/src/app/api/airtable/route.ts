import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = 'pat7OpXE5AOmY2Vsx.a9022cbf9afe775f5f3a27f7900c77049a3d56fa715e34d0821cb7a756c036d7';
const BASE_ID = 'appEmn0HdyfUfZ429'; // Buyers Club Control Center
const TABLE_NAME = 'Offers';

interface AirtableRecord {
  id: string;
  fields: {
    Address?: string;
    'Gross Revenue'?: number;
    Select?: string;
    Created?: string;
    [key: string]: any;
  };
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

export async function GET() {
  try {
    let allRecords: AirtableRecord[] = [];
    let offset: string | undefined;

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

      const data: AirtableResponse = await response.json();
      allRecords = allRecords.concat(data.records);
      offset = data.offset;
      
    } while (offset);

    // Categorize deals by status
    const dealsByStatus = {
      'Offer Made': allRecords.filter(record => record.fields.Select === 'Offer Made'),
      'Pending Contract': allRecords.filter(record => record.fields.Select === 'Pending Contract'),
      'In Contract': allRecords.filter(record => record.fields.Select === 'In Contract')
    };

    // Calculate metrics for each category
    const calculateMetrics = (deals: AirtableRecord[]) => ({
      count: deals.length,
      revenue: deals.reduce((sum, record) => sum + (record.fields['Gross Revenue'] || 0), 0),
      deals: deals.map(record => ({
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
    
    const last24hDeals = allRecords.filter(record => {
      const dateField = record.fields['Created']; 
      if (!dateField) return false;
      const recordDate = new Date(dateField);
      return recordDate >= yesterday;
    }).length;

    return NextResponse.json({
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
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}