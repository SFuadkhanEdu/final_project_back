import { Schema, model } from "mongoose";

const postHashtagSchema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  hashtag_id: { type: Schema.Types.ObjectId, ref: "Hashtag", required: true }
});

const PostHashtag = model("PostHashtag", postHashtagSchema);
export default PostHashtag;