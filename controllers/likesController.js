import Like from "../models/likesModel.js"; // Assuming like model is in the models directory
import jwt from "jsonwebtoken"
const SECRET_KEY = "supersecretkey"; // Change this to a secure key


export async function getAllLikes(req, res) {
  try {
    const allLikes = await Like.find();
    res.status(200).json(allLikes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function createLike(req, res) {
  try {
    // Get token from headers or cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    // Verify the token
    const decoded = jwt.verify(token,SECRET_KEY);
    const user_id = decoded.id; // Extract user ID from token

    // Get post_id from request body
    const { post_id } = req.body;
    if (!post_id) return res.status(400).json({ message: "Post ID is required" });

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ user_id, post_id });

    if (existingLike) {
      // Unlike if already liked
      await Like.deleteOne({ _id: existingLike._id });
      const likesCount = await Like.countDocuments({ post_id });
      return res.status(200).json({ success: true, liked: false, likesCount });
    }

    // Create new like
    const like = new Like({ user_id, post_id });
    await like.save();

    // Get updated likes count
    const likesCount = await Like.countDocuments({ post_id });

    res.status(201).json({ success: true, liked: true, likesCount });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}


// Get all likes for a post
export async function getLikesByPost(req, res) {
  try {
    console.log("post_id",req.params.postId);
    
    const likes = await Like.find({ post_id: req.params.postId });
    res.status(200).json(likes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get likes by user
export async function getLikesByUser(req, res) {
  try {
    console.log("user_id",req.params.userId);

    const likes = await Like.find({ user_id: req.params.userId });
    res.status(200).json(likes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a like by ID
export async function deleteLike(req, res) {
  try {
    const like = await Like.findByIdAndDelete(req.params.id);
    if (!like) return res.status(404).json({ message: "Like not found" });
    res.status(200).json({ message: "Like deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
