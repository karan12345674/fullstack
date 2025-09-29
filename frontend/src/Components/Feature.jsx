import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3,
  Cpu,
  Lock,
  Rocket
} from "lucide-react";
import FloatingCard from "@Components/3d/FloatingCard";

export default function Features() {
  const mainFeatures = [
    {
      icon: Brain,
      title: "Bulk Messaging",
      description: "Reach thousands of customers instantly with our smart bulk messaging system. Schedule, personalize, and track every message with easy.",
      color: "blue",
      features: ["Multi-channel support", "Scheduled & automated campaigns", "Real-time delivery reports"]
    },
    {
      icon: Database,
      title: "AI Chat Agent",
      description: "Engage with your customers 24/7 using an intelligent AI-powered chatbot that understands, responds, and converts.",
      color: "purple",
      features: ["Natural language understanding", "Smart lead qualification", "Instant customer support"]
    },
    {
      icon: Shield,
      title: "Lead Generation",
      description: "Turn conversations into business opportunities. SakaAI automatically captures, organizes, and nurtures leads for you.",
      color: "pink",
      features: ["Auto lead capture from chats & forms", "Lead scoring & prioritization", "CRM integration"]
    }
  ];

  const additionalFeatures = [
    { icon: Zap, title: " Instant Campaigns", description: "Sub-second message dispatch" },
    { icon: Globe, title: "Automated Follow-ups", description: "AI-powered nurturingWorldwide data distribution" },
    { icon: BarChart3, title: "Smart Dashboards", description: "Data-driven visualization" },
    { icon: Cpu, title: "CRM Integration", description: "Auto-sync with major CRMs" },
    { icon: Lock, title: "Privacy First", description: "Your data stays yours" },
    { icon: Rocket, title: "Scalability", description: "Elastic cloud scaling" }
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-sm font-medium mb-6">
            <Brain className="w-4 h-4 mr-2" />
            Powered by Advanced AI
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Revolutionary</span> Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the cutting-edge capabilities that make sakaAI the most advanced 
            business intelligence platform in the world.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <FloatingCard key={index} delay={index * 0.2} glowColor={feature.color}>
              <div className="p-8 h-full">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-6 neon-glow`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-500">
                      <div className={`w-2 h-2 rounded-full bg-${feature.color}-500 mr-3`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FloatingCard>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            More <span className="gradient-text">Powerful</span> Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every feature designed to give you the competitive edge you need
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-effect rounded-xl p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 bg-white hover:bg-white/90">
                <feature.icon className="w-8 h-8 text-blue-500 mb-4 group-hover:text-blue-600 transition-colors" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}