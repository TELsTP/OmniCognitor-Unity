// scripts/train-core-souls.js
const { soulConfigurator } = require('../src/services/neural-souls/soul-configurator');

async function trainCoreSouls() {
  console.log('🏗️  Wahed Protocol - Core Souls Training');
  console.log('   Phase 1: Foundation Training');
  console.log('');

  const coreSouls = ['Architect', 'Coder', 'Infrastructure', 'Sentinel', 'Flow Master'];

  for (const soulId of coreSouls) {
    try {
      console.log(`🔲 Training ${soulId}...`);
      
      // Activate soul
      const result = await soulConfigurator.activateSoul(soulId, {
        task: 'foundation_training',
        phase: 1,
        focus: 'core_stability'
      });

      console.log(`✅ ${soulId} trained - Status: ${result.status}`);
    } catch (error) {
      console.error(`❌ ${soulId} training failed:`, error);
    }
  }

  console.log('\n🎉 Core Souls Training Complete!');
}

trainCoreSouls().catch(console.error);