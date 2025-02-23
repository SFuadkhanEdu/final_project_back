import { Router } from "express";
const router = Router();
import { createPost, getAllPosts, getPostById, updatePost, deletePost, getPostByUserId } from "../controllers/postController.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/posts",upload.single("video"), createPost);
router.get("/posts", getAllPosts);
router.get("/posts/user/:user_id", getPostByUserId);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
