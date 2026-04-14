import React from 'react';
import { motion } from 'motion/react';
import { Heart, Moon, Sun, BookOpen, Compass, Shield, Star, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

const WISDOM_CARDS = [
  { title: 'The Path of Ma\'at', content: 'Balance, truth, and justice as the foundation of existence.', category: 'Ethics' },
  { title: 'Ana-Muslim Identity', content: 'A modern synthesis of faith, science, and global citizenship.', category: 'Identity' },
  { title: 'Historical Resilience', content: 'Lessons from the 3rd Hijri century: A time of thriving world.', category: 'History' },
  { title: 'The Future of Humanity', content: 'Integrating AI as a companion in the human journey.', category: 'Vision' },
];

export const LifeHub: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/40 shadow-lg shadow-rose-500/20">
            <Heart className="text-rose-400 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Life Hub</h2>
            <p className="text-rose-200/60 text-sm uppercase tracking-widest font-mono">Ana-Muslim Lifestyle • Wisdom • Legacy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WISDOM_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0A0E1A] border border-white/5 rounded-[2rem] p-8 hover:border-rose-500/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Star className="w-16 h-16 text-rose-400" />
            </div>
            
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-4 block">{card.category}</span>
            <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
            <p className="text-xs text-blue-200/60 leading-relaxed mb-6">{card.content}</p>
            
            <button className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2 uppercase tracking-widest">
              Explore Wisdom <Zap className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lifestyle Integration */}
        <div className="bg-gradient-to-br from-rose-900/20 to-purple-900/20 border border-rose-500/20 rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/40">
              <Compass className="text-rose-400 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Lifestyle Integration</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <Moon className="w-6 h-6 text-rose-400" />
                <div>
                  <p className="font-bold text-blue-50">Daily Reflection Protocol</p>
                  <p className="text-[10px] text-blue-200/40 uppercase tracking-widest">Spiritual & Mental Alignment</p>
                </div>
              </div>
              <button className="p-3 bg-rose-500/20 rounded-xl text-rose-400 hover:bg-rose-500/40 transition-all">
                <Zap className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <Sun className="w-6 h-6 text-gold-400" />
                <div>
                  <p className="font-bold text-blue-50">Scientific Fasting Guide</p>
                  <p className="text-[10px] text-blue-200/40 uppercase tracking-widest">Biological Optimization</p>
                </div>
              </div>
              <button className="p-3 bg-gold-500/20 rounded-xl text-gold-400 hover:bg-gold-500/40 transition-all">
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Historical Literature */}
        <div className="bg-[#0A0E1A] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/40">
              <BookOpen className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Historical Literature</h3>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 relative group hover:bg-white/10 transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield className="w-16 h-16 text-blue-400" />
            </div>
            <h4 className="text-lg font-bold text-blue-50 mb-2">The Rise and Decline of Civilizations</h4>
            <p className="text-xs text-blue-200/60 leading-relaxed mb-6">
              "A critical analysis of the factors that led to the scientific and cultural peak of the 3rd Hijri century, and the subsequent trajectory of the Muslim world."
            </p>
            <button className="px-6 py-2 bg-blue-600/20 border border-blue-500/40 rounded-full text-xs font-bold text-blue-200 hover:bg-blue-600/40 transition-all">
              Read Full Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
