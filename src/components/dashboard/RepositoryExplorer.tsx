import React, { useState, useEffect } from 'react';
import { Github, Search, Folder, FileText, ChevronRight, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { githubService, GitHubRepo } from '../../services/github';
import { useUnity } from '../../context/UnityContext';
import { cn } from '../../lib/utils';
import { supabaseService } from '../../services/supabase';

export const RepositoryExplorer = () => {
  const { githubToken, addQuantumLog } = useUnity();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [contents, setContents] = useState<any[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (githubToken) {
      fetchRepos();
    }
  }, [githubToken]);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const data = await githubService.listRepos(githubToken!);
      setRepos(data);
    } catch (err) {
      console.error("Failed to fetch repos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRepoSelect = async (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setCurrentPath('');
    fetchContents(repo.full_name, '');
  };

  const fetchContents = async (fullName: string, path: string) => {
    setLoading(true);
    try {
      const [owner, repoName] = fullName.split('/');
      const data = await githubService.getRepoContents(githubToken!, owner, repoName, path);
      setContents(data);
      setCurrentPath(path);
    } catch (err) {
      console.error("Failed to fetch contents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (item: any) => {
    if (!selectedRepo) return;
    setImporting(true);
    const [owner, repoName] = selectedRepo.full_name.split('/');
    
    try {
      addQuantumLog(`IMPORTING FROM GITHUB: ${item.name}...`);
      
      if (item.type === 'file') {
        const content = await githubService.getFileContent(githubToken!, owner, repoName, item.path);
        
        // Create a Knowledge Asset in Supabase
        await supabaseService.saveMemory(`github_${item.sha}`, {
          content: `Imported from ${selectedRepo.full_name}/${item.path}:\n\n${content}`,
          type: 'knowledge',
          tags: ['github-import', selectedRepo.name],
          metadata: {
            source: 'github',
            repo: selectedRepo.full_name,
            path: item.path,
            sha: item.sha
          }
        });
        
        addQuantumLog(`SUCCESS: ${item.name} INTEGRATED INTO WISDOM HUB.`);
      } else {
        addQuantumLog(`HINT: Folders must be imported file by file for now.`);
      }
    } catch (err: any) {
      addQuantumLog(`IMPORT ERROR: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const filteredRepos = repos.filter(r => 
    r.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
  );

  if (!githubToken) return null;

  return (
    <div className="bg-[#0A0E1A] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-bottom border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Github className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sovereign Repository Explorer</h3>
        </div>
        {selectedRepo && (
          <button 
            onClick={() => setSelectedRepo(null)}
            className="text-[10px] text-blue-400 uppercase font-bold hover:underline"
          >
            Back to List
          </button>
        )}
      </div>

      {!selectedRepo ? (
        <>
          <div className="p-4 border-bottom border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text"
                placeholder="Search your repositories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {loading && repos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Scanning GitHub...</span>
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-20">
                <Github className="w-12 h-12 mb-4" />
                <span className="text-xs uppercase font-bold">No Repositories Found</span>
              </div>
            ) : (
              filteredRepos.map(repo => (
                <button
                  key={repo.full_name}
                  onClick={() => handleRepoSelect(repo)}
                  className="w-full p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                        <Github className="w-4 h-4 text-white/40 group-hover:text-[#D4AF37] transition-colors" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">{repo.full_name}</div>
                        <div className="text-[10px] text-white/40 line-clamp-1">{repo.description || 'No description provided'}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-all" />
                  </div>
                </button>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="px-4 py-2 bg-black/40 border-bottom border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => fetchContents(selectedRepo.full_name, '')}
              className="text-[10px] font-mono text-white/40 hover:text-white whitespace-nowrap"
            >
              {selectedRepo.name}
            </button>
            {currentPath.split('/').filter(Boolean).map((part, i, arr) => (
              <React.Fragment key={i}>
                <span className="text-white/20">/</span>
                <button 
                  onClick={() => fetchContents(selectedRepo.full_name, arr.slice(0, i + 1).join('/'))}
                  className="text-[10px] font-mono text-white/40 hover:text-white whitespace-nowrap"
                >
                  {part}
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Accessing Files...</span>
              </div>
            ) : (
              contents.map(item => (
                <div
                  key={item.path}
                  className="w-full p-2 rounded-lg hover:bg-white/5 border border-transparent flex items-center justify-between group"
                >
                  <button
                    onClick={() => item.type === 'dir' ? fetchContents(selectedRepo.full_name, item.path) : null}
                    className="flex items-center gap-3 flex-1 text-left"
                    disabled={item.type !== 'dir'}
                  >
                    {item.type === 'dir' ? (
                      <Folder className="w-4 h-4 text-blue-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-white/40" />
                    )}
                    <span className={cn(
                      "text-xs font-mono",
                      item.type === 'dir' ? "text-blue-200" : "text-white/60"
                    )}>
                      {item.name}
                    </span>
                  </button>
                  {item.type === 'file' && (
                    <button
                      onClick={() => handleImport(item)}
                      disabled={importing}
                      className="p-2 bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 rounded-lg text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all"
                      title="Import to Wisdom Hub"
                    >
                      {importing ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Download className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      <div className="p-4 bg-white/5 border-top border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase font-bold tracking-widest">
          <ShieldCheck className="w-3 h-3" />
          <span>Sovereign Bridge Security: Active</span>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
