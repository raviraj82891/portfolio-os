'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

const catIcons: Record<string, string> = { frontend: '🎨', backend: '⚙️', languages: '💻', cyberSecurity: '🔒', gameEngines: '🎮', tools: '🛠️' };
const catColors: Record<string, string> = { frontend: '#6366f1', backend: '#22c55e', languages: '#8b5cf6', cyberSecurity: '#f43f5e', gameEngines: '#f59e0b', tools: '#14b8a6' };

export default function SkillsApp() {
  return (
    <div className="h-full overflow-y-auto px-5 py-4" style={{ background: 'rgba(14,14,20,0.98)' }}>
      <motion.h1 className="text-base font-bold mb-3 text-indigo-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: "'Outfit', sans-serif" }}>
        ⚡ Skill Matrix
      </motion.h1>
      <div className="space-y-3">
        {Object.entries(SKILLS).map(([category, skills], ci) => {
          const color = catColors[category] || '#6366f1';
          return (
            <motion.div key={category} className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ci * 0.06 }}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-base">{catIcons[category] || '📦'}</span>
                <h2 className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>{category}</h2>
                <div className="flex-1 h-px ml-1" style={{ background: `${color}18` }} />
              </div>
              <div className="space-y-1.5">
                {(skills as string[]).map((skill, si) => {
                  const level = 60 + Math.random() * 35;
                  return (
                    <motion.div key={skill} className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: ci * 0.06 + si * 0.03 }}>
                      <span className="text-[11px] text-zinc-400 w-24 truncate">{skill}</span>
                      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} initial={{ width: 0 }} animate={{ width: `${level}%` }} transition={{ delay: ci * 0.06 + si * 0.03 + 0.2, duration: 0.6, ease: 'easeOut' }} />
                      </div>
                      <span className="text-[10px] text-zinc-500 w-7 text-right tabular-nums">{Math.round(level)}%</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
