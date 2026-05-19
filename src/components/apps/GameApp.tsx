'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GameApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  // A very simple reaction game for the "Game Center"
  return (
    <div className="h-full flex flex-col items-center justify-center p-6" style={{ background: 'rgba(8,8,14,0.98)' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          CYBER REACTION
        </h1>
        <p className="text-zinc-400 font-mono text-sm mb-8">Test your cyber-enhancements.</p>

        {!isPlaying ? (
          <button
            onClick={() => { setIsPlaying(true); setScore(0); }}
            className="px-8 py-3 rounded-lg font-bold tracking-widest text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(45deg, #bf00ff, #00d4ff)', boxShadow: '0 0 20px rgba(191,0,255,0.4)' }}
          >
            START SIMULATION
          </button>
        ) : (
          <div className="space-y-6">
            <p className="text-2xl font-mono text-cyan-400">Score: {score}</p>
            <div className="grid grid-cols-3 gap-4 w-64 h-64 mx-auto">
              {Array.from({ length: 9 }).map((_, i) => {
                const isActive = Math.floor(Math.random() * 9) === i;
                return (
                  <button
                    key={i}
                    onClick={() => { if (isActive) setScore(s => s + 10); else setScore(s => Math.max(0, s - 5)); }}
                    className="rounded-lg transition-colors duration-200"
                    style={{
                      background: isActive ? '#00ff41' : 'rgba(255,255,255,0.05)',
                      boxShadow: isActive ? '0 0 15px #00ff41' : 'none',
                    }}
                  />
                );
              })}
            </div>
            <button onClick={() => setIsPlaying(false)} className="text-xs text-zinc-500 hover:text-white transition-colors">
              ABORT SIMULATION
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
