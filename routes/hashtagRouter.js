import { Router } from "express";
const router = Router();
import { createHashtag, getAllHashtags, getHashtagById, updateHashtag, deleteHashtag } from "../controllers/hashtagController.js";

router.post("/hashtags", createHashtag);
router.get("/hashtags", getAllHashtags);
router.get("/hashtags/:id", getHashtagById);
router.put("/hashtags/:id", updateHashtag);
router.delete("/hashtags/:id", deleteHashtag);

export default router;
