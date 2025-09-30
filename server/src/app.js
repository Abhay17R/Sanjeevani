import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbconnection.js";
config({ path: "./config.env" });
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();



const allowedOrigins = [
  process.env.FRONTEND_URL,   
  'http://localhost:5173'       // Aapka local development URL
];
const corsOptions = {
  origin: (origin, callback) => {
    // Agar request ka origin 'allowedOrigins' list me hai, ya request kahin bahar se nahi aa rhi (like Postman), to allow karo.
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use("/api/v1/users", userRouter);
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json()); // parentheses important hain
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
connection();