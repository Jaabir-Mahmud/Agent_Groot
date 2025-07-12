#!/usr/bin/env python3

print("Testing imports...")

try:
    print("1. Testing basic imports...")
    import os
    import sys
    import time
    import threading
    import requests
    from requests.adapters import HTTPAdapter
    from urllib3.util.retry import Retry
    from concurrent.futures import ThreadPoolExecutor
    from datetime import datetime
    from flask import Flask, send_from_directory, jsonify
    from flask_cors import CORS
    print("✅ Basic imports successful")
    
    print("2. Testing model imports...")
    from models.user import db
    print("✅ Model imports successful")
    
    print("3. Testing route imports...")
    from routes.user import user_bp
    from routes.agents import agents_bp
    print("✅ Route imports successful")
    
    print("4. Testing Flask app creation...")
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'test'
    CORS(app)
    print("✅ Flask app creation successful")
    
    print("5. Testing database setup...")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    print("✅ Database setup successful")
    
    print("6. Testing blueprint registration...")
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(agents_bp, url_prefix='/api')
    print("✅ Blueprint registration successful")
    
    print("\n🎉 All tests passed! The backend should work correctly.")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc() 