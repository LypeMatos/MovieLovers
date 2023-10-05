import express from "express";

import { deleteReview, editReview, getReview, postReview } from "../Controllers/ReviewController.js";
import verifyToken from "../utils/VerifyToken.js";

const reviewRoutes = express.Router();

reviewRoutes.get('/review', getReview);
reviewRoutes.post('/review/:id', verifyToken, postReview);
reviewRoutes.patch('/review/:id', verifyToken, editReview);
reviewRoutes.delete('/review/:id', verifyToken, deleteReview);

export default reviewRoutes;