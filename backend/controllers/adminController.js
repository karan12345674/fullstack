import express from "express";
import User from "../models/User.js";
import UserSubscription from "../models/UserSubscription.js";

const router = express.Router();

// Active clients, trial clients, total messages, revenue, system health
router.get("/dashboard", async (req, res) => {
  try {
    const clients = await UserSubscription.find()
      .populate("userId", "name email")
      .lean();

    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === "active").length;
    const trialClients = clients.filter(c => c.type === "free-trial").length;
    const totalMessages = clients.reduce((acc, c) => acc + (c.messages_sent_month || 0), 0);
    const monthlyRevenue = clients.reduce((acc, c) => acc + (c.payment?.amount || 0), 0);
    const systemHealth = 99.9; // optional: calculate based on errors if available

    // Revenue per month
    const revenueMap = {};
    clients.forEach(c => {
      const month = new Date(c.createdAt).toLocaleString("default", { month: "short" });
      revenueMap[month] = (revenueMap[month] || 0) + (c.payment?.amount || 0);
    });
    const revenueData = Object.keys(revenueMap).map(month => ({
      month,
      revenue: revenueMap[month]
    }));

    // Plan distribution
    const planDistributionMap = {
      "Free Trial": 0,
      Starter: 0,
      Professional: 0,
      Enterprise: 0
    };
    clients.forEach(c => {
      if (c.type === "free-trial") planDistributionMap["Free Trial"]++;
      else if (c.plan === "starter") planDistributionMap["Starter"]++;
      else if (c.plan === "professional") planDistributionMap["Professional"]++;
      else if (c.plan === "enterprise") planDistributionMap["Enterprise"]++;
    });
    const planDistribution = Object.keys(planDistributionMap).map(name => ({
      name,
      value: planDistributionMap[name]
    }));

    // Alerts (static example, replace with DB if needed)
    const alerts = [
      { id: 1, title: "System Maintenance Scheduled", description: "Planned downtime at midnight.", severity: "medium", created_date: new Date() },
      { id: 2, title: "New Client Surge", description: "Spike in sign-ups detected.", severity: "low", created_date: new Date() },
      { id: 3, title: "High Error Rate", description: "API error rate exceeded 5% in last 10 mins.", severity: "critical", created_date: new Date() }
    ];

    // Latest clients
    const latestClients = clients.slice(-8).map(c => ({
      id: c._id,
      company_name: c.userId.name,
      status: c.status,
      signup_date: c.createdAt,
      monthly_spend: c.payment?.amount || 0,
      messages_sent_month: c.messages_sent_month || 0
    }));

    res.json({
      totalClients,
      activeClients,
      trialClients,
      totalMessages,
      monthlyRevenue,
      systemHealth,
      revenueData,
      planDistribution,
      alerts,
      clients: latestClients
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;