// import mongoose from "mongoose";

// const broadcastSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // broadcast का नाम
//     message: { type: String, required: true }, // message text
//     recipients: { type: Number, default: 0 }, // कितनों को भेजना था
//     sentCount: { type: Number, default: 0 },
//     deliveredCount: { type: Number, default: 0 },
//     readCount: { type: Number, default: 0 },
//     repliedCount: { type: Number, default: 0 },
//     failedCount: { type: Number, default: 0 },
//     status: {
//       type: String,
//       enum: ["queued", "sending", "processed", "completed", "failed"],
//       default: "queued",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Broadcast", broadcastSchema);















// import mongoose from "mongoose";

// const BroadcastSchema = new mongoose.Schema({
//   name: { type: String, default: "User Messages" },
//   sentCount: { type: Number, default: 0 },
//   deliveredCount: { type: Number, default: 0 },
//   readCount: { type: Number, default: 0 },
//   repliedCount: { type: Number, default: 0 },
//   failedCount: { type: Number, default: 0 },
// }, { timestamps: true });

// export default mongoose.model("Broadcast", BroadcastSchema);








import mongoose from "mongoose";

const BroadcastSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ किस user ने भेजा
  name: { type: String, default: "User Messages" },
  sentCount: { type: Number, default: 0 },
  deliveredCount: { type: Number, default: 0 },
  readCount: { type: Number, default: 0 },
  repliedCount: { type: Number, default: 0 },
  failedCount: { type: Number, default: 0 },
  status: { type: String, default: "sending" }, // optional: sending/processed/queued etc.
}, { timestamps: true });

export default mongoose.model("Broadcast", BroadcastSchema);
