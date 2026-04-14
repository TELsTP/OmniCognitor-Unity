import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  Activity, 
  Users, 
  Calendar, 
  MessageSquare, 
  Video, 
  FileText, 
  Heart,
  Search,
  Plus,
  ArrowRight,
  Shield,
  Clock,
  Loader2
} from "lucide-react";
import { cn } from "../lib/utils";
import { supabaseService } from "../services/supabase";
import { useSupabase } from "../SupabaseProvider";
import { useUnity } from "../context/UnityContext";

const TelemedicineHub: React.FC = () => {
  const { user } = useSupabase();
  const { isArchitectMode } = useUnity();
  const [activeView, setActiveView] = useState<"overview" | "consultation" | "records">("overview");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await supabaseService.getDoctors();
        setDoctors(docs || []);
        
        if (user) {
          const apts = await supabaseService.getAppointments(user.id);
          setAppointments(apts || []);
        }
      } catch (error) {
        console.error("Error fetching telemedicine data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = [
    { label: "Active Doctors", value: doctors.length > 0 ? `${doctors.length}+` : "120+", icon: Stethoscope, color: "text-blue-500" },
    { label: "Patients Served", value: "5,000+", icon: Users, color: "text-green-500" },
    { label: "Consultations", value: "12k+", icon: Activity, color: "text-purple-500" },
    { label: "Success Rate", value: "98%", icon: Heart, color: "text-red-500" },
  ];

  const features = [
    {
      title: "Virtual Consultations",
      description: "High-definition video calls with specialized life-science medical experts.",
      icon: Video,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Health Records",
      description: "Secure, AI-indexed medical history and diagnostic reports.",
      icon: FileText,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Real-time Monitoring",
      description: "Integration with wearable devices for continuous health tracking.",
      icon: Activity,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "AI Diagnostics",
      description: "Preliminary AI-driven symptom analysis and routing.",
      icon: Shield,
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
              <Activity className="w-3 h-3" />
              Healthcare Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              TELEMEDICINE <span className="text-blue-500 italic">HUB</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Bridging the gap between life-science research and clinical practice through advanced digital health solutions.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 group">
              Book Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
              Patient Portal
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
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group"
            >
              <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Split */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Features */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", feature.color)}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* AI Diagnostic Tool Mockup */}
            <div className="p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">AI Symptom Checker</h4>
                    <p className="text-xs text-blue-400 uppercase tracking-widest">Powered by OmniCognitor</p>
                  </div>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-6">
                  <p className="text-gray-300 italic mb-4">"I've been experiencing persistent fatigue and mild joint pain for the last three days..."</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Fatigue</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Joint Pain</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all">
                  Start AI Assessment
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all" />
            </div>
          </div>

          {/* Right: Sidebar / Quick Actions */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Upcoming Appointments
              </h3>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.map((apt, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="font-medium">{apt.doctors?.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {apt.doctors?.specialization} • {new Date(apt.date).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 italic p-4 text-center">
                    No upcoming appointments found.
                  </div>
                )}
                <button className="w-full py-3 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View All Appointments
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-800 text-white">
              <h3 className="text-lg font-bold mb-2">Emergency Hub</h3>
              <p className="text-sm text-blue-100 mb-6">Immediate access to critical care specialists.</p>
              <button className="w-full py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Connect Now
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-4">Health Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Sleep Quality</span>
                  <span className="text-sm font-bold text-green-500">84%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[84%]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Activity Level</span>
                  <span className="text-sm font-bold text-blue-500">High</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[70%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineHub;
