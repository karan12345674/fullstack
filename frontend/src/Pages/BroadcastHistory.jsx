// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // ✅ Link import add kiya
// import {
//   Download,
//   RefreshCcw,
//   Check,
//   Eye,
//   Reply,
//   Send,
//   X,
// } from "lucide-react";

// export default function BroadcastHistory() {
//   const [dateFrom, setDateFrom] = useState("2025-08-28");
//   const [dateTo, setDateTo] = useState("2025-09-04");

//   return (
//     <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <Link
//                   to="/dashboard/template-library"
//                   className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
//                 >
//                   📑 Template Library
//                 </Link>
//                 <Link
//                   to="/dashboard/your-templates"
//                   className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
//                 >
//                   📄 Your Templates
//                 </Link>
//                 <Link
//                   to="/dashboard/broadcast-history"
//                   className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
//                 >
//                   📊 Broadcast History
//                 </Link>
//               </div>
      
              
//             </aside>






//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
//           <h1 className="text-xl md:text-2xl font-bold">Broadcast History</h1>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full md:w-auto">
//             New Broadcast
//           </button>
//         </div>

//         {/* Date Filter */}
//         <div className="bg-white p-4 mt-6 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center gap-4">
//           <div className="w-full md:w-auto">
//             <label className="text-sm text-gray-600">Date picker from</label>
//             <input
//               type="date"
//               value={dateFrom}
//               onChange={(e) => setDateFrom(e.target.value)}
//               className="block border rounded px-3 py-1 mt-1 w-full"
//             />
//           </div>
//           <div className="w-full md:w-auto">
//             <label className="text-sm text-gray-600">Date picker to</label>
//             <input
//               type="date"
//               value={dateTo}
//               onChange={(e) => setDateTo(e.target.value)}
//               className="block border rounded px-3 py-1 mt-1 w-full"
//             />
//           </div>
//           <div className="w-full md:w-auto">
//             <label className="text-sm text-gray-600">Period</label>
//             <select className="block border rounded px-3 py-1 mt-1 w-full">
//               <option>Last 7 days</option>
//               <option>Last 30 days</option>
//               <option>Custom</option>
//             </select>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//             <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full sm:w-auto">
//               Apply now
//             </button>
//             <button className="border px-4 py-2 rounded-lg shadow flex items-center justify-center gap-2 w-full sm:w-auto">
//               <Download size={16} /> Export
//             </button>
//           </div>
//         </div>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
//           {[
//             { label: "Sent", icon: <Check />, count: 0 },
//             { label: "Delivered", icon: <Check />, count: 0 },
//             { label: "Read", icon: <Eye />, count: 0 },
//             { label: "Replied", icon: <Reply />, count: 0 },
//             { label: "Sending", icon: <Send />, count: 0 },
//             { label: "Failed", icon: <X />, count: 0 },
//             { label: "Processing", icon: <RefreshCcw />, count: 0 },
//             { label: "Queued", icon: <RefreshCcw />, count: 0 },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center hover:shadow-md transition"
//             >
//               <span className="text-lg md:text-2xl font-bold">{item.count}</span>
//               <span className="text-xs md:text-sm text-gray-600 flex items-center gap-1 mt-1">
//                 {item.icon} {item.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Broadcast List */}
//         <div className="bg-white mt-6 rounded-lg shadow p-4 overflow-x-auto">
//           <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center mb-4">
//             <h2 className="font-bold text-lg">Broadcast list</h2>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//               <select className="border rounded px-3 py-1">
//                 <option>Latest</option>
//                 <option>Oldest</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="border rounded px-3 py-1"
//               />
//               <button className="bg-green-600 text-white px-4 py-1 rounded-lg shadow text-sm">
//                 Updated: Just now
//               </button>
//             </div>
//           </div>

