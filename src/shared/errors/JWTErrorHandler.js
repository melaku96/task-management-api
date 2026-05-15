const JWTErrorHandler = (error)=>{
  let message = "Invalid token";
  if(error.name === "TokenExpiredError"){
    message = "Token expired. Please refresh it or login again.";
  };
  return {
    statusCode: 401,
    message
  };
};
export default JWTErrorHandler;