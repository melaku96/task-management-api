import ApiError from "../../shared/errors/ApiError.js";
import userModel from "./user.model.js";

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