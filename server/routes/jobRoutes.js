import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobStats,
  getJobById,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/stats", protect, getJobStats);

router.route("/")
  .post(protect, createJob)
  .get(protect, getJobs);

router.get("/:id", protect, getJobById);

router.route("/:id")
  .put(protect, updateJob)
  .delete(protect, deleteJob);

export default router;
