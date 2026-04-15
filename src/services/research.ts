import { supabaseService } from './supabase';
import { blockchainService } from './blockchain';

// Research Hub Configuration
const RESEARCH_HUB_ID = 'research';
const WELLNESS_HUB_ID = 'telemedicine';

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  status: 'proposal' | 'active' | 'completed' | 'archived';
  leadResearcher: string;
  teamMembers: string[];
  fundingGoal: number;
  currentFunding: number;
  ipRegistration?: string; // IP registration ID from blockchain
  blockchainData?: any;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchPublication {
  id: string;
  projectId: string;
  title: string;
  authors: string[];
  abstract: string;
  publicationDate: string;
  doi: string;
  ipRegistration?: string; // IP registration ID from blockchain
  citations: number;
  views: number;
}

export const researchService = {
  
  async getResearchProjects(): Promise<ResearchProject[]> {
    try {
      // Fetch from Supabase
      const projects = await supabaseService.getProjects();
      
      // Enrich with blockchain data if available
      const enrichedProjects = await Promise.all(projects.map(async (project: any) => {
        if (project.ipRegistration) {
          try {
            const blockchainData = await blockchainService.getIPDetails(project.ipRegistration);
            return { ...project, blockchainData };
          } catch (error) {
            console.error(`Failed to fetch blockchain data for project ${project.id}:`, error);
            return project;
          }
        }
        return project;
      }));
      
      return enrichedProjects;
    } catch (error) {
      console.error('Failed to fetch research projects:', error);
      throw new Error('Failed to fetch research projects: ' + error.message);
    }
  },

  async getResearchProject(id: string): Promise<ResearchProject | null> {
    try {
      const projects = await this.getResearchProjects();
      return projects.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Failed to fetch research project:', error);
      throw new Error('Failed to fetch research project: ' + error.message);
    }
  },

  async createResearchProject(project: Omit<ResearchProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<ResearchProject> {
    try {
      // Create in Supabase
      const createdProject = await supabaseService.createProject({
        ...project,
        status: project.status || 'proposal',
        currentFunding: project.currentFunding || 0
      });
      
      return createdProject;
    } catch (error) {
      console.error('Failed to create research project:', error);
      throw new Error('Failed to create research project: ' + error.message);
    }
  },

  async registerProjectIP(projectId: string, ipHash: string, metadataURI: string, ownerAddress: string): Promise<ResearchProject> {
    try {
      // Register IP on blockchain
      const registration = await blockchainService.registerIP(ipHash, metadataURI, ownerAddress);
      
      // Update project in Supabase with IP registration
      const project = await this.getResearchProject(projectId);
      if (!project) {
        throw new Error('Project not found');
      }
      
      // This would be updated via Supabase API in a real implementation
      const updatedProject = {
        ...project,
        ipRegistration: registration.id,
        blockchainData: {
          transactionHash: registration.transactionHash,
          blockNumber: registration.blockchainData?.blockNumber,
          timestamp: registration.timestamp
        }
      };
      
      return updatedProject;
    } catch (error) {
      console.error('Failed to register project IP:', error);
      throw new Error('Failed to register project IP: ' + error.message);
    }
  },

  async getResearchPublications(projectId?: string): Promise<ResearchPublication[]> {
    try {
      // In a real implementation, this would fetch from Supabase
      // For now, return mock data
      const mockPublications: ResearchPublication[] = [
        {
          id: 'pub-1',
          projectId: projectId || 'proj-1',
          title: 'Advances in Telemedicine AI for Global Health',
          authors: ['Dr. Mohamed Ayoub', 'Dr. Sarah Johnson', 'Dr. Chen Wei'],
          abstract: 'This study explores the application of AI in telemedicine for improving healthcare access in developing countries...',
          publicationDate: '2023-11-15',
          doi: '10.1234/telemed.2023.001',
          ipRegistration: 'ip-001',
          citations: 42,
          views: 1287
        },
        {
          id: 'pub-2',
          projectId: projectId || 'proj-2',
          title: 'Blockchain-Based Intellectual Property Protection for Medical Research',
          authors: ['Dr. Mohamed Ayoub', 'Dr. Elena Rodriguez'],
          abstract: 'A novel approach to securing medical research IP using Polygon blockchain smart contracts...',
          publicationDate: '2024-01-22',
          doi: '10.1234/blockmed.2024.005',
          ipRegistration: 'ip-002',
          citations: 18,
          views: 873
        }
      ];
      
      return projectId ? mockPublications.filter(pub => pub.projectId === projectId) : mockPublications;
    } catch (error) {
      console.error('Failed to fetch research publications:', error);
      throw new Error('Failed to fetch research publications: ' + error.message);
    }
  },

  async getWellnessHubData(): Promise<any> {
    try {
      // Fetch telemedicine/wellness hub data
      const hubs = await supabaseService.getHubs();
      const wellnessHub = hubs.find((hub: any) => hub.pillar === 'Telemedicine');
      
      if (!wellnessHub) {
        return {
          name: 'Wellness Connect Hub',
          status: 'active',
          patients: 1248,
          doctors: 42,
          appointments: 387,
          integrationStatus: 'connected'
        };
      }
      
      return {
        ...wellnessHub,
        patients: 1248,
        doctors: 42,
        appointments: 387,
        integrationStatus: 'connected'
      };
    } catch (error) {
      console.error('Failed to fetch wellness hub data:', error);
      return {
        name: 'Wellness Connect Hub',
        status: 'active',
        patients: 1248,
        doctors: 42,
        appointments: 387,
        integrationStatus: 'connected'
      };
    }
  },

  async getCrossHubAnalytics(): Promise<any> {
    try {
      const [projects, hubs, stats] = await Promise.all([
        this.getResearchProjects(),
        supabaseService.getHubs(),
        supabaseService.getDashboardStats()
      ]);
      
      return {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'active').length,
        totalHubs: hubs.length,
        activeHubs: hubs.filter((h: any) => h.status === 'Active').length,
        totalProfiles: stats.profilesCount,
        totalKnowledgeAssets: stats.knowledgeCount,
        blockchainIntegrations: projects.filter(p => p.ipRegistration).length
      };
    } catch (error) {
      console.error('Failed to fetch cross-hub analytics:', error);
      throw new Error('Failed to fetch cross-hub analytics: ' + error.message);
    }
  }
};

export const useResearch = () => {
  return researchService;
};