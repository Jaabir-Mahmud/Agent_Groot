@echo off
title GROOT AI System - Simple Launcher
echo ================================================================
echo                    GROOT AI SYSTEM
echo                    Simple Launcher
echo ================================================================
echo.

REM Change to the project root directory
cd /d "%~dp0"

echo Checking system requirements...

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH.
    echo Please install Python from https://python.org/
    echo.
    pause
    exit /b 1
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Python and Node.js are available
echo.

REM Check backend requirements
echo Checking backend requirements...
cd groot-backend
if not exist requirements.txt (
    echo ERROR: requirements.txt not found in groot-backend directory
    pause
    exit /b 1
)

REM Install backend dependencies without virtual environment for simplicity
echo Installing Python packages...
pip install -r requirements.txt --quiet
if %errorlevel% neq 0 (
    echo WARNING: Some packages may have failed to install
)

cd ..

REM Check frontend requirements
echo Checking frontend requirements...
cd groot-ai-system
if not exist package.json (
    echo ERROR: package.json not found in groot-ai-system directory
    pause
    exit /b 1
)

REM Install frontend dependencies
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

cd ..

echo.
echo ================================================================
echo Starting GROOT AI System...
echo ================================================================
echo.
echo Backend URL: http://localhost:5000
echo Frontend URL: http://localhost:5173
echo.

REM Start backend
echo [1/2] Starting Backend Server...
start "GROOT Backend Server" cmd /k "cd /d "%~dp0groot-backend" && python src\main.py"

REM Wait for backend to start
echo Waiting for backend to initialize...
timeout /t 4 /nobreak >nul

REM Start frontend
echo [2/2] Starting Frontend Server...
start "GROOT Frontend Server" cmd /k "cd /d "%~dp0groot-ai-system" && npm run dev"

REM Wait a moment then open browser
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo ================================================================
echo GROOT AI System is now running!
echo ================================================================
echo.
echo Frontend Dashboard: http://localhost:5173
echo Backend API: http://localhost:5000
echo.
echo Both services are running in separate windows.
echo Close those windows to stop the services.
echo.
echo This window can be closed safely.
pause
