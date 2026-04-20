const Task = require("../models/Task");
const { generateSummary, suggestPriority } = require("../services/aiService");

// @desc Create new task (WITH AI)
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const fullText = `${title} ${description || ""}`;

    let summary = "";
    let priority = "medium";

    // 🧠 Safe AI execution
    try {
      [summary, priority] = await Promise.all([
        generateSummary(fullText),
        suggestPriority(fullText),
      ]);

      summary = summary.trim();
      priority = priority.toLowerCase().replace(".", "").trim();
    } catch (err) {
      console.log("AI failed, fallback used:", err.message);
    }

    const task = new Task({
      title,
      description,
      summary,
      priority,
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update task
exports.updateTask = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🧠 Re-run AI if content changes
    if (req.body.title || req.body.description) {
      const fullText = `${req.body.title || task.title} ${
        req.body.description || task.description
      }`;

      try {
        const [summary, priority] = await Promise.all([
          generateSummary(fullText),
          suggestPriority(fullText),
        ]);

        req.body.summary = summary.trim();
        req.body.priority = priority.toLowerCase().replace(".", "").trim();
      } catch (err) {
        console.log("AI update failed:", err.message);
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
