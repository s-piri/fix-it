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

For more information, visit the [Django documentation](https://docs.djangoproject.com/).