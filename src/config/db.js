import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async()=>{
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB Connected Successfully");
};
export default connectDB;