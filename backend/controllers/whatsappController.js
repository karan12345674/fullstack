// import { create, Client } from '@open-wa/wa-automate';
// import WhatsAppSession from "../models/WhatsAppSession.js";
// import Business from "../models/Business.js";
// import { setupAIOnMessage } from "./whatsappaiController.js";

// // In-memory client store
// const clientsMap = new Map();

// /**
//  * Generate QR / Create Session
//  */
// export const generateQR = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

//     const business = await Business.findOne({ userId: req.userId });
//     if (!business) return res.status(404).json({ message: "No business found" });

//     let session = await WhatsAppSession.findOne({
//       userId: req.userId,
//       businessId: business._id.toString(),
//       phoneNumber,
//     });

//     let sessionId;
//     if (session) {
//       sessionId = session.sessionId;
//       if (session.status === "connected") return res.json({ message: "Already connected", sessionId });
//     } else {
//       sessionId = ${req.userId}_${business._id}_${Date.now()};
//       session = await WhatsAppSession.create({
//         sessionId,
//         userId: req.userId,
//         businessId: business._id.toString(),
//         phoneNumber,
//         status: "pending",
//       });
//     }

//     // Create OpenWA client
//     create({
//       sessionId,
//       multiDevice: false, // Free version, multi-session nahi
//       authTimeout: 60,
//       blockCrashLogs: true,
//       disableSpins: true,
//       headless: true,
//       useChrome: true,
//       qrTimeout: 0,
//     }).then(async (client) => {
//       console.log("✅ OpenWA connected for", sessionId);
//       clientsMap.set(sessionId, client);

//       await WhatsAppSession.findOneAndUpdate({ sessionId }, { status: "connected", lastSeenAt: new Date() });

//       // Attach message handler
//       client.onMessage(async (message) => {
//         try {
//           console.log("📩 Incoming message:", message);
//           if (!message.fromMe && message.body) {
//             await setupAIOnMessage(client, sessionId, message);
//           }
//         } catch (err) {
//           console.error("❌ Error in message handler:", err);
//         }
//       });

//       // QR generation
//       client.onStateChanged((state) => {
//         console.log(🔄 State change [${sessionId}] ->, state);
//         if (state === 'CONFLICT' || state === 'DISCONNECTED') {
//           client.kill();
//           clientsMap.delete(sessionId);
//           WhatsAppSession.findOneAndUpdate({ sessionId }, { status: 'disconnected', lastSeenAt: new Date() });
//         }
//       });

//     }).catch(async (err) => {
//       console.error("❌ OpenWA create error:", err);
//       await WhatsAppSession.findOneAndUpdate({ sessionId }, { status: "disconnected" });
//       if (!res.headersSent) res.status(500).json({ message: "Failed to create session", error: err.message });
//     });

//   } catch (err) {
//     console.error("❌ generateQR error:", err);
//     if (!res.headersSent) res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Disconnect session
//  */
// export const disconnectSession = async (req, res) => {
//   try {
//     const { sessionId, deleteRecord } = req.body;
//     if (!sessionId) return res.status(400).json({ message: "SessionId required" });

//     const client = clientsMap.get(sessionId);
//     if (client) {
//       try {
//         await client.kill();
//         clientsMap.delete(sessionId);
//       } catch (e) {
//         console.warn("⚠ Could not close client:", e?.message || e);
//       }
//     }

//     if (deleteRecord) {
//       await WhatsAppSession.deleteOne({ sessionId });
//     } else {
//       await WhatsAppSession.findOneAndUpdate({ sessionId }, { status: "disconnected", lastSeenAt: new Date() });
//     }

//     return res.json({ message: "Session disconnected" });
//   } catch (err) {
//     console.error("❌ disconnectSession error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Get session status
//  */
// export const getSessionStatus = async (req, res) => {
//   try {
//     const { sessionId } = req.body;
//     if (!sessionId) return res.status(400).json({ message: "SessionId required" });

//     const session = await WhatsAppSession.findOne({ sessionId });
//     if (!session) return res.status(404).json({ message: "Session not found" });

//     return res.json({ sessionId: session.sessionId, status: session.status, lastSeenAt: session.lastSeenAt });
//   } catch (err) {
//     console.error("❌ getSessionStatus error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };
 













// import { create, Client } from '@open-wa/wa-automate';
// import WhatsAppSession from "../models/WhatsAppSession.js";
// import Business from "../models/Business.js";
// import { setupAIOnMessage } from "./whatsappaiController.js";

// // In-memory client store
// const clientsMap = new Map();

// /**
//  * Attach message handler safely (prevent duplicates)
//  */
// const attachOnMessage = (client, sessionId) => {
//   if (client._onMessageAttached) return; // already attached
//   client._onMessageAttached = true;

