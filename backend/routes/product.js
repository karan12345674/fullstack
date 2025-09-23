import express from "express";
import { createProduct, getMyProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Protected routes
router.post("/createproduct", authMiddleware, createProduct);
router.get("/getMyProducts", authMiddleware, getMyProducts);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;