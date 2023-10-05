import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

export const connection = async () => {    
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to Mongo");
    } catch(error) {
        await client.close();
        console.log("Connection closed");
    }
}