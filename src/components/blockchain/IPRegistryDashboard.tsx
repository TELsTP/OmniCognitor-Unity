import React, { useState, useEffect } from 'react';
import { blockchainService } from '../../services/blockchain';
import { supabaseService } from '../../services/supabase';
import { useUnity } from '../../context/UnityContext';
import { Search, FileText, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

export const IPRegistryDashboard: React.FC = () => {
  const { addQuantumLog } = useUnity();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      addQuantumLog('FETCHING IP REGISTRATIONS FROM OMNICOG MEMORY...');
      
      // Fetch from Supabase (our index of blockchain registrations)
      const registrationsData = await supabaseService.getMemory('ip_registrations');
      
      if (registrationsData) {
        setRegistrations(Object.values(registrationsData.memory_data || {}));
        addQuantumLog(`LOADED ${Object.keys(registrationsData.memory_data || {}).length} REGISTRATIONS`);
      }
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
      addQuantumLog(`REGISTRY LOAD ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOwnership = async (registration: any) => {
    if (!registration) return;
    
    try {
      addQuantumLog(`VERIFYING OWNERSHIP FOR IP: ${registration.ipHash.substring(0, 16)}...`);
      
      const isOwner = await blockchainService.verifyIPOwnership(
        registration.id,
        registration.ownerAddress
      );
      
      if (isOwner) {
        addQuantumLog(`OWNERSHIP VERIFIED: ${registration.ownerAddress.substring(0, 6)}...`);
      } else {
        addQuantumLog(`OWNERSHIP VERIFICATION FAILED: Address mismatch`);
      }
      
      return isOwner;
    } catch (error) {
      console.error('Ownership verification error:', error);
      addQuantumLog(`VERIFICATION ERROR: ${error.message}`);
      return false;
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.ipHash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.ownerAddress?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">IP Registry Dashboard</h3>
        </div>
        <button
          onClick={fetchRegistrations}
          disabled={loading}
          className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Search className="w-3 h-3" />
          )}
          Refresh
        </button>
      </div>

      <div className="p-4 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search by IP hash or owner address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Registrations List */}
        <div className="w-1/2 border-r border-white/5 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Loading Registrations...</span>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
              <FileText className="w-12 h-12 mb-4" />
              <span className="text-xs uppercase font-bold">No Registrations Found</span>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredRegistrations.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegistration(reg)}
                  className={cn(
                    "w-full p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group flex items-center justify-between",
                    selectedRegistration?.id === reg.id ? "bg-white/5 border-[#D4AF37]/20" : ""
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                      <FileText className="w-4 h-4 text-white/40 group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {reg.ipHash.substring(0, 16)}...{reg.ipHash.substring(48)}
                      </div>
                      <div className="text-[10px] text-white/40 line-clamp-1">
                        {reg.ownerAddress.substring(0, 6)}...{reg.ownerAddress.substring(38)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {reg.status === 'registered' ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                    )}
                    <span className="text-[10px] text-white/20">
                      {new Date(reg.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Registration Details */}
        <div className="w-1/2 p-4 overflow-y-auto custom-scrollbar">
          {selectedRegistration ? (
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-2">IP Registration Details</div>
                <div className="space-y-3">
                  <DetailRow label="IP Hash" value={selectedRegistration.ipHash} />
                  <DetailRow label="Owner Address" value={selectedRegistration.ownerAddress} />
                  <DetailRow label="Transaction Hash" value={selectedRegistration.transactionHash} />
                  <DetailRow label="Registration Date" value={new Date(selectedRegistration.timestamp).toLocaleString()} />
                  <DetailRow label="Status" value={selectedRegistration.status} />
                </div>
              </div>

              <div>
                <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-2">Blockchain Data</div>
                <div className="space-y-3">
                  {selectedRegistration.blockchainData && (
                    <>
                      <DetailRow label="Block Number" value={selectedRegistration.blockchainData.blockNumber} />
                      <DetailRow label="Gas Used" value={selectedRegistration.blockchainData.gasUsed} />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleVerifyOwnership(selectedRegistration)}
                  className="w-full py-3 bg-[#D4AF37] text-black text-[10px] font-black rounded-xl uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-3 h-3" />
                  Verify Ownership
                </button>

                <a
                  href={`https://polygonscan.com/tx/${selectedRegistration.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  View on Polygonscan
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
              <FileText className="w-12 h-12 mb-4" />
              <span className="text-xs uppercase font-bold text-center">Select a registration to view details</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase font-bold tracking-widest">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>All registrations are immutable and verifiable on Polygon blockchain</span>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5">
    <span className="text-[11px] text-white/40 uppercase font-mono tracking-widest">{label}</span>
    <span className="text-[11px] text-white font-mono line-clamp-1">{value}</span>
  </div>
);