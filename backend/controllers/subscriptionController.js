// import UserSubscription from "../models/UserSubscription.js";
// import Plan from "../models/Plan.js";
// import Razorpay from "razorpay";

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /**
//  * Create Razorpay Order for selected plan
//  */
// // POST /api/subscriptions/order
// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.userId; // middleware se aa raha
//     const { planId } = req.body;

//     const plan = await Plan.findById(planId);
//     if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

//     const options = {
//       amount: plan.monthlyPrice  * 100,
//       currency: "INR",
//       receipt: receipt_${Date.now()},
//     };

//     const order = await razorpay.orders.create(options);

//     res.json({ success: true, order, userId }); // userId bhi attach kar sakte
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// /**
//  * Save subscription after payment success
//  */
// // POST /api/subscriptions/save
// export const saveSubscription = async (req, res) => {
//   try {
//     const userId = req.userId; // middleware se
//     const { planId, paymentId } = req.body;

//     const plan = await Plan.findById(planId);
//     if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

//     const subscription = new UserSubscription({
//       userId,
//       planId,
//       type: "paid",
//       startDate: new Date(),
//       endDate: new Date(new Date().setDate(new Date().getDate() + plan.duration)),
//       isActive: true,
//       payment: {
//         paymentId,
//         amount: plan.price,
//         planName: plan.name,
//       }
//     });

//     await subscription.save();
//     res.json({ success: true, subscription });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };











// import UserSubscription from "../models/UserSubscription.js";
// import Plan from "../models/Plan.js";
// import Razorpay from "razorpay";
// import jwt from "jsonwebtoken";

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /**
//  * Create Razorpay Order for selected plan
//  */
// // POST /api/subscriptions/order
// export const createOrder = async (req, res) => {
//   try {
//     // userId middleware se aa raha hai, agar nahi aa raha to token decode karo
//     let userId = req.userId;
//     if (!userId) {
//       const token = req.headers.authorization?.split(" ")[1];
//       if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       userId = decoded.id;
//     }

//     const { planId } = req.body;
//     const plan = await Plan.findById(planId);
//     if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

//     const options = {
//       amount: plan.monthlyPrice * 100, // paisa me
//       currency: "INR",
//       receipt: receipt_${Date.now()},
//     };

//     const order = await razorpay.orders.create(options);

//     res.json({ success: true, order, userId });
//   } catch (err) {
//     console.error("Create order error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /**
//  * Save subscription after payment success
//  */
// // POST /api/subscriptions/save
// export const saveSubscription = async (req, res) => {
//   try {
//     let userId = req.userId;
//     if (!userId) {
//       const token = req.headers.authorization?.split(" ")[1];
//       if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       userId = decoded.id;
//     }

//     const { planId, paymentId } = req.body;
//     const plan = await Plan.findById(planId);
//     if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

//     const subscription = new UserSubscription({
//       userId,
//       planId,
//       type: "paid",
//       startDate: new Date(),
//       endDate: new Date(new Date().setDate(new Date().getDate() + plan.duration)),
//       isActive: true,
//       payment: {
//         paymentId,
//         amount: plan.monthlyPrice, // monthlyPrice use karo
//         planName: plan.name,
//       }
//     });

//     await subscription.save();
//     res.json({ success: true, subscription });
//   } catch (err) {
//     console.error("Save subscription error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };









import UserSubscription from "../models/UserSubscription.js";
import Plan from "../models/Plan.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * STEP 1: Create Razorpay Order
 */
// POST /api/subscriptions/order
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan)
      return res.status(404).json({ success: false, message: "Plan not found" });

    const options = {
      amount: plan.monthlyPrice * 100, // paise me
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // frontend ko key_id bhi bhej do
    res.json({
      success: true,
      order,
      plan,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error("Order create error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * STEP 2: Verify Payment & Save Subscription
 */
// POST /api/subscriptions/verify
export const verifyAndSaveSubscription = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Payment verified, save subscription
    const plan = await Plan.findById(planId);
    if (!plan)
      return res.status(404).json({ success: false, message: "Plan not found" });

    const subscription = new UserSubscription({
      userId,
      planId,
      type: "paid",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + plan.duration)),
      isActive: true,
      payment: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: plan.monthlyPrice,
        planName: plan.name,
      },
    });

    await subscription.save();

    res.json({ success: true, message: "Subscription activated", subscription });
  } catch (err) {
    console.error("Verify & Save error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};