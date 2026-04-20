const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY,
});

// Summary
exports.generateSummary = async (taskText) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
Return ONLY a short one-line summary.
No explanation. No bullet points.

Task: ${taskText}
    `,
  });

  return response.text;
};

// Priority
exports.suggestPriority = async (taskText) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
Return ONLY one word:
low, medium, or high.

No explanation. No reasoning.

Task: ${taskText}
    `,
  });

  return response.text.toLowerCase().trim();
};
