import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import schedule from 'node-schedule';
import bodyParser from 'body-parser';
import path from 'path';
import dns from 'dns';
import redisClient from './config/redis.js';
import authRoutes from './routes/authRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import TaskModel from './models/tasks/TaskModel.js';
import User from './models/User.js';
import Notifications from './models/Notifications.js';
import { createNotification } from './services/notificationService.js';

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Use Google's DNS

const app = express();
const __dirname = path.resolve();

app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
      // Start watching the tasks collection for changes
      TaskModel.watch().on("change", async (change) => {
        if (["insert", "update", "replace", "delete"].includes(change.operationType)) {
          await redisClient.del("ai_insights");
          await redisClient.del("tasks_last_modified");
          console.log("Cache cleared due to task modification.");
        }
      });
    })
  .catch((err) => console.error('MongoDB connection error:', err));

// Test Redis connection
redisClient.connect().catch(console.error);

// Schedule task-based notifications
schedule.scheduleJob("*/1 * * * *", async () => {
  console.log("Scheduled job executed at:", new Date());
  const now = new Date();
  const upcomingThreshold = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  try {
    // Fetch all users
    const users = await User.find();

    for (const user of users) {
      // Fetch tasks that are incomplete and due soon
      const tasks = await TaskModel.find({
        user: user._id,
        completed: "false",
        dueDate: { $gte: now - 24 * 60 * 60 * 1000, $lte: upcomingThreshold }, // Filter for future tasks only
      });

      for (const task of tasks) {
        const message = `Task "${task.title}" is due on ${task.dueDate.toDateString()}. Priority: ${task.priority}.`;

        // Check if a similar notification already exists
        const existingNotification = await Notifications.findOne({
          userId: user._id,
          type: "reminder",
          message,
        });

        if (!existingNotification) {
          // Create notification if it doesn't exist
          const notification = {
            userId: user._id,
            type: "reminder",
            message,
            timestamp: now,
          };

          await createNotification(notification);
        }
      }
    }
  } catch (error) {
    console.error("Error creating notifications for tasks:", error);
  }
});


// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', tasksRoutes);
app.use('/api/v1', aiRoutes);
app.use('/api/v1', weatherRoutes);
app.use('/api/v1', notificationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
