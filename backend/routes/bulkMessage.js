import express from "express";
import { sendBulkMessage } from "../controllers/bulkMessageController.js";
import { getBulkStats } from "../controllers/messageStatsController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", authMiddleware, sendBulkMessage);
router.get("/stats", authMiddleware, getBulkStats);

export default router;