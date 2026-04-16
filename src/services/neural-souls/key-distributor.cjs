// src/services/neural-souls/key-distributor.cjs
class NeuralSoulKeyDistributor {
  constructor() {
    // Initialize key pools
    this.keyPool = {
      mistral: this.loadKeys('MISTRAL', 44),
      gemini: this.loadKeys('GEMINI', 5),
      anthropic: this.loadKeys('ANTHROPIC', 2),
      openai: this.loadKeys('OPENAI', 2),
      deepgram: this.loadKeys('DEEPGRAM', 2),
      elevenlabs: this.loadKeys('ELEVENLABS', 2),
      manus: this.loadKeys('MANUS', 2),
      xai: this.loadKeys('XAI', 1)
    };

    this.soulAssignments = {};
    this.usageStats = {};
  }

  loadKeys(prefix, count) {
    const keys = [];
    for (let i = 1; i <= count; i++) {
      const key = process.env[`${prefix}_API_KEY_${i}`];
      if (key && key !== 'undefined') {
        keys.push(key);
      }
    }
    return keys;
  }

  // Assign key to neural soul
  assignKey(soulId, preferredType = 'mistral') {
    // Check if already assigned
    if (this.soulAssignments[soulId]) {
      return this.soulAssignments[soulId];
    }

    // Try preferred type first
    if (preferredType === 'mistral' && this.keyPool.mistral.length > 0) {
      return this.assignFromPool(soulId, 'mistral');
    }

    if (preferredType === 'gemini' && this.keyPool.gemini.length > 0) {
      return this.assignFromPool(soulId, 'gemini');
    }

    // Fallback to specialized keys
    for (const [type, keys] of Object.entries(this.keyPool)) {
      if (type !== 'mistral' && type !== 'gemini' && keys.length > 0) {
        return this.assignFromPool(soulId, type);
      }
    }

    // If no keys available (shouldn't happen)
    throw new Error(`No API keys available for ${soulId}`);
  }

  assignFromPool(soulId, poolName) {
    const pool = this.keyPool[poolName];
    const key = pool.shift(); // Remove from pool
    
    this.soulAssignments[soulId] = key;
    this.usageStats[soulId] = (this.usageStats[soulId] || 0) + 1;
    
    console.log(`🔑 Assigned ${poolName} key to ${soulId}`);
    return key;
  }

  // Get key for specific soul
  getKey(soulId) {
    if (!this.soulAssignments[soulId]) {
      // Auto-assign if not already assigned
      const preferredType = this.getPreferredTypeForSoul(soulId);
      return this.assignKey(soulId, preferredType);
    }
    return this.soulAssignments[soulId];
  }

  getPreferredTypeForSoul(soulId) {
    // Core souls get specialized keys
    const coreSouls = ['Architect', 'Coder', 'Infrastructure', 'Sentinel', 'Flow Master'];
    if (coreSouls.includes(soulId)) return 'specialized';

    // Specific souls that need Gemini
    const geminiSouls = ['Analyst', 'Empathy', 'Trainer', 'Forecaster', 'Feedback Analyst'];
    if (geminiSouls.includes(soulId)) return 'gemini';

    // Everyone else gets Mistral
    return 'mistral';
  }

  // Get usage statistics
  getUsageStats() {
    return { ...this.usageStats };
  }

  // Reset assignments (for testing)
  reset() {
    this.soulAssignments = {};
    this.usageStats = {};
    // Reload keys
    Object.keys(this.keyPool).forEach(type => {
      this.keyPool[type] = this.loadKeys(type, 100); // Reload all
    });
  }
}

const keyDistributor = new NeuralSoulKeyDistributor();
module.exports = { keyDistributor };
