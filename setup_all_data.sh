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

echo "Setting up database..."
cd backend

# Remove database if it exists
if [ -f "db.sqlite3" ]; then
    echo "Removing existing database..."
    rm db.sqlite3
else
    echo "No existing database found, creating fresh one..."
fi

echo "Applying migrations..."
python manage.py migrate
if [ $? -ne 0 ]; then
    echo "Error: Failed to apply migrations"
    exit 1
fi

echo "Populating database with provider data..."
python manage.py populate_providers
if [ $? -ne 0 ]; then
    echo "Error: Failed to populate providers"
    exit 1
fi

echo "Populating database with client data..."
python manage.py populate_customers
if [ $? -ne 0 ]; then
    echo "Error: Failed to populate customers"
    exit 1
fi

echo ""
echo "All data setup complete!"
echo ""
echo "You can now test the API with:"
echo "http://127.0.0.1:8000/api/providers/search/?customer_id=CUST001&job_type=plumbing&budget=150"
echo ""
echo "Run './run.sh' to start the development server."
echo ""
