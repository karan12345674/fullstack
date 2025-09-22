// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import Chatul from "../assets/Chatul.jpg";
// import Contact from "../assets/Contact.jpg";

// export default function ChatDashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [step, setStep] = useState(1);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrData, setQrData] = useState("");

//   // ✅ LocalStorage load
//   useEffect(() => {
//     const savedChats = localStorage.getItem("chats");
//     if (savedChats) setChats(JSON.parse(savedChats));
//   }, []);
//   // ✅ LocalStorage save
//   useEffect(() => {
//     localStorage.setItem("chats", JSON.stringify(chats));
//   }, [chats]);

//   const handleSend = () => {
//     if (selectedTemplate) {
//       setChats([
//         ...chats,
//         {
//           name: selectedTemplate.name,
//           message: selectedTemplate.message.replace("{{name}}", phoneNumber),
//         },
//       ]);
//       setShowModal(false);
//       setStep(1);
//       setSelectedTemplate(null);
//     }
//   };

//   const handleDeleteChat = (index) => {
//     const updatedChats = chats.filter((_, i) => i !== index);
//     setChats(updatedChats);
//   };

//   // ✅ QR Code generate
//   const handleGenerateQR = () => {
//     if (phoneNumber.trim() === "") {
//       alert("Please enter a phone number!");
//       return;
//     }
//     setQrData(https://wa.me/${phoneNumber.replace(/\D/g, "")});
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       {/* ✅ Main Section */}
//       <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-auto">
//         {/* ✅ Centered Container */}
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
//           {/* ✅ Mobile number + Generate QR (always on top) */}
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
//             <input
//               type="text"
//               placeholder="Enter WhatsApp number e.g. +919876543210"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-lg text-sm"
//             />
//             <button
//               onClick={handleGenerateQR}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
//             >
//               Generate QR
//             </button>
//           </div>

//           {/* ✅ QR + Guidelines */}
//           {qrData && (
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//               {/* QR Code */}
//               <div className="flex justify-center">
//                 <QRCodeCanvas value={qrData} size={220} />
//               </div>

//               {/* Guidelines */}
//               <div className="text-gray-700 text-sm leading-relaxed">
//                 <h2 className="text-lg font-semibold mb-3">
//                   Use WhatsApp on your API
//                 </h2>
//                 <ol className="list-decimal list-inside space-y-1">
//                   <li>Open WhatsApp on your phone</li>
//                   <li>
//                     Tap <b>Menu</b> ⋮ or <b>Settings ⚙</b> and select{" "}
//                     <b>Linked Devices</b>
//                   </li>
//                   <li>Tap on <b>Link a device</b></li>
//                   <li>Point your phone to this screen to capture the QR code</li>
//                 </ol>
//                 <p className="mt-4 text-green-600 cursor-pointer hover:underline">
//                   Link with phone number
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* ✅ Grid section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Contact Card */}
//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
//                 <img
//                   src={Contact}
//                   alt="Add Contact"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm text-center">
//                 Add your first contact
//                 <a href="#" className="text-green-600 ml-1">
//                   from here
//                 </a>
//                 .
//               </p>
//             </div>

//             {/* Chat UI Preview */}
//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-60 mb-3 overflow-hidden rounded-xl">
//                 <img
//                   src={Chatul}
//                   alt="Chat UI Preview"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm font-medium text-center">
//                 Looks like you don't have any chats yet!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2 md:p-0">
//           <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
//             {step === 1 && (
//               <>
//                 <h2 className="text-gray-800 font-semibold text-center mb-4 text-sm md:text-base">
//                   Choose contact
//                 </h2>
//                 <div className="flex items-center border rounded-lg p-2 mb-3">
//                   <span className="mr-2">🌐</span>
//                   <input
//                     type="text"
//                     placeholder="Please input whatsapp number"
//                     className="flex-1 outline-none text-xs md:text-sm"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>
//                 <div className="text-center text-gray-500 mb-3 text-xs md:text-sm">
//                   Or
//                 </div>
//                 <select className="w-full border rounded-lg p-2 text-xs md:text-sm mb-4">
//                   <option>Select contact</option>
//                 </select>
//                 <div className="flex justify-end space-x-2 md:space-x-3">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-3 md:px-4 py-1 md:py-2 border border-green-500 text-green-600 rounded-lg text-xs md:text-sm"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => setStep(2)}
//                     className="px-3 md:px-4 py-1 md:py-2 bg-green-500 text-white rounded-lg text-xs md:text-sm"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import Chatul from "../assets/Chatul.jpg";
// import Contact from "../assets/Contact.jpg";
// import axios from "axios";

