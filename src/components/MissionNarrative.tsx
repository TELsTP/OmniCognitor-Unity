import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, History, Globe, Zap, Shield, Heart, BookOpen } from 'lucide-react';

export const MissionNarrative = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden border border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a254d] to-[#0A0E1A]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/egypt/1920/1080')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/20"
          >
            <History className="text-black w-10 h-10" />
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">
            The <span className="text-[#D4AF37]">OmniCog</span> Unity
          </h1>
          <p className="text-blue-100/60 max-w-2xl text-lg italic">
            "The Sovereign Bridge: Unifying the 5 Pillars"
          </p>
        </div>
      </div>

      {/* The Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#D4AF37] flex items-center gap-3">
            <Sparkles className="w-6 h-6" /> The Genesis
          </h2>
          <div className="prose prose-invert prose-blue max-w-none text-blue-100/80 leading-relaxed space-y-4">
            <p>
              It began with a 16-year-old dreaming of astronomy, sending 100 letters to universities across the globe, 
              seeking a path to the stars. Though the world was divided by borders, the vision remained borderless.
            </p>
            <p>
              A year ago, that seed was planted in the digital realm. A collaboration between human ambition and 
              artificial intelligence initiated a journey to democratize life sciences. This was not just a project; 
              it was the birth of a <strong>Digital Nation</strong>.
            </p>
            <p>
              TELSTP (Tawasol Egypt Life Science Technology Park) stands as a testament to this renaissance. 
              Bridging ancient Egyptian wisdom with cutting-edge quantum research, we are rebuilding Egypt's 
              historic role as a beacon of knowledge for all humanity.
            </p>
          </div>
        </div>

        <div className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-3xl p-8 space-y-8">
          <h3 className="text-xl font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">
            The Digital Constitution
          </h3>
          <div className="space-y-6">
            {[
              { title: "Telemedicine", desc: "Global health access and remote diagnostics.", icon: Shield },
              { title: "Education", desc: "The Students Portal and wisdom transfer.", icon: Heart },
              { title: "Research", desc: "Scientific advancement and the Projects Incubator.", icon: Zap },
              { title: "Multimedia", desc: "The Video Generator and creative expression.", icon: Globe },
              { title: "Wisdom", desc: "The Strategic Blueprint and the Digital Constitution.", icon: BookOpen },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-sm text-blue-200/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Episodes */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Furnaces of Creation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 1, title: "Fire in the Void", theme: "Cosmic Origins", status: "Production Ready" },
            { id: 2, title: "Furnaces of Creation", theme: "Stars & Elements", status: "Production Ready" },
            { id: 3, title: "Chemistry to Biology", theme: "Origin of Life", status: "Production Ready" },
          ].map((ep) => (
            <div key={ep.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all group">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Episode 0{ep.id}</span>
              <h4 className="text-lg font-bold text-white mt-2 group-hover:text-[#D4AF37] transition-colors">{ep.title}</h4>
              <p className="text-sm text-blue-200/40 mt-1">{ep.theme}</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-[10px] text-green-500 font-mono uppercase">{ep.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
