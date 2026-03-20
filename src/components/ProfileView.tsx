import React from 'react';
import { History, MessageSquare, Settings, Info, ChevronRight, Award, LogOut } from 'lucide-react';

export default function ProfileView({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center space-y-4 py-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-tertiary">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface p-1">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Alex" 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
          </div>
          <div className="absolute bottom-1 right-1 bg-primary text-black rounded-full px-3 py-1 text-[10px] font-bold tracking-tighter shadow-lg">
            PRO
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Alex</h2>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Award size={14} className="text-primary mr-2" />
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase">禅棋大师</span>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-3 gap-3">
        <StatCard label="胜局" value="128" color="primary" />
        <StatCard label="败局" value="42" color="white" />
        <StatCard label="胜率" value="75%" color="tertiary" />
      </section>

      {/* Menu List */}
      <section className="bg-surface/40 rounded-[2rem] p-2 space-y-1 border border-white/5">
        <MenuItem icon={<History size={20} />} label="对局记录" color="primary" />
        <MenuItem 
          icon={<MessageSquare size={20} />} 
          label="战队聊天" 
          color="secondary" 
          badge 
          onClick={onOpenChat}
        />
        <MenuItem icon={<Settings size={20} />} label="设置" color="tertiary" />
        <MenuItem icon={<Info size={20} />} label="关于我们" color="white" />
      </section>

      {/* Logout */}
      <button className="w-full py-4 rounded-full border border-white/10 text-white/40 font-bold hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/20 active:scale-95 transition-all flex items-center justify-center gap-2">
        <LogOut size={18} /> 退出登录
      </button>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  const colorClass = color === 'primary' ? 'text-primary' : color === 'tertiary' ? 'text-tertiary' : 'text-white';
  return (
    <div className="bg-surface/60 rounded-3xl p-5 flex flex-col items-center justify-center space-y-1 relative overflow-hidden group border border-white/5">
      <div className="absolute inset-0 wood-texture" />
      <span className="text-white/40 text-[10px] font-medium tracking-widest uppercase">{label}</span>
      <span className={`text-2xl font-bold ${colorClass}`}>{value}</span>
    </div>
  );
}

function MenuItem({ icon, label, color, badge, onClick }: { icon: React.ReactNode, label: string, color: string, badge?: boolean, onClick?: () => void }) {
  const hoverColor = color === 'primary' ? 'group-hover:bg-primary/10 group-hover:text-primary' : 
                     color === 'secondary' ? 'group-hover:bg-secondary/10 group-hover:text-secondary' :
                     color === 'tertiary' ? 'group-hover:bg-tertiary/10 group-hover:text-tertiary' : 'group-hover:bg-white/10';
  
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 active:scale-[0.98] transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-colors ${hoverColor}`}>
          {icon}
        </div>
        <span className="font-medium text-white/90 group-hover:text-white">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />}
        <ChevronRight size={18} className="text-white/20 group-hover:text-white/60 transition-colors" />
      </div>
    </button>
  );
}
