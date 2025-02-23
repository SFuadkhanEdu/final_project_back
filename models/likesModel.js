import { Schema, model } from "mongoose";

const likeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  created_at: { type: Date, default: Date.now }
});

const Like = model("Like", likeSchema);
export default Like;
