import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export const GalaxyMap: React.FC = () => {
  // Generate random stars
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative w-full h-full bg-[#05070F] overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/20 shadow-2xl">
      {/* Ancient Egyptian Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full grid grid-cols-12 grid-rows-12 border-collapse">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-[#D4AF37]/20" />
          ))}
        </div>
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: star.opacity }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: star.delay,
          }}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#D4AF37',
            borderRadius: '50%',
            boxShadow: '0 0 10px #D4AF37',
          }}
        />
      ))}

      {/* Constellations (Simplified Senenmut Style) */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
        <path 
          d="M20,20 L40,30 L60,20 L80,40 L70,60 L50,50 L30,70 L10,50 Z" 
          stroke="#D4AF37" 
          strokeWidth="1" 
          fill="none" 
          strokeDasharray="5 5"
        />
        <circle cx="20" cy="20" r="3" fill="#D4AF37" />
        <circle cx="40" cy="30" r="3" fill="#D4AF37" />
        <circle cx="60" cy="20" r="3" fill="#D4AF37" />
        <circle cx="80" cy="40" r="3" fill="#D4AF37" />
        <circle cx="70" cy="60" r="3" fill="#D4AF37" />
        <circle cx="50" cy="50" r="3" fill="#D4AF37" />
        <circle cx="30" cy="70" r="3" fill="#D4AF37" />
        <circle cx="10" cy="50" r="3" fill="#D4AF37" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 border-2 border-[#D4AF37]/20 rounded-full flex items-center justify-center relative"
        >
          <div className="absolute inset-0 border-t-2 border-[#D4AF37] rounded-full animate-pulse" />
          <Star className="w-12 h-12 text-[#D4AF37] animate-pulse" />
        </motion.div>
        
        <div className="mt-8">
          <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Senenmut's Astrological Map</h4>
          <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.4em] mt-2">Celestial Navigation Protocol 4.0</p>
        </div>
      </div>

      {/* Khartoush Labels */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2">
        <div className="px-4 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
          <p className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest">Orion Sector</p>
        </div>
        <div className="px-4 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
          <p className="text-[8px] font-black text-[#D4AF37] uppercase tracking-widest">Sirius Alignment</p>
        </div>
      </div>
    </div>
  );
};
