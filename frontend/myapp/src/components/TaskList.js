import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  );
}

export default TaskList;