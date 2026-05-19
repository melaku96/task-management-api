import express from "express";
import validate from "../../shared/middlewares/validate.middleware.js";
import { createProjectSchema } from "./project.validation.js";
import { createProjectController } from "./project.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";

const router = express.Router();
//routes
router.post("/create", authMiddleware, validate(createProjectSchema), createProjectController);

export default router;