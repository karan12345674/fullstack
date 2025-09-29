// import express from "express";
// import {
//   createBroadcast,
//   getBroadcasts,
//   updateBroadcastStats,
// } from "../controllers/broadcastController.js";

// const router = express.Router();

// router.post("/", createBroadcast); // नया broadcast
// router.get("/", getBroadcasts); // सभी broadcast list
// router.put("/:id/stats", updateBroadcastStats); // counters update

// export default router;






// import express from "express";
// import { updateUserMessageStats,getBroadcastStats } from "../controllers/broadcastController";

// const router = express.Router();

// // User message status update
// router.post("/message-receive", updateUserMessageStats);

// // Get broadcast stats
// router.get("/stats", getBroadcastStats);

// export default router;









import express from "express";
import { updateUserMessageStats, getBroadcastStats } from "../controllers/broadcastController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/message-receive",authMiddleware, updateUserMessageStats);
router.get("/stats",authMiddleware, getBroadcastStats);

export default router;
