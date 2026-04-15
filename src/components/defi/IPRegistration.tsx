import React, { useState, useEffect } from 'react';
import { ipRegistrationService } from '../../services/ipRegistration';
import { useUnity } from '../../context/UnityContext';
import { Wallet, FileText, ShieldCheck, RefreshCw, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

export const IPRegistration: React.FC = () => {
  const { addQuantumLog } = useUnity();
  const [walletAddress, setWalletAddress] = useState('');
  const [ipHash, setIpHash] = useState('');
  const [description, setDescription] = useState('');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState<'register' | 'my-ips'>('register');

  useEffect(() => {
    if (walletAddress) {
      fetchRegistrations();
    }
  }, [walletAddress]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      addQuantumLog('FETCHING IP REGISTRATIONS FROM POLYGON NETWORK...');
      
      const regs = await ipRegistrationService.getOwnerRegistrations(walletAddress);
      setRegistrations(regs);
      
      addQuantumLog(`FOUND ${regs.length} REGISTERED IPS`);
      
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
      addQuantumLog(`IP REGISTRATION FETCH ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await ipRegistrationService.connectWallet();
      setWalletAddress(address);
      addQuantumLog(`WALLET CONNECTED: ${address.substring(0, 6)}...${address.substring(38)}`);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      addQuantumLog(`WALLET CONNECTION FAILED: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRegisterIP = async () => {
    if (!ipHash || !description) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsRegistering(true);
    try {
      addQuantumLog(`INITIATING IP REGISTRATION FOR ${ipHash.substring(0, 20)}...`);
      
      const registrationId = await ipRegistrationService.registerIP(ipHash, description, walletAddress);
      
      addQuantumLog(`IP REGISTRATION SUCCESSFUL: ID ${registrationId}`);
      addQuantumLog(`IP HASH: ${ipHash}`);
      addQuantumLog(`REGISTRATION FEE: 1000 TELSTP PAID`);
      
      // Reset form and refresh
      setIpHash('');
      setDescription('');
      await fetchRegistrations();
      setActiveTab('my-ips');
      
    } catch (error) {
      console.error('IP registration failed:', error);
      addQuantumLog(`IP REGISTRATION FAILED: ${error.message}`);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">TELsTP IP Registration</h3>
              <p className="text-[10px] text-blue-200/40 uppercase">Polygon Network • Intellectual Property</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="text-[10px] font-bold text-purple-500 uppercase">Research Protection</span>
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
          onClick={() => setActiveTab('register')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'register'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          Register New IP
        </button>
        <button
          onClick={() => setActiveTab('my-ips')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'my-ips'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          My Registrations
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 min-h-[400px]">
        {activeTab === 'register' ? (
          <RegisterTab
            ipHash={ipHash}
            setIpHash={setIpHash}
            description={description}
            setDescription={setDescription}
            isRegistering={isRegistering}
            handleRegisterIP={handleRegisterIP}
            walletAddress={walletAddress}
          />
        ) : (
          <MyIPsTab
            registrations={registrations}
            loading={loading}
            walletAddress={walletAddress}
            onRefresh={fetchRegistrations}
          />
        )}
      </div>
    </div>
  );
};

const RegisterTab = ({ ipHash, setIpHash, description, setDescription, isRegistering, handleRegisterIP, walletAddress }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Register New Intellectual Property</h4>
    </div>

    {!walletAddress ? (
      <div className="flex flex-col items-center justify-center h-[200px] gap-4 opacity-30">
        <Wallet className="w-12 h-12" />
        <span className="text-sm uppercase font-bold">Connect wallet to register IP</span>
      </div>
    ) : (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] text-white/40 uppercase font-mono tracking-widest">IP Hash (SHA-256)</label>
          <input
            type="text"
            value={ipHash}
            onChange={(e) => setIpHash(e.target.value)}
            placeholder="e.g., a1b2c3...56d7e8f9"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50"
          />
          <p className="text-[10px] text-blue-200/40">Enter the SHA-256 hash of your intellectual property (research paper, algorithm, dataset, etc.)</p>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the intellectual property"
            rows={4}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
          />
          <p className="text-[10px] text-blue-200/40">Describe your IP in detail (purpose, methodology, unique aspects)</p>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-4">
          <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-4">Registration Details</div>
          <div className="space-y-3">
            <DetailItem label="Network" value="Polygon Mainnet" />
            <DetailItem label="Registration Fee" value="1000 TELSTP" />
            <DetailItem label="Registration Period" value="1 Year" />
            <DetailItem label="Renewable" value="Yes" />
            <DetailItem label="Transferable" value="Yes" />
          </div>
        </div>

        <button
          onClick={handleRegisterIP}
          disabled={isRegistering || !ipHash || !description}
          className={cn(
            "w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all",
            isRegistering || !ipHash || !description
              ? "bg-white/10 text-white/40 border border-white/10 cursor-not-allowed"
              : "bg-[#D4AF37] text-black hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {isRegistering ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Registering IP...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              Register IP on Polygon
            </>
          )}
        </button>

        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-[10px] text-blue-200/80">
          <p className="font-bold uppercase tracking-widest mb-2">Important Information:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>IP registration provides proof of existence and ownership</li>
            <li>Registration is stored on Polygon blockchain for immutability</li>
            <li>1000 TELSTP fee is required for registration</li>
            <li>Registration is valid for 1 year and can be renewed</li>
            <li>IP ownership can be transferred to other wallets</li>
          </ul>
        </div>
      </div>
    )}
  </div>
);

const MyIPsTab = ({ registrations, loading, walletAddress, onRefresh }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">My IP Registrations</h4>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
      >
        <RefreshCw className="w-4 h-4 text-white/40" />
      </button>
    </div>

    {!walletAddress ? (
      <div className="flex flex-col items-center justify-center h-[200px] gap-4 opacity-30">
        <Wallet className="w-12 h-12" />
        <span className="text-sm uppercase font-bold">Connect wallet to view registrations</span>
      </div>
    ) : loading ? (
      <div className="flex flex-col items-center justify-center h-[200px] gap-3 opacity-40">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-sm uppercase font-bold tracking-widest">Loading Registrations</span>
      </div>
    ) : registrations.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-[200px] gap-4 opacity-30">
        <FileText className="w-12 h-12" />
        <span className="text-sm uppercase font-bold">No IP registrations found</span>
        <p className="text-[11px] text-center text-blue-200/40 max-w-[300px]">
          Register your first intellectual property to protect your research and innovations on the Polygon blockchain.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            icon={<ShieldCheck className="w-6 h-6 text-blue-400" />}
            label="Total Registrations"
            value={registrations.length.toString()}
            subtitle="Active IP assets"
          />
          <MetricCard
            icon={<FileText className="w-6 h-6 text-emerald-400" />}
            label="Active IPs"
            value={registrations.filter(r => r.isActive).length.toString()}
            subtitle="Currently protected"
          />
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-4">
          <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-4">Registered Intellectual Properties</div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
            {registrations.map((reg) => (
              <IPRegistrationItem key={reg.registrationId} registration={reg} />
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5">
    <span className="text-[11px] text-white/40 uppercase font-mono tracking-widest">{label}</span>
    <span className="text-[11px] text-white font-mono">{value}</span>
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

const IPRegistrationItem = ({ registration }: any) => (
  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between hover:bg-white/10 transition-all">
    <div className="flex-1">
      <div className="text-[11px] font-medium text-white line-clamp-1">
        {registration.description || `IP ${registration.ipHash.substring(0, 10)}...`}
      </div>
      <div className="text-[10px] text-blue-200/40 uppercase tracking-widest">
        {registration.ipHash.substring(0, 20)}...
      </div>
      <div className="text-[10px] text-blue-200/40 mt-1">
        ID: {registration.registrationId} • 
        Expires: {new Date(registration.expirationDate).toLocaleDateString()}
      </div>
    </div>
    <div className="flex items-center gap-2 ml-4">
      {registration.isActive ? (
        <div className="w-2 h-2 bg-green-500 rounded-full" />
      ) : (
        <div className="w-2 h-2 bg-red-500 rounded-full" />
      )}
      <a 
        href={`https://polygonscan.com/tx/0x...`} // Would link to actual transaction
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300"
      >
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </div>
);