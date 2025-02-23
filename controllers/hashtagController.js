import Hashtag from "../models/hashtagModel.js"; // Assuming model exists

// Create a new hashtag
export async function createHashtag(req, res) {
  try {
    // Check if hashtag already exists
    const existingHashtag = await Hashtag.findOne({ name: req.body.name });
    if (existingHashtag) {
      return res.status(400).json({ message: "Hashtag already exists" });
    }

    const hashtag = new Hashtag(req.body);
    await hashtag.save();
    res.status(201).json(hashtag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all hashtags
export async function getAllHashtags(req, res) {
  try {
    const hashtags = await Hashtag.find();
    res.status(200).json(hashtags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get a single hashtag by ID
export async function getHashtagById(req, res) {
  try {
    const hashtag = await Hashtag.findById(req.params.id);
    if (!hashtag) return res.status(404).json({ message: "Hashtag not found" });
    res.status(200).json(hashtag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update a hashtag
export async function updateHashtag(req, res) {
  try {
    const hashtag = await Hashtag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hashtag) return res.status(404).json({ message: "Hashtag not found" });
    res.status(200).json(hashtag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a hashtag
export async function deleteHashtag(req, res) {
  try {
    const hashtag = await Hashtag.findByIdAndDelete(req.params.id);
    if (!hashtag) return res.status(404).json({ message: "Hashtag not found" });
    res.status(200).json({ message: "Hashtag deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
