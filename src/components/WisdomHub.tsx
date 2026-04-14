import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Shield, Scale, Scroll, Feather, Star, Sparkles, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { EgyptianMotif } from './EgyptianMotif';

export const WisdomHub: React.FC = () => {
  const principles = [
    {
      title: "Balance (Ma'at)",
      desc: "The fundamental principle of cosmic order. Every action in the digital realm must maintain equilibrium between human intent and AI execution.",
      icon: Scale,
      color: "text-gold-400"
    },
    {
      title: "Truth (Isfet)",
      desc: "Radical transparency in data and algorithms. Misinformation is the chaos we actively counter through decentralized verification.",
      icon: Feather,
      color: "text-blue-400"
    },
    {
      title: "Justice (Justice)",
      desc: "Equitable access to life-science technology. No border, status, or identity shall limit a human's right to wellness and knowledge.",
      icon: Shield,
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-[#1a254d] to-[#0A0E1A] border border-[#D4AF37]/20 overflow-hidden shadow-2xl text-center">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <EgyptianMotif type="maat" className="w-full h-full text-[#D4AF37]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-6"
        >
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center mx-auto border border-[#D4AF37]/30 shadow-lg shadow-gold/10">
            <BookOpen className="w-10 h-10 text-[#D4AF37]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
            Wisdom <span className="text-[#D4AF37]">Hub</span>
          </h1>
          <p className="text-blue-200/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            "The Digital Constitution: Governing the Neural Nile through the lens of Ma'at."
          </p>
        </motion.div>
      </div>

      {/* Ma'at Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-[#0A0E1A] border border-white/5 hover:border-[#D4AF37]/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <EgyptianMotif type="maat" className="w-20 h-20 text-[#D4AF37]" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
              <p.icon className={cn("w-7 h-7", p.color)} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{p.title}</h3>
            <p className="text-sm text-blue-200/40 leading-relaxed font-medium">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* The Digital Constitution */}
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <Scroll className="w-96 h-96 text-white" />
        </div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Scroll className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight uppercase">The Digital Constitution</h2>
            </div>
            
            <div className="space-y-6">
              {[
                "The right to sovereign data ownership for all researchers.",
                "Mandatory ethical auditing of all AI-human collaborative projects.",
                "Open-source commitment for life-saving medical protocols.",
                "Decentralized governance through the Pentagonal Council.",
                "The Co-Accreditation mandate for all AI companions."
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-1">
                    <Star className="w-3 h-3 text-[#D4AF37]" />
                  </div>
                  <p className="text-blue-100/80 font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-black rounded-2xl hover:scale-105 transition-all shadow-lg shadow-gold/20 flex items-center gap-3">
              <Feather className="w-5 h-5" /> Sign the Constitution
            </button>
          </div>

          <div className="relative aspect-square bg-black/40 rounded-[2.5rem] border border-white/5 p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-32 h-32 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/20 flex items-center justify-center animate-pulse">
              <Shield className="w-16 h-16 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-widest">Ma'at Protocol V1.0</h3>
            <p className="text-xs text-blue-200/40 max-w-xs leading-relaxed">
              "Initiating the ethical and governing hayat protocol. The scales are balanced. The truth is indexed. The justice is distributed."
            </p>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Active</div>
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wisdom Archive */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Wisdom Archive</h2>
          <button className="text-[#D4AF37] text-xs font-black uppercase tracking-widest hover:underline">View All Records</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Pharaonic Futurism", category: "Philosophy", date: "2026-03-15" },
            { title: "Neural Nile Dynamics", category: "Technology", date: "2026-03-20" },
            { title: "The Sovereign Bridge", category: "Governance", date: "2026-04-01" },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#0A0E1A] border border-white/5 hover:border-[#D4AF37]/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{item.category}</span>
                <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{item.title}</h4>
              <div className="flex items-center gap-2 text-[10px] text-blue-200/40 font-bold uppercase tracking-widest">
                <Award className="w-3 h-3" />
                Indexed: {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
