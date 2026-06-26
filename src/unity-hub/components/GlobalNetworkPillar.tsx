import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { HubPillar } from '../data/hubs';
import InteractiveGlobe from './globe/InteractiveGlobe';

interface GlobalNetworkPillarProps {
  pillar: HubPillar;
  isActive: boolean;
  onClick: () => void;
  onUnlockAll: () => void;
}

const GlobalNetworkPillar: React.FC<GlobalNetworkPillarProps> = ({ 
  pillar, 
  isActive, 
  onClick, 
  onUnlockAll 
}) => {
  const { language } = useLanguage();
  const [showGlobe, setShowGlobe] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const translation = pillar.translations[language as keyof typeof pillar.translations];

  // Handle globe marker click
  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
  };

  // Handle globe click (background)
  const handleGlobeClick = () => {
    // This unlocks all other pillars
    onUnlockAll();
  };

  // Toggle globe view
  const toggleGlobe = () => {
    setShowGlobe(!showGlobe);
  };

  return (
    <div className="global-network-pillar relative">
      {/* Pillar Structure (similar to TemplePillar but special) */}
      <div 
        className={`pillar-wrapper relative cursor-pointer transition-all duration-500 ${
          isActive ? 'ring-4 ring-gold-400 ring-opacity-50' : ''
        }`}
        onClick={toggleGlobe}
      >
        {/* Pillar Base */}
        <div className="pillar-base w-28 h-6 bg-gradient-to-b from-gold-400 to-gold-600 rounded-t-lg shadow-gold-glow" />
        
        {/* Pillar Column */}
        <div className="pillar-column w-28 h-72 bg-gradient-to-b from-gold-400 to-gold-700 border-2 border-gold-800 shadow-gold-glow relative">
          {/* Hieroglyphic Cartouche */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-14 bg-stone-800 border-2 border-gold-400 rounded-lg flex items-center justify-center">
              <span className="text-xl font-hieroglyphic text-gold-400">{pillar.hieroglyphs}</span>
            </div>
          </div>

          {/* Pillar Name */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-white font-bold text-lg drop-shadow-text">
              {translation.shortName}
            </div>
            <div className="text-sm text-gold-200 mt-1">
              {pillar.icon}
            </div>
          </div>

          {/* Globe Icon (indicates interactive globe inside) */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-blue-600/50 rounded-full flex items-center justify-center border-2 border-blue-400">
              <span className="text-2xl">🌍</span>
            </div>
          </div>

          {/* Description */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center px-2">
            <div className="text-xs text-gold-200 line-clamp-2">
              {translation.description}
            </div>
          </div>

          {/* Active State Glow */}
          {isActive && (
            <div className="absolute -inset-1 rounded-lg border-2 border-gold-400 animate-pulse" />
          )}
        </div>

        {/* Pillar Capital */}
        <div className="pillar-capital w-32 h-8 bg-gradient-to-b from-gold-400 to-gold-600 rounded-b-lg border-2 border-t-0 border-gold-800 shadow-gold-glow" />
      </div>

      {/* Globe Modal */}
      {showGlobe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-full max-h-[80vh]">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white hover:bg-stone-700 transition-colors"
              onClick={toggleGlobe}
            >
              <span className="text-xl">×</span>
            </button>

            {/* Globe Title */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div className="text-gold-400 font-bold text-xl text-center">
                {translation.name}
              </div>
            </div>

            {/* Interactive Globe */}
            <InteractiveGlobe 
              onMarkerClick={handleMarkerClick}
              onGlobeClick={handleGlobeClick}
            />

            {/* Unlock All Pillars Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
              <button 
                className="bg-gradient-to-r from-gold-600 to-gold-800 text-white px-6 py-2 rounded-lg font-bold hover:from-gold-700 hover:to-gold-900 transition-all shadow-lg hover:shadow-gold-glow"
                onClick={() => {
                  onUnlockAll();
                  toggleGlobe();
                }}
              >
                {language === 'ar' ? 'فتح جميع الأعمدة' :
                 language === 'fr' ? 'Déverrouiller tous les piliers' :
                 language === 'es' ? 'Desbloquear todas las columnas' :
                 language === 'zh' ? '解锁所有支柱' :
                 language === 'ur' ? 'تمام ستون کھولیں' :
                 'Unlock All Pillars'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalNetworkPillar;
