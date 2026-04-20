import { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return alert("Title is required");

    setLoading(true);

    try {
      const newTask = await createTask({ title, description });
      onTaskAdded(newTask);

      setTitle("");
      setDescription("");
    } catch (err) {
      alert("Error creating task");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>Create Task</h2>

      <input
        style={{ display: "block", marginBottom: 10, width: "100%" }}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={{ display: "block", marginBottom: 10, width: "100%" }}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "AI Thinking..." : "Add Task"}
      </button>
    </form>
  );
}
