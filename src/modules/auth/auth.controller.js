import { success } from "zod";
import { catchAsync } from "../../shared/utils/catchAsync.js";
import { forgotPasswordService, loginService, refreshTokenService, registerService, resendVerificationService, verifyEmailService } from "./auth.service.js";
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
//Verification
export const emailVerificationController = catchAsync(async(req, res)=>{
  await verifyEmailService(req.query);
  res.status(201).json({
    success: true,
    message: "Email Verified Successfully.",
  });
});
// Login
export const loginController = catchAsync(async(req, res)=>{
  const {accessToken, refreshToken, user} = await loginService(req.body);
  res.cookie("accessToken", accessToken,{
    httpOnly: true,
    secure: false, //true for production
    sameSite:"strict",
    maxAge: 30*60*1000,
  });
  res.cookie("refreshToken", refreshToken,{
    httpOnly: true,
    secure: false, //true for production
    sameSite:"strict",
    maxAge: 7*24*60*60*1000,
  });
  res.status(200).json({
    success: true,
    message: "Login succeffully",
    user
  });
});
//Refresh
export const refreshTokenController = catchAsync(async(req, res)=>{
  const token = req.cookies.refreshToken;
  const {newAccessToken, newRefreshToken} = await refreshTokenService(token);
   res.cookie("accessToken", newAccessToken,{
    httpOnly: true,
    secure: false, //true for production
    sameSite:"strict",
    maxAge: 30*60*1000,
  });
  res.cookie("refreshToken", newRefreshToken,{
    httpOnly: true,
    secure: false, //true for production
    sameSite:"strict",
    maxAge: 7*24*60*60*1000,
  });
  res.status(200).json({
    success: true,
    message: "Token refrshed succeffully",
  });
});
//Forgot password
export const forgotPasswordController = catchAsync(async(req, res)=>{
  const {resetURL} = await forgotPasswordService(req.body.email);
  res.status(200).json({
    success:true,
    message:"Please enter the new password",
    resetURL
  });
});