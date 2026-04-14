import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building2, 
  Stethoscope, 
  FlaskConical, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  FileText,
  Bookmark,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "../lib/utils";

const RecruitmentPortal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "research" | "clinical" | "tech">("all");

  const categories = [
    { id: "all", label: "All Jobs", icon: Briefcase },
    { id: "research", label: "Research", icon: FlaskConical },
    { id: "clinical", label: "Clinical", icon: Stethoscope },
    { id: "tech", label: "Technology", icon: Cpu },
  ];

  const jobs = [
    {
      title: "Senior Genomics Researcher",
      company: "TELSTP Research Hub",
      location: "New Cairo, Egypt",
      type: "Full-time",
      salary: "Competitive",
      category: "research",
      posted: "2 days ago",
      tags: ["Genomics", "CRISPR", "PhD"],
      image: "https://picsum.photos/seed/research/800/600",
    },
    {
      title: "Clinical Trial Coordinator",
      company: "Global Pharma Solutions",
      location: "Alexandria, Egypt",
      type: "Full-time",
      salary: "Negotiable",
      category: "clinical",
      posted: "1 week ago",
      tags: ["Clinical Trials", "FDA", "Management"],
      image: "https://picsum.photos/seed/clinical/800/600",
    },
    {
      title: "AI Engineer (Life Sciences)",
      company: "OmniCognitor Systems",
      location: "Remote / Cairo",
      type: "Contract",
      salary: "High",
      category: "tech",
      posted: "3 days ago",
      tags: ["Python", "PyTorch", "Bioinformatics"],
      image: "https://picsum.photos/seed/tech/800/600",
    },
  ];

  const stats = [
    { label: "Active Jobs", value: "450+", icon: Briefcase, color: "text-blue-500" },
    { label: "Companies", value: "120+", icon: Building2, color: "text-emerald-500" },
    { label: "Applications", value: "15k+", icon: Users, color: "text-purple-500" },
    { label: "Avg. Salary", value: "85k EGP", icon: DollarSign, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
              <Users className="w-3 h-3" />
              Career Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              RECRUITMENT <span className="text-blue-500 italic">PORTAL</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Find your next career-defining role in the most advanced life-science technology park in the region.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 group">
              Post a Job
              <Zap className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
              My Applications
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                className="w-full pl-12 pr-6 py-3 bg-black/40 border border-white/5 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all"
              />
            </div>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Location (e.g., Cairo, Remote)"
                className="w-full pl-12 pr-6 py-3 bg-black/40 border border-white/5 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all"
              />
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Search Jobs
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border flex items-center gap-2",
                  activeCategory === cat.id
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-500 hover:bg-white/10"
                )}
              >
                <cat.icon className="w-3 h-3" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Job Listings */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {jobs
                .filter(job => activeCategory === "all" || job.category === activeCategory)
                .map((job, idx) => (
                  <motion.div
                    key={job.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all flex flex-col md:flex-row gap-6"
                  >
                    <div className="w-full md:w-48 aspect-video md:aspect-square rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{job.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Building2 className="w-3 h-3" />
                            {job.company}
                          </div>
                        </div>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                          <Bookmark className="w-4 h-4 text-gray-500 hover:text-blue-500" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4 mb-6">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {job.posted}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <DollarSign className="w-3 h-3" />
                          {job.salary}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                          {job.type}
                        </span>
                        <button className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors group/btn">
                          Apply Now
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-500" />
                Top Companies
              </h3>
              <div className="space-y-4">
                {[
                  { name: "TELSTP Research", jobs: 45, logo: "https://picsum.photos/seed/logo1/100/100" },
                  { name: "Global Pharma", jobs: 28, logo: "https://picsum.photos/seed/logo2/100/100" },
                  { name: "NeuroScan AI", jobs: 15, logo: "https://picsum.photos/seed/logo3/100/100" },
                ].map((co, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10">
                        <img src={co.logo} alt={co.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{co.name}</div>
                        <div className="text-xs text-gray-500">{co.jobs} open roles</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-500 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4">Career Advice</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Get expert tips on building your life-science career and acing your next interview.
              </p>
              <div className="space-y-3">
                {[
                  { title: "Resume Building", icon: FileText },
                  { title: "Interview Prep", icon: Users },
                  { title: "Skill Assessment", icon: CheckCircle2 },
                ].map((item, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{item.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-500 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-6">Job Alerts</h3>
              <p className="text-sm text-gray-500 mb-6">Get notified about new jobs matching your profile.</p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                />
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPortal;
