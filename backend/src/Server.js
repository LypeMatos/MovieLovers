//dotenv
import dotenv from "dotenv";
dotenv.config();

//express
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//Database
import { connection } from "./Database/ConnectDB.js";

//Routes
import movieRoutes from "./Routes/MovieRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import commentaryRoutes from "./Routes/CommentaryRoutes.js";

const port = process.env.SERVER_PORT || 3000;
const server = express();

connection();

const whitelist = [
    "http://localhost:5173",
    "http://localhost:8080"
]

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true);
        }else {
            callback(new Error("Not Allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
}

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use(movieRoutes, userRoutes, commentaryRoutes);

server.listen(port, () => console.log(`Server is running on port ${port}!`));