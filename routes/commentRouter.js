import { Router } from "express";
const router = Router();
import { createComment, getCommentsByPost, deleteComment } from "../controllers/commentController.js";

router.post("/comments", createComment);
router.get("/comments/:postId", getCommentsByPost);
router.delete("/comments/:id", deleteComment);

export default router;
