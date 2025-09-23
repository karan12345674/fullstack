import express from "express";
import { register, login,logout } from "../controllers/userController.js";
const r = express.Router();
 r.post("/register", register); 
 r.post("/login", login);
 r.get("/logout", logout) ;
 
export default r;