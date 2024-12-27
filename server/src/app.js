import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import redisClient from './config/redis.js';
import authRoutes from './routes/authRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test Redis connection
redisClient.connect().catch(console.error);

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', tasksRoutes);
app.use('/api/v1', aiRoutes);
app.use('/api/v1', weatherRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
