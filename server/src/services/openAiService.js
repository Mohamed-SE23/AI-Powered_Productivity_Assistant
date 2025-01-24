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
  console.log('user id is :', userId);

  try {
    // Fetch tasks that are not completed and have not passed their due date
    const now = new Date();
    const currentDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tasks = await TaskModel.find(
      { 
        user: userId,
        completed: false,
        dueDate: { $gte: currentDate }  // Filter tasks with dueDate in the future or today
      },
      { title: 1, dueDate: 1, priority: 1, lastModified: 1 }
    ).lean();

    console.log('tasks :', tasks)
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
    The following are tasks that need attention, grouped by priority and urgency. 
    Please provide a concise, actionable summary, emphasizing tasks with the highest priority or the most immediate deadlines. 
    Focus on the most urgent tasks first, and briefly highlight the lower-priority tasks for the next few days.
  
    Tasks Summary:
    ${tasksSummary
      .map(
        (task, index) =>
          `${index + 1}. "${task.title}" | Due: ${task.dueDate} | Priority: ${task.priority}`
      )
      .join("\n")}
  
    Generate insights by:
    - Identifying the top 2-3 tasks requiring immediate action.
    - Highlighting key deadlines and priorities for today and the next few days.
    - Keeping the response brief, actionable, and clear.
    - Avoiding unnecessary repetition of the task details.
  
    Use clear, bullet-pointed insights or a short paragraph summary.
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
