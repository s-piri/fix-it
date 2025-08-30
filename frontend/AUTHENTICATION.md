# Authentication Flow

## Overview
This demo implements a simple authentication flow where the login page is the first page users see if they haven't logged in yet.

## How It Works

### 1. App Startup
- App checks if user is logged in (stored in localStorage)
- If not logged in → Shows login page
- If logged in → Shows main app (HomeScreen)

### 2. Login Process
- User enters username/password
- App calls Django API to authenticate
- On successful login, user data is stored in localStorage
- App automatically switches to main app screens

### 3. Logout Process
- User clicks "Logout" button in navigation
- Confirmation dialog appears
- On confirmation:
  - User data is removed from localStorage
  - App state is updated to show login page
  - No page reload needed (clean state transition)

## Implementation Details

### App.tsx
- Uses conditional rendering based on `isAuthenticated` state
- Checks localStorage on app start
- Provides `handleLogin` callback to login page
- Provides `handleLogout` callback to HomeScreen
- Manages authentication state centrally

### Login Page
- Calls Django API for authentication
- On success, stores user data in localStorage
- Calls `onLogin` callback with user data
- Forces app reload to ensure state updates

### HomeScreen
- Shows logout button instead of sign in
- Logout calls `onLogout` callback from App.tsx
- Clean state transition without page reload

## Demo Credentials
Use any of these test accounts:
- Username: `client_john`, Password: `password123`
- Username: `client_sarah`, Password: `password123`
- Username: `client_mike`, Password: `password123`

## Simple & Clean
- No complex state management
- Uses localStorage for persistence
- Automatic redirects
- Clean logout without page reload
- Perfect for demo purposes
