import dotenv from "dotenv";
dotenv.config(); // 👈 sabse pehle

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SkillSync API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
