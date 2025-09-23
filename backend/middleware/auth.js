import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const authMiddleware = (req, res, next) => {
  //console.log("🔥 authMiddleware triggered");
  try {
    const token = req.cookies?.token;

    //console.log("Cookies:", req.cookies)

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    

    req.userId = decoded.id;  // userId ab sab jagah available
   // console.log("Cookies:", req.cookies);
   //console.log("Token from cookies:", req.cookies?.token);

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};