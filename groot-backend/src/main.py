import os
import time
import threading
import logging
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from models.user import db
from routes.user import user_bp
from routes.agents import agents_bp

# Initialize HTTP session with increased pool size
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

# Create thread pool with more workers
executor = ThreadPoolExecutor(max_workers=8)  # Increased worker count

# Initialize Flask app with optimized config
app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False  # Disable pretty print for performance

# Enable CORS with optimized settings
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize database
db.init_app(app)

# Register blueprints with URL prefix
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(agents_bp, url_prefix='/api')

def warmup_ollama():
    """Optimized GPU warmup with smaller prompt"""
    try:
        session.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": "warmup",
                "stream": False,
                "options": {
                    "num_gpu_layers": 35,
                    "main_gpu": 0
                }
            },
            timeout=3  # Reduced timeout
        )
        app.logger.info("Ollama GPU warmup complete")
    except Exception as e:
        app.logger.warning(f"Ollama warmup failed: {str(e)}")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Optimized static file serving with caching headers"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    response_headers = {
        'Cache-Control': 'public, max-age=3600'  # Cache static assets
    }

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        response = send_from_directory(static_folder_path, path)
        response.headers.update(response_headers)
        return response
    
    index_path = os.path.join(static_folder_path, 'index.html')
    if os.path.exists(index_path):
        response = send_from_directory(static_folder_path, 'index.html')
        response.headers.update(response_headers)
        return response
    
    return "Not Found", 404

@app.route('/api/performance')
def performance_stats():
    """Optimized performance monitor"""
    try:
        ollama_status = session.get(
            "http://localhost:11434",
            timeout=2  # Reduced timeout
        ).status_code
    except:
        ollama_status = "unreachable"

    return jsonify({
        "status": "healthy",
        "threads": threading.active_count(),
        "ollama": ollama_status,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@app.route('/api/<path:path>', methods=['OPTIONS'])
def options_handler(path):
    return '', 200

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

def create_app():
    """Factory init function with background warmup"""
    with app.app_context():
        db.create_all()
        # Run warmup in background
        threading.Thread(target=warmup_ollama, daemon=True).start()
    return app

if __name__ == '__main__':
    # Optimized logging setup
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s: %(message)s [%(threadName)s]',
        handlers=[
            logging.FileHandler('app.log', mode='a'),
            logging.StreamHandler()
        ]
    )

    # Init and start with production settings
    app = create_app()
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=False,  # Disable debug for production
        threaded=True,
        use_reloader=False
    )