//   client.onMessage(async (message) => {
//     try {
//       console.log("📩 Incoming message:", message);
//       if (!message.fromMe && message.body) {
//         await setupAIOnMessage(client, sessionId, message);
//       }
//     } catch (err) {
//       console.error("❌ Error in message handler:", err);
//     }
//   });
// };

// /**
//  * Generate QR / Create Session
//  */
// export const generateQR = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

//     const business = await Business.findOne({ userId: req.userId });
//     if (!business) return res.status(404).json({ message: "No business found" });

//     let session = await WhatsAppSession.findOne({
//       userId: req.userId,
//       businessId: business._id.toString(),
//       phoneNumber,
//     });

//     let sessionId;
//     if (session) {
//       sessionId = session.sessionId;
//       if (session.status === "connected") return res.json({ message: "Already connected", sessionId });
//     } else {
//       sessionId = ${req.userId}_${business._id}_${Date.now()};
//       session = await WhatsAppSession.create({
//         sessionId,
//         userId: req.userId,
//         businessId: business._id.toString(),
//         phoneNumber,
//         status: "pending",
//       });
//     }

//     // Create OpenWA client
//     create({
//       sessionId,
//       multiDevice: false, // Free version
//       authTimeout: 60,
//       blockCrashLogs: true,
//       disableSpins: true,
//       headless: true,
//       useChrome: true,
//       qrTimeout: 0,
//     }).then(async (client) => {
//       console.log("✅ OpenWA connected for", sessionId);
//       clientsMap.set(sessionId, client);

//       await WhatsAppSession.findOneAndUpdate({ sessionId }, { status: "connected", lastSeenAt: new Date() });

//       // Attach message handler safely
//       attachOnMessage(client, 'sessionIdFromDB');

//       client.onStateChanged((state) => {
//         console.log(🔄 State change [${sessionId}] ->, state);
//         if (state === 'CONFLICT' || state === 'DISCONNECTED') {
//           client.kill();
//           clientsMap.delete(sessionId);
//           WhatsAppSession.findOneAndUpdate({ sessionId }, { status: 'disconnected', lastSeenAt: new Date() });
//         }
//       });

//     }).catch(async (err) => {
//       console.error("❌ OpenWA create error:", err);
//       await WhatsAppSession.findOneAndUpdate({ sessionId }, { status: "disconnected" });
//       if (!res.headersSent) res.status(500).json({ message: "Failed to create session", error: err.message });
//     });

//   } catch (err) {
//     console.error("❌ generateQR error:", err);
//     if (!res.headersSent) res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Disconnect session
//  */
// export const disconnectSession = async (req, res) => {
//   try {
//     const { sessionId, deleteRecord } = req.body;
//     if (!sessionId) return res.status(400).json({ message: "SessionId required" });

//     const client = clientsMap.get(sessionId);
//     if (client) {
//       try {
//         await client.kill();
//         clientsMap.delete(sessionId);
//       } catch (e) {
//         console.warn("⚠ Could not close client:", e?.message || e);
//       }
//     }

//     if (deleteRecord) {
//       await WhatsAppSession.deleteOne({ sessionId });
//     } else {
//       await WhatsAppSession.findOneAndUpdate({ sessionId }, { status: "disconnected", lastSeenAt: new Date() });
//     }

//     return res.json({ message: "Session disconnected" });
//   } catch (err) {
//     console.error("❌ disconnectSession error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Get session status
//  */
// export const getSessionStatus = async (req, res) => {
//   try {
//     const { sessionId } = req.body;
//     if (!sessionId) return res.status(400).json({ message: "SessionId required" });

//     const session = await WhatsAppSession.findOne({ sessionId });
//     if (!session) return res.status(404).json({ message: "Session not found" });

//     return res.json({ sessionId: session.sessionId, status: session.status, lastSeenAt: session.lastSeenAt });
//   } catch (err) {
//     console.error("❌ getSessionStatus error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };













import { create } from '@open-wa/wa-automate';
import WhatsAppSession from "../models/WhatsAppSession.js";
import Business from "../models/Business.js";
import { setupAIOnMessage } from "./whatsappaiController.js";
import MessageLog from '../models/MessageLog.js';

// In-memory client store
const clientsMap = new Map();

/**
 * Attach message handler safely (prevent duplicates)
 */
const attachOnMessage = (client, sessionId) => {
  if (client._onMessageAttached) return; // already attached
  client._onMessageAttached = true;

  client.onMessage(async (message) => {
    try {
      console.log("📩 Incoming message:", message);
      if (!message.fromMe && message.body) {
        await setupAIOnMessage(client, sessionId, message);
      }
    } catch (err) {
      console.error("❌ Error in message handler:", err);
    }
  });
};

/**
 * Generate QR / Create Session
 */
