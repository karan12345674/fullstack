// import express from "express";
// import { createOrder, saveSubscription } from "../controllers/subscriptionController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// // Create Razorpay Order
// router.post("/order",authMiddleware, createOrder);

// // Save subscription after payment success
// router.post("/save",authMiddleware, saveSubscription);

// export default router;










import express from "express";
import { createOrder, verifyAndSaveSubscription } from "../controllers/subscriptionController.js";
import {authMiddleware} from "../middleware/auth.js";

const router = express.Router();

router.post("/order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyAndSaveSubscription);

export default router;