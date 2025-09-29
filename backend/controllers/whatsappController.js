import pkg from "whatsapp-web.js";
import { removeAuthFolder } from "./authHelper.js";
import SessionModel from "../models/Session.js";
import { setupAIOnMessage } from "./whatsappaiController.js"; // path adjust करें
//import SessionModel from "../models/Session.js";
import TemplateModel from "../models/Template.js";
// import ContactModel from "../models/Contact.js";
import axios from "axios"; 


const { Client, LocalAuth } = pkg;

// ----------------- In-memory session store -----------------
const sessions = {};

// ----------------- Restore User Sessions -----------------
export const loadUserSessions = async (userId) => {
  try {
    if (!userId) throw new Error("No userId provided");

    const dbSessions = await SessionModel.find({ userId });

    for (const s of dbSessions) {
      const key = `${s.userId}_${s.number}`;

      if (!sessions[key] && (s.status === "connected" || s.status === "pending")) {
        const client = new Client({
          authStrategy: new LocalAuth({ clientId: s.sessionId }),
          puppeteer: { headless: true, args: ["--no-sandbox","--disable-setuid-sandbox"] }
        });

        sessions[key] = {
          client,
          qr: null,
          status: s.status,
          sessionId: s.sessionId,
          qrTimeout: null
        };

        bindClientEvents(client, s.userId, s.number, key);
        client.initialize();
      }
    }

    console.log(`🔄 Restored ${dbSessions.length} sessions for user ${userId}`);
    return dbSessions;
  } catch (err) {
    console.error("Error restoring sessions:", err);
    throw err;
  }
};

// ----------------- Bind WhatsApp Events -----------------
const bindClientEvents = (client, userId, number, key) => {
  client.on("qr", (qr) => {
    if (!sessions[key]) return;

    sessions[key].qr = qr;
    sessions[key].status = "pending";
    SessionModel.findOneAndUpdate({ userId, number }, { status: "pending" }).exec();

    if (sessions[key].qrTimeout) clearTimeout(sessions[key].qrTimeout);
    sessions[key].qrTimeout = setTimeout(() => {
      if (sessions[key] && sessions[key].status === "pending") {
        sessions[key].qr = null;
        sessions[key].status = "qr-expired";
        SessionModel.findOneAndUpdate({ userId, number }, { status: "qr-expired" }).exec();
      }
    }, 60 * 1000);
  });

  client.on("ready", async () => {
    if (!sessions[key]) return;

    sessions[key].status = "connected";
    sessions[key].qr = null;
    if (sessions[key].qrTimeout) {
      clearTimeout(sessions[key].qrTimeout);
      sessions[key].qrTimeout = null;
    }

    await SessionModel.findOneAndUpdate({ userId, number }, { status: "connected" });
    console.log(`✅ WhatsApp ready for ${number} (user ${userId})`);

    // ----------------- Attach AI Auto-Reply -----------------
    setupAIOnMessage(client, { userId, number, sessionId: sessions[key].sessionId });
  });

  client.on("disconnected", async (reason) => {
    if (!sessions[key]) return;

    sessions[key].status = "disconnected";
    sessions[key].qr = null;
    if (sessions[key].qrTimeout) { clearTimeout(sessions[key].qrTimeout); sessions[key].qrTimeout = null; }

    try {
      await SessionModel.findOneAndUpdate({ userId, number }, { status: "disconnected" });
    } catch (err) {
      console.error("DB update error on disconnect:", err);
    }

    console.log(`⚠️ WhatsApp disconnected for ${number} (user ${userId}): ${reason}`);
  });
};

