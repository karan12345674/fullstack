import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../config";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [editId, setEditId] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/product/getMyProducts`,
        { withCredentials: true }
      );
      setProducts(res.data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products!");
      console.error(error);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      if (editId) {
        // Update product
        const res = await axios.put(
          `${API_BASE_URL}/product/${editId}`,
          form,
          { withCredentials: true } // ✅ Added
        );
        toast.success(res.data.message || "Product updated!");
      } else {
        // Add product
        const res = await axios.post(
          `${API_BASE_URL}/product/createproduct`,
          form,
          { withCredentials: true } // ✅ Added
        );
        toast.success(res.data.message || "Product added!");
      }
      setForm({ name: "", price: "", description: "" });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed!");
      console.error(error);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setEditId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/product/${id}`, {
        withCredentials: true, // ✅ Added
      });
      toast.success("Product deleted!");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed!");
     // console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">🛒 Product Manager</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-md"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="mt-6 w-full max-w-md">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md mb-3 flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}