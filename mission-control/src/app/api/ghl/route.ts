import { NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6ImEweERVZlN6YWR0MjU2QmJVY2d6IiwidmVyc2lvbiI6MSwiaWF0IjoxNzM1MzEwMDU3NDkwLCJzdWIiOiI1NFJkdUNaenJqNEtMaWJpc0N2ZSJ9.gZjSmKIpqVUOhYrRgK5gBSXVvXqEQB2r3R3pXS3vFpk';
const GHL_LOCATION_ID = 'a0xDUfSzadt256BbUcgz';

export async function GET() {
  try {
    // Get SMS count for today
    const today = new Date().toISOString().split('T')[0];
    
    const response = await fetch(`https://services.leadconnectorhq.com/conversations/search?locationId=${GHL_LOCATION_ID}&startDate=${today}&limit=1000`, {
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`GHL API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Count SMS messages sent today
    let smsCount = 0;
    if (data.conversations) {
      for (const conversation of data.conversations) {
        if (conversation.messages) {
          smsCount += conversation.messages.filter((msg: any) => {
            return msg.type === 'SMS' && 
                   msg.direction === 'outbound' && 
                   new Date(msg.dateAdded).toISOString().startsWith(today);
          }).length;
        }
      }
    }

    return NextResponse.json({
      smsToday: smsCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching GHL data:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      smsToday: 0,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}