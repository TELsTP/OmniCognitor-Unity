import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Heart, 
  Stethoscope, 
  Lightbulb, 
  Crown, 
  Sparkles,
  MessageSquare,
  Send,
  ArrowLeft,
  Compass,
  Palette
} from "lucide-react";
import { cn } from "../lib/utils";

const characters = [
  {
    id: "edu",
    name: "EduMentor",
    role: "Academic & Research Guide",
    icon: GraduationCap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Personalized learning pathways and research-assisted study support.",
    initialMessage: "Welcome to your educational journey. What research topic shall we explore today?"
  },
  {
    id: "wellness",
    name: "Wellness Guide",
    role: "Mental & Emotional Support",
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    description: "Holistic mental health and emotional well-being companion.",
    initialMessage: "I'm here to support your emotional balance. How are you feeling today?"
  },
  {
    id: "ibnsina",
    name: "Ibn Sina",
    role: "Traditional Wisdom Keeper",
    icon: Lightbulb,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    description: "Ancient medical wisdom and traditional healthcare knowledge.",
    initialMessage: "Greetings, seeker of wisdom. Let us consult the ancient principles of health."
  },
  {
    id: "doctor",
    name: "Medical Doctor",
    role: "Physical Health Advisor",
    icon: Stethoscope,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description: "Scientific physical wellness and medical advisory support.",
    initialMessage: "Ready for your physical health assessment. Any symptoms or wellness goals?"
  },
  {
    id: "pharaoh",
    name: "Pharaonic Keeper",
    role: "Prosperity & Life Symbol",
    icon: Crown,
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
    border: "border-[#D4AF37]/20",
    description: "Symbol of life, prosperity, and ancient Egyptian leadership wisdom.",
    initialMessage: "May life and prosperity be upon you. Let us build your legacy."
  },
  {
    id: "companion",
    name: "Life Companion",
    role: "Daily Life Assistant",
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    description: "General life wellness and daily productivity companion.",
    initialMessage: "I'm your daily partner in life. What's on our agenda for today?"
  },
  {
    id: "noura",
    name: "Noura",
    role: "TELSTP Ecosystem Guide",
    icon: Compass,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    description: "Your warm and intuitive guide through the entire TELSTP ecosystem, always ready to help.",
    initialMessage: "When we thrive together, the whole world becomes alive. I'm Noura, your guide to this ecosystem. How can I help you navigate our mission today?"
  },
  {
    id: "hayah",
    name: "Hayah",
    role: "Creative Architect & Design Lead",
    icon: Palette,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    description: "A world-class designer and architect, Hayah brings creative intelligence and a chill vibe to your conceptual vision.",
    initialMessage: "Hey there! I'm Hayah... your creative partner. I'm so excited to help you build something beautiful today. What's on your mind? Let's make it real together."
  }
];

export default function CompanionApp() {
  const [selectedChar, setSelectedChar] = useState<typeof characters[0] | null>(null);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim() || !selectedChar) return;
    
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: `As your ${selectedChar.name}, I'm processing your request: "${input}". Let's work together on this.` 
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Personal Companion App</h2>
          <p className="text-blue-200/40 font-medium">Interconnected AI characters for holistic life support, led by Noura & Hayah.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedChar ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => {
                  setSelectedChar(char);
                  setMessages([{ role: "ai", content: char.initialMessage }]);
                }}
                className={cn(
                  "group p-8 rounded-[32px] border text-left transition-all hover:scale-105",
                  char.bg, char.border
                )}
              >
                <char.icon className={cn("w-10 h-10 mb-6", char.color)} />
                <h3 className="text-xl font-black text-white mb-1">{char.name}</h3>
                <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-4", char.color)}>
                  {char.role}
                </p>
                <p className="text-xs text-blue-200/40 leading-relaxed">
                  {char.description}
                </p>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-[#0A0E1A] border border-white/5 rounded-[40px] overflow-hidden flex flex-col h-[600px]"
          >
            {/* Chat Header */}
            <div className={cn("p-6 border-b flex items-center justify-between", selectedChar.border)}>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedChar(null)}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl", selectedChar.bg)}>
                    <selectedChar.icon className={cn("w-6 h-6", selectedChar.color)} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{selectedChar.name}</h3>
                    <p className="text-[10px] text-blue-200/40 font-bold uppercase tracking-widest">{selectedChar.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-[#D4AF37] text-black font-medium rounded-tr-none" 
                      : "bg-white/5 text-blue-200/80 border border-white/10 rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-white/5 bg-white/5">
              <div className="flex gap-4">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={`Message your ${selectedChar.name}...`}
                  className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-blue-200/20 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-4 bg-[#D4AF37] text-black rounded-2xl hover:scale-105 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
