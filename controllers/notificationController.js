import Notification from "../models/notificationModel.js";
import jwt from "jsonwebtoken";

// 📌 Create a new notification
export async function createNotification(req, res) {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// 📌 Get all notifications for the logged-in user
export async function getNotificationsForUser(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    const notifications = await Notification.find({ user_id }).sort({ created_at: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// 📌 Mark a notification as read
export async function markAsRead(req, res) {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { is_read: true },
      { new: true }
    );

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// 📌 Delete a notification by ID
export async function deleteNotification(req, res) {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
