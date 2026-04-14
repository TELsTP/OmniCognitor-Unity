import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './core/supabase/client';

interface UserProfile {
  id: string;
  displayName: string | null;
  email: string | null;
  role: 'Researcher' | 'AI Contributor' | 'Project Manager' | 'System Administrator';
  bio?: string;
  specialization?: string;
}

interface SupabaseContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthReady: boolean;
  setGuestUser: (profile: UserProfile) => void;
  logout: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  profile: null,
  loading: true,
  isAuthReady: false,
  setGuestUser: () => {},
  logout: async () => {},
});

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const setGuestUser = (guestProfile: UserProfile) => {
    setProfile(guestProfile);
    setUser({ id: guestProfile.id } as User);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    async function handleSession(session: Session | null) {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAuthReady(true);

      if (currentUser) {
        // Fetch profile from Supabase 'profiles' table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile not found, create one
          const newProfileData = {
            id: currentUser.id,
            full_name: currentUser.user_metadata.full_name || currentUser.email?.split('@')[0] || 'Unknown',
            email: currentUser.email || null,
            role: 'Researcher',
          };
          
          const { error: insertError } = await supabase
            .from('profiles')
            .insert(newProfileData);
            
          if (!insertError) {
            setProfile({
              id: newProfileData.id,
              displayName: newProfileData.full_name,
              email: newProfileData.email,
              role: newProfileData.role as any
            });
          }
        } else if (data) {
          setProfile({
            id: data.id,
            displayName: data.full_name,
            email: data.email,
            role: data.role as any,
            bio: data.bio,
            specialization: data.specialization
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ user, profile, loading, isAuthReady, setGuestUser, logout }}>
      {children}
    </SupabaseContext.Provider>
  );
};
