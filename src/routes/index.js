import express from "express";
import authRoute from "../modules/auth/auth.route.js";
import userRoute from "../modules/user/user.route.js"

const router = express.Router();

//routes
router.use("/auth", authRoute);
router.use("/user", userRoute);
export default router;