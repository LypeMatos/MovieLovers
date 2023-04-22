import express from "express";

import { registerAdmin } from "../Controllers/AdminController.js";
import { verifyToken } from "../utils/VerifyToken.js";

const adminRoutes = express.Router();

adminRoutes.post("/admin/auth", registerAdmin);
adminRoutes.get("/teste", verifyToken, (req, res) => {
    res.send("Teste");
})

export default adminRoutes;