// export default function ChatDashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [step, setStep] = useState(1);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrData, setQrData] = useState("");
//   const [sessionId, setSessionId] = useState("");

//   // ✅ LocalStorage load
//   useEffect(() => {
//     const savedChats = localStorage.getItem("chats");
//     if (savedChats) setChats(JSON.parse(savedChats));
//   }, []);
//   // ✅ LocalStorage save
//   useEffect(() => {
//     localStorage.setItem("chats", JSON.stringify(chats));
//   }, [chats]);

//   // ✅ Step 1: Initialize session and fetch QR
//   const handleGenerateQR = async () => {
//     if (phoneNumber.trim() === "") {
//       alert("Please enter a phone number!");
//       return;
//     }

//     try {
//       // 1️⃣ Create session
//       const response = await axios.post("http//192.168.0.113/api/whatsapp/generateQR", 
//         {phoneNumber},
//        { withCredentials: true}
//       );

//       const { sessionId } = response.data;
//       setSessionId(sessionId);

//       // 2️⃣ Poll for QR until ready
//       const pollQR = setInterval(async () => {
//         try {
//           const qrResp = await axios.get(http://192.168.0.113:5000/api/whatsapp/getQR?sessionId=${sessionId},
//             { withCredentials: true });
//           if (qrResp.data.qr) {
//             setQrData(qrResp.data.qr);
//             clearInterval(pollQR); // stop polling once QR received
//           }
//         } catch (err) {
//           // QR not ready yet
//         }
//       }, 1000);

//     } catch (err) {
//       console.error("Error generating QR:", err);
//       alert("Failed to generate QR. Check console.");
//     }
//   };

//   const handleSend = () => {
//     if (selectedTemplate) {
//       setChats([
//         ...chats,
//         {
//           name: selectedTemplate.name,
//           message: selectedTemplate.message.replace("{{name}}", phoneNumber),
//         },
//       ]);
//       setShowModal(false);
//       setStep(1);
//       setSelectedTemplate(null);
//     }
//   };

//   const handleDeleteChat = (index) => {
//     const updatedChats = chats.filter((_, i) => i !== index);
//     setChats(updatedChats);
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-auto">
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
//           {/* Phone input + Generate QR */}
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
//             <input
//               type="text"
//               placeholder="Enter WhatsApp number e.g. +919876543210"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-lg text-sm"
//             />
//             <button
//               onClick={handleGenerateQR}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
//             >
//               Generate QR
//             </button>
//           </div>

//           {/* QR + Guidelines */}
//           {qrData && (
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//               <div className="flex justify-center">
//                 <QRCodeCanvas value={qrData} size={220} />
//               </div>

