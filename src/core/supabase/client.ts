import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dbrxrhjveezxtfwvialj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicnhyaGp2ZWV6eHRmd3ZpYWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTE3NTIsImV4cCI6MjA4OTc2Nzc1Mn0.rMOeeYR_2pHCypYm4gISqHkeV7ZxW8_ReTQC12uBWjM';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Unity handshake may be limited.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Universal Session Trigger Logic
export const UNLOCK_CODE = 'Nakamitshe-Telstp-235153';

export async function validateArchitectAccess(code: string) {
  return code === UNLOCK_CODE;
}
