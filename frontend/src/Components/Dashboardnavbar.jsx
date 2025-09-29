import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate import kiya
import { User } from "lucide-react"; // user icon
import logo from "../assets/logo4.png";

export default function DashboardNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ navigate hook

  // ✅ User icon click handler
  const handleUserClick = () => {
    navigate("/dashboard/profile"); // Userinfo page ka route
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Link to="/dashboard">
          <img
            src={logo}
            alt="Saka Logo"
            className="h-13 cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <li>
          <Link
            to="/dashboard/team-inbox"
            className="hover:text-green-600 focus:outline-none focus:text-green-700"
          >
            Team Inbox
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/broadcast"
            className="hover:text-green-600 focus:outline-none focus:text-green-700"
          >
            Broadcast
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/chatbots"
            className="hover:text-green-600 focus:outline-none focus:text-green-700"
          >
            Product Detail
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/contacts"
            className="hover:text-green-600 focus:outline-none focus:text-green-700"
          >
            Contacts
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/analytics"
            className="hover:text-green-600 focus:outline-none focus:text-green-700"
          >
            Analytics
          </Link>
        </li>
         <li>
          <Link
            to="/dashboard/Businessmanagment"
            className="hover:text-green-600 focus:outline-none focus:text-green-700"
          >
            Business
          </Link>
        </li>
       
      </ul>

      {/* Right: Buttons */}
      <div className="flex items-center gap-4">
        {/* Upgrade Trial Button */}
       

        {/* ✅ User Icon Button */}
        <button
          onClick={handleUserClick} // ✅ yaha direct navigate kar rahe
          className="p-3 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <User className="w-6 h-6 text-gray-700" />
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md md:hidden z-50">
          <ul className="flex flex-col gap-4 p-4 text-sm font-medium text-gray-700">
            <li>
              <Link
                to="/dashboard/team-inbox"
                className="hover:text-green-600 focus:outline-none focus:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team Inbox
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/broadcast"
                className="hover:text-green-600 focus:outline-none focus:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Broadcast
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/chatbots"
                className="hover:text-green-600 focus:outline-none focus:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product Detail
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/contacts"
                className="hover:text-green-600 focus:outline-none focus:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/analytics"
                className="hover:text-green-600 focus:outline-none focus:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/Businessmanagment"
                className="hover:text-green-600 focus:outline-none focus:text-green-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
              Business
              </Link>
            </li>

            {/* Upgrade Button for Mobile */}
           
          </ul>
        </div>
      )}
    </nav>
  );
}