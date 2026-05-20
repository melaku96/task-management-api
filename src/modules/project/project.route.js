import express from "express";
import validate from "../../shared/middlewares/validate.middleware.js";
import { createProjectSchema, updateProjectSchema } from "./project.validation.js";
import { createProjectController, deleteProjectController, getAllProjectsController, getSingleProjectsController, updateProjectController } from "./project.controller.js";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";

const router = express.Router();
//routes
router.post("/create", authMiddleware, validate(createProjectSchema), createProjectController);
router.get("/single-project/:id", authMiddleware, getSingleProjectsController);
router.get("/all-projects", authMiddleware, getAllProjectsController);
router.patch("/update-project/:id", authMiddleware, validate(updateProjectSchema), updateProjectController);
router.delete("/delete-project/:id", authMiddleware, deleteProjectController);

export default router;