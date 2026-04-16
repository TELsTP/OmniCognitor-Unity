// scripts/activate-pillars.js
require('dotenv').config();
const { soulConfigurator } = require('../src/services/neural-souls/soul-configurator.cjs');

async function activatePillars() {
  console.log('🌉 Wahed Protocol - Pillar Activation');
  console.log('   Phase 2: Pillar-Specific Training');
  console.log('');

  // First configure all souls
  console.log('🔧 Configuring souls...');
  await soulConfigurator.configureAllSouls();
  console.log('');

  const pillars = [
    'Science', 'Life', 'Telemedicine', 'Education', 'Research',
    'Projects', 'Portals', 'Multimedia', 'Wisdom', 'Blueprint'
  ];

  for (const pillar of pillars) {
    console.log(`🏛️  Activating ${pillar} pillar...`);
    
    const souls = soulConfigurator.getSoulsByPillar(pillar);
    
    for (const soul of souls) {
      try {
        await soulConfigurator.activateSoul(soul.id, {
          task: 'pillar_activation',
          phase: 2,
          pillar: pillar,
          focus: 'pillar_functionality'
        });
        
        console.log(`   ✅ ${soul.id} (${soul.archetype}) activated`);
      } catch (error) {
        console.error(`   ❌ ${soul.id} activation failed:`, error);
      }
    }
    
    console.log(`✅ ${pillar} pillar fully activated\n`);
  }

  console.log('🎉 All Pillars Activated!');
}

activatePillars().catch(console.error);