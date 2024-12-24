import express from "express";
import { createTaskHandler, deleteTask, getTask, getTasks, updateTask } from "../controllers/tasks/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/task/create", protect, createTaskHandler);
router.get("/tasks", getTasks);
router.get("/task/:id", protect, getTask);
router.patch("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

export default router;