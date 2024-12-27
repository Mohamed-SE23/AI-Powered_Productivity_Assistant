import { generateInsights } from "../../services/openAiService.js";

export const generateAiInsights = async (req, res) => {
  const { tasks } = req.body;
  const insights = await generateInsights(tasks);
  res.json(insights);
};
