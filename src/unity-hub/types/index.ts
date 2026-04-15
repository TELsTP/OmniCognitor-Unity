// TELsTP Unity Hub - Core Types and Interfaces
// Based on Manus AI Structural Design (January 6, 2026)

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'researcher' | 'healthcare-professional' | 'investor' | 'policymaker' | 'admin';
  language: 'arabic' | 'english' | 'french' | 'other';
  location: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  lastActive: Date;
}

export interface HubConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  isActive: boolean;
  accessRoles: UserProfile['role'][];
}

export interface GlobalMetrics {
  studentsTrained: number;
  papersPublished: number;
  datasetsAvailable: number;
  countriesReached: number;
  globalClusters: number;
  peopleImpacted: number;
  activeResearchers: number;
  collaborations: number;
  lastUpdated: Date;
}

export interface ClusterData {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  activityLevel: 'low' | 'medium' | 'high';
  researchers: number;
  publications: number;
  collaborations: number;
  students: number;
  healthcareImpact: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: UserProfile['language'];
  duration: string;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  isFeatured: boolean;
  createdAt: Date;
}

export interface ResearchDataset {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  citations: number;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  accessLevel: 'public' | 'restricted' | 'private';
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  publicationDate: Date;
  citations: number;
  views: number;
  downloads: number;
  doi: string;
  status: 'draft' | 'submitted' | 'under-review' | 'published' | 'rejected';
}

export interface AICompanion {
  id: string;
  name: string;
  character: 'ibn-sina' | 'education-mentor' | 'wellness-coach' | 'research-assistant' | 'career-advisor';
  description: string;
  avatar: string;
  expertise: string[];
  language: UserProfile['language'];
  isActive: boolean;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  conversationId: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  link?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizer: string;
  attendees: string[];
  capacity: number;
  isVirtual: boolean;
  virtualLink?: string;
}

export interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  sector: string;
  fundingGoal: number;
  currentFunding: number;
  stage: 'seed' | 'series-a' | 'series-b' | 'growth';
  founder: string;
  location: string;
  createdAt: Date;
  deadline?: Date;
}

export interface HealthcareRecord {
  id: string;
  patientId: string;
  type: 'medical-history' | 'lab-result' | 'imaging' | 'diagnosis' | 'treatment' | 'prescription';
  data: any;
  createdAt: Date;
  createdBy: string;
  isConfidential: boolean;
}

export interface PolicyDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'proposed' | 'under-review' | 'approved' | 'rejected';
  authors: string[];
  createdAt: Date;
  updatedAt: Date;
  relatedResearch: string[];
}

export interface UnityHubState {
  user: UserProfile | null;
  metrics: GlobalMetrics;
  clusters: ClusterData[];
  courses: Course[];
  datasets: ResearchDataset[];
  publications: Publication[];
  notifications: Notification[];
  activeHub: string;
  isLoading: boolean;
  error: string | null;
}

export type HubId = 
  'education' | 'research' | 'biotech' | 'healthcare' | 
  'analytics' | 'investment' | 'community' | 'mentorship' | 
  'policy' | 'ai-companion' | 'global-impact' | 'integration';

export interface UnityHubContextType {
  state: UnityHubState;
  dispatch: React.Dispatch<any>;
  switchHub: (hubId: HubId) => void;
  updateMetrics: (newMetrics: Partial<GlobalMetrics>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface UnityConfig {
  apiUrl: string;
  firebaseConfig?: any;
  supabaseUrl?: string;
  supabaseKey?: string;
  defaultLanguage: UserProfile['language'];
  maxUploadSize: number;
  supportedLanguages: UserProfile['language'][];
  hubs: HubConfig[];
}
