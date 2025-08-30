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

2. **Setup API and populate db with mock data:**
   ```cmd
   setup_api.bat
   ```

3. **Run the server:**
   ```
   http://127.0.0.1:8000/
   ```

4. **Open your browser and go to below to test some responses:**
   ```
   http://127.0.0.1:8000/api/providers/search/?customer_id=123&job_type=mechanic&budget=200
   http://127.0.0.1:8000/api/providers/search/?customer_id=456&job_type=locksmith&budget=150
   http://127.0.0.1:8000/api/providers/search/?customer_id=789&job_type=carpenter&budget=180
   ```

## Features

- Provider search API with filtering by job type and budget
- User authentication and registration
- Session-based security
- CORS support for frontend integration
- Random provider selection for fair distribution
- Provider profile pictures support

## Profile Pictures

Providers can have profile pictures uploaded to enhance the user experience. The images are stored in the `media/provider_photos/` directory and served via the `/media/` endpoint.

To upload a profile picture for a provider:
```bash
python manage.py upload_provider_photo PROV001 /path/to/image.jpg
```

For more information, visit the [Django documentation](https://docs.djangoproject.com/).