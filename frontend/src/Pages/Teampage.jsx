



// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";
// import API_BASE_URL from "../config";

// function App() {
//   const [number, setNumber] = useState("");
//   const [qr, setQr] = useState("");
//   const [showQr, setShowQr] = useState(false);
//   const [connected, setConnected] = useState(false);
//   const [message, setMessage] = useState("");
//   const [recipients, setRecipients] = useState("");
//   const [statusList, setStatusList] = useState([]);
//   const [sessions, setSessions] = useState([]);

//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const pollingRef = useRef(null);
//   const token = localStorage.getItem("token");

//   // ----------------- Start Session -----------------
//   const startSession = async () => {
//     if (!number) return alert("Enter your number");
//     try {
//       await axios.post(
//         `${API_BASE_URL}/start-session`,
//         { number },
//         { headers: { Authorization: "Bearer " + token } }
//       );

//       setQr("");
//       setShowQr(false);
//       setConnected(false);

//       startPolling(number);
//       alert("Session started — scan QR if prompted");
//     } catch (err) {
//       console.error(err);
//       alert("Error starting session");
//     }
//   };

//   // ----------------- Poll QR / Status -----------------
//   const startPolling = (numParam) => {
//     const target = numParam || number;
//     if (!target) return;

//     if (pollingRef.current) clearInterval(pollingRef.current);

//     pollingRef.current = setInterval(async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/qr/${target}`, {
//           headers: { Authorization: "Bearer " + token },
//         });
//         const data = res.data;

//         if (data.qr) {
//           setQr(data.qr);
//           setShowQr(true);
//           setConnected(false);
//         } else {
//           setQr("");
//           setShowQr(false);

//           if (data.status === "connected") {
//             setConnected(true);
//             if (pollingRef.current) {
//               clearInterval(pollingRef.current);
//               pollingRef.current = null;
//             }
//           } else if (data.status === "qr-expired") {
//             setShowQr(false);
//             setQr("");
//             setConnected(false);
//             if (pollingRef.current) {
//               clearInterval(pollingRef.current);
//               pollingRef.current = null;
//             }
//           } else {
//             setConnected(false);
//           }
//         }
//       } catch (err) {
//         console.error("Polling error:", err);
//         if (pollingRef.current) {
//           clearInterval(pollingRef.current);
//           pollingRef.current = null;
//         }
//       }
//     }, 3000);
//   };

//   // ----------------- Disconnect -----------------
//   const disconnect = async () => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/disconnect-session`,
//         { number },
//         { headers: { Authorization: "Bearer " + token } }
//       );

//       setConnected(false);
//       setQr("");
//       setShowQr(false);
//       setStatusList([]);

//       if (pollingRef.current) {
//         clearInterval(pollingRef.current);
//         pollingRef.current = null;
//       }

//       alert("Session disconnected");
//     } catch (err) {
//       console.error(err);
//       alert("Error disconnecting session");
//     }
//   };

//   // ----------------- Send Bulk Message -----------------
//   const sendMessage = async () => {
//     if (!message) return alert("Enter message");

//     const numbersArray = recipients
//       ? recipients.split(",").map((n) => n.trim().replace(/\D/g, "")).filter((n) => n)
//       : [];

//     if (numbersArray.length === 0) return alert("No recipients to send message");

//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/send-bulk`,
//         { 
//           number, 
//           numbers: numbersArray,
//           templateId: selectedTemplate?._id,
//           fileUrl: selectedTemplate?.fileUrl || ""   // ✅ Cloudinary link bhej rahe hain
//         },
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setStatusList(res.data.results || []);
//     } catch (err) {
//       console.error(err);
//       alert("Error sending messages");
//     }
//   };

//   // ----------------- Restore Sessions on Refresh -----------------
//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/user-sessions`, {
//           headers: { Authorization: "Bearer " + token },
//         });
//         const userSessions = res.data.sessions || [];
//         setSessions(userSessions);

//         if (userSessions.length > 0) {
//           const session = userSessions[0];
//           setNumber(session.number);
//           if (session.status === "connected") {
//             setConnected(true);
//             setShowQr(false);
//           } else {
//             setConnected(false);
//             startPolling(session.number);
//           }
//         }
//       } catch (err) {
//         console.error("Failed to fetch sessions:", err);
//       }
//     };

