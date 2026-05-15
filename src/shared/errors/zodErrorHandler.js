const zodErrorHandler = (error)=>{
  const errors = error.issues.map((issue)=>({
    field: issue.path.join("."),
    message: issue.message
  }));
  return {
    statusCode: 400,
    message: "Validation Error",
    errors
  };
};
export default zodErrorHandler;