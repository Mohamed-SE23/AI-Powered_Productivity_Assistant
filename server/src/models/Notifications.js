import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    type: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
    read: { type: Boolean, default: false },
  });

export default mongoose.model("Notification", NotificationSchema);
