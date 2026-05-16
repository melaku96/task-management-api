import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required:[true, "Name is required"],
    trim: true,
  },
  email:{
    type: String,
    unique:true,
    required:[true, "Email is required"],
    trim: true,
  },
  password:{
    type: String,
    required:[true, "Password is required"],
     minLength: 6,
    trim: true,
  },
  role:{
    type: String,
    enum:["admin", "manager", "member"],
    default: "member"
  },
  isActive:{
    type:Boolean,
    default: false,
  },
  avatar:{
    type: String,
    default:"",
  },
  refreshToken: String,
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  emailVerificationToken: String,
  emailVerificationTokenExpire: Date,
}, {timestamps: true});

export default mongoose.model("Users", userSchema);