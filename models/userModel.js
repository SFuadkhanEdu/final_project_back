import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true , trim:true},
  email: { type: String, unique: true, required: true , trim:true},
  password: { type: String, required: true , trim:true},
  profile_picture: { type: String, default: "" , trim:true},
  bio: { type: String, default: "" , trim:true},
  role: { type: String, enum: ["user", "admin"], default: "user" },
  created_at: { type: Date, default: Date.now }
});

const User = model("User", userSchema);
export default User;
