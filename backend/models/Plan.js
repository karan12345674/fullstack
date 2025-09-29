import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },            // e.g. "Starter"
  description: { type: String, required: true },     // e.g. "Perfect for small teams"
  monthlyPrice: { type: Number, required: true },    // e.g. 1500
  annualPrice: { type: Number, required: true },     // e.g. 1200
  messageLimit: { type: Number, required: true },    // e.g. 2000
  duration: { type: Number, required: true },        // e.g. 30 days
  color: { type: String, default: "blue" },          // e.g. "blue", "purple", "pink"
  icon: { type: String, default: "Zap" },           // icon name as string, e.g. "Zap", "Star"
  popular: { type: Boolean, default: false },        // highlight popular plan
  features: { type: [String], default: [] }          // list of features
}, { timestamps: true });

export default mongoose.model("Plan", planSchema);