import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <div style={{ marginTop: 20 }}>
      <p>Tasks</p>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
