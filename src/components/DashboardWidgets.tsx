import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Globe, 
  Zap, 
  Cpu, 
  Database, 
  Network, 
  ExternalLink, 
  ArrowUpRight, 
  Newspaper,
  TrendingUp,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { LIFE_SCIENCE_PARKS } from '../data/lifeScienceParks';

// --- System Health Widget ---
export const SystemHealthWidget = () => {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    memory: 68,
    network: 124,
    latency: 18
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.max(40, Math.min(90, prev.memory + (Math.random() * 4 - 2))),
        network: Math.max(50, Math.min(500, prev.network + (Math.random() * 20 - 10))),
        latency: Math.max(5, Math.min(50, prev.latency + (Math.random() * 4 - 2)))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">System Intelligence</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-green-500 font-mono uppercase">Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-blue-200/60 uppercase font-mono">
            <span>Neural Load</span>
            <span>{Math.round(metrics.cpu)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#D4AF37]"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.cpu}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-blue-200/60 uppercase font-mono">
            <span>Synaptic Memory</span>
            <span>{Math.round(metrics.memory)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.memory}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-blue-200/60 uppercase font-mono">
            <span>Data Ingress</span>
            <span>{Math.round(metrics.network)} MB/s</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${(metrics.network / 500) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-blue-200/60 uppercase font-mono">
            <span>Response Latency</span>
            <span>{Math.round(metrics.latency)}ms</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${(metrics.latency / 50) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
          <Cpu className="w-4 h-4 text-[#D4AF37] mb-1" />
          <span className="text-[9px] text-blue-200/40 uppercase">Cores</span>
          <span className="text-xs font-mono text-white">128</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
          <Database className="w-4 h-4 text-blue-400 mb-1" />
          <span className="text-[9px] text-blue-200/40 uppercase">Storage</span>
          <span className="text-xs font-mono text-white">2.4 PB</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
          <Network className="w-4 h-4 text-purple-400 mb-1" />
          <span className="text-[9px] text-blue-200/40 uppercase">Nodes</span>
          <span className="text-xs font-mono text-white">12,402</span>
        </div>
      </div>
    </div>
  );
};

// --- Ecosystem News Widget ---
export const EcosystemNewsWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const parks = LIFE_SCIENCE_PARKS.slice(0, 8); // Just take first 8 for news

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % parks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [parks.length]);

  return (
    <div className="bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Ecosystem Intelligence</h3>
        </div>
        <TrendingUp className="w-4 h-4 text-blue-400" />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1">
                  Global Network Update
                </span>
                <h4 className="text-lg font-bold text-white leading-tight">
                  {parks[currentIndex].name}
                </h4>
                <p className="text-xs text-blue-200/60 mt-1 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {parks[currentIndex].location}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-blue-100/80 italic leading-relaxed">
                "{parks[currentIndex].strategicValue}"
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {parks[currentIndex].specialization.slice(0, 3).map((spec, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[9px] text-[#D4AF37] uppercase font-bold">
                  {spec}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1">
          {parks.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-[#D4AF37]' : 'w-1 bg-white/10'}`} 
            />
          ))}
        </div>
        <button className="text-[10px] text-blue-400 uppercase font-bold flex items-center gap-1 hover:text-white transition-colors">
          View Global Map <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// --- Quick Links Widget ---
export const QuickLinksWidget = () => {
  const projects = [
    { name: "Noura AI", desc: "Life Science Intelligence", status: "Active", color: "text-[#D4AF37]" },
    { name: "Hayah", desc: "Ecosystem Management", status: "Operational", color: "text-blue-400" },
    { name: "OmniCog", desc: "Neural Knowledge Base", status: "Syncing", color: "text-purple-400" },
    { name: "BioGrid", desc: "Global Research Network", status: "Active", color: "text-emerald-400" }
  ];

  return (
    <div className="bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Active Protocols</h3>
        </div>
        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <ExternalLink className="w-4 h-4 text-blue-200/60" />
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
            className="p-3 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${project.color}`}>
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {project.name}
                </h4>
                <p className="text-[10px] text-blue-200/40">{project.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-blue-200/40 uppercase">{project.status}</span>
              <ArrowUpRight className="w-3 h-3 text-blue-200/20 group-hover:text-[#D4AF37] transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Security Protocol</span>
        </div>
        <p className="text-[10px] text-blue-200/60 leading-relaxed">
          All AI protocols are running under Level 4 encryption. Neural sync is at 98.4% efficiency.
        </p>
      </div>
    </div>
  );
};
