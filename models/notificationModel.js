import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ['follow', 'like', 'comment', 'message'], required: true },
  related_id: { type: Schema.Types.ObjectId, required: true },
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const Notification = model("Notification", notificationSchema);
export default Notification;
