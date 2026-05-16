import express from "express";
import validate from "../../shared/middlewares/validate.middleware.js";
import { registerSchema, resendSchema } from "./auth.validation.js";
import { registerController, resendVerificationController } from "./auth.controller.js";

const router = express.Router();
//routes
router.post("/register", validate(registerSchema), registerController);
router.post("/resend-verification", validate(resendSchema), resendVerificationController);

export default router;