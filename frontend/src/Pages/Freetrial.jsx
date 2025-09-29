// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import API_BASE_URL from "../config";

// export default function FreeTrial() {
//   const navigate = useNavigate();

//   // Form state
//   const [name, setName] = useState("");
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple validation
//     if ( !name || !email || !password ) {
//       toast.error("Please fill all required fields!");
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_BASE_URL}/user/freetrial`, {
        
//         name,
//         email,
//         password,
       
//       },{withCredentials:true});

//        if (res.data?.success) {
//     toast.success("Login successful!");
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     navigate("/freetrial2"); // ✅ same as previous navigate
//       } else {
//         toast.error(res.data?.message || "Failed to start free trial");
//       }
//     } catch (error) {
//       console.error("FreeTrial Error:", error);
//       toast.error(error.response?.data?.message || "Server not reachable!");
//     }

//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-green-50 to-white">
//       <Toaster />
//       {/* Left Section */}
//       <div className="hidden md:flex w-1/2 flex-col justify-center p-12">
//         <h1 className="text-4xl font-bold text-gray-800 mb-6">
//           Everything you need to grow your business on{" "}
//           <span className="text-green-600">WhatsApp</span>
//         </h1>
//         <ul className="space-y-3 text-gray-700">
//           <li>✅ Targeted Campaigns to deliver personalized offers</li>
//           <li>✅ AI-Agent to send updates & reminders</li>
//           <li>✅ 24x7 instant engagement with AI-Agent</li>
//           <li>✅ Powerful automations to resolve issues faster</li>
        
//         </ul>
//         {/*  */}
        
//       </div>

//       {/* Right Section */}
//       <div className="flex w-full md:w-1/2 items-center justify-center p-8">
//         <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Start your free trial
//           </h2>
         

          

//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500"> Sign up with email</span>
//             </div>
//           </div>

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 placeholder=" Name"
//                 className="w-100 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
              
//             </div>

//             <input
//               type="email"
//               placeholder="Business Email Address"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />


//             <p className="text-xs text-gray-500">
//               By signing up, you agree to the{" "}
//               <a href="/privacy" className="text-green-600 hover:underline">
//                 Terms & Privacy 
//               </a>{" "}
//               {" "}
              
//               .
//             </p>

//             <button 
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
//             >
//               Start my trial
//             </button>
//           </form>

//           <p className="mt-4 text-sm text-gray-500 text-center">
//             Already have an account?{" "}
//             <a href="/login" className="text-green-600 hover:underline">
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../config";

export default function FreeTrial() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Add your real free trial planId here
  const planId = "68d9b3e433325c7d22f0efdf";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/user/freetrial`,
        {
          name,
          email,
          password,
          planId, // ✅ send planId to backend
        },
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success("Free trial started successfully!");
        localStorage.setItem("token", res.data.token || ""); // token agar backend bheje
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/freetrial2");
      } else {
        toast.error(res.data?.message || "Failed to start free trial");
      }
    } catch (error) {
      console.error("FreeTrial Error:", error);
      toast.error(error.response?.data?.message || "Server not reachable!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-50 to-white">
      <Toaster />

      {/* Left Section */}
      <div className="hidden md:flex w-1/2 flex-col justify-center p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Everything you need to grow your business on{" "}
          <span className="text-green-600">WhatsApp</span>
        </h1>
        <ul className="space-y-3 text-gray-700">
          <li>✅ Targeted Campaigns to deliver personalized offers</li>
          <li>✅ AI-Agent to send updates & reminders</li>
          <li>✅ 24x7 instant engagement with AI-Agent</li>
          <li>✅ Powerful automations to resolve issues faster</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Start your free trial
          </h2>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500"> Sign up with email</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Business Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-xs text-gray-500">
              By signing up, you agree to the{" "}
              <a href="/privacy" className="text-green-600 hover:underline">
                Terms & Privacy
              </a>.
            </p>

            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
            >
              Start my trial
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}













