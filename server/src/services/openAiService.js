import dotenv from "dotenv";
dotenv.config();

import { OpenAI } from "openai";
import redisClient from "../config/redis.js";
import TaskModel from "../models/tasks/TaskModel.js"; // Import your Mongoose Task model

const openaiAPI = process.env.OPENAI;
const openai = new OpenAI({ apiKey: openaiAPI });

export const generateInsights = async () => {
  const cacheKey = "ai_insights";
  const lastModifiedKey = "tasks_last_modified";

  try {
    // Fetch tasks and the latest `lastModified` timestamp from MongoDB
    const tasks = await TaskModel.find({}, { title: 1, dueDate: 1, priority: 1, lastModified: 1 }).lean();
    const latestModified = tasks.reduce((max, task) => (task.lastModified > max ? task.lastModified : max), new Date(0));

    // Retrieve last modified timestamp from Redis
    const cachedLastModified = await redisClient.get(lastModifiedKey);

    // Check if tasks have changed
    if (cachedLastModified === latestModified.toISOString()) {
      const cachedInsight = await redisClient.get(cacheKey);
      if (cachedInsight) {
        console.log("Returning cached insight.");
        return JSON.parse(cachedInsight); // Return cached insight
      }
    }

    // Format tasks for the prompt
    const tasksSummary = tasks.map(task => ({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
    }));

    // Prepare a concise-focused prompt
    const prompt = `
      Here are some tasks:
      ${tasksSummary.map(task =>
        `- Title: ${task.title}, Due Date: ${task.dueDate}, Priority: ${task.priority}`
      ).join("\n")}
      Provide a concise summary focusing on key priorities and urgent deadlines. Avoid listing all tasks, and highlight only the most critical information.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const insight = response.choices[0].message.content.trim();

    // Store the new insight and last modified timestamp in Redis
    await redisClient.set(cacheKey, JSON.stringify(insight), { EX: 3600 });
    await redisClient.set(lastModifiedKey, latestModified.toISOString());

    console.log("Generated and cached new insight.");
    return insight;
  } catch (error) {
    console.error("Error generating insights:", error);
    throw new Error("Failed to generate insights.");
  }
};
