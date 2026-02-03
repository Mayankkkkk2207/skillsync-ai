# SkillSync AI 🚀

SkillSync AI is a SaaS-style MERN application designed to help users track job applications and gain structured career insights.

---

## 🔧 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Postman (API testing)

---

## ✅ Features Implemented (Week 1)

### 🔐 Authentication & Authorization (Day 3)
- User registration and login APIs
- Password hashing using bcrypt
- JWT token generation on login
- JWT-based authentication middleware
- Protected routes using Bearer token
- Authenticated user context via `req.user`

---

### 💼 Job Management (Day 4)
- Job schema with user ownership
- Create, read, update, delete (CRUD) job APIs
- Job status tracking (applied, interview, offer, rejected)
- User-specific job isolation
- JWT-protected job routes

---

### 📊 Dashboard & API Enhancements (Day 5)
- Job filtering by status
- Pagination support for job listings
- Dashboard statistics API using MongoDB aggregation
- Job count by status for authenticated users
- Clean and structured API responses

---

## 📁 Project Structure
skillsync-ai/
├── server/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.js
└── client/ (coming soon)


---

## 🚀 Running the Project Locally

### Clone the repository
```bash
git clone <your-repo-url>
cd skillsync-ai/server

npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm run dev

http://localhost:5000

🧪 API Testing

APIs tested using Postman

Authorization via Authorization: Bearer <token>

📌 Upcoming Features

Frontend dashboard using React and Tailwind CSS

Job analytics and visual charts

AI-based resume and job description matching

Cloud deployment (Render and Vercel)

👨‍💻 Author

Mayank Kumrawat
Backend-focused MERN Developer