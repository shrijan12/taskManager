import express from "express";
import { protect } from "./../middleware/auth.middleware.js";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.use(protect);

userRoutes.get("/profile", getProfile);

userRoutes.put("/profile", updateProfile);

userRoutes.put("/change-password", changePassword);

export default userRoutes;
