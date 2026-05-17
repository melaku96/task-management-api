import express from "express";
import validate from "../../shared/middlewares/validate.middleware.js";
import { loginSchema, registerSchema, resendSchema } from "./auth.validation.js";
import { emailVerificationController, loginController, refreshTokenController, registerController, resendVerificationController } from "./auth.controller.js";

const router = express.Router();
//routes
router.post("/register", validate(registerSchema), registerController);
router.post("/resend-verification", validate(resendSchema), resendVerificationController);
router.get("/verify-email", emailVerificationController);
router.post("/login", validate(loginSchema), loginController);
router.post("/refresh-token", refreshTokenController);

export default router;