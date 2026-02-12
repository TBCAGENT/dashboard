import { NextResponse } from 'next/server';

const TILLER_SHEET_ID = '1pd1dt64gBni4vAWze9QzhVwsmFMcdBuufW6m_0n-OPw';

export async function GET() {
  try {
    // Get Google token
    const { exec } = require('child_process');
    const { promisify } = require('util');
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
    const transactions = rows
      .filter((row: string[]) => row[0] && row[1] && row[2]) // Filter out empty rows
      .map((row: string[], index: number) => ({
        id: `txn-${index}`,
        date: row[0],
        account: row[1],
        amount: parseFloat(row[2]) || 0,
        description: row[3] || '',
        category: row[4] || 'Other',
        institution: row[5] || '',
        accountType: row[6] || ''
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date desc
      .slice(0, 50); // Get most recent 50 transactions

    // Calculate summary metrics
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const thisMonthTransactions = transactions.filter(t => {
      const txnDate = new Date(t.date);
      return txnDate.getMonth() === thisMonth && txnDate.getFullYear() === thisYear;
    });
    
    const monthlySpend = thisMonthTransactions
      .filter(t => t.amount < 0) // Only negative (outgoing) amounts
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // Mock other financial data for now (will enhance later)
    const summary = {
      netWorth: 1430000, // From MEMORY.md
      monthlySpend: Math.round(monthlySpend),
      liquidAssets: 863000, // From MEMORY.md
      financialHealth: 'B-'
    };

    return NextResponse.json({
      transactions: transactions.slice(0, 20), // Return top 20 for display
      summary,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching Tiller data:', error);
    
    // Return mock data as fallback
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      transactions: [
        { id: '1', account: 'Business Platinum •1002', amount: -2745.00, description: 'Office rent', date: '2026-02-11', category: 'Business' },
        { id: '2', account: 'Chase Sapphire •5406', amount: -45.67, description: 'Uber ride', date: '2026-02-11', category: 'Transportation' },
        { id: '3', account: 'Amex Gold •2004', amount: -89.23, description: 'Restaurant', date: '2026-02-11', category: 'Dining' },
      ],
      summary: {
        netWorth: 1430000,
        monthlySpend: 32300,
        liquidAssets: 863000,
        financialHealth: 'B-'
      },
      timestamp: new Date().toISOString()
    }, { status: 200 }); // Return 200 even on error for graceful fallback
  }
}