

















import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Rocket, ArrowRight } from "lucide-react";
import FloatingCard from "../components/3d/FloatingCard";
import axios from "axios";
import API_BASE_URL from "../config";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [plans, setPlans] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/plan`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPlans(res.data.plans || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlans();
  }, [token]);

  const handlePayment = async (planId) => {
    try {
      // 1️⃣ Order create
      const orderRes = await axios.post(
        `${API_BASE_URL}/subscriptions/order`,
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { order,key } = orderRes.data;

      // 2️⃣ Razorpay options
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "sakaAI",
        description: "Subscription Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify Payment (backend)
            await axios.post(
              `${API_BASE_URL}/subscriptions/verify`,
              {
                planId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("✅ Payment Successful & Verified! 🎉");
          } catch (err) {
            console.error("Verification error:", err);
            alert("❌ Payment verification failed!");
          }
        },
        theme: { color: "#4F46E5" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order error:", err);
      alert("Payment failed. Try again!");
    }
  };

  if (!plans.length) return <div className="text-center mt-20">Loading plans...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <section className="container mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 mr-2" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Scale your business intelligence with flexible pricing that grows with you.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-gray-200 p-1 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg"
              />
            </motion.button>
            <span className={`text-lg ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Annual</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {plans
            .filter((plan) => plan.name !== "Free Trial") // 👈 Free Trial hide
            .map((plan, index) => (
            <FloatingCard key={index} delay={index * 0.2} glowColor="blue">
              <div className="p-8 h-full border border-transparent">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-500">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      ₹{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-2 text-gray-500">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {(plan.features || []).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => plan.name === "Starter Plan" && handlePayment(plan._id)}
                  whileHover={{ scale: plan.name === "Starter Plan" ? 1.05 : 1 }}
                  whileTap={{ scale: plan.name === "Starter Plan" ? 0.95 : 1 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300
                    ${plan.name === "Starter Plan"
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-400 text-white cursor-not-allowed'}
                  `}
                  disabled={plan.name !== "Starter Plan"}
                >
                  <span className="flex items-center justify-center">
                    {plan.name === "Starter Plan" ? "Get Started" : "Coming Soon"}
                    {plan.name === "Starter Plan" && <ArrowRight className="ml-2 w-5 h-5" />}
                  </span>
                </motion.button>
              </div>
            </FloatingCard>
          ))}
        </div>
      </section>
    </div>
  );
}

