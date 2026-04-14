import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  Library, 
  Award, 
  Calendar, 
  Clock, 
  FileText, 
  Users, 
  MessageSquare, 
  Star,
  ArrowRight,
  PlayCircle,
  Download,
  CheckCircle2,
  Trophy,
  Globe
} from "lucide-react";
import { cn } from "../lib/utils";
import { useUnity } from "../context/UnityContext";

const StudentsPortal: React.FC = () => {
  const { isArchitectMode } = useUnity();
  const [activeCategory, setActiveCategory] = useState<"all" | "biotech" | "genomics" | "pharma">("all");

  const categories = [
    { id: "all", label: "All Courses" },
    { id: "biotech", label: "Biotechnology" },
    { id: "genomics", label: "Genomics" },
    { id: "pharma", label: "Pharmaceuticals" },
  ];

  const courses = [
    {
      title: "Advanced CRISPR Gene Editing",
      instructor: "Dr. Elena Vance",
      duration: "12 Weeks",
      students: "1.2k",
      rating: 4.9,
      image: "https://picsum.photos/seed/crispr/800/600",
      category: "genomics",
      level: "Advanced",
      progress: 65,
    },
    {
      title: "Bioprocess Engineering Fundamentals",
      instructor: "Prof. Marcus Thorne",
      duration: "8 Weeks",
      students: "850",
      rating: 4.7,
      image: "https://picsum.photos/seed/biotech/800/600",
      category: "biotech",
      level: "Intermediate",
      progress: 30,
    },
    {
      title: "Drug Discovery & Development",
      instructor: "Dr. Sarah Miller",
      duration: "10 Weeks",
      students: "2.1k",
      rating: 4.8,
      image: "https://picsum.photos/seed/pharma/800/600",
      category: "pharma",
      level: "Beginner",
      progress: 0,
    },
  ];

  const stats = [
    { label: "Active Students", value: "15,000+", icon: Users },
    { label: "Courses Available", value: "250+", icon: BookOpen },
    { label: "Partner Universities", value: "45+", icon: Globe },
    { label: "Certifications Issued", value: "8,500+", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium uppercase tracking-wider">
              <GraduationCap className="w-3 h-3" />
              Educational Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              {isArchitectMode ? 'ARCHITECT' : 'STUDENTS'} <span className="text-orange-500 italic">PORTAL</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              {isArchitectMode 
                ? "Master Builder, you are overseeing the educational evolution of the next generation of life-science leaders."
                : "Empowering the next generation of life-science leaders through world-class digital education and research opportunities."}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 group">
              Explore Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
              My Learning
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
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors group"
            >
              <stat.icon className="w-6 h-6 mb-4 text-orange-500" />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Course Explorer */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    activeCategory === cat.id
                      ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                placeholder="Search courses, topics, instructors..."
                className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all w-full md:w-80"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {courses
                .filter(course => activeCategory === "all" || course.category === activeCategory)
                .map((course, idx) => (
                  <motion.div
                    key={course.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest">
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1 text-orange-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-6 italic">with {course.instructor}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Users className="w-3 h-3" />
                          {course.students} students
                        </div>
                      </div>

                      {course.progress > 0 && (
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-gray-500">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 transition-all duration-1000" 
                              style={{ width: `${course.progress}%` }} 
                            />
                          </div>
                        </div>
                      )}

                      <button className="mt-auto w-full py-3 bg-white/5 hover:bg-orange-600 hover:text-white border border-white/10 hover:border-orange-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                        {course.progress > 0 ? "Continue Learning" : "Enroll Now"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Learning Paths & Resources */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-500/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-orange-500" />
              Career Pathways
            </h3>
            <div className="space-y-4">
              {[
                { title: "Bioinformatics Specialist", steps: "15 Courses", icon: CheckCircle2 },
                { title: "Clinical Research Associate", steps: "12 Courses", icon: CheckCircle2 },
                { title: "Pharma Compliance Officer", steps: "10 Courses", icon: CheckCircle2 },
              ].map((path, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <path.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-bold">{path.title}</div>
                      <div className="text-xs text-gray-500">{path.steps}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Library className="w-6 h-6 text-orange-500" />
              Digital Library
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Research Papers", count: "12k+", icon: FileText },
                { title: "Video Lectures", count: "500h+", icon: PlayCircle },
                { title: "Case Studies", count: "850+", icon: Search },
                { title: "E-Books", count: "2.5k+", icon: Download },
              ].map((resource, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10">
                  <resource.icon className="w-6 h-6 text-orange-500 mb-4" />
                  <div className="font-bold">{resource.title}</div>
                  <div className="text-xs text-gray-500">{resource.count} items</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPortal;
