export default function TaskItem({ task, onDelete, onUpdate }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  const formatPriority = (priority) => {
    if (!priority) return "Unknown";
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        margin: 10,
        padding: 15,
        borderRadius: 8,
      }}
    >
      <h3>{task.title}</h3>

      <p>{task.description || "No description"}</p>

      {task.summary && (
        <p style={{ fontStyle: "italic", color: "#555" }}>🧠 {task.summary}</p>
      )}

      <p>
        Priority:{" "}
        <span
          style={{
            color: getPriorityColor(task.priority),
            fontWeight: "bold",
          }}
        >
          {formatPriority(task.priority)}
        </span>
      </p>

      <p>Status: {task.completed ? "✅ Done" : "⏳ Pending"}</p>

      <button
        style={{ marginRight: 10 }}
        onClick={() => onUpdate(task._id, { completed: !task.completed })}
      >
        Toggle
      </button>

      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}
