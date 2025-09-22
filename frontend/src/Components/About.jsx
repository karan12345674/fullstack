import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Users, 
  Globe, 
  Target,
  Heart,
  Lightbulb,
  Shield,
  Rocket
} from "lucide-react";
import FloatingCard from "../Components/3d/FloatingCard";


export default function About() {
  const team = [
    {
      name: "Sagar Parate",
      role: " ",
      bio: "Final-year DS student with a strong passion for AI and building smart solutions.",
      avatar: "SP",
      color: "blue"
    },
    {
      name: "Karan Barapatre",
      role: "", 
      bio: "Third-year AIML student, focused on AI, machine learning, and intelligent automation.",
      avatar: "KB",
      color: "purple"
    },
    {
      name: "Vishesh Barapatre",
      role: "",
      bio: "3rd-year B.Tech student in Artificial Intelligence & Data Science (AIDS), passionate about AI research and innovative projects",
      avatar: "VB",
      color: "pink"
    }
    
  ];
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We push the boundaries of AI and data analytics to help businesses grow smarter and faster."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: " data security Youris our top priority, built into everything we Your data is safe with us. Built-in security."
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "We succeed when you succeed. Our AI tools and support are designed to help startups and businesses achieve real results."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Building Building scalable solutions for businesses everywhere. From local startups to global teams."
    }
  ];

 const stats = [
    { number: "2025", label: "Founded" },
    { number: "Why Us", label: "Businesses waste hours replying manually" },
    { number: "Solution", label: "AI agents that reply instantly, generate leads & save time" },
    { number: "Goal", label: "Empower 10,000+ startups with automation by 2030" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Built by Visionaries
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Pioneering</span> the Future
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a team of innovators, researchers, and engineers on a mission to democratize 
            advanced AI and make powerful business intelligence accessible to everyone.
          </p>
        </motion.div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-gray-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl p-8 lg:p-12 mb-16 bg-white"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-xl leading-relaxed text-gray-600 mb-6">
               Bring the power of AI to every business—big or small.
Enable smarter, faster, and easier decisions with cutting-edge technology.
We believe AI should empower everyone, helping businesses grow, innovate, and stay ahead.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Vision 2030</h3>
                  <p className="text-gray-500">
                    AI-powered insights for every business decision
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl" />
              <div className="relative glass-effect rounded-2xl p-8 bg-white/50">
                <Award className="w-16 h-16 text-blue-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Industry Recognition
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 🚀 Early-stage AI Startup – Building solutions for businesses of all sizes</li>
                  <li>• 💡 Featured in local startup/tech blogs</li>
                  <li>• Gartner Cool Vendor in AI</li>
                  <li>• 🎓 Mentored/accelerated by startup incubators or programs</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do and every decision we make
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-effect rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-500/20 bg-white hover:bg-white/90">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            World-class talent from leading tech companies, united by a shared vision 
            of transforming business intelligence through AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <FloatingCard key={index} delay={index * 0.1} glowColor={member.color}>
              <div className="p-8 text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${member.color}-500 to-${member.color}-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white neon-glow`}>
                  {member.avatar}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="leading-relaxed text-gray-600">
                  {member.bio}
                </p>
              </div>
            </FloatingCard>
          ))}
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto bg-white">
            <Rocket className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to <span className="gradient-text">Join Us</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent to help us build the future of AI. 
              If you're passionate about cutting-edge technology and want to make a global impact, 
              we'd love to hear from you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              View Open Positions
              <Rocket className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}