import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Use himalaya to count sent emails for today
    const { stdout } = await execAsync(`himalaya envelope list --folder Sent --size 100`);
    
    // Parse the output and count emails sent today
    const lines = stdout.split('\n');
    let emailsToday = 0;
    
    for (const line of lines) {
      if (line.includes(today)) {
        emailsToday++;
      }
    }

    return NextResponse.json({
      emailsToday,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching email data:', error);
    
    // Fallback: Try to get rough estimate from workspace logs
    try {
      const { stdout: logOutput } = await execAsync(`grep -r "send-email" ~/.openclaw/workspace/memory/ | grep "${new Date().toISOString().split('T')[0]}" | wc -l`);
      const fallbackCount = parseInt(logOutput.trim()) || 0;
      
      return NextResponse.json({
        emailsToday: fallbackCount,
        timestamp: new Date().toISOString(),
        source: 'fallback'
      });
    } catch (fallbackError) {
      return NextResponse.json({
        error: error instanceof Error ? error.message : 'Unknown error',
        emailsToday: 0,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  }
}