import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// app instance create karo
export const app = express();


// --- Core Middlewares (App-level) ---

// CORS (Cross-Origin Resource Sharing) ko handle karne ke liye
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true // Cookies bhejne ke liye yeh zaroori hai
}));

// JSON data parse karne ke liye (request body se)
app.use(express.json({ limit: "16kb" }));

// URL-encoded data (form data) parse karne ke liye
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// User ke browser se cookies ko access aur set karne ke liye
app.use(cookieParser());


// --- ROUTES IMPORT ---
import userRouter from "./routes/user.routes.js";
import { errorMiddleware } from "./middlewares/error.js";


// --- ROUTES DECLARATION ---
// Jab bhi koi request /api/v1/users par aayegi, toh use 'userRouter' ke paas bhej do
app.use("/api/v1/users", userRouter);
// (Future me medication routes yahan aayenge: app.use("/api/v1/medications", medicationRouter);)


// --- Centralized ERROR MIDDLEWARE ---
// Yeh hamesha saare routes ke baad hi aayega.
// Agar kisi bhi route me 'next(error)' call hota hai, toh request seedha yahan aayegi.
app.use(errorMiddleware);