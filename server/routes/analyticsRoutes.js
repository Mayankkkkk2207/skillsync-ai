import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getAnalyticsSummary } from "../controllers/analyticsController.js";
import { getApplicationTimeline } from "../controllers/analyticsController.js";
import { getRolePerformance } from "../controllers/analyticsController.js";
import { getRoleScore } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/summary", protect, getAnalyticsSummary);
router.get("/timeline", protect, getApplicationTimeline);
router.get("/roles", protect, getRolePerformance);
router.get("/score", protect, getRoleScore);
export default router;
