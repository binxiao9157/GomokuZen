import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Send, Plus, Smile, MoreVertical } from 'lucide-react';

const MOCK_MESSAGES = [
  { id: 1, user: 'Kensei_Master', text: '刚刚那局五子棋死里逃生，绝了！大家看看这个布局。', time: '14:20', isMe: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kensei' },
  { id: 2, user: 'Cherry_Blossom', text: '恭喜！战队的周积分又要涨了 📈', time: '14:22', isMe: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cherry' },
  { id: 3, user: 'Alex', text: '今晚的联赛我一定准时参加！', time: '14:25', isMe: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 4, user: 'Grandmaster_Qi', text: '战队联赛今晚八点开始，大家准备好。', time: '14:28', isMe: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Qi' },
];

export default function ChatView({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: Date.now(),
      user: 'Alex',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="h-full flex flex-col bg-background relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white font-headline">战队聊天室</h2>
            <p className="text-[10px] text-primary/60 tracking-widest uppercase">禅棋战队 (12人在线)</p>
          </div>
        </div>
        <button className="text-white/40 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 pt-20 pb-28 px-4 overflow-y-auto space-y-6 no-scrollbar"
      >
        <div className="flex justify-center">
          <span className="text-[10px] font-label tracking-[0.2em] text-white/20 uppercase bg-surface/40 px-3 py-1 rounded-full">Today 14:20</span>
        </div>

        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: msg.isMe ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-end gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
              <img src={msg.avatar} alt={msg.user} className="w-full h-full object-cover" />
            </div>
            <div className={`flex flex-col gap-1 max-w-[80%] ${msg.isMe ? 'items-end' : ''}`}>
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider px-2">
                {msg.user}
              </span>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.isMe 
                  ? 'bg-primary text-black rounded-br-none' 
                  : 'glass-panel text-white rounded-bl-none'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-white/20 px-2">{msg.time}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-2xl px-6 pb-8 pt-4 rounded-t-[2.5rem] border-t border-white/5 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
            <Plus size={24} />
          </button>
          <div className="flex-1 relative">
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-white/5 border-none focus:ring-1 focus:ring-primary/30 rounded-full py-3 px-5 text-sm placeholder:text-white/20 text-white transition-all" 
              placeholder="发送消息..." 
              type="text" 
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              <Smile size={20} />
            </button>
          </div>
          <button 
            onClick={handleSend}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black shadow-lg active:scale-90 transition-all duration-300 neon-glow disabled:opacity-50 disabled:grayscale"
            disabled={!inputValue.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
