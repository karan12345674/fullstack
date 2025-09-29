import express from "express";
import { startSession, getQR, disconnectSession, sendBulkMessages, loadUserSessions } from "../controllers/whatsappController.js";
import { authMiddleware } from "../middleware/auth.js";
import checkSubscription from "../middleware/checkSubscription.js";

const router = express.Router();

// Start WhatsApp session
router.post("/start-session", authMiddleware,checkSubscription, startSession);

// Get QR/status for a number
router.get("/qr/:number", authMiddleware, getQR);

// Disconnect a session
router.post("/disconnect-session", authMiddleware, disconnectSession);

// Send bulk messages
router.post("/send-bulk", authMiddleware,checkSubscription, sendBulkMessages);

// ✅ Get all sessions for logged-in user (userId from token)
router.get("/user-sessions", authMiddleware, async (req, res) => {
  try {
    const sessions = await loadUserSessions(req.userId); // userId comes from auth middleware
    res.json({ sessions });
  } catch (err) {
    console.error("Failed to fetch user sessions:", err);
    res.status(500).json({ message: "Failed to fetch user sessions" });
  }
});

export default router;
