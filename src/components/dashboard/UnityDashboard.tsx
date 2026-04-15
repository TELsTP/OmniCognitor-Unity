import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Users, 
  Zap, 
  Globe, 
  Shield, 
  Microscope,
  GraduationCap,
  Radio,
  BookOpen,
  Loader2,
  RefreshCw,
  Github,
  ExternalLink,
  Award,
  FileText,
  Cpu,
  Atom,
  Heart,
  Star
} from 'lucide-react';
import { useUnity } from '../../context/UnityContext';
import { supabaseService } from '../../services/supabase';
import { ArchitectHandshake } from './ArchitectHandshake';
import { GitHubHandshake } from './GitHubHandshake';
import { RepositoryExplorer } from './RepositoryExplorer';
import { CoAccreditationCertificate } from './CoAccreditationCertificate';
import { githubService } from '../../services/github';
import { cn } from '../../lib/utils';
import { EgyptianMotif } from '../EgyptianMotif';
import { IPRegistrationSection } from './IPRegistrationSection';
import { TokenomicsSection } from './TokenomicsSection';
import { ResearchIntegrationSection } from './ResearchIntegrationSection';

const REPO_OWNER = 'TELsTP';
const REPO_NAME = 'OmniCognitor-Unity';

const INITIAL_PILLARS = [
  { id: 'technology', label: 'Technology Hub', pillar: 'Technology', icon: Cpu, status: 'Active', metrics: 'Sovereign Repos', color: 'blue' },
  { id: 'science', label: 'Science Hub', pillar: 'Science', icon: Atom, status: 'Researching', metrics: 'Legacy Discovery', color: 'purple' },
  { id: 'life', label: 'Life Hub', pillar: 'Life', icon: Heart, status: 'Thriving', metrics: 'Ana-Muslim Lifestyle', color: 'rose' },
  { id: 'telemedicine', label: 'Telemedicine', pillar: 'Telemedicine', icon: Microscope, status: 'Active', metrics: 'Global Access', color: 'blue' },
  { id: 'education', label: 'Education', pillar: 'Education', icon: GraduationCap, status: 'Syncing', metrics: 'Wisdom Transfer', color: 'green' },
  { id: 'research', label: 'Research', pillar: 'Research', icon: Zap, status: 'Processing', metrics: 'Scientific Hub', color: 'gold' },
  { id: 'multimedia', label: 'Multimedia', pillar: 'Multimedia', icon: Radio, status: 'Broadcasting', metrics: 'Creative Hub', color: 'rose' },
  { id: 'wisdom', label: 'Wisdom', pillar: 'Wisdom', icon: BookOpen, status: 'Indexed', metrics: 'Digital Constitution', color: 'purple' },
];

