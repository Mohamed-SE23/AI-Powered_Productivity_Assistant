import express from 'express';
import { generateAiInsights } from "../controllers/ai/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/ai-assistant", protect, generateAiInsights);

export default router;
