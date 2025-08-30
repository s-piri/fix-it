#!/bin/bash

echo "Starting Django development server..."

# Check if virtual environment exists
if [ ! -f "venv/bin/activate" ]; then
    echo "Error: Virtual environment not found!"
    echo "Please run install.sh first to set up the environment."
    exit 1
fi

# Check if Django project exists
if [ ! -f "backend/manage.py" ]; then
    echo "Error: Django project not found!"
    echo "Please create a Django project first with: django-admin startproject backend ."
    exit 1
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Starting Django development server..."
echo ""
echo "The server will be available at: http://127.0.0.1:8000/"
echo "Press Ctrl+C to stop the server."
echo ""

cd backend
python manage.py runserver
