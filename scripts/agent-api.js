#!/usr/bin/env node

/**
 * Agent API - Backend integration for agent dashboard
 * Provides real agent data and handles messaging
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const WORKSPACE_PATH = '/Users/lukefontaine/.openclaw/workspace';

// Agent metadata mapping
const agentMetadata = {
    "main:main": {
        name: "Arthur",
        icon: "🦞",
        type: "Main Assistant",
        description: "Primary autonomous agent handling Luke's operations",
        memoryFiles: ["MEMORY.md", "SOUL.md", "USER.md", "AGENTS.md"]
    },
    "main:cron:detroit-monitor": {
        name: "Detroit Monitor",
        icon: "🏠",
        type: "Real Estate Bot",
        description: "Monitors Detroit Section 8 listings every 15 minutes",
        memoryFiles: ["data/realtime_result.json", "scripts/detroit-section8-realtime.sh"]
    },
    "main:cron:evening-digest": {
        name: "Evening Digest", 
        icon: "📰",
        type: "News Aggregator",
        description: "Daily evening news and email digest",
        memoryFiles: ["scripts/email-digest.sh"]
    },
    "main:cron:morning-briefing": {
        name: "Morning Briefing",
        icon: "🌅", 
        type: "Market Intelligence",
        description: "Daily Detroit market briefing and operational status",
        memoryFiles: ["scripts/weather.sh"]
    },
    "main:cron:git-backup": {
        name: "Git Backup",
        icon: "💾",
        type: "System Maintenance", 
        description: "Daily workspace git backup and version control",
        memoryFiles: [".gitignore", "scripts/git-backup.sh"]
    },
    "main:whatsapp:group": {
        name: "Group Chat Handler",
        icon: "💬",
        type: "Social Interface",
        description: "Manages group chat interactions and social protocols", 
        memoryFiles: ["AGENTS.md"]
    },
    "main:cron:heartbeat": {
        name: "Heartbeat Monitor",
        icon: "💓",
        type: "System Health",
        description: "Periodic health checks and proactive monitoring",
        memoryFiles: ["HEARTBEAT.md"]
    }
};

// Get sessions list
async function getSessionsList() {
    return new Promise((resolve, reject) => {
        exec('openclaw sessions list --json', (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting sessions:', error);
                resolve([]);
                return;
            }
            
            try {
                const data = JSON.parse(stdout);
                resolve(data.sessions || []);
            } catch (e) {
                console.error('Error parsing sessions JSON:', e);
                resolve([]);
            }
        });
    });
}

// Get session history
async function getSessionHistory(sessionKey, limit = 10) {
    return new Promise((resolve, reject) => {
        exec(`openclaw sessions history ${sessionKey} --limit ${limit} --json`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting session history:', error);
                resolve({ messages: [] });
                return;
            }
            
            try {
                const data = JSON.parse(stdout);
                resolve(data);
            } catch (e) {
                console.error('Error parsing history JSON:', e);
                resolve({ messages: [] });
            }
        });
    });
}

// Read memory files for an agent
async function getAgentMemory(agentKey) {
    const metadata = agentMetadata[agentKey];
    if (!metadata || !metadata.memoryFiles) {
        return { error: "No memory files defined for this agent" };
    }

    const memoryData = {};
    
    for (const file of metadata.memoryFiles) {
        const filePath = path.join(WORKSPACE_PATH, file);
        try {
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                const content = fs.readFileSync(filePath, 'utf8');
                
                memoryData[file] = {
                    content: content.substring(0, 2000), // Limit content for performance
                    size: stats.size,
                    modified: stats.mtime
                };
            }
        } catch (error) {
            console.error(`Error reading ${file}:`, error);
            memoryData[file] = { error: error.message };
        }
    }
    
    return memoryData;
}

// Send message to agent
async function sendAgentMessage(sessionKey, message) {
    return new Promise((resolve, reject) => {
        const escapedMessage = message.replace(/"/g, '\\"');
        const command = `openclaw sessions send ${sessionKey} "${escapedMessage}"`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error sending message:', error);
                reject(error);
                return;
            }
            
            resolve({ success: true, response: stdout });
        });
    });
}

// API Routes

// Get all agents with their current status
app.get('/api/agents', async (req, res) => {
    try {
        const sessions = await getSessionsList();
        const agents = [];

        for (const session of sessions) {
            // Map session keys to agent keys
            let agentKey = session.key;
            
            // Normalize agent keys
            if (agentKey.includes('cron:') && agentKey.includes('detroit')) {
                agentKey = 'main:cron:detroit-monitor';
            } else if (agentKey.includes('cron:') && agentKey.includes('85b51d1a')) {
                agentKey = 'main:cron:heartbeat';
            } else if (agentKey.includes('cron:') && agentKey.includes('5cdd')) {
                agentKey = 'main:cron:evening-digest';
            } else if (agentKey.includes('cron:') && agentKey.includes('4c94')) {
                agentKey = 'main:cron:morning-briefing';
            } else if (agentKey.includes('cron:') && agentKey.includes('91e9')) {
                agentKey = 'main:cron:git-backup';
            }

            const metadata = agentMetadata[agentKey];
            if (metadata) {
                agents.push({
                    key: agentKey,
                    sessionKey: session.key,
                    sessionId: session.sessionId,
                    ...metadata,
                    status: session.updatedAt > (Date.now() - 3600000) ? 'active' : 'idle', // Active if updated in last hour
                    lastActive: new Date(session.updatedAt).toISOString(),
                    totalTokens: session.totalTokens || 0,
                    model: session.model || 'unknown',
                    contextTokens: session.contextTokens || 0,
                    channel: session.channel || 'unknown'
                });
            }
        }

        res.json({ agents });
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get specific agent details
app.get('/api/agents/:agentKey', async (req, res) => {
    try {
        const agentKey = req.params.agentKey;
        const sessions = await getSessionsList();
        const agentSession = sessions.find(s => s.key.includes(agentKey.split(':')[2]) || s.key === agentKey);
        
        if (!agentSession) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        const memory = await getAgentMemory(agentKey);
        const history = await getSessionHistory(agentSession.key, 5);

        res.json({
            agent: {
                ...agentMetadata[agentKey],
                sessionKey: agentSession.key,
                sessionId: agentSession.sessionId,
                status: agentSession.updatedAt > (Date.now() - 3600000) ? 'active' : 'idle',
                lastActive: new Date(agentSession.updatedAt).toISOString(),
                totalTokens: agentSession.totalTokens || 0,
                model: agentSession.model || 'unknown',
                contextTokens: agentSession.contextTokens || 0
            },
            memory,
            history: history.messages || []
        });
    } catch (error) {
        console.error('Error fetching agent details:', error);
        res.status(500).json({ error: error.message });
    }
});

// Send message to agent
app.post('/api/agents/:agentKey/message', async (req, res) => {
    try {
        const agentKey = req.params.agentKey;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const sessions = await getSessionsList();
        const agentSession = sessions.find(s => s.key.includes(agentKey.split(':')[2]) || s.key === agentKey);

        if (!agentSession) {
            return res.status(404).json({ error: 'Agent session not found' });
        }

        const result = await sendAgentMessage(agentSession.key, message);
        res.json({ success: true, result });
    } catch (error) {
        console.error('Error sending message to agent:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get session history for an agent
app.get('/api/sessions/:sessionKey/history', async (req, res) => {
    try {
        const sessionKey = req.params.sessionKey;
        const limit = req.query.limit || 10;
        
        const history = await getSessionHistory(sessionKey, limit);
        res.json(history);
    } catch (error) {
        console.error('Error fetching session history:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Agent API server running on port ${PORT}`);
    console.log(`Access dashboard at: http://localhost:${PORT}`);
});

// Also serve the dashboard HTML
app.get('/', (req, res) => {
    const dashboardPath = path.join(WORKSPACE_PATH, 'agent-dashboard-enhanced.html');
    res.sendFile(dashboardPath);
});

app.get('/dashboard', (req, res) => {
    const dashboardPath = path.join(WORKSPACE_PATH, 'agent-dashboard-enhanced.html');
    res.sendFile(dashboardPath);
});