//           <table className="w-full text-left border-collapse text-sm md:text-base">
//             <thead>
//               <tr className="border-b bg-gray-50">
//                 <th className="p-2">Broadcast name</th>
//                 <th className="p-2">Scheduled</th>
//                 <th className="p-2">Successful</th>
//                 <th className="p-2">Read</th>
//                 <th className="p-2">Replied</th>
//                 <th className="p-2">Recipients</th>
//                 <th className="p-2">Failed</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="p-2 text-gray-500 text-center" colSpan={9}>
//                   No data available
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




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

  // const [dateFrom, setDateFrom] = useState("2025-08-28");
  // const [dateTo, setDateTo] = useState("2025-09-04");

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
        // <div className="bg-white p-4 mt-6 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center gap-4">
        //   <div>
        //     <label className="text-sm text-gray-600">Date picker from</label>
        //     <input
        //       type="date"
        //       value={dateFrom}
        //       onChange={(e) => setDateFrom(e.target.value)}
        //       className="block border rounded px-3 py-1 mt-1"
        //     />
        //   </div>
        //   <div>
        //     <label className="text-sm text-gray-600">Date picker to</label>
        //     <input
        //       type="date"
        //       value={dateTo}
        //       onChange={(e) => setDateTo(e.target.value)}
        //       className="block border rounded px-3 py-1 mt-1"
        //     />
        //   </div>
        //   <div>
        //     <label className="text-sm text-gray-600">Period</label>
        //     <select className="block border rounded px-3 py-1 mt-1">
        //       <option>Last 7 days</option>
        //       <option>Last 30 days</option>
        //       <option>Custom</option>
        //     </select>
        //   </div>
        //   <div className="flex gap-2">
        //     <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 mt-2 md:mt-5">
        //       Apply now
        //     </button>
        //     <button className="border px-4 py-2 rounded-lg shadow flex items-center gap-2 mt-2 md:mt-5">
        //       <Download size={16} /> Export
        //     </button>
        //   </div>
        // </div>

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















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Download,
//   RefreshCcw,
//   Check,
//   Eye,
//   Reply,
//   Send,
//   X,
// } from "lucide-react";

// export default function BroadcastHistory() {
//   const [dateFrom, setDateFrom] = useState("2025-08-28");
//   const [dateTo, setDateTo] = useState("2025-09-04");
//   const [broadcasts, setBroadcasts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Backend API call
//   useEffect(() => {
//     const fetchBroadcasts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/broadcasts"); // 🔗 apna backend URL
//         const data = await res.json();
//         if (data.success) {
//           setBroadcasts(data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching broadcasts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBroadcasts();
//   }, []);

//   // ✅ Overview counts calculate
//   const totalStats = broadcasts.reduce(
//     (acc, b) => {
//       acc.sent += b.sentCount || 0;
//       acc.delivered += b.deliveredCount || 0;
//       acc.read += b.readCount || 0;
//       acc.replied += b.repliedCount || 0;
//       acc.failed += b.failedCount || 0;
//       if (b.status === "sending") acc.sending += 1;
//       if (b.status === "processing") acc.processing += 1;
//       if (b.status === "queued") acc.queued += 1;
//       return acc;
//     },
//     {
//       sent: 0,
//       delivered: 0,
//       read: 0,
//       replied: 0,
//       sending: 0,
//       failed: 0,
//       processing: 0,
//       queued: 0,
//     }
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//         <div className="flex flex-wrap gap-2 mb-4">
//           <Link
//             to="/dashboard/template-library"
//             className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
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
//       <div className="flex-1 p-4 md:p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
//           <h1 className="text-xl md:text-2xl font-bold">Broadcast History</h1>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full md:w-auto">
//             New Broadcast
//           </button>
//         </div>

