'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/data/portfolio';

const catColors: Record<string, string> = { web: '#6366f1', ai: '#8b5cf6', mobile: '#22c55e', game: '#f59e0b' };

export default function ProjectsApp() {
  return (
    <div className="h-full overflow-y-auto px-5 py-4" style={{ background: 'rgba(14,14,20,0.98)' }}>
      <motion.h1
        className="text-base font-bold mb-3"
        style={{ color: '#818cf8', fontFamily: "'Outfit', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🚀 Projects
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            className="rounded-lg p-4 group cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="px-2 py-[2px] text-[10px] rounded-full font-medium uppercase tracking-wider"
                style={{ background: `${catColors[project.category] || '#6366f1'}12`, color: catColors[project.category] || '#6366f1' }}
              >
                {project.category}
              </span>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-indigo-400 transition-colors text-[11px] font-medium">
                  ↗ Open
                </a>
              )}
            </div>

            <h3 className="text-[13px] font-semibold text-white mb-1.5 group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-1">
              {project.technologies.map(tech => (
                <span key={tech} className="px-1.5 py-[2px] text-[10px] rounded-md" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
