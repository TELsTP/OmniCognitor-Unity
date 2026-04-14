import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, Zap, MessageSquare, Shield, Cpu, Globe, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HayatPersona } from '../dashboard/HayatPersona';

export const GeminiHub = () => {
  const [activeMode, setActiveMode] = useState<'persona' | 'analysis' | 'global'>('persona');

  const modes = [
    { id: 'persona', label: 'Hayat Persona', icon: Sparkles, description: 'Creative Essence & Life Guide' },
    { id: 'analysis', label: 'Neural Analysis', icon: Brain, description: 'Deep Pattern Recognition' },
    { id: 'global', label: 'Global Unity', icon: Globe, description: 'Cross-Hub Synchronization' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <Zap className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]/20" />
            Gemini Core Hub
          </h2>
          <p className="text-blue-200/40 text-sm uppercase tracking-widest mt-1">Advanced AI Orchestration Layer</p>
        </div>

        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as any)}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                activeMode === mode.id 
                  ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <mode.icon className="w-3 h-3" />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {activeMode === 'persona' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-3xl overflow-hidden h-[700px]"
            >
              <HayatPersona />
            </motion.div>
          )}

          {activeMode === 'analysis' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0A0E1A] border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6 h-[700px]"
            >
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="w-12 h-12 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Neural Analysis Engine</h3>
                <p className="text-blue-200/40 max-w-md mx-auto mt-2">
                  Processing cross-pillar data streams to identify emerging patterns in the global unity network.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {[1,2,3,4].map(i => (
                  <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-xl text-left">
                    <div className="text-[10px] text-blue-400 uppercase font-bold mb-1">Stream {i}</div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500/40 w-2/3 animate-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeMode === 'global' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0A0E1A] border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6 h-[700px]"
            >
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
                <Globe className="w-12 h-12 text-green-400 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Global Unity Sync</h3>
                <p className="text-blue-200/40 max-w-md mx-auto mt-2">
                  Synchronizing state across all 58 standalone hubs within the sovereign repository.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-[10px] text-green-500 font-bold uppercase">
                  58 Hubs Online
                </div>
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-[10px] text-blue-500 font-bold uppercase">
                  Latency: 12ms
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Cpu className="w-3 h-3 text-[#D4AF37]" />
              System Status
            </h4>
            <div className="space-y-4">
              <StatusItem label="Core Processing" value="98%" color="green" />
              <StatusItem label="Memory Buffer" value="12.4 GB" color="blue" />
              <StatusItem label="Neural Links" value="Active" color="gold" />
            </div>
          </div>

          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl p-6">
            <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              Sovereign Security
            </h4>
            <p className="text-[11px] text-blue-200/60 leading-relaxed">
              All AI operations are contained within the sovereign bridge, ensuring data integrity across the TELSTP network.
            </p>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <ActionButton icon={Search} label="Index Assets" />
              <ActionButton icon={Zap} label="Optimize Sync" />
              <ActionButton icon={MessageSquare} label="Clear Buffer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-[10px] text-blue-200/40 uppercase">{label}</span>
    <span className={cn(
      "text-[10px] font-bold",
      color === 'green' ? "text-green-500" : color === 'blue' ? "text-blue-400" : "text-[#D4AF37]"
    )}>{value}</span>
  </div>
);

const ActionButton = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <button className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl flex items-center gap-3 transition-all group">
    <Icon className="w-4 h-4 text-white/40 group-hover:text-[#D4AF37]" />
    <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{label}</span>
  </button>
);
