import express from "express";
import { protect } from "../middleware/auth.js";
import { createCheckout, activatePlan, getMySubscription } from "../controllers/paymentsController.js";
const r = express.Router();
r.post("/checkout", protect, createCheckout);
r.post("/activate", protect, activatePlan);
r.get("/subscription", protect, getMySubscription);
export default r;