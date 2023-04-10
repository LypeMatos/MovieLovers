import express from "express";

//Controller
import { getAllMovies } from "../Controllers/MovieController.js";

const movieRoutes = express.Router();

movieRoutes.get("/", getAllMovies);

export default movieRoutes;