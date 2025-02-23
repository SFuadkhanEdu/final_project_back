import Follow from "../models/followModel.js"; // Assuming model exists

// Follow a user
export async function followUser(req, res) {
  try {
    const follow = new Follow({
      following_user_id: req.body.following_user_id,
      followed_user_id: req.body.followed_user_id,
    });
    await follow.save();
    res.status(201).json(follow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get followers of a user
export async function getFollowers(req, res) {
  try {
    const followers = await find({ followed_user_id: req.params.userId });
    res.status(200).json(followers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get users that a user is following
export async function getFollowing(req, res) {
  try {
    const following = await find({ following_user_id: req.params.userId });
    res.status(200).json(following);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Unfollow a user
export async function unfollowUser(req, res) {
  try {
    const follow = await findByIdAndDelete(req.params.id);
    if (!follow) return res.status(404).json({ message: "Follow record not found" });
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
