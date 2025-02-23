import { Schema, model } from "mongoose";

const postSchema = new Schema({
  description: { type: String, required: true },
  video_url: { type: String, required: true, note: 'Content of the post' },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  hashtags_id: { type: Schema.Types.ObjectId, ref: "Hashtags", required: true },
  status: { type: String, enum: ["published", "draft", "archived"], default: "published" },
  created_at: { type: Date, default: Date.now }
});

const Post = model("Post", postSchema);
export default Post;
