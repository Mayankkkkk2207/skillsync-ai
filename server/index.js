import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// ROUTES (VERY IMPORTANT)
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";


const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DB
connectDB();

// ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/analytics", analyticsRoutes);


// TEST ROUTE (keep for sanity)
app.get("/__test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
