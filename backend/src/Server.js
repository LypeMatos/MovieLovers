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

const port = process.env.SERVER_PORT || 3000;
const server = express();

connection();

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use(movieRoutes, userRoutes);

server.listen(port, () => console.log(`Server is running on port ${port}!`));