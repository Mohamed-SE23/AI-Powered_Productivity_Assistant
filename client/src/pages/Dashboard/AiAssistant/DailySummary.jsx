import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

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
            <li key={i} className="mb-2 flex items-center gap-2">
              <div className={`${task.completed === "true" ? "text-green-400" : "text-gray-500"}`}>
                <FaRegCheckCircle />
              </div>
              <span className="font-bold text-gray-700">{task.title}</span>
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
