'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/portfolio';

const catColors: Record<string, string> = { 
  web: '#6366f1', 
  ai: '#8b5cf6', 
  mobile: '#22c55e', 
  game: '#f59e0b' 
};

const categories = ['all', 'web', 'ai', 'mobile', 'game'] as const;
type Category = (typeof categories)[number];

export default function ProjectsApp() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = activeTab === 'all' || project.category === activeTab;
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesDesc = project.description.toLowerCase().includes(query);
      const matchesTech = project.technologies.some(tech => 
        tech.toLowerCase().includes(query)
      );

      return matchesCategory && (matchesTitle || matchesDesc || matchesTech);
    });
  }, [activeTab, searchQuery]);

  return (
    <div 
      className="h-full overflow-y-auto px-5 py-5 flex flex-col gap-4 text-zinc-200" 
      style={{ 
        background: 'radial-gradient(circle at 50% 0%, rgba(30, 27, 75, 0.15) 0%, rgba(14, 14, 20, 0.99) 80%)',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.1) transparent'
      }}
    >
      {/* Header & Counter */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <motion.h1
            className="type-heading flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>🚀</span> Projects Explorer
          </motion.h1>
          <motion.p 
            className="type-caption mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Browse real source code and direct repositories
          </motion.p>
        </div>

        <motion.div 
          className="px-2.5 py-1 rounded-full border type-mono border-white/5 bg-white/[0.02] text-zinc-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredProjects.length} of {PROJECTS.length} resolved
        </motion.div>
      </div>

      {/* Search Bar & Controls */}
      <motion.div 
        className="relative group"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by project title, description, or technology stack..."
          className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-white/5 text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 bg-white/[0.01] backdrop-blur-md focus:border-indigo-500/40 focus:bg-indigo-950/[0.05]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </motion.div>

      {/* Interactive Tabs Filter */}
      <motion.div 
        className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-white/5 bg-white/[0.01]"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {categories.map((cat) => {
          const isActive = activeTab === cat;
          const color = catColors[cat] || '#6366f1';
          
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="relative px-3 py-1 text-[10px] font-medium tracking-wide uppercase rounded-md cursor-pointer transition-colors duration-300 select-none text-zinc-400 hover:text-white"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-md border"
                  style={{
                    background: `${color}14`,
                    borderColor: `${color}40`,
                    boxShadow: `0 0 10px ${color}12`
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                {cat === 'all' && '🌐'}
                {cat === 'web' && '💻'}
                {cat === 'ai' && '🧠'}
                {cat === 'mobile' && '📱'}
                {cat === 'game' && '🎮'}
                {cat}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Grid Container with AnimatePresence */}
      <motion.div 
        layout="position"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => {
            const color = catColors[project.category] || '#6366f1';
            
            return (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10, transition: { duration: 0.15 } }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: i * 0.02 }}
                className="relative rounded-xl p-4 cursor-pointer group flex flex-col justify-between border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-300"
                style={{
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.02)'
                }}
                whileHover={{
                  y: -4,
                  borderColor: `${color}44`,
                  background: 'rgba(255, 255, 255, 0.02)',
                  boxShadow: `0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${color}14`
                }}
              >
                {/* Visual glow background inside the card on hover */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${color}0b, transparent 60%)`
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="px-2 py-0.5 text-[9px] rounded-full font-bold uppercase tracking-wider border"
                      style={{ 
                        background: `${color}14`, 
                        color: color,
                        borderColor: `${color}25`
                      }}
                    >
                      {project.category}
                    </span>
                    {project.url && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded border border-zinc-800 text-zinc-500 hover:text-white hover:border-indigo-500/50 bg-zinc-950/40 text-[9px] font-semibold flex items-center gap-1 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>Open Repo</span>
                        <motion.span
                          animate={{ x: [0, 1, 0], y: [0, -1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                          ↗
                        </motion.span>
                      </motion.a>
                    )}
                  </div>

                  <h3 className="type-subheading text-white mb-2 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="type-body group-hover:text-zinc-300 transition-colors mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-1 mt-auto pt-2 border-t border-white/[0.03]">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="type-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] group-hover:text-zinc-300 group-hover:border-white/[0.07] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/5 rounded-xl bg-white/[0.005] backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-3xl mb-3">🔍</span>
          <h3 className="text-xs font-semibold text-white mb-1">No matches found</h3>
          <p className="text-[10px] text-zinc-500 max-w-[260px] leading-normal">
            No projects matched your current category and search query "{searchQuery}". Try adjusting your keywords.
          </p>
        </motion.div>
      )}
    </div>
  );
}
