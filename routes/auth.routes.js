import express from "express";
import {
  registerController,
  loginController,
  meController,
} from "./../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", meController);

export default authRoutes;
