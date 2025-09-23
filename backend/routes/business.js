import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  registerBusiness,
  getMyBusinesses,
  updateBusiness
} from "../controllers/businessController.js";

const router = express.Router();

// Business routes
router.post("/registerBusiness", authMiddleware, registerBusiness);
router.get("/getMyBusinesses", authMiddleware, getMyBusinesses);
router.put("/:id", authMiddleware, updateBusiness);

export default router;