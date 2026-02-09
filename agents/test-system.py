#!/usr/bin/env python3
"""
Test the Mission Control Agent System
Verify all components are working correctly
"""

import os
import sys
import json
import time
sys.path.append('.')
from coordination_system import AgentCoordinator, TaskPriority

def test_coordination_system():
    """Test the agent coordination system"""
    print("🧪 Testing Mission Control Agent System...\n")
    
    # Initialize coordinator
    coordinator = AgentCoordinator()
    print("✅ Agent coordinator initialized")
    
    # Test agent definitions loading
    agents = coordinator.agent_config["agents"]
    print(f"✅ Loaded {len(agents)} agent definitions:")
    for agent_id, agent in agents.items():
        print(f"   🤖 {agent['emoji']} {agent['name']} - {agent['role']}")
    
    # Test task creation
    task_id = coordinator.create_task(
        "Test task creation",
        "Verify the task system is working correctly",
        TaskPriority.HIGH,
        "operations"
    )
    print(f"✅ Created test task: {task_id}")
    
    # Test message system
    message_id = coordinator.send_message(
        "operations",
        "real_estate", 
        "test_message",
        "Testing inter-agent communication"
    )
    print(f"✅ Sent test message: {message_id}")
    
    # Test intelligent delegation
    delegated_task = coordinator.delegate_task_to_specialist(
        "Analyze potential Detroit property investment opportunity",
        "property_analysis"
    )
    print(f"✅ Delegated task to specialist: {delegated_task}")
    
    # Test dashboard data generation
    dashboard_data = coordinator.get_dashboard_data()
    print(f"✅ Generated dashboard data with {len(dashboard_data['agents'])} agents")
    
    # Test memory access
    real_estate_memory = coordinator.get_agent_memory("real_estate", "expertise")
    print(f"✅ Retrieved real estate agent memory: {len(real_estate_memory['content'])} characters")
    
    print("\n🎯 All tests passed! Mission Control system is operational.")
    return True

def test_file_structure():
    """Test that all required files exist"""
    print("\n📁 Testing file structure...\n")
    
    required_files = [
        "agent-definitions.json",
        "coordination_system.py", 
        "dashboard_api.py",
        "launch-mission-control.sh",
        "README.md",
        "../dashboard/mission-control.html"
    ]
    
    missing_files = []
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path}")
            missing_files.append(file_path)
    
    memory_dirs = [
        "memory/real-estate",
        "memory/cfo", 
        "memory/legal",
        "memory/operations"
    ]
    
    for dir_path in memory_dirs:
        if os.path.exists(dir_path):
            files = os.listdir(dir_path)
            print(f"✅ {dir_path}/ ({len(files)} files)")
        else:
            print(f"❌ {dir_path}/")
            missing_files.append(dir_path)
    
    if missing_files:
        print(f"\n⚠️  Missing {len(missing_files)} files/directories")
        return False
    else:
        print("\n✅ All required files and directories present")
        return True

def test_json_validity():
    """Test that JSON files are valid"""
    print("\n🔍 Testing JSON validity...\n")
    
    json_files = ["agent-definitions.json"]
    
    for json_file in json_files:
        try:
            with open(json_file, "r") as f:
                data = json.load(f)
            print(f"✅ {json_file} - Valid JSON with {len(data)} top-level keys")
        except json.JSONDecodeError as e:
            print(f"❌ {json_file} - Invalid JSON: {e}")
            return False
        except FileNotFoundError:
            print(f"❌ {json_file} - File not found")
            return False
    
    return True

def test_api_server():
    """Test that the API server can start"""
    print("\n🌐 Testing API server startup...\n")
    
    try:
        # Import the API module to check for syntax errors  
        import dashboard_api
        print("✅ API module imports successfully")
        
        # Test coordinator can be created
        coordinator = AgentCoordinator()
        print("✅ API coordinator initializes successfully") 
        
        return True
        
    except ImportError as e:
        print(f"❌ API import error: {e}")
        return False
    except Exception as e:
        print(f"❌ API error: {e}")
        return False

def main():
    """Run all tests"""
    print("🎯 Mission Control Agent System Test Suite")
    print("=" * 50)
    
    tests = [
        ("File Structure", test_file_structure),
        ("JSON Validity", test_json_validity),
        ("Coordination System", test_coordination_system), 
        ("API Server", test_api_server)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🧪 Running {test_name} test...")
        try:
            if test_func():
                print(f"✅ {test_name} PASSED")
                passed += 1
            else:
                print(f"❌ {test_name} FAILED")
        except Exception as e:
            print(f"💥 {test_name} ERROR: {e}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED! Mission Control is ready for launch.")
        print("\n🚀 To start the system:")
        print("   ./launch-mission-control.sh")
        return True
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)