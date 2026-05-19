import { catchAsync } from "../../shared/utils/catchAsync.js";
import { createProjectService } from "./project.service.js";

export const createProjectController = catchAsync(async(req, res)=>{
  const {project} = await createProjectService(req.user._id, req.body);
  res.status(200).json({
    success: true,
    message:"Project created successfully!",
    project
  });
});