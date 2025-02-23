import { Router } from "express";
const router = Router();
import { createNotification, getNotificationsForUser, markAsRead, deleteNotification } from "../controllers/notificationController.js";

router.post("/notifications", createNotification);
router.get("/notifications/:userId", getNotificationsForUser);
router.put("/notifications/:id", markAsRead);
router.delete("/notifications/:id", deleteNotification);

export default router;
