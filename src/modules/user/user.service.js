import ApiError from "../../shared/errors/ApiError.js";
import userModel from "./user.model.js";

export const getCurrentUserService = async(paylod)=>{
  const user = await userModel.findOn({_id:paylod}).select("-refreshToken");
  if(!user){
    throw new ApiError("Token expired. please refresh it", 403);
  };
  return {user};
};