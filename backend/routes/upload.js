import express from "express";
import multer from "multer";
import { uploadCSV } from "../controllers/uploadController.js";
const upload = multer({ dest: "uploads/" });
const r = express.Router();
r.post("/csv", upload.single('file'), uploadCSV);
export default r;