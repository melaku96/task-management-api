import ApiError from "../../shared/errors/ApiError.js";
import { verifyEmailTemplate } from "../../shared/utils/emailTemplet.js";
import { bcryptHash, cryptoHash } from "../../shared/utils/hashToken.js";
import { sendEmail } from "../../shared/utils/sendEmail.js";
import userModel from "../user/user.model.js"
import crypto from "crypto"

export const registerService = async (payload) => {
  const isExist = await userModel.findOne({ email: payload.email });
  if (isExist) {
    if (isExist.isVerified) {
      throw new ApiError(409, "Email already verified. Please login.");
    }else if (!isExist.isVerified && isExist.verificationTokenExpire > Date.now()) {
      throw new ApiError(401, `Email already registred. Check your email and verify it with in ${Math.ceil((user.verificationTokenExpire - Date.now()) / 1000)} minutes `);
    }else {
      await isExist.deleteOne();
    };
  };
  const hashedPassword = await bcryptHash(payload.password);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await userModel.create({
    ...payload,
    password: hashedPassword,
    verificationToken: hashedVerificationToken,
    verificationTokenExpire: Date.now()+60*60*1000,
  });
  const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;

  const htmTemplete = verifyEmailTemplate(verificationLink);
  await sendEmail(payload.email, "Verify Your Email", htmTemplete);

  return {user};
};