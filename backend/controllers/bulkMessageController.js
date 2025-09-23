// controllers/bulkMessageController.js
import Contact from "../models/Contact.js";
import Template from "../models/Template.js";
import MessageLog from "../models/MessageLog.js";
import UserSubscription from "../models/UserSubscription.js";
import { clientsMap } from "./clientStore.js";

export const sendBulkMessage = async (req, res) => {
  try {
    const { templateId, contactIds, sessionId } = req.body;
    if (!templateId || !contactIds || !sessionId)
      return res.status(400).json({ message: "Template, contacts, sessionId required" });

    // ✅ Get user subscription
    // const subscription = await UserSubscription.findOne({
    //   userId: req.userId,
    //   type: "paid",
    //   isActive: true,
    //   endDate: { $gte: new Date() }
    // }).sort({ endDate: -1 });

    // if (!subscription) {
    //   return res.status(403).json({ message: "No active subscription. Buy a plan first." });
    // }

    // const remainingMessages = subscription.totalMessages - subscription.usedMessages;
    // if (contactIds.length > remainingMessages) {
    //   return res.status(400).json({
    //     message: You can only send ${remainingMessages} more messages. Buy a new plan to continue.
    //   });
    // }

      const client = clientsMap.get(sessionId);
      if (!client) return res.status(400).json({ message: "WhatsApp session not connected" });

    const template = await Template.findOne({ _id: templateId, userId: req.userId });
    if (!template) return res.status(404).json({ message: "Template not found" });

    const contacts = await Contact.find({ _id: { $in: contactIds }, userId: req.userId });
    if (!contacts.length) return res.status(404).json({ message: "No contacts found" });

    let sentCount = 0, failedCount = 0;

    for (let contact of contacts) {
      let messageText = template.description || "";
      if (template.buttons && template.buttons.length) {
        messageText += "\n\n";
        template.buttons.forEach((btn, i) => (messageText += `${i + 1}. ${btn.text}: ${btn.action}\n`));
      }

      try {
        let sentMsg;
        if (template.type === "image" && template.fileUrl) {
          sentMsg = await client.sendImage(contact.phoneNumber + "@c.us", __dirname + "/../" + template.fileUrl, messageText);
        } else if (template.type === "video" && template.fileUrl) {
          sentMsg = await client.sendVideo(contact.phoneNumber + "@c.us", __dirname + "/../" + template.fileUrl, messageText);
        } else {
          sentMsg = await client.sendText(contact.phoneNumber + "@c.us", messageText);
        }

        await MessageLog.create({
          userId: req.userId,
          contactId: contact._id,
          templateId: template._id,
          sessionId,
          phoneNumber: contact.phoneNumber,
          status: "sent",
          messageId: sentMsg.id?.id || null
        });

        sentCount++;
      } catch (e) {
        await MessageLog.create({
          userId: req.userId,
          contactId: contact._id,
          templateId: template._id,
          sessionId,
          phoneNumber: contact.phoneNumber,
          status: "failed"
        });
        failedCount++;
      }
    }

    // ✅ Update subscription usedMessages
    // subscription.usedMessages += sentCount;
    // await subscription.save();

    res.json({
      message: "Bulk messages processed",
      sentCount,
      failedCount,
      //remainingMessages: subscription.totalMessages - subscription.usedMessages
    });
  } catch (err) {
    console.error("❌ sendBulkMessage error:", err);
    res.status(500).json({ message: err.message });
  }
};