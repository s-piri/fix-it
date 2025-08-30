@echo off
echo Setting up Django development environment...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Check if pip is available
pip --version >nul 2>&1
if errorlevel 1 (
    echo Error: pip is not available
    echo Please ensure pip is installed with Python
    pause
    exit /b 1
)

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing requirements...
pip install -r requirements.txt

echo.
echo Django environment setup complete!
echo.
echo To activate the virtual environment in the future, run:
echo venv\Scripts\activate.bat
echo.
echo To setup the database and populate mock data, run:
echo setup_all_data.bat
echo.
echo To start the development server, run:
echo run.bat
echo.
echo Or manually:
echo cd backend
echo python manage.py runserver
echo.
pause
