import {optional, z} from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(6).trim(),
  newPassword: z.string().min(6).trim() 
});
export const updateSchema = z.object({
  name: z.string().min(3).trim().optional(),
  email: z.string().email().trim().optional(),
});