//         {/* Date Filter */}
//         <div className="bg-white p-4 mt-6 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center gap-4">
//           <div className="w-full md:w-auto">
//             <label className="text-sm text-gray-600">Date picker from</label>
//             <input
//               type="date"
//               value={dateFrom}
//               onChange={(e) => setDateFrom(e.target.value)}
//               className="block border rounded px-3 py-1 mt-1 w-full"
//             />
//           </div>
//           <div className="w-full md:w-auto">
//             <label className="text-sm text-gray-600">Date picker to</label>
//             <input
//               type="date"
//               value={dateTo}
//               onChange={(e) => setDateTo(e.target.value)}
//               className="block border rounded px-3 py-1 mt-1 w-full"
//             />
//           </div>
//           <div className="w-full md:w-auto">
//             <label className="text-sm text-gray-600">Period</label>
//             <select className="block border rounded px-3 py-1 mt-1 w-full">
//               <option>Last 7 days</option>
//               <option>Last 30 days</option>
//               <option>Custom</option>
//             </select>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//             <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full sm:w-auto">
//               Apply now
//             </button>
//             <button className="border px-4 py-2 rounded-lg shadow flex items-center justify-center gap-2 w-full sm:w-auto">
//               <Download size={16} /> Export
//             </button>
//           </div>
//         </div>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
//           {[
//             { label: "Sent", icon: <Check />, count: totalStats.sent },
//             { label: "Delivered", icon: <Check />, count: totalStats.delivered },
//             { label: "Read", icon: <Eye />, count: totalStats.read },
//             { label: "Replied", icon: <Reply />, count: totalStats.replied },
//             { label: "Sending", icon: <Send />, count: totalStats.sending },
//             { label: "Failed", icon: <X />, count: totalStats.failed },
//             { label: "Processing", icon: <RefreshCcw />, count: totalStats.processing },
//             { label: "Queued", icon: <RefreshCcw />, count: totalStats.queued },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center hover:shadow-md transition"
//             >
//               <span className="text-lg md:text-2xl font-bold">{item.count}</span>
//               <span className="text-xs md:text-sm text-gray-600 flex items-center gap-1 mt-1">
//                 {item.icon} {item.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Broadcast List */}
//         <div className="bg-white mt-6 rounded-lg shadow p-4 overflow-x-auto">
//           <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center mb-4">
//             <h2 className="font-bold text-lg">Broadcast list</h2>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//               <select className="border rounded px-3 py-1">
//                 <option>Latest</option>
//                 <option>Oldest</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="border rounded px-3 py-1"
//               />
//               <button className="bg-green-600 text-white px-4 py-1 rounded-lg shadow text-sm">
//                 Updated: Just now
//               </button>
//             </div>
//           </div>

//           <table className="w-full text-left border-collapse text-sm md:text-base">
//             <thead>
//               <tr className="border-b bg-gray-50">
//                 <th className="p-2">Broadcast name</th>
//                 <th className="p-2">Created</th>
//                 <th className="p-2">Sent</th>
//                 <th className="p-2">Read</th>
//                 <th className="p-2">Replied</th>
//                 <th className="p-2">Recipients</th>
//                 <th className="p-2">Failed</th>
//                 <th className="p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={8} className="p-2 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : broadcasts.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="p-2 text-center text-gray-500">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 broadcasts.map((b) => (
//                   <tr key={b._id} className="border-b">
//                     <td className="p-2">{b.name}</td>
//                     <td className="p-2">{new Date(b.createdAt).toLocaleString()}</td>
//                     <td className="p-2">{b.sentCount}</td>
//                     <td className="p-2">{b.readCount}</td>
//                     <td className="p-2">{b.repliedCount}</td>
//                     <td className="p-2">{b.recipients}</td>
//                     <td className="p-2">{b.failedCount}</td>
//                     <td className="p-2 capitalize">{b.status}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }









// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API_BASE_URL from "../config";
// import {
//   Download,
//   RefreshCcw,
//   Check,
//   Eye,
//   Reply,
//   Send,
//   X,
// } from "lucide-react";

// export default function BroadcastHistory() {
//   const [dateFrom, setDateFrom] = useState("2025-08-28");
//   const [dateTo, setDateTo] = useState("2025-09-04");
//   const [broadcast, setBroadcast] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ API call to get user message broadcast stats
//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token"); // 👈 login token
//       if (!token) return; // अगर token नहीं है तो return

//       const res = await fetch(`${API_BASE_URL}/broadcasts/stats`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, // 👈 backend को auth भेजो
//         },
//       });

//       const data = await res.json();
//       if (data.success) setBroadcast(data.data);
//     } catch (err) {
//       console.error("Error fetching broadcast stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     const interval = setInterval(fetchStats, 5000); // every 5 sec update live
//     return () => clearInterval(interval);
//   }, []);

