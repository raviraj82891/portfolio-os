'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

const catIcons: Record<string, string> = { 
  frontend: '🎨', 
  backend: '⚙️', 
  languages: '💻', 
  cyberSecurity: '🔒', 
  gameEngines: '🎮', 
  tools: '🛠️' 
};

const catColors: Record<string, string> = { 
  frontend: '#6366f1', 
  backend: '#22c55e', 
  languages: '#8b5cf6', 
  cyberSecurity: '#f43f5e', 
  gameEngines: '#f59e0b', 
  tools: '#14b8a6' 
};

// Deterministic helper to generate a stable skill percentage (74% - 98%)
// This prevents random flickering/jumps on state updates or window focuses.
function getDeterministicLevel(skillName: string): number {
  let hash = 0;
  for (let i = 0; i < skillName.length; i++) {
    hash = skillName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const variance = Math.abs(hash) % 25; // 0 to 24
  return 74 + variance; // 74% to 98%
}

export default function SkillsApp() {
  return (
    <div 
      className="h-full overflow-y-auto px-5 py-5 flex flex-col gap-4 text-zinc-200" 
      style={{ 
        background: 'radial-gradient(circle at 50% 0%, rgba(30, 27, 75, 0.12) 0%, rgba(14, 14, 20, 0.99) 80%)',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.1) transparent'
      }}
    >
      {/* Header */}
      <div className="mb-1">
        <motion.h1 
          className="type-heading flex items-center gap-2" 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
        >
          <span>⚡</span> Skill Matrix
        </motion.h1>
        <motion.p 
          className="type-caption mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Dynamic visualization of engineering capabilities and tools
        </motion.p>
      </div>

      {/* Grid of Categories */}
      <div className="space-y-4">
        {Object.entries(SKILLS).map(([category, skills], ci) => {
          const color = catColors[category] || '#6366f1';
          const icon = catIcons[category] || '📦';
          
          return (
            <motion.div 
              key={category} 
              className="relative rounded-xl p-4 border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-300"
              style={{
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.01)'
              }}
              initial={{ opacity: 0, y: 12 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: ci * 0.04, ease: 'easeOut' }}
              whileHover={{ 
                borderColor: `${color}30`, 
                background: 'rgba(255,255,255,0.02)',
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px ${color}08`
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">{icon}</span>
                <h2 
                  className="type-label" 
                  style={{ color }}
                >
                  {category}
                </h2>
                <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
              </div>

              {/* Skills Progress List */}
              <div className="space-y-2.5">
                {(skills as string[]).map((skill, si) => {
                  const level = getDeterministicLevel(skill);
                  
                  return (
                    <motion.div 
                      key={skill} 
                      className="flex items-center gap-3 group/skill" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: ci * 0.04 + si * 0.02 }}
                    >
                      {/* Skill Name */}
                      <span className="type-body group-hover/skill:text-zinc-100 transition-colors w-24 truncate" style={{ fontSize: 'var(--type-xs)' }}>
                        {skill}
                      </span>
                      
                      {/* Progress Track */}
                      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.02] relative">
                        <motion.div 
                          className="h-full rounded-full absolute left-0 top-0" 
                          style={{ 
                            background: `linear-gradient(90deg, ${color}cc, ${color})`,
                            boxShadow: `0 0 8px ${color}40`
                          }} 
                          initial={{ width: 0 }} 
                          animate={{ width: `${level}%` }} 
                          transition={{ 
                            delay: ci * 0.04 + si * 0.02 + 0.15, 
                            duration: 0.8, 
                            ease: [0.25, 1, 0.5, 1] 
                          }} 
                        />
                      </div>
                      
                      {/* Percentage Badge */}
                      <span className="type-mono text-zinc-500 group-hover/skill:text-zinc-200 w-8 text-right tabular-nums transition-colors">
                        {level}%
                      </span>
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
