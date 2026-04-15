import React, { useState, useEffect } from 'react';
import { defiService } from '../../services/defi';
import { useUnity } from '../../context/UnityContext';
import { Wallet, BarChart2, PieChart, TrendingUp, DollarSign, Users, BookOpen, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

export const TokenomicsDashboard: React.FC = () => {
  const { addQuantumLog } = useUnity();
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenomicsData, setTokenomicsData] = useState<any>(null);
  const [stakingPosition, setStakingPosition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'staking' | 'governance'>('overview');

  useEffect(() => {
    if (walletAddress) {
      fetchData();
    }
  }, [walletAddress]);

  const fetchData = async () => {
    setLoading(true);
    try {
      addQuantumLog('FETCHING TOKENOMICS DATA FROM POLYGON NETWORK...');
      
      const [tokenomics, staking] = await Promise.all([
        defiService.getTokenomicsData(),
        walletAddress ? defiService.getStakingPosition(walletAddress) : null
      ]);
      
      setTokenomicsData(tokenomics);
      setStakingPosition(staking);
      
      addQuantumLog(`TOKENOMICS UPDATE: ${tokenomics.totalSupply} TELSTP Total Supply`);
      addQuantumLog(`STAKING POOL: ${tokenomics.stakedAmount} TELSTP Staked`);
      
    } catch (error) {
      console.error('Failed to fetch tokenomics data:', error);
      addQuantumLog(`TOKENOMICS FETCH ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await defiService.connectWallet();
      setWalletAddress(address);
      addQuantumLog(`WALLET CONNECTED: ${address.substring(0, 6)}...${address.substring(38)}`);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      addQuantumLog(`WALLET CONNECTION FAILED: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">TELsTP Tokenomics Dashboard</h3>
              <p className="text-[10px] text-blue-200/40 uppercase">Polygon Network • DeFi Ecosystem</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="text-[10px] font-bold text-purple-500 uppercase">Research DeFi</span>
            </div>
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-[10px] font-bold text-blue-500 uppercase">Polygon Network</span>
            </div>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Connected Wallet</div>
              <div className="text-xs text-blue-400 font-mono mt-1">
                {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : 'Not connected'}
              </div>
            </div>
          </div>
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting || !!walletAddress}
            className={cn(
              "px-4 py-2 rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all",
              walletAddress
                ? "bg-green-500/20 text-green-500 border border-green-500/30 cursor-default"
                : "bg-[#D4AF37] text-black hover:scale-105"
            )}
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Connecting...
              </>
            ) : walletAddress ? (
              <>
                <Wallet className="w-3 h-3" />
                Connected
              </>
            ) : (
              <>
                <Wallet className="w-3 h-3" />
                Connect Wallet
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-2 bg-black/40 border-b border-white/5">
        <button
          onClick={() => setActiveTab('overview')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'overview'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('staking')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'staking'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          Staking
        </button>
        <button
          onClick={() => setActiveTab('governance')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'governance'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          Governance
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 min-h-[400px]">
        {loading && !tokenomicsData ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-3 opacity-40">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm uppercase font-bold tracking-widest">Loading Tokenomics Data</span>
          </div>
        ) : activeTab === 'overview' ? (
          <OverviewTab 
            tokenomicsData={tokenomicsData} 
            walletAddress={walletAddress}
            onRefresh={fetchData}
          />
        ) : activeTab === 'staking' ? (
          <StakingTab 
            stakingPosition={stakingPosition}
            walletAddress={walletAddress}
            tokenomicsData={tokenomicsData}
            onRefresh={fetchData}
          />
        ) : (
          <GovernanceTab 
            tokenomicsData={tokenomicsData}
            walletAddress={walletAddress}
          />
        )}
      </div>
    </div>
  );
};

const OverviewTab = ({ tokenomicsData, walletAddress, onRefresh }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tokenomics Overview</h4>
      <button
        onClick={onRefresh}
        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
      >
        <RefreshCw className="w-4 h-4 text-white/40" />
      </button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        icon={<PieChart className="w-6 h-6 text-blue-400" />}
        label="Total Supply"
        value={`${parseFloat(tokenomicsData.totalSupply).toLocaleString()} TELSTP`}
        subtitle={`$${tokenomicsData.marketCap}M Market Cap`}
      />
      <MetricCard
        icon={<Users className="w-6 h-6 text-emerald-400" />}
        label="Circulating Supply"
        value={`${parseFloat(tokenomicsData.circulatingSupply).toLocaleString()} TELSTP`}
        subtitle={`${((parseFloat(tokenomicsData.circulatingSupply) / parseFloat(tokenomicsData.totalSupply)) * 100).toFixed(1)}% of total`}
      />
      <MetricCard
        icon={<DollarSign className="w-6 h-6 text-gold-400" />}
        label="Token Price"
        value={`$${tokenomicsData.tokenPrice}`}
        subtitle={`24h Volume: $${(parseFloat(tokenomicsData.circulatingSupply) * parseFloat(tokenomicsData.tokenPrice) * 0.1).toLocaleString()}`}
      />
      <MetricCard
        icon={<BookOpen className="w-6 h-6 text-purple-400" />}
        label="Staked Amount"
        value={`${parseFloat(tokenomicsData.stakedAmount).toLocaleString()} TELSTP`}
        subtitle={`${((parseFloat(tokenomicsData.stakedAmount) / parseFloat(tokenomicsData.totalSupply)) * 100).toFixed(1)}% staked`}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-black/40 border border-white/10 rounded-xl p-4">
        <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-3">Token Distribution</div>
        <div className="space-y-3">
          <DistributionItem label="Founder Allocation" value="50%" color="bg-blue-500" />
          <DistributionItem label="Research Staking" value="20%" color="bg-emerald-500" />
          <DistributionItem label="Community Rewards" value="15%" color="bg-purple-500" />
          <DistributionItem label="Governance Treasury" value="10%" color="bg-gold-500" />
          <DistributionItem label="Ecosystem Development" value="5%" color="bg-rose-500" />
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-4">
        <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-3">Key Metrics</div>
        <div className="space-y-3">
          <KeyMetric label="Reward Rate" value={`${tokenomicsData.rewardRate} TELSTP/block`} />
          <KeyMetric label="Governance Proposals" value={tokenomicsData.governanceProposals} />
          <KeyMetric label="24h Transactions" value="1,248" />
          <KeyMetric label="Active Wallets" value="4,821" />
        </div>
      </div>
    </div>
  </div>
);

const StakingTab = ({ stakingPosition, walletAddress, tokenomicsData, onRefresh }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Staking Position</h4>
      <button
        onClick={onRefresh}
        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
      >
        <RefreshCw className="w-4 h-4 text-white/40" />
      </button>
    </div>

    {walletAddress ? (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            icon={<DollarSign className="w-6 h-6 text-emerald-400" />}
            label="Staked Amount"
            value={`${stakingPosition?.amount || '0'} TELSTP`}
            subtitle={`$${(parseFloat(stakingPosition?.amount || '0') * parseFloat(tokenomicsData.tokenPrice)).toFixed(2)} Value`}
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6 text-gold-400" />}
            label="Pending Rewards"
            value={`${stakingPosition?.rewards || '0'} TELSTP`}
            subtitle={`$${(parseFloat(stakingPosition?.rewards || '0') * parseFloat(tokenomicsData.tokenPrice)).toFixed(2)} Value`}
          />
          <MetricCard
            icon={<Users className="w-6 h-6 text-blue-400" />}
            label="Estimated APR"
            value={`${parseFloat(stakingPosition?.apr || '0').toFixed(2)}%`}
            subtitle="Annual Percentage Rate"
          />
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-4">
          <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-4">Staking Actions</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionButton icon={<DollarSign className="w-4 h-4" />} label="Stake TELSTP" />
            <ActionButton icon={<TrendingUp className="w-4 h-4" />} label="Unstake TELSTP" />
            <ActionButton icon={<BookOpen className="w-4 h-4" />} label="Claim Rewards" />
          </div>
        </div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center h-[200px] gap-4 opacity-30">
        <Wallet className="w-12 h-12" />
        <span className="text-sm uppercase font-bold">Connect wallet to view staking position</span>
      </div>
    )}
  </div>
);

const GovernanceTab = ({ tokenomicsData, walletAddress }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Governance Overview</h4>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        icon={<BookOpen className="w-6 h-6 text-purple-400" />}
        label="Active Proposals"
        value={tokenomicsData.governanceProposals}
        subtitle="Proposals awaiting vote"
      />
      <MetricCard
        icon={<Users className="w-6 h-6 text-blue-400" />}
        label="Voting Power"
        value={walletAddress ? "1,248 TELSTP" : "0 TELSTP"}
        subtitle="Your governance power"
      />
      <MetricCard
        icon={<DollarSign className="w-6 h-6 text-emerald-400" />}
        label="Treasury Balance"
        value="48,210 TELSTP"
        subtitle="$4,821 USD Value"
      />
    </div>

    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
      <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-4">Governance Actions</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionButton icon={<BookOpen className="w-4 h-4" />} label="Create Proposal" />
        <ActionButton icon={<Users className="w-4 h-4" />} label="View Proposals" />
      </div>
    </div>

    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
      <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-3">Recent Proposals</div>
      <div className="space-y-3">
        <ProposalItem
          title="Research Grant Allocation"
          status="Voting"
          votesFor="1,248"
          votesAgainst="482"
        />
        <ProposalItem
          title="Staking Reward Adjustment"
          status="Passed"
          votesFor="2,841"
          votesAgainst="842"
        />
        <ProposalItem
          title="New Hub Integration"
          status="Executed"
          votesFor="3,128"
          votesAgainst="421"
        />
      </div>
    </div>
  </div>
);

const MetricCard = ({ icon, label, value, subtitle }: any) => (
  <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-[#D4AF37]/20 transition-all">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">{label}</div>
    </div>
    <div className="text-lg font-black text-white italic mb-1">{value}</div>
    <div className="text-[10px] text-blue-200/40 uppercase tracking-widest">{subtitle}</div>
  </div>
);

const DistributionItem = ({ label, value, color }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-[11px] text-white font-medium">{label}</span>
    </div>
    <span className="text-[11px] text-blue-200/40 font-mono">{value}</span>
  </div>
);

const KeyMetric = ({ label, value }: any) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5">
    <span className="text-[11px] text-white/40 uppercase font-mono tracking-widest">{label}</span>
    <span className="text-[11px] text-white font-mono">{value}</span>
  </div>
);

const ActionButton = ({ icon, label }: any) => (
  <button className="py-3 bg-[#D4AF37] text-black text-[10px] font-black rounded-xl uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2">
    {icon}
    {label}
  </button>
);

const ProposalItem = ({ title, status, votesFor, votesAgainst }: any) => (
  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
    <div className="flex-1">
      <div className="text-[11px] font-medium text-white line-clamp-1">{title}</div>
      <div className="text-[10px] text-blue-200/40 uppercase tracking-widest">{status}</div>
    </div>
    <div className="text-right">
      <div className="text-[10px] text-green-500 font-bold">↑ {votesFor}</div>
      <div className="text-[10px] text-red-500 font-bold">↓ {votesAgainst}</div>
    </div>
  </div>
);