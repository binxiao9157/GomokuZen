import React from 'react';
import { MapPin, Trophy, Play, Swords, RefreshCw } from 'lucide-react';

const PLAYERS = [
  { id: 1, name: '沈梦曦', rank: '业余五段', winRate: '68%', dist: '0.8km', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna', status: 'busy' },
  { id: 2, name: '陈默 / Silence', rank: '专业三段', winRate: '82%', dist: '1.2km', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ken', status: 'online' },
  { id: 3, name: '林雪见', rank: '初级棋手', winRate: '45%', dist: '2.5km', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki', status: 'online' },
];

export default function NearbyView() {
  return (
    <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto">
      <section>
        <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">附近棋友</h2>
        <div className="flex items-center gap-2 text-white/40 text-sm tracking-wide">
          <MapPin size={14} className="text-primary" />
          <span>正在寻找 5km 内的对手...</span>
        </div>
      </section>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        <Chip active label="全部" />
        <Chip label="高手" />
        <Chip label="新人" />
        <Chip label="距离最近" />
      </div>

      <div className="space-y-4">
        {PLAYERS.map(player => (
          <div key={player.id} className="bg-surface/40 hover:bg-surface rounded-[2rem] p-5 flex items-center gap-4 transition-all duration-300 border border-white/5 group">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full overflow-hidden ring-2 ${player.status === 'busy' ? 'ring-secondary/30' : 'ring-primary/30'} group-hover:ring-opacity-100 transition-all`}>
                <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${player.status === 'busy' ? 'bg-secondary animate-pulse' : 'bg-primary'}`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{player.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-md uppercase font-bold ${player.status === 'busy' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                  {player.rank}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-white/40">
                <span className="flex items-center gap-1"><Trophy size={12} /> 胜率 {player.winRate}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {player.dist}</span>
              </div>
            </div>

            <button className={`px-6 py-2 rounded-full text-sm font-bold active:scale-95 transition-all ${
              player.status === 'busy' 
                ? 'bg-white/5 text-white hover:bg-secondary hover:text-black' 
                : 'bg-primary text-black neon-glow'
            }`}>
              {player.status === 'busy' ? '观战' : '挑战'}
            </button>
          </div>
        ))}
      </div>

      <button className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-black rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-transform z-40 neon-glow">
        <RefreshCw size={24} />
      </button>
    </div>
  );
}

function Chip({ label, active }: { label: string, active?: boolean }) {
  return (
    <button className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap border transition-all ${
      active ? 'bg-primary text-black border-primary' : 'bg-surface text-white/40 border-white/5'
    }`}>
      {label}
    </button>
  );
}
