import React from "react";
import { motion } from "motion/react";

export default function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 25 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            boxShadow: "0 0 12px #D4AF37",
          }}
        />
      ))}
      
      {/* Cyan accent particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`cyan-${i}`}
          className="absolute w-0.5 h-0.5 bg-[#00D9FF] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 18 + 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}