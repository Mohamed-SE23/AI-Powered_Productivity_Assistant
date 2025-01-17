"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TaskSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true
  },
  description: {
    type: String,
    default: "No description"
  },
  dueDate: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  completed: {
    type: String,
    default: "false"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },
  user: {
    type: _mongoose.default.Schema.ObjectId,
    ref: "User",
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save hook to update `lastModified` before saving
TaskSchema.pre("save", function (next) {
  this.lastModified = Date.now();
  next();
});
const TaskModel = _mongoose.default.model("Task", TaskSchema);
var _default = exports.default = TaskModel;