import React from "react";

const TaskPrioritization = ({ tasks }) => {
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Task Prioritization</h2>
      {highPriorityTasks.length ? (
        <ul>
          {highPriorityTasks.map((task, i) => (
            <li key={i} className="mb-2">
              <span className="font-bold">{task.title}</span>: {task.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No high-priority tasks available.</p>
      )}
    </div>
  );
};

export default TaskPrioritization;