//     const fetchContacts = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/contact/getContacts`);
//         const contactsData = res.data || [];
//         const numbers = contactsData.map((c) => c.phoneNumber).filter((n) => n);
//         setRecipients(numbers.join(", "));
//       } catch (err) {
//         console.error("Error fetching contacts:", err);
//       }
//     };

//     const fetchTemplates = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/template/getTemplates`, {
//           headers: { Authorization: "Bearer " + token }
//         });
//         setTemplates(res.data || []);
//       } catch (err) {
//         console.error("Error fetching templates:", err);
//       }
//     };

//     fetchSessions();
//     fetchContacts();
//     fetchTemplates();

//     return () => {
//       if (pollingRef.current) clearInterval(pollingRef.current);
//     };
//   }, [token]);

//   // ----------------- QR Countdown -----------------
//   function CountdownTimer({ visible, seconds = 60, onExpire }) {
//     const [timeLeft, setTimeLeft] = useState(seconds);
//     useEffect(() => {
//       if (!visible) return;
//       setTimeLeft(seconds);
//       const id = setInterval(() => {
//         setTimeLeft((t) => {
//           if (t <= 1) {
//             clearInterval(id);
//             onExpire && onExpire();
//             return 0;
//           }
//           return t - 1;
//         });
//       }, 1000);
//       return () => clearInterval(id);
//     }, [visible, seconds, onExpire]);

//     if (!visible) return null;
//     return (
//       <p style={{ marginTop: "12px", fontWeight: 600, color: timeLeft <= 10 ? "red" : "black" }}>
//         QR will expire in: {timeLeft}s
//       </p>
//     );
//   }

//   const handleQrExpire = () => {
//     setShowQr(false);
//     if (pollingRef.current) {
//       clearInterval(pollingRef.current);
//       pollingRef.current = null;
//     }
//   };

//   // ----------------- Render -----------------
//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", fontFamily: "Arial, sans-serif" }}>
//       <div style={{ width: "480px", border: "1px solid #ccc", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", backgroundColor: "#fff" }}>
//         <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4">
//   WhatsApp Bulk Sender
// </h1>


//         {/* Number Input */}
//         <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
//           <input type="text" placeholder="Enter your number" value={number} onChange={(e) => setNumber(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//           {!connected ? (
//             <button onClick={startSession} style={{ padding: "10px 14px", borderRadius: "6px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Start</button>
//           ) : (
//             <button onClick={disconnect} style={{ padding: "10px 14px", borderRadius: "6px", background: "#dc3545", color: "#fff", border: "none", cursor: "pointer" }}>Disconnect</button>
//           )}
//         </div>

//         {/* Status */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", background: "#fafafa" }}>
//           <div><strong>Number:</strong> {number || "Not Set"}</div>
//           <div><strong>Status:</strong> <span style={{ color: connected ? "green" : "red", fontWeight: 700 }}>{connected ? "Connected ✅" : "Disconnected ❌"}</span></div>
//         </div>

//         {/* QR */}
//         {showQr && qr && (
//           <div style={{ display: "flex", gap: "12px", border: "1px solid #eee", padding: "12px", borderRadius: "8px", marginBottom: "16px", alignItems: "center", background: "#fffefc" }}>
//             <div style={{ minWidth: "150px", textAlign: "center" }}>
//               <QRCodeCanvas value={qr} size={150} />
//               <div style={{ fontSize: "12px", marginTop: "8px", fontWeight: 600 }}>Scan this QR with WhatsApp</div>
//             </div>
//             <div style={{ flex: 1, textAlign: "left", fontSize: "14px" }}>
//               <div style={{ fontWeight: 700, marginBottom: "6px" }}>Use WhatsApp on your phone</div>
//               <ol style={{ paddingLeft: "18px", marginTop: 0 }}>
//                 <li>Open WhatsApp on your phone</li>
//                 <li>Tap Menu (⋮) or Settings ⚙ and select <b>Linked Devices</b></li>
//                 <li>Tap <b>Link a device</b></li>
//                 <li>Point your phone to this screen to capture the QR code</li>
//               </ol>
//               <CountdownTimer visible={showQr} seconds={60} onExpire={handleQrExpire} />
//             </div>
//           </div>
//         )}

