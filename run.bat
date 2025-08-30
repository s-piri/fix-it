@echo off
echo Starting Django development server...

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo Error: Virtual environment not found!
    echo Please run install.bat first to set up the environment.
    pause
    exit /b 1
)

REM Check if Django project exists
if not exist "backend\manage.py" (
    echo Error: Django project not found!
    echo Please create a Django project first with: django-admin startproject backend .
    pause
    exit /b 1
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Starting Django development server...
echo.
echo The server will be available at: http://127.0.0.1:8000/
echo Press Ctrl+C to stop the server.
echo.

cd backend
python manage.py runserver

pause
