// controllers/adminController.js
import User from "../models/User.js";
import UserSubscription from "../models/UserSubscription.js";

export const getDashboardStats = async (req, res) => {
  try {
    // 1️⃣ Total clients
    const totalClients = await User.countDocuments();

    // 2️⃣ Active subscriptions
    const activeSubs = await UserSubscription.find({ 
      isActive: true,
      endDate: { $gte: new Date() } 
    });

    // 3️⃣ Free trial active
    const freeTrialActive = activeSubs.filter(s => s.type === "free-trial").length;

    // 4️⃣ Paid active
    const paidActive = activeSubs.filter(s => s.type === "paid").length;

    // 5️⃣ Inactive / expired
    const inactiveSubs = await UserSubscription.countDocuments({
      endDate: { $lt: new Date() }
    });

    // 6️⃣ Revenue
    const revenueAggregate = await UserSubscription.aggregate([
      { $match: { type: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$payment.amount" } } }
    ]);

    const revenue = revenueAggregate.length > 0 ? revenueAggregate[0].totalRevenue : 0;

    res.json({
      totalClients,
      activeSubscriptions: activeSubs.length,
      freeTrialActive,
      paidActive,
      inactiveSubscriptions: inactiveSubs,
      revenue
    });

  } catch (err) {
    console.error("❌ getDashboardStats error:", err);
    res.status(500).json({ message: err.message });
  }
};