import dotenv from "dotenv";
dotenv.config();

const env = {
  port=process.env.PORT || 5000,
  mongoUri=process.env.MONGO_URI,
  nodeEnv=process.env.NODE_ENV,
  clientUrl=process.env.CLIENT_URL,
  emailUser=process.env.EMAIL_USER,
  emailPass=process.env.EMAIL_PASS,
  accessTokenSecret=process.env.ACCESS_TOKEN_SECRET,
  cloudinaryCloudName=process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey=process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret=CLOUDINARY_API_SECRET
}
export default env;