//         {/* Recipients Textarea */}
//         <div style={{ marginBottom: "12px" }}>
//           <textarea
//             placeholder="Recipients (comma separated)"
//             value={recipients}
//             onChange={(e) => setRecipients(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
//           />
//         </div>

//         {/* Template Select */}
//         <div style={{ marginBottom: "12px" }}>
//           <label>Select Template:</label>
//           <select
//             value={selectedTemplate?._id || ""}
//             onChange={(e) => {
//               const tmpl = templates.find(t => t._id === e.target.value);
//               setSelectedTemplate(tmpl);

//               if (tmpl) {
//                 let msg = "";
//                 if (tmpl.body) msg += tmpl.body + "\n";
//                 if (tmpl.url) msg += tmpl.url + "\n";
//                 if (tmpl.fileUrl) msg += tmpl.fileUrl + "\n";   // ✅ fileUrl show karega
//                 if (tmpl.buttons && tmpl.buttons.length > 0) {
//                   tmpl.buttons.forEach((b) => {
//                     msg += (b.text || b.label || "") + "\n";
//                   });
//                 }
//                 setMessage(msg.trim());
//               } else {
//                 setMessage("");
//               }
//             }}
//             style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "6px" }}
//           >
//             <option value="">-- Select Template --</option>
//             {templates.map((t) => (
//               <option key={t._id} value={t._id}>{t.name}</option>
//             ))}
//           </select>
//         </div>

//         {/* Message Textarea */}
//         <div style={{ marginBottom: "12px" }}>
//           <textarea
//             placeholder="Message content from template"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             rows={6}
//             style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
//           />
//         </div>

//         {/* Send Button */}
//         <button onClick={sendMessage} style={{ width: "100%", padding: "12px", borderRadius: "6px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer", fontSize: "16px" }}>
//           Send Message
//         </button>

//         {/* Status List */}
//         {statusList.length > 0 && (
//           <div style={{ marginTop: "16px" }}>
//             <h3>Status:</h3>
//             <ul>
//               {statusList.map((s, i) => (
//                 <li key={i}>{s.number} : {s.status} {s.error ? `(${s.error})` : ""}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;












// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";
// import API_BASE_URL from "../config";

// function App() {
//   const [number, setNumber] = useState("");
//   const [qr, setQr] = useState("");
//   const [showQr, setShowQr] = useState(false);
//   const [connected, setConnected] = useState(false);
//   const [message, setMessage] = useState("");
//   const [recipients, setRecipients] = useState("");
//   const [statusList, setStatusList] = useState([]);
//   const [sessions, setSessions] = useState([]);

//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const pollingRef = useRef(null);
//   const token = localStorage.getItem("token");

//   // ----------------- Start Session -----------------
//   const startSession = async () => {
//     if (!number) return alert("Enter your number");
//     try {
//       await axios.post(
//         `${API_BASE_URL}/start-session`,
//         { number },
//         { headers: { Authorization: "Bearer " + token } }
//       );

//       setQr("");
//       setShowQr(false);
//       setConnected(false);

//       startPolling(number);
//       alert("Session started — scan QR if prompted");
//     } catch (err) {
//       console.error(err);
//       alert("No active subscription! Please start free trial or subscribe");
//     }
//   };

//   // ----------------- Poll QR / Status -----------------
//   const startPolling = (numParam) => {
//     const target = numParam || number;
//     if (!target) return;

//     if (pollingRef.current) clearInterval(pollingRef.current);

//     pollingRef.current = setInterval(async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/qr/${target}`, {
//           headers: { Authorization: "Bearer " + token },
//         });
//         const data = res.data;

//         if (data.qr) {
//           setQr(data.qr);
//           setShowQr(true);
//           setConnected(false);
//         } else {
//           setQr("");
//           setShowQr(false);

