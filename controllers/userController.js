import User from "../models/userModel.js"; // Assuming user model is in the models directory
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { clearCookies } from "../services/cookieClear.js";
import cloudinary from "cloudinary"
import { deletePostsByUser } from "./postController.js";
const SECRET_KEY = "supersecretkey"; // Change this to a secure key

// Create a new user
export async function createUser(req, res) {
  try {
    console.log("Request Body:", req.body.password); // Debugging

    if (!req.body || !req.body.email || !req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Invalid request: Missing required fields" });
    }

    const userFound = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });

    if (userFound) {
      return res.status(400).json({ message: "Bad Credentials: Such user already exists" });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      SECRET_KEY
    ).toString();

    const user = new User({ ...req.body, password: encryptedPassword });
    await user.save();
    
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
}


// Register a new user
export async function registerUser(req, res) {
  try {
    const {email,password} = req.body
    console.log("Request body:", req.body);
    console.log("Username:", req.body.username, "Type:", typeof req.body.username);

    
const emailExists = await User.findOne({ email: req.body.email });
if (emailExists) {
  return res.status(400).json({ message: "Email is already taken" });
}

// Check if username already exists
const usernameExists = await User.findOne({ username: req.body.username });
if (usernameExists) {
  return res.status(400).json({ message: "Username is already taken" });
}


    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Encrypt the password before saving
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      SECRET_KEY
    ).toString();

    const user = new User({ ...req.body, password: encryptedPassword });
    await user.save();

    res.status(201).json({...user, message:"User Registered Successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Login user
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Decrypt stored password
    const decryptedPassword = CryptoJS.AES.decrypt(
      foundUser.password,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
      "supersecretkey"
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict"
    });
    res.status(200).json({ token, user: foundUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all users
export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get a single user by ID
export async function getUserById(req, res) {
  console.log("User search by ID");
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getUserByUserName(req, res) {
  console.log("User search by UserName");
  
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Use 500 for server errors
  }
}

export async function getUserBySelf(req, res) {
  console.log("User search by Self");
  
  try {
    const token = req.cookies.token;
    console.log(token);
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ username: decoded.username });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}


// Update user by ID
export async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const cloud = cloudinary.v2
cloud.config({
  cloud_name: "dbugoc8ov", // 🔹 Replace with your actual cloud name
  api_key: "286613335355767", // 🔹 Move this to an environment variable
  api_secret: "UpXo2g32FCzF_wKoBPba8GAW41g", // ❌ Never hardcode secrets! Use process.env.CLOUDINARY_API_SECRET
  secure: true,
});

export async function updateUserSelf(req, res) {
  try {
    const token = req.cookies.token;
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("req.files.profile_picture:    ", req.files.profile_picture);
    
    // If there is a file uploaded for the profile picture
    if (req.files && req.files.profile_picture) {
      const profilePic = req.files.profile_picture;

      // Upload the profile picture to Cloudinary
      const result = await cloudinary.uploader.upload(profilePic.tempFilePath, {
        folder: 'user_profile_pics', // Optional: Specify a folder on Cloudinary
      });

      // Add the Cloudinary URL to the request body to update the user
      req.body.profile_picture = result.secure_url; // Secure URL of the uploaded image
    }

    // Update the user with the new data (including the new profile picture URL if changed)
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Respond with the updated user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: error.message });
  }
}

// Delete user by ID
export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    deletePostsByUser(user_id)
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export function logoutUser(req,res) {
  try {
    res.clearCookie("token", { path: "/api" });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export function getRole(req, res) {
  const token = req.cookies.token; // Assuming the token is stored as an HTTP-only cookie
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const role = decoded.role; // Assuming the role is part of the token
    res.json({ role });
  } catch (error) {
    res.status(403).send('Forbidden');
  }
};
