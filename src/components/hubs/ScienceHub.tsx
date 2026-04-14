import React from 'react';
import { motion } from 'motion/react';
import { Atom, Beaker, Book, FlaskConical, Microscope, Star, Zap, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GalaxyMap } from './GalaxyMap';

const RESEARCH_PROJECTS = [
  { title: 'Quantum Consciousness Mapping', lead: 'Dr. Elena Vasquez', status: 'In Progress', impact: 'High' },
  { title: 'Neural Network Bio-Integration', lead: 'Dr. Marcus Chen', status: 'Validation', impact: 'Critical' },
  { title: 'Ancient Egyptian Medical Digitization', lead: 'Mohamed Ayoub', status: 'Active', impact: 'Legacy' },
  { title: 'NGS Genomic Archeology', lead: 'Scientific Team', status: 'Processing', impact: 'Global' },
];

export const ScienceHub: React.FC = () => {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/40 shadow-lg shadow-purple-500/20">
            <Atom className="text-purple-400 w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Science Hub</h2>
            <p className="text-purple-200/60 text-sm uppercase tracking-widest font-mono">Research • Discovery • Legacy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Research Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Microscope className="w-5 h-5 text-purple-400" />
            Active Research Feed
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESEARCH_PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0A0E1A] border border-white/5 rounded-3xl p-6 hover:border-purple-500/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                    <FlaskConical className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-[8px] font-bold uppercase px-2 py-1 bg-white/5 rounded-full text-blue-200/40">
                    {project.impact} Impact
                  </span>
                </div>
                <h4 className="font-bold text-blue-50 mb-1">{project.title}</h4>
                <p className="text-xs text-blue-200/40 mb-4">Lead: {project.lead}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">{project.status}</span>
                  </div>
                  <button className="text-[10px] text-blue-200/60 hover:text-white transition-colors flex items-center gap-1">
                    View Data <Zap className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Galaxy Map Visualization */}
          <div className="h-[500px]">
            <GalaxyMap />
          </div>
        </div>

        {/* Scientific Literature */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Book className="w-5 h-5 text-gold-400" />
            Literature Vault
          </h3>
          
          <div className="bg-[#0A0E1A] border border-gold-500/20 rounded-[2rem] p-6 space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <p className="text-xs font-bold text-gold-400 uppercase mb-1">Legacy Publication</p>
              <p className="text-sm font-bold text-blue-50">Islam and the World: Rise and Decline</p>
              <p className="text-[10px] text-blue-200/40 mt-2 italic">Exploring the historical trajectory of scientific leadership.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <p className="text-xs font-bold text-purple-400 uppercase mb-1">Technical Paper</p>
              <p className="text-sm font-bold text-blue-50">Quantum Biology Evolution Patterns</p>
              <p className="text-[10px] text-blue-200/40 mt-2 italic">Foundational research on quantum neural coherence.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <p className="text-xs font-bold text-blue-400 uppercase mb-1">Research Brief</p>
              <p className="text-sm font-bold text-blue-50">The Rosetta 4.0 Protocol</p>
              <p className="text-[10px] text-blue-200/40 mt-2 italic">A new framework for human-AI knowledge transfer.</p>
            </div>
          </div>

          <div className="p-6 bg-gold-500/10 border border-gold-500/20 rounded-[2rem] text-center">
            <Beaker className="w-8 h-8 text-gold-400 mx-auto mb-3" />
            <p className="text-xs font-bold text-gold-200 uppercase tracking-widest">Lab Access Required</p>
            <p className="text-[10px] text-gold-200/60 mt-2">Some research data is restricted to accredited TELsTP researchers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
