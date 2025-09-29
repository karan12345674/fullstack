// routes/admin.js
import express from "express";
import User from "../models/User.js";
import UserSubscription from "../models/UserSubscription.js";

const router = express.Router();

// GET /api/admin/clientprofile/:userId
router.get("/clientprofile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find latest subscription for the client
    const subscription = await UserSubscription.findOne({ userId }).sort({ createdAt: -1 });

    res.json({
      company_name: user.name,
      contact_name: user.name,
      contact_email: user.email,
      status: subscription ? subscription.type === "free-trial" ? "trial" : "active" : "cancelled",
      signup_date: user.createdAt,
      plan_tier: subscription ? subscription.type : "No Plan",
      monthly_spend: subscription?.payment?.amount || 0,
      messages_sent_month: subscription?.messages_sent || 0,
      ai_enabled: subscription?.ai_enabled || false,
      api_key: subscription?.api_key || "",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;