import express from "express";

import { deleteComment, editComment, getComment, postComment } from "../Controllers/CommentaryController.js";
import verifyToken from "../utils/VerifyToken.js";

const commentaryRoutes = express.Router();

commentaryRoutes.get('/comment/:id', getComment);
commentaryRoutes.post('/comment/:id', verifyToken, postComment);
commentaryRoutes.patch('/comment/:id', verifyToken, editComment);
commentaryRoutes.delete('/comment/:id', verifyToken, deleteComment);

export default commentaryRoutes;