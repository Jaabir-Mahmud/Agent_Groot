from flask import Blueprint, request, jsonify, current_app
import time
import threading
from datetime import datetime
import uuid
import requests
import json
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from concurrent.futures import ThreadPoolExecutor
import logging
from functools import wraps

# Initialize blueprint
agents_bp = Blueprint("agents", __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a persistent HTTP session with connection pooling
session = requests.Session()
retry_strategy = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[500, 502, 503, 504]
)
session.mount("http://", HTTPAdapter(
    max_retries=retry_strategy,
    pool_connections=20,  # Increased pool size
    pool_maxsize=20
))

# Thread pool for concurrent task processing
executor = ThreadPoolExecutor(max_workers=8)  # Increased worker count

# Global state for tasks and activity
active_tasks = {}
activity_log = []
task_history = []

# Define the multi-agent system
AGENTS = [
    {
        "id": "coord-001",
        "name": "Coordinator Agent",
        "status": "idle",
        "type": "coordinator",
        "description": "Orchestrates tasks between agents",
        "capabilities": ["Task Management", "Agent Coordination", "Workflow Optimization"],
    },
    {
        "id": "research-001",
        "name": "Research Agent",
        "status": "idle",
        "type": "research",
        "description": "Gathers and analyzes information",
        "capabilities": ["Data Analysis", "Information Gathering", "Research Synthesis"],
    },
    {
        "id": "content-001",
        "name": "Content Agent",
        "status": "idle",
        "type": "content",
        "description": "Generates and optimizes content",
        "capabilities": ["Content Generation", "Text Optimization", "Creative Writing"],
    },
    {
        "id": "task-001",
        "name": "Task Agent",
        "status": "idle",
        "type": "task",
        "description": "Manages and optimizes workflows",
        "capabilities": ["Process Automation", "Task Scheduling", "Performance Monitoring"],
    },
]

active_agents = AGENTS.copy()

# Decorator for error handling
def handle_errors(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logger.error(f"Error in {f.__name__}: {str(e)}")
            return jsonify({"success": False, "error": str(e)}), 500
    return wrapper

def add_activity(agent_name, action, task_id=None, activity_type="info"):
    """Add an activity to the log with improved structure"""
    activity = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "agent": agent_name,
        "action": action,
        "type": activity_type,
        "task_id": task_id,
    }
    activity_log.append(activity)
    logger.info(f"Activity: {agent_name} - {action}")
    return activity

def update_agent_status(agent_name, status):
    """Update agent status with validation"""
    valid_statuses = ["active", "idle", "busy", "error"]
    if status not in valid_statuses:
        logger.warning(f"Invalid status '{status}' for agent {agent_name}")
        status = "error"
    
    for agent in active_agents:
        if agent["name"] == agent_name:
            agent["status"] = status
            logger.debug(f"Updated {agent_name} status to {status}")
            break

def call_llm_api(prompt, model_name="mistral", max_tokens=200, temperature=0.7, timeout=30):
    """Ultra-fast LLM API call - exactly like PowerShell"""
    try:
        url = "http://localhost:11434/api/generate"
        payload = {
            "model": model_name,
            "prompt": prompt,
            "temperature": temperature,
            "num_predict": max_tokens,
            "stream": False,  # Disable streaming for speed
            "options": {
                "num_gpu_layers": 35,
                "main_gpu": 0
            }
        }

        logger.info(f"Calling LLM with prompt: {prompt[:50]}...")
        start_time = time.time()
        
        response = session.post(url, json=payload, timeout=timeout)
        if response.status_code != 200:
            raise Exception(f"API Error {response.status_code}: {response.text}")
        
        result = response.json().get("response", "")
        logger.info(f"LLM response in {(time.time()-start_time):.2f}s")
        return result

    except requests.exceptions.Timeout:
        raise Exception(f"Timeout after {timeout} seconds")
    except requests.exceptions.ConnectionError:
        raise Exception("Cannot connect to Ollama server")
    except Exception as e:
        raise Exception(f"LLM Error: {str(e)}")

def research_with_llm(query):
    """Optimized research function with single attempt"""
    try:
        return call_llm_api(
            prompt=f"Provide concise technical analysis of: {query}",
            timeout=45  # Reduced timeout
        )
    except Exception as e:
        logger.warning(f"Research failed: {str(e)}")
        raise Exception("Research attempt failed")