export const generateQR = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

    const business = await Business.findOne({ userId: req.userId });
    if (!business) return res.status(404).json({ message: "No business found" });

    let session = await WhatsAppSession.findOne({
      userId: req.userId,
      businessId: business._id.toString(),
      phoneNumber,
    });

    let sessionId;
    if (session) {
      sessionId = session.sessionId;
      if (session.status === "connected") return res.json({ message: "Already connected", sessionId });
    } else {
      sessionId = `${req.userId}_${business._id}_${Date.now()}`;
      session = await WhatsAppSession.create({
        sessionId,
        userId: req.userId,
        businessId: business._id.toString(),
        phoneNumber,
        status: "pending",
      });
    }

    // Create OpenWA client
    create({
      sessionId,
      multiDevice: false, // Free version
      authTimeout: 60,
      blockCrashLogs: true,
      disableSpins: true,
      headless: true,
      useChrome: true,
      qrTimeout: 0,
    }).then(async (client) => {
      console.log("✅ OpenWA connected for", sessionId);
      clientsMap.set(sessionId, client);

      await WhatsAppSession.findOneAndUpdate(
        { sessionId },
        { status: "connected", lastSeenAt: new Date() }
      );

      // Attach message handler safely
      attachOnMessage(client, sessionId);

      // jaha client connect hota hai (whatsappController.js)
client.onMessage(async msg=>{
  const phone = msg.from.replace("@c.us","");
  const log = await MessageLog.findOne({phoneNumber:phone, status:"sent"}).sort({createdAt:-1});
  if(log){
    log.status="replied";
    log.replyMessage = msg.body;
    await log.save();
  }
});


      client.onStateChanged((state) => {
        console.log(`🔄 State change [${sessionId}] ->`, state);
        if (state === "CONFLICT" || state === "DISCONNECTED") {
          client.kill();
          clientsMap.delete(sessionId);
          WhatsAppSession.findOneAndUpdate(
            { sessionId },
            { status: "disconnected", lastSeenAt: new Date() }
          );
        }
      });

      if (!res.headersSent) res.json({ message: "Connected", sessionId });

    }).catch(async (err) => {
      console.error("❌ OpenWA create error:", err);
      await WhatsAppSession.findOneAndUpdate(
        { sessionId },
        { status: "disconnected" }
      );
      if (!res.headersSent) res.status(500).json({ message: "Failed to create session", error: err.message });
    });

  } catch (err) {
    console.error("❌ generateQR error:", err);
    if (!res.headersSent) res.status(500).json({ message: err.message });
  }
};

/**
 * Disconnect session
 */
export const disconnectSession = async (req, res) => {
  try {
    const { sessionId, deleteRecord } = req.body;
    if (!sessionId) return res.status(400).json({ message: "SessionId required" });

    const client = clientsMap.get(sessionId);
    if (client) {
      try {
        await client.kill();
        clientsMap.delete(sessionId);
      } catch (e) {
        console.warn("⚠ Could not close client:", e?.message || e);
      }
    }

    if (deleteRecord) {
      await WhatsAppSession.deleteOne({ sessionId });
    } else {
      await WhatsAppSession.findOneAndUpdate(
        { sessionId },
        { status: "disconnected", lastSeenAt: new Date() }
      );
    }

    return res.json({ message: "Session disconnected" });
  } catch (err) {
    console.error("❌ disconnectSession error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get session status
 */
export const getSessionStatus = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: "SessionId required" });

    const session = await WhatsAppSession.findOne({ sessionId });
    if (!session) return res.status(404).json({ message: "Session not found" });

    return res.json({
      sessionId: session.sessionId,
      status: session.status,
      lastSeenAt: session.lastSeenAt,
    });
  } catch (err) {
    console.error("❌ getSessionStatus error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Reconnect all sessions after server restart
 */
export const reconnectSessions = async () => {
  const sessions = await WhatsAppSession.find({ status: "connected" });
  for (let session of sessions) {
    try {
      const client = await create({
        sessionId: session.sessionId,
        multiDevice: false,
        headless: true,
        useChrome: true,
        authTimeout: 60,
        qrTimeout: 0,
      });

      clientsMap.set(session.sessionId, client);
      console.log(`🔄 Reconnected session: ${session.sessionId}`);

      attachOnMessage(client, session.sessionId);

      client.onStateChanged((state) => {
        console.log(`State changed [${session.sessionId}]:`, state);
        if (state === "CONFLICT" || state === "DISCONNECTED") {
          client.kill();
          clientsMap.delete(session.sessionId);
          WhatsAppSession.findOneAndUpdate(
            { sessionId: session.sessionId },
            { status: "disconnected", lastSeenAt: new Date() }
          );
        }
      });
    } catch (err) {
      console.error(`❌ Failed to reconnect ${session.sessionId}:`, err.message);
    }
  }
};