import React from 'react';
import { motion } from 'motion/react';
import { Rocket, BookOpen, Users, Gamepad2, Bot, Globe, MapPin, PlusCircle } from 'lucide-react';

export default function HomeView({ onStartGame, onShowRules }: { onStartGame: () => void, onShowRules: () => void }) {
  return (
    <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="relative group">
        <div className="relative w-full aspect-square sm:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center p-4">
          <div className="absolute inset-0 wood-texture" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
          
          {/* Decorative Stones */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48">
              <div className="absolute top-0 left-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg" />
              <div className="absolute top-1/3 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-black rounded-full shadow-xl border border-white/10" />
              <div className="absolute bottom-0 left-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-primary rounded-full shadow-lg neon-glow" />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Master the <br />
              <span className="text-primary text-neon-glow">Art of Five</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Main Actions */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4">
        <button 
          onClick={onStartGame}
          className="bg-primary text-black flex flex-col items-center justify-center py-4 sm:py-6 rounded-2xl sm:rounded-3xl active:scale-95 transition-all duration-300 neon-glow group"
        >
          <Rocket className="mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-[-4px] transition-transform" />
          <span className="text-sm sm:text-base font-bold tracking-wide">快速匹配</span>
        </button>
        <button 
          onClick={onShowRules}
          className="bg-surface border border-white/10 flex flex-col items-center justify-center py-4 sm:py-6 rounded-2xl sm:rounded-3xl active:scale-95 transition-all duration-300 group"
        >
          <BookOpen className="mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6 text-secondary group-hover:scale-110 transition-transform" />
          <span className="text-sm sm:text-base font-bold tracking-wide">游戏规则</span>
        </button>
      </section>

      {/* Stats Bento */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-surface/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/5 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-tertiary/10 flex items-center justify-center shrink-0">
            <Users className="text-tertiary w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-widest font-bold truncate">在线人数</p>
            <p className="text-lg sm:text-2xl font-black text-white truncate">12,482</p>
          </div>
        </div>
        <div className="bg-surface/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/5 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
            <Gamepad2 className="text-secondary w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-widest font-bold truncate">今日对局</p>
            <p className="text-lg sm:text-2xl font-black text-white truncate">85.4k</p>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="space-y-3 sm:space-y-4">
        <h3 className="text-[10px] sm:text-sm font-bold text-on-surface-variant tracking-[0.2em] uppercase px-2">对战模式</h3>
        <div className="space-y-2 sm:space-y-3">
          <ModeCard 
            icon={<Bot className="text-primary w-5 h-5 sm:w-6 sm:h-6" />} 
            title="人机对战" 
            desc="挑战不同难度的 AI" 
            onClick={onStartGame}
          />
          <ModeCard 
            icon={<Globe className="text-secondary w-5 h-5 sm:w-6 sm:h-6" />} 
            title="联机对战" 
            desc="与全球玩家实时切磋" 
          />
          <ModeCard 
            icon={<MapPin className="text-tertiary w-5 h-5 sm:w-6 sm:h-6" />} 
            title="附近玩家" 
            desc="发现身边的博弈高手" 
          />
        </div>
      </section>

      {/* FAB */}
      <button className="fixed right-6 bottom-24 w-14 h-14 bg-primary text-black rounded-2xl shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform neon-glow">
        <PlusCircle size={28} />
      </button>
    </div>
  );
}

function ModeCard({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-surface/60 hover:bg-surface p-4 rounded-2xl flex items-center justify-between transition-colors cursor-pointer group border border-white/5"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <p className="font-bold text-white">{title}</p>
          <p className="text-xs text-on-surface-variant">{desc}</p>
        </div>
      </div>
      <div className="text-white/20 group-hover:text-primary transition-colors">
        <PlusCircle size={16} />
      </div>
    </div>
  );
}
