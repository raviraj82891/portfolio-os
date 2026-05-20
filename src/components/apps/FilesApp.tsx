'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FILESYSTEM, FILE_CONTENTS, PERSONAL } from '@/data/portfolio';

// Map certificate filenames to actual image paths
const CERT_IMAGE_MAP: Record<string, string> = {
  'Quick_Heal_Securing_Computing.png': '/asset/images/Screenshot_2026-05-19_142349.png',
  'Quick_Heal_Securing_Computing_II.png': '/asset/images/Screenshot_2026-05-19_142410.png',
  'Quick_Heal_Securing_Computing_III.png': '/asset/images/Screenshot_2026-05-19_142424.png',
  'Quick_Heal_Securing_Computing_IV.png': '/asset/images/Screenshot_2026-05-19_142436.png',
  'Quick_Heal_Securing_Computing_V.png': '/asset/images/Screenshot_2026-05-19_142454.png',
  'Quick_Heal_Securing_Computing_VI.png': '/asset/images/Screenshot_2026-05-19_142507.png',
  'Quick_Heal_Securing_Computing_VII.png': '/asset/images/Screenshot_2026-05-19_142520.png',
  'IBM_SkillsBuild_Data_Analytics.jpeg': '/asset/images/IMG_3249.JPG.jpeg',
  'Coursera_Web_Design_Capstone.png': '/asset/images/Screenshot_2025-07-24_135719.png',
  'Coursera_AI_Essentials.png': '/asset/images/Screenshot_2025-03-02_104636.png',
  'Coursera_Web_Design_II.png': '/asset/images/Screenshot_2025-07-24_135743.png',
  'Coursera_Web_Design_III.png': '/asset/images/Screenshot_2025-07-24_135812.png',
  'Coursera_Web_Design_IV.png': '/asset/images/Screenshot_2025-07-24_135831.png',
  'Coursera_Web_Design_V.png': '/asset/images/Screenshot_2025-07-24_135901.png',
  'Coursera_Web_Design_VI.png': '/asset/images/Screenshot_2025-07-24_135923.png',
  'FreeCodeCamp_Responsive_Design.png': '/asset/images/Screenshot_2024-04-17_143944.png',
  'Build_a_Thon_Hackathon.png': '/asset/images/Screenshot_2024-04-17_001344.png',
};

// Language Tags definitions
const getLanguageTag = (filename: string): { label: string; color: string } => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'py': return { label: 'PYTHON', color: '#eab308' };
    case 'kt':
    case 'kts': return { label: 'KOTLIN', color: '#a855f7' };
    case 'php': return { label: 'PHP', color: '#6366f1' };
    case 'sql': return { label: 'SQL', color: '#f43f5e' };
    case 'md': return { label: 'MARKDOWN', color: '#22c55e' };
    case 'json': return { label: 'JSON', color: '#06b6d4' };
    case 'js':
    case 'jsx': return { label: 'JAVASCRIPT', color: '#10b981' };
    case 'xml': return { label: 'XML', color: '#f97316' };
    case 'sh': return { label: 'SHELL', color: '#14b8a6' };
    default: return { label: 'CODE', color: '#94a3b8' };
  }
};

