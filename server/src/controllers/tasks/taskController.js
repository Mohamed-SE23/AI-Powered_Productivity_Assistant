import asyncHandler from "express-async-handler";
import { createTask } from "../../services/taskService/TaskService.js";
import TaskModel from "../../models/tasks/TaskModel.js";

// ------------------- Create Task ----------------------
export const createTaskHandler = asyncHandler(async (req, res) => {
    try {
        const { title, description, startDate, dueDate, priority, completed } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required!" });
          }
      
          if (!description || description.trim() === "") {
            return res.status(400).json({ message: "Description is required!" });
          }

          const newTask = await createTask({ title, description, startDate, dueDate, priority, completed,user: req.user._id, });

          console.log('task created successfully', newTask)
          return res.status(201).json(newTask);

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create task",
            error: error.message,
        });
    }
});

// ---------------- Get all tasks ---------------------
// export const getTasks = asyncHandler(async (req, res) => {
//     try {
//       const userId = req.user._id;
  
//       if (!userId) {
//         return res.status(400).json({ message: "User not found!" });
//       }
  
//       const tasks = await TaskModel.find({ user: userId });
//       console.log('tasks fetched')
//       res.status(200).json({
//         length: tasks.length,
//         tasks,
//       });
//     } catch (error) {
//       console.log("Error in getTasks: ", error.message);
//       return res.status(500).json({ message: error.message });
//     }
//   });

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.query.userId; // Fetch userId from the query

    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const tasks = await TaskModel.find({ user: userId });
    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks: ", error.message);
    return res.status(500).json({ message: error.message });
  }
});
  
//   --------------------- get task by id -------------------------
  export const getTask = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
  
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Please provide a task id" });
      }
  
      const task = await TaskModel.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }
  
      if (!task.user.equals(userId)) {
        return res.status(401).json({ message: "Not authorized!" });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.log("Error in getTask: ", error.message);
      return res.status(500).json({ message: error.message });
    }
  });
  
//   ----------------------------- Update task ---------------------------
  export const updateTask = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
  
      const { id } = req.params;
      const { title, description, startDate, dueDate, priority, status, completed } =
        req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Please provide a task id" });
      }
  
      const task = await TaskModel.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }
  
      // check if the user is the owner of the task
      if (!task.user.equals(userId)) {
        return res.status(401).json({ message: "Not authorized!" });
      }
  
      // update the task with the new data if provided or keep the old data
      task.title = title || task.title;
      task.description = description || task.description;
      task.startDate = startDate || task.startDate;
      task.dueDate = dueDate || task.dueDate;
      task.priority = priority || task.priority;
      task.status = status || task.status;
      task.completed = completed !== undefined ? completed : task.completed;

      await task.save();
  
      return res.status(200).json(task);
    } catch (error) {
      console.log("Error in updateTask: ", error.message);
      return res.status(500).json({ message: error.message });
    }
  });
  
//   ------------------------------- Delete Task ------------------------
  export const deleteTask = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
      const { id } = req.params;
  
      const task = await TaskModel.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }
  
      // check if the user is the owner of the task
      if (!task.user.equals(userId)) {
        return res.status(401).json({ message: "Not authorized!" });
      }
  
      await TaskModel.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
      console.log("Error in deleteTask: ", error.message);
      return res.status(500).json({ message: error.message });
    }
  });
  
  /// ------------------------ Nuclear option for deleting all tasks --------------------
  export const deleteAllTasks = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;
  
      const tasks = await TaskModel.find({ user: userId });
  
      if (!tasks) {
        return res.status(404).json({ message: "No tasks found!" });
      }
  
      // check if the user is the owner of the task
      if (!tasks.user.equals(userId)) {
        return res.status(401).json({ message: "Not authorized!" });
      }
  
      await TaskModel.deleteMany({ user: userId });
  
      return res.status(200).json({ message: "All tasks deleted successfully!" });
    } catch (error) {
      console.log("Error in deleteAllTasks: ", error.message);
      return res.status(500).json({ message: error.message });
    }
  });
  