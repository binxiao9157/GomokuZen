import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Info, Target, ShieldAlert, Zap } from 'lucide-react';

export default function RulesView({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto pb-32">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">游戏规则</h2>
      </header>

      <section className="space-y-6">
        <RuleSection 
          icon={<Target className="text-primary" />} 
          title="基本目标" 
          content="五子棋（Gomoku）是一种两人对弈的纯策略型棋类游戏。对弈双方各执黑白棋子，在棋盘直线与横线的交叉点上落子。先在横线、竖线或斜线上形成连续五个棋子的一方获胜。"
        />

        <RuleSection 
          icon={<Zap className="text-secondary" />} 
          title="落子规则" 
          content="黑方先行，双方轮流落子。落子后不可移动或收回。本应用采用 15x15 标准棋盘。在禅意模式下，请保持心境平和，每一步棋都是一次修行。"
        />

        <RuleSection 
          icon={<ShieldAlert className="text-tertiary" />} 
          title="禁手说明 (专业模式)" 
          content="为了平衡黑方先行优势，专业比赛通常包含“禁手”规则（如三三禁手、四四禁手、长连禁手）。在本应用的“禅意对局”中，我们默认采用自由对弈规则，让博弈回归本质。"
        />

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Info size={20} />
            <h4 className="font-bold uppercase tracking-widest text-xs">禅意小贴士</h4>
          </div>
          <p className="text-sm text-white/70 leading-relaxed italic">
            “棋局如人生，落子无悔。在对弈中观察对手，亦是在观察自己。胜负之外，更有意境。”
          </p>
        </div>
      </section>

      <button 
        onClick={onBack}
        className="w-full py-4 bg-primary text-black rounded-full font-bold neon-glow active:scale-95 transition-transform"
      >
        我明白了
      </button>
    </div>
  );
}

function RuleSection({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="bg-surface/40 rounded-[2rem] p-6 border border-white/5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-white">{title}</h3>
      </div>
      <p className="text-sm text-white/60 leading-relaxed">
        {content}
      </p>
    </div>
  );
}
