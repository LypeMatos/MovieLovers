import express from "express";
import { registerUser } from "../Controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

export default userRoutes;