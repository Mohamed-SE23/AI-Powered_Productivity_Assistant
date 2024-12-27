import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: "process.env.OPENAI_API_KEY" });
console.log(process.env.OPENAI_API_KEY);

export const generateInsights = async (tasks) => {
  const prompt = `Given these tasks: ${JSON.stringify(tasks)}, provide insights.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use "gpt-4" or "gpt-3.5-turbo" as appropriate
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating insights:");
    throw new Error("Failed to generate insights.");
  }
};
