import express from "express";
import { createTemplate, getTemplates, updateTemplate, deleteTemplate } from "../controllers/templateController.js";
import { authMiddleware } from "../middleware/auth.js";
import { uploadFile } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create template (with optional file)
router.post("/createTemplate", authMiddleware, uploadFile.single("file"), createTemplate);

// Get all templates
router.get("/getTemplates", authMiddleware, getTemplates);

// Update template (with optional file)
router.put("/:id", authMiddleware, uploadFile.single("file"), updateTemplate);

// Delete template
router.delete("/:id", authMiddleware, deleteTemplate);

export default router;