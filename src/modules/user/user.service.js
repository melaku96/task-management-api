import ApiError from "../../shared/errors/ApiError.js";
import { bcryptHash } from "../../shared/utils/hashToken.js";
import userModel from "./user.model.js";
import bcrypt from "bcryptjs";

//get user
export const getCurrentUserService = async(paylod)=>{
  const user = await userModel.findOne({_id:paylod}).select("-refreshToken");
  if(!user){
    throw new ApiError("Token expired. please refresh it", 403);
  };
  return {user};
};
// get all users
export const getAllUsersService = async()=>{
  const users = await userModel.find().select("-refreshToken");
  if(!users){
    throw new ApiError("No user found", 404);
  };
  return {users};
};
//update user
export const updateUserService = async(id, updateData)=>{
  const forbiddenFile = ["password", "refreshToken", "isVerified"];
  forbiddenFile.forEach(file=>{
    delete updateData[file];
  });
  const user = await userModel.findOneAndUpdate(
    {_id:id},
    updateData,
    {returnDocument: "after"},
  );
  if(!user){
    throw new ApiError("user not found", 404);
  };
  return {user};
};
//change password
export const changePasswordService = async(id, paylod)=>{
  const user = await userModel.findOne({_id:id}).select("+password");
  if(!user){
    throw new ApiError("User not found", 404);
  };
  const isMatch = await bcrypt.compare(paylod.password, user.password);
  if(!isMatch){
    throw new ApiError("Current password is not correct", 401);
  };
  const hashedNewPassword = await bcryptHash(paylod.newPassword);
  user.password = hashedNewPassword;
  await user.save();
};
//user delete
export const deleteUserService = async(paylod)=>{
  const user = await userModel.findOne({_id:paylod});
  if(!user){
    throw new ApiError("User not found", 404);
  };
  await user.deleteOne();
};