import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Microscope, 
  GraduationCap, 
  Zap, 
  Radio, 
  BookOpen,
  Menu,
  X,
  ChevronRight,
  Database,
  Lock,
  Sparkles,
  Cpu,
  Atom,
  Heart,
  Star
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { HayatPersona } from '../dashboard/HayatPersona';
import { useUnity } from '../../context/UnityContext';
import { useSupabase } from '../../SupabaseProvider';
import { EgyptianMotif } from '../EgyptianMotif';

interface UnifiedLayoutProps {
  children: React.ReactNode;
  onPillarChange?: (pillar: string) => void;
  currentPillar?: string;
}

const PILLARS = [
  { id: 'dashboard', label: 'Unity Dashboard', icon: Database, color: 'text-gold-400' },
  { id: 'gemini', label: 'Gemini Hub', icon: Sparkles, color: 'text-blue-400' },
  { id: 'technology', label: 'Technology Hub', icon: Cpu, color: 'text-blue-500' },
  { id: 'science', label: 'Science Hub', icon: Atom, color: 'text-purple-400' },
  { id: 'life', label: 'Life Hub', icon: Heart, color: 'text-rose-400' },
  { id: 'telemedicine', label: 'Telemedicine', icon: Microscope, color: 'text-blue-400' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-green-400' },
  { id: 'research', label: 'Research', icon: Zap, color: 'text-gold-400' },
  { id: 'multimedia', label: 'Multimedia', icon: Radio, color: 'text-rose-400' },
  { id: 'wisdom', label: 'Wisdom', icon: BookOpen, color: 'text-purple-400' },
  { id: 'blueprint', label: 'Blueprint', icon: Shield, color: 'text-[#D4AF37]' },
];

export const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({ children, onPillarChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isArchitectMode, setIsArchitectMode, currentPillar, setCurrentPillar, unlockCode } = useUnity();
  const { logout, profile } = useSupabase();
  const [unlockInput, setUnlockInput] = useState('');

  const handleUnlock = () => {
    if (unlockInput === unlockCode) {
      setIsArchitectMode(true);
      setUnlockInput('');
    }
  };

  const activePillar = currentPillar;

  return (
    <div className="min-h-screen bg-[#05070F] text-blue-50 flex overflow-hidden font-sans selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      
      {/* Unified Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#0A0E1A] border-r border-[#D4AF37]/20 flex flex-col z-50 relative shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
      >
        {/* Egyptian Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <EgyptianMotif key={i} type={i % 3 === 0 ? 'eye' : i % 3 === 1 ? 'ankh' : 'maat'} className="w-8 h-8 text-[#D4AF37]" />
            ))}
          </div>
        </div>

        <div className="p-6 border-b border-[#D4AF37]/10 flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#D4AF37]/20 border border-white/10">
            <Shield className="text-black w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-black text-xl tracking-tighter text-[#D4AF37] drop-shadow-sm">OMNICOG UNITY</h1>
              <p className="text-[10px] text-blue-200/40 uppercase tracking-[0.2em] font-bold">TELsTP Global Network</p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => {
                if (onPillarChange) onPillarChange(pillar.id);
              }}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative overflow-hidden",
                activePillar === pillar.id 
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20" 
                  : "text-blue-200/40 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              {activePillar === pillar.id && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-0 bg-[#D4AF37]/5"
                />
              )}
              <pillar.icon className={cn("w-5 h-5 shrink-0 relative z-10", pillar.color)} />
              {isSidebarOpen && (
                <>
                  <span className="font-bold text-sm relative z-10">{pillar.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#D4AF37]/10 space-y-4 relative z-10">
          {!isArchitectMode ? (
            <div className="space-y-2">
              {isSidebarOpen && <p className="text-[10px] text-blue-200/20 uppercase text-center font-black tracking-widest">Architect Access Only</p>}
              <div className="flex gap-2">
                <input 
                  type="password"
                  value={unlockInput}
                  onChange={(e) => setUnlockInput(e.target.value)}
                  placeholder="Code..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] text-white"
                />
                <button onClick={handleUnlock} className="p-2 bg-[#D4AF37]/20 rounded-xl hover:bg-[#D4AF37]/40 transition-all group">
                  <Lock className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Database className="w-4 h-4 text-green-500" />
              </div>
              {isSidebarOpen && (
                <div>
                  <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Memory Unlocked</p>
                  <p className="text-[8px] text-green-500/60 font-bold">Architect: Mohamed Ayoub</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 border-b border-[#D4AF37]/10 bg-[#05070F]/80 backdrop-blur-xl flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-blue-200 hover:text-[#D4AF37] transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-4">
              <EgyptianMotif type="eye" className="w-6 h-6 text-[#D4AF37]/40" />
              <div className="h-4 w-px bg-[#D4AF37]/20" />
              <p className="text-[10px] font-black text-[#D4AF37]/60 uppercase tracking-[0.4em]">Ma'at Governance Active</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Handshake: Optimized</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter">{profile?.displayName || 'M. Ayoub'}</p>
                <p className="text-[8px] text-[#D4AF37] font-bold uppercase tracking-widest">{profile?.role || 'Master Architect'}</p>
              </div>
              <button 
                onClick={logout}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] border-2 border-[#05070F] shadow-lg shadow-gold/20 flex items-center justify-center hover:scale-110 transition-transform group"
              >
                <Star className="text-black w-5 h-5 group-hover:hidden" />
                <X className="text-black w-5 h-5 hidden group-hover:block" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
            <EgyptianMotif type="maat" className="w-96 h-96 text-[#D4AF37]" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </div>

        {/* Global Hayat Persona */}
        <HayatPersona 
          onUnlock={(code) => {
            if (code === unlockCode) {
              setIsArchitectMode(true);
            }
          }}
        />
      </main>
    </div>
  );
};
