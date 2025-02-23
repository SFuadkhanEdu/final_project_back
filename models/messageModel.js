import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const Message = model("Message", messageSchema);
export default Message;