//   // Overview counts
//   const totalStats = {
//     sent: broadcast?.sentCount || 0,
//     delivered: broadcast?.deliveredCount || 0,
//     read: broadcast?.readCount || 0,
//     replied: broadcast?.repliedCount || 0,
//     failed: broadcast?.failedCount || 0,
//     sending: broadcast?.sending || 0,
//     processing: broadcast?.processing || 0,
//     queued: broadcast?.queued || 0,
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//         <div className="flex flex-wrap gap-2 mb-4">
//           <Link
//             to="/dashboard/template-library"
//             className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
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
//       <div className="flex-1 p-4 md:p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
//           <h1 className="text-xl md:text-2xl font-bold">Broadcast History</h1>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full md:w-auto">
//             New Broadcast
//           </button>
//         </div>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
//           {[
//             { label: "Sent", icon: <Check />, count: totalStats.sent },
//             { label: "Delivered", icon: <Check />, count: totalStats.delivered },
//             { label: "Read", icon: <Eye />, count: totalStats.read },
//             { label: "Replied", icon: <Reply />, count: totalStats.replied },
//             { label: "Sending", icon: <Send />, count: totalStats.sending },
//             { label: "Failed", icon: <X />, count: totalStats.failed },
//             { label: "Processing", icon: <RefreshCcw />, count: totalStats.processing },
//             { label: "Queued", icon: <RefreshCcw />, count: totalStats.queued },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center hover:shadow-md transition"
//             >
//               <span className="text-lg md:text-2xl font-bold">{item.count}</span>
//               <span className="text-xs md:text-sm text-gray-600 flex items-center gap-1 mt-1">
//                 {item.icon} {item.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Broadcast List */}
//         <div className="bg-white mt-6 rounded-lg shadow p-4 overflow-x-auto">
//           <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center mb-4">
//             <h2 className="font-bold text-lg">User Messages</h2>
//           </div>

//           <table className="w-full text-left border-collapse text-sm md:text-base">
//             <thead>
//               <tr className="border-b bg-gray-50">
//                 <th className="p-2">Sent</th>
//                 <th className="p-2">Delivered</th>
//                 <th className="p-2">Read</th>
//                 <th className="p-2">Replied</th>
//                 <th className="p-2">Failed</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="p-2 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : (
//                 <tr>
//                   <td className="p-2">{totalStats.sent}</td>
//                   <td className="p-2">{totalStats.delivered}</td>
//                   <td className="p-2">{totalStats.read}</td>
//                   <td className="p-2">{totalStats.replied}</td>
//                   <td className="p-2">{totalStats.failed}</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import API_BASE_URL from "../config";
// import {
//   Download,
//   RefreshCcw,
//   Check,
//   Eye,
//   Reply,
//   Send,
//   X,
// } from "lucide-react";

// export default function BroadcastHistory() {
//   const [broadcast, setBroadcast] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ API call using axios with token
//   const fetchStats = async () => {
//     try {
      
//       const res = await axios.get(`${API_BASE_URL}/broadcasts/stats`, {
//         withCredentials: true, // agar cookies bhi chahiye
//       });

//       if (res.data.success) setBroadcast(res.data.data);
//     } catch (err) {
//       console.error("Error fetching broadcast stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     const interval = setInterval(fetchStats, 5000); // 5 sec live update
//     return () => clearInterval(interval);
//   }, []);

//   const totalStats = {
//     sent: broadcast?.sentCount || 0,
//     delivered: broadcast?.deliveredCount || 0,
//     read: broadcast?.readCount || 0,
//     replied: broadcast?.repliedCount || 0,
//     failed: broadcast?.failedCount || 0,
//     sending: broadcast?.sending || 0,
//     processing: broadcast?.processing || 0,
//     queued: broadcast?.queued || 0,
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//         <div className="flex flex-wrap gap-2 mb-4">
//           <Link
//             to="/dashboard/template-library"
//             className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
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
//       <div className="flex-1 p-4 md:p-6">
//         <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
//           <h1 className="text-xl md:text-2xl font-bold">Broadcast History</h1>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full md:w-auto">
//             New Broadcast
//           </button>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
//           {[
//             { label: "Sent", icon: <Check />, count: totalStats.sent },
//             { label: "Delivered", icon: <Check />, count: totalStats.delivered },
//             { label: "Read", icon: <Eye />, count: totalStats.read },
//             { label: "Replied", icon: <Reply />, count: totalStats.replied },
//             { label: "Sending", icon: <Send />, count: totalStats.sending },
//             { label: "Failed", icon: <X />, count: totalStats.failed },
//             { label: "Processing", icon: <RefreshCcw />, count: totalStats.processing },
//             { label: "Queued", icon: <RefreshCcw />, count: totalStats.queued },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center hover:shadow-md transition"
//             >
//               <span className="text-lg md:text-2xl font-bold">{item.count}</span>
//               <span className="text-xs md:text-sm text-gray-600 flex items-center gap-1 mt-1">
//                 {item.icon} {item.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white mt-6 rounded-lg shadow p-4 overflow-x-auto">
//           <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center mb-4">
//             <h2 className="font-bold text-lg">User Messages</h2>
//           </div>

