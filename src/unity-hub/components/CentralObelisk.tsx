import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import visionText from '../data/visionText';
import { useInView } from 'react-intersection-observer';

interface CentralObeliskProps {
  onVisionComplete?: () => void;
}

const CentralObelisk: React.FC<CentralObeliskProps> = ({ onVisionComplete }) => {
  const { language } = useLanguage();
  const [cartoucheState, setCartoucheState] = useState<'hieroglyphs' | 'arabic' | 'english'>('hieroglyphs');
  const [isAnimating, setIsAnimating] = useState(false);
  const [visionIndex, setVisionIndex] = useState(0);
  const [visionComplete, setVisionComplete] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
  
  // Get vision text for current language and flatten to words
  const getVisionWords = () => {
    const lang = language as keyof typeof visionText;
    if (visionText[lang]) {
      return visionText[lang].segments.flatMap(seg => seg.words);
    }
    return [];
  };
  
  const visionWords = getVisionWords();

  // Cartouche animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCartoucheState(prev => {
          switch (prev) {
            case 'hieroglyphs': return 'arabic';
            case 'arabic': return 'english';
            case 'english': return 'hieroglyphs';
            default: return 'hieroglyphs';
          }
        });
        setIsAnimating(false);
      }, 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Vision text animation on scroll
  useEffect(() => {
    if (inView && visionIndex < visionWords.length) {
      const timer = setTimeout(() => {
        setVisionIndex(prev => {
          const newIndex = prev + 1;
          if (newIndex >= visionWords.length && !visionComplete) {
            setVisionComplete(true);
            onVisionComplete?.();
          }
          return newIndex;
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView, visionIndex, visionWords.length, visionComplete, onVisionComplete]);

  // Reset vision animation when language changes
  useEffect(() => {
    setVisionIndex(0);
    setVisionComplete(false);
  }, [language, visionWords]);

  // Cartouche content based on state
  const getCartoucheContent = () => {
    switch (cartoucheState) {
      case 'hieroglyphs':
        return '𓏏𓇋𓃬𓋴𓏏𓊪';
      case 'arabic':
        return 'تيلستب';
      case 'english':
        return 'TELSTP';
      default:
        return '𓏏𓇋𓃬𓋴𓏏𓊪';
    }
  };

  return (
    <div className="central-obelisk-container relative z-10 flex flex-col items-center justify-center">
      {/* Obelisk Structure */}
      <div className="obelisk-wrapper relative">
        {/* Eye of Horus (Top) */}
        <div className="eye-of-horus absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 rounded-full border-4 border-gold-400 bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center shadow-gold-glow">
            <span className="text-2xl">👁️</span>
          </div>
          <div className="absolute -inset-2 rounded-full border border-gold-200 opacity-50 animate-pulse" />
        </div>

        {/* Obelisk Body */}
        <div className="obelisk-body relative bg-gradient-to-b from-stone-100 to-stone-300 border-2 border-stone-400 shadow-obelisk">
          {/* Cartouche */}
          <div className="cartouche-container absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className={`cartouche bg-gradient-to-r from-gold-600 to-gold-800 border-2 border-gold-900 px-6 py-3 rounded-lg shadow-cartouche transition-all duration-500 ${isAnimating ? 'animate-cartouche-shift' : ''}`}>
              <div className="text-2xl md:text-3xl font-hieroglyphic text-white tracking-wider">
                {getCartoucheContent()}
              </div>
            </div>
          </div>

          {/* Obelisk Content Area */}
          <div className="obelisk-content min-h-[200px] md:min-h-[300px] p-6 pt-24 pb-16">
            {/* Vision Text */}
            <div 
              ref={ref}
              className="vision-text text-center text-stone-800 font-medium text-sm md:text-base leading-relaxed"
            >
              {visionWords.slice(0, visionIndex).map((word, idx) => (
                <span key={idx} className="inline-block">
                  {word}
                  {idx < visionWords.length - 1 && ' '}
                </span>
              ))}
              {!visionComplete && inView && (
                <span className="inline-block animate-blink">|</span>
              )}
            </div>
          </div>

          {/* Ankh (Bottom) */}
          <div className="ankh-container absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-700 rounded-full shadow-gold-glow flex items-center justify-center">
                <span className="text-xl">☥</span>
              </div>
              {/* Radiation Effect */}
              <div className="absolute -inset-4 rounded-full border-2 border-gold-300 opacity-60 animate-ankh-glow" />
              <div className="absolute -inset-6 rounded-full border border-gold-200 opacity-40 animate-ankh-glow delay-300" />
              <div className="absolute -inset-8 rounded-full border border-gold-100 opacity-20 animate-ankh-glow delay-600" />
            </div>
          </div>
        </div>

        {/* Obelisk Base */}
        <div className="obelisk-base w-full h-4 bg-gradient-to-r from-stone-400 to-stone-600 mt-2 shadow-base" />
      </div>
    </div>
  );
};

export default CentralObelisk;
