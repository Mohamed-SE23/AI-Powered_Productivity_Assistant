import Notifications from "../models/Notifications.js";

// Fetch notifications from the database
export const getNotifications = async (userId) => {
  return await Notifications.find({ userId }).sort({ timestamp: -1 });
};

// Create a new notification
export const createNotification = async (notificationData) => {
  return await Notifications.create(notificationData);
};
