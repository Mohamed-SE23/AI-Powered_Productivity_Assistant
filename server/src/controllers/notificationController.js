import { getNotifications } from "../services/notificationService.js";
import { deleteNotification } from "../services/notificationService.js";

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

  // Handle delete notifications
  export const delNotification = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please provide notification id" });
    }

    try {
      const result = await deleteNotification(id);
      res.status(200).json({ message: "Notification deleted successfully", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
