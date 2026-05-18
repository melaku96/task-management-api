import { catchAsync } from "../../shared/utils/catchAsync.js";
import { getCurrentUserService } from "./user.service.js";

export const getCurrentUserController = catchAsync(async(req, res)=>{
  const {user} = await getCurrentUserService(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});