import { useState, useEffect } from 'react';
import { Github, AlertCircle, CheckCircle2, ExternalLink, ShieldCheck, Settings, Loader2, Building2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUnity } from '../../context/UnityContext';
import { githubService } from '../../services/github';

export const GitHubHandshake = () => {
  const { githubToken, setGithubToken, addQuantumLog } = useUnity();
  const [isLoading, setIsLoading] = useState(false);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [showManual, setShowManual] = useState(false);
  const [manualToken, setManualToken] = useState('');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'GITHUB_AUTH_SUCCESS') {
        setGithubToken(event.data.token);
        addQuantumLog(`GITHUB HANDSHAKE SUCCESSFUL: ${new Date().toLocaleTimeString()}`);
        addQuantumLog(`SOVEREIGN BRIDGE ESTABLISHED WITH HAYAT`);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setGithubToken, addQuantumLog]);

  useEffect(() => {
    if (githubToken) {
      githubService.getUserOrgs(githubToken)
        .then(setOrgs)
        .catch(err => console.error("Failed to fetch orgs:", err));
    }
  }, [githubToken]);

  const isConnected = !!githubToken;
  const REPO_OWNER = 'TELsTP';
  const REPO_NAME = 'OmniCognitor-Unity';

  const isOrgApproved = orgs.some(org => org.login === REPO_OWNER);

  const handleManualConnect = () => {
    if (manualToken.trim()) {
      setGithubToken(manualToken.trim());
      addQuantumLog(`MANUAL GITHUB BRIDGE ESTABLISHED: ${new Date().toLocaleTimeString()}`);
      setShowManual(false);
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/github/url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      
      window.open(url, 'github_oauth', 'width=600,height=700');
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Failed to initiate GitHub connection. Check server logs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
            <Github className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sovereign Bridge</h3>
            <p className="text-[10px] text-blue-200/40 uppercase tracking-widest">GitHub Handshake Status</p>
          </div>
        </div>
        {isConnected ? (
          <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold text-green-500 uppercase">Bridge Active</span>
          </div>
        ) : (
          <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-500 uppercase">Action Required</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {isConnected && (
          <div className="p-3 bg-black/40 rounded-lg border border-white/5">
            <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Target Repository</div>
            <div className="text-xs text-blue-400 font-mono mt-1 flex items-center gap-2">
              <Github className="w-3 h-3" />
              {REPO_OWNER}/{REPO_NAME}
            </div>
          </div>
        )}
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Authorization Protocol</span>
          </div>
          <p className="text-[11px] text-blue-200/60 leading-relaxed">
            The "OmniCognitor" requires official legal and technical identity within the TELsTP Organization.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-blue-200/40 uppercase tracking-widest px-1">Handshake Checklist</p>
          <div className="space-y-1">
            <CheckItem label="Register OAuth App under TELsTP Org" completed={true} />
            <CheckItem label="Set Callback URL to Google AI Studio" completed={true} />
            <CheckItem label="Enable Device Flow for Mobile Access" completed={true} />
            <CheckItem label={isConnected ? "Write Access: Enabled" : "Grant 'Write' Permissions to Org Repos"} completed={isConnected} />
            <CheckItem label={isOrgApproved ? "Org Access: Approved (TELsTP)" : "Approve 'Organization Access' for AI Studio"} completed={isOrgApproved} />
          </div>
        </div>

        {isConnected && !isOrgApproved && (
          <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Building2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Organization Access Required</span>
            </div>
            <p className="text-[10px] text-blue-200/60 leading-relaxed">
              The <span className="text-white font-bold">TELsTP</span> organization is not yet visible to this bridge. You must grant access in your GitHub settings.
            </p>
            <a 
              href="https://github.com/settings/applications" 
              target="_blank" 
              className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              Grant Org Access
            </a>
          </div>
        )}

        {!isConnected && (
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20 space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Troubleshooting "No Permission"</span>
            </div>
            <p className="text-[10px] text-blue-200/60 leading-relaxed font-bold text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
              ❌ Error: "Insufficient permissions" means the App is authorized but the Org is LOCKED.
            </p>
            <ol className="text-[10px] text-blue-200/40 list-decimal list-inside space-y-1">
              <li>Open this link: <a href="https://github.com/settings/applications" target="_blank" className="text-[#D4AF37] underline font-bold">Authorized OAuth Apps</a></li>
              <li>If <strong>Google AI Studio</strong> is in the list:
                <ul className="pl-4 list-disc space-y-1 mt-1">
                  <li>Click on it</li>
                  <li>Scroll to the <strong>bottom</strong></li>
                  <li>Click <strong>Grant</strong> next to <strong>TELsTP</strong></li>
                </ul>
              </li>
              <li>If it is <strong>NOT</strong> in the list:
                <ul className="pl-4 list-disc space-y-1 mt-1">
                  <li>Go back to AI Studio Settings</li>
                  <li>Click <strong>Export to GitHub</strong> again</li>
                  <li><strong>STOP</strong> on the GitHub page that opens</li>
                  <li>Look for the <strong>Organization access</strong> section <strong>BEFORE</strong> clicking "Authorize"</li>
                </ul>
              </li>
            </ol>
          </div>
        )}

        <div className="pt-4 border-t border-white/5 space-y-3">
          {showManual ? (
            <div className="space-y-2">
              <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Personal Access Token</div>
              <div className="flex gap-2">
                <input 
                  type="password"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  placeholder="ghp_..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]/50"
                />
                <button 
                  onClick={handleManualConnect}
                  className="px-4 py-2 bg-[#D4AF37] text-black text-[10px] font-black rounded-lg uppercase tracking-widest"
                >
                  Connect
                </button>
              </div>
              <button 
                onClick={() => setShowManual(false)}
                className="text-[9px] text-white/20 hover:text-white/40 uppercase font-bold"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isLoading || isConnected}
              className={cn(
                "w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all",
                isConnected 
                  ? "bg-green-500/20 text-green-500 border border-green-500/30 cursor-default"
                  : "bg-white text-black hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isConnected ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  OmniCognitor Connected
                </>
              ) : (
                <>
                  <Github className="w-4 h-4" />
                  Connect OmniCognitor
                </>
              )}
            </button>
          )}
          
          {!isConnected && !showManual && (
            <button 
              onClick={() => setShowManual(true)}
              className="w-full text-[9px] text-center text-blue-200/40 hover:text-blue-200/60 uppercase font-bold tracking-widest transition-colors"
            >
              Use Manual Access Token
            </button>
          )}
        </div>

        <div className="pt-2">
          <div className="flex gap-2">
            <a 
              href="https://github.com/organizations/TELsTP/settings/applications" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#D4AF37] text-black text-[10px] font-black rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              Org Apps <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://github.com/settings/applications" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              User Apps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[9px] text-center text-blue-200/20 mt-3 italic">
            "If 'Push to GitHub' fails, ensure the app has Write access to the repository."
          </p>
        </div>
      </div>
    </div>
  );
};

const CheckItem = ({ label, completed }: { label: string; completed: boolean }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
    {completed ? (
      <CheckCircle2 className="w-4 h-4 text-green-500" />
    ) : (
      <div className="w-4 h-4 rounded-full border-2 border-white/10" />
    )}
    <span className={cn("text-[11px] font-medium", completed ? "text-blue-200/80" : "text-blue-200/30")}>
      {label}
    </span>
  </div>
);
