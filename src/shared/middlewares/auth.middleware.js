import ApiError from "../errors/ApiError.js";
import jwt from "jsonwebtoken"
import env from "../../config/env.js";
import userModel from "../../modules/user/user.model.js";

export const authMiddleware = (req, res, next)=>{
  try {
    const token  = req.cookies.accessToken;
    if(!token){
      throw new ApiError("Unauthorized", 401);
    };
    const decoded = jwt.verify(token, env.accessTokenSecret);
    req.user = decoded;
    next();
  } catch (error) {
    next(error)
  };
};