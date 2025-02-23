import { Router } from "express";
const router = Router();
import { sendMessage, getMessagesBetweenUsers, markMessageAsRead, deleteMessage } from "../controllers/messageController.js";

router.post("/messages", sendMessage);
router.get("/messages/:userId", getMessagesBetweenUsers);
router.put("/messages/:id", markMessageAsRead);
router.delete("/messages/:id", deleteMessage);

export default router;
