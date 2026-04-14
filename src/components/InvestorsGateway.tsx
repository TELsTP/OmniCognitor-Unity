import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Briefcase, 
  ShieldCheck, 
  Globe, 
  ArrowUpRight, 
  FileText, 
  Building2, 
  Users, 
  Zap,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";

const InvestorsGateway: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "biotech" | "medtech" | "digital">("all");

  const opportunities = [
    {
      title: "Next-Gen Gene Therapy",
      company: "BioNova Therapeutics",
      fundingGoal: "$15M",
      raised: "$8.5M",
      sector: "biotech",
      roi: "22%",
      risk: "Medium",
      image: "https://picsum.photos/seed/gene/800/600",
      description: "Developing breakthrough CRISPR-based treatments for rare genetic disorders.",
    },
    {
      title: "AI Diagnostic Platform",
      company: "NeuroScan AI",
      fundingGoal: "$5M",
      raised: "$4.2M",
      sector: "digital",
      roi: "35%",
      risk: "Low",
      image: "https://picsum.photos/seed/neuro/800/600",
      description: "Real-time neurological diagnostic tools powered by advanced computer vision.",
    },
    {
      title: "Smart Surgical Robotics",
      company: "PrecisionMed Robotics",
      fundingGoal: "$25M",
      raised: "$12M",
      sector: "medtech",
      roi: "18%",
      risk: "High",
      image: "https://picsum.photos/seed/robot/800/600",
      description: "Autonomous surgical assistance systems for minimally invasive procedures.",
    },
  ];

  const stats = [
    { label: "Total Investments", value: "8B EGP", icon: DollarSign, color: "text-emerald-500" },
    { label: "Active Projects", value: "150+", icon: Briefcase, color: "text-blue-500" },
    { label: "Avg. ROI", value: "18.5%", icon: TrendingUp, color: "text-purple-500" },
    { label: "Global Partners", value: "85+", icon: Globe, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Secure Investment Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              INVESTORS <span className="text-emerald-500 italic">GATEWAY</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Access high-impact investment opportunities in the heart of Egypt's life-science technology revolution.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 group">
              View Opportunities
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
              Portfolio Dashboard
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors group"
            >
              <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Split */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Opportunities */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" />
                Featured Opportunities
              </h2>
              <div className="flex gap-2">
                {["all", "biotech", "medtech", "digital"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as any)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                      activeFilter === filter
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-500 hover:bg-white/10"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {opportunities
                  .filter(opp => activeFilter === "all" || opp.sector === activeFilter)
                  .map((opp, idx) => (
                    <motion.div
                      key={opp.title}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={opp.image}
                          alt={opp.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest">
                            {opp.sector}
                          </span>
                          <div className="flex items-center gap-1 text-emerald-400">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs font-bold">{opp.roi} ROI</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">{opp.title}</h3>
                        <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">{opp.company}</p>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2">
                          {opp.description}
                        </p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Funding Progress</span>
                            <span className="text-emerald-500 font-bold">{opp.raised} / {opp.fundingGoal}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 transition-all duration-1000" 
                              style={{ width: `${(parseFloat(opp.raised.slice(1)) / parseFloat(opp.fundingGoal.slice(1))) * 100}%` }} 
                            />
                          </div>
                        </div>

                        <button className="mt-auto w-full py-3 bg-white/5 hover:bg-emerald-600 hover:text-white border border-white/10 hover:border-emerald-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                          Invest Now
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                Market Insights
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Biotech Growth", change: "+12.4%", trend: "up" },
                  { label: "MedTech Index", change: "+8.2%", trend: "up" },
                  { label: "Digital Health", change: "-2.1%", trend: "down" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className={cn(
                      "text-sm font-bold",
                      item.trend === "up" ? "text-emerald-500" : "text-red-500"
                    )}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-transparent border border-emerald-500/20">
              <h3 className="text-lg font-bold mb-4">Investor Resources</h3>
              <div className="space-y-3">
                {[
                  { title: "2026 Market Report", icon: FileText },
                  { title: "Investment Guide", icon: Download },
                  { title: "Legal Framework", icon: ShieldCheck },
                ].map((res, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <res.icon className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm">{res.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-emerald-500 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {[
                  { date: "APR 12", event: "Biotech Demo Day" },
                  { date: "MAY 05", event: "Investor Summit 2026" },
                ].map((ev, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">{ev.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold text-emerald-400 leading-none">{ev.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-sm font-bold">{ev.event}</div>
                      <div className="text-xs text-gray-500">Virtual Event</div>
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

export default InvestorsGateway;
