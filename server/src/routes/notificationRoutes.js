import express from 'express';
import { delNotification, getAllNotifications } from "../controllers/notificationController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all notifications
router.get("/notifications", getAllNotifications);
router.delete("/notifications/:id", protect, delNotification);

export default router;
