import { catchAsync } from "../../shared/utils/catchAsync.js";
import { registerService, resendVerificationService } from "./auth.service.js";
//Register
export const registerController = catchAsync(async(req, res)=>{
  const {user} = await registerService(req.body);
  res.status(201).json({
    success: true,
    message: "Registered successfully.Verification link is sent to your email. Please verify it with in an hour.",
    user,
  });
});
//Resend verification
export const resendVerificationController = catchAsync(async(req, res)=>{
  const {user} = await resendVerificationService(req.body);
  res.status(201).json({
    success: true,
    message: "Verification link is sent to your email. Please verify it with in an hour.",
    user,
  });
});