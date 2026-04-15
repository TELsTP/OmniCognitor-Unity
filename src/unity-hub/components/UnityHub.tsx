import React, { useEffect } from 'react';
import { useUnityHub } from '../core/UnityHubContext';
import { HubId } from '../types';
import EducationHub from './hubs/EducationHub';
import ResearchHub from './hubs/ResearchHub';
import BiotechHub from './hubs/BiotechHub';
import HealthcareHub from './hubs/HealthcareHub';
import AnalyticsHub from './hubs/AnalyticsHub';
import InvestmentHub from './hubs/InvestmentHub';
import CommunityHub from './hubs/CommunityHub';
import MentorshipHub from './hubs/MentorshipHub';
import PolicyHub from './hubs/PolicyHub';
import AICompanionHub from './hubs/AICompanionHub';
import GlobalImpactHub from './hubs/GlobalImpactHub';
import IntegrationHub from './hubs/IntegrationHub';
import UnityNavbar from './UnityNavbar';
import UnitySidebar from './UnitySidebar';
import UnityDashboard from './UnityDashboard';
import UnityFooter from './UnityFooter';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorAlert from './ui/ErrorAlert';
import NotificationCenter from './ui/NotificationCenter';

const UnityHub: React.FC = () => {
  const { state, switchHub } = useUnityHub();
  
  useEffect(() => {
    // Set default hub on initial load
    if (!state.activeHub) {
      switchHub('education');
    }
  }, [state.activeHub, switchHub]);

  const renderActiveHub = () => {
    switch (state.activeHub) {
      case 'education':
        return <EducationHub />;
      case 'research':
        return <ResearchHub />;
      case 'biotech':
        return <BiotechHub />;
      case 'healthcare':
        return <HealthcareHub />;
      case 'analytics':
        return <AnalyticsHub />;
      case 'investment':
        return <InvestmentHub />;
      case 'community':
        return <CommunityHub />;
      case 'mentorship':
        return <MentorshipHub />;
      case 'policy':
        return <PolicyHub />;
      case 'ai-companion':
        return <AICompanionHub />;
      case 'global-impact':
        return <GlobalImpactHub />;
      case 'integration':
        return <IntegrationHub />;
      default:
        return <EducationHub />;
    }
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 relative">
      {/* Notification Center */}
      <NotificationCenter />

      {/* Error Alert */}
      {state.error && (
        <div className="fixed top-4 right-4 z-50">
          <ErrorAlert message={state.error} onClose={() => {}} />
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <UnityNavbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <UnitySidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {/* Dashboard Overview */}
            <UnityDashboard />

            {/* Active Hub Content */}
            <div className="mt-8">
              {renderActiveHub()}
            </div>
          </main>
        </div>

        {/* Footer */}
        <UnityFooter />
      </div>
    </div>
  );
};

export default UnityHub;