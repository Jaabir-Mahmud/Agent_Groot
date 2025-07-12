@echo off
title GROOT AI System - Quick Start
echo Starting GROOT AI System (Quick Start)...

REM Change to the project root directory
cd /d "%~dp0"

REM Start backend
if exist groot-backend\venv\Scripts\activate.bat (
    start "GROOT Backend" cmd /k "cd groot-backend && call venv\Scripts\activate.bat && python src\main.py"
) else (
    start "GROOT Backend" cmd /k "cd groot-backend && python src\main.py"
)

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start frontend
if exist groot-ai-system\node_modules (
    start "GROOT Frontend" cmd /k "cd groot-ai-system && npm run dev"
) else (
    echo Installing frontend dependencies first...
    cd groot-ai-system
    npm install
    start "GROOT Frontend" cmd /k "npm run dev"
    cd ..
)

echo.
echo GROOT AI System started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Close the opened command windows to stop the services.
pause
