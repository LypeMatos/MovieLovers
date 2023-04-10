//dotenv
import dotenv from "dotenv";
dotenv.config();

//express
import express from "express";
import cors from "cors";

//Routes
import movieRoutes from "./Routes/MovieRoutes.js";

const port = process.env.SERVER_PORT || 3000;
const server = express();

server.use(express.json());
server.use(cors());
server.use(movieRoutes);

server.listen(port, () => console.log(`Server is running on port ${port}!`));