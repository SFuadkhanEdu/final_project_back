import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Comment = model("Comment", commentSchema);
export default Comment;
