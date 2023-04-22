import express from "express";
import { handleRefreshToken, loginUser, registerUser, verifyUser } from "../Controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.get("/refresh", handleRefreshToken);
userRoutes.post("/register", registerUser);
userRoutes.post("/auth/login", loginUser);
userRoutes.post("/verifyemail/:id", verifyUser);

export default userRoutes;