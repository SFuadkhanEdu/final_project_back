import { Router } from "express";
const router = Router();
import { createPostHashtag, getHashtagsForPost, deletePostHashtag } from "../controllers/postHashtagController.js";

router.post("/postHashtags", createPostHashtag);
router.get("/postHashtags/:postId", getHashtagsForPost);
router.delete("/postHashtags", deletePostHashtag);

export default router;
