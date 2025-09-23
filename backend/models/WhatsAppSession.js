import mongoose from "mongoose";

const WhatsAppSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  businessId: { type: String, required: true },
  phoneNumber: { type: String },
  status: { type: String, enum: ["pending","connected","disconnected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  lastSeenAt: { type: Date },
  // store venom internal info if needed
  meta: { type: mongoose.Schema.Types.Mixed }
});

export default mongoose.model("WhatsAppSession", WhatsAppSessionSchema);