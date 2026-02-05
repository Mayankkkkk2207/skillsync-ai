# SkillSync AI 🚀

SkillSync AI is a full-stack MERN application designed to help users track job applications, monitor progress, and later integrate AI-based career insights.  
This repository documents the development journey from **Day 1 to Day 7**, focusing on building a solid, production-ready foundation.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS v4
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

### Tools
- Git & GitHub
- Postman
- MongoDB Atlas
- Vercel (planned)
- Render (planned)

---

## 📁 Project Structure

skillsync-ai/
├── client/ # React frontend
└── server/ # Node + Express backend


---

## 📅 Development Progress

## ✅ Day 1 – Project Initialization & Backend Setup
- Initialized Node.js backend
- Installed core dependencies (express, mongoose, dotenv)
- Connected MongoDB Atlas cluster
- Created basic folder structure
- Verified server startup

---

## ✅ Day 2 – Database Models & Structure
- Created User model using Mongoose
- Designed schema with validations
- Tested MongoDB connection stability
- Prepared base for authentication system

---

## ✅ Day 3 – Authentication (Register & Login)
- Implemented user registration
- Password hashing using bcrypt
- Implemented login functionality
- JWT token generation on login
- Validated credentials with proper HTTP status codes

---

## ✅ Day 4 – Authorization & Middleware
- Created JWT authentication middleware
- Protected private routes
- Implemented user-specific access control
- Added authorization headers handling

---

## ✅ Day 5 – API Structuring & Job Routes
- API versioning using `/api/v1`
- Created Job routes and controllers
- Protected job-related endpoints
- Tested all routes using Postman
- Clean error handling and responses

---

## ✅ Day 6 – Frontend Setup
- Initialized React app using Vite
- Installed and configured Tailwind CSS v4
- Installed React Router DOM
- Setup Axios instance
- Resolved Tailwind v4 + Vite integration issues
- Fixed dependency and config conflicts

---

## ✅ Day 7 – Full Auth Flow & Dashboard Integration
- Implemented frontend authentication flow
- Login & Register pages connected to backend
- JWT token stored securely in localStorage
- Axios interceptor to attach token automatically
- Protected dashboard route using custom ProtectedRoute
- Connected dashboard to secured backend endpoint
- Debugged and resolved:
  - 404 route issues
  - API version mismatch
  - 401 invalid credentials
  - MongoDB data consistency
- Verified complete login → dashboard flow

---

## 🔐 Authentication Flow
1. User registers with hashed password
2. User logs in and receives JWT token
3. Token stored in browser
4. Axios interceptor attaches token to requests
5. Protected routes validate token before access

---

## ✅ Day 8 – Job Management & Dashboard UI

Day 8 focused on turning the application into a usable product by implementing job creation and job listing features with a real dashboard interface.

### Backend Enhancements
- Implemented job creation endpoint (`POST /api/v1/jobs`)
- Implemented job listing endpoint (`GET /api/v1/jobs`)
- Added job status support (`applied`, `interview`, `offer`, `rejected`)
- Implemented pagination and filtering support in job listing
- Added job statistics endpoint (`GET /api/v1/jobs/stats`)
- Ensured all job routes are protected using JWT middleware

### Frontend Enhancements
- Created **Add Job** page with form validation
- Connected job creation form to secured backend API
- Updated Dashboard to display user-specific job listings
- Implemented job list UI with role, company, and status
- Added navigation from dashboard to add-job page
- Handled paginated API response structure correctly

### Key Technical Learnings
- Handling paginated API responses on the frontend
- Aligning frontend state with backend response structure
- Debugging data shape mismatches (`jobs.map is not a function`)
- Building scalable CRUD-ready architecture

### Result
By the end of Day 8, users can securely:
- Add job applications
- View all their jobs on a dashboard
- See real-time data fetched from protected APIs

This marks the transition from a basic authenticated system to a functional job-tracking product.

---
## ✅ Day 9 – Edit & Delete Jobs (Full CRUD Completion)

Day 9 focused on completing the full CRUD lifecycle for job applications, with secure edit and delete functionality integrated into the dashboard.

### Backend Enhancements
- Added `GET /api/v1/jobs/:id` endpoint to fetch a single job by ID
- Ensured job access is user-scoped using JWT authentication
- Fixed route ordering issues to correctly handle dynamic job routes
- Reused existing `PUT /jobs/:id` and `DELETE /jobs/:id` endpoints for updates and removals

### Frontend Enhancements
- Implemented **Edit Job** functionality with dynamic routing (`/edit-job/:id`)
- Created Edit Job page with pre-filled form data
- Connected edit form to backend update API
- Implemented real-time delete functionality with UI state update
- Secured edit and delete actions using protected routes
- Resolved authentication redirect issues by aligning token storage and route guards

### Key Technical Learnings
- Importance of route order in Express for dynamic parameters
- Handling authenticated navigation in React Router
- Debugging protected route redirect loops
- Managing paginated and single-resource API responses
- Building complete CRUD flows in a production-style MERN app

### Result
By the end of Day 9, users can:
- Add job applications
- View all jobs in a dashboard
- Edit existing jobs
- Delete jobs securely
- Navigate seamlessly with authentication protection

This marks the completion of a **full-featured job tracking system** with real-world CRUD patterns and secure access control.

---


## ▶️ How to Run Locally

### Backend
```bash
cd server
npm install
npm run dev

👤 Author
Mayank Kumrawat
Full-Stack Developer (MERN)