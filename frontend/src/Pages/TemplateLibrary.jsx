import React, { useState } from "react";
import { Link } from "react-router-dom";



// ================== Templates Data ==================
const templates = [
  // 🔹 Travel (5)
  {
    title: "Travel_Booking",
    category: "Travel",
    body: `Hi {{name}},

✈ Your travel booking is confirmed!  

📌 Destination: [Destination]  
📆 Date: [Date]  
🆔 PNR: [PNR_No]  

Safe travels, and thank you for choosing us!`,
  },
  {
    title: "Flight_Reminder",
    category: "Travel",
    body: `Hello {{name}},

🛫 Reminder: Your flight is scheduled for tomorrow.  
Flight No: [Flight_No]  
Departure: [Time]  

Please arrive at the airport at least 2 hours before departure.`,
  },
  {
    title: "Hotel_Confirmation",
    category: "Travel",
    body: `Dear {{name}},

🏨 Your hotel booking is confirmed.  
Hotel: [Hotel_Name]  
Check-in: [Date]  
Check-out: [Date]  

Enjoy your stay with us!`,
  },
  {
    title: "Tour_Guide_Info",
    category: "Travel",
    body: `Hi {{name}},

Your tour guide details:  
👨‍💼 Name: [Guide_Name]  
📞 Contact: [Guide_Phone]  

They will meet you at [Location] on [Date].`,
  },
  {
    title: "Travel_Insurance",
    category: "Travel",
    body: `Hi {{name}},

📄 Your travel insurance is confirmed.  
Policy No: [Policy_No]  
Valid Till: [Date]  

Have a safe journey!`,
  },

  // 🔹 Healthcare (5)
  {
    title: "Appointment_Reminder",
    category: "Healthcare",
    body: `Hi {{name}},

📅 Reminder for your appointment:  
Doctor: Dr. [Doctor_Name]  
Time: [Time]  

Please arrive 10 minutes early.`,
  },
  {
    title: "Lab_Report",
    category: "Healthcare",
    body: `Hello {{name}},

🧪 Your lab report is ready.  
You can download it from [Link].  

Stay healthy!`,
  },
  {
    title: "Medicine_Reminder",
    category: "Healthcare",
    body: `Hi {{name}},

💊 Don’t forget to take your medicine: [Medicine_Name]  
⏰ Time: [Time]  

Stay consistent for better recovery.`,
  },
  {
    title: "Health_Checkup",
    category: "Healthcare",
    body: `Hello {{name}},

🏥 Reminder: Your annual health checkup is scheduled on [Date].  
Please confirm your availability.`,
  },
  {
    title: "Prescription_Ready",
    category: "Healthcare",
    body: `Hi {{name}},

📄 Your prescription from Dr. [Doctor_Name] is ready.  
Collect it from [Pharmacy_Name].`,
  },

  // 🔹 E-Commerce (5)
  {
    title: "Order_Confirmation",
    category: "E-Commerce",
    body: `Hi {{name}},

🎉 Thank you for shopping!  
Order ID: [Order_ID]  

We will notify you once it is shipped.`,
  },
  {
    title: "Shipping_Update",
    category: "E-Commerce",
    body: `Hi {{name}},

🚚 Your order has been shipped.  
Tracking No: [Tracking_ID]  

Track on [Website_Link].`,
  },
  {
    title: "Order_Delivered",
    category: "E-Commerce",
    body: `Hi {{name}},

📦 Your order [Order_ID] has been delivered.  
Thank you for shopping with us!`,
  },
  {
    title: "Cart_Reminder",
    category: "E-Commerce",
    body: `Hi {{name}},

🛒 You left some items in your cart.  
Complete your purchase now and enjoy discounts!`,
  },
  {
    title: "Return_Confirmation",
    category: "E-Commerce",
    body: `Hi {{name}},

✅ Your return request for Order [Order_ID] has been confirmed.  
Refund will be processed in [Time_Duration].`,
  },

  // 🔹 Education (5)
  {
    title: "Exam_Reminder",
    category: "Education",
    body: `Hi {{name}},

📘 Reminder: Your exam [Subject] is scheduled on [Date].  
Venue: [Location].  

All the best!`,
  },
  {
    title: "Fee_Payment",
    category: "Education",
    body: `Hello {{name}},

💰 Reminder: Your tuition fee of [Amount] is due on [Date].  
Please pay to avoid late charges.`,
  },
  {
    title: "Class_Schedule",
    category: "Education",
    body: `Hi {{name}},

📅 Your class schedule:  
Subject: [Subject]  
Time: [Time]  
Teacher: [Teacher_Name]`,
  },
  {
    title: "Result_Announcement",
    category: "Education",
    body: `Hi {{name}},

📊 Your results for [Exam_Name] are now available.  
Check them on [Portal_Link].`,
  },
  {
    title: "Library_Due",
    category: "Education",
    body: `Hello {{name}},

📚 Reminder: The book [Book_Name] is due on [Date].  
Please return it to avoid late fees.`,
  },

  // 🔹 Finance (5)
  {
    title: "Payment_Alert",
    category: "Finance",
    body: `Hi {{name}},

⚠ Payment Alert: Your payment of [Amount] is due on [Date].  
Please pay before the deadline.`,
  },
  {
    title: "Payment_Success",
    category: "Finance",
    body: `Hi {{name}},

✅ Payment of [Amount] received successfully.  
Transaction ID: [Txn_ID].`,
  },
  {
    title: "Low_Balance",
    category: "Finance",
    body: `Hello {{name}},

⚠ Your account balance is low.  
Available Balance: [Balance].  

Please recharge your account.`,
  },
  {
    title: "EMI_Reminder",
    category: "Finance",
    body: `Hi {{name}},

📅 Reminder: Your EMI of [Amount] is due on [Date].  
Auto-debit will be processed from your account.`,
  },
  {
    title: "Loan_Approved",
    category: "Finance",
    body: `Hello {{name}},

🎉 Congratulations! Your loan of [Amount] has been approved.  
Loan ID: [Loan_ID].`,
  },

  // 🔹 Others (5)
  {
    title: "Login_Verification",
    category: "Others",
    body: `Hi {{name}}, please enter the following code: [Code].`,
  },
  {
    title: "Login_OTP",
    category: "Others",
    body: `Hi {{name}}, your OTP is [OTP Code].`,
  },
  {
    title: "Two_Factor_Auth",
    category: "Others",
    body: `Hi {{name}}, use this code for verification: [Auth_Code].`,
  },
  {
    title: "Password_Reset",
    category: "Others",
    body: `Hi {{name}}, your reset code is [Reset_Code].`,
  },
  {
    title: "General_Notification",
    category: "Others",
    body: `Hello {{name}}, this is a general notification for your account activity.`,
  },
];

// ================== Component ==================
export default function TemplateLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter templates
  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  // Count by category
  const countByCategory = (cat) =>
    templates.filter((t) => t.category === cat).length;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
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

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-xl font-bold text-gray-800">Template Library</h1>
          {/*  */}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-6 text-sm font-medium text-gray-700">
          {["All","Travel","Healthcare","E-Commerce","Education","Finance","Others"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-1 ${
                selectedCategory === cat
                  ? "text-green-600 border-b-2 border-green-600"
                  : ""
              }`}
            >
              {cat} {cat === "All" ? templates.length : countByCategory(cat)}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-800">{template.title}</h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">{template.body}</p>
              {/* <button className="mt-3 text-sm text-blue-600 hover:underline">
                Use sample
              </button> */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}