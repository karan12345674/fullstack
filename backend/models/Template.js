// import mongoose from "mongoose";

// const buttonSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   action: { type: String, required: true }
// });

// const templateSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   type: { type: String, enum: ["image", "video", "none"], default: "none" },
//   description: { type: String },
//   buttons: [buttonSchema],
//   fileUrl: { type: String }, // image/video URL
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Template", templateSchema);



// import mongoose from "mongoose";

// const buttonSchema = new mongoose.Schema({
//   type: { type: String, enum: ["call-to-action", "quick-reply"], required: true },
//   text: { type: String, required: true },
//   url: { type: String, default: "" } // Only for call-to-action buttons
// });

// const templateSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   language: { type: String, default: "English" },
//   broadcastType: { type: String, enum: ["none", "text", "image", "video", "document"], default: "none" },
//   body: { type: String, required: true },
//   footer: { type: String, default: "" },
//   buttons: [buttonSchema],
//   fileUrl: { type: String }, // URL of uploaded image/video/document
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Template", templateSchema);




import mongoose from "mongoose";

const buttonSchema = new mongoose.Schema({
  type: { type: String, enum: ["call-to-action", "quick-reply"], required: true },
  text: { type: String, required: true },
  url: { type: String, default: "" } // Only for call-to-action buttons
});

const templateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  language: { type: String, required: true },
  broadcastType: { type: String, enum: ["none", "text", "image", "video", "document"], default: "none" },
  body: { type: String, required: true },
  footer: { type: String, default: "" },
  buttons: [buttonSchema],
  fileUrl: { type: String, default: "" }, // image/video/document URL
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Template", templateSchema);