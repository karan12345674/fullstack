import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Singin from "../assets/singup1.jpg";
import API_BASE_URL from "../config";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [businessType, setBusinessType] = useState("");
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agree) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/user/register`, {
        name,
        email,
        password,
        withCredentials: true
        // businessType,
      });

      if (res.data.success) {
        toast.success("Signup successful!");
        navigate("/signuptwo"); // ✅ redirect after success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster />
      {/* Left Section (Illustration) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src={Singin}
          alt="Signup Illustration"
          className="max-w-md"
        />
      </div>

      {/* Right Section (Form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Signup</h2>

          <form className="space-y-5" onSubmit={handleSignup}>
            {/* Full Name */}
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Business Type */}
            {/* <div>
              <label className="block text-gray-600 mb-1">Business Type</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">Select your business type</option>
                <option value="gym">Gym Owner</option>
                <option value="restaurant">Restaurant</option>
                <option value="classes">Classes</option>
                <option value="mobile-shop">Mobile Shop</option>
                <option value="other">Other</option>
              </select>
            </div> */}

            {/* Terms & Conditions */}
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 text-green-600 mr-2"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I agree to the{" "}
                <a
  href="/Privacytwo"
  className="text-green-600 hover:underline"
  onClick={(e) => {
    e.preventDefault(); // SPA navigation
    navigate("/Privacytwo", { state: { from: "/signup" } });
  }}
>
  Terms & Conditions
</a>

              </span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium text-center block"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}