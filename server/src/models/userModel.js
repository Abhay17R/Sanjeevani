import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [6, "Password must be at least 6 characters long!"],
        select: false, // Jab hum user data query karenge, tab password by default nahi aayega
    },
}, { timestamps: true }); // createdAt aur updatedAt fields automatically add ho jayengi

// Password ko save karne se pehle HASH karo
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Agar password change nahi hua hai, toh kuch mat karo
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password ko compare karne ke liye method
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// JWT Token generate karne ka method
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};


export const User = mongoose.model("User", userSchema);