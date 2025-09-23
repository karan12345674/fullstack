import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });
import Subscription from "../models/Subscription.js";

export const createCheckout = async (req,res)=>{
  const { plan } = req.body;
  // In production create Stripe checkout session. Here return a mock URL
  res.json({ url: "https://checkout.stripe.com/pay/cs_test_example" });
};

export const activatePlan = async (req,res)=>{
  const { plan } = req.body;
  const limits = { basic:2000, pro:10000, premium:50000 }[plan] || 2000;
  const expiry = new Date(); expiry.setMonth(expiry.getMonth()+1);
  let sub = await Subscription.findOne({ user: req.user._id });
  if(!sub) sub = await Subscription.create({ user: req.user._id, plan, messagesLeft: limits, expiry });
  sub.plan = plan; sub.messagesLeft = limits; sub.expiry = expiry; await sub.save();
  res.json({ success:true, subscription: sub });
};

export const getMySubscription = async (req,res)=>{
  const sub = await Subscription.findOne({ user: req.user._id });
  res.json(sub || { plan: "none" });
};