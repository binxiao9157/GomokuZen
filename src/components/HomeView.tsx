import React from 'react';
import { motion } from 'motion/react';
import { Rocket, BookOpen, Users, Gamepad2, Bot, Globe, MapPin, PlusCircle } from 'lucide-react';

export default function HomeView({ onStartGame, onShowRules }: { onStartGame: () => void, onShowRules: () => void }) {
  return (
    <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="relative group">
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center p-4">
          <div className="absolute inset-0 wood-texture" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
          
          {/* Decorative Stones */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute top-0 left-1/4 w-12 h-12 bg-white rounded-full shadow-lg" />
              <div className="absolute top-1/3 right-0 w-12 h-12 bg-black rounded-full shadow-xl border border-white/10" />
              <div className="absolute bottom-0 left-1/2 w-12 h-12 bg-primary rounded-full shadow-lg neon-glow" />
            </div>
          </div>

          <div className="absolute bottom-8 left-8 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Master the <br />
              <span className="text-primary text-neon-glow">Art of Five</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Main Actions */}
      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={onStartGame}
          className="bg-primary text-black flex flex-col items-center justify-center py-6 rounded-3xl active:scale-95 transition-all duration-300 neon-glow group"
        >
          <Rocket className="mb-2 group-hover:translate-y-[-4px] transition-transform" />
          <span className="font-bold tracking-wide">快速匹配</span>
        </button>
        <button 
          onClick={onShowRules}
          className="bg-surface border border-white/10 flex flex-col items-center justify-center py-6 rounded-3xl active:scale-95 transition-all duration-300 group"
        >
          <BookOpen className="mb-2 text-secondary group-hover:scale-110 transition-transform" />
          <span className="font-bold tracking-wide">游戏规则</span>
        </button>
      </section>

      {/* Stats Bento */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface/40 backdrop-blur-md rounded-3xl p-6 border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center">
            <Users className="text-tertiary" size={20} />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">在线人数</p>
            <p className="text-2xl font-black text-white">12,482</p>
          </div>
        </div>
        <div className="bg-surface/40 backdrop-blur-md rounded-3xl p-6 border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Gamepad2 className="text-secondary" size={20} />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">今日对局</p>
            <p className="text-2xl font-black text-white">85.4k</p>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-on-surface-variant tracking-[0.2em] uppercase px-2">对战模式</h3>
        <div className="space-y-3">
          <ModeCard 
            icon={<Bot className="text-primary" />} 
            title="人机对战" 
            desc="挑战不同难度的 AI" 
            onClick={onStartGame}
          />
          <ModeCard 
            icon={<Globe className="text-secondary" />} 
            title="联机对战" 
            desc="与全球玩家实时切磋" 
          />
          <ModeCard 
            icon={<MapPin className="text-tertiary" />} 
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
