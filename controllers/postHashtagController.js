import PostHashtag from "../models/postHashtagModel.js"; // Assuming model exists

// Add a hashtag to a post
export async function createPostHashtag(req, res) {
  try {
    const postHashtag = new PostHashtag(req.body);
    await postHashtag.save();
    res.status(201).json(postHashtag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all hashtags for a post
export async function getHashtagsForPost(req, res) {
  try {
    const hashtags = await find({ post_id: req.params.postId });
    res.status(200).json(hashtags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a hashtag from a post
export async function deletePostHashtag(req, res) {
  try {
    const postHashtag = await findByIdAndDelete(req.params.id);
    if (!postHashtag) return res.status(404).json({ message: "PostHashtag not found" });
    res.status(200).json({ message: "PostHashtag deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
