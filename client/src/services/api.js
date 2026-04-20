const BASE_URL = "http://localhost:5000/api/tasks";

// Get all tasks
export const getTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// Create task
export const createTask = async (task) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

// Update task
export const updateTask = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Delete task
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
