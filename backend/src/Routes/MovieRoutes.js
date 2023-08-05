import express from "express";

//Controller
import { getAllMovies, getMovieById, movieLikes, movieRating } from "../Controllers/MovieController.js";

//utils
import verifyToken from "../utils/VerifyToken.js";

const movieRoutes = express.Router();

movieRoutes.get("/movies", getAllMovies);
movieRoutes.get("/movie/:id", getMovieById);
movieRoutes.patch("/movie/:id/like", verifyToken, movieLikes);
movieRoutes.patch("/movie/:id/rate", verifyToken, movieRating);

export default movieRoutes;