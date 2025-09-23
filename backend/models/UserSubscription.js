// models/UserSubscription.js
import mongoose from "mongoose";

const userSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["free-trial","paid"], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  payment: {
    paymentId: String,   // payment gateway transaction id
    amount: Number,
    planName: String
  }
});

export default mongoose.model("UserSubscription", userSubscriptionSchema);