#!/bin/bash

echo "Setting up Django API..."

# Check if virtual environment exists
if [ ! -f "venv/bin/activate" ]; then
    echo "Error: Virtual environment not found!"
    echo "Please run install.sh first to set up the environment."
    exit 1
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Creating and applying migrations..."
cd backend
python manage.py makemigrations providers
python manage.py migrate

echo "Populating database with mock data..."
python manage.py populate_providers

echo ""
echo "API setup complete!"
echo ""
echo "You can now test the API with:"
echo "http://127.0.0.1:8000/api/providers/search/?customer_id=123&job_type=plumbing&budget=150"
echo ""
echo "Run './run.sh' to start the development server."
echo ""
