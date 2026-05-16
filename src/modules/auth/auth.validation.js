import {z} from "zod";

export const registerSchema = z.object({
  name: z.string().min(3).trim(),
  email: z.string().email().trim(),
  password: z.string().min(6).trim()
});