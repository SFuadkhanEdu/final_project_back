import Message from "../models/messageModel.js"; // Assuming model exists
import jwt from "jsonwebtoken"
// Send a new message
const SECRET_KEY = "supersecretkey"; // Change this to a secure key

export async function sendMessage(req, res) {
  try {
    const {id} = await jwt.verify(req.cookies.token, SECRET_KEY)

    
    const message = new Message({...req.body,sender_id:id});
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: error.message });
  }
}

// Get all messages between two users
export async function getMessagesBetweenUsers(req, res) {
  try {
    const {id} = jwt.verify(req.cookies.token,SECRET_KEY)

    console.log(req.params.user_id2);
    
    const messages = await Message.find({
      $or: [
        { sender_id: id, receiver_id: req.params.user_id2 },
        { sender_id: req.params.user_id2, receiver_id: id },
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: error.message });
  }
}
export async function getAllMessages(req, res) {
  try {
    
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: error.message });
  }
}

// Mark a message as read
export async function markMessageAsRead(req, res) {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { is_read: true }, { new: true });
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a message
export async function deleteMessage(req, res) {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
