import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { HubPillar } from '../data/hubs';

interface TemplePillarProps {
  pillar: HubPillar;
  isLocked: boolean;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const TemplePillar: React.FC<TemplePillarProps> = ({ pillar, isLocked, isActive, onClick, index }) => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  const translation = pillar.translations[language as keyof typeof pillar.translations];
  
  // Subtle rotation animation when active
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Calculate position in semicircle
  const getPosition = () => {
    const radius = 250;
    const angle = (index / 5) * Math.PI * 1.2 + 0.2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    return { x, z };
  };

  const { x, z } = getPosition();

  // Determine pillar color based on locked state
  const getPillarColor = () => {
    if (isLocked) {
      return 'bg-gradient-to-b from-stone-300 to-stone-500';
    }
    if (isActive) {
      return `bg-gradient-to-b from-${pillar.color.primary.replace('#', '')} to-${pillar.color.secondary.replace('#', '')}`;
    }
    return `bg-gradient-to-b from-${pillar.color.primary.replace('#', '')}/80 to-${pillar.color.secondary.replace('#', '')}/80`;
  };

  // Get glow effect
  const getGlowEffect = () => {
    if (isLocked) return '';
    if (isActive) return `shadow-${pillar.color.glow.replace('#', '').toLowerCase()}-glow`;
    return `shadow-${pillar.color.glow.replace('#', '').toLowerCase()}-glow-sm`;
  };

  return (
    <div 
      className={`temple-pillar absolute transition-all duration-500 ease-in-out ${
        isLocked ? 'opacity-50 grayscale' : 'opacity-100'
      }`}
      style={{
        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotation}deg)`,
        zIndex: isActive ? 50 : index + 10,
      }}
      onClick={isLocked ? undefined : onClick}
      onMouseEnter={() => !isLocked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pillar Structure */}
      <div className="pillar-wrapper relative cursor-pointer">
        {/* Pillar Base */}
        <div className={`pillar-base w-24 h-4 ${getPillarColor()} rounded-t-lg ${getGlowEffect()}`} />
        
        {/* Pillar Column */}
        <div className={`pillar-column w-24 h-64 ${getPillarColor()} border-2 border-stone-400 ${getGlowEffect()}`}>
          {/* Hieroglyphic Cartouche (Fixed) */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-12 bg-stone-800 border-2 border-gold-400 rounded-lg flex items-center justify-center">
              <span className="text-lg font-hieroglyphic text-gold-400">{pillar.hieroglyphs}</span>
            </div>
          </div>

          {/* Pillar Name (Dynamic Language) */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-white font-bold text-sm drop-shadow-text">
              {translation.shortName}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              {pillar.icon}
            </div>
          </div>

          {/* Demo Preview Cards */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20">
            {isHovered && !isLocked && (
              <div className="demo-preview bg-stone-900/90 backdrop-blur-sm rounded-lg p-2 border border-gold-400/50 animate-fade-in">
                <div className="space-y-1">
                  {translation.demoPreview.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-xs text-stone-300 truncate">
                      {item}
                    </div>
                  ))}
                  {translation.demoPreview.length > 3 && (
                    <div className="text-xs text-gold-400">+{translation.demoPreview.length - 3} more</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Locked Overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-stone-800/50 flex items-center justify-center rounded-lg">
              <div className="w-8 h-8 bg-stone-600 rounded-full flex items-center justify-center">
                <span className="text-white">🔒</span>
              </div>
            </div>
          )}

          {/* Active State Indicator */}
          {isActive && (
            <div className="absolute -inset-1 rounded-lg border-2 border-gold-400 animate-pulse" />
          )}
        </div>

        {/* Pillar Capital (Top) */}
        <div className={`pillar-capital w-28 h-6 ${getPillarColor()} rounded-b-lg border-2 border-t-0 border-stone-400 ${getGlowEffect()}`} />
      </div>
    </div>
  );
};

export default TemplePillar;
