import express from "express";
import validate from "../../shared/middlewares/validate.middleware.js";
import { registerSchema, resendSchema } from "./auth.validation.js";
import { emailVerificationController, registerController, resendVerificationController } from "./auth.controller.js";

const router = express.Router();
//routes
router.post("/register", validate(registerSchema), registerController);
router.post("/resend-verification", validate(resendSchema), resendVerificationController);
router.get("/verify-email", emailVerificationController);

export default router;