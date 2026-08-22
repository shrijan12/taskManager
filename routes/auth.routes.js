import express from "express";
import {
  registerController,
  loginController,
  meController,
} from "./../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", protect, meController);

export default authRoutes;
