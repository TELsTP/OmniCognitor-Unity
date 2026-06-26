// TELsTP Unity Hub - Configuration
// Comprehensive configuration file with all constants and settings

export const UNITY_CONFIG = {
  // Application Metadata
  appName: 'TELsTP Unity Hub',
  version: '1.0.0',
  environment: import.meta.env.MODE || 'development',
  description: 'The central hub for TELsTP ecosystem - connecting Life Science Technology Park with global partners',
  
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.telstp-unity.com',
    timeout: 30000,
    retryAttempts: 3,
  },
  
  // Pagination Settings
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
    pageSizes: [10, 20, 50, 100],
  },
  
  // Animation Settings
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
      slower: 800,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
  
  // Theme Colors
  theme: {
    gold: {
      primary: '#D4AF37',
      light: '#F4E4BC',
      dark: '#B8860B',
      glow: 'rgba(212, 175, 55, 0.5)',
    },
    stone: {
      dark: '#291508',
      darker: '#1C1007',
      light: '#785548',
      lighter: '#A88568',
    },
    cosmic: {
      blue: '#1E3A8A',
      purple: '#4C1D95',
      deep: '#0F172A',
    },
  },
  
  // Pillar Configuration
  pillars: {
    // Default pillar dimensions
    dimensions: {
      width: 96,
      height: 256,
      baseHeight: 16,
      capitalHeight: 24,
    },
    // Arrangement settings
    arrangement: {
      radius: 300,
      angleSpread: 1.2,
      angleOffset: 0.2,
    },
    // Animation settings
    animation: {
      rotationSpeed: 0.5,
      hoverScale: 1.02,
    },
  },
  
  // Globe Configuration
  globe: {
    size: {
      mobile: 240,
      desktop: 320,
      largeDesktop: 384,
    },
    rotation: {
      autoRotate: true,
      autoRotateSpeed: 0.2,
      dragSensitivity: 0.2,
    },
    markers: {
      minSize: 6,
      maxSize: 12,
      pulseDuration: 2000,
    },
  },
  
  // Vision Text Configuration
  vision: {
    animation: {
      wordDelay: 80,
      segmentPause: 500,
      blinkSpeed: 1000,
    },
  },
  
  // Obelisk Configuration
  obelisk: {
    dimensions: {
      width: 280,
      minHeight: 400,
      cartouchePadding: '0.75rem 1.5rem',
    },
    animation: {
      cartoucheCycle: 3000,
      cartoucheShiftDuration: 500,
    },
  },
  
  // Language Settings
  languages: {
    supported: ['en', 'ar', 'fr', 'es', 'zh', 'ur'],
    default: 'en',
    rtl: ['ar', 'ur'],
  },
  
  // Storage Keys
  storage: {
    language: 'telstp-unity-language',
    unlockedPillars: 'telstp-unity-unlocked-pillars',
    visionComplete: 'telstp-unity-vision-complete',
  },
  
  // Feature Flags
  features: {
    enableGlobe: true,
    enableAnimations: true,
    enableSound: false,
    enableTooltips: true,
    enableAnalytics: false,
  },
  
  // Breakpoints
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Z-Index Layers
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popup: 600,
    tooltip: 700,
    notification: 800,
    max: 9999,
  },
  
  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  
  // Box Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    goldGlow: '0 0 20px rgba(212, 175, 55, 0.5)',
    goldGlowSm: '0 0 10px rgba(212, 175, 55, 0.3)',
    obelisk: '0 0 40px rgba(212, 175, 55, 0.2), 0 10px 40px rgba(0, 0, 0, 0.3)',
    globe: '0 0 80px rgba(212, 175, 55, 0.2), 0 0 120px rgba(0, 0, 0, 0.3)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// Export individual sections for easier imports
export const { animation, theme, pillars, globe, vision, obelisk, languages, features, breakpoints, zIndex, borderRadius, shadows, transitions } = UNITY_CONFIG;

export default UNITY_CONFIG;
