// routes/planRoutes.js
import express from "express";
import { createPlan, getPlans, getPlanById } from "../controllers/planController.js";

const router = express.Router();

// POST - create new plan (admin use)
router.post("/", createPlan);

// GET - all plans
router.get("/", getPlans);

// GET - single plan by id
router.get("/:id", getPlanById);

export default router;