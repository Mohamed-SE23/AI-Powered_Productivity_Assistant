"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTask = void 0;
var _TaskModel = _interopRequireDefault(require("../../models/tasks/TaskModel.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// ----------------- Create Task Service ----------------------
const createTask = async taskData => {
  const task = new _TaskModel.default(taskData);
  return await task.save();
};
exports.createTask = createTask;