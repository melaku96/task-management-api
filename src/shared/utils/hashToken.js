import bcrypt from "bcryptjs";
import crypto from "crypto";

export const bcryptHash = async(token)=>{
  return await bcrypt.hash(token, 10);
};

export const cryptoHash = (token)=>{
  return crypto
  .createHash('sha256')
  .update(token)
  .digest('hex');
};