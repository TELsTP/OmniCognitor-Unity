import React, { useState } from 'react';
import { IPRegistrationForm } from '../blockchain/IPRegistrationForm';
import { IPRegistryDashboard } from '../blockchain/IPRegistryDashboard';
import { FileText, Database, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const IPRegistrationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'dashboard'>('register');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">Intellectual Property Registry</h3>
          <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.4em]">Polygon Blockchain Integration</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('register')}
          className={cn(
            "px-6 py-3 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'register'
              ? "bg-[#D4AF37] text-black shadow-lg"
              : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
          )}
        >
          <FileText className="w-4 h-4" />
          Register New IP
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={cn(
            "px-6 py-3 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
            activeTab === 'dashboard'
              ? "bg-[#D4AF37] text-black shadow-lg"
              : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
          )}
        >
          <Database className="w-4 h-4" />
          IP Registry Dashboard
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-[#0A0E1A] border border-[#D4AF37]/10 rounded-2xl p-6">
        {activeTab === 'register' ? (
          <IPRegistrationForm />
        ) : (
          <IPRegistryDashboard />
        )}
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          icon={<FileText className="w-6 h-6 text-blue-400" />}
          title="Blockchain Security"
          description="All IP registrations are stored immutably on Polygon blockchain for eternal proof of ownership."
        />
        <InfoCard
          icon={<Database className="w-6 h-6 text-emerald-400" />}
          title="OmniCog Indexing"
          description="Registrations are indexed in Supabase for fast querying while maintaining blockchain integrity."
        />
        <InfoCard
          icon={<ChevronRight className="w-6 h-6 text-[#D4AF37]" />}
          title="Global Verification"
          description="Anyone can verify IP ownership through Polygonscan or our verification API."
        />
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-[#D4AF37]/20 transition-all">
    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
      {icon}
    </div>
    <div className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">{title}</div>
    <p className="text-xs text-blue-200/60 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);