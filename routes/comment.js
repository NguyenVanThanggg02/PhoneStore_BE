import express from "express";
import { commentController } from "../controllers/index.js";

const commentRouter = express.Router();

commentRouter.get('/:id', commentController.getAllCommentByProductId)
commentRouter.delete('/:id', commentController.removeCommentById)
commentRouter.post("/", commentController.addComment);
commentRouter.put("/:id", commentController.updateComment);

export default commentRouter