const express = require("express");
const router = express.Router();

const { generateSummary, suggestPriority } = require("../services/aiService");

// 🧠 summarize task
router.post("/summary", async (req, res) => {
  try {
    const { text } = req.body;

    const summary = await generateSummary(text);

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🚦 priority suggestion
router.post("/priority", async (req, res) => {
  try {
    const { text } = req.body;

    const priority = await suggestPriority(text);

    res.json({ priority });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
