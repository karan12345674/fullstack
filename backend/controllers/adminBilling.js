import express from "express";
import UserSubscription from "../models/UserSubscription.js";
import User from "../models/User.js";
const router = express.Router();

// GET /api/admin/billing/invoices
router.get("/invoices", async (req, res) => {
  try {
    // fetch all subscriptions + populate user
    const subscriptions = await UserSubscription.find({})
      .populate("userId", "name email");

    // map for frontend
    const invoices = subscriptions.map(sub => ({
      id: sub._id,
      invoice_number: `INV-${sub._id.toString().slice(-4)}`,
      client_id: sub.userId?.name || "Unknown",
      invoice_date: sub.createdAt,
      total_amount: sub.payment?.amount || 0,
      status: sub.type === "paid" ? "paid" : "draft"
    }));

    res.json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;