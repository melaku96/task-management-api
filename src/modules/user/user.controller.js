import { catchAsync } from "../../shared/utils/catchAsync.js";
import { getAllUsersService, getCurrentUserService } from "./user.service.js";

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