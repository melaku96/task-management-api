import projectModel from "./project.model.js"

export const createProjectService = async(userId, payload)=>{
  const project = await projectModel.create({
    ...payload,
    owner: userId,
    members: [userId]
  });
  return {project};
};