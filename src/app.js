import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import globalErrorHandler from "./shared/middlewares/error.middleware.js";

const app = express();
//middlewares
app.use(helmet());
app.use(cors({origin:env.clientUrl, credentials:true}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
//routes

//404 handler
app.use((req, res)=>{
  res.status(404).json("Route not found")
});
//global error handler
app.use(globalErrorHandler);
//export
export default app;