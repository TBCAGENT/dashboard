#!/usr/bin/env python3
"""
Agent Coordination System
Manages communication, task delegation, and memory sharing between specialized agents
"""

import json
import os
import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from enum import Enum
import uuid

class AgentStatus(Enum):
    ACTIVE = "active"
    BUSY = "busy"  
    IDLE = "idle"
    ERROR = "error"

class TaskPriority(Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

@dataclass
class Task:
    id: str
    title: str
    description: str
    priority: TaskPriority
    assigned_agent: str
    status: str
    created_at: datetime.datetime
    due_at: Optional[datetime.datetime] = None
    completed_at: Optional[datetime.datetime] = None
    metadata: Dict[str, Any] = None

@dataclass
class AgentMessage:
    from_agent: str
    to_agent: str
    message_type: str
    content: str
    timestamp: datetime.datetime
    request_id: str = None

class AgentCoordinator:
    def __init__(self, workspace_path: str = "/Users/lukefontaine/.openclaw/workspace"):
        self.workspace = workspace_path
        self.agents_path = os.path.join(workspace_path, "agents")
        self.memory_path = os.path.join(self.agents_path, "memory")
        
        # Load agent definitions
        with open(os.path.join(self.agents_path, "agent-definitions.json"), "r") as f:
            self.agent_config = json.load(f)
        
        # Initialize task queue and message system
        self.task_queue = []
        self.message_history = []
        self.agent_status = {}
        
        # Initialize agent status
        for agent_id in self.agent_config["agents"].keys():
            self.agent_status[agent_id] = AgentStatus.ACTIVE
    
    def create_task(self, title: str, description: str, priority: TaskPriority, 
                   assigned_agent: str, metadata: Dict = None) -> str:
        """Create a new task and add to queue"""
        task_id = str(uuid.uuid4())
        task = Task(
            id=task_id,
            title=title,
            description=description,
            priority=priority,
            assigned_agent=assigned_agent,
            status="queued",
            created_at=datetime.datetime.now(),
            metadata=metadata or {}
        )
        
        self.task_queue.append(task)
        self._log_activity(f"Created task: {title} (assigned to {assigned_agent})")
        return task_id
    
    def send_message(self, from_agent: str, to_agent: str, 
                    message_type: str, content: str) -> str:
        """Send message between agents"""
        message = AgentMessage(
            from_agent=from_agent,
            to_agent=to_agent,
            message_type=message_type,
            content=content,
            timestamp=datetime.datetime.now(),
            request_id=str(uuid.uuid4())
        )
        
        self.message_history.append(message)
        self._log_activity(f"{from_agent} → {to_agent}: {message_type}")
        return message.request_id
    
    def get_agent_memory(self, agent_id: str, memory_type: str = "expertise") -> Dict:
        """Retrieve agent's specialized memory"""
        memory_file = os.path.join(self.memory_path, agent_id.replace("_", "-"), f"{memory_type}.md")
        
        if os.path.exists(memory_file):
            with open(memory_file, "r") as f:
                content = f.read()
            return {"content": content, "last_updated": os.path.getmtime(memory_file)}
        
        return {"content": "", "last_updated": 0}
    
    def update_agent_memory(self, agent_id: str, memory_type: str, content: str):
        """Update agent's memory bank"""
        memory_file = os.path.join(self.memory_path, agent_id.replace("_", "-"), f"{memory_type}.md")
        os.makedirs(os.path.dirname(memory_file), exist_ok=True)
        
        with open(memory_file, "w") as f:
            f.write(content)
        
        self._log_activity(f"Updated {agent_id} memory: {memory_type}")
    
    def get_agent_status(self, agent_id: str) -> Dict:
        """Get current agent status and performance"""
        if agent_id not in self.agent_config["agents"]:
            return {"error": "Agent not found"}
        
        agent = self.agent_config["agents"][agent_id]
        active_tasks = [t for t in self.task_queue if t.assigned_agent == agent_id and t.status != "completed"]
        
        return {
            "agent": agent,
            "status": self.agent_status.get(agent_id, AgentStatus.IDLE).value,
            "active_tasks": len(active_tasks),
            "recent_messages": [m for m in self.message_history[-10:] if m.from_agent == agent_id or m.to_agent == agent_id],
            "memory_banks": self._get_memory_banks(agent_id)
        }
    
    def delegate_task_to_specialist(self, task_description: str, task_type: str) -> str:
        """Intelligently delegate tasks to appropriate agents"""
        
        # Task routing logic based on specialization
        routing_map = {
            "real_estate": ["property", "zillow", "market", "agent", "outreach", "sms"],
            "cfo": ["financial", "analysis", "investment", "portfolio", "wealth", "crypto"],
            "legal": ["contract", "lawsuit", "compliance", "legal", "risk", "regulation"],
            "operations": ["system", "monitoring", "automation", "integration", "api", "failure"]
        }
        
        # Find best match agent
        best_agent = "operations"  # default
        max_matches = 0
        
        task_lower = task_description.lower()
        for agent_id, keywords in routing_map.items():
            matches = sum(1 for keyword in keywords if keyword in task_lower)
            if matches > max_matches:
                max_matches = matches
                best_agent = agent_id
        
        # Determine priority based on keywords
        priority = TaskPriority.LOW
        if any(word in task_lower for word in ["critical", "urgent", "emergency", "failure"]):
            priority = TaskPriority.HIGH
        elif any(word in task_lower for word in ["important", "asap", "priority"]):
            priority = TaskPriority.MEDIUM
        
        return self.create_task(
            title=task_description[:50] + "..." if len(task_description) > 50 else task_description,
            description=task_description,
            priority=priority,
            assigned_agent=best_agent,
            metadata={"task_type": task_type, "auto_delegated": True}
        )
    
    def get_dashboard_data(self) -> Dict:
        """Generate data for mission control dashboard"""
        
        # Calculate metrics
        total_tasks = len(self.task_queue)
        active_tasks = len([t for t in self.task_queue if t.status in ["queued", "in_progress"]])
        completed_today = len([t for t in self.task_queue if 
                              t.completed_at and t.completed_at.date() == datetime.date.today()])
        
        # Agent performance
        agents_data = []
        for agent_id, agent in self.agent_config["agents"].items():
            agent_tasks = [t for t in self.task_queue if t.assigned_agent == agent_id]
            
            agents_data.append({
                "id": agent_id,
                "name": agent["name"],
                "emoji": agent["emoji"],
                "role": agent["role"],
                "status": self.agent_status.get(agent_id, AgentStatus.ACTIVE).value,
                "active_tasks": len([t for t in agent_tasks if t.status != "completed"]),
                "success_rate": agent["memory_bank"]["success_rate"],
                "expertise": agent["expertise_levels"],
                "recent_wins": agent["recent_wins"]
            })
        
        # Recent activity
        activity = []
        for message in self.message_history[-10:]:
            activity.append({
                "time": message.timestamp.strftime("%I:%M %p"),
                "text": f"{message.from_agent} → {message.to_agent}: {message.content[:50]}..."
            })
        
        # Task queue
        queue_tasks = []
        for task in sorted(self.task_queue, key=lambda t: (t.priority.value, t.created_at)):
            if task.status != "completed":
                queue_tasks.append({
                    "id": task.id,
                    "title": task.title,
                    "priority": task.priority.value,
                    "agent": self.agent_config["agents"][task.assigned_agent]["name"],
                    "time_ago": self._time_ago(task.created_at)
                })
        
        return {
            "stats": {
                "active_agents": len([a for a in self.agent_status.values() if a != AgentStatus.IDLE]),
                "active_tasks": active_tasks,
                "completed_today": completed_today,
                "total_tasks": total_tasks
            },
            "agents": agents_data,
            "activity": activity,
            "queue": queue_tasks[:10]  # Top 10 tasks
        }
    
    def _get_memory_banks(self, agent_id: str) -> Dict:
        """Get all memory banks for an agent"""
        memory_dir = os.path.join(self.memory_path, agent_id.replace("_", "-"))
        if not os.path.exists(memory_dir):
            return {}
        
        memory_banks = {}
        for filename in os.listdir(memory_dir):
            if filename.endswith(".md"):
                bank_name = filename[:-3]  # remove .md
                memory_banks[bank_name] = self.get_agent_memory(agent_id, bank_name)
        
        return memory_banks
    
    def _log_activity(self, message: str):
        """Log activity for debugging and monitoring"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {message}\n"
        
        log_file = os.path.join(self.agents_path, "coordination.log")
        with open(log_file, "a") as f:
            f.write(log_entry)
    
    def _time_ago(self, timestamp: datetime.datetime) -> str:
        """Human-readable time ago"""
        now = datetime.datetime.now()
        diff = now - timestamp
        
        if diff.total_seconds() < 60:
            return "Just now"
        elif diff.total_seconds() < 3600:
            return f"{int(diff.total_seconds() / 60)}m ago"
        elif diff.total_seconds() < 86400:
            return f"{int(diff.total_seconds() / 3600)}h ago"
        else:
            return f"{diff.days}d ago"

# Example usage and testing
if __name__ == "__main__":
    coordinator = AgentCoordinator()
    
    # Simulate some tasks and messages
    task1_id = coordinator.create_task(
        "Analyze new Detroit property listings",
        "Review today's Zillow scraping results and identify hot deals",
        TaskPriority.HIGH,
        "real_estate"
    )
    
    task2_id = coordinator.create_task(
        "Weekly financial report generation", 
        "Compile LL Ventures performance and personal portfolio analysis",
        TaskPriority.MEDIUM,
        "cfo"
    )
    
    # Agent communication
    coordinator.send_message(
        "real_estate", 
        "cfo",
        "data_request",
        "Need ROI analysis for 3 potential Detroit properties"
    )
    
    coordinator.send_message(
        "cfo",
        "real_estate", 
        "analysis_complete",
        "Property analysis complete: 2 of 3 properties meet ROI criteria"
    )
    
    # Get dashboard data
    dashboard = coordinator.get_dashboard_data()
    print(json.dumps(dashboard, indent=2, default=str))