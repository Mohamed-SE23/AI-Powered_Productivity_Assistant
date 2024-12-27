import express from 'express';
import { generateAiInsights } from "../controllers/ai/aiController.js";
const router = express.Router();

router.post("/ai-assistant", generateAiInsights);

export default router;
