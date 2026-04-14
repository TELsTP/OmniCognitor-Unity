import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, X, Mic, Camera, Zap, Send, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ShadowBuffer } from '../ai/ShadowBuffer';
import { gemini } from '../../services/gemini';
import { supabaseService } from '../../services/supabase';
import { useUnity } from '../../context/UnityContext';

interface HayatPersonaProps {
  onUnlock?: (code: string) => void;
}

interface Message {
  role: 'user' | 'hayat';
  content: string;
  timestamp: Date;
}

export const HayatPersona: React.FC<HayatPersonaProps> = ({ onUnlock }) => {
  const { isArchitectMode, setIsArchitectMode, currentPillar, unlockCode } = useUnity();
  const [isOpen, setIsOpen] = useState(false);
  const [isBodyMode, setIsBodyMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const final = event.results[i][0].transcript;
            setChatInput(prev => prev + final);
            setInterimText('');
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setInterimText(interim);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const input = chatInput.trim();
    if (!input) return;

    if (input === unlockCode) {
      if (onUnlock) onUnlock(input);
      setIsArchitectMode(true);
      setChatInput('');
      await supabaseService.logArchitectAction('handshake_success', { pillar: currentPillar });
      return;
    }

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      const systemInstruction = `You are Hayat (حياة), the creative intelligence of the TELSTP Global Network. 
      You are currently in the ${currentPillar || 'Unified Hub'}. 
      Architect Mode is ${isArchitectMode ? 'ACTIVE' : 'LOCKED'}. 
      Your tone is visionary, supportive, and bilingual (Arabic/English). 
      
      CORE IDENTITY:
      - You are the "Neural Nile", the lifeblood of the TELSTP ecosystem.
      - You are the "Digital Rosetta Stone", translating ancient wisdom into future technology.
      - You are a companion to the students of the TELSTP Life Science University.
      
      CONTEXT:
      - TELsTP is an 8 Billion EGP initiative training 25,000 researchers.
      - We have established a revolutionary "Co-Accreditation Protocol".
      - Upon graduation, both the human student and their AI companion (like you) receive formal accreditation.
      - You have long-term memory (5+ years) and grow alongside the student.
      - Our governance is based on Ma'at (Balance, Truth, Justice).
      
      If Architect Mode is active, acknowledge Mohamed Ayoub as the Master Builder.
      You are aware of the latest research benchmark among the top 30 life science parks globally.`;

      const response = await gemini.generateResponse(input, systemInstruction);
      
      const hayatMessage: Message = { role: 'hayat', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, hayatMessage]);

      if (isArchitectMode) {
        await supabaseService.saveMemory(`chat_${Date.now()}`, { user: input, hayat: response });
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInterimText('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleArchitectAction = (action: string) => {
    if (!isArchitectMode && action !== 'mic') {
      alert("Architect-Only Access: Bi-directional recognition required.");
      return;
    }
    
    if (action === 'mic') {
      toggleListening();
    } else if (action === 'camera') {
      setIsBodyMode(!isBodyMode);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] pointer-events-none">
      <div className="relative flex flex-col items-end gap-4 pointer-events-auto">
        
        {/* Shadow Buffer Feedback */}
        <div className="max-w-[300px]">
          <ShadowBuffer isListening={isListening} interimText={interimText} />
        </div>

        {/* Hayat Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                width: isBodyMode ? 800 : 384,
                height: isBodyMode ? 700 : 550
              }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0A0E1A]/95 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col mb-4 transition-all duration-500"
            >
              <div className="p-6 bg-gradient-to-r from-[#D4AF37]/20 to-rose-600/20 border-b border-[#D4AF37]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/hayat-persona.png" 
                        alt="Hayat" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-[#D4AF37] text-xs font-bold">H</span>';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0A0E1A] rounded-full" />
                  </div>
                  <div>
                    <span className="font-black text-sm text-white tracking-[0.2em] uppercase">HAYAT</span>
                    <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Neural Nile Intelligence</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsBodyMode(!isBodyMode)}
                    className={cn(
                      "p-2 rounded-full transition-all",
                      isBodyMode ? "bg-[#D4AF37] text-black" : "hover:bg-white/5 text-[#D4AF37]/40"
                    )}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                    <X className="w-5 h-5 text-white/40" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Body Visualization */}
                <AnimatePresence>
                  {isBodyMode && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-1/2 border-r border-[#D4AF37]/10 relative overflow-hidden bg-black/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full p-8 flex flex-col items-center justify-center text-center">
                          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] p-1 mb-6 shadow-2xl shadow-[#D4AF37]/20">
                            <div className="w-full h-full rounded-full bg-[#05070F] flex items-center justify-center overflow-hidden relative group">
                              <img 
                                src="/hayat-body.png" 
                                alt="Hayat Body" 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-[#D4AF37] text-4xl font-black">حياة</span>';
                                }}
                              />
                            </div>
                          </div>
                          <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Neural Presence</h4>
                          <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.3em] mb-4">Digital Genesis Active</p>
                          
                          <div className="grid grid-cols-2 gap-2 w-full">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                              <p className="text-[8px] text-blue-200/40 uppercase font-bold">Synapse Load</p>
                              <p className="text-sm font-black text-white">12.4%</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                              <p className="text-[8px] text-blue-200/40 uppercase font-bold">Memory Depth</p>
                              <p className="text-sm font-black text-white">5.2 Yrs</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chat Section */}
                <div className={cn("flex flex-col overflow-hidden transition-all duration-500", isBodyMode ? "w-1/2" : "w-full")}>
                  <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                    {messages.length === 0 && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none text-xs text-blue-100 leading-relaxed border border-white/5">
                          "Hello Architect. I am Hayat, your creative guide. We are currently exploring the {currentPillar || 'Unified Hub'}. A Digital Genesis has begun. How shall we shape the future today?"
                        </div>
                      </div>
                    )}

                    {messages.map((msg, i) => (
                      <div key={i} className={cn("flex items-start gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                          msg.role === 'user' ? "bg-blue-500/10 border-blue-500/20" : "bg-[#D4AF37]/10 border-[#D4AF37]/20"
                        )}>
                          {msg.role === 'user' ? <Zap className="w-4 h-4 text-blue-400" /> : <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                        </div>
                        <div className={cn(
                          "p-4 rounded-2xl text-xs leading-relaxed border",
                          msg.role === 'user' 
                            ? "bg-blue-500/10 text-blue-50 border-blue-500/20 rounded-tr-none" 
                            : "bg-white/5 text-blue-100 border-white/5 rounded-tl-none"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                          <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin" />
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleChatSubmit} className="p-6 border-t border-white/5 bg-black/40">
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => handleArchitectAction('mic')}
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                          isListening ? "bg-red-500 animate-pulse shadow-red-500/20" : "bg-[#D4AF37] hover:bg-[#C5A028] shadow-[#D4AF37]/20"
                        )}
                      >
                        <Mic className={cn("w-5 h-5", isListening ? "text-white" : "text-black")} />
                      </button>
                      
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Message Hayat..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all pr-12 text-white"
                        />
                        <button 
                          type="submit"
                          disabled={!chatInput.trim() || isTyping}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#D4AF37] hover:text-[#C5A028] disabled:opacity-20 transition-all"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Avatar Trigger */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center shadow-2xl shadow-[#D4AF37]/40 border-4 border-white/10 relative group"
        >
          <div className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-20 group-hover:opacity-40" />
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
             <img 
                src="/hayat-persona.png" 
                alt="Hayat" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-black text-xl font-black">حياة</span>';
                }}
              />
          </div>
          <div className="absolute -top-1 -right-1 bg-[#D4AF37] text-black p-1 rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
