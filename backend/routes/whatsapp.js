// import express from "express";
// import { generateQR, disconnectSession, getSessionStatus,getQR } from "../controllers/whatsappController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/generateQR", authMiddleware, generateQR);
// router.post("/disconnect", authMiddleware, disconnectSession);
// router.get("/status", authMiddleware, getSessionStatus);
// // Fetch QR for frontend polling
// router.get("/getQR", authMiddleware, getQR);

// export default router;



// backend/routes/whatsappRoutes.js
import express from "express";
import { generateQR, disconnectSession, getSessionStatus, } from "../controllers/whatsappController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Protected routes
router.post("/generateQR", authMiddleware, generateQR);
//router.get("/getQR", authMiddleware, getQR);
router.post("/disconnectSession", authMiddleware, disconnectSession);
router.post("/getSessionStatus", authMiddleware, getSessionStatus);

export default router;