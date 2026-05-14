import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import env from "./config/env.js";

const app = express();
//middlewares
app.use(helmet());
app.use(cors({origin:env.clientUrl, credentials:true}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
//routes

//404 handler

//global error handler

//export
export default app;