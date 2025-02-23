import Notification from "../models/notificationModel.js"; // Assuming notification model is in the models directory

// Create a new notification
export async function createNotification(req, res) {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all notifications for a user
export async function getNotificationsForUser(req, res) {
  try {
    const notifications = await find({ user_id: req.params.userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Mark a notification as read
export async function markAsRead(req, res) {
  try {
    const notification = await findByIdAndUpdate(req.params.id, { is_read: true }, { new: true });
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete notification by ID
export async function deleteNotification(req, res) {
  try {
    const notification = await findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
