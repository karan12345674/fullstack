// import Broadcast from "../models/Broadcast.js";

// // ✅ नया broadcast बनाओ
// export const createBroadcast = async (req, res) => {
//   try {
//     const { name, message, recipients } = req.body;

//     const broadcast = new Broadcast({
//       name,
//       message,
//       recipients: recipients.length, // recipients array का length
//     });

//     await broadcast.save();

//     // 👉 यहां आप async message sending logic call करोगे
//     // जैसे WhatsApp API या SMS API integrate करके

//     res.json({ success: true, data: broadcast });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to create broadcast" });
//   }
// };

// // ✅ सभी broadcasts लाओ
// export const getBroadcasts = async (req, res) => {
//   try {
//     const broadcasts = await Broadcast.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: broadcasts });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ✅ broadcast status update करो (जब message भेजा/पढ़ा/फेल हुआ)
// export const updateBroadcastStats = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { type } = req.body; // "sent", "delivered", "read", "replied", "failed"

//     const broadcast = await Broadcast.findById(id);
//     if (!broadcast) {
//       return res.status(404).json({ success: false, message: "Broadcast not found" });
//     }

//     if (type === "sent") broadcast.sentCount += 1;
//     if (type === "delivered") broadcast.deliveredCount += 1;
//     if (type === "read") broadcast.readCount += 1;
//     if (type === "replied") broadcast.repliedCount += 1;
//     if (type === "failed") broadcast.failedCount += 1;

//     await broadcast.save();

//     res.json({ success: true, data: broadcast });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to update broadcast stats" });
//   }
// };










// import Broadcast from "../models/Broadcast.js";

// // ✅ User message aaya → update counters
// export const updateUserMessageStats = async (req, res) => {
//   try {
//     const { status } = req.body; // sent | delivered | read | replied | failed

//     // हमेशा एक single broadcast document use करenge
//     let broadcast = await Broadcast.findOne();
//     if (!broadcast) {
//       broadcast = new Broadcast({ name: "User Messages" });
//     }

//     switch(status) {
//       case "sent": broadcast.sentCount += 1; break;
//       case "delivered": broadcast.deliveredCount += 1; break;
//       case "read": broadcast.readCount += 1; break;
//       case "replied": broadcast.repliedCount += 1; break;
//       case "failed": broadcast.failedCount += 1; break;
//     }

//     await broadcast.save();
//     res.json({ success: true, data: broadcast });
//   } catch(err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to update stats" });
//   }
// };

// // ✅ Fetch counters
// export const getBroadcastStats = async (req, res) => {
//   try {
//     let broadcast = await Broadcast.findOne();
//     if (!broadcast) {
//       broadcast = new Broadcast({ name: "User Messages" });
//       await broadcast.save();
//     }
//     res.json({ success: true, data: broadcast });
//   } catch(err) {
//     res.status(500).json({ success: false, message: "Failed to fetch stats" });
//   }
// };







// import Broadcast from "../models/Broadcast.js";

// // ✅ User message aaya → update counters
// export const updateUserMessageStats = async (req, res) => {
//   try {
//     const { status } = req.body; // sent | delivered | read | replied | failed

//     let broadcast = await Broadcast.findOne();
//     if (!broadcast) {
//       broadcast = new Broadcast({ name: "User Messages" });
//     }

//     switch(status) {
//       case "sent": broadcast.sentCount += 1; break;
//       case "delivered": broadcast.deliveredCount += 1; break;
//       case "read": broadcast.readCount += 1; break;
//       case "replied": broadcast.repliedCount += 1; break;
//       case "failed": broadcast.failedCount += 1; break;
//     }

//     await broadcast.save();
//     res.json({ success: true, data: broadcast });
//   } catch(err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to update stats" });
//   }
// };

// // ✅ Fetch counters
// export const getBroadcastStats = async (req, res) => {
//   try {
//     let broadcast = await Broadcast.findOne();
//     if (!broadcast) {
//       broadcast = new Broadcast({ name: "User Messages" });
//       await broadcast.save();
//     }
//     res.json({ success: true, data: broadcast });
//   } catch(err) {
//     res.status(500).json({ success: false, message: "Failed to fetch stats" });
//   }
// };













import Broadcast from "../models/Broadcast.js";

// ✅ User message aaya → update counters
export const updateUserMessageStats = async (req, res) => {
  try {
    const userId = req.userId; // logged-in user
    const { status } = req.body; // sent | delivered | read | replied | failed

    // user-specific broadcast
    let broadcast = await Broadcast.findOne({ user: userId });
    if (!broadcast) {
      broadcast = new Broadcast({ user: userId, name: "User Messages" });
    }

    switch(status) {
      case "sent": broadcast.sentCount += 1; break;
      case "delivered": broadcast.deliveredCount += 1; break;
      case "read": broadcast.readCount += 1; break;
      case "replied": broadcast.repliedCount += 1; break;
      case "failed": broadcast.failedCount += 1; break;
    }

    await broadcast.save();
    res.json({ success: true, data: broadcast });
  } catch(err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update stats" });
  }
};

// ✅ Fetch counters
export const getBroadcastStats = async (req, res) => {
  try {
    const userId = req.userId; // logged-in user

    let broadcast = await Broadcast.find({ user: userId });
    if (!broadcast) {
      broadcast = new Broadcast({ user: userId, name: "User Messages" });
      await broadcast.save();
    }

    res.json({ success: true, data: broadcast });
  } catch(err) {
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
