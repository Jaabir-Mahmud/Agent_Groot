@echo off
title GROOT AI System Launcher
echo ================================================================
echo                    GROOT AI SYSTEM LAUNCHER
echo ================================================================
echo.
echo Starting both Frontend and Backend services...
echo.

REM Change to the project root directory
cd /d "%~dp0"

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH.
    echo Please install Python from https://python.org/
    pause
    exit /b 1
)

REM Check if pnpm is available, fallback to npm
pnpm --version >nul 2>&1
if %errorlevel% equ 0 (
    set PACKAGE_MANAGER=pnpm
    echo Using pnpm as package manager...
) else (
    npm --version >nul 2>&1
    if %errorlevel% equ 0 (
        set PACKAGE_MANAGER=npm
        echo Using npm as package manager...
    ) else (
        echo ERROR: Neither pnpm nor npm is available.
        pause
        exit /b 1
    )
)

echo.
echo ================================================================
echo Installing dependencies (if needed)...
echo ================================================================

REM Install frontend dependencies
echo.
echo [1/2] Checking frontend dependencies...
cd groot-ai-system
if not exist node_modules (
    echo Installing frontend dependencies...
    %PACKAGE_MANAGER% install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies.
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed.
)

REM Install backend dependencies
cd ..\groot-backend
echo.
echo [2/2] Checking backend dependencies...
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo ERROR: Failed to create virtual environment.
        pause
        exit /b 1
    )
)

echo Activating virtual environment and installing requirements...
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies.
        pause
        exit /b 1
    )
) else (
    echo Installing requirements globally...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies.
        pause
        exit /b 1
    )
)

cd ..

echo.
echo ================================================================
echo Starting services...
echo ================================================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C in either window to stop the services.
echo.

REM Start backend in a new command window
echo Starting Backend (Flask)...
if exist groot-backend\venv\Scripts\activate.bat (
    start "GROOT Backend - Flask Server" cmd /k "cd /d "%~dp0groot-backend" && call venv\Scripts\activate.bat && python src\main.py"
) else (
    start "GROOT Backend - Flask Server" cmd /k "cd /d "%~dp0groot-backend" && python src\main.py"
)

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new command window
echo Starting Frontend (Vite Dev Server)...
start "GROOT Frontend - Vite Dev Server" cmd /k "cd /d "%~dp0groot-ai-system" && %PACKAGE_MANAGER% run dev"

echo.
echo ================================================================
echo GROOT AI System is starting up!
echo ================================================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Both services are running in separate command windows.
echo Close those windows to stop the services.
echo.
echo Opening frontend in browser in 5 seconds...
timeout /t 5 /nobreak >nul

REM Open frontend in default browser
start http://localhost:5173

echo.
echo System launched successfully!
echo You can close this window now.
pause
