







import dotenv from "dotenv";
dotenv.config();  // sabse upar rakho

import express from "express";
import cors from "cors";

import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import businessRoutes from "./routes/business.js";
import productRoutes from "./routes/product.js";
import cookieParser from "cookie-parser";
import whatsappRoutes from "./routes/whatsapp.js";
import contactRoutes from "./routes/contact.js";
//import { reconnectSessions } from "./controllers/whatsappController.js";
import templateRoutes from "./routes/template.js";
import freetrailRoutes from "./routes/freetrail.js";
import bulkMessageRoutes from "./routes/bulkMessage.js";
import broadcastRoutes from "./routes/broadcast.js";
import analyticsRoutes from "./controllers/analytics.js";
import adminRoutes from "./controllers/adminController.js";
import planRoutes from "./routes/plan.js";
import subscriptionRoutes from "./routes/subscription.js";
import adminBillingRoutes from "./controllers/adminBilling.js";
import adminClientsRoutes from "./controllers/adminClients.js";
import adminClientprofileRoutes from "./controllers/adminclientprofile.js";


const allowedOrigins = [
  "http://sakaai.in",
  "https://sakaai.in",
  
];

connectDB();

const app = express();
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.use(cookieParser());
// await reconnectSessions();

app.use("/api/user", userRoutes);
app.use("/api/user/business", businessRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/template", templateRoutes);
app.use("/api/user", freetrailRoutes);
app.use("/api", whatsappRoutes);
app.use("/api/messages", bulkMessageRoutes);
app.use("/api/broadcasts", broadcastRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin/billing", adminBillingRoutes);
app.use("/api/admin/clients", adminClientsRoutes);
app.use("/api/admin", adminClientprofileRoutes);
app.get("/", (req, res) =>
  res.send("Saka.ai backend with Twilio/Bull/Stripe ready")
);

const PORT = process.env.PORT;

console.log("✅ OpenAI Key from ENV:", process.env.OPENAI_API_KEY);


app.listen(PORT,  () => {
  console.log(`✅ Server running on ${PORT}`);
});
