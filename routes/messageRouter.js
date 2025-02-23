import { Router } from "express";
const router = Router();
import { sendMessage, getMessagesBetweenUsers, markMessageAsRead, deleteMessage, getAllMessages } from "../controllers/messageController.js";

router.post("/messages", sendMessage);  // Send a new message
router.get("/messages", getAllMessages);  // Get messages between two users
router.get("/messages/:user_id2", getMessagesBetweenUsers);  // Get messages between two users
router.put("/messages/:id", markMessageAsRead);  // Mark message as read
router.delete("/messages/:id", deleteMessage);  // Delete a message

export default router;
