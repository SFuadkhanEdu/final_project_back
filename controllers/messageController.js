import Message from "../models/messageModel.js"; // Assuming model exists

// Send a new message
export async function sendMessage(req, res) {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all messages between two users
export async function getMessagesBetweenUsers(req, res) {
  try {
    const messages = await find({
      $or: [
        { sender_id: req.params.user1, receiver_id: req.params.user2 },
        { sender_id: req.params.user2, receiver_id: req.params.user1 },
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Mark a message as read
export async function markMessageAsRead(req, res) {
  try {
    const message = await findByIdAndUpdate(req.params.id, { is_read: true }, { new: true });
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a message
export async function deleteMessage(req, res) {
  try {
    const message = await findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
