import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, CheckCircle, AlertCircle, Loader2, Zap } from 'lucide-react';
import { supabaseService } from '../../services/supabase';
import { useUnity } from '../../context/UnityContext';

export const ArchitectHandshake: React.FC = () => {
  const { isArchitectMode, setIsArchitectMode } = useUnity();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleHandshake = async () => {
    if (!code) return;
    
    setStatus('verifying');
    // The Master Key: Nakamitshe-Telstp-235153
    if (code === 'Nakamitshe-Telstp-235153') {
      try {
        // Log the successful handshake in Supabase
        await supabaseService.logHandshake('ARCHITECT_GENESIS', 'central_hub', true);
        
        setStatus('success');
        setMessage('OmniCog Spine Activated. System Integrity 100%.');
        setTimeout(() => {
          setIsArchitectMode(true);
          setStatus('idle');
          setCode('');
        }, 2000);
      } catch (error) {
        console.error("Handshake Log Error:", error);
        setStatus('success'); // Still allow local activation if logging fails
      }
    } else {
      setStatus('error');
      setMessage('Invalid Handshake Code. Access Denied.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (isArchitectMode) return null;

  return (
    <div className="p-6 rounded-2xl bg-[#0A0E1A] border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Architect Handshake</h3>
          <p className="text-[10px] text-blue-200/40 uppercase">Enter Master Key to Unify Hubs</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••••••••••••••••"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-[#D4AF37] placeholder:text-white/10 focus:border-[#D4AF37]/50 outline-none transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Lock className="w-4 h-4 text-white/20" />
          </div>
        </div>

        <button
          onClick={handleHandshake}
          disabled={status === 'verifying' || !code}
          className="w-full py-3 bg-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#C5A028] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {status === 'verifying' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Authenticated
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Initiate Handshake
            </>
          )}
        </button>

        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase"
            >
              <AlertCircle className="w-3 h-3" />
              {message}
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase"
            >
              <CheckCircle className="w-3 h-3" />
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
