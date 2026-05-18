import express from "express";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { getCurrentUserController } from "./user.controller.js";

const router = express.Router();
//routes
router.get("/me", authMiddleware, getCurrentUserController);

export default router;