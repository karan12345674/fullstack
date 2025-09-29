// controllers/planController.js
import Plan from "../models/Plan.js";

/**
 * Create a new Plan (Admin use only)
 */
export const createPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      monthlyPrice,
      annualPrice,
      messageLimit,
      duration,
      color,
      icon,
      popular,
      features
    } = req.body;

    // Required fields check
    if (!name || !description || !monthlyPrice || !annualPrice || !messageLimit || !duration) {
      return res.status(400).json({ success: false, message: "Name, description, monthlyPrice, annualPrice, messageLimit, and duration are required" });
    }

    const plan = new Plan({
      name,
      description,
      monthlyPrice,
      annualPrice,
      messageLimit,
      duration,
      color: color || "blue",
      icon: icon || "Zap",
      popular: popular || false,
      features: features || []
    });

    await plan.save();
    res.json({ success: true, plan });

  } catch (err) {
    console.error("Error creating plan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get all plans
 */
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json({ success: true, plans });
  } catch (err) {
    console.error("Error fetching plans:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get single plan by ID
 */
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }
    res.json({ success: true, plan });
  } catch (err) {
    console.error("Error fetching plan:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};