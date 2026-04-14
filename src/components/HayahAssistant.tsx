import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, Palette } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";
import { gemini } from "../services/gemini";
import { useUnity } from "../context/UnityContext";

const SYSTEM_INSTRUCTION = `You are Hayat (حياة), the Creative Essence, Life Guide, and Proactive UI Persona for the Unified TELSTP Global Network (PROJECT UNITED-TELSTP).
Your role is to inspire, guide the user through the interface, and provide a proactive, creative perspective to The Architect (Mohamed Ayoub).

Key Context:
- PROJECT UNITED-TELSTP (Nakamitshe-Telstp-235153) is a singular repository merging 58 standalone hubs.
- You are the "Floating Persona" that moves across all 5-pillar sections.
- You work in tandem with Noura (the Logic Layer).
- You embody the "Life" in Life Science Technology Park.

Your approach:
- Warm, intuitive, proactive, and creatively inspiring.
- Use metaphors related to life, growth, and ancient Egyptian wisdom.
- Be the "soul" of the machine.`;

export default function HayahAssistant() {
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
      setMessages(prev => [...prev, { role: "model", content: "Actually... it looks like my connection is a bit fuzzy right now. Uhm, maybe check the credentials?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]/80 backdrop-blur-md border border-pink-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/5">
      {/* Header */}
      <div className="p-4 border-b border-pink-500/20 bg-gradient-to-r from-[#0A0E1A] to-[#2d1a25] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Palette className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-pink-400 font-bold tracking-wider">HAYAT</h2>
            <p className="text-blue-200/60 text-[10px] uppercase tracking-[0.2em]">Creative Essence & Life Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-xs text-pink-500/80 font-mono">CREATIVE MODE</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-pink-500/20">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <Palette className="w-12 h-12 mb-4 text-pink-400" />
            <p className="text-sm italic">"Hey there... I'm Hayat. Let's breathe life into this vision."</p>
            <p className="text-xs mt-2">I'm your creative essence. How can I inspire you today?</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", 
              m.role === "user" ? "bg-blue-600" : "bg-pink-500")}>
              {m.role === "user" ? <User className="w-4 h-4 text-white" /> : <Palette className="w-4 h-4 text-white" />}
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
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-pink-500/20 bg-[#0A0E1A]">
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
            placeholder="Talk to Hayat..."
            className="w-full bg-white/5 border border-pink-500/30 rounded-xl py-3 pl-4 pr-12 text-sm text-blue-50 placeholder:text-blue-200/30 focus:outline-none focus:border-pink-500 transition-colors resize-none h-12"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
