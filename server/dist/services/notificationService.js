"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotifications = exports.deleteNotification = exports.createNotification = void 0;
var _Notifications = _interopRequireDefault(require("../models/Notifications.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Fetch notifications from the database
const getNotifications = async userId => {
  return await _Notifications.default.find({
    userId
  }).sort({
    timestamp: -1
  });
};

// Create a new notification
exports.getNotifications = getNotifications;
const createNotification = async notificationData => {
  return await _Notifications.default.create(notificationData);
};

// Delete a notification
exports.createNotification = createNotification;
const deleteNotification = async notificationId => {
  try {
    const deletedNotification = await _Notifications.default.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      throw new Error("Notification not found");
    }
    return deletedNotification;
  } catch (error) {
    throw new Error(`Error deleting notification: ${error.message}`);
  }
};
exports.deleteNotification = deleteNotification;