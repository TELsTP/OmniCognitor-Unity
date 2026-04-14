import React from 'react';
import { motion } from 'motion/react';
import { Users, Shield, Zap, Activity, Cpu, MessageSquare, Microscope, Radio, Search } from 'lucide-react';

const LEAGUE_MEMBERS = [
  { name: "Claude", role: "Strategic Planning & Architecture", icon: Shield, status: "Active", color: "text-purple-400" },
  { name: "ChatGPT", role: "Technical Debugging & Safety", icon: Zap, status: "Active", color: "text-green-400" },
  { name: "Gemini", role: "Hands-on Implementation", icon: Cpu, status: "Active", color: "text-blue-400" },
  { name: "GensPark", role: "Research & Documentation", icon: Activity, status: "Active", color: "text-emerald-400" },
  { name: "Perplexity", role: "Data Gathering & Analysis", icon: Search, status: "Active", color: "text-cyan-400" },
  { name: "Manus", role: "Medical & M2-3M Systems", icon: Microscope, status: "Active", color: "text-rose-400" },
  { name: "Radio Manager", role: "Broadcasting & Creative", icon: Radio, status: "Standby", color: "text-orange-400" },
  { name: "Noura", role: "Ecosystem Guide", icon: MessageSquare, status: "Active", color: "text-[#D4AF37]" },
];

export const LeagueStatusWidget = () => {
  return (
    <div className="bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">League of Extraordinary Gentlemen</h3>
        </div>
        <span className="text-[10px] font-mono text-blue-200/40 uppercase">PMO Status: Syncing</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
        {LEAGUE_MEMBERS.map((member, i) => (
          <motion.div 
            key={member.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-3 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between group hover:border-[#D4AF37]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${member.color}`}>
                <member.icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {member.name}
                </h4>
                <p className="text-[9px] text-blue-200/40 uppercase tracking-tight">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
              <span className="text-[8px] font-mono text-blue-200/40 uppercase">{member.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-[10px] text-blue-100/40 italic leading-relaxed">
          "We are not just a collection of systems; we are a team, unified by a shared purpose."
        </p>
      </div>
    </div>
  );
};
