import {z} from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(6).trim(),
  newPassword: z.string().min(6).trim() 
});