//           if (data.status === "connected") {
//             setConnected(true);
//             if (pollingRef.current) {
//               clearInterval(pollingRef.current);
//               pollingRef.current = null;
//             }
//           } else if (data.status === "qr-expired") {
//             setShowQr(false);
//             setQr("");
//             setConnected(false);
//             if (pollingRef.current) {
//               clearInterval(pollingRef.current);
//               pollingRef.current = null;
//             }
//           } else {
//             setConnected(false);
//           }
//         }
//       } catch (err) {
//         console.error("Polling error:", err);
//         if (pollingRef.current) {
//           clearInterval(pollingRef.current);
//           pollingRef.current = null;
//         }
//       }
//     }, 3000);
//   };

//   // ----------------- Disconnect -----------------
//   const disconnect = async () => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/disconnect-session`,
//         { number },
//         { headers: { Authorization: "Bearer " + token } }
//       );

//       setConnected(false);
//       setQr("");
//       setShowQr(false);
//       setStatusList([]);

//       if (pollingRef.current) {
//         clearInterval(pollingRef.current);
//         pollingRef.current = null;
//       }

//       alert("Session disconnected");
//     } catch (err) {
//       console.error(err);
//       alert("Error disconnecting session");
//     }
//   };

//   // ----------------- Send Bulk Message -----------------
//   const sendMessage = async () => {
//     if (!message) return alert("Enter message");

//     const numbersArray = recipients
//       ? recipients.split(",").map((n) => n.trim().replace(/\D/g, "")).filter((n) => n)
//       : [];

//     if (numbersArray.length === 0) return alert("No recipients to send message");

//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/send-bulk`,
//         { 
//           number, 
//           numbers: numbersArray,
//           templateId: selectedTemplate?._id,
//           fileUrl: selectedTemplate?.fileUrl || ""   // ✅ Cloudinary link bhej rahe hain
//         },
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setStatusList(res.data.results || []);
//     } catch (err) {
//       console.error(err);
//       alert("No active subscription! Please start free trial or subscribe");
//     }
//   };

//   // ----------------- Restore Sessions on Refresh -----------------
//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/user-sessions`, {
//           headers: { Authorization: "Bearer " + token },
//         });
//         const userSessions = res.data.sessions || [];
//         setSessions(userSessions);

//         if (userSessions.length > 0) {
//           const session = userSessions[0];
//           setNumber(session.number);
//           if (session.status === "connected") {
//             setConnected(true);
//             setShowQr(false);
//           } else {
//             setConnected(false);
//             // ❌ yahan polling hata diya (ab startSession ke time hi hoga)
//           }
//         }
//       } catch (err) {
//         console.error("Failed to fetch sessions:", err);
//       }
//     };

//     const fetchContacts = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/contact/getContacts`);
//         const contactsData = res.data || [];
//         const numbers = contactsData.map((c) => c.phoneNumber).filter((n) => n);
//         setRecipients(numbers.join(", "));
//       } catch (err) {
//         console.error("Error fetching contacts:", err);
//       }
//     };

//     const fetchTemplates = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/template/getTemplates`, {
//           headers: { Authorization: "Bearer " + token }
//         });
//         setTemplates(res.data || []);
//       } catch (err) {
//         console.error("Error fetching templates:", err);
//       }
//     };

//     fetchSessions();
//     fetchContacts();
//     fetchTemplates();

//     return () => {
//       if (pollingRef.current) clearInterval(pollingRef.current);
//     };
//   }, [token]);

//   // ----------------- QR Countdown -----------------
//   function CountdownTimer({ visible, seconds = 60, onExpire }) {
//     const [timeLeft, setTimeLeft] = useState(seconds);
//     useEffect(() => {
//       if (!visible) return;
//       setTimeLeft(seconds);
//       const id = setInterval(() => {
//         setTimeLeft((t) => {
//           if (t <= 1) {
//             clearInterval(id);
//             onExpire && onExpire();
//             return 0;
//           }
//           return t - 1;
//         });
//       }, 1000);
//       return () => clearInterval(id);
//     }, [visible, seconds, onExpire]);

//     if (!visible) return null;
//     return (
//       <p style={{ marginTop: "12px", fontWeight: 600, color: timeLeft <= 10 ? "red" : "black" }}>
//         QR will expire in: {timeLeft}s
//       </p>
//     );
//   }

//   const handleQrExpire = () => {
//     setShowQr(false);
//     if (pollingRef.current) {
//       clearInterval(pollingRef.current);
//       pollingRef.current = null;
//     }
//   };

