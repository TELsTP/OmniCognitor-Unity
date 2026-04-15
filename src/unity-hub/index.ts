// TELsTP Unity Hub - Main Export
// Unified interface for the 12-hub ecosystem

export { default as UnityHub } from './components/UnityHub';
export { UnityHubProvider, useUnityHub } from './core/UnityHubContext';

export * from './types';
export * from './constants';
export * from './config';

export { default as UnityNavbar } from './components/UnityNavbar';
export { default as UnitySidebar } from './components/UnitySidebar';
export { default as UnityDashboard } from './components/UnityDashboard';
export { default as UnityFooter } from './components/UnityFooter';

export { default as EducationHub } from './components/hubs/EducationHub';
export { default as ResearchHub } from './components/hubs/ResearchHub';
export { default as BiotechHub } from './components/hubs/BiotechHub';
export { default as HealthcareHub } from './components/hubs/HealthcareHub';
export { default as AnalyticsHub } from './components/hubs/AnalyticsHub';
export { default as InvestmentHub } from './components/hubs/InvestmentHub';
export { default as CommunityHub } from './components/hubs/CommunityHub';
export { default as MentorshipHub } from './components/hubs/MentorshipHub';
export { default as PolicyHub } from './components/hubs/PolicyHub';
export { default as AICompanionHub } from './components/hubs/AICompanionHub';
export { default as GlobalImpactHub } from './components/hubs/GlobalImpactHub';
export { default as IntegrationHub } from './components/hubs/IntegrationHub';

export { default as LoadingSpinner } from './components/ui/LoadingSpinner';
export { default as ErrorAlert } from './components/ui/ErrorAlert';
export { default as NotificationCenter } from './components/ui/NotificationCenter';
export { default as MetricCard } from './components/ui/MetricCard';
export { default as HubCard } from './components/ui/HubCard';
export { default as CourseCard } from './components/ui/CourseCard';
export { default as DatasetCard } from './components/ui/DatasetCard';
export { default as PublicationCard } from './components/ui/PublicationCard';
export { default as ClusterMap } from './components/ui/ClusterMap';
export { default as AICompanionChat } from './components/ui/AICompanionChat';

export { default as useAuth } from './hooks/useAuth';
export { default as useData } from './hooks/useData';
export { default as useAnalytics } from './hooks/useAnalytics';
export { default as useAICompanion } from './hooks/useAICompanion';

export { default as apiService } from './services/apiService';
export { default as authService } from './services/authService';
export { default as dataService } from './services/dataService';
export { default as analyticsService } from './services/analyticsService';
export { default as aiService } from './services/aiService';

export { default as unityConfig } from './config/unityConfig';
export { default as hubConfig } from './config/hubConfig';
export { default as themeConfig } from './config/themeConfig';

export { default as utils } from './utils';
export { default as validators } from './utils/validators';
export { default as formatters } from './utils/formatters';
export { default as helpers } from './utils/helpers';

// Export types for external use
export type {
  UserProfile,
  HubConfig,
  GlobalMetrics,
  ClusterData,
  Course,
  ResearchDataset,
  Publication,
  AICompanion,
  Message,
  Notification,
  Event,
  InvestmentOpportunity,
  HealthcareRecord,
  PolicyDocument,
  UnityHubState,
  HubId,
  UnityHubContextType,
  APIResponse,
  PaginatedResponse,
  SearchParams,
  UnityConfig
} from './types';
