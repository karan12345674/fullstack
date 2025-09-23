import Product from "../models/product.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: "Name and price required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: req.file ? req.file.path : null, // agar image upload hui hai
      userId: req.userId
    });

    return res.json({ success: true, product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products for logged in user
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId });
    return res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name, price, description },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found or unauthorized" });
    }

    return res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id, userId: req.userId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found or unauthorized" });
    }

    return res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};