import React, { useState } from 'react';
import { useBlockchain } from '../../services/blockchain';
import { blockchainService } from '../../services/blockchain';
import { useUnity } from '../../context/UnityContext';
import { Wallet, FileText, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const IPRegistrationForm: React.FC = () => {
  const { addQuantumLog } = useUnity();
  const [walletAddress, setWalletAddress] = useState('');
  const [ipHash, setIpHash] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setStatus('idle');
    setErrorMessage('');
    
    try {
      const address = await blockchainService.connectWallet();
      setWalletAddress(address);
      addQuantumLog(`WALLET CONNECTED: ${address.substring(0, 6)}...${address.substring(38)}`);
    } catch (error) {
      setErrorMessage(error.message);
      setStatus('error');
      addQuantumLog(`WALLET CONNECTION FAILED: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      
      // Generate IPFS hash (simplified - in production use actual IPFS upload)
      const reader = new FileReader();
      reader.onload = () => {
        const hash = btoa(reader.result as string).substring(0, 64);
        setIpHash(hash);
        setMetadataURI(URL.createObjectURL(uploadedFile));
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleRegisterIP = async () => {
    if (!walletAddress || !ipHash || !metadataURI) {
      setErrorMessage('Please connect wallet and upload IP file');
      setStatus('error');
      return;
    }

    setIsRegistering(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      addQuantumLog(`INITIATING IP REGISTRATION FOR: ${ipHash.substring(0, 16)}...`);
      
      const registration = await blockchainService.registerIP(
        ipHash,
        metadataURI,
        walletAddress
      );

      setStatus('success');
      addQuantumLog(`IP REGISTRATION SUCCESSFUL: TX ${registration.transactionHash.substring(0, 16)}...`);
      addQuantumLog(`BLOCKCHAIN CONFIRMATION: Polygon Network`);
      
      // Reset form after successful registration
      setTimeout(() => {
        setFile(null);
        setIpHash('');
        setMetadataURI('');
      }, 3000);
      
    } catch (error) {
      setErrorMessage(error.message);
      setStatus('error');
      addQuantumLog(`IP REGISTRATION FAILED: ${error.message}`);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Polygon IP Registration</h3>
            <p className="text-[10px] text-blue-200/40 uppercase">Secure your research on blockchain</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-[10px] font-bold text-blue-500 uppercase">Polygon Network</span>
          </div>
          <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="text-[10px] font-bold text-green-500 uppercase">Smart Contract</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Wallet Connection */}
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Blockchain Wallet</div>
              <div className="text-xs text-blue-400 font-mono mt-1">
                {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : 'Not connected'}
              </div>
            </div>
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting || !!walletAddress}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                walletAddress
                  ? "bg-green-500/20 text-green-500 border border-green-500/30 cursor-default"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              )}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Connecting...
                </>
              ) : walletAddress ? (
                <>
                  <CheckCircle className="w-3 h-3" />
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
          {!walletAddress && (
            <p className="text-[10px] text-blue-200/40 leading-relaxed">
              Connect your MetaMask wallet to register intellectual property on Polygon blockchain.
            </p>
          )}
        </div>

        {/* IP File Upload */}
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-3">Intellectual Property File</div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-xs text-white/60 line-clamp-1">
                {file ? file.name : 'No file selected'}
              </div>
              {ipHash && (
                <div className="text-[9px] text-blue-400 font-mono mt-1">
                  IPFS Hash: {ipHash.substring(0, 16)}...{ipHash.substring(48)}
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
              <div className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
                <Upload className="w-3 h-3" />
                Upload IP
              </div>
            </label>
          </div>
        </div>

        {/* Registration Button */}
        <button
          onClick={handleRegisterIP}
          disabled={isRegistering || !walletAddress || !file}
          className={cn(
            "w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all",
            (!walletAddress || !file)
              ? "bg-white/5 text-white/20 border border-white/10 cursor-not-allowed"
              : "bg-[#D4AF37] text-black hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {isRegistering ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Registering on Polygon...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              Register IP on Blockchain
            </>
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-[11px] text-green-500 font-bold uppercase">IP Successfully Registered on Polygon Blockchain!</span>
          </div>
        )}

        {status === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-[11px] text-red-500 font-bold uppercase">Error: {errorMessage}</span>
          </div>
        )}

        {/* Process Flow */}
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
          <div className="text-[10px] font-bold text-blue-200/40 uppercase tracking-widest">Registration Process</div>
          <div className="space-y-2">
            <ProcessStep
              number={1}
              title="Connect Wallet"
              description="Link your MetaMask wallet to the system"
              completed={!!walletAddress}
            />
            <ProcessStep
              number={2}
              title="Upload IP File"
              description="Upload your research document for hashing"
              completed={!!file}
            />
            <ProcessStep
              number={3}
              title="Blockchain Registration"
              description="IP hash registered on Polygon smart contract"
              completed={status === 'success'}
            />
            <ProcessStep
              number={4}
              title="Supabase Indexing"
              description="Registration indexed in OmniCog memory"
              completed={status === 'success'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessStep = ({ number, title, description, completed }: {
  number: number;
  title: string;
  description: string;
  completed: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className={cn(
      "w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold",
      completed
        ? "bg-green-500 border-green-500 text-white"
        : "bg-black/40 border-white/20 text-white/40"
    )}>
      {completed ? <CheckCircle className="w-3 h-3" /> : number}
    </div>
    <div>
      <div className="text-[11px] font-medium text-white">{title}</div>
      <div className="text-[10px] text-blue-200/40">{description}</div>
    </div>
  </div>
);