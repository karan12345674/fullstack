import express from "express";
import { register, login,logout,resetPassword } from "../controllers/userController.js";
const r = express.Router();
 r.post("/register", register); 
 r.post("/login", login);
 r.get("/logout", logout) ;
 r.post("/reset-password", resetPassword);
 
export default r;