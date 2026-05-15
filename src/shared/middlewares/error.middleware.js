import { success } from "zod";
import JWTErrorHandler from "../errors/JWTErrorHandler.js";
import zodErrorHandler from "../errors/zodErrorHandler.js";
import env from "../../config/env.js";

const globalErrorHandler = (error, req, res, next)=>{
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message || "Something went wrong";

  //zod validation
  if(error.name === "ZodError"){
    const simplifiedError = zodErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errors = simplifiedError.errors;
  }
   //JWT Errors
  else if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"){
    const simplifiedError = JWTErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  //mongoose invalid objectId error
  else if(error.name === "CastError"){
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  }
  //mongoose duplicate key error
  else if(error.code === 11000){
    const field = Object.keys(error.keyVale)[0];
    statusCode = 400;
    message = `${field} already exists`;
  }
  //response
  res.status(statusCode).json({
    success:false,
    status,
    message,
    errors,
    stack: env.nodeEnv === "development"? error.stack : undefined,
  })

};