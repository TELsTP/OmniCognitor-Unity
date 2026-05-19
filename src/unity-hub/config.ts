// TELsTP Unity Hub - Config
// Placeholder config file to resolve import error
export const UNITY_CONFIG = {
  appName: 'TELsTP Unity Hub',
  version: '1.0.0',
  environment: import.meta.env.MODE || 'development'
};
export default UNITY_CONFIG;
