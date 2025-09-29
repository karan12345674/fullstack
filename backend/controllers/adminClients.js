import express from "express";
import User from "../models/User.js";
import UserSubscription from "../models/UserSubscription.js";

const router = express.Router();

// GET /api/admin/clients
router.get("/", async (req, res) => {
  try {
    // all users
    const users = await User.find({});

    // all subscriptions (latest subscription for each user)
    const subs = await UserSubscription.find({})
      .populate("userId")
      .sort({ endDate: -1 });

    const clients = users.map(user => {
      const sub = subs.find(s => s.userId._id.toString() === user._id.toString());

      let status = "trial";
      let plan = "Free Trial";
      let monthlySpend = 0;

      if (sub) {
        if (sub.type === "paid" && sub.isActive && sub.endDate >= new Date()) {
          status = "active";
          plan = "Paid Plan";
          monthlySpend = sub.payment?.amount || 0;
        } else if (sub.type === "free-trial" && sub.endDate >= new Date()) {
          status = "trial";
          plan = "Free Trial";
          monthlySpend = 0;
        } else if (sub.endDate && sub.endDate < new Date()) {
          status = "past_due";
          plan = sub.type === "paid" ? "Paid Plan" : "Free Trial";
          monthlySpend = sub.payment?.amount || 0;
        }
      }

      return {
        id: user._id,
        company_name: user.name,
        contact_email: user.email,
        plan_tier: plan,
        status,
        signup_date: user.createdAt,
        monthly_spend: monthlySpend
      };
    });

    res.json(clients);
  } catch (err) {
    console.error("❌ Error fetching clients:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;