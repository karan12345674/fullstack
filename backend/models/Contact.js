import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // ✅ phone → phoneNumber
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contact", contactSchema);