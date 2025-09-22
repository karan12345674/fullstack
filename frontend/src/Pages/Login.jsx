// src/Pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImage from "../assets/Loginimage.png";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();


  // Login handler
  const handleLogin = async (e) => {
  e.preventDefault();

  // 🔹 Admin shortcut check
  if (email === "admin@gmail.com" && password === "sakaai") {
    toast.success("Admin Login successful!");
    localStorage.setItem(
      "user",
      JSON.stringify({ email, role: "admin", name: "Admin" })
    );
    navigate("/admin/*");
    return; // 🔹 backend call skip
  }

  // 🔹 Normal user login
  try {
    const res = await axios.post(
        `${API_BASE_URL}/user/login`,
      { email, password },
      { withCredentials: true }
    );

    if (res.data?.success) {
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } else {
      toast.error(res.data?.message || "Login failed!");
    }
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.response?.data?.message || "Server not reachable!");
  }
};


  // Reset password handler
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/user/reset-password`, {
        email,
        newPassword,
      });
      if (res.data?.success) {
        toast.success("Password updated successfully!");
        setShowReset(false); // back to login form
      } else {
        toast.error(res.data?.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex min-h-screen text-gray-600">
      <Toaster />

      {/* Left Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img src={LoginImage} alt="Login Illustration" className="max-w-md" />
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">
          {!showReset ? (
            <>
              <h2 className="text-3xl font-bold text-green-700 mb-6">Login</h2>
              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4 text-green-600" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-green-600 hover:underline"
                    onClick={() => setShowReset(true)}
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
                >
                  Login
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-green-700 mb-6">Reset Password</h2>
              <form className="space-y-5" onSubmit={handleReset}>
                <div>
                  <label className="block text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    className="text-green-600 hover:underline"
                    onClick={() => setShowReset(false)}
                  >
                    Back to Login
                  </button>
                </div>
                <button
                  type="submit"

                  
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}