import {z} from "zod";

export const registerSchema = z.object({
  name: z.string().min(3).trim(),
  email: z.string().email().trim(),
  password: z.string().min(6).trim()
});

export const resendSchema = z.object({
  email: z.string().email().trim(),
});

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).trim()
});

export const forgotSchema = z.object({
  email: z.string().email().trim(), 
});

export const resetSchema = z.object({
  password: z.string().min(6).trim() 
});