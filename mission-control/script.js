// Mission Control Dashboard JavaScript

class MissionControl {
    constructor() {
        this.initializeComponents();
        this.startRealTimeUpdates();
        this.bindEvents();
    }

    initializeComponents() {
        this.sidebar = document.querySelector('.sidebar');
        this.mainContent = document.querySelector('.main-content');
        this.intelligencePanel = document.querySelector('.intelligence-panel');
        this.statusCards = document.querySelectorAll('.status-card');
        this.activityFeed = document.querySelector('.activity-feed');
        this.commandsFeed = document.querySelector('.commands-feed');
        this.researchThreads = document.querySelector('.research-threads');
    }

    bindEvents() {
        // Navigation menu clicks
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleNavigation(e);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Apply Strategy button
        const applyStrategyBtn = document.querySelector('.apply-strategy-btn');
        applyStrategyBtn.addEventListener('click', () => {
            this.handleApplyStrategy();
        });

        // Status card interactions
        this.statusCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleStatusCardClick(card);
            });
        });
    }

    handleNavigation(e) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        e.currentTarget.classList.add('active');

        const section = e.currentTarget.querySelector('span').textContent;
        this.loadSection(section);
    }

    loadSection(sectionName) {
        // Simulate loading different sections
        console.log(`Loading section: ${sectionName}`);
        
        // Update main content based on section
        const mainHeader = document.querySelector('.main-header h1');
        mainHeader.textContent = sectionName;

        // Add loading animation
        this.showLoadingState();
        
        setTimeout(() => {
            this.hideLoadingState();
            this.updateContentForSection(sectionName);
        }, 500);
    }

    updateContentForSection(section) {
        const activitySection = document.querySelector('.activity-section');
        const commandsSection = document.querySelector('.commands-section');

        switch(section) {
            case 'Dashboard':
                activitySection.style.display = 'block';
                commandsSection.style.display = 'block';
                break;
            case 'Journal':
                this.loadJournalView();
                break;
            case 'Agents':
                this.loadAgentsView();
                break;
            case 'Intelligence':
                this.loadIntelligenceView();
                break;
            default:
                activitySection.style.display = 'block';
                commandsSection.style.display = 'block';
        }
    }

    handleSearch(query) {
        if (!query) return;

        // Simulate search functionality
        console.log(`Searching for: ${query}`);
        this.highlightSearchResults(query);
    }

    highlightSearchResults(query) {
        // Simple search highlighting
        const searchableElements = document.querySelectorAll('.activity-title, .command-title, .thread-title');
        
        searchableElements.forEach(element => {
            const text = element.textContent;
            if (text.toLowerCase().includes(query.toLowerCase())) {
                element.style.backgroundColor = '#3b82f6';
                element.style.color = 'white';
                element.style.padding = '2px 4px';
                element.style.borderRadius = '4px';
                
                setTimeout(() => {
                    element.style.backgroundColor = '';
                    element.style.color = '';
                    element.style.padding = '';
                    element.style.borderRadius = '';
                }, 2000);
            }
        });
    }

    handleApplyStrategy() {
        // Simulate applying strategy
        const btn = document.querySelector('.apply-strategy-btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'Applying...';
        btn.disabled = true;
        btn.style.background = '#f59e0b';

        setTimeout(() => {
            btn.textContent = 'Applied ✓';
            btn.style.background = '#10b981';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '#3b82f6';
            }, 2000);
        }, 1500);

        // Add new activity item
        this.addActivityItem({
            title: 'Strategy Application',
            description: 'Applied new intelligence strategy based on multi-day research threads...',
            status: 'active',
            time: 'Now'
        });
    }

    handleStatusCardClick(card) {
        // Animate clicked card
        card.style.transform = 'scale(1.05)';
        card.style.borderColor = '#3b82f6';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.borderColor = '#333';
        }, 200);

        // Show detailed view
        const statusType = card.querySelector('.status-header span').textContent;
        this.showStatusDetails(statusType);
    }

    showStatusDetails(statusType) {
        // Create modal or detailed view
        const modal = document.createElement('div');
        modal.className = 'status-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${statusType} Details</h3>
                <p>Detailed information about ${statusType.toLowerCase()} status...</p>
                <button onclick="this.closest('.status-modal').remove()">Close</button>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        modal.querySelector('.modal-content').style.cssText = `
            background: #1a1a1a;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #333;
            max-width: 500px;
            width: 90%;
        `;

        modal.querySelector('button').style.cssText = `
            margin-top: 15px;
            padding: 8px 16px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        `;

        document.body.appendChild(modal);
    }

    startRealTimeUpdates() {
        // Update system stats
        this.updateSystemStats();
        setInterval(() => this.updateSystemStats(), 30000);

        // Add new activities periodically
        setInterval(() => this.simulateNewActivity(), 45000);

        // Update status indicators
        setInterval(() => this.updateStatusIndicators(), 5000);

        // Update timestamps
        setInterval(() => this.updateTimestamps(), 60000);
    }

    updateSystemStats() {
        const stats = document.querySelectorAll('.stat-item span:last-child');
        const apiRequests = stats[0];
        const activeThreads = stats[1];
        
        if (apiRequests) {
            const current = parseInt(apiRequests.textContent.replace(',', ''));
            apiRequests.textContent = (current + Math.floor(Math.random() * 50) + 10).toLocaleString();
        }
        
        if (activeThreads) {
            const variations = [6, 7, 8, 9, 10];
            activeThreads.textContent = variations[Math.floor(Math.random() * variations.length)];
        }
    }

    simulateNewActivity() {
        const activities = [
            {
                title: 'Data Pipeline Optimization',
                description: 'Optimizing real-time data processing pipeline for improved performance...',
                status: 'active',
                time: 'Now'
            },
            {
                title: 'Security Scan Complete',
                description: 'Completed comprehensive security scan of all systems...',
                status: 'completed',
                time: 'Just now'
            },
            {
                title: 'Market Intelligence Update',
                description: 'Processing new market data and updating intelligence models...',
                status: 'analyzing',
                time: 'Now'
            }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        this.addActivityItem(randomActivity);
    }

    addActivityItem(activity) {
        const activityFeed = document.querySelector('.activity-feed');
        const newItem = document.createElement('div');
        newItem.className = `activity-item ${activity.status === 'active' ? 'in-progress' : ''}`;
        
        const iconClass = activity.status === 'active' ? 'fa-sync fa-spin' : 
                         activity.status === 'completed' ? 'fa-check-circle' : 'fa-chart-bar';
        
        newItem.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-desc">${activity.description}</div>
                <div class="activity-meta">
                    <span class="activity-status ${activity.status}">${activity.status}</span>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `;

        // Add with animation
        newItem.style.opacity = '0';
        newItem.style.transform = 'translateY(-20px)';
        
        activityFeed.insertBefore(newItem, activityFeed.firstChild);
        
        // Animate in
        setTimeout(() => {
            newItem.style.transition = 'all 0.3s ease';
            newItem.style.opacity = '1';
            newItem.style.transform = 'translateY(0)';
        }, 100);

        // Remove oldest items if more than 5
        const items = activityFeed.querySelectorAll('.activity-item');
        if (items.length > 5) {
            items[items.length - 1].remove();
        }
    }

    updateStatusIndicators() {
        const statusValues = document.querySelectorAll('.status-value');
        
        // Randomly update some values to simulate real-time changes
        statusValues.forEach((value, index) => {
            if (Math.random() > 0.7) { // 30% chance to update
                const current = parseInt(value.textContent);
                let newValue;
                
                switch(index) {
                    case 1: // Active
                        newValue = Math.max(0, current + (Math.random() > 0.5 ? 1 : -1));
                        break;
                    case 2: // Completed
                        newValue = current + Math.floor(Math.random() * 3);
                        break;
                    case 3: // Workspace
                        newValue = Math.max(5, current + (Math.random() > 0.5 ? 1 : -1));
                        break;
                    default:
                        return;
                }
                
                value.textContent = newValue;
                value.style.color = '#3b82f6';
                setTimeout(() => {
                    value.style.color = '';
                }, 1000);
            }
        });
    }

    updateTimestamps() {
        const timeElements = document.querySelectorAll('.activity-time, .command-time');
        
        timeElements.forEach(element => {
            const text = element.textContent;
            if (text.includes('m ago')) {
                const minutes = parseInt(text);
                element.textContent = `${minutes + 1}m ago`;
            } else if (text.includes('h ago')) {
                const hours = parseInt(text);
                if (hours < 23) {
                    element.textContent = `${hours + 1}h ago`;
                }
            }
        });
    }

    showLoadingState() {
        const content = document.querySelector('.main-content');
        content.style.opacity = '0.5';
        content.style.pointerEvents = 'none';
    }

    hideLoadingState() {
        const content = document.querySelector('.main-content');
        content.style.opacity = '';
        content.style.pointerEvents = '';
    }

    loadJournalView() {
        // Implementation for journal view
        console.log('Loading journal view...');
    }

    loadAgentsView() {
        // Implementation for agents view
        console.log('Loading agents view...');
    }

    loadIntelligenceView() {
        // Implementation for intelligence view
        console.log('Loading intelligence view...');
    }
}

// Initialize Mission Control when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MissionControl();
});

// Utility functions
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-bar input').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput === document.activeElement) {
            searchInput.value = '';
            searchInput.blur();
        }
    }
});