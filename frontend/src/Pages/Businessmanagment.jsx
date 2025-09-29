









// niche vala code sahi hain baki sab galathain 












// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import API_BASE_URL from "../config";

// export default function ProfileSettings() {
//   const navigate = useNavigate();

//   const [shopData, setShopData] = useState(null);
//   const [originalData, setOriginalData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [businessId, setBusinessId] = useState(null);

//   // Fetch business details
//   const fetchBusinessDetails = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/user/business/getMyBusinesses`, {
//         withCredentials: true,
//       });

//       if (res.data?.businesses?.length > 0) {
//         const business = res.data.businesses[0];
//         setShopData({ ...business });
//         setOriginalData({ ...business });
//         setBusinessId(business._id);
//       }
//     } catch (err) {
//       console.error("Fetch Business Error:", err);
//       toast.error("Failed to fetch business details!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBusinessDetails();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShopData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit form (Save)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!shopData) return;

//     const { businessName, address, city, state, phone, description } = shopData;
//     if (!businessName || !address || !city || !state || !phone || !description) {
//       toast.error("Please fill all required fields!");
//       return;
//     }

//     try {
//       let res;
//       if (businessId) {
//         res = await axios.put(`${API_BASE_URL}/user/business/${businessId}`, shopData, {
//           withCredentials: true,
//         });
//       } else {
//         res = await axios.post(`${API_BASE_URL}/user/business/registerBusiness`, shopData, {
//           withCredentials: true,
//         });
//       }

//       if (res.data?.success) {
//         toast.success("Shop details saved successfully!");
//         setOriginalData({ ...shopData });
//         setIsEditing(false);
//         if (res.data.business?._id) setBusinessId(res.data.business._id);
//       } else {
//         toast.error(res.data?.message || "Failed to save shop details");
//       }
//     } catch (error) {
//       console.error("Save Business Error:", error);
//       toast.error(error.response?.data?.message || "Server not reachable!");
//     }
//   };

//   // Edit button click
//   const handleEditClick = (e) => {
//     e.preventDefault(); // Prevent form submission
//     setIsEditing(true);
//   };

//   // Cancel edit
//   const handleCancel = () => {
//     setShopData({ ...originalData });
//     setIsEditing(false);
//   };

//   if (loading || !shopData) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
//       <Toaster />
//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <h2 className="text-xl font-semibold">Business Details</h2>

//             {[
//               { name: "businessName", placeholder: "Business Name" },
//               { name: "address", placeholder: "Address" },
//               { name: "city", placeholder: "City" },
//               { name: "state", placeholder: "State" },
//               { name: "phone", placeholder: "Shop Contact Number" },
//               { name: "description", placeholder: "Description" },
//             ].map((field) => (
//               <input
//                 key={field.name}
//                 type="text"
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 className="border p-2 rounded w-full"
//                 value={shopData[field.name]}
//                 onChange={isEditing ? handleChange : undefined}
//                 disabled={!isEditing}
//                 required
//               />
//             ))}

//             <div className="flex gap-2">
//               {isEditing ? (
//                 <>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={handleEditClick}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



















import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../config";

export default function ProfileSettings() {
  const navigate = useNavigate();

  const [shopData, setShopData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [businessId, setBusinessId] = useState(null);

  // Fetch business details
  const fetchBusinessDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/business/getMyBusinesses`, {
        withCredentials: true,
      });

      if (res.data?.businesses?.length > 0) {
        const business = res.data.businesses[0];
        setShopData({ ...business });
        setOriginalData({ ...business });
        setBusinessId(business._id);
      } else {
        // No business exists → allow user to fill new shop details
        setShopData({
          businessName: "",
          address: "",
          city: "",
          state: "",
          phone: "",
          description: "",
        });
        setOriginalData({});
      }
    } catch (err) {
      console.error("Fetch Business Error:", err);
      toast.error("Failed to fetch business details!");
      // Even on error, allow user to fill new shop info
      setShopData({
        businessName: "",
        address: "",
        city: "",
        state: "",
        phone: "",
        description: "",
      });
      setOriginalData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopData) return;

    const { businessName, address, city, state, phone, description } = shopData;
    if (!businessName || !address || !city || !state || !phone || !description) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      let res;
      if (businessId) {
        res = await axios.put(`${API_BASE_URL}/user/business/${businessId}`, shopData, {
          withCredentials: true,
        });
      } else {
        res = await axios.post(`${API_BASE_URL}/user/business/registerBusiness`, shopData, {
          withCredentials: true,
        });
      }

      if (res.data?.success) {
        toast.success("Shop details saved successfully!");
        setOriginalData({ ...shopData });
        setIsEditing(false);
        if (res.data.business?._id) setBusinessId(res.data.business._id);
      } else {
        toast.error(res.data?.message || "Failed to save shop details");
      }
    } catch (error) {
      console.error("Save Business Error:", error);
      toast.error(error.response?.data?.message || "Server not reachable!");
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancel = () => {
    setShopData({ ...originalData });
    setIsEditing(false);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Business Details</h2>

            {[
              { name: "businessName", placeholder: "Business Name" },
              { name: "address", placeholder: "Address" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "phone", placeholder: "Shop Contact Number" },
              { name: "description", placeholder: "Description" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                className="border p-2 rounded w-full"
                value={shopData[field.name] || ""}
                onChange={isEditing ? handleChange : undefined}
                disabled={!isEditing}
                required
              />
            ))}

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                >
                  {businessId ? "Edit" : "Fill Shop Details"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
