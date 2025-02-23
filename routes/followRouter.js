import { Router } from "express";
const router = Router();
import { followUser, getFollowers, getFollowing, unfollowUser } from "../controllers/followController.js";

router.post("/follows", followUser);
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);
router.delete("/follows/:id", unfollowUser);

export default router;
