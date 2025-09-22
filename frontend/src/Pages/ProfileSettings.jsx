import { useNavigate } from "react-router-dom"; // navigate hook import
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // notification
import API_BASE_URL from "../config";

export default function ProfileSettings() {
  const navigate = useNavigate(); // navigate initialize

  const handleShopSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const shopData = {
      businessName: form[0].value,
      address: form[1].value,
      city: form[2].value,
      state: form[3].value,
      phone: form[4].value,
      description: form[5].value,
    };

    // Optional: simple validation
    if (!shopData.businessName || !shopData.address || !shopData.city || !shopData.state || !shopData.phone || !shopData.description) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/user/business/registerBusiness`, shopData, {
        withCredentials: true
      });

      if (res.data?.success) {
        toast.success("Shop details saved successfully!");
        navigate("/dashboard"); // Dashboard page pe redirect
      } else {
        toast.error(res.data?.message || "Failed to save shop details");
      }
    } catch (error) {
      console.error("ProfileSettings Error:", error);
      toast.error(error.response?.data?.message || "Server not reachable!");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shop Details Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleShopSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">business Details</h2>

            <input type="text" placeholder="business Name" className="border p-2 rounded w-full" required />
            <input type="text" placeholder=" Address" className="border p-2 rounded w-full" required />
            <input type="text" placeholder="City" className="border p-2 rounded w-full" required />
            <input type="text" placeholder="State" className="border p-2 rounded w-full" required />
            {/* <input type="text" placeholder="Pincode" className="border p-2 rounded w-full" required /> */}
            {/* <input type="text" placeholder="GST Number" className="border p-2 rounded w-full" /> */}
            <input type="text" placeholder="Shop Contact Number" className="border p-2 rounded w-full" />
            <input type="text" placeholder="Discription" className="border p-2 rounded w-full" required />
            {/* <input type="url" placeholder="Discription" className="border p-2 rounded w-full" /> */}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
            >
              Start my trial
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}