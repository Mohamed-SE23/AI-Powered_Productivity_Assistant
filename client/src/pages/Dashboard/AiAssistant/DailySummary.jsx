import React from "react";

const DailySummary = ({ tasks }) => {
  const todayTasks = tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === new Date().toDateString()
  );

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
      {todayTasks.length ? (
        <ul>
          {todayTasks.map((task, i) => (
            <li key={i} className="mb-2">
              <span className="font-bold">{task.title}</span>: {task.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks for today.</p>
      )}
    </div>
  );
};

export default DailySummary;