// ----------------- Start WhatsApp Session -----------------
export const startSession = async (req, res) => {
  try {
    const userId = req.userId;
    const { number } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });
    if (!number) return res.status(400).json({ message: "Number required" });

    const key = `${userId}_${number}`;

    if (sessions[key]) {
      try { sessions[key].client.destroy(); } catch (e) { console.warn(e); }
      removeAuthFolder(sessions[key].sessionId);
      delete sessions[key];
    }

    const sessionId = `${number}_${Date.now()}`;
    const client = new Client({
      authStrategy: new LocalAuth({ clientId: sessionId }),
      puppeteer: { headless: true, args: ["--no-sandbox","--disable-setuid-sandbox"] }
    });

    sessions[key] = { client, qr: null, status: "pending", sessionId, qrTimeout: null };
    await SessionModel.findOneAndUpdate(
      { userId, number },
      { sessionId, status: "pending", userId, number },
      { upsert: true, new: true }
    );

    bindClientEvents(client, userId, number, key);
    client.initialize();

    res.json({ message: "Session starting", sessionId, qr: null, status: "pending" });
  } catch (err) {
    console.error("startSession error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------- Get QR / Status -----------------
export const getQR = async (req, res) => {
  try {
    const userId = req.userId;
    const { number } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });
    if (!number) return res.status(400).json({ message: "Number required" });

    const session = await SessionModel.findOne({ userId, number });
    if (!session) return res.status(404).json({ message: "No session found" });

    const memSession = sessions[`${userId}_${number}`];

    res.setHeader("Cache-Control", "no-store");
    res.json({
      qr: memSession?.qr || null,
      status: session.status,
      sessionId: session.sessionId
    });
  } catch (err) {
    console.error("getQR error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------- Disconnect Session -----------------
export const disconnectSession = async (req, res) => {
  try {
    const userId = req.userId;
    const { number } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });
    if (!number) return res.status(400).json({ message: "Number required" });

    const key = `${userId}_${number}`;

    if (sessions[key]) {
      try { sessions[key].client.destroy(); } catch (e) { console.warn("client.destroy error:", e); }
      if (sessions[key].qrTimeout) { clearTimeout(sessions[key].qrTimeout); sessions[key].qrTimeout = null; }
      removeAuthFolder(sessions[key].sessionId);
      delete sessions[key];
    }

    await SessionModel.findOneAndUpdate({ userId, number }, { status: "disconnected" });
    res.json({ message: "Session disconnected" });
  } catch (err) {
    console.error("disconnectSession error:", err);
    res.status(500).json({ message: "Error disconnecting session" });
  }
};
// ----------------- Send Bulk Messages (Text + Contacts) -----------------
// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, message } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || !message) return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     for (let num of numbers) {
//       try {
//         if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";
//         await client.sendMessage(num, message);
//         results.push({ number: num, status: "Sent" });
//       } catch (err) {
//         results.push({ number: num, status: "Failed", error: err.message });
//       }
//     }

//     res.json({ results });
//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };


// sahi code upar vala





const {  MessageMedia } = pkg;

// import axios from "axios";
import path from "path";
import fs from "fs";

// ----------------- Send Bulk Messages (Text + Contacts + Image + Buttons) -----------------
// ----------------- Send Bulk Messages (Text + Contacts + Image + Buttons) -----------------
// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, templateId, template: templateObj } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || (!templateId && !templateObj)) 
//       return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     // ✅ Template fetch from DB or use frontend object
//     let template;
//     if (templateId) {
//       template = await TemplateModel.findById(templateId);
//       if (!template) return res.status(404).json({ message: "Template not found" });
//     } else {
//       template = templateObj; // optional support
//     }

//     for (let num of numbers) {
//       try {
//         if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

//         // 1️⃣ Send Image if exists
//         if (template.image) {
//           const imagePath = path.join(process.cwd(), "uploads", path.basename(template.image));
//           if (fs.existsSync(imagePath)) {
//             const imageData = fs.readFileSync(imagePath).toString("base64");
//             const media = new MessageMedia("image/png", imageData, "image.png");
//             await client.sendMessage(num, media);
//           }
//         }

//         // 2️⃣ Send Buttons if exists
//         if (template.buttons && template.buttons.length > 0) {
//           const buttons = template.buttons.map((btn, i) => ({
//             buttonId: `btn_${i}`,
//             buttonText: { displayText: btn.text },
//             type: 1,
//           }));

//           const buttonMessage = {
//             text: template.body || "📢 New Message",
//             footer: "Choose an option",
//             buttons: buttons,
//             headerType: 1,
//           };

//           await client.sendMessage(num, buttonMessage);

//         } else {
//           // 3️⃣ Send normal text
//           if (template.body) {
//             await client.sendMessage(num, template.body);
//           }
//         }

//         results.push({ number: num, status: "Sent" });
//       } catch (err) {
//         results.push({ number: num, status: "Failed", error: err.message });
//       }
//     }

//     res.json({ results });
//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };






// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, templateId } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || !templateId)
//       return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     // Template fetch from DB
//     const template = await TemplateModel.findById(templateId);
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     // Clean text for caption (short & safe)
//     let text = template.body ? template.body.trim() : "📢 New Message";
//     if (text.length > 1000) text = text.slice(0, 1000); // optional: caption limit

//     for (let num of numbers) {
//       try {
//         if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

//         // Send image with caption if image exists
//         if (template.image) {
//           const imagePath = path.join(process.cwd(), "uploads", path.basename(template.image));

//           if (fs.existsSync(imagePath)) {
//             const media = MessageMedia.fromFilePath(imagePath);
//             await client.sendMessage(num, media, { caption: text });
//             results.push({ number: num, status: "Sent" });
//             continue; // skip sending text separately
//           } else {
//             console.warn(`Image not found at path: ${imagePath}`);
//           }
//         }

//         // If no image, send plain text
//         await client.sendMessage(num, text);
//         results.push({ number: num, status: "Sent" });

//       } catch (err) {
//         results.push({ number: num, status: "Failed", error: err.message });
//       }
//     }

//     res.json({ results });
//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };











// import pkg from "whatsapp-web.js";
// import TemplateModel from "../models/Template.js";
// const { MessageMedia } = pkg;


// ----------------- Send Bulk Messages (Cloudinary Images + Text + Buttons) -----------------
// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, templateId } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || !templateId)
//       return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     // Fetch template from DB
//     const template = await TemplateModel.findById(templateId);
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     let text = template.body ? template.body.trim() : "📢 New Message";
//     if (text.length > 1000) text = text.slice(0, 1000); // optional limit

//    for (let num of numbers) {
//   try {
//     if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

//     // ---------- 1️⃣ Send image if Cloudinary URL exists ----------
//     if (template.image) {
//       const media = await MessageMedia.fromUrl(template.image);
//       await client.sendMessage(num, media, { caption: text });
//     }

//     // ---------- 2️⃣ Send buttons if they exist ----------
//     if (template.buttons && template.buttons.length > 0) {
//       const buttons = template.buttons.map((btn, i) => ({
//         buttonId: `btn_${i}`,
//         buttonText: { displayText: btn.text },
//         type: 1,
//       }));

//       const buttonMessage = {
//         text: text,
//         footer: template.footer || "Select an option",
//         buttons: buttons,
//         headerType: 1,
//       };

//       await client.sendMessage(num, buttonMessage);
//     }

//     // ---------- 3️⃣ Send plain text if no image/buttons ----------
//     if (!template.image && (!template.buttons || template.buttons.length === 0)) {
//       await client.sendMessage(num, text);
//     }

//     results.push({ number: num, status: "Sent" });

//   } catch (err) {
//     results.push({ number: num, status: "Failed", error: err.message });
//   }
// }

//     res.json({ results });

//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };











// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, templateId } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || !templateId)
//       return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     // Fetch template from DB
//     const template = await TemplateModel.findById(templateId);
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     let text = template.body ? template.body.trim() : "📢 New Message";

//     for (let num of numbers) {
//       try {
//         if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

//         // ---------- 1️⃣ Send image if exists ----------
//         if (template.image) {
//           const response = await axios.get(template.image, { responseType: "arraybuffer" });
//           const media = new MessageMedia(
//             "image/png",
//             Buffer.from(response.data, "binary").toString("base64"),
//             "image.png"
//           );
//           await client.sendMessage(num, media, { caption: text });
//         }

//         // ---------- 2️⃣ Send buttons if exist ----------
//         if (template.buttons && template.buttons.length > 0) {
//           const buttons = template.buttons.map((btn, i) => ({
//             buttonId: `btn_${i}`,
//             buttonText: { displayText: btn.text },
//             type: 1,
//           }));

//           const buttonMessage = {
//             text: text,
//             footer: template.footer || "Select an option",
//             buttons: buttons,
//             headerType: 1,
//           };

//           await client.sendMessage(num, buttonMessage);
//         }

//         // ---------- 3️⃣ Send plain text if no image/buttons ----------
//         if (!template.image && (!template.buttons || template.buttons.length === 0)) {
//           await client.sendMessage(num, text);
//         }

//         results.push({ number: num, status: "Sent" });

//       } catch (err) {
//         results.push({ number: num, status: "Failed", error: err.message });
//       }
//     }

//     res.json({ results });

//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };





















/// ye shi vala code h


// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, templateId } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || !templateId)
//       return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     const template = await TemplateModel.findById(templateId);
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     const text = template.body || "📢 New Message";

//     for (let num of numbers) {
//       try {
//         if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

//         // ✅ Cloudinary image send
//         if (template.fileUrl) {
//           const response = await axios.get(template.fileUrl, {
//             responseType: "arraybuffer"
//           });
//           const media = new MessageMedia(
//             "image/png",
//             Buffer.from(response.data, "binary").toString("base64"),
//             "image.png"
//           );
//           await client.sendMessage(num, media, { caption: text });
//           results.push({ number: num, status: "Sent" });
//           continue; // skip sending text separately
//         }

//         // Buttons (optional)
//         if (template.buttons && template.buttons.length > 0) {
//           const buttons = template.buttons.map((b, i) => ({
//             buttonId: `btn_${i}`,
//             buttonText: { displayText: b.text || b.label },
//             type: 1
//           }));

//           const buttonMessage = {
//             text: text,
//             buttons: buttons,
//             headerType: 1,
//             footer: template.footer || "Select an option"
//           };

//           await client.sendMessage(num, buttonMessage);
//           results.push({ number: num, status: "Sent" });
//           continue;
//         }

//         // Plain text fallback
//         await client.sendMessage(num, text);
//         results.push({ number: num, status: "Sent" });

//       } catch (err) {
//         results.push({ number: num, status: "Failed", error: err.message });
//       }
//     }

//     res.json({ results });

//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };




// ye vala code h 











// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, templateId } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || !templateId)
//       return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     // Fetch template
//     const template = await TemplateModel.findById(templateId);
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     let text = template.body ? template.body.trim() : "📢 New Message";

//     for (let num of numbers) {
//       try {
//         if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

//         // ---------- 1️⃣ Send media (image/video) if fileUrl exists ----------
//         if (template.fileUrl) {
//           // Download file as buffer
//           const response = await axios.get(template.fileUrl, { responseType: "arraybuffer" });
//           const fileBuffer = Buffer.from(response.data);

//           // Detect MIME type from URL extension
//           const ext = template.fileUrl.split(".").pop().toLowerCase();
//           let mimeType = "application/octet-stream";
//           if (["png", "jpg", "jpeg"].includes(ext)) mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;
//           if (["mp4", "mov", "webm"].includes(ext)) mimeType = `video/${ext}`;

//           const media = new MessageMedia(mimeType, fileBuffer.toString("base64"), `file.${ext}`);
//           await client.sendMessage(num, media, { caption: text });
//           results.push({ number: num, status: "Sent" });
//           continue;
//         }

//         // ---------- 2️⃣ Send buttons if they exist ----------
//         if (template.buttons && template.buttons.length > 0) {
//           const buttons = template.buttons.map((btn, i) => ({
//             buttonId: `btn_${i}`,
//             buttonText: { displayText: btn.text },
//             type: 1,
//           }));

//           const buttonMessage = {
//             text: text,
//             footer: template.footer || "Select an option",
//             buttons: buttons,
//             headerType: 1,
//           };

//           await client.sendMessage(num, buttonMessage);
//           results.push({ number: num, status: "Sent" });
//           continue;
//         }

//         // ---------- 3️⃣ Send plain text if no media/buttons ----------
//         await client.sendMessage(num, text);
//         results.push({ number: num, status: "Sent" });

//       } catch (err) {
//         results.push({ number: num, status: "Failed", error: err.message });
//       }
//     }

//     res.json({ results });

//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };






// import BroadcastModel from "../models/Broadcast.js"; // नया model
// //import TemplateModel from "../models/Template.js"; // template model
// //import axios from "axios";
// //import { MessageMedia } from "whatsapp-web.js"; // या जो bhi client use कर रहे हो

// export const sendBulkMessages = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { number, numbers, templateId } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthenticated" });
//     if (!number || !numbers || !templateId)
//       return res.status(400).json({ message: "Missing parameters" });

//     const key = `${userId}_${number}`;
//     if (!sessions[key] || sessions[key].status !== "connected")
//       return res.status(400).json({ message: "Session not connected" });

//     const client = sessions[key].client;
//     const results = [];

//     const template = await TemplateModel.findById(templateId);
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     let text = template.body ? template.body.trim() : "📢 New Message";

//     // counters
//     let sentCount = 0;
//     let failedCount = 0;
//     let readCount = 0;    // optional: अगर आप tracking कर रहे हो
//     let repliedCount = 0; // optional

//     for (let num of numbers) {
//       try {
//         if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

//         // ---------- Send media ----------
//         if (template.fileUrl) {
//           const response = await axios.get(template.fileUrl, { responseType: "arraybuffer" });
//           const fileBuffer = Buffer.from(response.data);

//           const ext = template.fileUrl.split(".").pop().toLowerCase();
//           let mimeType = "application/octet-stream";
//           if (["png", "jpg", "jpeg"].includes(ext)) mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;
//           if (["mp4", "mov", "webm"].includes(ext)) mimeType = `video/${ext}`;

//           const media = new MessageMedia(mimeType, fileBuffer.toString("base64"), `file.${ext}`);
//           await client.sendMessage(num, media, { caption: text });
//           results.push({ number: num, status: "Sent" });
//           sentCount++;
//           continue;
//         }

//         // ---------- Send buttons ----------
//         if (template.buttons && template.buttons.length > 0) {
//           const buttons = template.buttons.map((btn, i) => ({
//             buttonId: `btn_${i}`,
//             buttonText: { displayText: btn.text },
//             type: 1,
//           }));

//           const buttonMessage = {
//             text: text,
//             footer: template.footer || "Select an option",
//             buttons: buttons,
//             headerType: 1,
//           };

//           await client.sendMessage(num, buttonMessage);
//           results.push({ number: num, status: "Sent" });
//           sentCount++;
//           continue;
//         }

//         // ---------- Send plain text ----------
//         await client.sendMessage(num, text);
//         results.push({ number: num, status: "Sent" });
//         sentCount++;

//       } catch (err) {
//         results.push({ number: num, status: "Failed", error: err.message });
//         failedCount++;
//       }
//     }

//     // ✅ Save broadcast history to DB
//     const broadcast = new BroadcastModel({
//       user: userId,
//       template: templateId,
//       name: template.name || "Broadcast",
//       recipients: numbers.length,
//       sentCount,
//       failedCount,
//       readCount,
//       repliedCount,
//       status: "sent",
//     });

//     await broadcast.save();

//     res.json({ results, broadcast });

//   } catch (err) {
//     console.error("sendBulkMessages error:", err);
//     res.status(500).json({ message: "Error sending messages", error: err.message });
//   }
// };











import BroadcastModel from "../models/Broadcast.js";
// import TemplateModel from "../models/Template.js";
// import axios from "axios";
// import { MessageMedia } from "whatsapp-web.js";

export const sendBulkMessages = async (req, res) => {
  try {
    const userId = req.userId; // logged-in user
    const { number, numbers, templateId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthenticated" });
    if (!number || !numbers || !templateId)
      return res.status(400).json({ message: "Missing parameters" });

    const key = `${userId}_${number}`;
    if (!sessions[key] || sessions[key].status !== "connected")
      return res.status(400).json({ message: "Session not connected" });

    const client = sessions[key].client;
    const results = [];

    const template = await TemplateModel.findById(templateId);
    if (!template) return res.status(404).json({ message: "Template not found" });

    let text = template.body ? template.body.trim() : "📢 New Message";

    // user-specific counters
    let sentCount = 0;
    let failedCount = 0;
    let readCount = 0;
    let repliedCount = 0;

    for (let num of numbers) {
      try {
        if (!num.endsWith("@c.us")) num = num.replace(/\D/g, "") + "@c.us";

        // ---------- Send media ----------
        if (template.fileUrl) {
          const response = await axios.get(template.fileUrl, { responseType: "arraybuffer" });
          const fileBuffer = Buffer.from(response.data);

          const ext = template.fileUrl.split(".").pop().toLowerCase();
          let mimeType = "application/octet-stream";
          if (["png", "jpg", "jpeg"].includes(ext)) mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;
          if (["mp4", "mov", "webm"].includes(ext)) mimeType = `video/${ext}`;

          const media = new MessageMedia(mimeType, fileBuffer.toString("base64"), `file.${ext}`);
          await client.sendMessage(num, media, { caption: text });
          results.push({ number: num, status: "Sent" });
          sentCount++;
          continue;
        }

        // ---------- Send buttons ----------
        if (template.buttons && template.buttons.length > 0) {
          const buttons = template.buttons.map((btn, i) => ({
            buttonId: `btn_${i}`,
            buttonText: { displayText: btn.text },
            type: 1,
          }));

          const buttonMessage = {
            text: text,
            footer: template.footer || "Select an option",
            buttons: buttons,
            headerType: 1,
          };

          await client.sendMessage(num, buttonMessage);
          results.push({ number: num, status: "Sent" });
          sentCount++;
          continue;
        }

        // ---------- Send plain text ----------
        await client.sendMessage(num, text);
        results.push({ number: num, status: "Sent" });
        sentCount++;

      } catch (err) {
        results.push({ number: num, status: "Failed", error: err.message });
        failedCount++;
      }
    }

    // ✅ Save user-specific broadcast
    const broadcast = new BroadcastModel({
      user: userId,            // user-specific
      template: templateId,
      name: template.name || "Broadcast",
      recipients: numbers.length,
      sentCount,
      failedCount,
      readCount,
      repliedCount,
      status: "sent",
    });

    await broadcast.save();

    res.json({ results, broadcast });

  } catch (err) {
    console.error("sendBulkMessages error:", err);
    res.status(500).json({ message: "Error sending messages", error: err.message });
  }
};
