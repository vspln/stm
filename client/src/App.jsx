import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { getTasks, deleteTask, updateTask } from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleUpdate = async (id, data) => {
    await updateTask(id, data);
    loadTasks();
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  return (
    <div style={{ padding: 20 }}>
      <p>Smart Task Manager</p>

      <TaskForm onTaskAdded={handleTaskAdded} />

      <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}
