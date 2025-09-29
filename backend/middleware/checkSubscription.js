// subscriptionMiddleware.js
import UserSubscription from "../models/UserSubscription.js";

const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.userId; // Assume auth middleware se aa raha hai

    // Get active subscription for user
    const subscription = await UserSubscription.findOne({
      userId,
      isActive: true,
      endDate: { $gte: new Date() }, // Check if endDate is in future
    }).sort({ endDate: -1 }); // agar multiple ho to latest le lo

    if (!subscription) {
      return res.status(403).json({
        message: "No active subscription! Please start free trial or subscribe.",
      });
    }

    // Free trial or paid subscription dono allowed
    if (subscription.type === "free-trial" || subscription.type === "paid") {
      req.subscription = subscription; // optional, route me use kar sakte ho
      return next();
    }

    // Default block
    return res.status(403).json({
      message: "Subscription expired or not valid.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default checkSubscription;
