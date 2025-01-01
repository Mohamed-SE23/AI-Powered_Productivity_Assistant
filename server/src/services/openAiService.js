// import axios from "axios";

// export const generateInsights = async (tasks) => {
//   const HugApi = process.env.HugApi;
//   const modelEndpoint = "https://api-inference.huggingface.co/models/google/flan-t5-small";

//   // Format tasks for the prompt
//   const tasksSummary = tasks.map(task => ({
//     title: task.title,
//     dueDate: task.dueDate,
//     priority: task.priority,
//   }));

//   // Prepare the prompt
//   const prompt = `
//     Here are some tasks:
//     ${tasksSummary.map(task => 
//       `- Title: ${task.title}, Due Date: ${task.dueDate}, Priority: ${task.priority}`
//     ).join("\n")}
//     Please analyze and summarize the key priorities and any urgent deadlines.
//   `;

//   try {
//     const response = await axios.post(
//       modelEndpoint,
//       { inputs: prompt },
//       { headers: { Authorization: `Bearer ${HugApi}` }, timeout: 60000 }
//     );

//     console.log(response.data)
//     const generatedText = response.data[0]?.generated_text?.trim();

//     if (generatedText) {
//       return generatedText;
//     } else {
//       return "No meaningful insights could be generated.";
//     }
//   } catch (error) {
//     const errorData = error.response?.data || error.message;
//     console.error("Error generating insights:", errorData);
//     throw new Error("Failed to generate insights.");
//   }
// };


import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateInsights = async (tasks) => {
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

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 150, // Limit tokens for concise responses
    });

    console.log(response.choices[0]);
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating insights:", error);
    throw new Error("Failed to generate insights.");
  }
};
