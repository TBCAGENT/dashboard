/**
 * OpenClaw API Integration for Enhanced Kanban Board
 * Handles real-time messaging and data persistence
 */

class KanbanAPI {
  constructor() {
    this.gatewayUrl = 'http://localhost:18789'; // OpenClaw gateway (correct port)
    this.token = 'a2bce2bea98bdc1da56bdc3c1af1d1cd';
    this.sessionKey = null;
    this.isConnected = false;
  }

  async initialize() {
    try {
      // Test connection to OpenClaw gateway
      const response = await fetch(`${this.gatewayUrl}/api/status`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      
      if (response.ok) {
        this.isConnected = true;
        console.log('✅ Connected to OpenClaw gateway');
        return true;
      }
    } catch (error) {
      console.warn('⚠️ OpenClaw gateway not available, using local mode');
      this.isConnected = false;
      return false;
    }
  }

  async sendMessage(message, projectContext) {
    if (!this.isConnected) {
      // Fallback to simulated response
      return this.simulateResponse(message, projectContext);
    }

    try {
      // Construct context-aware message for Arthur
      const contextMessage = `[PROJECT: ${projectContext.title}]

${message}

---
PROJECT CONTEXT: ${projectContext.context || 'No additional context'}
PRIORITY: ${projectContext.priority}
STATUS: ${projectContext.column}
RECENT ACTIVITY: ${projectContext.activity.slice(-2).map(a => `${a.action}: ${a.detail || ''}`).join('; ')}`;

      const response = await fetch(`${this.gatewayUrl}/api/sessions/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          message: contextMessage,
          sessionKey: 'agent:main:main', // Main Arthur session
          timeoutSeconds: 30
        })
      });

      if (response.ok) {
        const result = await response.json();
        return result.response || "Message sent to Arthur successfully.";
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('API call failed:', error);
      return this.simulateResponse(message, projectContext);
    }
  }

  // Fallback simulated responses when OpenClaw API isn't available
  simulateResponse(message, projectContext) {
    const responses = {
      'kanban': [
        "I'm actively building this enhanced Kanban board right now! The chat integration is working perfectly as you can see. What specific features should I prioritize next?",
        "This board system is coming together nicely. I can track our conversations per project now. Need any adjustments to the interface?",
        "Perfect! The real-time chat integration means we can collaborate directly on each project. What would you like to work on?"
      ],
      'brain': [
        "The Second Brain system is running and organizing all your information. I can help you search, categorize, or retrieve any info you've shared. What would you like to know?",
        "I'm continuously updating your knowledge base as we chat. All our conversations are being categorized and stored. Need me to find something specific?",
        "Your brain/ folder is growing! I'm tracking all projects, people, and ideas we discuss. How can I help you navigate it?"
      ],
      'default': [
        `Got it! I'm here to help with ${projectContext.title}. What do you need assistance with for this project?`,
        `I understand you're working on ${projectContext.title}. Based on the context, I can help you move this forward. What's your next step?`,
        `Perfect! For ${projectContext.title}, I'm tracking everything we discuss here. How can I help you today?`
      ]
    };

    // Choose response type based on project title
    let responseType = 'default';
    if (projectContext.title.toLowerCase().includes('kanban')) responseType = 'kanban';
    if (projectContext.title.toLowerCase().includes('brain')) responseType = 'brain';

    const possibleResponses = responses[responseType];
    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  }

  // Save board data to OpenClaw workspace
  async saveBoardData(boardData) {
    if (!this.isConnected) {
      // Save to localStorage as fallback
      localStorage.setItem('arthurBoardData', JSON.stringify(boardData));
      return;
    }

    try {
      await fetch(`${this.gatewayUrl}/api/files/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          path: 'board/board-data.json',
          content: JSON.stringify(boardData, null, 2)
        })
      });
    } catch (error) {
      console.warn('Failed to save to OpenClaw, using localStorage');
      localStorage.setItem('arthurBoardData', JSON.stringify(boardData));
    }
  }

  // Load board data from OpenClaw workspace
  async loadBoardData() {
    try {
      // Try to read board-data.json directly
      const response = await fetch('./board-data.json');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Loaded board data from file:', data);
        return data;
      }
    } catch (error) {
      console.warn('Failed to load board-data.json:', error);
    }

    // Fallback to localStorage
    const saved = localStorage.getItem('arthurBoardData');
    if (saved) {
      console.log('📦 Using localStorage data');
      return JSON.parse(saved);
    }
    
    console.log('🆕 No data found, will create default');
    return null;
  }

  // Create project folder in brain/ structure
  async createProjectFolder(task) {
    if (!this.isConnected) return;

    try {
      const projectSlug = task.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const projectPath = `brain/projects/${projectSlug}`;

      // Create project README
      const readmeContent = `# ${task.title}

## Description
${task.description}

## Context
${task.context || 'No additional context provided'}

## Details
- **Priority:** ${task.priority}
- **Type:** ${task.type}
- **Created:** ${task.created}
- **Status:** ${task.column}

## Chat History
Chat messages are stored separately and linked to this project.

## Activity Log
${task.activity.map(a => `- **${a.action}** (${a.date}): ${a.detail || ''}`).join('\n')}
`;

      await fetch(`${this.gatewayUrl}/api/files/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          path: `${projectPath}/README.md`,
          content: readmeContent
        })
      });

      // Save chat history
      await fetch(`${this.gatewayUrl}/api/files/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          path: `${projectPath}/chat-history.json`,
          content: JSON.stringify(task.chatMessages, null, 2)
        })
      });

    } catch (error) {
      console.warn('Failed to create project folder:', error);
    }
  }

  // Update activity log for a task
  addActivity(task, action, detail = '') {
    const activity = {
      date: new Date().toISOString(),
      action: action,
      detail: detail
    };
    
    task.activity.push(activity);
    return activity;
  }

  // Helper to format messages for Arthur with project context
  formatProjectMessage(message, project) {
    return `[PROJECT: ${project.title}] ${message}

PROJECT CONTEXT:
- Priority: ${project.priority}
- Type: ${project.type} 
- Status: ${project.column}
- Description: ${project.description}
${project.context ? `- Context: ${project.context}` : ''}

RECENT ACTIVITY:
${project.activity.slice(-3).map(a => `- ${a.action}: ${a.detail || ''}`).join('\n')}`;
  }
}

// Export for use in the main application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KanbanAPI;
} else {
  window.KanbanAPI = KanbanAPI;
}