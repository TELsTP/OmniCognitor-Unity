import { supabase, UNLOCK_CODE } from '../core/supabase/client';

export interface ArchitectLog {
  id?: string;
  architect_id: string;
  action_type: string;
  details: any;
  created_at?: string;
}

export interface UnifiedMemory {
  id?: string;
  context_key: string;
  memory_data: any;
  last_accessed?: string;
}

export class SupabaseService {
  async logArchitectAction(actionType: string, details: any) {
    const { data, error } = await supabase
      .from('architect_master_logs')
      .insert({
        architect_id: UNLOCK_CODE, // Using the master key as ID for now
        action_type: actionType,
        details: details
      });

    if (error) {
      console.error('Supabase Log Error:', error);
    }
    return data;
  }

  async saveMemory(contextKey: string, memoryData: any) {
    const { data, error } = await supabase
      .from('unified_memory')
      .upsert({
        context_key: contextKey,
        memory_data: memoryData,
        last_accessed: new Date().toISOString()
      }, { onConflict: 'context_key' });

    if (error) {
      console.error('Supabase Memory Error:', error);
    }
    return data;
  }

  async getMemory(contextKey: string) {
    const { data, error } = await supabase
      .from('unified_memory')
      .select('*')
      .eq('context_key', contextKey)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore "not found" errors
      console.error('Supabase Memory Fetch Error:', error);
    }
    return data;
  }

  async getProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      console.error('Supabase Profile Fetch Error:', error);
    }
    return data;
  }

  // Telemedicine Hub Methods (Aligned with Master Schema)
  async getDoctors() {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  }

  async getAppointments(userId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        doctors (
          name,
          specialization
        )
      `)
      .eq('patient_id', userId)
      .order('date', { ascending: true });
    if (error) throw error;
    return data;
  }

  async getHealthRecords(userId: string) {
    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .eq('patient_id', userId)
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  }

  // --- Projects Pillar (Research) ---
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async createProject(project: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // --- OmniCog Global Hubs ---
  async getHubs() {
    const { data, error } = await supabase
      .from('hubs')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  }

  // --- OmniCog Neural Layer ---
  async saveOmniMemory(contextKey: string, memoryData: any, level: number = 1) {
    const { data, error } = await supabase
      .from('omnicog_memory')
      .upsert({
        context_key: contextKey,
        memory_data: memoryData,
        intelligence_level: level,
        last_accessed: new Date().toISOString()
      }, { onConflict: 'context_key' });
    if (error) throw error;
    return data;
  }

  async getOmniMemory(contextKey: string) {
    const { data, error } = await supabase
      .from('omnicog_memory')
      .select('*')
      .eq('context_key', contextKey)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // --- Architect Handshakes ---
  async logHandshake(userId: string, hubId: string, success: boolean = true) {
    const { data, error } = await supabase
      .from('architect_handshakes')
      .insert({
        architect_id: userId,
        hub_id: hubId,
        handshake_code: UNLOCK_CODE,
        success: success
      });
    if (error) throw error;
    return data;
  }

  // --- Knowledge Base (Wisdom/Research) ---
  async getKnowledge(category?: string) {
    let query = supabase.from('knowledge_base').select('*');
    if (category) query = query.eq('category', category);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  // --- Multimedia Stream (Radio TELSTP) ---
  async getStreams() {
    const { data, error } = await supabase
      .from('multimedia_stream')
      .select('*')
      .eq('active', true);
    if (error) throw error;
    return data;
  }

  // --- Analytics & Dashboard ---
  async getDashboardStats() {
    const [hubs, profiles, knowledge] = await Promise.all([
      supabase.from('hubs').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('knowledge_base').select('*', { count: 'exact', head: true }),
    ]);
    
    return {
      hubsCount: hubs.count || 0,
      profilesCount: profiles.count || 0,
      knowledgeCount: knowledge.count || 0,
    };
  }
}

export const supabaseService = new SupabaseService();
