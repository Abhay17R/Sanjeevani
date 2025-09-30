import mongoose, { Schema } from "mongoose";

const medicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // User model se link kar rahe hain
        required: true,
    },
    pillName: {
        type: String,
        required: [true, "Pill name is required!"],
        trim: true,
    },
    dosage: {
        type: String,
        required: [true, "Dosage is required!"], // e.g., "500mg", "1 tablet"
    },
    frequency: {
        type: String,
        required: true, // e.g., "Daily", "Twice a day"
    },
    times: {
        type: [String], // e.g., ["09:00", "21:00"]
        required: true,
    },
    isDeleted: { // Soft delete ke liye
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export const Medication = mongoose.model("Medication", medicationSchema);