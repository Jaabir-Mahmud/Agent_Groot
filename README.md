# Groot Multi-Agent AI System

A comprehensive multi-agent AI system that demonstrates collaborative artificial intelligence through specialized agents working together to solve complex tasks. Built with modern web technologies and designed for both development and production deployment.

## 🌟 Overview

Groot is a revolutionary multi-agent AI system that brings together specialized AI agents to work collaboratively on complex tasks. Unlike traditional single-AI solutions, Groot leverages the power of multiple intelligent agents, each with unique capabilities, working in harmony to deliver superior results.

## 🚀 Features

- **Multi-Agent Collaboration**: Specialized agents working together
- **Real-time Monitoring**: Live activity tracking and status updates
- **Modern UI/UX**: Beautiful, responsive interface built with React
- **RESTful API**: Clean backend architecture with Flask
- **Task Management**: Submit, track, and manage complex workflows
- **Responsive Design**: Optimized for desktop and mobile devices
- **Production Ready**: Configured for deployment on various platforms
- **AI Model Integration Ready**: Designed for easy integration of real LLMs

## 🏗️ Architecture

### Frontend (React)
- **Landing Page**: Professional showcase of the system
- **Dashboard**: Interactive interface for agent management
- **Real-time Updates**: Live monitoring of agent activities
- **Responsive Design**: Mobile-first approach

### Backend (Flask)
- **Multi-Agent Simulation**: Coordinated agent workflows
- **RESTful API**: Clean endpoints for frontend integration
- **Task Processing**: Asynchronous task handling
- **Activity Logging**: Comprehensive system monitoring
- **LLM Integration Points**: Placeholder functions for easy AI model integration

### Agents
1. **Research Agent**: Information retrieval and analysis
2. **Content Agent**: Content generation and writing
3. **Task Agent**: Workflow automation and management
4. **Coordinator Agent**: Multi-agent coordination and synthesis

## 📦 Project Structure

```
groot-complete-project/
├── groot-ai-system/          # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── assets/          # Images and static files
│   │   └── ...
│   ├── dist/                # Built production files
│   ├── package.json
│   └── README.md
├── groot-backend/            # Flask Backend
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   │   ├── agents.py    # Multi-agent system routes with LLM placeholders
│   │   │   └── ...
│   │   ├── models/          # Database models
│   │   ├── static/          # Served frontend files
│   │   └── main.py          # Application entry point
│   ├── venv/                # Python virtual environment
│   ├── requirements.txt
│   └── README.md
├── Groot_Website_Guidelines.md  # Complete system documentation
├── AI_MODEL_INTEGRATION.md    # Guide for integrating real AI models
└── README.md                # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm (or npm)
- Python 3.11+
- Git

### Quick Start

1. **Clone or extract the project**:
   ```bash
   cd groot-complete-project
   ```

2. **Backend Setup**:
   ```bash
   cd groot-backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**:
   ```bash
   cd ../groot-ai-system
   pnpm install  # or npm install
   ```

### Development Mode

1. **Start the Backend** (Terminal 1):
   ```bash
   cd groot-backend
   source venv/bin/activate
   python src/main.py
   ```
   Backend will run on `http://localhost:5000`

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd groot-ai-system
   pnpm run dev  # or npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Production Build

1. **Build the Frontend**:
   ```bash
   cd groot-ai-system
   pnpm run build
   ```

2. **Copy to Backend** (for integrated deployment):
   ```bash
   cp -r dist/* ../groot-backend/src/static/
   ```

3. **Run Production Server**:
   ```bash
   cd ../groot-backend
   source venv/bin/activate
   python src/main.py
   ```

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway/Heroku (Backend)

