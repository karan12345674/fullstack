// models/MessageLog.js
import mongoose from "mongoose";

const messageLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
  sessionId: { type: String },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ["sent","failed","replied"], default: "sent" },
  messageId: { type: String },
  replyMessage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("MessageLog", messageLogSchema);