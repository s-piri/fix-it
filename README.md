# Django Web Application

A Django web application with a complete development environment setup for Windows.

## Prerequisites

- Python 3.8 or higher
- Windows 10/11

## Quick Start

1. **Run the installation script:**
   ```cmd
   install.bat
   ```

2. **Activate the virtual environment:**
   ```cmd
   venv\Scripts\activate.bat
   ```

3. **Create a new Django project:**
   ```cmd
   django-admin startproject myproject .
   ```

4. **Run migrations:**
   ```cmd
   python manage.py migrate
   ```

5. **Create a superuser (optional):**
   ```cmd
   python manage.py createsuperuser
   ```

6. **Start the development server:**
   ```cmd
   python manage.py runserver
   ```

7. **Open your browser and go to:**
   ```
   http://127.0.0.1:8000/
   ```

## Project Structure

```
fix-it/
├── requirements.txt      # Python dependencies
├── install.bat          # Windows setup script
├── venv/                # Virtual environment (created by install.bat)
├── myproject/           # Django project (created by django-admin)
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py            # Django management script
```

## Included Dependencies

- **Django 5.0.2**: The web framework
- **Django REST Framework**: For building APIs
- **Django CORS Headers**: For handling cross-origin requests
- **Python Decouple**: For environment variable management
- **Pillow**: For image processing
- **psycopg2-binary**: PostgreSQL adapter
- **WhiteNoise**: For serving static files
- **Gunicorn**: WSGI server for production

## Development Commands

- **Create a new app:**
  ```cmd
  python manage.py startapp myapp
  ```

- **Make migrations:**
  ```cmd
  python manage.py makemigrations
  ```

- **Apply migrations:**
  ```cmd
  python manage.py migrate
  ```

- **Collect static files:**
  ```cmd
  python manage.py collectstatic
  ```

## Troubleshooting

If you encounter any issues:

1. Make sure Python is installed and in your PATH
2. Ensure you're running the commands from the project directory
3. Activate the virtual environment before running Django commands
4. Check that all dependencies are installed correctly

## Next Steps

After setting up your Django project, you can:

1. Create models in your apps
2. Set up URL routing
3. Create views and templates
4. Configure your database settings
5. Add authentication and permissions
6. Deploy to production

For more information, visit the [Django documentation](https://docs.djangoproject.com/).