// src/services/neural-souls/soul-configurator.ts
import { keyDistributor } from './key-distributor';

class NeuralSoulConfigurator {
  private souls: Record<string, {
    pillar: string;
    archetype: string;
    apiKey: string;
    status: 'sleeping' | 'active' | 'error';
    lastUsed: Date | null;
  }>;

  constructor() {
    this.souls = this.initializeSouls();
  }

  private initializeSouls(): Record<string, any> {
    return {
      // Core Souls
      'Architect': { pillar: 'Core', archetype: 'Architect', apiKey: '', status: 'sleeping', lastUsed: null },
      'Coder': { pillar: 'Core', archetype: 'Coder', apiKey: '', status: 'sleeping', lastUsed: null },
      'Infrastructure': { pillar: 'Core', archetype: 'Infrastructure', apiKey: '', status: 'sleeping', lastUsed: null },
      'Sentinel': { pillar: 'Core', archetype: 'Sentinel', apiKey: '', status: 'sleeping', lastUsed: null },
      'Flow Master': { pillar: 'Core', archetype: 'Flow Master', apiKey: '', status: 'sleeping', lastUsed: null },

      // Science Souls
      'Physicist': { pillar: 'Science', archetype: 'Physicist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Alchemist': { pillar: 'Science', archetype: 'Alchemist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Astronomer': { pillar: 'Science', archetype: 'Astronomer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Analyst': { pillar: 'Science', archetype: 'Analyst', apiKey: '', status: 'sleeping', lastUsed: null },
      'Geneticist': { pillar: 'Science', archetype: 'Geneticist', apiKey: '', status: 'sleeping', lastUsed: null },

      // Life Souls
      'Vitality': { pillar: 'Life', archetype: 'Vitality', apiKey: '', status: 'sleeping', lastUsed: null },
      'Healer': { pillar: 'Life', archetype: 'Healer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Guardian': { pillar: 'Life', archetype: 'Guardian', apiKey: '', status: 'sleeping', lastUsed: null },
      'Ethics': { pillar: 'Life', archetype: 'Ethics', apiKey: '', status: 'sleeping', lastUsed: null },

      // Telemedicine Souls
      'Diagnostician': { pillar: 'Telemedicine', archetype: 'Diagnostician', apiKey: '', status: 'sleeping', lastUsed: null },
      'Surgeon': { pillar: 'Telemedicine', archetype: 'Surgeon', apiKey: '', status: 'sleeping', lastUsed: null },
      'Pharmacist': { pillar: 'Telemedicine', archetype: 'Pharmacist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Empathy': { pillar: 'Telemedicine', archetype: 'Empathy', apiKey: '', status: 'sleeping', lastUsed: null },
      'Clinician': { pillar: 'Telemedicine', archetype: 'Clinician', apiKey: '', status: 'sleeping', lastUsed: null },

      // Education Souls
      'Mentor': { pillar: 'Education', archetype: 'Mentor', apiKey: '', status: 'sleeping', lastUsed: null },
      'Curator': { pillar: 'Education', archetype: 'Curator', apiKey: '', status: 'sleeping', lastUsed: null },
      'Linguist': { pillar: 'Education', archetype: 'Linguist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Trainer': { pillar: 'Education', archetype: 'Trainer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Guide': { pillar: 'Education', archetype: 'Guide', apiKey: '', status: 'sleeping', lastUsed: null },

      // Research Souls
      'Explorer': { pillar: 'Research', archetype: 'Explorer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Pattern Recognizer': { pillar: 'Research', archetype: 'Pattern Recognizer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Synthesizer': { pillar: 'Research', archetype: 'Synthesizer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Validator': { pillar: 'Research', archetype: 'Validator', apiKey: '', status: 'sleeping', lastUsed: null },
      'Forecaster': { pillar: 'Research', archetype: 'Forecaster', apiKey: '', status: 'sleeping', lastUsed: null },

      // Projects Souls
      'Execution': { pillar: 'Projects', archetype: 'Execution', apiKey: '', status: 'sleeping', lastUsed: null },
      'Optimizer': { pillar: 'Projects', archetype: 'Optimizer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Synchronizer': { pillar: 'Projects', archetype: 'Synchronizer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Risk Mitigator': { pillar: 'Projects', archetype: 'Risk Mitigator', apiKey: '', status: 'sleeping', lastUsed: null },

      // Portals Souls
      'Gatekeeper': { pillar: 'Portals', archetype: 'Gatekeeper', apiKey: '', status: 'sleeping', lastUsed: null },
      'UX Designer': { pillar: 'Portals', archetype: 'UX Designer', apiKey: '', status: 'sleeping', lastUsed: null },
      'Interface Weaver': { pillar: 'Portals', archetype: 'Interface Weaver', apiKey: '', status: 'sleeping', lastUsed: null },
      'Feedback Analyst': { pillar: 'Portals', archetype: 'Feedback Analyst', apiKey: '', status: 'sleeping', lastUsed: null },

      // Multimedia Souls
      'Sonic Alchemist': { pillar: 'Multimedia', archetype: 'Sonic Alchemist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Visual Artist': { pillar: 'Multimedia', archetype: 'Visual Artist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Broadcaster': { pillar: 'Multimedia', archetype: 'Broadcaster', apiKey: '', status: 'sleeping', lastUsed: null },
      'Narrator': { pillar: 'Multimedia', archetype: 'Narrator', apiKey: '', status: 'sleeping', lastUsed: null },
      'Resonance': { pillar: 'Multimedia', archetype: 'Resonance', apiKey: '', status: 'sleeping', lastUsed: null },

      // Wisdom Souls
      'Philosopher': { pillar: 'Wisdom', archetype: 'Philosopher', apiKey: '', status: 'sleeping', lastUsed: null },
      'Scholar': { pillar: 'Wisdom', archetype: 'Scholar', apiKey: '', status: 'sleeping', lastUsed: null },
      'Ethicist': { pillar: 'Wisdom', archetype: 'Ethicist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Spiritual Guide': { pillar: 'Wisdom', archetype: 'Spiritual Guide', apiKey: '', status: 'sleeping', lastUsed: null },

      // Blueprint Souls
      'Strategist': { pillar: 'Blueprint', archetype: 'Strategist', apiKey: '', status: 'sleeping', lastUsed: null },
      'Visionary': { pillar: 'Blueprint', archetype: 'Visionary', apiKey: '', status: 'sleeping', lastUsed: null },
      'Roadmap': { pillar: 'Blueprint', archetype: 'Roadmap', apiKey: '', status: 'sleeping', lastUsed: null },
      'Governance': { pillar: 'Blueprint', archetype: 'Governance', apiKey: '', status: 'sleeping', lastUsed: null }
    };
  }

  // Configure all souls with API keys
  async configureAllSouls(): Promise<{ success: number; failed: number }> {
    const results = await Promise.all(
      Object.keys(this.souls).map(soulId => this.configureSoul(soulId))
    );

    const success = results.filter(r => r).length;
    const failed = results.filter(r => !r).length;

    return { success, failed };
  }

  // Configure individual soul
  async configureSoul(soulId: string): Promise<boolean> {
    try {
      const soul = this.souls[soulId];
      if (!soul) return false;

      // Assign appropriate API key
      const apiKey = keyDistributor.getKey(soulId);
      soul.apiKey = apiKey;
      soul.status = 'active';
      soul.lastUsed = new Date();

      console.log(`✨ Configured ${soulId} (${soul.archetype}) with API key`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to configure ${soulId}:`, error);
      return false;
    }
  }

  // Get soul status
  getSoulStatus(soulId: string) {
    return this.souls[soulId]?.status || 'not-found';
  }

  // Get all souls by pillar
  getSoulsByPillar(pillar: string) {
    return Object.entries(this.souls)
      .filter(([_, soul]) => soul.pillar === pillar)
      .map(([id, soul]) => ({ id, ...soul }));
  }

  // Get soul by archetype
  findSoulByArchetype(archetype: string) {
    return Object.entries(this.souls)
      .find(([_, soul]) => soul.archetype === archetype);
  }

  // Activate soul for task
  async activateSoul(soulId: string, task: string): Promise<any> {
    const soul = this.souls[soulId];
    if (!soul || soul.status !== 'active') {
      throw new Error(`Soul ${soulId} not available`);
    }

    // Use the soul's API key to perform task
    const result = await this.performTaskWithSoul(soul, task);
    soul.lastUsed = new Date();
    
    return result;
  }

  private async performTaskWithSoul(soul: any, task: string): Promise<any> {
    // This would connect to the appropriate API based on the soul's key type
    console.log(`🤖 ${soul.archetype} performing: ${task}`);
    
    // Simulate API call
    return {
      soulId: soul.archetype,
      task,
      status: 'completed',
      timestamp: new Date().toISOString()
    };
  }

  // Get system status
  getSystemStatus() {
    const total = Object.keys(this.souls).length;
    const active = Object.values(this.souls).filter(s => s.status === 'active').length;
    const sleeping = Object.values(this.souls).filter(s => s.status === 'sleeping').length;
    const error = Object.values(this.souls).filter(s => s.status === 'error').length;

    return {
      totalSouls: total,
      activeSouls: active,
      sleepingSouls: sleeping,
      errorSouls: error,
      pillars: Array.from(new Set(Object.values(this.souls).map(s => s.pillar)))
    };
  }
}

const soulConfigurator = new NeuralSoulConfigurator();
module.exports = { soulConfigurator };