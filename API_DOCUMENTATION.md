# Fix-It API Documentation

A comprehensive API for connecting customers with service providers for various home and automotive services.

## Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Provider Search](#provider-search)
- [Error Handling](#error-handling)
- [Setup Instructions](#setup-instructions)
- [Testing Examples](#testing-examples)

---

## Overview

The Fix-It API provides endpoints for user authentication and provider search functionality. It uses session-based authentication and supports multiple service types.

### Features
- ✅ User registration and authentication
- ✅ Provider search by service type and budget
- ✅ Session-based security
- ✅ CORS support for frontend integration
- ✅ Random provider selection for fair distribution

---

## Base URL

```
http://127.0.0.1:8000/api/
```

---

## Authentication

### Login User

**Endpoint:** `POST /users/login/`

**Description:** Authenticate a user and create a session.

**Request Body:**
```json
{
    "username": "client_john",
    "password": "password123"
}
```

**Response:**
```json
{
    "message": "Login successful",
    "user": {
        "id": 1,
        "username": "client_john",
        "email": "john.smith@email.com",
        "first_name": "John",
        "last_name": "Smith",
        "customer_id": "CUST001",
        "phone": "+1-555-0101",
        "address": "123 Main St, New York, NY 10001",
        "date_joined": "2025-08-30T20:30:00Z"
    }
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Invalid credentials or missing fields

---

### Register User

**Endpoint:** `POST /users/register/`

**Description:** Create a new user account and automatically log them in.

**Request Body:**
```json
{
    "username": "new_user",
    "password": "password123",
    "email": "new@example.com",
    "first_name": "New",
    "last_name": "User",
    "customer_id": "CUST011",
    "phone": "+1-555-0111",
    "address": "123 New St, City, State"
}
```

**Response:** Same as login response

**Status Codes:**
- `201` - Registration successful
- `400` - Username already exists or missing required fields

---

### Logout User

**Endpoint:** `POST /users/logout/`

**Description:** End the current user session.

**Headers:** `Authorization: Session <session_id>`

**Response:**
```json
{
    "message": "Logout successful"
}
```

**Status Codes:**
- `200` - Logout successful
- `401` - Not authenticated

---

### Get User Profile

**Endpoint:** `GET /users/profile/`

**Description:** Retrieve the current user's profile information.

**Headers:** `Authorization: Session <session_id>`

**Response:** Same as login response

**Status Codes:**
- `200` - Profile retrieved successfully
- `401` - Not authenticated

---

## Provider Search

### Search Providers

**Endpoint:** `GET /providers/search/`

**Description:** Find available providers based on service type and budget constraints.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_id` | string | Yes | Customer identifier |
| `job_type` | string | Yes | Type of service needed |
| `budget` | number | Yes | Customer's budget amount |

**Available Job Types:**
- `plumbing` - Plumbing services
- `electrical` - Electrical services
- `handyman` - General handyman services
- `mechanic` - Automotive services
- `locksmith` - Lock and key services
- `carpenter` - Carpentry services

**Example Request:**
```
GET /providers/search/?customer_id=CUST001&job_type=plumbing&budget=150
```

**Response:**
```json
{
    "customer_id": "CUST001",
    "job_type": "plumbing",
    "budget": 150.0,
    "provider": {
        "provider_id": "PROV001",
        "provider_name": "John Smith Plumbing",
        "eta": "30 minutes"
    }
}
```

**Status Codes:**
- `200` - Provider found
- `400` - Missing or invalid parameters
- `404` - No providers available for criteria

---

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
    "error": "Missing required parameters: customer_id, job_type, budget"
}
```

#### 401 Unauthorized
```json
{
    "detail": "Authentication credentials were not provided."
}
```

#### 404 Not Found
```json
{
    "error": "No available providers found for plumbing within your budget"
}
```

#### Validation Errors
```json
{
    "username": ["This field is required."],
    "password": ["This field is required."]
}
```

---

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Windows 10/11 or macOS/Linux

### Installation

#### Windows
```cmd
# 1. Install dependencies
install.bat

# 2. Setup database and mock data
setup_all_data.bat

# 3. Start development server
run.bat
```

#### macOS/Linux
```bash
# 1. Make scripts executable
chmod +x install.sh setup_all_data.sh run.sh

# 2. Install dependencies
./install.sh

# 3. Setup database and mock data
./setup_all_data.sh

# 4. Start development server
./run.sh
```

### Manual Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create and apply migrations
cd backend
python manage.py makemigrations
python manage.py migrate

# Populate mock data
python manage.py populate_providers
python manage.py populate_customers

# Start server
python manage.py runserver
```

---

## Testing Examples

### Using cURL

#### Login
```bash
curl -X POST http://127.0.0.1:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "client_john",
    "password": "password123"
  }'
```

#### Register
```bash
curl -X POST http://127.0.0.1:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "new_user",
    "password": "password123",
    "email": "new@example.com",
    "first_name": "New",
    "last_name": "User",
    "customer_id": "CUST011",
    "phone": "+1-555-0111",
    "address": "123 New St, City, State"
  }'
```

#### Search Provider
```bash
curl "http://127.0.0.1:8000/api/providers/search/?customer_id=CUST001&job_type=plumbing&budget=150"
```

#### Get Profile (after login)
```bash
curl -X GET http://127.0.0.1:8000/api/users/profile/ \
  -H "Cookie: sessionid=<your_session_id>"
```

#### Logout
```bash
curl -X POST http://127.0.0.1:8000/api/users/logout/ \
  -H "Cookie: sessionid=<your_session_id>"
```

### Using JavaScript/Fetch

#### Login
```javascript
const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'client_john',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data);
```

#### Search Provider
```javascript
const response = await fetch('http://127.0.0.1:8000/api/providers/search/?customer_id=CUST001&job_type=plumbing&budget=150');
const data = await response.json();
console.log(data);
```

---

## Mock Data

### Sample Users
The API comes with 10 pre-populated users:

| Username | Customer ID | Name | Email |
|----------|-------------|------|-------|
| client_john | CUST001 | John Smith | john.smith@email.com |
| client_sarah | CUST002 | Sarah Johnson | sarah.johnson@email.com |
| client_mike | CUST003 | Mike Davis | mike.davis@email.com |
| client_emily | CUST004 | Emily Wilson | emily.wilson@email.com |
| client_david | CUST005 | David Brown | david.brown@email.com |
| client_lisa | CUST006 | Lisa Garcia | lisa.garcia@email.com |
| client_robert | CUST007 | Robert Martinez | robert.martinez@email.com |
| client_jennifer | CUST008 | Jennifer Taylor | jennifer.taylor@email.com |
| client_michael | CUST009 | Michael Anderson | michael.anderson@email.com |
| client_amanda | CUST010 | Amanda Thomas | amanda.thomas@email.com |

**Password for all users:** `password123`

### Sample Providers
The API includes providers for all service types with varying hourly rates and ratings.

---

## Security Notes

- **Session-based authentication** - Uses Django's built-in session framework
- **Password hashing** - All passwords are securely hashed
- **CORS enabled** - Accepts requests from any origin (development only)
- **Input validation** - All inputs are validated and sanitized
- **CSRF protection** - Built-in CSRF protection for POST requests

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

---

## Support

For issues or questions:
1. Check the error responses for specific error messages
2. Verify all required parameters are provided
3. Ensure the server is running on the correct port
4. Check that mock data has been populated

---

*Last updated: August 30, 2025*
