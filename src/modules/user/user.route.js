import express from "express";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { getAllUsersController, getCurrentUserController } from "./user.controller.js";
import { roleMiddleware } from "../../shared/middlewares/role.middleeware.js";

const router = express.Router();
//routes
router.get("/me", authMiddleware, getCurrentUserController);
router.get("/get-all", authMiddleware, roleMiddleware("admin", "manager"), getAllUsersController);

export default router;