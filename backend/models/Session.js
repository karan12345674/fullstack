import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  number: { type: String, required: true,  },
  sessionId: { type: String },
  status: { type: String, enum: ["pending","qr-expired","connected","disconnected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Session", SessionSchema);
