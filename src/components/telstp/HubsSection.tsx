import React from "react";
import { motion } from "motion/react";
import CentralBrain from "./CentralBrain";

const hubs = [
  { id: 1, name: "TELEMEDICINE", color: "#D4AF37", icon: "🏥" },
  { id: 2, name: "EDUCATION", color: "#00D9FF", icon: "📚" },
  { id: 3, name: "RESEARCH", color: "#D4AF37", icon: "🔬" },
  { id: 4, name: "MULTIMEDIA", color: "#00D9FF", icon: "📡" },
  { id: 5, name: "WISDOM", color: "#D4AF37", icon: "🧿" },
  { id: 6, name: "GLOBAL", color: "#00D9FF", icon: "🌍" },
];

export default function HubsSection() {
  return (
    <div className="relative py-24 bg-[#05070F]">
      <div className="max-w-7xl mx-auto px-6">
        <CentralBrain />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {hubs.map((hub, index) => (
            <motion.div
              key={hub.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative bg-[#0A0E1A] border border-white/10 rounded-3xl p-8 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              <div className="text-6xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                {hub.icon}
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter">
                {hub.name}
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-[#D4AF37] to-[#00D9FF] mt-4 rounded-full" />
              <p className="text-blue-200/60 text-sm mt-6">
                Live • Connected • Active
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}