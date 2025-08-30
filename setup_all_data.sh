#!/bin/bash

echo "Setting up Django API with all mock data..."

# Check if virtual environment exists
if [ ! -f "venv/bin/activate" ]; then
    echo "Error: Virtual environment not found!"
    echo "Please run install.sh first to set up the environment."
    exit 1
fi

# Check if backend directory exists
if [ ! -f "backend/manage.py" ]; then
    echo "Error: Django project not found in backend directory!"
    echo "Please ensure the backend directory contains the Django project."
    exit 1
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Creating and applying migrations..."
cd backend
python manage.py makemigrations providers
python manage.py makemigrations users
python manage.py migrate

echo "Clearing existing data..."
python manage.py flush --noinput

echo "Populating database with provider data..."
python manage.py populate_providers

echo "Populating database with client data..."
python manage.py populate_customers

echo ""
echo "All data setup complete!"
echo ""
echo "You can now test the API with:"
echo "http://127.0.0.1:8000/api/providers/search/?customer_id=CUST001&job_type=plumbing&budget=150"
echo ""
echo "Run './run.sh' to start the development server."
echo ""
