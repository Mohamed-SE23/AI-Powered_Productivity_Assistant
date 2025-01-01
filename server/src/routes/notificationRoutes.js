import express from 'express';
import { getAllNotifications } from "../controllers/notificationController.js";

const router = express.Router();

// GET all notifications
router.get("/notifications", getAllNotifications);

export default router;
