import React from 'react';
import { TokenomicsDashboard } from '../defi/TokenomicsDashboard';
import { BarChart2, DollarSign, Users, PieChart } from 'lucide-react';

export const TokenomicsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
          <BarChart2 className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">TELsTP Tokenomics Hub</h3>
          <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.4em]">Research DeFi Ecosystem</p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <FeatureCard
          icon={<DollarSign className="w-6 h-6 text-gold-400" />}
          title="Token Economics"
          description="Comprehensive tokenomics dashboard with real-time data from Polygon blockchain."
        />
        <FeatureCard
          icon={<Users className="w-6 h-6 text-blue-400" />}
          title="Staking Rewards"
          description="Earn rewards by staking TELSTP tokens to support research initiatives."
        />
        <FeatureCard
          icon={<PieChart className="w-6 h-6 text-purple-400" />}
          title="Governance"
          description="Participate in DAO governance to shape the future of TELsTP research."
        />
      </div>

      {/* Tokenomics Dashboard */}
      <div className="bg-[#0A0E1A] border border-[#D4AF37]/10 rounded-2xl p-6">
        <TokenomicsDashboard />
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          title="Decentralized Research Funding"
          description="The TELSTP tokenomics system enables decentralized funding for global research initiatives, ensuring transparency and community governance."
          points={[
            "2% transaction tax supports ecosystem growth",
            "Staking rewards incentivize long-term participation",
            "DAO governance ensures community-driven decisions"
          ]}
        />
        <InfoCard
          title="Polygon Blockchain Integration"
          description="Built on Polygon for fast, low-cost transactions while maintaining Ethereum security and compatibility."
          points={[
            "Near-instant transaction finality",
            "Fractional gas costs compared to Ethereum",
            "Full EVM compatibility for developer flexibility"
          ]}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
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

const InfoCard = ({ title, description, points }: {
  title: string;
  description: string;
  points: string[];
}) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
    <div>
      <div className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em] mb-2">{title}</div>
      <p className="text-xs text-blue-200/60 leading-relaxed font-medium">
        {description}
      </p>
    </div>
    <div className="space-y-2">
      {points.map((point, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
          <span className="text-[11px] text-blue-200/40">{point}</span>
        </div>
      ))}
    </div>
  </div>
);