import React from "react";
import { motion } from "motion/react";
import { 
  Stethoscope, 
  GraduationCap, 
  DollarSign, 
  Rocket, 
  Users, 
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Activity
} from "lucide-react";
import { cn } from "../lib/utils";

interface PortalCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  onClick: () => void;
  tag: string;
}

const PortalCard: React.FC<PortalCardProps> = ({ title, description, icon: Icon, color, onClick, tag }) => (
  <motion.button
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 text-left hover:border-white/20 transition-all overflow-hidden"
  >
    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", color)}>
      <Icon className="w-7 h-7" />
    </div>
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
      {tag}
    </div>
    <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
      {description}
    </p>
    <div className="flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
      Enter Portal
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
    
    {/* Decorative Background Element */}
    <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 group-hover:opacity-20 transition-opacity", color.split(' ')[0])} />
  </motion.button>
);

interface PortalsGridProps {
  onSelectPortal: (portalId: string) => void;
}

const PortalsGrid: React.FC<PortalsGridProps> = ({ onSelectPortal }) => {
  const portals = [
    {
      id: "telemedicine",
      title: "Telemedicine Hub",
      description: "Virtual consultations and AI-driven clinical diagnostics for life-science healthcare.",
      icon: Stethoscope,
      color: "bg-blue-500 text-white shadow-lg shadow-blue-500/20",
      tag: "Specialized Portal",
    },
    {
      id: "students",
      title: "Students Portal",
      description: "Global educational platform for next-gen life-science leaders and researchers.",
      icon: GraduationCap,
      color: "bg-orange-500 text-white shadow-lg shadow-orange-500/20",
      tag: "Educational Portal",
    },
    {
      id: "investors",
      title: "Investors Gateway",
      description: "Secure gateway for high-impact investments in life-science technology projects.",
      icon: DollarSign,
      color: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
      tag: "Business Portal",
    },
    {
      id: "incubator",
      title: "Projects Incubator",
      description: "Nurturing life-science startups from ideation to global market acceleration.",
      icon: Rocket,
      color: "bg-purple-500 text-white shadow-lg shadow-purple-500/20",
      tag: "Growth Portal",
    },
    {
      id: "recruitment",
      title: "Recruitment Portal",
      description: "Connecting top talent with leading life-science organizations and research hubs.",
      icon: Users,
      color: "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20",
      tag: "Talent Portal",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium uppercase tracking-wider">
            <Globe className="w-3 h-3" />
            Ecosystem Portals
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            CORE <span className="text-white/40 italic">ECOSYSTEM</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Access specialized portals designed to facilitate collaboration, education, and investment across the TELSTP network.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal, idx) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <PortalCard
                {...portal}
                onClick={() => onSelectPortal(portal.id)}
              />
            </motion.div>
          ))}
          
          {/* Coming Soon Card */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 opacity-50 grayscale">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
              <Zap className="w-7 h-7 text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-500">More Portals</h3>
              <p className="text-xs text-gray-600 uppercase tracking-widest mt-1">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-12 rounded-[40px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-orange-600/20 border border-white/10 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight">Need a Custom Portal?</h2>
              <p className="text-gray-400 max-w-md">
                We design and deploy specialized digital hubs for our strategic partners and research institutions.
              </p>
            </div>
            <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
              Contact Ecosystem Team
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/5 opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default PortalsGrid;
