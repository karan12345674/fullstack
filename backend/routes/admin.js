// routes/admin.js
import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin dashboard stats
router.get("/dashboard", authMiddleware, getDashboardStats);

export default router;