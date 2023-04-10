import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connUri = `mongodb+srv://${dbUser}:${dbPassword}@movielovers.v87jtns.mongodb.net/moviesdb?retryWrites=true&w=majority`;
export const client = new MongoClient(connUri);

try {
    await client.connect();
    console.log("Connected to Mongo");
} catch(error) {
    await client.close();
    console.log("Connection closed");
}

export default client;