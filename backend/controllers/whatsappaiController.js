// // // controllers/whatsappaiController.js
// import WhatsAppSession from "../models/WhatsAppSession.js";
// import Business from "../models/Business.js";
// import { askAI } from "../utils/aiAgent.js";

// /**
//  * Setup AI auto-reply for a WhatsApp session
//  * @param {*} client venom client
//  * @param {*} sessionId session stored in DB
//  */
// export const setupAIOnMessage = async (client, sessionId) => {
//   if (!client || !client.onMessage) {
//     console.error("❌ Venom client invalid or onMessage not available for session:", sessionId);
//     return;
//   }

//   console.log("⚡ Setting up AI auto-reply for session:", sessionId);

//   // Listen to incoming messages
//   client.onMessage(async (message) => {
//     try {
//       if (!message?.body || message.fromMe || message.isStatus) return;

//       console.log(📨 New message [${sessionId}] -> From: ${message.from} | Msg: ${message.body});

//       const session = await WhatsAppSession.findOne({ sessionId });
//       if (!session) return console.warn("⚠ Session not found in DB");

//       const business = await Business.findOne({ _id: session.businessId });
//       if (!business) return console.warn("⚠ Business not found for session");

//       const reply = await askAI(message.body, business);

//       await client.sendText(message.from, reply);
//       console.log(🤖 Replied [${message.from}] -> ${reply});
//     } catch (err) {
//       console.error("❌ AI auto-reply error:", err);
//     }
//   });
// };




// controllers/whatsappaiController.js
// import WhatsAppSession from "../models/WhatsAppSession.js";
// import Business from "../models/Business.js";
// import { askAI } from "../Utils/aiAgent.js";

// // In-memory store to track processed messages
// const processedMessages = new Set();

// /**
//  * Setup AI auto-reply for a WhatsApp session
//  * @param {*} client venom client
//  * @param {*} sessionId session stored in DB
//  */
// export const setupAIOnMessage = async (client, sessionId) => {
//   if (!client || !client.onMessage) {
//     console.error("❌ Venom client invalid or onMessage not available for session:", sessionId);
//     return;
//   }

//   console.log("⚡ Setting up AI auto-reply for session:", sessionId);

//   // Listen to incoming messages
//   client.onMessage(async (message) => {
//     try {
//       // Ignore invalid messages
//       if (!message?.body || message.fromMe || message.isStatus) return;

//       // Deduplicate messages
//       const msgId = message.id || message.mId;
//       if (processedMessages.has(msgId)) return; // Already processed
//       processedMessages.add(msgId);

//       console.log(`📨 Processing message [${sessionId}] -> From: ${message.from} | Msg: ${message.body}`);

//       const session = await WhatsAppSession.findOne({ sessionId });
//       if (!session) return console.warn("⚠ Session not found in DB");

//       const business = await Business.findOne({ _id: session.businessId });
//       if (!business) return console.warn("⚠ Business not found for session");

//       // Call AI
//       let reply;
//       try {
//         reply = await askAI(message.body, business);
//       } catch (err) {
//         console.error("❌ askAI error:", err.message);
//         reply = "Sorry, I couldn't process your message right now.";
//       }

//       await client.sendText(message.from, reply);
//       console.log(`🤖 Replied [${message.from}] -> ${reply}`);
//     } catch (err) {
//       console.error("❌ AI auto-reply error:", err);
//     }
//   });
// };





import SessionModel from "../models/Session.js";
import Business from "../models/Business.js";
import { askAI } from "../utils/aiAgent.js";

// In-memory store to track processed messages
const processedMessages = new Set();

/**
 * Setup AI auto-reply for a WhatsApp session
 * @param {*} client whatsapp-web.js client
 * @param {*} sessionObj object containing { userId, number, sessionId }
 */
export const setupAIOnMessage = (client, sessionObj) => {
  if (!client || !client.on) {
    console.error("❌ WhatsApp client invalid or .on not available for session:", sessionObj);
    return;
  }

  const { sessionId } = sessionObj; // <-- only string used for DB

  console.log("⚡ Setting up AI auto-reply for session:", sessionId);

  client.on("message", async (message) => {
    try {
      // Ignore invalid messages
      if (!message?.body || message.fromMe || message.isStatus) return;

      // Deduplicate messages
      const msgId = message.id._serialized || message.id.id || message.id; 
      if (processedMessages.has(msgId)) return;
      processedMessages.add(msgId);

      console.log(`📨 Processing message [${sessionId}] -> From: ${message.from} | Msg: ${message.body}`);

      // Fetch session from DB
      const session = await SessionModel.findOne({ sessionId });
      if (!session) return console.warn("⚠ Session not found in DB");

      // Fetch business info
      // const business = await Business.findById(session.businessId);
      // if (!business) return console.warn("⚠ Business not found for session");

      // Call AI
      let reply;
      try {
        reply = await askAI(message.body, business);
      } catch (err) {
        console.error("❌ askAI error:", err.message);
        reply = "Sorry, I couldn't process your message right now.";
      }

      // Send reply
      await client.sendMessage(message.from, reply);
      console.log(`🤖 Replied [${message.from}] -> ${reply}`);

    } catch (err) {
      console.error("❌ AI auto-reply error:", err);
    }
  });
};
