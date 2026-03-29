import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const backendURL = "http://127.0.0.1:5000"; // Flask backend URL

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendURL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      const response = await axios.post(`${backendURL}/tasks`, {
        title: newTaskTitle,
      });
      // Add the newly returned task to state
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTaskTitle(""); // clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task completion
  const toggleCompletion = async (task) => {
    try {
      const response = await axios.put(`${backendURL}/tasks/${task._id}`, {
        completed: !task.completed,
      });
      // Update task in state
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? response.data : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${backendURL}/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} style={{ margin: "10px 0" }}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleCompletion(task)}
              >
                {task.title}
              </span>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
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