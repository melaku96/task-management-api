import ApiError from "../../shared/errors/ApiError.js";
import projectModel from "./project.model.js";

export const createProjectService = async (userId, payload) => {
  const project = await projectModel.create({
    ...payload,
    owner: userId,
    members: [userId],
  });
  return { project };
};
//get progects
export const getAllProjctsService = async (userId) => {
  const projects = await projectModel.findOne({ members: userId })
  .populate("owner", "name email")
  .sort({createdAt: -1});
  if (!projects) {
    throw new ApiError("Project not found", 404);
  };
  return { projects };
};
//get a single project
export const getSingleProjctsService = async (projectId) => {
  const project = await projectModel.findOne({ _id: projectId })
  .populate("owner", "name email")
  .populate("members", "name email");
  if (!project) {
    throw new ApiError("Project not found", 404);
  }
  return { project };
};
//update project
export const updateProjectService = async(projectId,userId,payload)=>{
  const project = await projectModel.findOneAndUpdate(
    {_id:projectId, owner: userId},
    payload,
    {returnDocument: "after"},
  );
   if (!project) {
    throw new ApiError("Project not found or you can not update it", 404);
  };
  return {project};
};
//delete project
export const deleteProjectService = async(projectId, userId)=>{
  const project = await projectModel.findOneAndDelete({_id: projectId, owner:userId});
   if (!project) {
    throw new ApiError("Project not found or you can not delete it", 404);
  };
};