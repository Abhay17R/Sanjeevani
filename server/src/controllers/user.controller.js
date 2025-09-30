// server/src/controllers/user.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js"; // <-- DEKHO, TUMHARA FILE NAME USE KIYA
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1. Frontend se data lo (request body se)
    const { username, email, password } = req.body;

    // 2. Validation: Check karo ki koi field khaali toh nahi hai
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // 3. Check if user already exists: Email ya username pehle se database me hai ya nahi
    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with this email already exists"); // 409 means Conflict
    }

    // 4. User create karo database me
    const user = await User.create({
        username,
        email,
        password,
    });

    // 5. Check karo ki user aache se create hua ya nahi
    if (!user) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 6. User ko response me wapas bhejo (password mat bhejna)
    // Hum password ko null kar denge response se pehle, ya Mongoose ke select:false se wo aayega hi nahi.

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export { registerUser };    