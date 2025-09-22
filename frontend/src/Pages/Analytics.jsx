import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {
  const [timeline, setTimeline] = useState([]);
  const [summary, setSummary] = useState([]);

  // 🔹 Fetch API Data (backend banne ke baad yaha uska URL lagana hoga)
  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics`); // 👈 ye backend URL hoga
      const data = await res.json();
      setTimeline(data.timeline);
      setSummary(data.summary);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  useEffect(() => {
    fetchAnalytics(); // first load
    const interval = setInterval(fetchAnalytics, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Message Timeline</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="sent" stroke="#2196F3" name="Sent" />
              <Line type="monotone" dataKey="delivered" stroke="#4CAF50" name="Delivered" />
              <Line type="monotone" dataKey="read" stroke="#FFC107" name="Read" />
              <Line type="monotone" dataKey="replied" stroke="#9C27B0" name="Replied" />
              <Line type="monotone" dataKey="failed" stroke="#F44336" name="Failed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Message Summary</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}