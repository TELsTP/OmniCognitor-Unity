import React from "react";
import { motion } from "motion/react";

export default function CentralBrain() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#05070F]">
      {/* Particle Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#D4AF37_0%,transparent_70%)] opacity-10" />

      {/* Central OmniCog Brain */}
      <motion.div
        className="relative z-10 w-96 h-96 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute w-[380px] h-[380px] border border-[#D4AF37]/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />

        {/* Main Brain SVG */}
        <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="brainGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
          </defs>
          
          {/* Brain shape */}
          <motion.path
            d="M160 40 Q100 80 80 140 Q70 200 100 240 Q130 280 160 280 Q190 280 220 240 Q250 200 240 140 Q220 80 160 40Z"
            fill="url(#brainGlow)"
            fillOpacity="0.15"
            stroke="#D4AF37"
            strokeWidth="12"
            strokeOpacity="0.9"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Neural pathways */}
          <motion.circle
            cx="120" cy="110" r="8"
            fill="#00D9FF"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="200" cy="130" r="8"
            fill="#D4AF37"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </svg>

        {/* Pulsing core */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-br from-[#D4AF37] to-[#00D9FF] rounded-full blur-3xl opacity-30"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Title */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#00D9FF] to-[#D4AF37]">
          OMNICOGNITOR
        </h1>
        <p className="text-[#D4AF37]/70 text-sm tracking-[4px] mt-2">THE LIVING BLUEPRINT</p>
      </motion.div>
    </div>
  );
}