// // models/UserSubscription.js
// import mongoose from "mongoose";

// const userSubscriptionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   type: { type: String, enum: ["free-trial","paid"], required: true },
//   startDate: { type: Date, default: Date.now },
//   endDate: { type: Date, required: true },
//   isActive: { type: Boolean, default: true },
//   payment: {
//     paymentId: String,   // payment gateway transaction id
//     amount: Number,
//     planName: String
//   }
// });

// export default mongoose.model("UserSubscription", userSubscriptionSchema);


import mongoose from "mongoose";

const userSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  type: { type: String, enum: ["free-trial", "paid"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  payment: {
    paymentId: { type: String },   // Razorpay payment ID
    amount: { type: Number },      // Plan price
    planName: { type: String }     // Plan name
  }
}, { timestamps: true });

export default mongoose.model("UserSubscription", userSubscriptionSchema);