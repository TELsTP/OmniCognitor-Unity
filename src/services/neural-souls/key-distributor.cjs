// src/services/neural-souls/key-distributor.cjs
class NeuralSoulKeyDistributor {
  constructor() {
    // Initialize key pools
    this.keyPool = {
      specialized: this.loadKeys('SPECIALIZED', 5),
      mistral: this.loadKeys('MISTRAL', 60),
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
      if (key && key !== 'undefined' && key.trim() !== '') {
        keys.push(key);
      }
    }
    return keys;
  }

  // Map each soul to its preferred key type
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

  // Assign key to neural soul with ultimate Mistral fallback
  assignKey(soulId, preferredType = null) {
    // Check if already assigned
    if (this.soulAssignments[soulId]) {
      return this.soulAssignments[soulId];
    }

    // Determine preferred type if not specified
    if (!preferredType) {
      preferredType = this.getPreferredTypeForSoul(soulId);
    }

    // Try preferred type first
    if (this.keyPool[preferredType] && this.keyPool[preferredType].length > 0) {
      return this.assignFromPool(soulId, preferredType);
    }

    // Fallback to specialized keys if preferred type not available
    if (preferredType !== 'specialized' && this.keyPool.specialized.length > 0) {
      return this.assignFromPool(soulId, 'specialized');
    }

    // ULTIMATE FALLBACK: Mistral for ALL souls if preferred type fails
    if (this.keyPool.mistral.length > 0) {
      console.log(`⚠️  ${preferredType} keys unavailable for ${soulId}, falling back to Mistral`);
      return this.assignFromPool(soulId, 'mistral');
    }

    // If no keys available at all (shouldn't happen with 60 Mistral keys)
    throw new Error(`No API keys available for ${soulId}`);
  }

  assignFromPool(soulId, poolName) {
    const pool = this.keyPool[poolName];
    if (pool.length === 0) {
      throw new Error(`No ${poolName} keys available for ${soulId}`);
    }

    // Use round-robin for reusable keys (don't shift/remove)
    const idx = this.usageStats[soulId] || 0;
    const key = pool[idx % pool.length];

    this.soulAssignments[soulId] = key;
    this.usageStats[soulId] = idx + 1;

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

  // Get usage statistics
  getUsageStats() {
    return { ...this.usageStats };
  }

  // Reset assignments (for testing)
  reset() {
    this.soulAssignments = {};
    this.usageStats = {};
  }
}

const keyDistributor = new NeuralSoulKeyDistributor();
module.exports = { keyDistributor };
