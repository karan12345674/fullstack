// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import API_BASE_URL from "../config";
// // ✅ Custom Button
// function Button({ children, className = "", ...props }) {
//   return (
//     <button
//       className={px-3 py-1 rounded font-medium transition hover:opacity-80 ${className}}
//       {...props}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// export default function Contacts() {
//   const [contacts, setContacts] = useState([]);
//   const [form, setForm] = useState({ name: "", phoneNumber: "", language: "en", tags: [] });
//   const [editIndex, setEditIndex] = useState(null);
//   const [importedFiles, setImportedFiles] = useState([]);
  

//   const API = axios.create({
//     baseURL: ${API_BASE_URL}/Contact,
//     withCredentials: true,
//   });

//   // Load contacts on mount
//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const { data } = await API.get("/getContacts");
//       setContacts(Array.isArray(data.contacts) ? data.contacts : []);
//       //setContacts(data);
//     } catch (err) {
//       toast.error("Failed to fetch contacts");
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddContact = async () => {
//     if (!form.name || !form.phoneNumber) return toast.error("⚠ Name & Phone required!");

//     try {
//       if (editIndex !== null) {
//         const contactToUpdate = contacts[editIndex];
//         const { data } = await API.put(/${contactToUpdate._id}, form);
//         const updated = [...contacts];
//         updated[editIndex] = data.contact;
//         setContacts(updated);
//         setEditIndex(null);
//         toast.success("Contact updated successfully!");
//       } else {
//         const { data } = await API.post("/addContact", form);
//         setContacts([...contacts, data.contact]);
//         toast.success("Contact added successfully!");
//       }
//       setForm({ name: "", phoneNumber: "", language: "en", tags: [] });
//     } catch (err) {
//       toast.error("Failed to add/update contact");
//       console.error(err);
//     }
//   };

//   const handleEdit = (index) => {
//     setForm(contacts[index]);
//     setEditIndex(index);
//   };

//   // ✅ Toast-based delete confirmation
//   const handleDelete = (index) => {
//     toast(
//       (t) => (
//         <div className="flex flex-col gap-2">
//           <span>क्या आप इस contact को delete करना चाहते हैं?</span>
//           <div className="flex gap-2 justify-end">
//             <button
//               className="bg-red-600 text-white px-3 py-1 rounded"
//               onClick={async () => {
//                 await API.delete(/${contacts[index]._id});
//                 setContacts(contacts.filter((_, i) => i !== index));
//                 toast.success("Contact deleted successfully!");
//                 toast.dismiss(t.id);
//               }}
//             >
//               हाँ
//             </button>
//             <button
//               className="bg-gray-300 px-3 py-1 rounded"
//               onClick={() => toast.dismiss(t.id)}
//             >
//               नहीं
//             </button>
//           </div>
//         </div>
//       ),
//       { duration: Infinity }
//     );
//   };

//   const handleImport = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImportedFiles([...importedFiles, file]);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const { data } = await API.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setContacts(data.contacts);
//       toast.success("Contacts imported successfully!");
//     } catch (err) {
//       toast.error("Failed to import contacts");
//       console.error(err);
//     }
//   };

//   const handleDeleteFile = (i) => {
//     setImportedFiles(importedFiles.filter((_, index) => index !== i));
//     toast("File removed");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">📇 Contacts</h1>
//         <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
//           Import File
//           <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
//         </label>
//       </div>

//       {/* Add Contact Form */}
//       <div className="bg-white p-4 rounded shadow mb-6 flex flex-col sm:flex-row gap-3">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded flex-1 focus:ring focus:ring-blue-200"
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={form.phoneNumber}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded flex-1 focus:ring focus:ring-blue-200"
//         />
//         <select
//           name="language"
//           value={form.language}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded focus:ring focus:ring-blue-200"
//         >
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//         </select>
//         <Button
//           onClick={handleAddContact}
//           className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
//         >
//           {editIndex !== null ? "Update Contact" : "+ Add Contact"}
//         </Button>
//       </div>

//       {/* Contacts Table */}
//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-3">Basic Info</th>
//               <th className="p-3">Contact Attributes</th>
//               <th className="p-3">Created Date</th>
//               <th className="p-3">Broadcast</th>
//               <th className="p-3">SMS</th>
//               <th className="p-3">Edit/Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center p-6 text-gray-500">
//                   🙁 कोई contacts available नहीं हैं। पहले एक जोड़ें!
//                 </td>
//               </tr>
//             ) : (
//               contacts.map((contact, index) => (
//                 <tr key={contact._id} className="border-t hover:bg-gray-50 transition">
//                   <td className="p-3">
//                     <p className="text-blue-600 font-medium">{contact.name}</p>
//                     <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
//                   </td>
//                   <td className="p-3 flex flex-wrap gap-1">
//                     <span className="bg-gray-100 px-2 py-1 rounded text-sm">
//                       language: {contact.language}
//                     </span>
//                     <span className="bg-gray-100 px-2 py-1 rounded text-sm">
//                       phone: {contact.phoneNumber}
//                     </span>
//                   </td>
//                   <td className="p-3">{new Date(contact.createdAt).toLocaleDateString()}</td>
//                   <td className="p-3">✔</td>
//                   <td className="p-3">✔</td>
//                   <td className="p-3 flex flex-wrap gap-2">
//                     <Button
//                       onClick={() => handleEdit(index)}
//                       className="border text-blue-600 hover:bg-blue-50"
//                     >
//                       ✏ Edit
//                     </Button>
//                     <Button
//                       onClick={() => handleDelete(index)}
//                       className="border text-red-600 hover:bg-red-50"
//                     >
//                       🗑 Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Imported Files Section */}
//       {importedFiles.length > 0 && (
//         <div className="mt-6 bg-white p-4 rounded shadow">
//           <h2 className="font-bold mb-2">📂 Imported Files</h2>
//           <ul className="list-disc pl-5 text-gray-700">
//             {importedFiles.map((file, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
//               >
//                 {file.name} ({Math.round(file.size / 1024)} KB)
//                 <Button
//                   onClick={() => handleDeleteFile(i)}
//                   className="border text-red-600 hover:bg-red-50 ml-3"
//                 >
//                   🗑 Remove
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import API_BASE_URL from "../config";

// // ✅ Custom Button
// function Button({ children, className = "", ...props }) {
//   return (
//     <button
//       className={px-3 py-1 rounded font-medium transition hover:opacity-80 ${className}}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// export default function Contacts() {
//   const [contacts, setContacts] = useState([]);
//   const [form, setForm] = useState({ name: "", phoneNumber: "", language: "en", tags: [] });
//   const [editIndex, setEditIndex] = useState(null);
//   const [importedFiles, setImportedFiles] = useState([]);

//   const API = axios.create({
//     baseURL: "http://192.168.0.113/api/contact",
//     withCredentials: true,
//   });

//   // Load contacts on mount
//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const { data } = await API.get("/getContacts");

//       // ✅ Safe check for array
//       if (Array.isArray(data)) {
//         setContacts(data);
//       } else if (Array.isArray(data.contacts)) {
//         setContacts(data.contacts);
//       } else {
//         setContacts([]);
//       }
//     } catch (err) {
//       toast.error("Failed to fetch contacts");
//       console.error(err);
//       setContacts([]);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddContact = async () => {
//     if (!form.name || !form.phoneNumber) return toast.error("⚠ Name & Phone required!");

//     try {
//       if (editIndex !== null) {
//         const contactToUpdate = contacts[editIndex];
//         const { data } = await API.put(/${contactToUpdate._id}, form);
//         const updated = [...contacts];
//         updated[editIndex] = data.contact || contactToUpdate;
//         setContacts(updated);
//         setEditIndex(null);
//         toast.success("Contact updated successfully!");
//       } else {
//         const { data } = await API.post("/addContact", form);
//         setContacts([...contacts, data.contact]);
//         toast.success("Contact added successfully!");
//       }
//       setForm({ name: "", phoneNumber: "", tags: [] });
//     } catch (err) {
//       toast.error("Failed to add/update contact");
//       console.error(err);
//     }
//   };

//   const handleEdit = (index) => {
//     setForm(contacts[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     toast(
//       (t) => (
//         <div className="flex flex-col gap-2">
//           <span>क्या आप इस contact को delete करना चाहते हैं?</span>
//           <div className="flex gap-2 justify-end">
//             <button
//               className="bg-red-600 text-white px-3 py-1 rounded"
//               onClick={async () => {
//                 await API.delete(/${contacts[index]._id});
//                 setContacts(contacts.filter((_, i) => i !== index));
//                 toast.success("Contact deleted successfully!");
//                 toast.dismiss(t.id);
//               }}
//             >
//               हाँ
//             </button>
//             <button
//               className="bg-gray-300 px-3 py-1 rounded"
//               onClick={() => toast.dismiss(t.id)}
//             >
//               नहीं
//             </button>
//           </div>
//         </div>
//       ),
//       { duration: Infinity }
//     );
//   };

//   const handleImport = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImportedFiles([...importedFiles, file]);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const { data } = await API.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // ✅ Safe array check
//       if (Array.isArray(data.contacts)) {
//         setContacts(data.contacts);
//       } else {
//         toast.error("No contacts returned from upload");
//       }

//       toast.success("Contacts imported successfully!");
//     } catch (err) {
//       toast.error("Failed to import contacts");
//       console.error(err);
//     }
//   };

//   const handleDeleteFile = (i) => {
//     setImportedFiles(importedFiles.filter((_, index) => index !== i));
//     toast("File removed");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">📇 Contacts</h1>
//         <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
//           Import File
//           <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
//         </label>
//       </div>

//       {/* Add Contact Form */}
//       <div className="bg-white p-4 rounded shadow mb-6 flex flex-col sm:flex-row gap-3">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded flex-1 focus:ring focus:ring-blue-200"
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={form.phoneNumber}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded flex-1 focus:ring focus:ring-blue-200"
//         />
//         <select
//           name="language"
//           value={form.language}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded focus:ring focus:ring-blue-200"
//         >
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//         </select>
//         <Button
//           onClick={handleAddContact}
//           className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
//         >
//           {editIndex !== null ? "Update Contact" : "+ Add Contact"}
//         </Button>
//       </div>

//       {/* Contacts Table */}
//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-3">Basic Info</th>
//               <th className="p-3">Contact Attributes</th>
//               <th className="p-3">Created Date</th>
//               <th className="p-3">Broadcast</th>
//               <th className="p-3">SMS</th>
//               <th className="p-3">Edit/Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center p-6 text-gray-500">
//                   🙁 कोई contacts available नहीं हैं। पहले एक जोड़ें!
//                 </td>
//               </tr>
//             ) : (
//               contacts.map((contact, index) => (
//                 <tr key={contact._id || index} className="border-t hover:bg-gray-50 transition">
//                   <td className="p-3">
//                     <p className="text-blue-600 font-medium">{contact.name}</p>
//                     <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
//                   </td>
//                   <td className="p-3 flex flex-wrap gap-1">
//                     <span className="bg-gray-100 px-2 py-1 rounded text-sm">
//                       language: {contact.language}
//                     </span>
//                     <span className="bg-gray-100 px-2 py-1 rounded text-sm">
//                       phone: {contact.phoneNumber}
//                     </span>
//                   </td>
//                   <td className="p-3">{contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "-"}</td>
//                   <td className="p-3">✔</td>
//                   <td className="p-3">✔</td>
//                   <td className="p-3 flex flex-wrap gap-2">
//                     <Button
//                       onClick={() => handleEdit(index)}
//                       className="border text-blue-600 hover:bg-blue-50"
//                     >
//                       ✏ Edit
//                     </Button>
//                     <Button
//                       onClick={() => handleDelete(index)}
//                       className="border text-red-600 hover:bg-red-50"
//                     >
//                       🗑 Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Imported Files Section */}
//       {importedFiles.length > 0 && (
//         <div className="mt-6 bg-white p-4 rounded shadow">
//           <h2 className="font-bold mb-2">📂 Imported Files</h2>
//           <ul className="list-disc pl-5 text-gray-700">
//             {importedFiles.map((file, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
//               >
//                 {file.name} ({Math.round(file.size / 1024)} KB)
//                 <Button
//                   onClick={() => handleDeleteFile(i)}
//                   className="border text-red-600 hover:bg-red-50 ml-3"
//                 >
//                   🗑 Remove
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../config";

// ✅ Custom Button
function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-3 py-1 rounded font-medium transition hover:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phoneNumber: "", tags: [] });
  const [editIndex, setEditIndex] = useState(null);
  const [importedFiles, setImportedFiles] = useState([]);

  const API = axios.create({
    baseURL: `${API_BASE_URL}/contact`,
    withCredentials: true,
  });

  // Load contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await API.get("/getContacts");
      setContacts(Array.isArray(data) ? data : []); // ✅ Direct array from backend
    } catch (err) {
      toast.error("Failed to fetch contacts");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddContact = async () => {
    if (!form.name || !form.phoneNumber) return toast.error("⚠ Name & Phone required!");

    try {
      if (editIndex !== null) {
        const contactToUpdate = contacts[editIndex];
        const { data } = await API.put(`/${contactToUpdate._id}`, form);
        const updated = [...contacts];
        updated[editIndex] = data.contact || updated[editIndex];
        setContacts(updated);
        setEditIndex(null);
        toast.success("Contact updated successfully!");
      } else {
        const { data } = await API.post("/addContact", form);
        setContacts([...contacts, data.contact]);
        toast.success("Contact added successfully!");
      }
      setForm({ name: "", phoneNumber: "", tags: [] });
    } catch (err) {
      toast.error("Failed to add/update contact");
      console.error(err);
    }
  };

  const handleEdit = (index) => {
    setForm(contacts[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>क्या आप इस contact को delete करना चाहते हैं?</span>
          <div className="flex gap-2 justify-end">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={async () => {
                await API.delete(`/${contacts[index]._id}`);
                setContacts(contacts.filter((_, i) => i !== index));
                toast.success("Contact deleted successfully!");
                toast.dismiss(t.id);
              }}
            >
              हाँ
            </button>
            <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => toast.dismiss(t.id)}>
              नहीं
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportedFiles([...importedFiles, file]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContacts(Array.isArray(data.contacts) ? data.contacts : []);
      toast.success("Contacts imported successfully!");
    } catch (err) {
      toast.error("Failed to import contacts");
      console.error(err);
    }
  };

  const handleDeleteFile = (i) => {
    setImportedFiles(importedFiles.filter((_, index) => index !== i));
    toast("File removed");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">📇 Contacts</h1>
        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Import File
          <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
        </label>
      </div>

      {/* Add Contact Form */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded flex-1 focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="border px-3 py-2 rounded flex-1 focus:ring focus:ring-blue-200"
        />
        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-200"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <Button
          onClick={handleAddContact}
          className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
        >
          {editIndex !== null ? "Update Contact" : "+ Add Contact"}
        </Button>
      </div>

      {/* Contacts Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Basic Info</th>
              <th className="p-3">Contact Attributes</th>
              <th className="p-3">Created Date</th>
              <th className="p-3">Broadcast</th>
              <th className="p-3">SMS</th>
              <th className="p-3">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  🙁 कोई contacts available नहीं हैं। पहले एक जोड़ें!
                </td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact._id || index} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">
                    <p className="text-blue-600 font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
                  </td>
                  <td className="p-3 flex flex-wrap gap-1">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      language: {contact.language || "-"}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      phone: {contact.phoneNumber || "-"}
                    </span>
                  </td>
                  <td className="p-3">
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-3">✔</td>
                  <td className="p-3">✔</td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleEdit(index)}
                      className="border text-blue-600 hover:bg-blue-50"
                    >
                      ✏ Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(index)}
                      className="border text-red-600 hover:bg-red-50"
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Imported Files Section */}
      {importedFiles.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">📂 Imported Files</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {importedFiles.map((file, i) => (
              <li
                key={i}
                className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
              >
                {file.name} ({Math.round(file.size / 1024)} KB)
                <Button
                  onClick={() => handleDeleteFile(i)}
                  className="border text-red-600 hover:bg-red-50 ml-3"
                >
                  🗑 Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}