import { Router } from "express";
const router = Router();
import { createLike,getLikesByUser, getLikesByPost, deleteLike, getAllLikes } from "../controllers/likesController.js";
router.get("/likes", getAllLikes);
router.post("/likes", createLike);
router.get("/likes/post/:postId", getLikesByPost);
router.get("/likes/user/:userId", getLikesByUser);
router.delete("/likes/:id", deleteLike);

export default router;