export default function FilesApp() {
  const [cwd, setCwd] = useState('~');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const contents = FILESYSTEM[cwd] || [];

  const isImage = (name: string) => /\.(png|jpeg|jpg|gif|webp)$/i.test(name);
  const isPdf = (name: string) => /\.pdf$/i.test(name);

  const getImageUrl = (name: string) => {
    if (CERT_IMAGE_MAP[name]) return CERT_IMAGE_MAP[name];
    return null;
  };

  const getFileContent = (file: string) => {
    return FILE_CONTENTS[`${cwd}/${file}`] || FILE_CONTENTS[file] || null;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="h-full flex flex-col relative text-zinc-300" 
      style={{ 
        background: 'radial-gradient(circle at 50% 0%, rgba(30, 27, 75, 0.08) 0%, rgba(14, 14, 20, 0.99) 80%)' 
      }}
    >
      {/* Path bar / Breadcrumbs */}
      <div className="px-4 py-2.5 border-b border-white/[0.05] flex items-center gap-2 text-[10px] text-zinc-400 shrink-0 select-none">
        <span className="text-indigo-400 text-xs">📁</span>
        <span className="font-mono tracking-tight">{cwd.replace('~', '/home/raviraj')}</span>
        {cwd !== '~' && (
          <button 
            onClick={() => { setCwd(cwd.split('/').slice(0, -1).join('/') || '~'); setSelectedFile(null); }} 
            className="ml-auto px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950/40 hover:bg-indigo-500 hover:text-white hover:border-indigo-400 transition-all text-[9px] font-semibold cursor-pointer"
          >
            ← Back
          </button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Grid List */}
        <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {contents.map((item, i) => {
              const fullPath = `${cwd}/${item}`;
              const imageUrl = getImageUrl(item);
              const isDir = FILESYSTEM[fullPath] !== undefined || (cwd !== '~/.ssh' && (!item.includes('.') || item.startsWith('.')));

              return (
                <motion.button
                  key={item}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all text-center cursor-pointer select-none border ${
                    selectedFile === item 
                      ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.05)]' 
                      : 'hover:bg-white/[0.02] border-transparent'
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.015, ease: 'easeOut' }}
                  onClick={() => setSelectedFile(item)}
                  onDoubleClick={() => {
                    if (isDir && FILESYSTEM[fullPath]) {
                      setCwd(fullPath);
                      setSelectedFile(null);
                    } else if (imageUrl) {
                      setViewingImage(imageUrl);
                    } else if (isPdf(item) && cwd === '~/Documents') {
                      window.open(PERSONAL.resumeUrl, '_blank');
                    }
                  }}
                >
                  {/* Show thumbnail for certificate images */}
                  {imageUrl ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/5 relative">
                      <img src={imageUrl} alt={item} className="w-full h-full object-cover object-top" loading="lazy" />
                    </div>
                  ) : (
                    <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                      {isDir 
                        ? '📁' 
                        : item.endsWith('.md') 
                        ? '📝' 
                        : isPdf(item) 
                        ? '📄' 
                        : item.endsWith('.sh') 
                        ? '⚙️' 
                        : isImage(item) 
                        ? '🖼️' 
                        : item.endsWith('.pub') 
                        ? '🔑' 
                        : '📄'}
                    </span>
                  )}
                  <span className="text-[9px] font-medium text-zinc-400 group-hover:text-white truncate w-full">
                    {item.lastIndexOf('.') > 0 && !isDir
                      ? item.replace(/_/g, ' ').replace(/\.\w+$/, '')
                      : item.replace(/_/g, ' ')}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Preview Panel — Mini IDE developer preview */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              className="w-72 border-l border-white/5 p-4 flex flex-col gap-3 overflow-hidden shrink-0 select-none bg-black/[0.08]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <div>
                <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>File details</h3>
                <p className="text-[9px] text-zinc-500 font-mono mt-0.5 truncate">{selectedFile}</p>
              </div>

              {/* Dynamic Previews */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Image preview */}
                {getImageUrl(selectedFile) ? (
                  <div className="flex flex-col gap-2">
                    <div 
                      className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/5 cursor-pointer relative group"
                      onClick={() => setViewingImage(getImageUrl(selectedFile)!)}
                    >
                      <img
                        src={getImageUrl(selectedFile)!}
                        alt={selectedFile}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold">
                        View Full Size
                      </div>
                    </div>
                    <button
                      onClick={() => setViewingImage(getImageUrl(selectedFile)!)}
                      className="w-full py-1.5 rounded-lg text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500 hover:text-white border border-indigo-500/20 transition-all cursor-pointer text-center"
                    >
                      Maximize Certificate
                    </button>
                  </div>
                ) : isPdf(selectedFile) ? (
                  <div className="flex flex-col gap-2">
                    <div className="p-4 rounded-xl text-center border border-dashed border-white/10 bg-white/[0.005]">
                      <span className="text-3xl">📄</span>
                      <p className="text-[9px] font-mono text-zinc-400 mt-2">resume_2026.pdf</p>
                    </div>
                    <a
                      href={PERSONAL.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-1.5 rounded-lg text-center text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500 hover:text-white border border-indigo-500/20 transition-all cursor-pointer"
                    >
                      View / Download PDF
                    </a>
                  </div>
                ) : getFileContent(selectedFile) ? (() => {
                  const content = getFileContent(selectedFile)!;
                  const lang = getLanguageTag(selectedFile);
                  
                  return (
                    <div className="flex-1 flex flex-col overflow-hidden border border-white/5 rounded-xl bg-black/25">
                      {/* Editor Header */}
                      <div className="px-3 py-2 bg-zinc-950/60 border-b border-white/[0.04] flex items-center justify-between select-none shrink-0">
                        <span 
                          className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider text-black"
                          style={{ background: lang.color }}
                        >
                          {lang.label}
                        </span>
                        
                        <button
                          onClick={() => handleCopy(content)}
                          className="px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950/40 text-[9px] text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer flex items-center gap-1 font-mono"
                        >
                          {copied ? (
                            <span className="text-green-400 font-bold">✓ Copied</span>
                          ) : (
                            <>
                              <span>📋</span>
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Scrollable Preformatted Text */}
                      <div className="flex-1 overflow-auto p-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                        <pre className="text-[9px] text-indigo-200/80 font-mono whitespace-pre leading-relaxed select-text">
                          <code>{content}</code>
                        </pre>
                      </div>
                    </div>
                  );
                })() : (
                  <p className="text-[10px] text-zinc-500 italic mt-2 text-center">No preview available</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(6, 6, 9, 0.88)', backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingImage(null)}
          >
            <motion.div
              className="max-w-[92vw] max-h-[82vh] relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={viewingImage}
                alt="Preview"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setViewingImage(null)}
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
