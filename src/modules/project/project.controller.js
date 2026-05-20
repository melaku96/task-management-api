import { catchAsync } from "../../shared/utils/catchAsync.js";
import { createProjectService, deleteProjectService, getAllProjctsService, getSingleProjctsService, updateProjectService } from "./project.service.js";
//create projects
export const createProjectController = catchAsync(async(req, res)=>{
  const {project} = await createProjectService(req.user._id, req.body);
  res.status(200).json({
    success: true,
    message:"Project created successfully!",
    project
  });
});
//get all projects
export const getAllProjectsController = catchAsync(async(req, res)=>{
  const {projects} = await getAllProjctsService(req.user._id);
  res.status(200).json({
    success: true,
    projects
  });
});
//get single project
export const getSingleProjectsController = catchAsync(async(req, res)=>{
  const {project} = await getSingleProjctsService(req.params.id);
  res.status(200).json({
    success: true,
    project
  });
});
//update project
export const updateProjectController = catchAsync(async(req, res)=>{
  const {project} = await updateProjectService(req.params.id, req.user._id, req.body);
  res.status(200).json({
    success: true,
    message:"Project updated successfully!",
    project
  });
});
//delete project
export const deleteProjectController = catchAsync(async(req, res)=>{
  await deleteProjectService(req.params.id, req.user._id);
  res.status(200).json({
    success: true,
    message:"Project deleted successfully!",
  });
})