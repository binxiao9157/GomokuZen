import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Info, Github, Globe, Mail } from 'lucide-react';

export default function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto pb-32">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">关于我们</h2>
      </header>

      <section className="space-y-6">
        <div className="bg-surface/40 rounded-[2rem] p-6 border border-white/5 space-y-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Info className="text-primary" size={40} />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">Gomoku Zen</h3>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Gomoku Zen 是一款致力于提供极致“禅意”体验的五子棋应用。我们相信，博弈不仅是胜负的较量，更是一次心灵的修行。
          </p>
        </div>

        <div className="bg-surface/40 rounded-[2rem] p-6 border border-white/5 space-y-4">
          <h4 className="text-lg sm:text-xl font-bold text-white">核心理念</h4>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            我们追求极简的设计风格、平滑的交互体验和具有挑战性的 AI 对手。无论您是初学者还是资深棋手，都能在这里找到属于自己的宁静。
          </p>
        </div>

        <div className="bg-surface/40 rounded-[2rem] p-6 border border-white/5 space-y-4">
          <h4 className="text-lg sm:text-xl font-bold text-white">联系我们</h4>
          <div className="space-y-3">
            <ContactItem icon={<Globe size={18} />} label="官方网站" value="www.gomokuzen.com" />
            <ContactItem icon={<Github size={18} />} label="GitHub" value="github.com/gomokuzen" />
            <ContactItem icon={<Mail size={18} />} label="电子邮箱" value="support@gomokuzen.com" />
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-xs sm:text-sm text-white/20 uppercase tracking-widest">Version 1.0.0 (Zen Edition)</p>
          <p className="text-xs sm:text-sm text-white/20 mt-1">© 2026 Gomoku Zen Team. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3 text-white/60">
        {icon}
        <span className="text-sm sm:text-base font-medium">{label}</span>
      </div>
      <span className="text-sm sm:text-base text-primary font-bold">{value}</span>
    </div>
  );
}
