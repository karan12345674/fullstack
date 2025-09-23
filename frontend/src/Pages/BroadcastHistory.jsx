import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Link import add kiya
import {
  Download,
  RefreshCcw,
  Check,
  Eye,
  Reply,
  Send,
  X,
} from "lucide-react";

export default function BroadcastHistory() {
  const [dateFrom, setDateFrom] = useState("2025-08-28");
  const [dateTo, setDateTo] = useState("2025-09-04");

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  to="/dashboard/template-library"
                  className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
                >
                  📑 Template Library
                </Link>
                <Link
                  to="/dashboard/your-templates"
                  className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
                >
                  📄 Your Templates
                </Link>
                <Link
                  to="/dashboard/broadcast-history"
                  className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
                >
                  📊 Broadcast History
                </Link>
              </div>
      
              
            </aside>






      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
          <h1 className="text-xl md:text-2xl font-bold">Broadcast History</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full md:w-auto">
            New Broadcast
          </button>
        </div>

        {/* Date Filter */}
        <div className="bg-white p-4 mt-6 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-full md:w-auto">
            <label className="text-sm text-gray-600">Date picker from</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="block border rounded px-3 py-1 mt-1 w-full"
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="text-sm text-gray-600">Date picker to</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="block border rounded px-3 py-1 mt-1 w-full"
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="text-sm text-gray-600">Period</label>
            <select className="block border rounded px-3 py-1 mt-1 w-full">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full sm:w-auto">
              Apply now
            </button>
            <button className="border px-4 py-2 rounded-lg shadow flex items-center justify-center gap-2 w-full sm:w-auto">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
          {[
            { label: "Sent", icon: <Check />, count: 0 },
            { label: "Delivered", icon: <Check />, count: 0 },
            { label: "Read", icon: <Eye />, count: 0 },
            { label: "Replied", icon: <Reply />, count: 0 },
            { label: "Sending", icon: <Send />, count: 0 },
            { label: "Failed", icon: <X />, count: 0 },
            { label: "Processing", icon: <RefreshCcw />, count: 0 },
            { label: "Queued", icon: <RefreshCcw />, count: 0 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center hover:shadow-md transition"
            >
              <span className="text-lg md:text-2xl font-bold">{item.count}</span>
              <span className="text-xs md:text-sm text-gray-600 flex items-center gap-1 mt-1">
                {item.icon} {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Broadcast List */}
        <div className="bg-white mt-6 rounded-lg shadow p-4 overflow-x-auto">
          <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center mb-4">
            <h2 className="font-bold text-lg">Broadcast list</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select className="border rounded px-3 py-1">
                <option>Latest</option>
                <option>Oldest</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-3 py-1"
              />
              <button className="bg-green-600 text-white px-4 py-1 rounded-lg shadow text-sm">
                Updated: Just now
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-2">Broadcast name</th>
                <th className="p-2">Scheduled</th>
                <th className="p-2">Successful</th>
                <th className="p-2">Read</th>
                <th className="p-2">Replied</th>
                <th className="p-2">Recipients</th>
                <th className="p-2">Failed</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-gray-500 text-center" colSpan={9}>
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; 
// import axios from "axios";
// import { Download, RefreshCcw, Check, Eye, Reply, Send, X } from "lucide-react";
// import API_BASE_URL from "../config";
// export default function BroadcastHistory() {
//   const [stats, setStats] = useState({
//     total: 0,
//     sent: 0,
//     failed: 0,
//     replied: 0,
//     replies: [],
//   });

//   const [dateFrom, setDateFrom] = useState("2025-08-28");
//   const [dateTo, setDateTo] = useState("2025-09-04");

//   const API = axios.create({
//     baseURL: ${API_BASE_URL}/messageStats,
//     withCredentials: true,
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const templateId = "template123"; // Aap dynamic bhi bana sakte ho
//       const { data } = await API.get(/getBulkStats?templateId=${templateId});
//       setStats(data);
//     } catch (err) {
//       console.error("Failed to fetch stats:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
//       {/* Sidebar (responsive → top on mobile, left on desktop) */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4">
//         <div className="flex flex-wrap lg:flex-col gap-2">
//           <Link
//             to="/dashboard/template-library"
//             className="px-3 py-2 rounded bg-green-100 text-green-700 font-medium text-sm hover:bg-green-200"
//           >
//             📑 Template Library
//           </Link>
//           <Link
//             to="/dashboard/your-templates"
//             className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
//           >
//             📄 Your Templates
//           </Link>
//           <Link
//             to="/dashboard/broadcast-history"
//             className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
//           >
//             📊 Broadcast History
//           </Link>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Broadcast History</h1>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
//             New Broadcast
//           </button>
//         </div>

//         {/* Date Filter */}
//         <div className="bg-white p-4 mt-6 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center gap-4">
//           <div>
//             <label className="text-sm text-gray-600">Date picker from</label>
//             <input
//               type="date"
//               value={dateFrom}
//               onChange={(e) => setDateFrom(e.target.value)}
//               className="block border rounded px-3 py-1 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">Date picker to</label>
//             <input
//               type="date"
//               value={dateTo}
//               onChange={(e) => setDateTo(e.target.value)}
//               className="block border rounded px-3 py-1 mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">Period</label>
//             <select className="block border rounded px-3 py-1 mt-1">
//               <option>Last 7 days</option>
//               <option>Last 30 days</option>
//               <option>Custom</option>
//             </select>
//           </div>
//           <div className="flex gap-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 mt-2 md:mt-5">
//               Apply now
//             </button>
//             <button className="border px-4 py-2 rounded-lg shadow flex items-center gap-2 mt-2 md:mt-5">
//               <Download size={16} /> Export
//             </button>
//           </div>
//         </div>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
//           {[
//             { label: "Sent", icon: <Check />, count: stats.sent },
//             { label: "Delivered", icon: <Check />, count: stats.sent },
//             { label: "Read", icon: <Eye />, count: stats.replied },
//             { label: "Replied", icon: <Reply />, count: stats.replied },
//             { label: "Sending", icon: <Send />, count: 0 },
//             { label: "Failed", icon: <X />, count: stats.failed },
//             { label: "Processing", icon: <RefreshCcw />, count: 0 },
//             { label: "Queued", icon: <RefreshCcw />, count: 0 },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
//             >
//               <span className="text-2xl font-bold">{item.count}</span>
//               <span className="text-sm text-gray-600 flex items-center gap-1">
//                 {item.icon} {item.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Broadcast List */}
//         <div className="bg-white mt-6 rounded-lg shadow p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-bold text-lg">Replies</h2>
//           </div>

//           {stats.replies.length === 0 ? (
//             <p className="text-gray-500">No replies yet</p>
//           ) : (
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b">
//                   <th className="p-2">Phone</th>
//                   <th className="p-2">Reply Message</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stats.replies.map((r, i) => (
//                   <tr key={i} className="border-t">
//                     <td className="p-2">{r.phoneNumber}</td>
//                     <td className="p-2">{r.message}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }