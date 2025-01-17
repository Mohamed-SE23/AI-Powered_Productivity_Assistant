"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _dns = _interopRequireDefault(require("dns"));
var _redis = _interopRequireDefault(require("./config/redis.js"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _tasksRoutes = _interopRequireDefault(require("./routes/tasksRoutes.js"));
var _aiRoutes = _interopRequireDefault(require("./routes/aiRoutes.js"));
var _weatherRoutes = _interopRequireDefault(require("./routes/weatherRoutes.js"));
var _notificationRoutes = _interopRequireDefault(require("./routes/notificationRoutes.js"));
var _TaskModel = _interopRequireDefault(require("./models/tasks/TaskModel.js"));
var _User = _interopRequireDefault(require("./models/User.js"));
var _Notifications = _interopRequireDefault(require("./models/Notifications.js"));
var _notificationService = require("./services/notificationService.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
_dns.default.setServers(["8.8.8.8", "8.8.4.4"]); // Use Google's DNS

const app = (0, _express.default)();
const _dirname = _path.default.resolve();
app.use(_express.default.json()); // Parse JSON bodies
app.use(_bodyParser.default.json());
app.use('/uploads', _express.default.static(_path.default.join(_dirname, 'uploads')));

// Connect to MongoDB
_mongoose.default.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
}).then(() => {
  console.log('Connected to MongoDB');
  // Start watching the tasks collection for changes
  _TaskModel.default.watch().on("change", async change => {
    if (["insert", "update", "replace", "delete"].includes(change.operationType)) {
      await _redis.default.del("ai_insights");
      await _redis.default.del("tasks_last_modified");
      console.log("Cache cleared due to task modification.");
    }
  });
}).catch(err => console.error('MongoDB connection error:', err));

// Test Redis connection
_redis.default.connect().catch(console.error);

// Schedule task-based notifications
_nodeSchedule.default.scheduleJob("*/1 * * * *", async () => {
  console.log("Scheduled job executed at:", new Date());
  const now = new Date();
  const upcomingThreshold = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  try {
    // Fetch all users
    const users = await _User.default.find();
    for (const user of users) {
      // Fetch tasks that are incomplete and due soon
      const tasks = await _TaskModel.default.find({
        user: user._id,
        completed: "false",
        dueDate: {
          $gte: now - 24 * 60 * 60 * 1000,
          $lte: upcomingThreshold
        } // Filter for future tasks only
      });
      for (const task of tasks) {
        const message = `Task "${task.title}" is due on ${task.dueDate.toDateString()}. Priority: ${task.priority}.`;

        // Check if a similar notification already exists
        const existingNotification = await _Notifications.default.findOne({
          userId: user._id,
          type: "reminder",
          message
        });
        if (!existingNotification) {
          // Create notification if it doesn't exist
          const notification = {
            userId: user._id,
            type: "reminder",
            message,
            timestamp: now
          };
          await (0, _notificationService.createNotification)(notification);
        }
      }
    }
  } catch (error) {
    console.error("Error creating notifications for tasks:", error);
  }
});

// Routes
app.use('/api/v1', _authRoutes.default);
app.use('/api/v1', _tasksRoutes.default);
app.use('/api/v1', _aiRoutes.default);
app.use('/api/v1', _weatherRoutes.default);
app.use('/api/v1', _notificationRoutes.default);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));