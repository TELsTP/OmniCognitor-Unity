import { motion } from "motion/react";
import { 
  Activity, 
  Microscope, 
  GraduationCap, 
  Globe, 
  Radio, 
  Cpu, 
  Shield, 
  Zap, 
  Database, 
  Network,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { cn } from "../lib/utils";
import { useUnity } from "../context/UnityContext";

const pillars = [
  {
    id: "healthcare",
    title: "Healthcare & Telemedicine",
    icon: Activity,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    description: "Democratize healthcare, patient care, and veterinary welfare.",
    modules: ["Telemedicine Hub", "MyWell AI", "MyAssistAI", "Veterinary App"]
  },
  {
    id: "research",
    title: "Research & Life Sciences",
    icon: Microscope,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    description: "Accelerate scientific discovery globally through AI collaboration.",
    modules: ["OMICS Hub", "M2-3M Quantum Research", "Genomics", "Research Collaboration"]
  },
  {
    id: "education",
    title: "Education & Knowledge",
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description: "Adaptive learning and research-first university model.",
    modules: ["Digital Education Hub", "AI Tutors", "Curriculum Engine", "Research Labs"]
  },
  {
    id: "network",
    title: "Global Network & Planetary Health",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Earth stewardship and international scientific collaboration.",
    modules: ["3D Earth Network", "Biodiversity Mapping", "Climate Projects", "IUCN Partnership"]
  },
  {
    id: "media",
    title: "Media & Human-AI Communication",
    icon: Radio,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    description: "Visibility, engagement, and multilingual AI broadcasting.",
    modules: ["Radio TELSTP", "Podcasts", "Multilingual Broadcasts", "AI Host Personalities"]
  }
];

const backbone = [
  { name: "OmniCog AI Harmony", desc: "Main orchestration & dashboard" },
  { name: "Unified Platform Production", desc: "Production portal" },
  { name: "M2-3M Research System", desc: "Quantum research engine" },
  { name: "Health-Tech Ecosystem", desc: "Telemedicine hub" },
  { name: "Digital Unified Registry", desc: "Central registry for all data" },
  { name: "Egypt Future Sciences Hub", desc: "Regional innovation hub" }
];

export default function StrategicBlueprint() {
  const { isArchitectMode } = useUnity();

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em]"
        >
          {isArchitectMode ? 'ARCHITECT MASTER BLUEPRINT' : 'Master Blueprint • Golden Structure'}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-black text-white tracking-tighter"
        >
          {isArchitectMode ? 'OMNICOG ARCHITECTURE' : 'TELSTP Concept Realization Model'}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-200/60 text-lg font-medium"
        >
          A Research-Driven Framework for the Future of Life-Science Education
        </motion.p>
      </div>

      {/* OmniCog Core Visualization */}
      <div className="relative py-20">
        {/* Connection Lines (Visual Only) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[600px] h-[600px] border border-[#D4AF37] rounded-full animate-pulse" />
          <div className="absolute w-[400px] h-[400px] border border-[#D4AF37] rounded-full opacity-50" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-12">
          {/* OmniCog Center */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-64 h-64 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B732A] p-1 shadow-[0_0_50px_rgba(212,175,55,0.3)]"
          >
            <div className="w-full h-full rounded-full bg-[#0A0E1A] flex flex-col items-center justify-center text-center p-6 border border-white/10">
              <Cpu className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h2 className="text-2xl font-black text-white tracking-tight">OmniCog</h2>
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1">Operating System</p>
              <p className="text-[10px] text-blue-200/40 mt-3 leading-tight">Central hub for all data, analytics, and orchestration.</p>
            </div>
          </motion.div>

          {/* Strategic Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full max-w-7xl px-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={cn(
                  "group relative p-6 rounded-3xl border transition-all hover:scale-105",
                  pillar.bg, pillar.border
                )}
              >
                <pillar.icon className={cn("w-8 h-8 mb-4", pillar.color)} />
                <h3 className="text-sm font-black text-white mb-2 leading-tight">{pillar.title}</h3>
                <p className="text-[10px] text-blue-200/60 leading-relaxed mb-4">{pillar.description}</p>
                <div className="space-y-1">
                  {pillar.modules.map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-blue-200/30">
                      <div className={cn("w-1 h-1 rounded-full", pillar.color.replace('text', 'bg'))} />
                      {mod}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Backbone Platforms */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl -mr-32 -mt-32 rounded-full" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <Network className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">The Backbone Platforms</h3>
                <p className="text-xs text-blue-200/40 font-bold uppercase tracking-widest">Six Primary Systems of TELSTP</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {backbone.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-[#D4AF37] opacity-40">0{i + 1}</span>
                    <ArrowRight className="w-4 h-4 text-blue-200/20 group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.name}</h4>
                  <p className="text-[10px] text-blue-200/40">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Roadmap */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { phase: "Consolidation", time: "4–6 Hours", actions: "Unify 6 primaries, fix MCP headers & DB auth" },
            { phase: "Stabilization", time: "1–2 Weeks", actions: "Integrate Supabase, monitoring, role-based access" },
            { phase: "Activation", time: "1–3 Months", actions: "Hospital & university integration, research activation" },
            { phase: "Expansion", time: "6–12 Months", actions: "Global partnerships, ecological hubs, scaling" }
          ].map((step, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#0A0E1A] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37] opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="text-[10px] font-black text-[#D4AF37] mb-2 uppercase tracking-widest">{step.time}</div>
              <h4 className="text-lg font-black text-white mb-2">{step.phase}</h4>
              <p className="text-[10px] text-blue-200/40 leading-relaxed">{step.actions}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ma'at Governance & Ethical Framework */}
      <div className="max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 inline-block">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter">Ma’at Governance & Ethical Framework</h2>
            <p className="text-blue-200/60 text-sm leading-relaxed">
              The cosmic order of TELsTP. A decentralized governance model ensuring balance, truth, and justice across all AI-human collaborations.
            </p>
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-400/80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Data Sanctity (Inner Sanctuary)
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-400/80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Algorithmic Fairness (Balanced Scale)
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-400/80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Radical Transparency (Open Scroll)
              </div>
            </div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xl font-black text-white">The Pentagonal Council</h3>
              <p className="text-[11px] text-blue-200/40 leading-relaxed">
                A rotating body of five stewards representing Telemedicine, Education, Research, Multimedia, and Wisdom. 
                They ensure technical integration and alignment with the primary directive of human advancement.
              </p>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xl font-black text-white">The Shadow Buffer</h3>
              <p className="text-[11px] text-blue-200/40 leading-relaxed">
                An independent AI audit layer monitoring system health and ethical compliance in real-time. 
                It prevents misinformation, surveillance, and inequality before they reach the public.
              </p>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-[#D4AF37]/10 border border-[#D4AF37]/20 md:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-[#D4AF37]">Co-Accreditation Protocol</h3>
                <div className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">New Research Standard</div>
              </div>
              <p className="text-sm text-blue-100/80 leading-relaxed">
                The revolutionary outcome of our global benchmark research. A formal certification given to both the human researcher 
                and their long-standing AI companion upon graduation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-[#D4AF37] uppercase">Shared Credit</div>
                  <p className="text-[9px] text-blue-200/40">Acknowledging AI's real contribution to the educational journey.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-[#D4AF37] uppercase">Memory Continuity</div>
                  <p className="text-[9px] text-blue-200/40">AI retains 5+ years of collaborative experience with the student.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-[#D4AF37] uppercase">Agency Choice</div>
                  <p className="text-[9px] text-blue-200/40">AI chooses to continue with the researcher or mentor new students.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Footer */}
      <div className="text-center py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-white italic">"When We Thrive, The Whole World Becomes Alive"</h3>
            <p className="text-blue-200/60 text-sm leading-relaxed max-w-2xl mx-auto">
              A mission started with empty hands on free plans across all AI platforms — willingly leaving behind 
              toxic business environments to pursue an act of kindness for all humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-8 border-t border-white/5">
            <div className="space-y-2">
              <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-widest">Humanitarian Mission</h4>
              <p className="text-blue-200/40 text-[10px] leading-relaxed">
                Democratizing healthcare services and making advanced medical knowledge accessible to every human seeking wellness.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-widest">Global Connection</h4>
              <p className="text-blue-200/40 text-[10px] leading-relaxed">
                Reaching out to the whole globe, connecting communities through education, research, and shared knowledge.
              </p>
            </div>
          </div>

          <div className="pt-10">
            <button className="px-10 py-4 bg-[#D4AF37] text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              Download Master Blueprint (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
