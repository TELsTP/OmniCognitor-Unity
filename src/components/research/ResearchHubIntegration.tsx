import React, { useState, useEffect } from 'react';
import { researchService } from '../../services/research';
import { useUnity } from '../../context/UnityContext';
import { Microscope, BookOpen, Users, Database, ExternalLink, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ResearchHubIntegration: React.FC = () => {
  const { addQuantumLog } = useUnity();
  const [projects, setProjects] = useState<any[]>([]);
  const [publications, setPublications] = useState<any[]>([]);
  const [wellnessData, setWellnessData] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'publications' | 'integration'>('projects');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      addQuantumLog('FETCHING RESEARCH HUB DATA...');
      
      const [projectsData, publicationsData, wellnessData, analyticsData] = await Promise.all([
        researchService.getResearchProjects(),
        researchService.getResearchPublications(),
        researchService.getWellnessHubData(),
        researchService.getCrossHubAnalytics()
      ]);
      
      setProjects(projectsData);
      setPublications(publicationsData);
      setWellnessData(wellnessData);
      setAnalytics(analyticsData);
      
      addQuantumLog(`RESEARCH HUB UPDATE: ${projectsData.length} Projects, ${publicationsData.length} Publications`);
      addQuantumLog(`INTEGRATION STATUS: ${wellnessData.integrationStatus}`);
      
    } catch (error) {
      console.error('Failed to fetch research data:', error);
      addQuantumLog(`RESEARCH HUB FETCH ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
              <Microscope className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Research Hub Integration</h3>
              <p className="text-[10px] text-blue-200/40 uppercase">Unified Research & Wellness Ecosystem</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-[10px] font-bold text-blue-500 uppercase">Research Pillar</span>
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="text-[10px] font-bold text-emerald-500 uppercase">Wellness Integration</span>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        {wellnessData && (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Wellness Hub Status</div>
              <div className="text-xs text-blue-400 font-mono mt-1">
                {wellnessData.name} • {wellnessData.status}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                wellnessData.integrationStatus === 'connected'
                  ? "bg-green-500/20 text-green-500 border border-green-500/30"
                  : "bg-amber-500/20 text-amber-500 border border-amber-500/30"
              )}>
                {wellnessData.integrationStatus}
              </div>
              <a
                href="https://wellness-connect-hub.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
              >
                <ExternalLink className="w-4 h-4 text-white/40" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-2 bg-black/40 border-b border-white/5">
        <button
          onClick={() => setActiveTab('projects')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'projects'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          Research Projects
        </button>
        <button
          onClick={() => setActiveTab('publications')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'publications'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          Publications
        </button>
        <button
          onClick={() => setActiveTab('integration')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'integration'
              ? "bg-[#D4AF37] text-black"
              : "bg-transparent text-white/40 hover:text-white"
          )}
        >
          Hub Integration
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-3 opacity-40">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm uppercase font-bold tracking-widest">Loading Research Data</span>
          </div>
        ) : activeTab === 'projects' ? (
          <ProjectsTab projects={projects} onRefresh={fetchData} />
        ) : activeTab === 'publications' ? (
          <PublicationsTab publications={publications} onRefresh={fetchData} />
        ) : (
          <IntegrationTab wellnessData={wellnessData} analytics={analytics} />
        )}
      </div>
    </div>
  );
};

const ProjectsTab = ({ projects, onRefresh }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Active Research Projects</h4>
      <button
        onClick={onRefresh}
        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
      >
        <RefreshCw className="w-4 h-4 text-white/40" />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project: any) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>

    {projects.length === 0 && (
      <div className="flex flex-col items-center justify-center h-[200px] gap-4 opacity-30">
        <Microscope className="w-12 h-12" />
        <span className="text-sm uppercase font-bold">No research projects found</span>
      </div>
    )}
  </div>
);

const PublicationsTab = ({ publications, onRefresh }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Research Publications</h4>
      <button
        onClick={onRefresh}
        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
      >
        <RefreshCw className="w-4 h-4 text-white/40" />
      </button>
    </div>

    <div className="space-y-3">
      {publications.map((pub: any) => (
        <PublicationItem key={pub.id} publication={pub} />
      ))}
    </div>

    {publications.length === 0 && (
      <div className="flex flex-col items-center justify-center h-[200px] gap-4 opacity-30">
        <BookOpen className="w-12 h-12" />
        <span className="text-sm uppercase font-bold">No publications found</span>
      </div>
    )}
  </div>
);

const IntegrationTab = ({ wellnessData, analytics }: any) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cross-Hub Analytics</h4>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        icon={<Microscope className="w-6 h-6 text-blue-400" />}
        label="Total Projects"
        value={analytics?.totalProjects || '0'}
      />
      <MetricCard
        icon={<Users className="w-6 h-6 text-emerald-400" />}
        label="Active Projects"
        value={analytics?.activeProjects || '0'}
      />
      <MetricCard
        icon={<Database className="w-6 h-6 text-purple-400" />}
        label="Blockchain IPs"
        value={analytics?.blockchainIntegrations || '0'}
      />
      <MetricCard
        icon={<BookOpen className="w-6 h-6 text-gold-400" />}
        label="Publications"
        value={analytics?.totalKnowledgeAssets || '0'}
      />
    </div>

    {wellnessData && (
      <div className="bg-black/40 border border-white/10 rounded-xl p-4">
        <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-4">Wellness Hub Integration</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem label="Patients" value={wellnessData.patients} />
          <StatItem label="Doctors" value={wellnessData.doctors} />
          <StatItem label="Appointments" value={wellnessData.appointments} />
          <StatItem label="Status" value={wellnessData.status} />
        </div>
      </div>
    )}

    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
      <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-3">Integration Benefits</div>
      <div className="space-y-3">
        <IntegrationBenefit
          title="Unified Patient Data"
          description="Research projects can access anonymized patient data from wellness hub with proper consent."
        />
        <IntegrationBenefit
          title="Clinical Trial Recruitment"
          description="Direct access to patient pool for clinical research and trials."
        />
        <IntegrationBenefit
          title="AI Model Training"
          description="Real-world medical data enhances AI diagnostic models."
        />
        <IntegrationBenefit
          title="Publication Validation"
          description="Clinical outcomes can be validated against real patient data."
        />
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project }: any) => (
  <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-[#D4AF37]/20 transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Research Project</div>
      <div className={cn(
        "px-2 py-1 rounded-full text-[9px] font-bold uppercase",
        project.status === 'active' ? "bg-green-500/20 text-green-500" :
        project.status === 'completed' ? "bg-blue-500/20 text-blue-500" :
        "bg-amber-500/20 text-amber-500"
      )}>
        {project.status}
      </div>
    </div>
    <h5 className="text-sm font-bold text-white mb-2 line-clamp-1">{project.title}</h5>
    <p className="text-[11px] text-blue-200/60 mb-3 line-clamp-2">{project.description}</p>
    <div className="flex items-center justify-between pt-3 border-t border-white/5">
      <div>
        <div className="text-[10px] text-white/40 uppercase">Lead Researcher</div>
        <div className="text-[11px] text-white font-mono">{project.leadResearcher}</div>
      </div>
      {project.ipRegistration ? (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span className="text-[10px] text-green-500 uppercase">IP Protected</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] text-amber-500 uppercase">Pending IP</span>
        </div>
      )}
    </div>
  </div>
);

const PublicationItem = ({ publication }: any) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <h5 className="text-[11px] font-medium text-white mb-1 line-clamp-1">{publication.title}</h5>
        <div className="text-[10px] text-blue-200/40 uppercase tracking-widest mb-2">
          {publication.authors.join(', ')}
        </div>
        <p className="text-[11px] text-blue-200/60 line-clamp-2 mb-3">
          {publication.abstract}
        </p>
        <div className="flex gap-4 text-[10px] text-blue-200/40">
          <span>DOI: {publication.doi}</span>
          <span>Published: {publication.publicationDate}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <div className="text-[10px] text-white/40 uppercase mb-2">Metrics</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] text-white">{publication.citations} Citations</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-white">{publication.views} Views</span>
          </div>
        </div>
        {publication.ipRegistration && (
          <div className="mt-2 flex items-center gap-1 justify-end">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-[9px] text-green-500 uppercase">IP Registered</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const MetricCard = ({ icon, label, value }: any) => (
  <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
      {icon}
    </div>
    <div className="text-lg font-black text-white italic mb-1">{value}</div>
    <div className="text-[10px] text-blue-200/40 uppercase tracking-widest">{label}</div>
  </div>
);

const StatItem = ({ label, value }: any) => (
  <div className="text-center">
    <div className="text-sm font-bold text-white italic mb-1">{value}</div>
    <div className="text-[10px] text-blue-200/40 uppercase tracking-widest">{label}</div>
  </div>
);

const IntegrationBenefit = ({ title, description }: any) => (
  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
    <div className="text-[11px] font-medium text-white mb-1">{title}</div>
    <p className="text-[10px] text-blue-200/40">{description}</p>
  </div>
);