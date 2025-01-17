"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _notificationController = require("../controllers/notificationController.js");
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// GET all notifications
router.get("/notifications", _notificationController.getAllNotifications);
router.delete("/notifications/:id", _authMiddleware.protect, _notificationController.delNotification);
var _default = exports.default = router;