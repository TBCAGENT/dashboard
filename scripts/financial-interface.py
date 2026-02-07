#!/usr/bin/env python3
"""
Financial Interface - Natural language query processor
Handles conversational questions about finances
"""
import re
import sys
import subprocess
from datetime import datetime

def query_finances(question):
    """Process natural language financial questions"""
    question = question.lower()
    
    # Extract entities
    entities = {
        'll ventures': 'LL Ventures',
        'blackbox': 'BlackBox', 
        'black box': 'BlackBox',
        'personal': 'Personal',
        'giving guidance': 'Giving Guidance Group LLC',
        'fontaine enterprises': 'Fontaine Enterprises LLC',
        'pmmi': 'PMMI'
    }
    
    entity = None
    for key, value in entities.items():
        if key in question:
            entity = value
            break
    
    # Extract time periods
    days = 30  # default
    if 'last week' in question or 'this week' in question:
        days = 7
    elif 'last month' in question or 'this month' in question:
        days = 30
    elif 'last year' in question or 'this year' in question:
        days = 365
    elif 'yesterday' in question:
        days = 1
    elif 'last 2 weeks' in question or 'two weeks' in question:
        days = 14
    elif 'quarter' in question:
        days = 90
    
    # Extract specific time mentions
    time_match = re.search(r'(\d+)\s+(day|week|month)s?', question)
    if time_match:
        num = int(time_match.group(1))
        unit = time_match.group(2)
        if unit == 'day':
            days = num
        elif unit == 'week':
            days = num * 7
        elif unit == 'month':
            days = num * 30
    
    # Determine query type
    query_type = 'total'
    if 'breakdown' in question or 'categories' in question or 'what did i spend' in question:
        query_type = 'breakdown'
    elif 'largest' in question or 'biggest' in question or 'most expensive' in question:
        query_type = 'largest'
    
    # Special queries
    if 'net worth' in question or 'total worth' in question or 'how much money do i have' in question:
        result = subprocess.run(['python3', 'scripts/financial-analyzer.py', 'networth'], 
                              capture_output=True, text=True, cwd='/Users/lukefontaine/.openclaw/workspace')
        return result.stdout.strip()
    
    if 'revenue' in question or 'income' in question or 'made' in question:
        # For revenue, we want positive amounts
        # Note: This needs to be implemented in the analyzer
        return "Revenue tracking not yet implemented - focusing on expenses for now"
    
    # Build command
    cmd = ['python3', 'scripts/financial-analyzer.py', 'query']
    if entity:
        cmd.append(entity)
    else:
        cmd.append('')  # Empty entity = all entities
    cmd.append(str(days))
    cmd.append(query_type)
    
    # Run query
    result = subprocess.run(cmd, capture_output=True, text=True, cwd='/Users/lukefontaine/.openclaw/workspace')
    
    if result.returncode == 0:
        output = result.stdout.strip()
        
        # Add context to the response
        if entity:
            context = f"**{entity}** "
        else:
            context = "**All businesses** "
        
        if days == 7:
            context += "over the last week"
        elif days == 30:
            context += "over the last month"
        elif days == 1:
            context += "yesterday"
        else:
            context += f"over the last {days} days"
        
        return f"{context}:\n{output}"
    else:
        return f"Error processing query: {result.stderr}"

def main():
    if len(sys.argv) < 2:
        print("Usage: python financial-interface.py 'How much did I spend on BlackBox last week?'")
        return
    
    question = ' '.join(sys.argv[1:])
    response = query_finances(question)
    print(response)

if __name__ == "__main__":
    main()