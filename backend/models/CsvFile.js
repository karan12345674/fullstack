import mongoose from "mongoose";

const csvFileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("CsvFile", csvFileSchema);