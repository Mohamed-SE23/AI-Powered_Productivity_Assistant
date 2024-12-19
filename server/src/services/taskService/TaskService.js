import TaskModel from "../../models/tasks/TaskModel.js";

// ----------------- Create Task Service ----------------------
export const createTask = async (taskData) => {
    const task = new TaskModel(taskData);
    return await task.save();
  };