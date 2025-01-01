import { getNotifications } from "../services/notificationService.js";

// Handle GET request for notifications
export const getAllNotifications = async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      console.log("Fetching notifications for userId:", userId);
    try {
      const notifications = await getNotifications(userId);
      console.log("Notifications found:", notifications);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  };
