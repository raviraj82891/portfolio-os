'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL, SKILLS, EDUCATION, CERTIFICATIONS } from '@/data/portfolio';

export default function AboutApp() {
  const [viewingCert, setViewingCert] = useState<string | null>(null);

  return (
    <div className="h-full overflow-y-auto px-5 py-4 relative" style={{ background: 'rgba(14,14,20,0.98)' }}>
      {/* Header with profile photo */}
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-16 h-16 rounded-2xl overflow-hidden shrink-0"
          style={{ boxShadow: '0 6px 20px rgba(99,102,241,0.3)', border: '2px solid rgba(99,102,241,0.3)' }}
        >
          <img
            src={PERSONAL.profilePhoto}
            alt={PERSONAL.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div>
          <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {PERSONAL.name}
          </h1>
          <p className="text-indigo-400 text-xs font-medium">{PERSONAL.title}</p>
          <p className="text-zinc-500 text-[11px] mt-0.5">📍 {PERSONAL.location} · 🎓 {PERSONAL.university}</p>
        </div>
      </motion.div>

      {/* Resume download */}
      <motion.a
        href={PERSONAL.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mb-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all hover:scale-[1.01]"
        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        <span>📄</span>
        <span>Download Resume</span>
        <span className="ml-auto text-zinc-500 text-[11px]">PDF</span>
      </motion.a>

      {/* Bio */}
      <motion.div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h2 className="text-xs font-semibold text-indigo-400 mb-1.5">About</h2>
        <p className="text-zinc-300 text-[13px] leading-relaxed">{PERSONAL.bio}</p>
      </motion.div>

      {/* Skills */}
      <motion.div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <h2 className="text-xs font-semibold text-indigo-400 mb-3">Skills</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-[10px] text-violet-400 font-medium mb-1.5 uppercase tracking-wide">{category}</h3>
              <div className="flex flex-wrap gap-1">
                {(skills as string[]).map(skill => (
                  <span key={skill} className="px-1.5 py-[2px] text-[10px] rounded-md" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xs font-semibold text-indigo-400 mb-2">Education</h2>
        <div className="space-y-2">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
              <span className="text-lg">{edu.icon}</span>
              <div>
                <p className="text-[13px] text-white font-medium leading-tight">{edu.degree}</p>
                <p className="text-[11px] text-zinc-400">{edu.institution}</p>
                <p className="text-[11px] text-zinc-500">{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications — with image thumbnails */}
      <motion.div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <h2 className="text-xs font-semibold text-indigo-400 mb-3">Certifications ({CERTIFICATIONS.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.button
              key={i}
              className="rounded-lg overflow-hidden text-left transition-all hover:scale-[1.02] hover:ring-1 hover:ring-indigo-500/30"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              onClick={() => setViewingCert(cert.image)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.02 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <p className="text-[10px] text-zinc-300 font-medium leading-tight truncate">{cert.name}</p>
                <p className="text-[9px] text-zinc-500 truncate">{cert.issuer}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Certificate Image Lightbox */}
      <AnimatePresence>
        {viewingCert && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingCert(null)}
          >
            <motion.div
              className="max-w-[90vw] max-h-[85vh] relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={viewingCert}
                alt="Certificate"
                className="max-w-full max-h-[80vh] rounded-lg object-contain"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              />
              <button
                onClick={() => setViewingCert(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-white transition-colors text-lg"
                style={{ background: 'rgba(30,30,40,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
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
