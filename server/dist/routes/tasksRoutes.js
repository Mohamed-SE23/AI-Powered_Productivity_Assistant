"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _taskController = require("../controllers/tasks/taskController.js");
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/task/create", _authMiddleware.protect, _taskController.createTaskHandler);
router.get("/tasks", _taskController.getTasks);
router.get("/task/:id", _authMiddleware.protect, _taskController.getTask);
router.patch("/task/:id", _authMiddleware.protect, _taskController.updateTask);
router.delete("/task/:id", _authMiddleware.protect, _taskController.deleteTask);
var _default = exports.default = router;