#### Deploy Backend to Railway
1. Create account at [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `groot-backend` folder
4. Railway will auto-detect Flask and deploy
5. Note the deployed URL (e.g., `https://your-app.railway.app`)

#### Deploy Frontend to Vercel
1. Update API URL in `groot-ai-system/src/components/Dashboard.jsx`:
   ```javascript
   const API_BASE_URL = 'https://your-app.railway.app/api';
   ```
2. Build the frontend:
   ```bash
   cd groot-ai-system
   pnpm run build
   ```
3. Deploy to Vercel:
   - Upload the `dist/` folder to Vercel
   - Or connect your GitHub repository

### Option 2: Full-Stack Deployment (Recommended)

This option serves both frontend and backend from a single Flask application.

#### Step 1: Build and Integrate
```bash
# Build frontend
cd groot-ai-system
pnpm run build

# Copy to backend
cp -r dist/* ../groot-backend/src/static/

# Update requirements
cd ../groot-backend
source venv/bin/activate
pip freeze > requirements.txt
```

#### Step 2: Deploy to Platform

**Heroku:**
```bash
# Install Heroku CLI
# Create Procfile in groot-backend/
echo "web: gunicorn -w 4 -b 0.0.0.0:\$PORT src.main:app" > Procfile

# Deploy
heroku create your-app-name
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a your-app-name
git push heroku main
```

**Railway:**
1. Connect GitHub repository
2. Select `groot-backend` folder
3. Railway auto-deploys

**DigitalOcean App Platform:**
1. Create new app
2. Connect GitHub repository
3. Select `groot-backend` folder
4. Configure build and run commands

### Option 3: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
# groot-backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src/ ./src/
EXPOSE 5000

CMD ["python", "src/main.py"]
```

#### Build and Run
```bash
cd groot-backend
docker build -t groot-backend .
docker run -p 5000:5000 groot-backend
```

## 🎯 Usage

1. **Access the Application**: Open your browser to the deployed URL or `http://localhost:5000`
2. **Explore the Landing Page**: Learn about the system capabilities
3. **Launch the Dashboard**: Click "Launch Groot" to access the main interface
4. **Submit a Task**: Enter a complex task in the text area
5. **Monitor Progress**: Watch agents collaborate in real-time
6. **View Results**: See the synthesized output from multiple agents

### Example Tasks
- "Research the latest advancements in quantum computing and provide a comprehensive summary"
- "Analyze the impact of AI on healthcare systems and provide implementation recommendations"
- "Create a business plan for a sustainable energy startup"

## 🔧 Configuration

### Backend Configuration
- **Host**: `0.0.0.0` (allows external connections)
- **Port**: `5000`
- **CORS**: Enabled for all origins
- **Debug**: Configurable via environment

### Frontend Configuration
- **API Base URL**: Configurable in `Dashboard.jsx`
- **Build Output**: `dist/` directory
- **Development Port**: `5173`

## 📚 Documentation

- **Complete Guidelines**: See `Groot_Website_Guidelines.md`
- **Frontend README**: `groot-ai-system/README.md`
- **Backend README**: `groot-backend/README.md`
- **AI Model Integration Guide**: `AI_MODEL_INTEGRATION.md`

## 🧪 Testing

### Frontend Testing
```bash
cd groot-ai-system
pnpm run dev
# Test in browser at http://localhost:5173
```

### Backend Testing
```bash
cd groot-backend
source venv/bin/activate
python src/main.py
# Test API endpoints at http://localhost:5000/api
```

### Integration Testing
1. Start both frontend and backend
2. Submit a task through the dashboard
3. Monitor real-time agent activity
4. Verify results display correctly

## 🔒 Security Considerations

- **CORS**: Configure appropriately for production
- **Environment Variables**: Use for sensitive configuration
- **Input Validation**: Implemented for task submissions
- **Error Handling**: Comprehensive error management

## 🚀 Performance

- **Frontend**: Optimized with Vite bundling
- **Backend**: Asynchronous task processing
- **Database**: SQLite for development, scalable options for production
- **Caching**: Implemented where appropriate

## 🔍 Monitoring and Logging

### Add Logging to Flask
```python
import logging
from logging.handlers import RotatingFileHandler

if not app.debug:
    file_handler = RotatingFileHandler("logs/groot.log", maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        "%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]"
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
```

### Monitoring Tools
- **Heroku**: Built-in metrics and logs
- **Railway**: Application metrics dashboard
- **Custom**: Use tools like Sentry for error tracking

## 🆘 Troubleshooting

### Common Issues

**Frontend not loading:**
- Check if static files are properly copied to backend
- Verify API_BASE_URL configuration
- Check browser console for errors

**Backend API errors:**
- Verify all dependencies are installed
- Check Flask logs for detailed errors
- Ensure CORS is properly configured

**Real-time updates not working:**
- Check network connectivity
- Verify API endpoints are accessible
- Test with browser developer tools

### Debug Mode
Enable debug mode for development:
```python
# In src/main.py
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

## 📞 Support

For deployment issues:
1. Check the logs for specific error messages
2. Verify all environment variables are set
3. Test API endpoints individually
4. Ensure all dependencies are installed
5. Check platform-specific documentation

## 🎉 Success!

Once deployed, your Groot Multi-Agent AI System will be accessible to users worldwide. The system demonstrates:
- Modern web development practices
- Real-time multi-agent collaboration
- Professional UI/UX design
- Scalable architecture
- Production-ready deployment

**Your collaborative AI system is now live and ready to showcase the future of multi-agent artificial intelligence!**

"# Agent_Groot" 
