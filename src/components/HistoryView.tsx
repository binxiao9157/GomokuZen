import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Trophy, Clock, User } from 'lucide-react';

const MOCK_HISTORY = [
  { id: 1, opponent: '禅意 AI', result: 'win', mode: '人机对战', date: '2026-03-19 14:20', duration: '12:45' },
  { id: 2, opponent: 'Kensei_Master', result: 'lose', mode: '联机对战', date: '2026-03-18 20:15', duration: '08:30' },
  { id: 3, opponent: 'Grandmaster_Qi', result: 'win', mode: '联机对战', date: '2026-03-17 10:05', duration: '15:20' },
  { id: 4, opponent: '禅意 AI', result: 'win', mode: '人机对战', date: '2026-03-16 16:40', duration: '10:10' },
];

export default function HistoryView({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto pb-32">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">对局记录</h2>
      </header>

      <div className="space-y-4">
        {MOCK_HISTORY.map((match) => (
          <motion.div 
            key={match.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/40 rounded-[2rem] p-5 border border-white/5 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${match.result === 'win' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                  <Trophy size={20} />
                </div>
                <div>
                  <p className="font-bold text-base sm:text-lg text-white">{match.opponent}</p>
                  <p className="text-xs sm:text-sm text-white/40">{match.mode}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg sm:text-xl font-black uppercase tracking-tighter ${match.result === 'win' ? 'text-primary' : 'text-red-500'}`}>
                  {match.result === 'win' ? 'WIN' : 'LOSE'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs sm:text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{match.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={14} />
                <span>耗时 {match.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
