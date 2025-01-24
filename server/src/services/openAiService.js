import dotenv from "dotenv";
dotenv.config();

import { OpenAI } from "openai";
import redisClient from "../config/redis.js";
import TaskModel from "../models/tasks/TaskModel.js"; // Import your Mongoose Task model

const openaiAPI = process.env.OPENAI;
const openai = new OpenAI({ apiKey: openaiAPI });

export const generateInsights = async (userId) => {
  const cacheKey = `ai_insights_${userId}`; // Cache key specific to the user
  const lastModifiedKey = `tasks_last_modified_${userId}`; // Cache key for user's tasks

  try {
    // Fetch tasks that are not completed and have not passed their due date
    const now = new Date();
    const currentDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tasks = await TaskModel.find(
      { 
        userId,
        completed: false, 
        dueDate: { $gte: currentDate }  // Filter tasks with dueDate in the future or today
      },
      { title: 1, dueDate: 1, priority: 1, lastModified: 1 }
    ).lean();

    // If no tasks are found, return a friendly message
    if (tasks.length === 0) {
      return "No tasks scheduled for today. Take a break and relax!";
    }

    const latestModified = tasks.reduce(
      (max, task) => (task.lastModified > max ? task.lastModified : max),
      new Date(0)
    );

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
    const tasksSummary = tasks.map((task) => ({
      title: task.title,
      dueDate: task.dueDate.toISOString(), // Ensure date format is compatible
      priority: task.priority,
    }));

    // Enhanced prompt for better AI insights
    const prompt = `
      Here are some tasks that need attention:
      ${tasksSummary
        .map(
          (task) =>
            `- Title: "${task.title}", Due Date: ${task.dueDate}, Priority: ${task.priority}`
        )
        .join("\n")}
      Focus on providing a concise summary. Highlight from the most urgent tasks and their deadlines and then the lower urgent tasks. 
      Emphasize tasks that require immediate attention, such as those with high priority or those with upcoming deadlines. 
      Avoid listing completed or past due tasks, and focus on actionable tasks for today and the next few days.
      Keep the response brief, actionable, and clear.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 150, // Limit tokens for concise responses
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
