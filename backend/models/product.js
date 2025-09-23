import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String, // optional - image URL ya path
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // dukaan owner
}, { timestamps: true });

export default mongoose.model("Product", productSchema);