//               <div className="text-gray-700 text-sm leading-relaxed">
//                 <h2 className="text-lg font-semibold mb-3">
//                   Use WhatsApp on your API
//                 </h2>
//                 <ol className="list-decimal list-inside space-y-1">
//                   <li>Open WhatsApp on your phone</li>
//                   <li>
//                     Tap <b>Menu</b> ⋮ or <b>Settings ⚙</b> and select{" "}
//                     <b>Linked Devices</b>
//                   </li>
//                   <li>Tap on <b>Link a device</b></li>
//                   <li>Point your phone to this screen to capture the QR code</li>
//                 </ol>
//                 <p className="mt-4 text-green-600 cursor-pointer hover:underline">
//                   Link with phone number
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Grid section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
//                 <img
//                   src={Contact}
//                   alt="Add Contact"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm text-center">
//                 Add your first contact
//                 <a href="#" className="text-green-600 ml-1">
//                   from here
//                 </a>
//                 .
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-60 mb-3 overflow-hidden rounded-xl">
//                 <img
//                   src={Chatul}
//                   alt="Chat UI Preview"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm font-medium text-center">
//                 Looks like you don't have any chats yet!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2 md:p-0">
//           <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
//             {step === 1 && (
//               <>
//                 <h2 className="text-gray-800 font-semibold text-center mb-4 text-sm md:text-base">
//                   Choose contact
//                 </h2>
//                 <div className="flex items-center border rounded-lg p-2 mb-3">
//                   <span className="mr-2">🌐</span>
//                   <input
//                     type="text"
//                     placeholder="Please input whatsapp number"
//                     className="flex-1 outline-none text-xs md:text-sm"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>
//                 <div className="text-center text-gray-500 mb-3 text-xs md:text-sm">
//                   Or
//                 </div>
//                 <select className="w-full border rounded-lg p-2 text-xs md:text-sm mb-4">
//                   <option>Select contact</option>
//                 </select>
//                 <div className="flex justify-end space-x-2 md:space-x-3">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-3 md:px-4 py-1 md:py-2 border border-green-500 text-green-600 rounded-lg text-xs md:text-sm"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => setStep(2)}
//                     className="px-3 md:px-4 py-1 md:py-2 bg-green-500 text-white rounded-lg text-xs md:text-sm"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import Chatul from "../assets/Chatul.jpg";
// import Contact from "../assets/Contact.jpg";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast"; // ✅ toast import

// export default function ChatDashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [step, setStep] = useState(1);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrData, setQrData] = useState("");
//   const [sessionId, setSessionId] = useState("");

//   // ✅ LocalStorage load
//   useEffect(() => {
//     const savedChats = localStorage.getItem("chats");
//     if (savedChats) setChats(JSON.parse(savedChats));
//   }, []);

//   // ✅ LocalStorage save
//   useEffect(() => {
//     localStorage.setItem("chats", JSON.stringify(chats));
//   }, [chats]);

//   // ✅ Step 1: Initialize session and fetch QR
//   const handleGenerateQR = async () => {
//     if (phoneNumber.trim() === "") {
//       toast.error("Please enter a phone number!"); // ✅ toast error
//       return;
//     }

//     try {
//       // 1️⃣ Create session
//       const response = await axios.post(
//         "http://192.168.0.113:5000/api/whatsapp/generateQR",
//         { phoneNumber },
//         { withCredentials: true }
//       );

//       const { sessionId } = response.data;
//       setSessionId(sessionId);

//       // 2️⃣ Poll for QR until ready
//       const pollQR = setInterval(async () => {
//         try {
//           const qrResp = await axios.get(
//             http://192.168.0.113:5000/api/whatsapp/getQR?sessionId=${sessionId},
//             { withCredentials: true }
//           );
//           if (qrResp.data.qr) {
//             setQrData(qrResp.data.qr);
//             clearInterval(pollQR); // stop polling once QR received
//             toast.success("QR Code ready!"); // ✅ toast success
//           }
//         } catch (err) {
//           // QR not ready yet
//         }
//       }, 1000);
//     } catch (err) {
//       console.error("Error generating QR:", err);
//       toast.error("Failed to generate QR. Check console."); // ✅ toast error
//     }
//   };

//   const handleSend = () => {
//     if (selectedTemplate) {
//       setChats([
//         ...chats,
//         {
//           name: selectedTemplate.name,
//           message: selectedTemplate.message.replace("{{name}}", phoneNumber),
//         },
//       ]);
//       setShowModal(false);
//       setStep(1);
//       setSelectedTemplate(null);
//       toast.success("Message prepared!"); // ✅ toast success
//     }
//   };

//   const handleDeleteChat = (index) => {
//     const updatedChats = chats.filter((_, i) => i !== index);
//     setChats(updatedChats);
//     toast.success("Chat deleted!"); // ✅ toast success
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       <Toaster position="top-right" /> {/* ✅ Toast container */}

//       <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-auto">
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
//           {/* Phone input + Generate QR */}
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
//             <input
//               type="text"
//               placeholder="Enter WhatsApp number e.g. +919876543210"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-lg text-sm"
//             />
//             <button
//               onClick={handleGenerateQR}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
//             >
//               Generate QR
//             </button>
//           </div>

