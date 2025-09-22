import React, { useEffect, useState } from "react";
// import Dashboardnavbar from "./components/Dashboardnavbar";
import Teambox from "../assets/teambox.png";
import Bulk from "../assets/bulk.jpg";
import Chatbot from "../assets/chatbot.jpg";

export default function Dashboard() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // LocalStorage se user ka naam uthana
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "User");
      } catch (error) {
        console.error("User parse error:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      {/* <Dashboardnavbar /> */}

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {userName} !
        </h1>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Welcome to SakaAI!
        </h2>

        {/* Sub heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Where would you like to get started?
            </h3>
            <p className="text-gray-600 text-sm">
              Select the feature you'd like to explore
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl border bg-white hover:shadow-lg transition relative">
            <img src={Teambox} alt="Inbox" className="rounded-md mb-4" />
            <h2 className="font-semibold text-lg text-gray-800">
              Unified Team Inbox
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              One place for all your WhatsApp and Instagram interactions
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border bg-green-50 hover:shadow-lg transition relative">
            <img src={Bulk} alt="Broadcasts" className="rounded-md mb-4" />
            <h2 className="font-semibold text-lg text-gray-800">
              Bulk Broadcasts
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Send messages to thousands of WhatsApp users
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border bg-purple-50 hover:shadow-lg transition relative">
            <img src={Chatbot} alt="Chatbots" className="rounded-md mb-4" />
            <h2 className="font-semibold text-lg text-gray-800">
              No-Code Chatbots
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Drag & drop chatbot builder to automate workflows
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}