@echo off
echo Setting up Django API with all mock data...

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo Error: Virtual environment not found!
    echo Please run install.bat first to set up the environment.
    pause
    exit /b 1
)

REM Check if backend directory exists
if not exist "backend\manage.py" (
    echo Error: Django project not found in backend directory!
    echo Please ensure the backend directory contains the Django project.
    pause
    exit /b 1
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Resetting database completely...
cd backend
if exist "db.sqlite3" (
    echo Removing existing database...
    del db.sqlite3
)

echo Creating and applying migrations...
python manage.py makemigrations providers
python manage.py makemigrations users
python manage.py migrate

echo Populating database with provider data...
python manage.py populate_providers

echo Populating database with client data...
python manage.py populate_customers

echo.
echo All data setup complete!
echo.
echo You can now test the API with:
echo http://127.0.0.1:8000/api/providers/search/?customer_id=CUST001&job_type=plumbing&budget=150
echo.
echo Run 'run.bat' to start the development server.
echo.
pause
