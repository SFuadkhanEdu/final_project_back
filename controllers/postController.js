import Post from "../models/postModel.js"; // Assuming post model is in the models directory
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken"
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";



const cloud = cloudinary.v2;

// ✅ Configure Cloudinary correctly
cloud.config({
  cloud_name: "dbugoc8ov", // 🔹 Replace with your actual cloud name
  api_key: "286613335355767", // 🔹 Move this to an environment variable
  api_secret: "UpXo2g32FCzF_wKoBPba8GAW41g", // ❌ Never hardcode secrets! Use process.env.CLOUDINARY_API_SECRET
  secure: true,
});

// ✅ Middleware to Verify Token from Cookie
export async function createPost(req, res) {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file); // ✅ Check if file is received

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    // ✅ Upload to Cloudinary
    const result = await cloud.uploader.upload_stream(
      { resource_type: "video" },
      async (error, cloudinaryResponse) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ message: "Upload failed" });
        }

        // ✅ Save to MongoDB
        const { title, description, category_id } = req.body;
        const decodedToken = jwt.verify(req.cookies.token, SECRET_KEY);
        console.log("DECODED: ", decodedToken);
        
        const user_id =  decodedToken.id;
        console.log("USER: ", user_id);
        
        const newPost = new Post({
          title,
          description,
          user_id,
          category_id,
          video_url: cloudinaryResponse.secure_url,
        });

        await newPost.save();
        res.status(201).json(newPost);
      }
    );

    result.end(req.file.buffer); // ✅ Fix: Send file buffer to Cloudinary
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get all posts
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get a single post by ID
export async function getPostById(req, res) {
  try {
    console.log("user_id: ", req.params.user_id);

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export async function getPostByUserId(req, res) {
  try {
    // console.log("user_id: ", req.params.user_id);
    const posts = await Post.find({ user_id: req.params.user_id });
    
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


// Update post by ID
export async function updatePost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete post by ID
export async function deletePost(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // If the post has a video, delete it from Cloudinary
    if (post.video_url) {
      const publicId = post.video_url.split("/").pop().split(".")[0];
      await cloudinary.v2.uploader.destroy(publicId, {
        resource_type: "video",
      });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deletePostsByUser(user_id) {
  try {
    // Find all posts belonging to the user
    const posts = await Post.find({ user_id });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    // Delete all posts from the database
    await Post.deleteMany({ user_id });

    // Delete all associated videos from Cloudinary
    for (const post of posts) {
      if (post.video_url) {
        const publicId = post.video_url.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(publicId, {
          resource_type: "video",
        });
      }
    }
    console.log(posts.length+ " posts deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Error deleting posts", error: error.message });
  }
}
