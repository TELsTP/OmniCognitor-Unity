import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  Users, 
  Target, 
  Cpu, 
  FlaskConical, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Globe, 
  MessageSquare, 
  Star,
  Plus,
  Search,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";

const ProjectsIncubator: React.FC = () => {
  const [activePhase, setActivePhase] = useState<"ideation" | "incubation" | "acceleration">("incubation");

  const phases = [
    { id: "ideation", label: "Ideation Phase", icon: Lightbulb, color: "text-yellow-500" },
    { id: "incubation", label: "Incubation Phase", icon: FlaskConical, color: "text-blue-500" },
    { id: "acceleration", label: "Acceleration Phase", icon: Rocket, color: "text-purple-500" },
  ];

  const startups = [
    {
      name: "GenoFlow",
      description: "Real-time genomic sequencing for personalized medicine.",
      phase: "incubation",
      progress: 75,
      mentors: 3,
      funding: "$250k",
      image: "https://picsum.photos/seed/geno/800/600",
      tags: ["Genomics", "AI"],
    },
    {
      name: "BioPrint Pro",
      description: "3D bioprinting of vascularized tissue constructs.",
      phase: "incubation",
      progress: 45,
      mentors: 5,
      funding: "$500k",
      image: "https://picsum.photos/seed/print/800/600",
      tags: ["Biotech", "Hardware"],
    },
    {
      name: "NeuroLink AI",
      description: "Brain-computer interfaces for neurological rehabilitation.",
      phase: "acceleration",
      progress: 90,
      mentors: 8,
      funding: "$2.5M",
      image: "https://picsum.photos/seed/neuro/800/600",
      tags: ["Neurotech", "AI"],
    },
  ];

  const benefits = [
    { title: "Expert Mentorship", icon: Users, description: "Access to world-class life-science experts and business leaders." },
    { title: "State-of-the-art Labs", icon: FlaskConical, description: "Fully equipped BSL-2 and BSL-3 laboratories for research." },
    { title: "Funding Access", icon: TrendingUp, description: "Direct connections to venture capital and angel investors." },
    { title: "Market Entry", icon: Globe, description: "Strategic support for national and international market scaling." },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium uppercase tracking-wider">
              <Rocket className="w-3 h-3" />
              Innovation & Growth
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              PROJECTS <span className="text-purple-500 italic">INCUBATOR</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Nurturing the next generation of life-science startups from initial concept to global market leadership.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 group">
              Apply Now
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
              Mentor Portal
            </button>
          </div>
        </div>

        {/* Phase Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id as any)}
              className={cn(
                "p-8 rounded-3xl border transition-all text-left group relative overflow-hidden",
                activePhase === phase.id
                  ? "bg-purple-600/10 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                activePhase === phase.id ? "bg-purple-500 text-white" : "bg-white/5 text-gray-400"
              )}>
                <phase.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{phase.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {phase.id === "ideation" && "Validating concepts and building the core founding team."}
                {phase.id === "incubation" && "Developing MVP and conducting initial laboratory validation."}
                {phase.id === "acceleration" && "Scaling operations and securing Series A/B funding."}
              </p>
              {activePhase === phase.id && (
                <motion.div
                  layoutId="activePhaseIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Main Content Split */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Active Startups */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Active Startups
              </h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {startups
                  .filter(s => s.phase === activePhase)
                  .map((startup, idx) => (
                    <motion.div
                      key={startup.name}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={startup.image}
                          alt={startup.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                          {startup.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest border border-purple-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{startup.name}</h3>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2">
                          {startup.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users className="w-3 h-3" />
                            {startup.mentors} Mentors
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <TrendingUp className="w-3 h-3" />
                            {startup.funding} Raised
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-gray-500">
                            <span>Phase Progress</span>
                            <span>{startup.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 transition-all duration-1000" 
                              style={{ width: `${startup.progress}%` }} 
                            />
                          </div>
                        </div>

                        <button className="mt-auto w-full py-3 bg-white/5 hover:bg-purple-600 hover:text-white border border-white/10 hover:border-purple-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20">
              <h3 className="text-xl font-bold mb-6">Incubator Benefits</h3>
              <div className="space-y-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-1">{benefit.title}</div>
                      <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Application Timeline
              </h3>
              <div className="space-y-6 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
                {[
                  { step: "Application Open", date: "MAR 01 - APR 15", status: "active" },
                  { step: "Selection Process", date: "APR 16 - MAY 15", status: "pending" },
                  { step: "Cohort Start", date: "JUN 01", status: "pending" },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center bg-black z-10",
                      step.status === "active" ? "border-purple-500" : "border-white/10"
                    )}>
                      {step.status === "active" && <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
                    </div>
                    <div>
                      <div className={cn(
                        "text-sm font-bold",
                        step.status === "active" ? "text-white" : "text-gray-500"
                      )}>{step.step}</div>
                      <div className="text-xs text-gray-600">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsIncubator;
