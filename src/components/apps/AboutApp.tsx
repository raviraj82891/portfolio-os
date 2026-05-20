'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL, SKILLS, EDUCATION, CERTIFICATIONS } from '@/data/portfolio';

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

interface Certificate {
  name: string;
  issuer: string;
  image: string;
}

export default function AboutApp() {
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);

  return (
    <div 
      className="h-full overflow-y-auto px-5 py-5 flex flex-col gap-4 text-zinc-200 relative" 
      style={{ 
        background: 'radial-gradient(circle at 50% 0%, rgba(30, 27, 75, 0.1) 0%, rgba(14, 14, 20, 0.99) 80%)',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.1) transparent'
      }}
    >
      {/* Header with profile photo */}
      <motion.div
        className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]"
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.01)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2"
          style={{ 
            borderColor: 'rgba(99,102,241,0.3)',
            boxShadow: '0 8px 24px rgba(99,102,241,0.15)' 
          }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={PERSONAL.profilePhoto}
            alt={PERSONAL.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div>
          <h1 className="type-heading">
            {PERSONAL.name}
          </h1>
          <p className="type-subheading text-indigo-400 mt-0.5">{PERSONAL.title}</p>
          <p className="type-caption mt-1">📍 {PERSONAL.location} · 🎓 {PERSONAL.university}</p>
        </div>
      </motion.div>

      {/* Resume download */}
      <motion.a
        href={PERSONAL.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 cursor-pointer"
        style={{ fontFamily: "'Outfit', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        whileHover={{ 
          scale: 1.01, 
          background: 'rgba(99,102,241,0.15)',
          borderColor: 'rgba(99,102,241,0.4)',
          boxShadow: '0 0 15px rgba(99,102,241,0.1)'
        }}
      >
        <span>📄</span>
        <span>Download Official Resume</span>
        <span className="ml-auto px-1.5 py-0.5 rounded text-[8px] font-mono bg-indigo-950/40 text-indigo-400 border border-indigo-900/30">PDF</span>
      </motion.a>

      {/* Bio */}
      <motion.div 
        className="rounded-xl p-4 border border-white/5 bg-white/[0.01]" 
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.01)' }}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.1 }}
      >
        <h2 className="type-label text-indigo-400 mb-2.5">About Me</h2>
        <p className="type-body leading-relaxed">{PERSONAL.bio}</p>
      </motion.div>

      {/* Skills Matrix (Consistent Styling) */}
      <motion.div 
        className="rounded-xl p-4 border border-white/5 bg-white/[0.01]"
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.01)' }}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.15 }}
      >
        <h2 className="type-label text-indigo-400 mb-3.5">Skills Index</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {Object.entries(SKILLS).map(([category, skills]) => {
            const color = catColors[category] || '#6366f1';
            const icon = catIcons[category] || '📦';
            return (
              <div 
                key={category} 
                className="rounded-xl p-3 border border-white/[0.04] bg-white/[0.005] hover:bg-white/[0.015] hover:border-white/[0.08] transition-all"
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="text-xs">{icon}</span>
                  <h3 className="type-label" style={{ color }}>
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(skills as string[]).map(skill => (
                    <motion.span 
                      key={skill} 
                      className="px-2 py-0.5 text-[9px] font-medium rounded border transition-all cursor-default"
                      style={{ 
                        background: `${color}0e`, 
                        color: `${color}dd`,
                        borderColor: `${color}18` 
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        background: `${color}1b`,
                        color: '#ffffff',
                        borderColor: `${color}40`
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div 
        className="rounded-xl p-4 border border-white/5 bg-white/[0.01]" 
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.01)' }}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }}
      >
        <h2 className="type-label text-indigo-400 mb-2.5">Academic Background</h2>
        <div className="space-y-2.5">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.03] transition-all">
              <span className="text-base mt-0.5">{edu.icon}</span>
              <div>
                <p className="type-subheading text-white leading-tight">{edu.degree}</p>
                <p className="type-body mt-0.5" style={{ fontSize: 'var(--type-xs)' }}>{edu.institution}</p>
                <p className="type-mono mt-0.5" style={{ fontSize: 'var(--type-2xs)', color: 'var(--text-muted)' }}>{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications — with interactive images */}
      <motion.div 
        className="rounded-xl p-4 border border-white/5 bg-white/[0.01]" 
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.01)' }}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.25 }}
      >
        <h2 className="type-label text-indigo-400 mb-3.5">Certifications & Honors ({CERTIFICATIONS.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.button
              key={i}
              className="rounded-lg overflow-hidden text-left cursor-pointer transition-all border border-white/5 bg-white/[0.01] hover:border-indigo-500/35 hover:bg-white/[0.02]"
              onClick={() => setViewingCert(cert)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.015 }}
              whileHover={{ 
                y: -3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}
            >
              <div className="aspect-[4/3] overflow-hidden border-b border-white/[0.02] relative">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover object-top filter brightness-[0.9] hover:brightness-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <p className="type-mono text-zinc-200 leading-tight truncate" style={{ fontSize: 'var(--type-2xs)' }}>{cert.name}</p>
                <p className="type-mono text-zinc-500 mt-0.5 truncate" style={{ fontSize: 'var(--type-2xs)' }}>{cert.issuer}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Certificate Image Lightbox with detailed descriptions */}
      <AnimatePresence>
        {viewingCert && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4"
            style={{ background: 'rgba(6, 6, 9, 0.88)', backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingCert(null)}
          >
            <motion.div
              className="max-w-[92vw] max-h-[82vh] relative flex flex-col rounded-xl overflow-hidden border border-white/10"
              style={{ 
                background: 'rgba(20,20,28,0.95)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.08)' 
              }}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-auto max-h-[70vh] flex items-center justify-center bg-black/40">
                <img
                  src={viewingCert.image}
                  alt={viewingCert.name}
                  className="max-w-full max-h-[66vh] object-contain"
                />
              </div>
              
              {/* Interactive caption details */}
              <div className="p-3 bg-zinc-950/80 border-t border-white/5 flex items-center justify-between shrink-0 select-none">
                <div>
                  <h3 className="text-xs font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {viewingCert.name}
                  </h3>
                  <p className="text-[10px] text-indigo-400 font-medium mt-0.5">
                    Issued by {viewingCert.issuer}
                  </p>
                </div>
                
                <a 
                  href={viewingCert.image} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500 hover:text-white border border-indigo-500/30 text-[10px] font-semibold transition-all text-indigo-300 flex items-center gap-1"
                >
                  Full Size ↗
                </a>
              </div>

              <button
                onClick={() => setViewingCert(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-white transition-all text-lg shadow-lg cursor-pointer"
                style={{ 
                  background: 'rgba(25,25,35,0.85)', 
                  border: '1px solid rgba(255,255,255,0.08)' 
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