//   // ----------------- Render -----------------
//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", fontFamily: "Arial, sans-serif" }}>
//       <div style={{ width: "480px", border: "1px solid #ccc", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", backgroundColor: "#fff" }}>
//         <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4">
//   WhatsApp Bulk Sender
// </h1>


//         {/* Number Input */}
//         <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
//           <input type="text" placeholder="Enter your number" value={number} onChange={(e) => setNumber(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//           {!connected ? (
//             <button onClick={startSession} style={{ padding: "10px 14px", borderRadius: "6px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Start</button>
//           ) : (
//             <button onClick={disconnect} style={{ padding: "10px 14px", borderRadius: "6px", background: "#dc3545", color: "#fff", border: "none", cursor: "pointer" }}>Disconnect</button>
//           )}
//         </div>

//         {/* Status */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", background: "#fafafa" }}>
//           <div><strong>Number:</strong> {number || "Not Set"}</div>
//           <div><strong>Status:</strong> <span style={{ color: connected ? "green" : "red", fontWeight: 700 }}>{connected ? "Connected ✅" : "Disconnected ❌"}</span></div>
//         </div>

//         {/* QR */}
//         {showQr && qr && (
//           <div style={{ display: "flex", gap: "12px", border: "1px solid #eee", padding: "12px", borderRadius: "8px", marginBottom: "16px", alignItems: "center", background: "#fffefc" }}>
//             <div style={{ minWidth: "150px", textAlign: "center" }}>
//               <QRCodeCanvas value={qr} size={150} />
//               <div style={{ fontSize: "12px", marginTop: "8px", fontWeight: 600 }}>Scan this QR with WhatsApp</div>
//             </div>
//             <div style={{ flex: 1, textAlign: "left", fontSize: "14px" }}>
//               <div style={{ fontWeight: 700, marginBottom: "6px" }}>Use WhatsApp on your phone</div>
//               <ol style={{ paddingLeft: "18px", marginTop: 0 }}>
//                 <li>Open WhatsApp on your phone</li>
//                 <li>Tap Menu (⋮) or Settings ⚙ and select <b>Linked Devices</b></li>
//                 <li>Tap <b>Link a device</b></li>
//                 <li>Point your phone to this screen to capture the QR code</li>
//               </ol>
//               <CountdownTimer visible={showQr} seconds={60} onExpire={handleQrExpire} />
//             </div>
//           </div>
//         )}

//         {/* Recipients Textarea */}
//         <div style={{ marginBottom: "12px" }}>
//           <textarea
//             placeholder="Recipients (comma separated)"
//             value={recipients}
//             onChange={(e) => setRecipients(e.target.value)}
//             rows={4}
//             style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
//           />
//         </div>

//         {/* Template Select */}
//         <div style={{ marginBottom: "12px" }}>
//           <label>Select Template:</label>
//           <select
//             value={selectedTemplate?._id || ""}
//             onChange={(e) => {
//               const tmpl = templates.find(t => t._id === e.target.value);
//               setSelectedTemplate(tmpl);

//               if (tmpl) {
//                 let msg = "";
//                 if (tmpl.body) msg += tmpl.body + "\n";
//                 if (tmpl.url) msg += tmpl.url + "\n";
//                 if (tmpl.fileUrl) msg += tmpl.fileUrl + "\n";   // ✅ fileUrl show karega
//                 if (tmpl.buttons && tmpl.buttons.length > 0) {
//                   tmpl.buttons.forEach((b) => {
//                     msg += (b.text || b.label || "") + "\n";
//                   });
//                 }
//                 setMessage(msg.trim());
//               } else {
//                 setMessage("");
//               }
//             }}
//             style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "6px" }}
//           >
//             <option value="">-- Select Template --</option>
//             {templates.map((t) => (
//               <option key={t._id} value={t._id}>{t.name}</option>
//             ))}
//           </select>
//         </div>

//         {/* Message Textarea */}
//         <div style={{ marginBottom: "12px" }}>
//           <textarea
//             placeholder="Message content from template"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             rows={6}
//             style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
//           />
//         </div>

//         {/* Send Button */}
//         <button onClick={sendMessage} style={{ width: "100%", padding: "12px", borderRadius: "6px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer", fontSize: "16px" }}>
//           Send Message
//         </button>

