// // routes/analytics.js
// import express from "express";
// import Broadcast from "../models/Broadcast.js";
// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const broadcasts = await Broadcast.find(); // sab broadcasts

//     // User wise data
//     const userMap = {};

//     broadcasts.forEach((b) => {
//       const userId = b.user.toString(); // user id string
//       if (!userMap[userId]) {
//         userMap[userId] = {
//           userId,
//           timeline: {}, // date wise
//           summary: { sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 },
//         };
//       }

//       // Timeline
//       const date = b.createdAt.toISOString().split("T")[0];
//       if (!userMap[userId].timeline[date]) {
//         userMap[userId].timeline[date] = { date, sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 };
//       }

//       userMap[userId].timeline[date].sent += b.sentCount || 0;
//       userMap[userId].timeline[date].delivered += b.deliveredCount || 0;
//       userMap[userId].timeline[date].read += b.readCount || 0;
//       userMap[userId].timeline[date].replied += b.repliedCount || 0;
//       userMap[userId].timeline[date].failed += b.failedCount || 0;

//       // Summary
//       userMap[userId].summary.sent += b.sentCount || 0;
//       userMap[userId].summary.delivered += b.deliveredCount || 0;
//       userMap[userId].summary.read += b.readCount || 0;
//       userMap[userId].summary.replied += b.repliedCount || 0;
//       userMap[userId].summary.failed += b.failedCount || 0;
//     });

//     // Convert timeline objects to arrays
//     const result = Object.values(userMap).map((u) => ({
//       userId: u.userId,
//       timeline: Object.values(u.timeline),
//       summary: Object.entries(u.summary).map(([name, value]) => ({ name, value })),
//     }));

//     res.json({ success: true, data: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;











// routes/analytics.js
// import express from "express";
// import Broadcast from "../models/Broadcast.js";
// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const broadcasts = await Broadcast.find(); // sab broadcasts

//     const userMap = {};

//     broadcasts.forEach((b) => {
//       // 🔹 Safe user handling
//       const userId = b.user ? b.user.toString() : "Unknown"; 

//       if (!userMap[userId]) {
//         userMap[userId] = {
//           userId,
//           timeline: {}, // date wise
//           summary: { sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 },
//         };
//       }

//       // Timeline
//       const date = b.createdAt ? b.createdAt.toISOString().split("T")[0] : "Unknown Date";
//       if (!userMap[userId].timeline[date]) {
//         userMap[userId].timeline[date] = { date, sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 };
//       }

//       userMap[userId].timeline[date].sent += b.sentCount || 0;
//       userMap[userId].timeline[date].delivered += b.deliveredCount || 0;
//       userMap[userId].timeline[date].read += b.readCount || 0;
//       userMap[userId].timeline[date].replied += b.repliedCount || 0;
//       userMap[userId].timeline[date].failed += b.failedCount || 0;

//       // Summary
//       userMap[userId].summary.sent += b.sentCount || 0;
//       userMap[userId].summary.delivered += b.deliveredCount || 0;
//       userMap[userId].summary.read += b.readCount || 0;
//       userMap[userId].summary.replied += b.repliedCount || 0;
//       userMap[userId].summary.failed += b.failedCount || 0;
//     });

//     // Convert timeline objects to arrays
//     const result = Object.values(userMap).map((u) => ({
//       userId: u.userId,
//       timeline: Object.values(u.timeline),
//       summary: Object.entries(u.summary).map(([name, value]) => ({ name, value })),
//     }));

//     res.json({ success: true, data: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;













import express from "express";
import Broadcast from "../models/Broadcast.js";
import {authMiddleware} from "../middleware/auth.js"; // assume JWT auth

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // logged-in user id
    const broadcasts = await Broadcast.find({ user: userId }); // sirf user ka data

    const timelineMap = {};
    const summary = { sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 };

    broadcasts.forEach((b) => {
      const date = b.createdAt ? b.createdAt.toISOString().split("T")[0] : "Unknown Date";

      if (!timelineMap[date]) {
        timelineMap[date] = { date, sent: 0, delivered: 0, read: 0, replied: 0, failed: 0 };
      }

      // Timeline
      timelineMap[date].sent += b.sentCount || 0;
      timelineMap[date].delivered += b.deliveredCount || 0;
      timelineMap[date].read += b.readCount || 0;
      timelineMap[date].replied += b.repliedCount || 0;
      timelineMap[date].failed += b.failedCount || 0;

      // Summary
      summary.sent += b.sentCount || 0;
      summary.delivered += b.deliveredCount || 0;
      summary.read += b.readCount || 0;
      summary.replied += b.repliedCount || 0;
      summary.failed += b.failedCount || 0;
    });

    const timeline = Object.values(timelineMap);
    const summaryArray = Object.entries(summary).map(([name, value]) => ({ name, value }));

    res.json({ success: true, data: { userId, timeline, summary: summaryArray } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
