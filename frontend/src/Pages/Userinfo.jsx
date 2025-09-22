import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Reusable Components
const Button = ({ children, onClick, className }) => (
   <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all ${className}`}
  >
    {children}
  </button>
);

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // agar user nahi mila, login page pe bhejo
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubscribe = () => alert("Subscription clicked");
  const handleStartFreeTrial = () => alert("Start Free Trial clicked");

  if (!user) return null;

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center items-start">
      <motion.div
        className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-600">Manage your account</p>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <p className="text-gray-500">Name</p>
          <p className="font-medium text-lg">{user.name}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-500">Email</p>
          <p className="font-medium text-lg">{user.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSubscribe}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Subscription
          </Button>
          <Button
            onClick={handleStartFreeTrial}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Start Free Trial
          </Button>
          <Button
            onClick={handleLogout}
            className="border border-red-400 text-red-600 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>
      </motion.div>
    </div>
  );
}