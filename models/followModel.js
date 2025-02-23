import { Schema, model } from "mongoose";

const followSchema = new Schema({
  following_user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  followed_user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now }
});

const Follow = model("Follow", followSchema);
export default Follow;
