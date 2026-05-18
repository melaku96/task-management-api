import { success } from "zod";
import { catchAsync } from "../../shared/utils/catchAsync.js";
import { changePasswordService, getAllUsersService, getCurrentUserService, updateUserService } from "./user.service.js";

//get current user
export const getCurrentUserController = catchAsync(async(req, res)=>{
  const {user} = await getCurrentUserService(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});
//get all users
export const getAllUsersController = catchAsync(async(req, res)=>{
  const {users} = await getAllUsersService();
  res.status(200).json({
    success: true,
    users,
  });
});
//update user
export const updateUserController = catchAsync(async(req, res)=>{
  const {user} = await updateUserService(req.user._id, req.body);
  res.status(200).json({
    success: true,
    user
  });
});
//change password
export const changePasswordController = catchAsync(async(req, res)=>{
  await changePasswordService(req.user._id, req.body);
  res.status(200).json({
    success: true,
    message: "Your password changed successfully!",
  });
});