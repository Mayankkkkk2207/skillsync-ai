import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 👇 THIS MUST COME BEFORE ROUTES
app.use(cors());
app.use(express.json()); // 🔥 MOST IMPORTANT LINE

connectDB();

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("SkillSync API running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
