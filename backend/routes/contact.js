import express from "express";
import multer from "multer";
import {
  uploadContacts,
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// All routes protected by authMiddleware
router.post("/upload", authMiddleware, upload.single("file"), uploadContacts);
router.post("/addContact", authMiddleware, addContact);
router.get("/getContacts", authMiddleware, getContacts);
router.put("/:id", authMiddleware, updateContact);
router.delete("/:id", authMiddleware, deleteContact);

export default router;