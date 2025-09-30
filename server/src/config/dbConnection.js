import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "SanjeevaniDB", // Hum database ka naam yahan de sakte hain
    })
    .then(() => {
        console.log("✅ MongoDB Connected successfully!");
    })
    .catch((err) => {
        console.error("--- MONGODB CONNECTION FAILED ---");
        console.error(err);
        process.exit(1);
    });
};