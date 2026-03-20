import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Undo2, RotateCcw, LogOut, Cpu } from 'lucide-react';

const BOARD_SIZE = 15;

type Player = 'black' | 'white' | null;

export default function GameView({ onExit }: { onExit: () => void }) {
  const [board, setBoard] = useState<Player[][]>(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [history, setHistory] = useState<Player[][][]>([]);

  const checkWin = (r: number, c: number, player: Player) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    for (const [dr, dc] of directions) {
      let count = 1;
      // Check forward
      for (let i = 1; i < 5; i++) {
        const nr = r + dr * i, nc = c + dc * i;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) count++;
        else break;
      }
      // Check backward
      for (let i = 1; i < 5; i++) {
        const nr = r - dr * i, nc = c - dc * i;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) count++;
        else break;
      }
      if (count >= 5) return true;
    }
    return false;
  };

  const placeStone = useCallback((r: number, c: number) => {
    if (board[r][c] || winner) return;

    const newBoard = board.map(row => [...row]);
    const currentPlayer = isBlackTurn ? 'black' : 'white';
    newBoard[r][c] = currentPlayer;
    
    setHistory([...history, board.map(row => [...row])]);
    setBoard(newBoard);

    if (checkWin(r, c, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setIsBlackTurn(!isBlackTurn);
    }
  }, [board, isBlackTurn, winner, history]);

  // Simple AI Move
  useEffect(() => {
    if (!isBlackTurn && !winner) {
      const timer = setTimeout(() => {
        // Very basic AI: find first empty spot or random
        const emptySpots: [number, number][] = [];
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (!board[r][c]) emptySpots.push([r, c]);
          }
        }
        if (emptySpots.length > 0) {
          const [r, c] = emptySpots[Math.floor(Math.random() * emptySpots.length)];
          placeStone(r, c);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isBlackTurn, winner, board, placeStone]);

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setIsBlackTurn(true);
    setWinner(null);
    setHistory([]);
  };

  const undoMove = () => {
    if (history.length > 0) {
      const prevBoard = history[history.length - 1];
      setBoard(prevBoard);
      setHistory(history.slice(0, -1));
      setIsBlackTurn(!isBlackTurn);
      setWinner(null);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-between px-4 py-6 sm:py-8 max-w-lg mx-auto">
      {/* Player Status */}
      <section className="w-full flex justify-between items-center gap-2 sm:gap-4">
        <div className={`flex flex-col items-center gap-1 sm:gap-2 transition-all duration-500 ${isBlackTurn ? 'scale-105 sm:scale-110' : 'opacity-50'}`}>
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 ${isBlackTurn ? 'border-primary neon-glow' : 'border-white/10'} overflow-hidden`}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Me" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-sm font-bold text-white/90">我 (黑棋)</p>
            <p className="text-lg sm:text-2xl font-black text-primary font-headline tabular-nums">14:28</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[8px] sm:text-[10px] font-black text-white/20 tracking-[0.4em] mb-1">BATTLE</div>
          <div className="h-0.5 w-8 sm:w-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-bold text-secondary">LV.5</div>
        </div>

        <div className={`flex flex-col items-center gap-1 sm:gap-2 transition-all duration-500 ${!isBlackTurn ? 'scale-105 sm:scale-110' : 'opacity-50'}`}>
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 ${!isBlackTurn ? 'border-secondary' : 'border-white/10'} bg-surface flex items-center justify-center`}>
            <Cpu className="text-white/30 w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-sm font-bold text-white/90">禅意 AI (白棋)</p>
            <p className="text-lg sm:text-2xl font-black text-white/40 font-headline tabular-nums">15:00</p>
          </div>
        </div>
      </section>

      {/* Board */}
      <div className="relative w-full aspect-square max-w-[400px]">
        <div className="w-full h-full rounded-2xl p-1.5 sm:p-2 bg-surface shadow-2xl border border-white/5 overflow-hidden">
          <div className="w-full h-full rounded-xl relative overflow-hidden flex items-center justify-center bg-[#2a1b0c]">
            <div className="absolute inset-0 wood-texture opacity-30" />
            
            {/* Grid */}
            <div 
              className="absolute inset-3 sm:inset-4 pointer-events-none opacity-20"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(14, 1fr)',
                gridTemplateRows: 'repeat(14, 1fr)'
              }}
            >
              {Array(15).fill(0).map((_, i) => (
                <React.Fragment key={i}>
                  <div className="absolute w-full h-[1px] bg-black" style={{ top: `${(i / 14) * 100}%` }} />
                  <div className="absolute h-full w-[1px] bg-black" style={{ left: `${(i / 14) * 100}%` }} />
                </React.Fragment>
              ))}
            </div>

            {/* Stones */}
            <div 
              className="absolute inset-3 sm:inset-4"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(15, 1fr)',
                gridTemplateRows: 'repeat(15, 1fr)'
              }}
            >
              {board.map((row, r) => row.map((cell, c) => (
                <div 
                  key={`${r}-${c}`} 
                  onClick={() => placeStone(r, c)}
                  className="relative flex items-center justify-center cursor-pointer group"
                >
                  {cell && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-[85%] h-[85%] rounded-full shadow-lg ${
                        cell === 'black' 
                          ? 'bg-gradient-to-br from-zinc-700 to-black' 
                          : 'bg-gradient-to-br from-white to-zinc-300'
                      }`}
                    />
                  )}
                  {!cell && !winner && isBlackTurn && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              )))}
            </div>
          </div>
        </div>

        {/* Turn Indicator */}
        <AnimatePresence>
          {!winner && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full animate-pulse" />
              <span className="text-[8px] sm:text-[10px] font-black text-black tracking-widest uppercase">
                {isBlackTurn ? '轮到你了' : 'AI 思考中...'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Win Overlay */}
        <AnimatePresence>
          {winner && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-primary text-neon-glow mb-4 uppercase">
                {winner === 'black' ? 'YOU WIN' : 'AI WINS'}
              </h2>
              <button 
                onClick={resetGame}
                className="bg-primary text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold flex items-center gap-2 active:scale-95 transition-transform text-sm sm:text-base"
              >
                <RotateCcw size={18} /> 重新开始
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <section className="w-full flex justify-between items-center gap-3 sm:gap-4">
        <button 
          onClick={undoMove}
          className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl glass-panel flex flex-col items-center gap-0.5 sm:gap-1 active:scale-95 transition-all group"
        >
          <Undo2 className="text-white/60 group-hover:text-white w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[10px] sm:text-xs font-bold text-white/60">悔棋</span>
        </button>
        <button 
          onClick={resetGame}
          className="flex-[1.5] py-4 sm:py-5 rounded-full bg-primary neon-glow flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 transition-all"
        >
          <RotateCcw className="text-black w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-black text-black">重新开始</span>
        </button>
        <button 
          onClick={onExit}
          className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl glass-panel flex flex-col items-center gap-0.5 sm:gap-1 active:scale-95 transition-all group hover:bg-red-500/10"
        >
          <LogOut className="text-red-400/60 group-hover:text-red-400 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[10px] sm:text-xs font-bold text-white/60">退出</span>
        </button>
      </section>
    </div>
  );
}
