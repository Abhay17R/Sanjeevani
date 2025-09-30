import dotenv from 'dotenv';
import { app } from './src/app.js'; // src folder se app import karo
import { connection } from './src/config/dbConnection.js'; // src folder se connection import karo

// Dotenv ko configure karo taaki environment variables load ho sakein
dotenv.config({
    path: './config.env' // Path to your environment file
});

// Best Practice: Pehle Database se connect karo, agar connection successful ho, tabhi server start karo.
connection()
.then(() => {
    // Agar app me koi error aata hai server start hone se pehle, toh usko handle karo
    app.on("error", (error) => {
        console.log("EXPRESS APP ERROR: ", error);
        throw error;
    });

    // Ab server ko sunna shuru karo
    app.listen(process.env.PORT || 5000, () => {
        console.log(`✅ Server is running at port : ${process.env.PORT || 5000}`);
    });
})
.catch((err) => {
    // Agar database connection fail hota hai, toh server start hi mat karo
    console.error("MONGO DB CONNECTION FAILED !!! ", err);
    process.exit(1); // Process ko exit kar do
});