//           {/* QR + Guidelines */}
//           {qrData && (
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//               <div className="flex justify-center">
//                 <QRCodeCanvas value={qrData} size={220} />
//               </div>

//               <div className="text-gray-700 text-sm leading-relaxed">
//                 <h2 className="text-lg font-semibold mb-3">Use WhatsApp on your API</h2>
//                 <ol className="list-decimal list-inside space-y-1">
//                   <li>Open WhatsApp on your phone</li>
//                   <li>
//                     Tap <b>Menu</b> ⋮ or <b>Settings ⚙</b> and select <b>Linked Devices</b>
//                   </li>
//                   <li>Tap on <b>Link a device</b></li>
//                   <li>Point your phone to this screen to capture the QR code</li>
//                 </ol>
//                 <p className="mt-4 text-green-600 cursor-pointer hover:underline">Link with phone number</p>
//               </div>
//             </div>
//           )}

//           {/* Grid section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
//                 <img src={Contact} alt="Add Contact" className="w-full h-full object-cover" />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm text-center">
//                 Add your first contact
//                 <a href="#" className="text-green-600 ml-1">
//                   from here
//                 </a>
//                 .
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-60 mb-3 overflow-hidden rounded-xl">
//                 <img src={Chatul} alt="Chat UI Preview" className="w-full h-full object-cover" />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm font-medium text-center">
//                 Looks like you don't have any chats yet!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2 md:p-0">
//           <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
//             {step === 1 && (
//               <>
//                 <h2 className="text-gray-800 font-semibold text-center mb-4 text-sm md:text-base">
//                   Choose contact
//                 </h2>
//                 <div className="flex items-center border rounded-lg p-2 mb-3">
//                   <span className="mr-2">🌐</span>
//                   <input
//                     type="text"
//                     placeholder="Please input whatsapp number"
//                     className="flex-1 outline-none text-xs md:text-sm"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>
//                 <div className="text-center text-gray-500 mb-3 text-xs md:text-sm">Or</div>
//                 <select className="w-full border rounded-lg p-2 text-xs md:text-sm mb-4">
//                   <option>Select contact</option>
//                 </select>
//                 <div className="flex justify-end space-x-2 md:space-x-3">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-3 md:px-4 py-1 md:py-2 border border-green-500 text-green-600 rounded-lg text-xs md:text-sm"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => setStep(2)}
//                     className="px-3 md:px-4 py-1 md:py-2 bg-green-500 text-white rounded-lg text-xs md:text-sm"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import Chatul from "../assets/Chatul.jpg";
// import Contact from "../assets/Contact.jpg";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// export default function ChatDashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [step, setStep] = useState(1);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrData, setQrData] = useState("");
//   const [sessionId, setSessionId] = useState("");
//   const [sessionStatus, setSessionStatus] = useState("");

//   const API_BASE = "http://192.168.0.113:5000/api/whatsapp";

//   // Load chats from localStorage
//   useEffect(() => {
//     const savedChats = localStorage.getItem("chats");
//     if (savedChats) setChats(JSON.parse(savedChats));
//   }, []);

//   // Save chats to localStorage
//   useEffect(() => {
//     localStorage.setItem("chats", JSON.stringify(chats));
//   }, [chats]);

//   // Poll session status (optional)
//   useEffect(() => {
//     if (!sessionId) return;
//     const interval = setInterval(async () => {
//       try {
//         const resp = await axios.post(${API_BASE}/getSessionStatus, { sessionId }, { withCredentials: true });
//         setSessionStatus(resp.data.status);
//         if (resp.data.status === "connected") clearInterval(interval);
//       } catch (err) {
//         console.error("Session status error:", err);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [sessionId]);

//   // Generate QR
//   const handleGenerateQR = async () => {
//     if (!phoneNumber.trim()) return toast.error("Please enter a phone number!");
//     try {
//       const res = await axios.post(${API_BASE}/generateQR, { phoneNumber }, { withCredentials: true });
//       const sid = res.data.sessionId;
//       setSessionId(sid);

