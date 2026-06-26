// TELsTP Unity Hub - Main Export
// Unified interface for the 12-hub ecosystem

export { default as UnityHub } from './components/UnityHub';
export { UnityHubProvider, useUnityHub } from './core/UnityHubContext';

export * from './types';
export * from './constants';
export * from './config';

// Hub Components
export { default as EducationHub } from './components/hubs/EducationHub';
export { default as ResearchHub } from './components/hubs/ResearchHub';
export { default as BiotechHub } from './components/hubs/BiotechHub';

// UI Components
export { default as LoadingSpinner } from './components/ui/LoadingSpinner';
export { default as ErrorAlert } from './components/ui/ErrorAlert';
export { default as NotificationCenter } from './components/ui/NotificationCenter';

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
