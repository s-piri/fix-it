# Fix-it

> On-demand home service platform fast, reliable, verified. Solve urgent household problems instantly while providing steady, fairly paid work for independent professionals.

## Project Overview

Fix-it is an on-demand home services platform that connects households with verified tradespeople in real time. When essential home services break down a shower in the middle of the night. A washing machine minutes before you need a clean outfit. Or the internet cutting out before a game night people need help immidiately. Fix-it is designed to deliver immediate matches. Such as live ETAs, transparent pricing, and trusted pros. Also, giving independent professionals steady, high-quality short jobs.

## Why we built this (Motivation)

* **Time-sensitive needs:** Many household problems are urgent. Waiting until the next day is not an acceptable solution.
* **Supply-demand mismatch:** Existing marketplaces often rely on scheduled bookings or bid-based matching that cause delays and inefficient allocation of work.
* **Fairer work for gig workers:** Provide independent professionals with higher-frequency, fairly paid on-demand jobs and reduce idle time and undercutting.
* **Trust and quality:** Improve trust and reduce disputes with verified certification, rating systems, and real-time tracking.
* **Urban resilience:** As city life intensifies, on-demand services improve residents’ quality of life and unlock local economic opportunities.

## What we built (Core features)

* **Instant matching:** When a user requests a service, the system finds nearby available pros and confirms a booking immediately.
* **Real-time ETA & location tracking:** After a pro accepts, users see the pro’s live location and estimated time of arrival.
* **Transparent pricing:** Price estimates are shown before booking; supports flat fees and time or distance-based pricing.
* **Multiple service categories:** Supports handyman, plumber, electrician, locksmith, mechanic, cleaner, and similar trades.
* **Two-way rating system:** After each job both user and pro rate each other on a five-star scale to maintain quality and platform health.
* **Pro verification & profiles:** Pros can upload licenses and certifications; platform supports background and credential checks placeholder integration.
* **Instant communication & notifications:** Order updates, in-app chat or call for coordination.

## User flow (high-level)

1. User opens the app, selects a service category, fills a brief description and address.
2. The app shows a price estimate and sends the request.
3. Nearby available pros receive the request, one accepts and the order is confirmed.
4. The pro is en route; the user sees real-time tracking and location.
5. The pro completes the job, payment and two-way rating follow.

## Technical Implementation (current codebase)

* **Frontend (Mobile / Web)**

  * Service request UI: forms, price estimate display, confirmation flow.
  * Real-time tracking: map view, order status bar.
  * Rating.

* **Backend**

  * RESTful API / WebSocket endpoints for order creation, match notifications, and real-time location updates.
  * Matching service: filters by proximity and availability, and pushes requests to nearby pros.
  * Pricing module: supports base rates(extensible), per-minute or per-km(extensible), and dynamic pricing logic (extensible).
  * Identity & credential verification (placeholder endpoints).

* **Database**

  * Key tables: Users (customers & pros), Services, Orders, Ratings, Availability, Locations tracking.

* **Key components implemented**

  * Real-time matching logic (backend)
  * ETA calculation and live location updates via WebSocket/Socket.IO
  * Order state machine: `pending → accepted → enroute → onsite → completed → closed`

## Current limitations & future work

* **Scheduling & dispatching algorithm:** Currently a proximity-based matching; future improvements include skill matching, reliability and acceptance weighting, and advanced dynamic pricing.
* **Verification pipeline:** background checks are placeholders and integrate third-party verification or manual review.
* **Insurance & compliance:** No integrated insurance; partner with insurers to reduce platform risk for certain jobs.
* **Expanded services:** Add scheduled bookings, subscription or maintenance plans, warranty and after service support.


## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- Windows 10/11

## Quick Start

### Backend (Django)

1. **Install dependencies:**
   ```cmd
   install.bat
   ```

2. **Setup API and populate the database with mock data:**
   ```cmd
   setup_all_data.bat
   ```

3. **Run the Django server:**
   ```cmd
   python manage.py runserver
   ```

4. **Test API endpoints in your browser:**
   ```
   http://127.0.0.1:8000/api/providers/search/?customer_id=123&job_type=mechanic&budget=200
   http://127.0.0.1:8000/api/providers/search/?customer_id=456&job_type=locksmith&budget=150
   http://127.0.0.1:8000/api/providers/search/?customer_id=789&job_type=carpenter&budget=180
   ```

### Frontend (React Native)

1. **Navigate to the frontend directory:**
   ```cmd
   cd frontend
   ```

2. **Install dependencies:**
   ```cmd
   npm install
   ```

3. **Start the development server:**
   ```cmd
   npx expo start
   ```
   Or for web:
   ```cmd
   npm start
   ```

## Contact

For questions or collaboration, contact the project maintainers (email or team contacts should be listed in the repo).

 - abc12345@uni.sydney.edu.au

Thanks for using Fix-it — connecting the right people, at the right time, with the right tools makes city life smoother and creates fair, sustainable opportunities for independent pros.
