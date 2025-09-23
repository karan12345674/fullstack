// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/user.js";
// import businessRoutes from "./routes/business.js";
// // import leadsRoutes from "./routes/leads.js";
// // import campaignRoutes from "./routes/campaigns.js";
// // import inboundRoutes from "./routes/inbound.js";
// // import adminRoutes from "./routes/admin.js";
// // import uploadRoutes from "./routes/upload.js";
// // import paymentsRoutes from "./routes/payments.js";
// import productRoutes from "./routes/product.js";
// import cookieParser from "cookie-parser";
// import whatsappRoutes from "./routes/whatsapp.js"
// import contactRoutes from "./routes/contact.js"
// import { reconnectSessions } from "./controllers/whatsappController.js";
// import templateRoutes from "./routes/template.js"
// import freetrailRoutes from "./routes/freetrail.js"
// import bulkMessageRoutes from "./routes/bulkMessage.js"



// const allowedOrigins =['http://sakaai.in', 'https://sakaai.in','http://192.168.0.114:5173'] 


// dotenv.config();
// connectDB();
// const app = express();
// app.use(cors({origin: allowedOrigins, credentials: true}));
// app.use(express.json({ limit: "5mb" }));
// app.use(morgan("dev"));
// app.use(cookieParser());
// //await reconnectSessions();

// app.use("/api/user", userRoutes);
// app.use("/api/user/business", businessRoutes);
// //app.use("/api/leads", leadsRoutes);
// //app.use("/api/campaigns", campaignRoutes);
// //app.use("/api/inbound", inboundRoutes);
// //app.use("/api/admin", adminRoutes);
// //app.use("/api/upload", uploadRoutes);
// //app.use("/api/payments", paymentsRoutes);
// //app.use("/api/leads", leadsRoutes);
// app.use("/api/product", productRoutes);
// //app.use("/api/whatsapp", whatsappRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/template", templateRoutes);
// app.use("/api/user", freetrailRoutes);
// app.use("/api/whatsapp", whatsappRoutes);
// app.use("/api/messages", bulkMessageRoutes);




// app.get("/", (req,res)=> res.send("Saka.ai backend with Twilio/Bull/Stripe ready"));

// const PORT = process.env.PORT || 5000;


// // app.listen(PORT, () => {
// //   console.log(✅ Server running on http://localhost:${PORT});
// // });


// console.log("OpenAI Key from ENV:", process.env.OPENAI_API_KEY);



// app.listen(PORT, '192.168.0.114', () => {
//   console.log(`✅ Server running on ${PORT}`);
// });







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
import { reconnectSessions } from "./controllers/whatsappController.js";
import templateRoutes from "./routes/template.js";
import freetrailRoutes from "./routes/freetrail.js";
import bulkMessageRoutes from "./routes/bulkMessage.js";

const allowedOrigins = [
  "http://sakaai.in",
  "https://sakaai.in",
  "http://192.168.0.114:5173",
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
app.use("/api/product", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/template", templateRoutes);
app.use("/api/user", freetrailRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/messages", bulkMessageRoutes);

app.get("/", (req, res) =>
  res.send("Saka.ai backend with Twilio/Bull/Stripe ready")
);

const PORT = process.env.PORT || 5000;

console.log("✅ OpenAI Key from ENV:", process.env.OPENAI_API_KEY);

app.listen(PORT, "192.168.0.114", () => {
  console.log(`✅ Server running on http://192.168.0.114:${PORT}`);
});
