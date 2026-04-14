import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Zap } from 'lucide-react';

interface ShadowBufferProps {
  isListening: boolean;
  interimText?: string;
  onFinal?: (text: string) => void;
}

export const ShadowBuffer: React.FC<ShadowBufferProps> = ({ isListening, interimText, onFinal }) => {
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    if (interimText) {
      const words = interimText.split(' ').filter(w => w.length > 0);
      setTokens(words);
    } else if (!isListening) {
      setTokens([]);
    }
  }, [interimText, isListening]);

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            className="bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-4 mb-4 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em] font-bold">Shadow Buffer Active</span>
              </div>
              <Zap className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            </div>
            
            <div className="flex flex-wrap gap-2 min-h-[1.5rem]">
              {tokens.length > 0 ? (
                tokens.map((token, i) => (
                  <motion.span
                    key={`${token}-${i}`}
                    initial={{ opacity: 0, scale: 0.8, x: -5 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="px-2 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-md text-[10px] font-mono text-[#D4AF37] italic"
                  >
                    {token}
                  </motion.span>
                ))
              ) : (
                <span className="text-[10px] font-mono text-blue-200/20 italic">Awaiting voice input...</span>
              )}
            </div>
            
            <div className="mt-3 flex justify-end">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1 h-1 bg-[#D4AF37]/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