//         {/* Status List */}
//         {statusList.length > 0 && (
//           <div style={{ marginTop: "16px" }}>
//             <h3>Status:</h3>
//             <ul>
//               {statusList.map((s, i) => (
//                 <li key={i}>{s.number} : {s.status} {s.error ? `(${s.error})` : ""}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

























import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import API_BASE_URL from "../config";

function App() {
  const [number, setNumber] = useState("");
  const [qr, setQr] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const pollingRef = useRef(null);
  const token = localStorage.getItem("token");

  // ----------------- Start Session -----------------
  const startSession = async () => {
    if (!number) return alert("Enter your number");
    try {
      await axios.post(
        `${API_BASE_URL}/start-session`,
        { number },
        { headers: { Authorization: "Bearer " + token } }
      );

      setQr("");
      setShowQr(false);
      setConnected(false);

      startPolling(number);
      alert("Session started — scan QR if prompted");
    } catch (err) {
      console.error(err);
      alert("No active subscription! Please start free trial or subscribe");
    }
  };

  // ----------------- Poll QR / Status -----------------
  const startPolling = (numParam) => {
    const target = numParam || number;
    if (!target) return;

    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/qr/${target}`, {
          headers: { Authorization: "Bearer " + token },
        });
        const data = res.data;

        if (data.qr) {
          setQr(data.qr);
          setShowQr(true);
          setConnected(false);
        } else {
          setQr("");
          setShowQr(false);

          if (data.status === "connected") {
            setConnected(true);
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
            }
          } else if (data.status === "qr-expired") {
            setShowQr(false);
            setQr("");
            setConnected(false);
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
            }
          } else {
            setConnected(false);
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }
    }, 3000);
  };

  // ----------------- Disconnect -----------------
  const disconnect = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/disconnect-session`,
        { number },
        { headers: { Authorization: "Bearer " + token } }
      );

      setConnected(false);
      setQr("");
      setShowQr(false);
      setStatusList([]);

      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }

      alert("Session disconnected");
    } catch (err) {
      console.error(err);
      alert("Error disconnecting session");
    }
  };

  // ----------------- Send Bulk Message -----------------
  const sendMessage = async () => {
    if (!message) return alert("Enter message");

    const numbersArray = recipients
      ? recipients.split(",").map((n) => n.trim().replace(/\D/g, "")).filter((n) => n)
      : [];

    if (numbersArray.length === 0) return alert("No recipients to send message");

    try {
      const res = await axios.post(
        `${API_BASE_URL}/send-bulk`,
        { 
          number, 
          numbers: numbersArray,
          templateId: selectedTemplate?._id,
          fileUrl: selectedTemplate?.fileUrl || ""   // ✅ Cloudinary link bhej rahe hain
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      setStatusList(res.data.results || []);
    } catch (err) {
      console.error(err);
      alert("No active subscription! Please start free trial or subscribe");
    }
  };

  // ----------------- Restore Sessions on Refresh -----------------
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user-sessions`, {
          headers: { Authorization: "Bearer " + token },
        });
        const userSessions = res.data.sessions || [];
        setSessions(userSessions);

        if (userSessions.length > 0) {
          const session = userSessions[0];
          setNumber(session.number);
          if (session.status === "connected") {
            setConnected(true);
            setShowQr(false);
          } else {
            setConnected(false);
            // ❌ yahan polling hata diya (ab startSession ke time hi hoga)
          }
        }
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      }
    };

    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/contact/getContacts`);
        const contactsData = res.data || [];
        const numbers = contactsData.map((c) => c.phoneNumber).filter((n) => n);
        setRecipients(numbers.join(", "));
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    const fetchTemplates = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/template/getTemplates`, {
          headers: { Authorization: "Bearer " + token }
        });
        setTemplates(res.data || []);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };

    fetchSessions();
    fetchContacts();
    fetchTemplates();

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [token]);

  // ----------------- QR Countdown -----------------
  function CountdownTimer({ visible, seconds = 60, onExpire }) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
      if (!visible) return;
      setTimeLeft(seconds);
      const id = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(id);
            onExpire && onExpire();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }, [visible, seconds, onExpire]);

    if (!visible) return null;
    return (
      <p style={{ marginTop: "12px", fontWeight: 600, color: timeLeft <= 10 ? "red" : "black" }}>
        QR will expire in: {timeLeft}s
      </p>
    );
  }

  const handleQrExpire = () => {
    setShowQr(false);
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        padding: "10px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          backgroundColor: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(20px, 4vw, 28px)",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "16px",
            color: "#333",
          }}
        >
          WhatsApp Bulk Sender
        </h1>

        {/* Number Input */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "14px",
          }}
        >
          <input
            type="text"
            placeholder="Enter your number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={{
              flex: "1 1 200px",
              minWidth: "160px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          {!connected ? (
            <button
              onClick={startSession}
              style={{
                flex: "0 0 auto",
                padding: "10px 14px",
                borderRadius: "6px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Start
            </button>
          ) : (
            <button
              onClick={disconnect}
              style={{
                flex: "0 0 auto",
                padding: "10px 14px",
                borderRadius: "6px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "16px",
            background: "#fafafa",
            fontSize: "14px",
          }}
        >
          <div>
            <strong>Number:</strong> {number || "Not Set"}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: connected ? "green" : "red",
                fontWeight: 700,
              }}
            >
              {connected ? "Connected ✅" : "Disconnected ❌"}
            </span>
          </div>
        </div>

        {/* QR */}
        {showQr && qr && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              border: "1px solid #eee",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              alignItems: "center",
              background: "#fffefc",
            }}
          >
            <div style={{ flex: "1 1 150px", textAlign: "center" }}>
              <QRCodeCanvas value={qr} size={150} />
              <div
                style={{ fontSize: "12px", marginTop: "8px", fontWeight: 600 }}
              >
                Scan this QR with WhatsApp
              </div>
            </div>
            <div style={{ flex: "2 1 200px", fontSize: "14px" }}>
              <div style={{ fontWeight: 700, marginBottom: "6px" }}>
                Use WhatsApp on your phone
              </div>
              <ol style={{ paddingLeft: "18px", marginTop: 0 }}>
                <li>Open WhatsApp on your phone</li>
                <li>
                  Tap Menu (⋮) or Settings ⚙ and select <b>Linked Devices</b>
                </li>
                <li>Tap <b>Link a device</b></li>
                <li>Point your phone to this screen to capture the QR code</li>
              </ol>
              <CountdownTimer
                visible={showQr}
                seconds={60}
                onExpire={handleQrExpire}
              />
            </div>
          </div>
        )}

        {/* Recipients */}
        <div style={{ marginBottom: "12px" }}>
          <textarea
            placeholder="Recipients (comma separated)"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Template Select */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: 600, fontSize: "14px" }}>
            Select Template:
          </label>
          <select
            value={selectedTemplate?._id || ""}
            onChange={(e) => {
              const tmpl = templates.find((t) => t._id === e.target.value);
              setSelectedTemplate(tmpl);
              if (tmpl) {
                let msg = "";
                if (tmpl.body) msg += tmpl.body + "\n";
                if (tmpl.url) msg += tmpl.url + "\n";
                if (tmpl.fileUrl) msg += tmpl.fileUrl + "\n";
                if (tmpl.buttons && tmpl.buttons.length > 0) {
                  tmpl.buttons.forEach((b) => {
                    msg += (b.text || b.label || "") + "\n";
                  });
                }
                setMessage(msg.trim());
              } else {
                setMessage("");
              }
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "6px",
              fontSize: "14px",
            }}
          >
            <option value="">-- Select Template --</option>
            {templates.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div style={{ marginBottom: "12px" }}>
          <textarea
            placeholder="Message content from template"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Send */}
        <button
          onClick={sendMessage}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "0.3s",
          }}
        >
          Send Message
        </button>

        {/* Status */}
        {statusList.length > 0 && (
          <div
            style={{
              marginTop: "16px",
              maxHeight: "150px",
              overflowY: "auto",
              fontSize: "14px",
            }}
          >
            <h3>Status:</h3>
            <ul>
              {statusList.map((s, i) => (
                <li key={i}>
                  {s.number} : {s.status} {s.error ? `(${s.error})` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