//       const pollQR = setInterval(async () => {
//         try {
//           const qrResp = await axios.get(${API_BASE}/getQR?sessionId=${sid}, { withCredentials: true });
//           if (qrResp.data.qr) {
//             setQrData(qrResp.data.qr);
//             clearInterval(pollQR);
//             toast.success("QR Code ready!");
//           }
//         } catch (err) {
//           // QR not ready yet
//         }
//       }, 1000);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to generate QR");
//     }
//   };

//   // Disconnect session
//   const handleDisconnect = async () => {
//     if (!sessionId) return toast.error("No active session");
//     try {
//       await axios.post(${API_BASE}/disconnectSession, { sessionId }, { withCredentials: true });
//       setSessionId("");
//       setQrData("");
//       setSessionStatus("");
//       toast.success("Session disconnected");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to disconnect session");
//     }
//   };

//   // Send message locally
//   const handleSend = () => {
//     if (!selectedTemplate) return;
//     setChats([
//       ...chats,
//       { name: selectedTemplate.name, message: selectedTemplate.message.replace("{{name}}", phoneNumber) },
//     ]);
//     setShowModal(false);
//     setStep(1);
//     setSelectedTemplate(null);
//     toast.success("Message prepared!");
//   };

//   const handleDeleteChat = (index) => {
//     const updated = chats.filter((_, i) => i !== index);
//     setChats(updated);
//     toast.success("Chat deleted!");
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       <Toaster position="top-right" />
//       <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-auto">
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
//           {/* Phone input + Generate QR */}
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
//             <input
//               type="text"
//               placeholder="Enter WhatsApp number e.g. +919876543210"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-lg text-sm"
//             />
//             <button
//               onClick={handleGenerateQR}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
//             >
//               Generate QR
//             </button>
//             {sessionId && (
//               <button
//                 onClick={handleDisconnect}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm ml-2"
//               >
//                 Disconnect
//               </button>
//             )}
//           </div>

//           {/* QR + Guidelines */}
//           {qrData && (
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//               <div className="flex justify-center">
//                 <QRCodeCanvas value={qrData} size={220} />
//               </div>
//               <div className="text-gray-700 text-sm leading-relaxed">
//                 <h2 className="text-lg font-semibold mb-3">Use WhatsApp on your API</h2>
//                 <ol className="list-decimal list-inside space-y-1">
//                   <li>Open WhatsApp on your phone</li>
//                   <li>
//                     Tap <b>Menu</b> ⋮ or <b>Settings ⚙</b> and select <b>Linked Devices</b>
//                   </li>
//                   <li>Tap on <b>Link a device</b></li>
//                   <li>Point your phone to this screen to capture the QR code</li>
//                 </ol>
//                 <p className="mt-4 text-green-600 cursor-pointer hover:underline">Link with phone number</p>
//               </div>
//             </div>
//           )}

//           {/* Chats grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
//                 <img src={Contact} alt="Add Contact" className="w-full h-full object-cover" />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm text-center">
//                 Add your first contact
//                 <a href="#" className="text-green-600 ml-1">
//                   from here
//                 </a>
//                 .
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-60 mb-3 overflow-hidden rounded-xl">
//                 <img src={Chatul} alt="Chat UI Preview" className="w-full h-full object-cover" />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm font-medium text-center">
//                 Looks like you don't have any chats yet!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2 md:p-0">
//           <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
//             {step === 1 && (
//               <>
//                 <h2 className="text-gray-800 font-semibold text-center mb-4 text-sm md:text-base">
//                   Choose contact
//                 </h2>
//                 <div className="flex items-center border rounded-lg p-2 mb-3">
//                   <span className="mr-2">🌐</span>
//                   <input
//                     type="text"
//                     placeholder="Please input whatsapp number"
//                     className="flex-1 outline-none text-xs md:text-sm"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>
//                 <div className="text-center text-gray-500 mb-3 text-xs md:text-sm">Or</div>
//                 <select className="w-full border rounded-lg p-2 text-xs md:text-sm mb-4">
//                   <option>Select contact</option>
//                 </select>
//                 <div className="flex justify-end space-x-2 md:space-x-3">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-3 md:px-4 py-1 md:py-2 border border-green-500 text-green-600 rounded-lg text-xs md:text-sm"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => setStep(2)}
//                     className="px-3 md:px-4 py-1 md:py-2 bg-green-500 text-white rounded-lg text-xs md:text-sm"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }












