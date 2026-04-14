import React from 'react';
import { motion } from 'motion/react';
import { Cpu, GitBranch, Terminal, Globe, Shield, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

const REPOS = [
  { name: 'telstp-omnicog-core', description: 'The central orchestration engine for the global network.', status: 'synced' },
  { name: 'telstp-telemed-hub', description: 'Advanced telemedicine and remote diagnostic interface.', status: 'active' },
  { name: 'telstp-quantum-m2-3m', description: 'Quantum-biological integration and research engine.', status: 'processing' },
  { name: 'telstp-wisdom-vault', description: 'Ancient knowledge digitization and ethical framework.', status: 'synced' },
];

export const TechnologyHub: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/40">
            <Cpu className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Technology Hub</h2>
            <p className="text-blue-200/60 text-sm uppercase tracking-widest">Sovereign Repository & Open-Source Integration</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Repository Control Center */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0A0E1A] border border-blue-500/20 rounded-[2rem] p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <GitBranch className="w-32 h-32 text-blue-400" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-blue-400" />
            Repository Sync
          </h3>

          <div className="space-y-4 relative z-10">
            {REPOS.map((repo, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group/item hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Zap className={cn("w-5 h-5", repo.status === 'processing' ? "text-gold-400 animate-pulse" : "text-blue-400")} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-blue-50">{repo.name}</p>
                    <p className="text-[10px] text-blue-200/40 uppercase tracking-wider">{repo.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[8px] font-bold uppercase px-2 py-1 rounded-full border",
                    repo.status === 'synced' ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                    repo.status === 'active' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-gold-500/10 text-gold-500 border-gold-500/20"
                  )}>
                    {repo.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3">
            <GitBranch className="w-4 h-4" />
            Clone Open-Source Assets
          </button>
        </motion.div>

        {/* Infrastructure Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0A0E1A] border border-gold-500/20 rounded-[2rem] p-8 relative overflow-hidden"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Globe className="w-5 h-5 text-gold-400" />
            Global Infrastructure
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-2xl font-black text-white">58</p>
              <p className="text-[10px] text-blue-200/40 uppercase tracking-widest mt-1">Deployments</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-2xl font-black text-white">101</p>
              <p className="text-[10px] text-blue-200/40 uppercase tracking-widest mt-1">Repositories</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-2xl font-black text-white">138</p>
              <p className="text-[10px] text-blue-200/40 uppercase tracking-widest mt-1">DB Tables</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-2xl font-black text-white">47.3TB</p>
              <p className="text-[10px] text-blue-200/40 uppercase tracking-widest mt-1">Active Data</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gold-500/5 border border-gold-500/10 rounded-2xl flex items-center gap-4">
            <Shield className="w-8 h-8 text-gold-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gold-200 uppercase">Sovereign Security Active</p>
              <p className="text-[10px] text-gold-200/40">All repositories are protected by Ma'at Governance protocols.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
