/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, User, Menu, Search, Bell, Grid3X3 } from 'lucide-react';
import HomeView from './components/HomeView';
import GameView from './components/GameView';
import NearbyView from './components/NearbyView';
import ProfileView from './components/ProfileView';
import RulesView from './components/RulesView';
import ChatView from './components/ChatView';
import HistoryView from './components/HistoryView';
import AboutView from './components/AboutView';

type View = 'home' | 'game' | 'nearby' | 'profile' | 'rules' | 'chat' | 'history' | 'about';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView onStartGame={() => setCurrentView('game')} onShowRules={() => setCurrentView('rules')} />;
      case 'game': return <GameView onExit={() => setCurrentView('home')} />;
      case 'nearby': return <NearbyView />;
      case 'profile': return (
        <ProfileView 
          onOpenChat={() => setCurrentView('chat')} 
          onOpenHistory={() => setCurrentView('history')}
          onOpenAbout={() => setCurrentView('about')}
        />
      );
      case 'rules': return <RulesView onBack={() => setCurrentView('home')} />;
      case 'chat': return <ChatView onBack={() => setCurrentView('profile')} />;
      case 'history': return <HistoryView onBack={() => setCurrentView('profile')} />;
      case 'about': return <AboutView onBack={() => setCurrentView('profile')} />;
      default: return <HomeView onStartGame={() => setCurrentView('game')} onShowRules={() => setCurrentView('rules')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button className="text-white/40 hover:text-primary transition-colors">
            <Grid3X3 size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-primary font-bold tracking-tighter text-xl uppercase font-headline">GOMOKU ZEN</h1>
            <p className="text-[10px] text-white/40 tracking-widest uppercase -mt-1">禅棋战队 (12)</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/40 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="text-white/40 hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-24 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full h-20 bg-background/90 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center px-8 z-50 rounded-t-[2.5rem] shadow-2xl">
        <NavButton 
          active={currentView === 'home'} 
          onClick={() => setCurrentView('home')} 
          icon={<Home size={24} />} 
          label="首页" 
        />
        <NavButton 
          active={currentView === 'nearby'} 
          onClick={() => setCurrentView('nearby')} 
          icon={<Compass size={24} />} 
          label="附近" 
        />
        <NavButton 
          active={currentView === 'profile'} 
          onClick={() => setCurrentView('profile')} 
          icon={<User size={24} />} 
          label="我的" 
        />
      </nav>

      {/* Background Glows */}
      <div className="fixed top-1/4 -right-20 w-80 h-80 bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 -left-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-primary scale-110' : 'text-white/40 grayscale'}`}
    >
      <div className={active ? 'text-neon-glow' : ''}>{icon}</div>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
