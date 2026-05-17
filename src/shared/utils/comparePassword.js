import bcrypt from "bcryptjs";

export const comparePassword = (password, newPassword)=>{
  return bcrypt.compare(password, newPassword);
};