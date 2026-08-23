import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskByID,
  updateTask,
} from "./../controllers/task.controller.js";

const taskRoutes = express.Router();

taskRoutes.use(protect);

taskRoutes.get("/", getTask);

taskRoutes.post("/", createTask);

taskRoutes.get("/:id", getTaskByID);

taskRoutes.put("/:id", updateTask);

taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
