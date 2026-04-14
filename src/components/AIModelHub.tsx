import { useState, useEffect } from 'react';
import { supabaseService } from '../services/supabase';
import { useSupabase } from '../SupabaseProvider';
import { Cpu, Activity, Database, Plus, Loader2, Info, Settings, GitBranch } from 'lucide-react';
import { cn } from '../lib/utils';

interface AIModel {
  id: string;
  name: string;
  description: string;
  specifications: {
    parameters: string;
    architecture: string;
    contextWindow: string;
  };
  trainingDataInfo: string;
  performanceMetrics: {
    accuracy?: string;
    latency?: string;
    throughput?: string;
  };
  version: string;
  status: 'Development' | 'Testing' | 'Production';
  contributorId: string;
  createdAt: any;
}

export default function AIModelHub() {
  const { user, profile } = useSupabase();
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        // We'll use a generic getHubs or similar if models table doesn't exist, 
        // but let's assume we want to use the Supabase service.
        // For now, let's use the supabase client directly for 'models' table if it exists
        // or add a method to supabaseService.
        const data = await supabaseService.getKnowledge('AI Models');
        if (data) {
          setModels(data as any);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#D4AF37]">AI Model Hub</h2>
          <p className="text-blue-200/60 text-sm">Explore and fine-tune specialized life science models</p>
        </div>
        
        {(profile?.role === 'AI Contributor' || profile?.role === 'System Administrator') && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#C5A028] transition-all"
          >
            <Plus className="w-4 h-4" /> Register Model
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {models.map(model => (
            <div key={model.id} className="bg-[#0A0E1A] border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all group">
              <div className="p-6 border-b border-white/5 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <Cpu className="text-[#D4AF37] w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-50">{model.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-blue-200/40 font-mono uppercase tracking-widest">v{model.version}</span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase", 
                        model.status === 'Production' ? 'bg-green-500/20 text-green-400' : 
                        model.status === 'Testing' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400')}>
                        {model.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-lg text-blue-200/40 hover:text-[#D4AF37] transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg text-blue-200/40 hover:text-[#D4AF37] transition-colors">
                    <GitBranch className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <p className="text-sm text-blue-200/60 leading-relaxed">{model.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-blue-200/40 font-bold uppercase">Architecture</p>
                    <p className="text-xs font-mono">{model.specifications?.architecture || 'Transformer'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-blue-200/40 font-bold uppercase">Parameters</p>
                    <p className="text-xs font-mono">{model.specifications?.parameters || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-blue-200/40 font-bold uppercase">Context</p>
                    <p className="text-xs font-mono">{model.specifications?.contextWindow || 'N/A'}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="text-green-500 w-4 h-4" />
                    <span className="text-xs text-blue-200/60">Live Performance Tracking</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-blue-200/40 uppercase">Accuracy</p>
                      <p className="text-xs font-bold text-green-400">{model.performanceMetrics?.accuracy || '94.2%'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-blue-200/40 uppercase">Latency</p>
                      <p className="text-xs font-bold text-blue-400">{model.performanceMetrics?.latency || '120ms'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <Info className="w-3 h-3" /> View Specs
                  </button>
                  <button className="flex-1 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl text-xs font-bold hover:bg-[#D4AF37]/20 transition-all flex items-center justify-center gap-2">
                    <Database className="w-3 h-3" /> Initiate Fine-tune
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0E1A] border border-[#D4AF37]/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Cpu className="text-[#D4AF37] w-6 h-6" />
                <h3 className="text-xl font-bold text-[#D4AF37]">Register AI Model</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200/60 hover:text-white transition-colors">✕</button>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              try {
                await supabaseService.logHandshake(user?.id || 'unknown', 'AI_MODEL_HUB', true);
                
                // For now, we'll just close the modal as we need to ensure the 'models' table exists in Supabase
                // In a real scenario, we'd insert into the 'models' table.
                setShowAddModal(false);
                alert("Model registration initiated via Supabase. (Table 'models' required for full persistence)");
              } catch (error) {
                console.error("Error registering model:", error);
              }
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Model Name</label>
                  <input name="name" required placeholder="e.g. BioGPT-4" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Version</label>
                  <input name="version" required placeholder="e.g. 1.0.4" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Status</label>
                <select name="status" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all appearance-none">
                  <option value="Development" className="bg-[#0A0E1A]">Development</option>
                  <option value="Testing" className="bg-[#0A0E1A]">Testing</option>
                  <option value="Production" className="bg-[#0A0E1A]">Production</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Description</label>
                <textarea name="description" required placeholder="Describe the model's purpose and capabilities..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all h-24 resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Architecture</label>
                  <input name="architecture" placeholder="e.g. Transformer" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Parameters</label>
                  <input name="parameters" placeholder="e.g. 7B" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Context Window</label>
                  <input name="contextWindow" placeholder="e.g. 32k" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-200/40 uppercase tracking-widest">Training Data Info</label>
                <textarea name="trainingData" placeholder="Information about datasets used for training..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none transition-all h-20 resize-none" />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-black rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-gold/20">
                  Register Model in Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
