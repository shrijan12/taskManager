import express from "express";
import { protect } from "./../middleware/auth.middleware.js";
import { authorize } from "./../middleware/role.middleware.js";
import {
  deleteAdminTask,
  deleteUser,
  getAdminTaskById,
  getAllTask,
  getDashboard,
  getUsers,
  getUsersById,
  updateAdminTask,
  updateUser,
} from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(authorize("admin"));

adminRoutes.get("/dashboard", getDashboard);
adminRoutes.get("/users", getUsers);
adminRoutes.get("/users/:id", getUsersById);
adminRoutes.put("/users/:id", updateUser);
adminRoutes.delete("/users/:id", deleteUser);
adminRoutes.get("/tasks", getAllTask);
adminRoutes.get("/tasks/:id", getAdminTaskById);
adminRoutes.put("/tasks/:id", updateAdminTask);
adminRoutes.delete("/tasks/:id", deleteAdminTask);

export default adminRoutes;
