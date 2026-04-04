import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

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
  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    
    <div className="glass-card w-100" style={{ maxWidth: "600px" }}>
      
      <h2 className="title"> Manahil's Task Manager 📝</h2>

      {/* Add Task */}
      <div className="d-flex mb-4">
        <input
          type="text"
          className="form-control custom-input me-2"
          placeholder="What do you want to do today?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className="btn btn-light btn-custom" onClick={addTask}>
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-item d-flex justify-content-between align-items-center">
            
            {editingTaskId === task._id ? (
              <>
                <input
                  className="form-control me-2"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button className="btn btn-success btn-sm" onClick={() => saveEdit(task._id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={task.completed ? "completed" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleCompletion(task)}
                >
                  {task.title}
                </span>

                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEdit(task)}
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(task._id)}
                  >
                    🗑
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-center">No tasks yet 👀</p>
      )}

    </div>
  </div>
);
}
export default App;