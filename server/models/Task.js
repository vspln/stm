const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },

    // AI-related fields
    summary: {
      type: String,
    },
    priority: {
      type: String, // "low", "medium", "high"
      default: "medium",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
