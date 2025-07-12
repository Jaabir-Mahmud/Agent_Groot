@echo off
title GROOT AI System - Stop Services
echo Stopping GROOT AI System services...

REM Kill processes running on common development ports
echo Stopping processes on port 5000 (Backend)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    if not "%%a"=="" (
        taskkill /pid %%a /f >nul 2>&1
        echo Backend process stopped.
    )
)

echo Stopping processes on port 5173 (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do (
    if not "%%a"=="" (
        taskkill /pid %%a /f >nul 2>&1
        echo Frontend process stopped.
    )
)

REM Kill any remaining node or python processes related to the project
echo Stopping any remaining GROOT processes...
taskkill /f /im "python.exe" /fi "WINDOWTITLE eq GROOT Backend*" >nul 2>&1
taskkill /f /im "node.exe" /fi "WINDOWTITLE eq GROOT Frontend*" >nul 2>&1

echo.
echo GROOT AI System services stopped.
pause
