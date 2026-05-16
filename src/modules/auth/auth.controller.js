import { catchAsync } from "../../shared/utils/catchAsync.js";
import { registerService } from "./auth.service.js";
//Register
export const registerController = catchAsync(async(req, res)=>{
  const {user} = await registerService(req.body);
  res.status(201).json({
    success: true,
    message: "You are registered successfully.Verification link is sent to your email. Please verify it with in an hour.",
    user,
  })
})