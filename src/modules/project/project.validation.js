import {z} from "zod";
export const createProjectSchema = z.object({
  name: z
  .string()
  .min(3, "Project name must be at least 3 characters")
  .max(100, "Project name can not exceed 100 characters")
  .trim(),
  description: z
  .string()
  .max(500, "Description can not exceed 500 characters")
  .trim()
  .optional(),
  status: z
  .enum(["active", "completed", "archived"])
  .optional()
});
export const updateProjectSchema = z.object({
  name: z
  .string()
  .min(3, "Project name must be at least 3 characters")
  .max(100, "Project name can not exceed 100 characters")
  .trim()
  .optional(),
  description: z
  .string()
  .max(500, "Description can not exceed 500 characters")
  .trim()
  .optional(),
  status: z
  .enum(["active", "completed", "archived"])
  .optional()
});