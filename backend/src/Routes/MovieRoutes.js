import express from "express";

//Controller
import { getAllMovies } from "../Controllers/MovieController.js";

//utils
import { verifyToken } from "../utils/VerifyToken.js";

const movieRoutes = express.Router();

movieRoutes.get("/", getAllMovies);
movieRoutes.get("/movie/:id", verifyToken)

export default movieRoutes;