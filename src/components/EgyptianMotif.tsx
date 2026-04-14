import React from 'react';
import { motion } from 'motion/react';

interface EgyptianMotifProps {
  type: 'eye' | 'ankh' | 'scarab' | 'lotus' | 'maat';
  className?: string;
}

export const EgyptianMotif: React.FC<EgyptianMotifProps> = ({ type, className }) => {
  const renderMotif = () => {
    switch (type) {
      case 'eye': // Eye of Horus
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M10 50C10 50 30 20 50 20C70 20 90 50 90 50C90 50 70 80 50 80C30 80 10 50 10 50Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" />
            <path d="M50 35L50 20" stroke="currentColor" strokeWidth="2" />
            <path d="M35 50L20 50" stroke="currentColor" strokeWidth="2" />
            <path d="M50 65L50 80" stroke="currentColor" strokeWidth="2" />
            <path d="M65 50L80 50" stroke="currentColor" strokeWidth="2" />
            <path d="M50 50L30 70" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 'ankh':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="35" r="15" stroke="currentColor" strokeWidth="4" />
            <path d="M50 50V90M30 60H70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case 'maat': // Feather of Ma'at
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M50 90C50 90 70 60 70 30C70 15 60 10 50 10C40 10 30 15 30 30C30 60 50 90 50 90Z" stroke="currentColor" strokeWidth="2" />
            <path d="M50 10V90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M35 30H65M32 45H68M35 60H65M42 75H58" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
      case 'scarab':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="50" cy="60" rx="25" ry="30" stroke="currentColor" strokeWidth="2" />
            <path d="M25 60H75M50 30V90M35 40L25 30M65 40L75 30M35 80L25 90M65 80L75 90" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="25" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 'lotus':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M50 90C50 90 20 70 20 40C20 20 40 10 50 30C60 10 80 20 80 40C80 70 50 90 50 90Z" stroke="currentColor" strokeWidth="2" />
            <path d="M50 30V90M35 45L20 30M65 45L80 30" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      {renderMotif()}
    </motion.div>
  );
};