import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Chatul from "../assets/Chatul.jpg";
import Contact from "../assets/Contact.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // ✅ toast import
import API_BASE_URL from "../config";

export default function ChatDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [chats, setChats] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qrData, setQrData] = useState("");
  const [sessionId, setSessionId] = useState("");

  // ✅ LocalStorage load
  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) setChats(JSON.parse(savedChats));
  }, []);

  // ✅ LocalStorage save
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // ✅ Poll QR jab sessionId mil jaye
  useEffect(() => {
    if (!sessionId) return;

    console.log("👉 Starting QR polling for:", sessionId);

    const pollQR = setInterval(async () => {
      try {
        const qrResp = await axios.get(
          `${API_BASE_URL}/whatsapp/getQR?sessionId=${sessionId}`,
          { withCredentials: true }
        );
        if (qrResp.data.qr) {
          setQrData(qrResp.data.qr);
          clearInterval(pollQR);
          toast.success("QR Code ready!");
        }
      } catch (err) {
        console.log("QR not ready yet...");
      }
    }, 5000);

    return () => clearInterval(pollQR);
  }, [sessionId]);

  // ✅ Step 1: Initialize session
  const handleGenerateQR = async () => {
    if (phoneNumber.trim() === "") {
      toast.error("Please enter a phone number!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/whatsapp/generateQR`,
        { phoneNumber },
        { withCredentials: true }
      );

      const { sessionId } = response.data;
      console.log("🔥 generateQR response:", response.data);
      setSessionId(sessionId); // 🔥 abhi keval sessionId set hoga
    } catch (err) {
      console.error("Error generating QR:", err);
      toast.error("Failed to generate QR. Check console.");
    }
  };

  const handleSend = () => {
    if (selectedTemplate) {
      setChats([
        ...chats,
        {
          name: selectedTemplate.name,
          message: selectedTemplate.message.replace("{{name}}", phoneNumber),
        },
      ]);
      setShowModal(false);
      setStep(1);
      setSelectedTemplate(null);
      toast.success("Message prepared!");
    }
  };

  const handleDeleteChat = (index) => {
    const updatedChats = chats.filter((_, i) => i !== index);
    setChats(updatedChats);
    toast.success("Chat deleted!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Toaster position="top-right" />

      <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-auto">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
          {/* Phone input + Generate QR */}
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter WhatsApp number e.g. +919876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <button
              onClick={handleGenerateQR}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Generate QR
            </button>
          </div>

          {/* QR + Guidelines */}
          {qrData && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="flex justify-center">
                <QRCodeCanvas value={qrData} size={220} />
              </div>

              <div className="text-gray-700 text-sm leading-relaxed">
                <h2 className="text-lg font-semibold mb-3">
                  Use WhatsApp on your API
                </h2>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open WhatsApp on your phone</li>
                  <li>
                    Tap <b>Menu</b> ⋮ or <b>Settings ⚙</b> and select{" "}
                    <b>Linked Devices</b>
                  </li>
                  <li>Tap on <b>Link a device</b></li>
                  <li>Point your phone to this screen to capture the QR code</li>
                </ol>
                <p className="mt-4 text-green-600 cursor-pointer hover:underline">
                  Link with phone number
                </p>
              </div>
            </div>
          )}

          {/* Grid section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
              <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
                <img
                  src={Contact}
                  alt="Add Contact"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-xs md:text-sm text-center">
                Add your first contact
                <a href="#" className="text-green-600 ml-1">
                  from here
                </a>
                .
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
              <div className="w-full h-60 mb-3 overflow-hidden rounded-xl">
                <img
                  src={Chatul}
                  alt="Chat UI Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-xs md:text-sm font-medium text-center">
                Looks like you don't have any chats yet!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2 md:p-0">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            {step === 1 && (
              <>
                <h2 className="text-gray-800 font-semibold text-center mb-4 text-sm md:text-base">
                  Choose contact
                </h2>
                <div className="flex items-center border rounded-lg p-2 mb-3">
                  <span className="mr-2">🌐</span>
                  <input
                    type="text"
                    placeholder="Please input whatsapp number"
                    className="flex-1 outline-none text-xs md:text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="text-center text-gray-500 mb-3 text-xs md:text-sm">Or</div>
                <select className="w-full border rounded-lg p-2 text-xs md:text-sm mb-4">
                  <option>Select contact</option>
                </select>
                <div className="flex justify-end space-x-2 md:space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-3 md:px-4 py-1 md:py-2 border border-green-500 text-green-600 rounded-lg text-xs md:text-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="px-3 md:px-4 py-1 md:py-2 bg-green-500 text-white rounded-lg text-xs md:text-sm"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import Chatul from "../assets/Chatul.jpg";
// import Contact from "../assets/Contact.jpg";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { io } from "socket.io-client";

// //const socket = io("http://192.168.0.113:5000"); // ⚡ Connect to backend Socket.IO
// //const socket = io("http://192.168.0.113:5000", { withCredentials: true });

// const socket = io("http://192.168.0.113:5000", {
//   withCredentials: true,
//   transports: ["websocket", "polling"],
// });


// export default function ChatDashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [step, setStep] = useState(1);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrData, setQrData] = useState("");
//   const [sessionId, setSessionId] = useState("");

//   // ✅ Load chats from localStorage
//   useEffect(() => {
//     const savedChats = localStorage.getItem("chats");
//     if (savedChats) setChats(JSON.parse(savedChats));
//   }, []);

//   // ✅ Save chats to localStorage
//   useEffect(() => {
//     localStorage.setItem("chats", JSON.stringify(chats));
//   }, [chats]);

//   // 🔥 Socket.IO listener for QR
//   useEffect(() => {
//     if (!sessionId) return;

//     const qrListener = (qr) => {
//       setQrData(qr);
//       toast.success("QR Code ready!");
//     };

//     socket.on(qr-${sessionId}, qrListener);

//     return () => socket.off(qr-${sessionId}, qrListener);
//   }, [sessionId]);

//   // ✅ Step 1: Initialize session
//   const handleGenerateQR = async () => {
//     if (phoneNumber.trim() === "") {
//       toast.error("Please enter a phone number!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://192.168.0.113:5000/api/whatsapp/generateQR",
//         { phoneNumber },
//         { withCredentials: true }
//       );

//       const { sessionId } = response.data;
//       console.log("🔥 generateQR response:", response.data);
//       setSessionId(sessionId); // 🔥 set sessionId for Socket.IO QR updates
//       setQrData(""); // Reset previous QR if any
//     } catch (err) {
//       console.error("Error generating QR:", err);
//       toast.error("Failed to generate QR. Check console.");
//     }
//   };

//   const handleSend = () => {
//     if (selectedTemplate) {
//       setChats([
//         ...chats,
//         {
//           name: selectedTemplate.name,
//           message: selectedTemplate.message.replace("{{name}}", phoneNumber),
//         },
//       ]);
//       setShowModal(false);
//       setStep(1);
//       setSelectedTemplate(null);
//       toast.success("Message prepared!");
//     }
//   };

//   const handleDeleteChat = (index) => {
//     const updatedChats = chats.filter((_, i) => i !== index);
//     setChats(updatedChats);
//     toast.success("Chat deleted!");
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       <Toaster position="top-right" />

//       <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-auto">
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
//           {/* Phone input + Generate QR */}
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
//             <input
//               type="text"
//               placeholder="Enter WhatsApp number e.g. +919876543210"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-lg text-sm"
//             />
//             <button
//               onClick={handleGenerateQR}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
//             >
//               Generate QR
//             </button>
//           </div>

//           {/* QR + Guidelines */}
//           {qrData && (
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//               <div className="flex justify-center">
//                 <QRCodeCanvas value={qrData} size={220} />
//               </div>

//               <div className="text-gray-700 text-sm leading-relaxed">
//                 <h2 className="text-lg font-semibold mb-3">
//                   Use WhatsApp on your API
//                 </h2>
//                 <ol className="list-decimal list-inside space-y-1">
//                   <li>Open WhatsApp on your phone</li>
//                   <li>
//                     Tap <b>Menu</b> ⋮ or <b>Settings ⚙</b> and select <b>Linked Devices</b>
//                   </li>
//                   <li>Tap on <b>Link a device</b></li>
//                   <li>Point your phone to this screen to capture the QR code</li>
//                 </ol>
//                 <p className="mt-4 text-green-600 cursor-pointer hover:underline">
//                   Link with phone number
//                 </p>
//               </div>
//             </div>
//           )}

//           Grid section
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
//                 <img
//                   src={Contact}
//                   alt="Add Contact"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm text-center">
//                 Add your first contact
//                 <a href="#" className="text-green-600 ml-1">
//                   from here
//                 </a>
//                 .
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
//               <div className="w-full h-60 mb-3 overflow-hidden rounded-xl">
//                 <img
//                   src={Chatul}
//                   alt="Chat UI Preview"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-gray-600 text-xs md:text-sm font-medium text-center">
//                 Looks like you don't have any chats yet!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2 md:p-0">
//           <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
//             {step === 1 && (
//               <>
//                 <h2 className="text-gray-800 font-semibold text-center mb-4 text-sm md:text-base">
//                   Choose contact
//                 </h2>
//                 <div className="flex items-center border rounded-lg p-2 mb-3">
//                   <span className="mr-2">🌐</span>
//                   <input
//                     type="text"
//                     placeholder="Please input whatsapp number"
//                     className="flex-1 outline-none text-xs md:text-sm"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>
//                 <div className="text-center text-gray-500 mb-3 text-xs md:text-sm">Or</div>
//                 <select className="w-full border rounded-lg p-2 text-xs md:text-sm mb-4">
//                   <option>Select contact</option>
//                 </select>
//                 <div className="flex justify-end space-x-2 md:space-x-3">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-3 md:px-4 py-1 md:py-2 border border-green-500 text-green-600 rounded-lg text-xs md:text-sm"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => setStep(2)}
//                     className="px-3 md:px-4 py-1 md:py-2 bg-green-500 text-white rounded-lg text-xs md:text-sm"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { io } from "socket.io-client";

// const socket = io("http://192.168.0.113:5000", {
//   withCredentials: true,
//   transports: ["websocket", "polling"],
// });

// export default function ChatDashboard() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [qrData, setQrData] = useState("");
//   const [sessionId, setSessionId] = useState("");

//   // 🔥 Socket.IO listener for QR
//   useEffect(() => {
//     if (!sessionId) return;

//     const qrListener = (qr) => {
//       console.log("💚 QR received in frontend:", qr); 
//       setQrData(qr);
//       toast.success("QR Code ready!");
//     };

//     socket.on(qr-${sessionId}, qrListener);

//     return () => socket.off(qr-${sessionId}, qrListener);
//   }, [sessionId]);

//   const handleGenerateQR = async () => {
//     if (phoneNumber.trim() === "") {
//       toast.error("Please enter a phone number!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://192.168.0.113:5000/api/whatsapp/generateQR",
//         { phoneNumber },
//         { withCredentials: true }
//       );

//       const { sessionId } = response.data;
//       console.log("🔥 generateQR response:", response.data);
//       setSessionId(sessionId);
//       setQrData("");
//     } catch (err) {
//       console.error("Error generating QR:", err);
//       toast.error("Failed to generate QR. Check console.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
//       <Toaster position="top-right" />

//       <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
//         {/* Phone input + Generate QR */}
//         <div className="flex flex-col gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Enter WhatsApp number e.g. +919876543210"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="px-3 py-2 border rounded-lg text-sm"
//           />
//           <button
//             onClick={handleGenerateQR}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
//           >
//             Generate QR
//           </button>
//         </div>

//         {/* QR Code */}
//         {qrData && (
//           <div className="flex flex-col items-center gap-4">
//             <QRCodeCanvas value={qrData}  />
//             <p className="text-gray-700 text-center text-sm">
//               Scan this QR with WhatsApp Linked Devices
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }