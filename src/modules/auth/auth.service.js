import ApiError from "../../shared/errors/ApiError.js";
import { comparePassword } from "../../shared/utils/comparePassword.js";
import { verifyEmailTemplate } from "../../shared/utils/emailTemplet.js";
import { generateToken } from "../../shared/utils/generateToken.js";
import { bcryptHash, cryptoHash } from "../../shared/utils/hashToken.js";
import { sendEmail } from "../../shared/utils/sendEmail.js";
import userModel from "../user/user.model.js"
import crypto from "crypto"


//Register
export const registerService = async (payload) => {
  const isExist = await userModel.findOne({ email: payload.email });
  if (isExist) {
    if (isExist.isVerified) {
      throw new ApiError("Email already verified. Please login.", 409);
    } else if (!isExist.isVerified && isExist.verificationTokenExpire > Date.now()) {
      throw new ApiError(`Email already registred. Check your email and verify it with in ${Math.ceil((isExist.verificationTokenExpire - Date.now()) / 60000)} minutes `, 401);
    } else {
      await isExist.deleteOne();
    };
  };
  const hashedPassword = await bcryptHash(payload.password);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await userModel.create({
    ...payload,
    password: hashedPassword,
    verificationToken: cryptoHash(verificationToken),
    verificationTokenExpire: Date.now() + 60 * 60 * 1000,
  });
  const verificationLink = `http://localhost:3000/api/v1/auth/verify-email?token=${verificationToken}`;

  const htmTemplete = verifyEmailTemplate(verificationLink);
  await sendEmail(payload.email, "Verify Your Email", htmTemplete);

  return { user };
};
//Resend
export const resendVerificationService = async (payload) => {
  const user = await userModel.findOne({ email: payload.email });
  if (!user) {
    throw new ApiError("User not found.Please register", 404);
  };
  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.verificationToken = cryptoHash(verificationToken);
  user.verificationTokenExpire = Date.now() + 60 * 60 * 1000;
  await user.save();

  const verificationLink = `http://localhost:3000/api/v1/auth/verify-email?token=${verificationToken}`;

  const htmTemplete = verifyEmailTemplate(verificationLink);
  await sendEmail(payload.email, "Verify Your Email", htmTemplete);

  return { user };
};
//Verify Email
export const verifyEmailService = async (payload) => {
  const user = await userModel.findOne({
    verificationToken: cryptoHash(payload.token),
    verificationTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError("Verification time is expired or it is already verified", 403);
  };
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;

  await user.save();
};
//Login
export const loginService = async(payload)=>{
  const user = await userModel.findOne({email: payload.email}).select("+password");
  if(!user){
    throw new ApiError("User not found. Please register.", 404);
  };
  if(!user.isVerified && user.verificationTokenExpire > Date.now()){
    throw new ApiError("Verify your email first", 401);
  };
  if(!user.isVerified && user.verificationTokenExpire < Date.now()){
    await user.deleteOne();
    throw new ApiError("Verification time exprieed. Please Register again", 401);
  };
  const isMatch = await comparePassword(payload.password, user.password);
  if(!isMatch){
    throw new ApiError("Invalid password", 401);
  }
  const accessToken = generateToken(user);
  const refreshToken = crypto.randomBytes(32).toString('hex');
  user.refreshToken = cryptoHash(refreshToken);
  await user.save();
  return {accessToken, refreshToken, user};
};
//Refresh token
export const refreshTokenService = async(payload)=>{
  if(!payload){
    throw new ApiError("No token found.Please login", 403)
  }
  const user = await userModel.findOne({refreshToken: cryptoHash(payload)});
  if(!user){
    throw new ApiError("Token expired. Please login again", 403);
  }
  const newAccessToken = generateToken(user);
  const newRefreshToken = crypto.randomBytes(32).toString('hex');
  user.refreshToken = cryptoHash(newRefreshToken);
  await user.save();
  return {newAccessToken, newRefreshToken};
};
//Forgot
export const forgotPasswordService = async(payload)=>{
  const user = await userModel.findOne({email: payload});
  if(!user){
    throw new ApiError("User not found. Please register first", 404);
  };
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = cryptoHash(resetToken);
  user.resetPasswordTokenExpire = Date.now()+60*60*1000;
  await user.save();
  const resetURL = `http://localhost:3000/api/v1/auth/reset-password?token=${resetToken}`;

  return {resetURL};
};
//Reset password
export const resetPasswordService = async(newPassword, resetToken)=>{
  if(!resetToken){
    throw new ApiError("No token found", 403);
  };
  const user = await userModel.findOne({
    resetPasswordToken: cryptoHash(resetToken),
    resetPasswordTokenExpire:{$gt: Date.now()},
  });
  if(!user){
    throw new ApiError("reset password token expired", 403);
  };
  const hashedPassword = await bcryptHash(newPassword);
  user.password = hashedPassword;
  user.resetPasswordToken=undefined;
  user.resetPasswordTokenExpire=undefined;
  await user.save();
};
//Logout
export const logoutService = async(payload)=>{
  if(!payload){
    throw new ApiError("No token found", 403);
  };
  const user = await userModel.findOne({refreshToken: cryptoHash(payload)});
  if(!user){
    throw new ApiError("Invalid or expired token", 403);
  };
  user.refreshToken = null;
  await user.save();
};