//           <table className="w-full text-left border-collapse text-sm md:text-base">
//             <thead>
//               <tr className="border-b bg-gray-50">
//                 <th className="p-2">Sent</th>
//                 <th className="p-2">Delivered</th>
//                 <th className="p-2">Read</th>
//                 <th className="p-2">Replied</th>
//                 <th className="p-2">Failed</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="p-2 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : (
//                 <tr>
//                   <td className="p-2">{totalStats.sent}</td>
//                   <td className="p-2">{totalStats.delivered}</td>
//                   <td className="p-2">{totalStats.read}</td>
//                   <td className="p-2">{totalStats.replied}</td>
//                   <td className="p-2">{totalStats.failed}</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
















import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import {
  Check,
  Eye,
  Reply,
  Send,
  X,
  RefreshCcw,
  Download,

} from "lucide-react";



export default function BroadcastHistory() {
  const [broadcast, setBroadcast] = useState([]);
  const [loading, setLoading] = useState(true);
 const [dateFrom, setDateFrom] = useState("2025-08-28");
  const [dateTo, setDateTo] = useState("2025-09-04");
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/broadcasts/stats`, {
        withCredentials: true,
      });
      if (res.data.success) setBroadcast(res.data.data);
    } catch (err) {
      console.error("Error fetching broadcast stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Calculate total counts for all users
  const totalStats = broadcast.reduce(
    (totals, b) => {
      totals.sent += b.sentCount || 0;
      totals.delivered += b.deliveredCount || 0;
      totals.read += b.readCount || 0;
      totals.replied += b.repliedCount || 0;
      totals.failed += b.failedCount || 0;
      totals.sending += b.sending || 0;
      totals.processing += b.processing || 0;
      totals.queued += b.queued || 0;
      return totals;
    },
    { sent: 0, delivered: 0, read: 0, replied: 0, failed: 0, sending: 0, processing: 0, queued: 0 }
  );

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
        <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
          <h1 className="text-xl md:text-2xl font-bold">Broadcast History</h1>
          {/* <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 w-full md:w-auto">
            New Broadcast
          </button> */}
        </div>

          <div className="bg-white p-4 mt-6 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center gap-4">
          <div>
            <label className="text-sm text-gray-600">Date picker from</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="block border rounded px-3 py-1 mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Date picker to</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="block border rounded px-3 py-1 mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Period</label>
            <select className="block border rounded px-3 py-1 mt-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 mt-2 md:mt-5">
              Apply now
            </button>
            {/* <button className="border px-4 py-2 rounded-lg shadow flex items-center gap-2 mt-2 md:mt-5">
              <Download size={16} /> Export
            </button> */}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
          {[
            { label: "Sent", icon: <Check />, count: totalStats.sent },
            // { label: "Delivered", icon: <Check />, count: totalStats.delivered },
            // { label: "Read", icon: <Eye />, count: totalStats.read },
            { label: "Replied", icon: <Reply />, count: totalStats.replied },
            { label: "Sending", icon: <Send />, count: totalStats.sending },
            { label: "Failed", icon: <X />, count: totalStats.failed },
            { label: "Total/month", icon: <totalStats />, count: totalStats.processing },
            // { label: "Queued", icon: <RefreshCcw />, count: totalStats.queued },
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

        {/* Broadcast List Table */}
        <div className="bg-white mt-6 rounded-lg shadow p-4 overflow-x-auto">
          <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center mb-4">
            <h2 className="font-bold text-lg">User Messages</h2>
          </div>

          <table className="w-full text-left border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-2">Name</th>
                <th className="p-2">Sent</th>
                <th className="p-2">Delivered</th>
                <th className="p-2">Read</th>
                <th className="p-2">Replied</th>
                <th className="p-2">Failed</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-2 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : broadcast.length > 0 ? (
                broadcast.map((item) => (
                  <tr key={item._id}>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.sentCount}</td>
                    <td className="p-2">{item.deliveredCount}</td>
                    <td className="p-2">{item.readCount}</td>
                    <td className="p-2">{item.repliedCount}</td>
                    <td className="p-2">{item.failedCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-2 text-center text-gray-500">
                    No broadcasts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}










