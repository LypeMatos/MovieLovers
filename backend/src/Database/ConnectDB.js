import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

export const connection = async () => {
    const connUri = `mongodb+srv://${dbUser}:${dbPassword}@movielovers.v87jtns.mongodb.net/moviesdb?retryWrites=true&w=majority`;
    
    try {
        await mongoose.connect(connUri);
        console.log("Connected to Mongo");
    } catch(error) {
        await client.close();
        console.log("Connection closed");
    }

}