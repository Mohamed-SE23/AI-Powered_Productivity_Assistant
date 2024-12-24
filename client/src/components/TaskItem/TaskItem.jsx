import React from "react";
import { FaRegEdit, FaRegTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteTask, getTask } from "../../app/tasksSlice";
import { formatTime, openModalForEdit } from "../../utils/utilities";

const TaskItem = ({ task }) => {
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
  const dispatch = useDispatch();
  
  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
  }

  const getTaskHandler = (id) => {
    dispatch(getTask(id))
  }

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
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
          <button
            className={`${task.completed === "true" ? "text-green-400" : "text-gray-400"}`}
          >
            <FaRegCheckCircle />
          </button>
          <button
            className="text-[#00A1F1]"
            onClick={() => {
              getTaskHandler(task._id);
              openModalForEdit(dispatch, task);
            }}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-[#F65314]"
            onClick={() => {
              deleteTaskHandler(task._id);
            }}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
