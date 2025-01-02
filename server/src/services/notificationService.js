import Notifications from "../models/Notifications.js";

// Fetch notifications from the database
export const getNotifications = async (userId) => {
  return await Notifications.find({ userId }).sort({ timestamp: -1 });
};

// Create a new notification
export const createNotification = async (notificationData) => {
  return await Notifications.create(notificationData);
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
  try {
    const deletedNotification = await Notifications.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      throw new Error("Notification not found");
    }
    return deletedNotification;
  } catch (error) {
    throw new Error(`Error deleting notification: ${error.message}`);
  }
};
