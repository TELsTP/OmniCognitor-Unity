import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseService } from '../services/supabase';

interface UnityContextType {
  isArchitectMode: boolean;
  setIsArchitectMode: (mode: boolean) => void;
  currentPillar: string;
  setCurrentPillar: (pillar: string) => void;
  unlockCode: string;
  githubToken: string | null;
  setGithubToken: (token: string | null) => void;
  quantumLogs: string[];
  addQuantumLog: (log: string) => void;
}

const UnityContext = createContext<UnityContextType | undefined>(undefined);

export const UNLOCK_CODE = 'Nakamitshe-Telstp-235153';

export const UnityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isArchitectMode, setIsArchitectMode] = useState(false);
  const [currentPillar, setCurrentPillar] = useState('dashboard');
  const [unlockCode] = useState(UNLOCK_CODE);
  const [githubToken, setGithubToken] = useState<string | null>(localStorage.getItem('github_token'));
  const [quantumLogs, setQuantumLogs] = useState<string[]>([
    "INITIALIZING SOVEREIGN BRIDGE...",
    "CONNECTING TO GITHUB PARTNER: HAYAT...",
    "STATUS: HANDSHAKE IN PROGRESS...",
    "ARCHITECT ACCESS GRANTED: MOHAMED AYOUB",
    "UNITY PROTOCOL NAKAMITSHE-TELSTP-235153 ACTIVE"
  ]);

  const addQuantumLog = (log: string) => {
    setQuantumLogs(prev => [log, ...prev].slice(0, 50));
  };

  useEffect(() => {
    if (githubToken) {
      localStorage.setItem('github_token', githubToken);
    } else {
      localStorage.removeItem('github_token');
    }
  }, [githubToken]);

  useEffect(() => {
    if (isArchitectMode) {
      supabaseService.logArchitectAction('session_start', { timestamp: new Date().toISOString() });
      addQuantumLog(`ARCHITECT MODE ACTIVATED: ${new Date().toLocaleTimeString()}`);
    }
  }, [isArchitectMode]);

  return (
    <UnityContext.Provider value={{
      isArchitectMode,
      setIsArchitectMode,
      currentPillar,
      setCurrentPillar,
      unlockCode,
      githubToken,
      setGithubToken,
      quantumLogs,
      addQuantumLog
    }}>
      {children}
    </UnityContext.Provider>
  );
};

export const useUnity = () => {
  const context = useContext(UnityContext);
  if (context === undefined) {
    throw new Error('useUnity must be used within a UnityProvider');
  }
  return context;
};
