import Comment from "../models/commentModel.js"; // Assuming comment model is in the models directory
import jwt from "jsonwebtoken"
const SECRET_KEY = "supersecretkey"; // Change this to a secure key

// Create a new comment
export async function createComment(req, res) {
  try {
    const {id} = await jwt.verify(req.cookies.token,SECRET_KEY)
    
    const commentObj = {...req.body,user_id:id}
    const comment = new Comment(commentObj);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all comments for a post
export async function getCommentsByPost(req, res) {
  try {
    const comments = await Comment.find({ post_id: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete comment by ID
export async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
