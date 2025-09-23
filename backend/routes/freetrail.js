import express from "express";
import { startFreeTrial } from "../controllers/freetrailController.js";

const router = express.Router();

// Free Trial
router.post("/freetrial", startFreeTrial);

export default router;