import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name:{
    type: String,
    required:[true, "Project name is required"],
    trim: true,
    minLength: [3, "Project name must be at least 3 characters"],
    maxLength: [100, "Project name can not exceed 100 characters"],
  },
  description:{
    type: String,
    trim: true,
    maxLength: [500, "Description can not exceed 500 characters"],
    default: "",
  },
  status:{
    type: String,
    enum:["active", "completed", "archived"],
    default: "active",
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  members:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
},{timestamps:true});

export default mongoose.model("Projects", projectSchema);