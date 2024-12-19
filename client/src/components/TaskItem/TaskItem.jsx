import React from "react";
import { FaRegEdit, FaRegTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskItem = ({ task, getTask, openModalForEdit, deleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{new Date(task.createdAt).toLocaleString()}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
          <button
            className={`${task.completed ? "text-green-400" : "text-gray-400"}`}
          >
            <FaRegCheckCircle />
          </button>
          <button
            className="text-[#00A1F1]"
            onClick={() => {
              getTask(task._id);
              openModalForEdit(task);
            }}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-[#F65314]"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
