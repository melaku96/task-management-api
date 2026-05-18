import ApiError from "../errors/ApiError";

export const roleMiddleware = (...roles)=>{
  return (req, res, next)=>{
    try {
      if(!roles.includes(req.user.role)){
        throw new ApiError("Unauthorized!", 401);
      };
      next();
    } catch (error) {
      next(error);
    };
  };
};