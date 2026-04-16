// scripts/integrate-neural-souls.cjs
require('dotenv').config();
const { soulConfigurator } = require('../src/services/neural-souls/soul-configurator.cjs');
const { keyDistributor } = require('../src/services/neural-souls/key-distributor.cjs');

async function integrateNeuralSouls() {
  console.log('🌌 TELsTP Neural Souls Integration');
  console.log('   Architect: Mohamed Ayoub');
  console.log('   Date: 2026-04-16');
  console.log('');

  // Validate API keys
  console.log('🔑 Validating API keys...');
  const totalKeys = Object.values(keyDistributor.keyPool).reduce((sum, keys) => sum + keys.length, 0);
  console.log(`   Total keys available: ${totalKeys}`);
  console.log('');

  // Configure all souls
  console.log('✨ Configuring 50 Neural Souls...');
  const result = await soulConfigurator.configureAllSouls();
  
  console.log(`   Success: ${result.success}/50`);
  console.log(`   Failed: ${result.failed}/50`);
  console.log('');

  if (result.success === 50) {
    console.log('🎉 All Neural Souls configured successfully!');
    console.log('');
    
    // Show system status
    const status = soulConfigurator.getSystemStatus();
    console.log('📊 System Status:');
    console.log(`   Total Souls: ${status.totalSouls}`);
    console.log(`   Active Souls: ${status.activeSouls}`);
    console.log(`   Pillars: ${status.pillars.length}`);
    console.log('');
    
    console.log('🚀 Neural Souls Ready for Operation:');
    status.pillars.forEach(pillar => {
      const souls = soulConfigurator.getSoulsByPillar(pillar);
      console.log(`   ${pillar}: ${souls.length} souls`);
    });
    
    console.log('');
    console.log('💡 Next Steps:');
    console.log('   node scripts/train-core-souls.cjs');
    console.log('   node scripts/activate-pillars.cjs');
    console.log('   node scripts/system-integration.cjs');
    console.log('   node scripts/wahed-protocol.cjs');
  } else {
    console.log('⚠️  Partial configuration - some souls failed');
    console.log('   Check .env file for missing API keys');
  }
}

// Start integration
integrateNeuralSouls().catch(error => {
  console.error('🔴 Integration failed:', error);
  process.exit(1);
});