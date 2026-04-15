import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { UnityHubContextType, UnityHubState, HubId, UserProfile, GlobalMetrics, Notification } from '../types';

// Initial state
const initialState: UnityHubState = {
  user: null,
  metrics: {
    studentsTrained: 0,
    papersPublished: 0,
    datasetsAvailable: 0,
    countriesReached: 0,
    globalClusters: 0,
    peopleImpacted: 0,
    activeResearchers: 0,
    collaborations: 0,
    lastUpdated: new Date(),
  },
  clusters: [],
  courses: [],
  datasets: [],
  publications: [],
  notifications: [],
  activeHub: 'education',
  isLoading: false,
  error: null,
};

// Action types
type UnityHubAction =
  | { type: 'SET_USER'; payload: UserProfile | null }
  | { type: 'UPDATE_METRICS'; payload: Partial<GlobalMetrics> }
  | { type: 'SET_CLUSTERS'; payload: any[] }
  | { type: 'SET_COURSES'; payload: any[] }
  | { type: 'SET_DATASETS'; payload: any[] }
  | { type: 'SET_PUBLICATIONS'; payload: any[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SWITCH_HUB'; payload: HubId }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_ERROR' };

// Reducer function
const unityHubReducer = (state: UnityHubState, action: UnityHubAction): UnityHubState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_METRICS':
      return { ...state, metrics: { ...state.metrics, ...action.payload } };
    case 'SET_CLUSTERS':
      return { ...state, clusters: action.payload };
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    case 'SET_DATASETS':
      return { ...state, datasets: action.payload };
    case 'SET_PUBLICATIONS':
      return { ...state, publications: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        )
      };
    case 'SWITCH_HUB':
      return { ...state, activeHub: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create context
const UnityHubContext = createContext<UnityHubContextType | undefined>(undefined);

export const UnityHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(unityHubReducer, initialState);

  // Context value with helper functions
  const contextValue: UnityHubContextType = {
    state,
    dispatch,
    switchHub: (hubId: HubId) => {
      dispatch({ type: 'SWITCH_HUB', payload: hubId });
    },
    updateMetrics: (newMetrics: Partial<GlobalMetrics>) => {
      dispatch({ type: 'UPDATE_METRICS', payload: newMetrics });
    },
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    },
    markNotificationAsRead: (notificationId: string) => {
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
    },
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // TODO: Replace with actual API calls
        // This is placeholder data for development
        const mockMetrics: Partial<GlobalMetrics> = {
          studentsTrained: 25000,
          papersPublished: 5000,
          datasetsAvailable: 100000,
          countriesReached: 50,
          globalClusters: 30,
          peopleImpacted: 400000000,
          activeResearchers: 25000,
          collaborations: 10000,
          lastUpdated: new Date(),
        };
        
        dispatch({ type: 'UPDATE_METRICS', payload: mockMetrics });
        
        // Mock user for development
        const mockUser: UserProfile = {
          id: 'dev-user-1',
          name: 'Developer User',
          email: 'dev@example.com',
          role: 'admin',
          language: 'english',
          location: 'Cairo, Egypt',
          createdAt: new Date(),
          lastActive: new Date(),
        };
        
        dispatch({ type: 'SET_USER', payload: mockUser });
        
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load initial data' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    loadInitialData();
  }, []);

  return (
    <UnityHubContext.Provider value={contextValue}>
      {children}
    </UnityHubContext.Provider>
  );
};

export const useUnityHub = () => {
  const context = useContext(UnityHubContext);
  if (context === undefined) {
    throw new Error('useUnityHub must be used within a UnityHubProvider');
  }
  return context;
};

export default UnityHubContext;