# Groot Multi-Agent AI System - Backend

This is the backend component of the Groot Multi-Agent AI System, built with Flask and designed to simulate collaborative AI agent workflows.

## Features

- **Multi-Agent Simulation**: Simulates the behavior of specialized AI agents working together
- **Real-time Updates**: WebSocket-like polling for real-time activity monitoring
- **RESTful API**: Clean API endpoints for frontend integration
- **Task Management**: Submit, track, and manage complex tasks
- **Activity Logging**: Comprehensive logging of agent activities and system events
- **CORS Support**: Configured for cross-origin requests

## Architecture

The backend consists of several key components:

### Agents
- **Research Agent**: Information retrieval and analysis
- **Content Agent**: Content generation and writing
- **Task Agent**: Task automation and workflow management
- **Coordinator Agent**: Multi-agent coordination and result synthesis

### API Endpoints

#### Agents
- `GET /api/agents` - Get all agents and their current status
- `GET /api/status` - Get overall system status

#### Tasks
- `POST /api/tasks` - Submit a new task for processing
- `GET /api/tasks/<task_id>` - Get the status of a specific task

#### Activity & History
- `GET /api/activity` - Get the activity log
- `GET /api/history` - Get task history

## Installation

1. **Clone the repository** (if not already done)
2. **Navigate to the backend directory**:
   ```bash
   cd groot-backend
   ```

3. **Activate the virtual environment**:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies** (already installed in template):
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Development Mode
```bash
source venv/bin/activate
python src/main.py
```

The server will start on `http://localhost:5000` with debug mode enabled.

### Production Mode
For production deployment, use a WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

## Configuration

The application uses the following configuration:
- **Host**: `0.0.0.0` (allows external connections)
- **Port**: `5000`
- **Debug**: `True` (development mode)
- **CORS**: Enabled for all origins
- **Database**: SQLite (for user management, if needed)

## API Usage Examples

### Submit a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"task": "Research the latest advancements in quantum computing"}'
```

### Get Agent Status
```bash
curl http://localhost:5000/api/agents
```

### Monitor Activity
```bash
curl http://localhost:5000/api/activity
```

## Multi-Agent Workflow

When a task is submitted, the system follows this workflow:

1. **Coordinator Agent** analyzes the task requirements
2. **Research Agent** gathers relevant information
3. **Content Agent** generates content structure
4. **Task Agent** optimizes the workflow
5. **Coordinator Agent** synthesizes the final results

Each step is logged and can be monitored in real-time through the activity log.

## Frontend Integration

The backend serves the built React frontend from the `static` directory. The frontend communicates with the backend through the API endpoints listed above.

## File Structure

```
groot-backend/
├── src/
│   ├── models/          # Database models
│   ├── routes/          # API route handlers
│   │   ├── agents.py    # Multi-agent system routes
│   │   └── user.py      # User management routes
│   ├── static/          # Built frontend files
│   ├── database/        # SQLite database
│   └── main.py          # Application entry point
├── venv/                # Virtual environment
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Development Notes

- The multi-agent system is currently simulated with mock data and timing
- Real AI model integration would replace the simulation logic
- The system is designed to be modular and extensible
- CORS is enabled for development; configure appropriately for production

## Deployment

For deployment on platforms like Heroku, Railway, or similar:

1. Ensure `requirements.txt` is up to date
2. Configure environment variables as needed
3. Use the provided `main.py` as the entry point
4. The application is configured to serve both API and frontend

## Contributing

When adding new features:
1. Follow the existing code structure
2. Add appropriate error handling
3. Update the API documentation
4. Test with the frontend integration

## License

This project is part of the Groot Multi-Agent AI System and follows the same licensing terms.

