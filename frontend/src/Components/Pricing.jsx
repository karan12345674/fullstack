import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Rocket,
  ArrowRight
} from "lucide-react";
import FloatingCard from "../Components/3d/FloatingCard";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      monthlyPrice: 1500,
      annualPrice: 1200,
      color: "blue",
      icon: Zap,
      popular: false,
      features: [
        "Up to 5 team members",
        "Send up to 1500 messages/month",
        "24/7 AI agent 🤖 – Auto-replies instantly",
        "Basic analytics",
        "Bulk messaging support",
        "API access",
        "Standard security",
        "Lead generation tools 📈"
      ]
    },
    {
      name: "Professional",
      description: "Advanced features for growing businesses",
      monthlyPrice: 3000,
      annualPrice: 2400,
      color: "purple",
      icon: Star,
      popular: true,
      features: [
        "Up to 10 team members",
        "Send up to 3000 messages/month",
        "24/7 AI agent 🤖 – Auto-replies instantly",
        "Bulk messaging support",
        "Advanced AI analytics",
         "Lead generation tools 📈",
        "Custom integrations",
        "Advanced security",
        "Real-time dashboards",
        "Instant API Connect ⚡"
      ]
    },
    {
      name: "Enterprise",
      description: "Ultimate power for large organizations",
      monthlyPrice: 5000,
      annualPrice: 4000,
      color: "pink",
      icon: Crown,
      popular: false,
      features: [
        "Unlimited team members",
        "Unlimited Send up to 3000 messages/month",
        "24/7 AI agent 🤖 – Auto-replies instantly",
        "24/7 dedicated support",
        "Advanced AI analytics",
        "Lead generation tools 📈",
        "Custom integrations",
        "Unlimited API calls",
        "Advanced security",
        "Real-time dashboards",
        "Meta Verified (Blue Tick) 🔵✨"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Hero Section */}
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
            No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
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
            {isAnnual && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 border border-green-500/20 text-green-600"
              >
                Save 20%
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {plans.map((plan, index) => (
            <FloatingCard key={index} delay={index * 0.2} glowColor={plan.color}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full shadow-lg">
                    
                  </div>
                </div>
              )}
              <div className="p-8 h-full border border-transparent">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-500">{plan.description}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${plan.color}-500 to-${plan.color}-600 flex items-center justify-center`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      ₹{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-2 text-gray-500">/month</span>
                  </div>
                  {/* {isAnnual && (
                    <p className="text-sm mt-1 text-gray-500">
                       ({(isAnnual ? plan.annualPrice : plan.monthlyPrice) * 12}/year)
                    </p>
                  )} */}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className={`w-5 h-5 text-${plan.color}-500 mr-3 mt-0.5`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
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