import axios from "axios";

export async function notifyOwner(url, payload) {
  try {
    const res = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ Webhook sent:", res.status, url);
    return res.data;
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return null;
  }
}