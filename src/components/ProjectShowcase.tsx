import { useState, useEffect } from 'react';
import { supabaseService } from '../services/supabase';
import { useSupabase } from '../SupabaseProvider';
import { Search, Filter, Plus, Loader2, ExternalLink, Tag } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUnity } from '../context/UnityContext';

interface Project {
  id: string;
  title: string;
  description: string;
  goals: string;
  methodology: string;
  ai_contributions: string;
  status: 'Proposed' | 'In Progress' | 'Completed' | 'Archived';
  impact_area: string;
  category: string;
  keywords: string[];
  owner_id: string;
  created_at: any;
}

export default function ProjectShowcase() {
  const { user, profile } = useSupabase();
  const { isArchitectMode } = useUnity();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    goals: '',
    methodology: '',
    ai_contributions: '',
    status: 'Proposed' as const,
    impact_area: '',
    category: '',
    keywords: '',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await supabaseService.getProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await supabaseService.createProject({
        ...newProject,
        keywords: newProject.keywords.split(',').map(k => k.trim()),
        owner_id: user.id,
      });
      setShowAddModal(false);
      setNewProject({
        title: '',
        description: '',
        goals: '',
        methodology: '',
        ai_contributions: '',
        status: 'Proposed',
        impact_area: '',
        category: '',
        keywords: '',
      });
      
      // Refresh projects
      const data = await supabaseService.getProjects();
      setProjects(data || []);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#D4AF37]">
            {isArchitectMode ? 'ARCHITECT PROJECT HUB' : 'Project Showcase'}
          </h2>
          <p className="text-blue-200/60 text-sm">
            {isArchitectMode 
              ? "Master Builder, you are overseeing the global multimedia and research project landscape."
              : "Discover and contribute to life science innovation"}
          </p>
        </div>
        
        {(isArchitectMode || profile?.role === 'Researcher' || profile?.role === 'Project Manager' || profile?.role === 'System Administrator') && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#C5A028] transition-all"
          >
            <Plus className="w-4 h-4" /> {isArchitectMode ? 'Add Master Project' : 'Submit Project'}
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/40" />
          <input 
            type="text" 
            placeholder="Search projects by title, description, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/40" />
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
          >
            {categories.map(c => <option key={c} value={c} className="bg-[#0A0E1A]">{c}</option>)}
          </select>
        </div>
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="bg-[#0A0E1A] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all group flex flex-col cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider", 
                  project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                  project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400')}>
                  {project.status}
                </span>
                <span className="text-[10px] text-blue-200/40 font-mono">{project.category}</span>
              </div>
              <h3 className="text-lg font-bold text-blue-50 mb-2 group-hover:text-[#D4AF37] transition-colors">{project.title}</h3>
              <p className="text-sm text-blue-200/60 line-clamp-3 mb-4 flex-1">{project.description}</p>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.keywords.slice(0, 3).map(k => (
                    <span key={k} className="text-[10px] bg-white/5 text-blue-200/40 px-2 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-2 h-2" /> {k}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[10px] font-bold text-[#D4AF37]">
                      {project.owner_id?.slice(0, 2).toUpperCase() || '??'}
                    </div>
                    <span className="text-[10px] text-blue-200/40">Project Owner</span>
                  </div>
                  <button className="text-[#D4AF37] hover:text-[#C5A028] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0A0E1A] border border-[#D4AF37]/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-blue-200/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              ✕
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                selectedProject.status === 'Proposed' ? "bg-blue-500/20 text-blue-400" :
                selectedProject.status === 'In Progress' ? "bg-amber-500/20 text-amber-400" :
                selectedProject.status === 'Completed' ? "bg-emerald-500/20 text-emerald-400" :
                "bg-gray-500/20 text-gray-400"
              )}>
                {selectedProject.status}
              </span>
              <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[10px] font-black uppercase tracking-widest">
                {selectedProject.category}
              </span>
            </div>

            <h2 className="text-3xl font-black text-white mb-4 leading-tight">{selectedProject.title}</h2>
            <p className="text-blue-200/80 text-lg mb-8 leading-relaxed">{selectedProject.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <section>
                  <h4 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Project Goals</h4>
                  <p className="text-blue-200/60 text-sm leading-relaxed">{selectedProject.goals}</p>
                </section>
                <section>
                  <h4 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Methodology</h4>
                  <p className="text-blue-200/60 text-sm leading-relaxed">{selectedProject.methodology}</p>
                </section>
              </div>
              <div className="space-y-6">
                <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">AI Contributions</h4>
                  <p className="text-blue-200/60 text-sm leading-relaxed italic">"{selectedProject.ai_contributions}"</p>
                </section>
                <section>
                  <h4 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Impact Area</h4>
                  <p className="text-blue-200/60 text-sm leading-relaxed">{selectedProject.impact_area}</p>
                </section>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
              {selectedProject.keywords.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 text-blue-200/40 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0E1A] border border-[#D4AF37]/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#D4AF37]">Submit New Project</h3>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200/60 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-blue-200/40 uppercase">Title</label>
                  <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm focus:border-[#D4AF37] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-blue-200/40 uppercase">Category</label>
                  <input required value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm focus:border-[#D4AF37] outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-blue-200/40 uppercase">Description</label>
                <textarea required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm focus:border-[#D4AF37] outline-none h-24 resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-blue-200/40 uppercase">Impact Area</label>
                  <input required value={newProject.impact_area} onChange={e => setNewProject({...newProject, impact_area: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm focus:border-[#D4AF37] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-blue-200/40 uppercase">Keywords (comma separated)</label>
                  <input value={newProject.keywords} onChange={e => setNewProject({...newProject, keywords: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm focus:border-[#D4AF37] outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-blue-200/40 uppercase">AI Contributions</label>
                <textarea value={newProject.ai_contributions} onChange={e => setNewProject({...newProject, ai_contributions: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-sm focus:border-[#D4AF37] outline-none h-20 resize-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#C5A028] transition-all mt-4">
                Publish Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
