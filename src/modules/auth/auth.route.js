import express from "express";
import validate from "../../shared/middlewares/validate.middleware.js";
import { registerSchema } from "./auth.validation.js";
import { registerController } from "./auth.controller.js";

const router = express.Router();
//routes
router.post("/register", validate(registerSchema), registerController);

export default router;