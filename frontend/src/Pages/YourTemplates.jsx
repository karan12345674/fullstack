// import React from "react";
// import { Link } from "react-router-dom";

// export default function YourTemplates() {
//   const templates = [
//     // Example template data
//     // { name: "Order_Confirmation", category: "E-Commerce", status: "Approved", language: "English", updated: "2025-09-13" }
//   ];

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//         <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-50">
//           📩 Template Messages
//         </button>

//         <Link
//           to="/dashboard/template-library"
//           className="block w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-green-600 hover:text-white transition"
//         >
//           📑 Template Library
//         </Link>

//         <Link
//           to="/dashboard/your-templates"
//           className="block w-full text-left px-3 py-2 rounded bg-green-100 text-green-700 font-medium"
//         >
//           📄 Your Templates
//         </Link>

//         <Link
//           to="/dashboard/broadcast-history"
//           className="block w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
//         >
//           📊 Broadcast History
//         </Link>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
//           <h1 className="text-2xl font-bold text-gray-800">Your Templates</h1>
//           <Link
//             to="/dashboard/new-template"
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             New Template Message
//           </Link>
//         </div>

//         <p className="text-gray-600 mb-4 sm:mb-6">
//           Select or create your template and submit it for WhatsApp approval.
//         </p>

//         {/* Table */}
//         <div className="overflow-x-auto border rounded-lg shadow-sm bg-white mb-6">
//           <table className="min-w-full text-sm text-left text-gray-600">
//             <thead className="bg-gray-100 text-gray-800 font-semibold">
//               <tr>
//                 <th className="px-4 py-2">Template Name</th>
//                 <th className="px-4 py-2">Category</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Language</th>
//                 <th className="px-4 py-2">Last Updated</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {templates.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-6 text-gray-500">
//                     🙁 कोई templates available नहीं हैं। पहले एक बनाएँ!
//                   </td>
//                 </tr>
//               ) : (
//                 templates.map((t, i) => (
//                   <tr key={i} className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2 text-blue-600 cursor-pointer">{t.name}</td>
//                     <td className="px-4 py-2">{t.category}</td>
//                     <td className="px-4 py-2">
//                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
//                         {t.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2">{t.language}</td>
//                     <td className="px-4 py-2">{t.updated}</td>
//                     <td className="px-4 py-2 flex flex-wrap gap-2">
//                       <button className="text-gray-500 hover:text-blue-600 transition">📋</button>
//                       <button className="text-gray-500 hover:text-green-600 transition">👁</button>
//                       <button className="text-gray-500 hover:text-red-600 transition">🗑</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Space after table + optional info */}
//         <div className="mb-6 text-gray-500 text-sm">
//           You can create a new broadcast or select an existing template to start.
//         </div>
//       </main>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function YourTemplates() {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Backend base URL
//   const BASE_URL = "http://192.168.0.113:5000/api/template";

//   // Fetch templates on mount
//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(${BASE_URL}/getTemplates, {
//         withCredentials: true, // if you use cookies for auth
//       });
//       setTemplates(res.data);
//     } catch (err) {
//       console.error("Error fetching templates:", err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete template
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this template?")) return;

//     try {
//       await axios.delete(${BASE_URL}/deleteTemplate/${id}, {
//         withCredentials: true,
//       });
//       setTemplates((prev) => prev.filter((t) => t._id !== id));
//       alert("Template deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting template:", err.response?.data || err.message);
//       alert("Failed to delete template!");
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//         <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-50">
//           📩 Template Messages
//         </button>
//         <Link
//           to="/dashboard/template-library"
//           className="block w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-green-600 hover:text-white transition"
//         >
//           📑 Template Library
//         </Link>
//         <Link
//           to="/dashboard/your-templates"
//           className="block w-full text-left px-3 py-2 rounded bg-green-100 text-green-700 font-medium"
//         >
//           📄 Your Templates
//         </Link>
//         <Link
//           to="/dashboard/broadcast-history"
//           className="block w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
//         >
//           📊 Broadcast History
//         </Link>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
//           <h1 className="text-2xl font-bold text-gray-800">Your Templates</h1>
//           <Link
//             to="/dashboard/new-template"
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             New Template Message
//           </Link>
//         </div>

//         <p className="text-gray-600 mb-4 sm:mb-6">
//           Select or create your template and submit it for WhatsApp approval.
//         </p>