def generate_content_with_llm(topic, research_summary=""):
    """Optimized content generation"""
    base_prompt = f"Create practical examples for: {topic}"
    if research_summary:
        base_prompt += f"\n\nResearch Context:\n{research_summary}"
    
    try:
        return call_llm_api(
            prompt=f"{base_prompt}. Include complete code samples.",
            timeout=45  # Reduced timeout
        )
    except Exception as e:
        logger.warning(f"Content generation failed: {str(e)}")
        raise Exception("Content generation failed")

def simulate_agent_work(task_id, task_description):
    """Ultra-fast single API call workflow - like PowerShell"""
    try:
        # Single direct call like PowerShell - no complex workflow
        update_agent_status("Research Agent", "active")
        add_activity("Research Agent", "Processing request", task_id)
        
        # Make one direct call with the exact prompt
        result = call_llm_api(
            prompt=task_description,
            timeout=120,
            max_tokens=300
        )
        
        if task_id in active_tasks:
            active_tasks[task_id].update({
                "status": "completed",
                "result": result,
                "completed_at": datetime.utcnow().isoformat() + "Z"
            })
            
            task_history.append({
                "id": task_id,
                "task": task_description,
                "timestamp": active_tasks[task_id]["created_at"],
                "status": "completed",
                "result": result[:500] + "..." if len(result) > 500 else result
            })
            
            add_activity("System", "Task completed successfully", task_id, "success")

    except Exception as e:
        logger.error(f"Task processing failed: {str(e)}")
        if task_id in active_tasks:
            active_tasks[task_id].update({
                "status": "failed",
                "error": str(e),
                "completed_at": datetime.utcnow().isoformat() + "Z"
            })
            add_activity("System", f"Task failed: {str(e)}", task_id, "error")

# API Endpoints
@agents_bp.route("/agents", methods=["GET"])
@handle_errors
def get_agents():
    """Get all agents and their current status"""
    return jsonify({
        "success": True,
        "agents": active_agents,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@agents_bp.route("/tasks", methods=["POST"])
@handle_errors
def submit_task():
    """Submit a new task for processing"""
    data = request.get_json()
    
    if not data or "task" not in data:
        logger.warning("Task submission missing required field")
        return jsonify({
            "success": False,
            "error": "Task description is required"
        }), 400
    
    task_id = str(uuid.uuid4())
    task_description = data["task"]
    
    task = {
        "id": task_id,
        "description": task_description,
        "status": "processing",
        "created_at": datetime.utcnow().isoformat() + "Z",
        "result": None
    }
    
    active_tasks[task_id] = task
    
    # Submit to thread pool
    executor.submit(simulate_agent_work, task_id, task_description)
    
    logger.info(f"Started processing task {task_id}")
    add_activity("System", f"Task started: {task_description}", task_id)
    
    return jsonify({
        "success": True,
        "task_id": task_id,
        "message": "Task submitted successfully",
        "timestamp": task["created_at"]
    })

@agents_bp.route("/tasks/<task_id>", methods=["GET"])
@handle_errors
def get_task_status(task_id):
    """Get the status of a specific task"""
    if task_id not in active_tasks:
        logger.warning(f"Task not found: {task_id}")
        return jsonify({
            "success": False,
            "error": "Task not found"
        }), 404
    
    return jsonify({
        "success": True,
        "task": active_tasks[task_id],
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@agents_bp.route("/activity", methods=["GET"])
@handle_errors
def get_activity_log():
    """Get the activity log"""
    return jsonify({
        "success": True,
        "activities": activity_log[-50:],
        "count": len(activity_log),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@agents_bp.route("/history", methods=["GET"])
@handle_errors
def get_task_history():
    """Get task history"""
    return jsonify({
        "success": True,
        "history": task_history,
        "count": len(task_history),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@agents_bp.route("/status", methods=["GET"])
@handle_errors
def get_system_status():
    """Get overall system status"""
    return jsonify({
        "success": True,
        "status": {
            "active_agents": sum(1 for agent in active_agents if agent["status"] == "active"),
            "idle_agents": sum(1 for agent in active_agents if agent["status"] == "idle"),
            "active_tasks": sum(1 for task in active_tasks.values() if task["status"] == "processing"),
            "total_agents": len(active_agents),
            "total_completed_tasks": len(task_history),
            "total_failed_tasks": sum(1 for task in active_tasks.values() if task.get("status") == "failed"),
            "thread_pool": executor._max_workers
        },
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@agents_bp.route("/performance", methods=["GET"])
@handle_errors
def performance_stats():
    """Performance monitoring endpoint"""
    return jsonify({
        "success": True,
        "ollama_status": session.get("http://localhost:11434").status_code,
        "active_threads": threading.active_count(),
        "system_time": datetime.utcnow().isoformat() + "Z"
    })