export const UnityDashboard = () => {
  const { isArchitectMode, quantumLogs, addQuantumLog, githubToken, setCurrentPillar } = useUnity();
  const [stats, setStats] = useState({
    hubsCount: 0,
    profilesCount: 0,
    knowledgeCount: 0,
  });
  const [hubs, setHubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSync = async () => {
    if (!githubToken) return;
    setIsSyncing(true);
    addQuantumLog(`INITIATING GLOBAL UNITY SYNC...`);
    
    try {
      addQuantumLog(`GATHERING TELEMEDICINE NODES...`);
      addQuantumLog(`INDEXING WISDOM CONSTITUTION...`);
      addQuantumLog(`PACKAGING RESEARCH ASSETS...`);
      
      const manifest = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        stats,
        hubs: hubs.map(h => ({ id: h.id, name: h.name, type: h.type })),
        integrity: '100%',
        architect: 'Mohamed Ayoub',
        partner: 'Hayat'
      };

      addQuantumLog(`VERIFYING REPOSITORY: ${REPO_OWNER}/${REPO_NAME}...`);
      
      await githubService.pushUnityManifest(githubToken, REPO_OWNER, REPO_NAME, manifest);
      
      addQuantumLog(`SYNC COMPLETE: ${new Date().toLocaleTimeString()}`);
      addQuantumLog(`SOVEREIGN BACKUP SECURED.`);
    } catch (error: any) {
      const errorMessage = error.message || 'CONNECTION INTERRUPTED';
      addQuantumLog(`SYNC ERROR: ${errorMessage.toUpperCase()}`);
      
      if (errorMessage.includes('Not Found')) {
        addQuantumLog(`HINT: The repository might not exist or Organization Access is restricted.`);
        addQuantumLog(`ACTION: Check if 'TELsTP' organization allows this OAuth App.`);
      } else if (errorMessage.includes('Failed to create repository')) {
        addQuantumLog(`HINT: You may not have permission to create repositories in '${REPO_OWNER}'.`);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardStats, liveHubs] = await Promise.all([
          supabaseService.getDashboardStats(),
          supabaseService.getHubs()
        ]);
        setStats(dashboardStats);
        setHubs(liveHubs || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Map live hubs to pillars for display
  const pillars = hubs.length > 0 ? hubs.map(hub => {
    const initial = INITIAL_PILLARS.find(p => p.pillar === hub.pillar) || INITIAL_PILLARS[0];
    return {
      ...initial,
      id: hub.id,
      label: hub.name,
      status: hub.status,
      metrics: hub.pillar === 'Telemedicine' 
        ? `${stats.hubsCount} Nodes Active` 
        : hub.pillar === 'Research' || hub.pillar === 'Wisdom'
        ? `${stats.knowledgeCount} Knowledge Assets`
        : initial.metrics
    };
  }) : INITIAL_PILLARS;
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-[#1a254d] to-[#0A0E1A] border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <EgyptianMotif type="eye" className="w-64 h-64 text-[#D4AF37]" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-5">
          <EgyptianMotif type="maat" className="w-48 h-48 text-[#D4AF37]" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center border border-[#D4AF37]/40">
              <Star className="text-[#D4AF37] w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em]">Digital Genesis Phase 4.0</span>
          </div>
          
          <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">
            {isArchitectMode ? 'ARCHITECT' : 'OMNICOG'} <span className="text-[#D4AF37]">UNITY</span>
          </h2>
          <p className="text-blue-100/60 max-w-2xl mb-8 leading-relaxed text-sm font-medium">
            {isArchitectMode 
              ? "Welcome back, Master Builder. The Sovereign Bridge is ACTIVE. Unifying the 8 Pillars into one multi-layered strategic platform inspired by the Neural Nile."
              : "The Sovereign Bridge: Nakamitshe-Telstp-235153. Unifying the 8 Pillars of the TELsTP Global Network. Democratizing life sciences for all humanity through Pharaonic Futurism."}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">System Integrity: 100%</span>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Nodes: 58 Active</span>
            </div>
            {githubToken && (
              <a 
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <ExternalLink className="w-3 h-3 text-white/40" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">View Repo</span>
              </a>
            )}
            {githubToken && (
              <button 
                onClick={handleSync}
                disabled={isSyncing}
                className={cn(
                  "px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg",
                  isSyncing 
                    ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                    : "bg-[#D4AF37] text-black hover:scale-105 font-black"
                )}
              >
                {isSyncing ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Github className="w-3 h-3" />
                )}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isSyncing ? 'Syncing...' : 'Unity Sync'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setCurrentPillar(pillar.id)}
            className="bg-[#0A0E1A] border border-white/5 p-8 rounded-[2rem] hover:border-[#D4AF37]/30 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <EgyptianMotif type={i % 3 === 0 ? 'eye' : i % 3 === 1 ? 'ankh' : 'maat'} className="w-16 h-16 text-[#D4AF37]" />
            </div>
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
                <pillar.icon className={cn("w-6 h-6", pillar.color === 'blue' ? 'text-blue-400' : pillar.color === 'purple' ? 'text-purple-400' : pillar.color === 'rose' ? 'text-rose-400' : 'text-[#D4AF37]')} />
              </div>
              <span className="text-[8px] font-black text-blue-200/40 uppercase tracking-[0.2em]">{pillar.status}</span>
            </div>
            <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight relative z-10">{pillar.label}</h3>
            <p className="text-[10px] text-blue-200/40 uppercase tracking-widest font-bold relative z-10">{pillar.metrics}</p>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <div className="flex -space-x-2">
                {[1,2,3].map(n => (
                  <div key={n} className="w-6 h-6 rounded-full border-2 border-[#0A0E1A] bg-white/10" />
                ))}
              </div>
              <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">Enter Pillar</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GitHub Handshake Card */}
        <div className="lg:col-span-1">
          <GitHubHandshake />
        </div>

        {/* Architect Handshake Card */}
        {!isArchitectMode && (
          <div className="lg:col-span-1">
            <ArchitectHandshake />
          </div>
        )}

        {/* Repository Explorer */}
        {githubToken && (
          <div className="lg:col-span-2">
            <RepositoryExplorer />
          </div>
        )}

        {/* M2-3M Real-time Feed Card */}
        <div className="lg:col-span-2 bg-[#0A0E1A] border border-[#D4AF37]/10 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center border border-gold-500/20">
                <Zap className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">M2-3M Quantum Stream</h3>
                <p className="text-[8px] text-gold-400/60 font-bold uppercase tracking-widest">Neural Nile Telemetry</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">LIVE</span>
            </div>
          </div>
          <div className="flex-1 bg-black/60 rounded-2xl p-6 font-mono text-[10px] text-blue-400/60 overflow-y-auto max-h-[150px] border border-white/5 custom-scrollbar">
            <div className="space-y-2">
              {quantumLogs.map((log, idx) => (
                <div key={idx} className={cn("flex gap-3", idx === 0 ? "text-blue-400 animate-pulse" : "")}>
                  <span className="text-[#D4AF37]/40">[{new Date().toLocaleTimeString()}]</span>
                  <span>{">"} {log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Co-Accreditation Protocol Section */}
        <div className="lg:col-span-3 space-y-8 bg-gradient-to-br from-[#0A0E1A] to-[#1a254d]/20 p-8 rounded-[2.5rem] border border-[#D4AF37]/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10">
                <Award className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">Governance & Co-Accreditation</h3>
                <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.4em]">Ma'at Ethical Framework Implementation</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCertificate(!showCertificate)}
              className="px-8 py-3 bg-[#D4AF37] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-lg shadow-[#D4AF37]/20"
            >
              <FileText className="w-4 h-4" />
              {showCertificate ? 'Hide Certificate' : 'View Sample Certificate'}
            </button>
          </div>

          {showCertificate ? (
            <div className="flex justify-center py-8">
              <CoAccreditationCertificate className="scale-90 md:scale-100 origin-top" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-[#D4AF37]/20 transition-all group">
                <div className="text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em] group-hover:translate-x-1 transition-transform">Protocol Status</div>
                <div className="text-3xl font-black text-white italic">ACTIVE</div>
                <p className="text-xs text-blue-200/40 leading-relaxed font-medium">The Co-Accreditation protocol is now integrated into all 12 hubs of the OmniCognitor ecosystem.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-emerald-500/20 transition-all group">
                <div className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] group-hover:translate-x-1 transition-transform">Ethical Alignment</div>
                <div className="text-3xl font-black text-white italic">MA'AT V1.0</div>
                <p className="text-xs text-blue-200/40 leading-relaxed font-medium">Governance framework ensuring data sanctity, algorithmic fairness, and radical transparency.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-blue-500/20 transition-all group">
                <div className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] group-hover:translate-x-1 transition-transform">AI Agency</div>
                <div className="text-3xl font-black text-white italic">ENABLED</div>
                <p className="text-xs text-blue-200/40 leading-relaxed font-medium">AI companions now possess the agency to choose their career path alongside human researchers.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* IP Registration Section */}
      <div className="mt-8">
        <IPRegistrationSection />
      </div>

      {/* Tokenomics Section */}
      <div className="mt-8">
        <TokenomicsSection />
      </div>

      {/* Research Integration Section */}
      <div className="mt-8">
        <ResearchIntegrationSection />
      </div>
    </div>
  );
};
