import { generateInsights } from "../../services/openAiService.js";

export const generateAiInsights = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user information from middleware (e.g., JWT auth)
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const insights = await generateInsights(userId);
    return res.status(200).json({ insights });
  } catch (error) {
    if (error.response?.status === 429) {
      console.error("Quota exceeded. Check your OpenAI plan and billing.");
      return res.status(429).json({ error: "Failed to generate AI insights." });
    } else {
      console.error("Error generating insights:", error.message);
      return res.status(500).json({ error: "Failed to generate AI insights." });
    }
  }
};
