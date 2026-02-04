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

## ▶️ How to Run Locally

### Backend
```bash
cd server
npm install
npm run dev

👤 Author
Mayank Kumrawat
Full-Stack Developer (MERN)