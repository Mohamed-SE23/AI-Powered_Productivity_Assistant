"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAiInsights = void 0;
var _openAiService = require("../../services/openAiService.js");
const generateAiInsights = async (req, res) => {
  try {
    const {
      tasks
    } = req.body;
    if (!tasks) {
      return res.status(400).json({
        error: "Tasks are required."
      });
    }
    const insights = await (0, _openAiService.generateInsights)(tasks);
    return res.status(200).json(insights);
  } catch (error) {
    if (error.response?.status === 429) {
      console.error("Quota exceeded. Check your OpenAI plan and billing.");
      return res.status(429).json({
        error: "Failed to generate AI insights."
      });
    } else {
      console.error("Error generating insights:", error.message);
      return res.status(500).json({
        error: "Failed to generate AI insights."
      });
    }
  }
};
exports.generateAiInsights = generateAiInsights;