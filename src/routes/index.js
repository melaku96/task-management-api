import express from "express";
import authRoute from "../modules/auth/auth.route.js";

const router = express.Router();

//routes
router.use("/auth", authRoute);

export default router;