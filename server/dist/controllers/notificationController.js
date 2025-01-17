"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllNotifications = exports.delNotification = void 0;
var _notificationService = require("../services/notificationService.js");
// Handle GET request for notifications
const getAllNotifications = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({
      error: "User ID is required"
    });
  }
  console.log("Fetching notifications for userId:", userId);
  try {
    const notifications = await (0, _notificationService.getNotifications)(userId);
    console.log("Notifications found:", notifications);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notifications"
    });
  }
};

// Handle delete notifications
exports.getAllNotifications = getAllNotifications;
const delNotification = async (req, res) => {
  const {
    id
  } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide notification id"
    });
  }
  try {
    const result = await (0, _notificationService.deleteNotification)(id);
    res.status(200).json({
      message: "Notification deleted successfully",
      result
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.delNotification = delNotification;