//         {/* Table */}
//         <div className="overflow-x-auto border rounded-lg shadow-sm bg-white mb-6">
//           <table className="min-w-full text-sm text-left text-gray-600">
//             <thead className="bg-gray-100 text-gray-800 font-semibold">
//               <tr>
//                 <th className="px-4 py-2">Template Name</th>
//                 <th className="px-4 py-2">Category</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Language</th>
//                 <th className="px-4 py-2">Last Updated</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-6 text-gray-500">
//                     Loading templates...
//                   </td>
//                 </tr>
//               ) : templates.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-6 text-gray-500">
//                     🙁 कोई templates available नहीं हैं। पहले एक बनाएँ!
//                   </td>
//                 </tr>
//               ) : (
//                 templates.map((t) => (
//                   <tr key={t._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2 text-blue-600 cursor-pointer">{t.name}</td>
//                     <td className="px-4 py-2">{t.category}</td>
//                     <td className="px-4 py-2">
//                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
//                         {t.status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2">{t.language}</td>
//                     <td className="px-4 py-2">
//                       {new Date(t.updatedAt || t.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2 flex flex-wrap gap-2">
//                       <Link
//                         to={/dashboard/new-template/${t._id}}
//                         className="text-gray-500 hover:text-blue-600 transition"
//                       >
//                         👁 Edit

