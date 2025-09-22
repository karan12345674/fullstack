import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FloatingCard({
  children,
  className = "",
  glowColor = "blue",
  delay = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Glow shadow colors
  const glowColors = {
    blue: "shadow-blue-500/30",
    purple: "shadow-purple-500/30",
    pink: "shadow-pink-500/30",
    cyan: "shadow-cyan-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -10,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative transform-gpu perspective-1000 group ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-white/80 border border-black/10
          backdrop-blur-xl
          transition-all duration-500
          ${isHovered ? `shadow-2xl ${glowColors[glowColor]}` : "shadow-xl"}`
        }
      >
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Animated border effect */}
        <div
          className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-r from-transparent via-black/5 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            animate-pulse
          `}
        />
      </div>
    </motion.div>
  );
}