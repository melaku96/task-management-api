import express from "express";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";
import { changePasswordController, deleteUserController, getAllUsersController, getCurrentUserController, updateUserController } from "./user.controller.js";
import { roleMiddleware } from "../../shared/middlewares/role.middleeware.js";
import validate from "../../shared/middlewares/validate.middleware.js";
import { changePasswordSchema } from "./user.validation.js";

const router = express.Router();
//routes
router.get("/me", authMiddleware, getCurrentUserController);
router.get("/get-all", authMiddleware, roleMiddleware("admin", "manager"), getAllUsersController);
router.patch("/update", authMiddleware, updateUserController);
router.patch("/change-password", authMiddleware,validate(changePasswordSchema),changePasswordController);
router.delete("/delete-user", authMiddleware, deleteUserController);

export default router;