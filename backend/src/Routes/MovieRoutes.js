import express from "express";

//Controller
import { getAllMovies, getMovieById } from "../Controllers/MovieController.js";

//utils
import { verifyToken } from "../utils/VerifyToken.js";

const movieRoutes = express.Router();

movieRoutes.get("/", getAllMovies);
movieRoutes.get("/movie/:id", getMovieById);

export default movieRoutes;