// import React, { useEffect, useState } from "react";
// import API_BASE_URL from "../config";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// export default function Analytics() {
//   const [timeline, setTimeline] = useState([]);
//   const [summary, setSummary] = useState([]);

//   // 🔹 Fetch API Data (backend banne ke baad yaha uska URL lagana hoga)
//   const fetchAnalytics = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/analytics`); // 👈 ye backend URL hoga
//       const data = await res.json();
//       setTimeline(data.timeline);
//       setSummary(data.summary);
//     } catch (err) {
//       console.error("Error fetching analytics:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics(); // first load
//     const interval = setInterval(fetchAnalytics, 5000); // refresh every 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
//         {/* Line Chart */}
//         <div className="bg-white rounded-2xl shadow p-4">
//           <h2 className="text-lg font-semibold mb-2">Message Timeline</h2>
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={timeline}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />

//               <Line type="monotone" dataKey="sent" stroke="#2196F3" name="Sent" />
//               <Line type="monotone" dataKey="delivered" stroke="#4CAF50" name="Delivered" />
//               <Line type="monotone" dataKey="read" stroke="#FFC107" name="Read" />
//               <Line type="monotone" dataKey="replied" stroke="#9C27B0" name="Replied" />
//               <Line type="monotone" dataKey="failed" stroke="#F44336" name="Failed" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-2xl shadow p-4">
//           <h2 className="text-lg font-semibold mb-2">Message Summary</h2>
//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={summary}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       </div>
//     </div>
//   );
// }

















// // routes/analytics.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_BASE_URL from "../config";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

// export default function Analytics() {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAnalytics = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/analytics`, { withCredentials: true });
//       if (res.data.success) setUserData(res.data.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//     const interval = setInterval(fetchAnalytics, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {userData.map((user) => (
//         <div key={user.userId} className="bg-gray-50 p-4 rounded-lg shadow space-y-4">
//           <h2 className="font-bold text-lg">User: {user.userId}</h2>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Timeline Line Chart */}
//             <div className="bg-white rounded-2xl shadow p-4">
//               <h3 className="text-md font-semibold mb-2">Message Timeline</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={user.timeline}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="sent" stroke="#2196F3" name="Sent" />
//                   <Line type="monotone" dataKey="delivered" stroke="#4CAF50" name="Delivered" />
//                   <Line type="monotone" dataKey="read" stroke="#FFC107" name="Read" />
//                   <Line type="monotone" dataKey="replied" stroke="#9C27B0" name="Replied" />
//                   <Line type="monotone" dataKey="failed" stroke="#F44336" name="Failed" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Summary Bar Chart */}
//             <div className="bg-white rounded-2xl shadow p-4">
//               <h3 className="text-md font-semibold mb-2">Message Summary</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={user.summary}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }






















import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/analytics`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Agar data object hai, array me convert karo
        const users = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];
        setUserData(users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {userData.map((user) => (
        <div
          key={user.userId || Math.random()}
          className="bg-gray-50 p-4 rounded-lg shadow space-y-4"
        >
          {/* <h2 className="font-bold text-lg">User: {user.userId}</h2> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline Line Chart */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-md font-semibold mb-2">Message Timeline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={user.timeline || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sent"
                    stroke="#2196F3"
                    name="Sent"
                  />
                  <Line
                    type="monotone"
                    dataKey="delivered"
                    stroke="#4CAF50"
                    name="Delivered"
                  />
                  <Line
                    type="monotone"
                    dataKey="read"
                    stroke="#FFC107"
                    name="Read"
                  />
                  <Line
                    type="monotone"
                    dataKey="replied"
                    stroke="#9C27B0"
                    name="Replied"
                  />
                  <Line
                    type="monotone"
                    dataKey="failed"
                    stroke="#F44336"
                    name="Failed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Bar Chart */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-md font-semibold mb-2">Message Summary</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={user.summary || []}>
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
      ))}
    </div>
  );
}