//                       </Link>
//                       <button
//                         onClick={() => handleDelete(t._id)}
//                         className="text-gray-500 hover:text-red-600 transition"
//                       >
//                         🗑 Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="mb-6 text-gray-500 text-sm">
//           You can create a new broadcast or select an existing template to start.
//         </div>
//       </main>
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function YourTemplates() {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Backend base URL
//   const BASE_URL = "http://192.168.0.113:5000/api/template";

//   // Fetch templates on mount
//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(${BASE_URL}/getTemplates, {
//         withCredentials: true, // if you use cookies for auth
//       });
//       setTemplates(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching templates:", err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete template
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this template?")) return;

//     try {
//       await axios.delete(${BASE_URL}/${id}, {
//         withCredentials: true,
//       });
//       setTemplates((prev) => prev.filter((t) => t._id !== id));
//       alert("✅ Template deleted successfully!");
//     } catch (err) {
//       console.error("❌ Error deleting template:", err.response?.data || err.message);
//       alert("Failed to delete template!");
//     }
//   };

//   // Navigate to edit page
//   const handleEdit = (id) => {
//     navigate(/dashboard/new-template/${id});
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//         <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-50">
//           📩 Template Messages
//         </button>
//         <button
//           onClick={() => navigate("/dashboard/template-library")}
//           className="block w-full px-4 py-2 rounded-lg bg-gray-100 hover:bg-green-600 hover:text-white transition"
//         >
//           📑 Template Library
//         </button>
//         <button
//           onClick={() => navigate("/dashboard/your-templates")}
//           className="block w-full text-left px-3 py-2 rounded bg-green-100 text-green-700 font-medium"
//         >
//           📄 Your Templates
//         </button>
//         <button
//           onClick={() => navigate("/dashboard/broadcast-history")}
//           className="block w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
//         >
//           📊 Broadcast History
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
//           <h1 className="text-2xl font-bold text-gray-800">Your Templates</h1>
//           <button
//             onClick={() => navigate("/dashboard/new-template")}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             ➕ New Template Message
//           </button>
//         </div>

//         <p className="text-gray-600 mb-4 sm:mb-6">
//           Select or create your template and submit it for WhatsApp approval.
//         </p>

//         {/* Table */}
//         <div className="overflow-x-auto border rounded-lg shadow-sm bg-white mb-6">
//           <table className="min-w-full text-sm text-left text-gray-600">
//             <thead className="bg-gray-100 text-gray-800 font-semibold">
//               <tr>
//                 <th className="px-4 py-2">Template Name</th>
//                 <th className="px-4 py-2">Category</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Language</th>
//                 <th className="px-4 py-2">Last Updated</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-6 text-gray-500">
//                     Loading templates...
//                   </td>
//                 </tr>
//               ) : templates.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-6 text-gray-500">
//                     🙁 कोई templates available नहीं हैं। पहले एक बनाएँ!
//                   </td>
//                 </tr>
//               ) : (
//                 templates.map((t) => (
//                   <tr key={t._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2 text-blue-600 cursor-pointer">{t.name}</td>
//                     <td className="px-4 py-2">{t.category}</td>
//                     <td className="px-4 py-2">
//                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
//                         {t.status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2">{t.language}</td>
//                     <td className="px-4 py-2">
//                       {new Date(t.updatedAt || t.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2 flex flex-wrap gap-2">
//                       <button
//                         onClick={() => handleEdit(t._id)}
//                         className="text-gray-500 hover:text-blue-600 transition"
//                       >
//                         👁 Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(t._id)}
//                         className="text-gray-500 hover:text-red-600 transition"
//                       >
//                         🗑 Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="mb-6 text-gray-500 text-sm">
//           You can create a new broadcast or select an existing template to start.
//         </div>
//       </main>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast"; // ✅ toast import

// export default function YourTemplates() {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const BASE_URL = "http://192.168.0.113:5000/api/template";

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(${BASE_URL}/getTemplates, {
//         withCredentials: true,
//       });
//       setTemplates(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching templates:", err.response?.data || err.message);
//       toast.error("Failed to fetch templates!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this template?")) return;

//     try {
//       await axios.delete(${BASE_URL}/${id}, { withCredentials: true });
//       setTemplates((prev) => prev.filter((t) => t._id !== id));
//       toast.success("✅ Template deleted successfully!"); // ✅ toast success
//     } catch (err) {
//       console.error("❌ Error deleting template:", err.response?.data || err.message);
//       toast.error("❌ Failed to delete template!"); // ✅ toast error
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(/dashboard/new-template/${id});
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
//       <Toaster position="top-right" /> {/* ✅ Toast container */}

//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
//         {/* <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-50">
//           📩 Template Messages
//         </button> */}
//         <button
//           onClick={() => navigate("/dashboard/template-library")}
//           className="px-3 py-2 rounded bg-green-100 text-700 font-medium text-sm hover:bg-green-200"
//         >
//           📑 Template Library
//         </button>
//         <button
//           onClick={() => navigate("/dashboard/your-templates")}
//           className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
//         >
//           📄 Your Templates
//         </button>
//         <button
//           onClick={() => navigate("/dashboard/broadcast-history")}
//           className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
//         >
//           📊 Broadcast History
//         </button>
    
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
//           <h1 className="text-2xl font-bold text-gray-800">Your Templates</h1>
//           <button
//             onClick={() => navigate("/dashboard/new-template")}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             ➕ New Template Message
//           </button>
//         </div>

//         <p className="text-gray-600 mb-4 sm:mb-6">
//           Select or create your template and submit it for WhatsApp approval.
//         </p>

//         <div className="overflow-x-auto border rounded-lg shadow-sm bg-white mb-6">
//           <table className="min-w-full text-sm text-left text-gray-600">
//             <thead className="bg-gray-100 text-gray-800 font-semibold">
//               <tr>
//                 <th className="px-4 py-2">Template Name</th>
//                 <th className="px-4 py-2">Category</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Language</th>
//                 <th className="px-4 py-2">Last Updated</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-6 text-gray-500">
//                     Loading templates...
//                   </td>
//                 </tr>
//               ) : templates.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center p-6 text-gray-500">
//                     🙁 कोई templates available नहीं हैं। पहले एक बनाएँ!
//                   </td>
//                 </tr>
//               ) : (
//                 templates.map((t) => (
//                   <tr key={t._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2 text-blue-600 cursor-pointer">{t.name}</td>
//                     <td className="px-4 py-2">{t.category}</td>
//                     <td className="px-4 py-2">
//                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
//                         {t.status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2">{t.language}</td>
//                     <td className="px-4 py-2">
//                       {new Date(t.updatedAt || t.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2 flex flex-wrap gap-2">
//                       <button
//                         onClick={() => handleEdit(t._id)}
//                         className="text-gray-500 hover:text-blue-600 transition"
//                       >
//                         👁 Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(t._id)}
//                         className="text-gray-500 hover:text-red-600 transition"
//                       >
//                         🗑 Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="mb-6 text-gray-500 text-sm">
//           You can create a new broadcast or select an existing template to start.
//         </div>
//       </main>
//     </div>
//   );
// }







import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // ✅ toast import
import API_BASE_URL from "../config";

export default function YourTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Bulk message related states
  const [contacts, setContacts] = useState([]);            // ✅ backend से contacts
  const [selectedTemplate, setSelectedTemplate] = useState(""); // ✅ backend को चाहिए
  const [selectedContacts, setSelectedContacts] = useState([]); // ✅ backend को चाहिए
  const [sessionId, setSessionId] = useState("");          // ✅ backend को चाहिए
  const [sending, setSending] = useState(false);

  const BASE_URL = `${API_BASE_URL}/template`;
  const CONTACTS_URL =`${API_BASE_URL}/contact`; // contacts API
  const MESSAGES_URL = `${API_BASE_URL}/messages;` // send bulk API

  useEffect(() => {
    fetchTemplates();
    fetchContacts(); // 🔹 load contacts on mount
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/getTemplates`, {
        withCredentials: true,
      });
      setTemplates(res.data);
    } catch (err) {
      console.error("❌ Error fetching templates:", err.response?.data || err.message);
      toast.error("Failed to fetch templates!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${CONTACTS_URL}/getContacts`, { withCredentials: true });
      setContacts(res.data);
    } catch (err) {
      console.error("❌ Error fetching contacts:", err.response?.data || err.message);
      toast.error("Failed to fetch contacts!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      setTemplates((prev) => prev.filter((t) => t._id !== id));
      toast.success("✅ Template deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting template:", err.response?.data || err.message);
      toast.error("❌ Failed to delete template!");
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/new-template/${id}`);
  };

  // 🔹 Contact select/unselect logic
  const toggleContact = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // 🔹 Send bulk message
  const handleSend = async () => {
    if (!selectedTemplate || selectedContacts.length === 0 || !sessionId) {
      toast.error("⚠ Template, contacts और sessionId ज़रूरी हैं");
      return;
    }

    setSending(true);
    try {
      const res = await axios.post(
        `${MESSAGES_URL}/send`,
        {
          templateId: selectedTemplate,
          contactIds: selectedContacts,
          sessionId: sessionId,
        },
        { withCredentials: true }
      );

      toast.success(
        `✅ Sent: ${res.data.sentCount}, ❌ Failed: ${res.data.failedCount}, Remaining: ${res.data.remainingMessages}`
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Message भेजने में error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Toaster position="top-right" /> {/* ✅ Toast container */}

      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4 space-y-4">
        <button
          onClick={() => navigate("/dashboard/template-library")}
          className="px-3 py-2 rounded bg-green-100 text-700 font-medium text-sm hover:bg-green-200"
        >
          📑 Template Library
        </button>
        <button
          onClick={() => navigate("/dashboard/your-templates")}
          className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
        >
          📄 Your Templates
        </button>
        <button
          onClick={() => navigate("/dashboard/broadcast-history")}
          className="px-3 py-2 rounded bg-gray-100 text-gray-800 font-medium text-sm hover:bg-green-50"
        >
          📊 Broadcast History
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Your Templates</h1>
          <button
            onClick={() => navigate("/dashboard/new-template")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ➕ New Template Message
          </button>
        </div>

        <p className="text-gray-600 mb-4 sm:mb-6">
          Select or create your template and submit it for WhatsApp approval.
        </p>

        <div className="overflow-x-auto border rounded-lg shadow-sm bg-white mb-6">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="px-4 py-2">Template Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Language</th>
                <th className="px-4 py-2">Last Updated</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    Loading templates...
                  </td>
                </tr>
              ) : templates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    🙁 कोई templates available नहीं हैं। पहले एक बनाएँ!
                  </td>
                </tr>
              ) : (
                templates.map((t) => (
                  <tr key={t._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-blue-600 cursor-pointer">{t.name}</td>
                    <td className="px-4 py-2">{t.category}</td>
                    <td className="px-4 py-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        {t.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-2">{t.language}</td>
                    <td className="px-4 py-2">
                      {new Date(t.updatedAt || t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(t._id)}
                        className="text-gray-500 hover:text-blue-600 transition"
                      >
                        👁 Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-gray-500 hover:text-red-600 transition"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mb-6 text-gray-500 text-sm">
          You can create a new broadcast or select an existing template to start.
        </div>

        {/* ================== BULK MESSAGE SECTION ================== */}
        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-3">📑 Select Template for Broadcast</h2>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-4"
          >
            <option value="">-- Template चुनें --</option>
            {templates.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name} ({t.language})
              </option>
            ))}
          </select>

          <h2 className="text-xl font-bold mb-3">📞 Select Contacts</h2>
          <div className="border rounded p-3 max-h-64 overflow-y-auto mb-4">
            {contacts.length === 0 ? (
              <p className="text-gray-500">🙁 कोई contacts नहीं मिले</p>
            ) : (
              contacts.map((c) => (
                <label key={c._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(c._id)}
                    onChange={() => toggleContact(c._id)}
                    className="mr-2"
                  />
                  {c.name} ({c.phoneNumber})
                </label>
              ))
            )}
          </div>

          <h2 className="text-xl font-bold mb-3">🟢 WhatsApp Session ID</h2>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Enter sessionId"
            className="border px-3 py-2 rounded w-full mb-4"
          />

          <button
            onClick={handleSend}
            disabled={!selectedTemplate || selectedContacts.length === 0 || !sessionId || sending}
            className={`px-4 py-2 rounded text-white ${
              sending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {sending ? "📤 Sending..." : "🚀 Send Bulk Message"}
          </button>
        </div>
      </main>
    </div>
  );
}