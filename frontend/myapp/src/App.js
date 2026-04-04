import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const backendURL = "http://127.0.0.1:5000";

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendURL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    const res = await axios.post(`${backendURL}/tasks`, {
      title: newTaskTitle,
    });

    setTasks([...tasks, res.data]);
    setNewTaskTitle("");
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${backendURL}/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  // Toggle completion
  const toggleCompletion = async (task) => {
    const res = await axios.put(`${backendURL}/tasks/${task._id}`, {
      completed: !task.completed,
    });

    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
  };

  // Start editing
  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditingTitle(task.title);
  };

  // Save edited task
  const saveEdit = async (id) => {
    const res = await axios.put(`${backendURL}/tasks/${id}`, {
      title: editingTitle,
    });

    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    setEditingTaskId(null);
    setEditingTitle("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Task Manager</h1>

      {/* Add Task */}
      <input
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      {/* Task List */}
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} style={{ margin: "10px 0" }}>
              
              {/* EDIT MODE */}
              {editingTaskId === task._id ? (
                <>
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <button onClick={() => saveEdit(task._id)}>Save</button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleCompletion(task)}
                    style={{
                      cursor: "pointer",
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.title}
                  </span>

                  <button onClick={() => startEdit(task)}>Edit</button>
                </>
              )}

              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </ul>
    </div>
  );
}

export default App;