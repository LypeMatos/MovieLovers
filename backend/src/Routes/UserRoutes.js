import express from "express";

//controllers
import { handleRefreshToken, loginUser, registerUser, userProfile, verifyUser } from "../Controllers/UserController.js";
//utils
import verifyToken from '../utils/VerifyToken.js';

const userRoutes = express.Router();

userRoutes.get("/refresh", handleRefreshToken);
userRoutes.get("/profile/:id", verifyToken, userProfile);
userRoutes.post("/register", registerUser);
userRoutes.post("/auth/login", loginUser);
userRoutes.post("/verifyemail/:id", verifyUser);

export default userRoutes;