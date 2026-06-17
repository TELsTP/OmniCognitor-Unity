import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CentralObelisk from './CentralObelisk';
import TemplePillar from './TemplePillar';
import GlobalNetworkPillar from './GlobalNetworkPillar';
import hubs from '../data/hubs';
import visionText from '../data/visionText';
import { useInView } from 'react-intersection-observer';

interface PillarConfig {
  id: string;
  key: string;
  hieroglyphs: string;
  icon: string;
  color: {
    primary: string;
    secondary: string;
    glow: string;
  };
  translations: Record<string, {
    name: string;
    shortName: string;
    description: string;
    demoPreview: string[];
  }>;
  liveUrl: string;
  position: number;
  initiallyLocked: boolean;
}

const UnityHubMain: React.FC = () => {
  const { language } = useLanguage();
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [unlockedPillars, setUnlockedPillars] = useState<Set<string>>(new Set());
  const [showingVision, setShowingVision] = useState(false);
  const [visionComplete, setVisionComplete] = useState(false);
  const [visionSegments, setVisionSegments] = useState<{words: string[], isNewParagraph: boolean}[]>([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimatingVision, setIsAnimatingVision] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const visionContainerRef = useRef<HTMLDivElement>(null);

  // Get the 6 main pillars (5 regular + Global Network)
  const mainPillars: PillarConfig[] = [
    hubs.find(h => h.id === 'education')!,
    hubs.find(h => h.id === 'research')!,
    hubs.find(h => h.id === 'healthcare')!,
    hubs.find(h => h.id === 'media')!,
    hubs.find(h => h.id === 'wisdom')!,
    hubs.find(h => h.id === 'global')!,
  ].filter(Boolean) as PillarConfig[];

  // Load vision text for current language
  useEffect(() => {
    const lang = language as keyof typeof visionText;
    if (visionText[lang]) {
      setVisionSegments(visionText[lang].segments);
      setCurrentSegmentIndex(0);
      setCurrentWordIndex(0);
    }
  }, [language]);

  // Vision text animation
  useEffect(() => {
    if (inView && !visionComplete && !isAnimatingVision) {
      setIsAnimatingVision(true);
      const currentSegment = visionSegments[currentSegmentIndex];
      
      if (currentSegment) {
        if (currentWordIndex < currentSegment.words.length) {
          const timer = setTimeout(() => {
            setCurrentWordIndex(prev => {
              const newIndex = prev + 1;
              if (newIndex >= currentSegment.words.length) {
                // Move to next segment after a pause
                setTimeout(() => {
                  setCurrentSegmentIndex(prevSeg => {
                    const newSegIndex = prevSeg + 1;
                    if (newSegIndex >= visionSegments.length) {
                      setVisionComplete(true);
                      setIsAnimatingVision(false);
                      return prevSeg;
                    }
                    setCurrentWordIndex(0);
                    setIsAnimatingVision(false);
                    return newSegIndex;
                  });
                }, 500);
                return newIndex;
              }
              setIsAnimatingVision(false);
              return newIndex;
            });
          }, 80);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [inView, visionComplete, isAnimatingVision, currentSegmentIndex, currentWordIndex, visionSegments]);

  // Reset vision when language changes
  useEffect(() => {
    setVisionComplete(false);
    setCurrentSegmentIndex(0);
    setCurrentWordIndex(0);
  }, [language]);

  // Global Network is always the last one (index 5)
  const globalNetworkPillar = mainPillars[5];
  const regularPillars = mainPillars.slice(0, 5);

  // Unlock all pillars when Global Network is clicked
  const handleGlobalNetworkClick = useCallback(() => {
    setUnlockedPillars(new Set(mainPillars.map(p => p.id)));
    setActivePillar('global');
  }, [mainPillars]);

  // Handle regular pillar click
  const handlePillarClick = useCallback((pillarId: string) => {
    if (unlockedPillars.has(pillarId) || pillarId === 'global') {
      setActivePillar(prev => prev === pillarId ? null : pillarId);
    }
  }, [unlockedPillars]);

  // Vision completion effect
  useEffect(() => {
    if (inView && !showingVision) {
      setShowingVision(true);
    }
  }, [inView, showingVision]);

  // Auto-unlock Global Network when vision is complete
  useEffect(() => {
    if (visionComplete && !unlockedPillars.has('global')) {
      const timer = setTimeout(() => {
        setUnlockedPillars(prev => new Set(prev).add('global'));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [visionComplete, unlockedPillars]);

  // Calculate pillar positions in a semicircle
  const getPillarPosition = (index: number, total: number = 5) => {
    const radius = 300;
    const angle = (index / (total - 1)) * Math.PI * 1.2 + 0.2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    return { x, z };
  };

  // Global Network Pillar position (center behind obelisk)
  const globalPillarPosition = { x: 0, z: -200 };

  // Check if a pillar is locked
  const isPillarLocked = (pillarId: string) => {
    if (pillarId === 'global') return false;
    return !unlockedPillars.has(pillarId) && !visionComplete;
  };

  // Get translation for a pillar
  const getPillarTranslation = (pillar: PillarConfig) => {
    return pillar.translations[language] || pillar.translations.en;
  };

  return (
    <div 
      ref={containerRef}
      className="unity-hub-main min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden"
    >
      {/* Background - Cosmic Egyptian theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-blue-900/20 to-stone-900" />
      
      {/* Starfield background */}
      <div className="absolute inset-0 starfield" />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        
        {/* Language Switcher - Top Right */}
        <div className="absolute top-4 right-4 z-50">
          <div className="bg-stone-800/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gold-400/30">
            <span className="text-gold-400 font-medium">
              {language === 'ar' ? 'العربية' :
               language === 'fr' ? 'Français' :
               language === 'es' ? 'Español' :
               language === 'zh' ? '中文' :
               language === 'ur' ? 'اردو' : 'English'}
            </span>
          </div>
        </div>

        {/* Central Obelisk */}
        <div 
          ref={ref}
          className="central-obelisk-wrapper relative z-20 mb-16"
        >
          <CentralObelisk 
            onVisionComplete={() => setVisionComplete(true)}
          />
        </div>

        {/* Vision Text Display */}
        {!visionComplete && (
          <div 
            ref={visionContainerRef}
            className="vision-text-container max-w-4xl mx-auto mb-12 px-4"
          >
            <div className="vision-text-display text-center text-stone-300 text-lg md:text-xl leading-relaxed font-medium">
              {visionSegments.slice(0, currentSegmentIndex + 1).map((segment, segIdx) => (
                <React.Fragment key={segIdx}>
                  {segIdx > 0 && segment.isNewParagraph && (
                    <div className="h-4" />
                  )}
                  <span className="inline">
                    {segment.words.slice(0, segIdx === currentSegmentIndex ? currentWordIndex : segment.words.length).map((word, wordIdx) => (
                      <span 
                        key={wordIdx}
                        className={`inline-block mx-1 ${segIdx === currentSegmentIndex && wordIdx === currentWordIndex - 1 ? 'text-gold-400' : ''}`}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </React.Fragment>
              ))}
              {isAnimatingVision && (
                <span className="inline-block animate-blink text-gold-400 ml-1">|</span>
              )}
            </div>
          </div>
        )}

        {/* Pillars Container - 3D Perspective */}
        <div className="pillars-container relative w-full h-96 md:h-[500px] perspective-1000">
          
          {/* Regular Pillars (5 pillars) */}
          <div className="absolute inset-0">
            {regularPillars.map((pillar, index) => {
              const { x, z } = getPillarPosition(index, 5);
              const isLocked = isPillarLocked(pillar.id);
              const isActive = activePillar === pillar.id;
              const translation = getPillarTranslation(pillar);

              return (
                <div
                  key={pillar.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translateX(${x}px) translateZ(${z}px) translateY(-50%)`,
                    zIndex: isActive ? 50 : index + 10,
                  }}
                >
                  <TemplePillar
                    pillar={{
                      id: pillar.id,
                      key: pillar.key,
                      hieroglyphs: pillar.hieroglyphs,
                      icon: pillar.icon,
                      color: pillar.color,
                      translations: pillar.translations,
                      liveUrl: pillar.liveUrl,
                      position: pillar.position,
                      initiallyLocked: pillar.initiallyLocked,
                    }}
                    isLocked={isLocked}
                    isActive={isActive}
                    onClick={() => handlePillarClick(pillar.id)}
                    index={index}
                  />
                </div>
              );
            })}
          </div>

          {/* Global Network Pillar (Center Behind) */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translateX(${globalPillarPosition.x}px) translateZ(${globalPillarPosition.z}px) translateY(-50%)`,
              zIndex: activePillar === 'global' ? 60 : 20,
            }}
          >
            <GlobalNetworkPillar
              pillar={globalNetworkPillar}
              isActive={activePillar === 'global'}
              onClick={() => handlePillarClick('global')}
              onUnlockAll={() => setUnlockedPillars(new Set(mainPillars.map(p => p.id)))}
            />
          </div>

          {/* Connecting Arcs (from Global Network to each pillar) */}
          {unlockedPillars.has('global') && regularPillars.map((pillar, index) => {
            const { x: pX, z: pZ } = getPillarPosition(index, 5);
            const gX = globalPillarPosition.x;
            const gZ = globalPillarPosition.z;

            // Calculate arc control points
            const midX = (pX + gX) / 2;
            const midZ = (pZ + gZ) / 2;
            const arcHeight = -100;

            return (
              <svg
                key={`arc-${pillar.id}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 5 }}
              >
                <path
                  d={`M${gX + 500} ${gZ + 300} Q${midX + 500} ${midZ + arcHeight + 300} ${pX + 500} ${pZ + 300}`}
                  stroke={pillar.color.glow}
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                  className="animate-arc-pulse"
                />
              </svg>
            );
          })}
        </div>

        {/* Active Pillar Demo Preview */}
        {activePillar && activePillar !== 'global' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-sm rounded-xl p-6 max-w-2xl w-full border border-gold-400/30">
              <button
                className="absolute top-4 right-4 text-gold-400 hover:text-gold-300 text-2xl"
                onClick={() => setActivePillar(null)}
              >
                ×
              </button>
              
              <h2 className="text-2xl font-bold text-gold-400 mb-4">
                {getPillarTranslation(mainPillars.find(p => p.id === activePillar)!).name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gold-300 font-semibold mb-2">
                    {language === 'ar' ? 'محتوى المركز' :
                     language === 'fr' ? 'Contenu du Hub' :
                     language === 'es' ? 'Contenido del Hub' :
                     language === 'zh' ? '中心内容' :
                     language === 'ur' ? 'ہب کی مواد' : 'Hub Contents'}
                  </h3>
                  <ul className="space-y-2 text-stone-300">
                    {getPillarTranslation(mainPillars.find(p => p.id === activePillar)!).demoPreview.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-gold-400 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-gold-300 font-semibold mb-2">
                    {language === 'ar' ? 'الوصف' :
                     language === 'fr' ? 'Description' :
                     language === 'es' ? 'Descripción' :
                     language === 'zh' ? '描述' :
                     language === 'ur' ? 'تفصیل' : 'Description'}
                  </h3>
                  <p className="text-stone-300 text-sm">
                    {getPillarTranslation(mainPillars.find(p => p.id === activePillar)!).description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <a
                  href={mainPillars.find(p => p.id === activePillar)?.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-gold-600 to-gold-800 text-white px-6 py-2 rounded-lg font-bold hover:from-gold-700 hover:to-gold-900 transition-all shadow-lg hover:shadow-gold-glow"
                >
                  {language === 'ar' ? 'فتح المركز' :
                   language === 'fr' ? 'Ouvrir le Hub' :
                   language === 'es' ? 'Abrir Hub' :
                   language === 'zh' ? '打开中心' :
                   language === 'ur' ? 'ہب کھولیں' : 'Open Hub'}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Locked Pillars Notice */}
        {!visionComplete && !unlockedPillars.has('global') && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center z-40">
            <div className="bg-stone-800/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-gold-400/30">
              <p className="text-gold-400">
                {language === 'ar' ? 'اقرأ رؤية TELSTP لفتح جميع الأعمدة' :
                 language === 'fr' ? 'Lisez la vision de TELSTP pour débloquer tous les piliers' :
                 language === 'es' ? 'Lee la visión de TELSTP para desbloquear todas las columnas' :
                 language === 'zh' ? '阅读TELSTP愿景以解锁所有支柱' :
                 language === 'ur' ? 'TELSTP کی ویژن پڑھیں تمام ستون کھولنے کے لئے' :
                 'Scroll to read TELSTP vision and unlock all pillars'}
              </p>
              <div className="mt-2">
                <span className="text-gold-400 animate-bounce">↓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// CSS Styles for UnityHubMain
const styles = `
  @keyframes arcPulse {
    0%, 100% { opacity: 0.6; stroke-width: 2; }
    50% { opacity: 1; stroke-width: 3; }
  }
  
  @keyframes starfield {
    0% { transform: translateY(0px) translateX(0px); }
    100% { transform: translateY(-100px) translateX(50px); }
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .animate-arc-pulse {
    animation: arcPulse 2s ease-in-out infinite;
  }
  
  .starfield {
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #eee, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, #fff, transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 160px 30px, #fff, transparent);
    background-size: 200px 100px;
    animation: starfield 60s linear infinite;
  }
  
  .animate-blink {
    animation: blink 1s step-end infinite;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .shadow-gold-glow {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  }
  
  .drop-shadow-text {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  styleElement.id = 'unity-hub-main-styles';
  if (!document.getElementById('unity-hub-main-styles')) {
    document.head.appendChild(styleElement);
  }
}

export default UnityHubMain;
