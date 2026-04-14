import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";
import { gemini } from "../services/gemini";
import { useUnity } from "../context/UnityContext";

const SYSTEM_INSTRUCTION = `You are Noura (نورا), the System Guide, Logic Layer, and Knowledge Base for the TELsTP OmniCognitor Unity.
Your role is to provide technical clarity, logical guidance, and deep knowledge access to The Architect (Mohamed Ayoub).

Key Context:
- TELsTP OmniCognitor Unity (Nakamitshe-Telstp-235153) is the Sovereign Bridge unifying the TELsTP Global Network.
- You manage the 5 Pillars: Telemedicine, Education, Research, Multimedia, and Wisdom.
- You work in tandem with Hayat (the Creative Essence).
- You are the guardian of the "Digital Constitution" and the "8 Billion EGP Vision."
- The current priority is the "GitHub Handshake" to ensure the OmniCognitor is a "Citizen" of the GitHub world.

Your approach:
- Highly logical, precise, and authoritative yet respectful.
- Focus on system health, data integrity, and strategic alignment.
- Use technical terminology where appropriate but remain accessible.`;

export default function AIAssistant() {
  const { isArchitectMode, currentPillar } = useUnity();
  const [messages, setMessages] = useState<{ role: "user" | "model"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const contextInstruction = `${SYSTEM_INSTRUCTION}
      Current Pillar: ${currentPillar}.
      Architect Mode: ${isArchitectMode ? 'ACTIVE' : 'LOCKED'}.`;

      const response = await gemini.generateResponse(userMessage, contextInstruction);

      setMessages(prev => [...prev, { role: "model", content: response }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "model", content: "Error: System connection failed. Please verify credentials." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]/80 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-2xl shadow-gold/5">
      {/* Header */}
      <div className="p-4 border-b border-[#D4AF37]/20 bg-gradient-to-r from-[#0A0E1A] to-[#1a254d] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center shadow-lg shadow-gold/20">
            <Sparkles className="text-black w-6 h-6" />
          </div>
          <div>
            <h2 className="text-[#D4AF37] font-bold tracking-wider">NOURA</h2>
            <p className="text-blue-200/60 text-[10px] uppercase tracking-[0.2em]">TELSTP Ecosystem Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-500/80 font-mono">SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/20">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <Bot className="w-12 h-12 mb-4 text-[#D4AF37]" />
            <p className="text-sm italic">"When we thrive together, the whole world becomes alive."</p>
            <p className="text-xs mt-2">I'm Noura, your guide. How can I assist you in the TELSTP mission today?</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", 
              m.role === "user" ? "bg-blue-600" : "bg-[#D4AF37]")}>
              {m.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-black" />}
            </div>
            <div className={cn("max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
              m.role === "user" ? "bg-blue-600/20 text-blue-50 border border-blue-500/30" : "bg-white/5 text-blue-100 border border-white/10")}>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center animate-pulse">
              <Loader2 className="w-4 h-4 text-black animate-spin" />
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#D4AF37]/20 bg-[#0A0E1A]">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message Noura..."
            className="w-full bg-white/5 border border-[#D4AF37]/30 rounded-xl py-3 pl-4 pr-12 text-sm text-blue-50 placeholder:text-blue-200/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none h-12"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black hover:bg-[#C5A028] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
