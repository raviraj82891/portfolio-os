'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FILESYSTEM, FILE_CONTENTS, PERSONAL } from '@/data/portfolio';

// Map certificate filenames to actual image paths
const CERT_IMAGE_MAP: Record<string, string> = {
  'Quick_Heal_Securing_Computing.png': '/asset/images/Screenshot_2026-05-19_142349.png',
  'IBM_SkillsBuild_Data_Analytics.jpeg': '/asset/images/IMG_3249.JPG.jpeg',
  'Coursera_Web_Design_Capstone.png': '/asset/images/Screenshot_2025-07-24_135719.png',
  'Coursera_AI_Essentials.png': '/asset/images/Screenshot_2025-03-02_104636.png',
  'FreeCodeCamp_Responsive_Design.png': '/asset/images/Screenshot_2024-04-17_143944.png',
  'Build_a_Thon_Hackathon.png': '/asset/images/Screenshot_2024-04-17_001344.png',
};

export default function FilesApp() {
  const [cwd, setCwd] = useState('~');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const contents = FILESYSTEM[cwd] || [];

  const isImage = (name: string) => /\.(png|jpeg|jpg|gif|webp)$/i.test(name);
  const isPdf = (name: string) => /\.pdf$/i.test(name);

  const getImageUrl = (name: string) => {
    if (CERT_IMAGE_MAP[name]) return CERT_IMAGE_MAP[name];
    return null;
  };

  return (
    <div className="h-full flex flex-col relative" style={{ background: 'rgba(14,14,20,0.98)' }}>
      {/* Path bar */}
      <div className="px-3 py-2 border-b border-white/[0.05] flex items-center gap-2 text-[11px] text-zinc-400 shrink-0">
        <span className="text-indigo-400">📁</span>
        <span className="font-medium">{cwd.replace('~', '/home/raviraj')}</span>
        {cwd !== '~' && (
          <button onClick={() => { setCwd(cwd.split('/').slice(0, -1).join('/') || '~'); setSelectedFile(null); }} className="ml-auto px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-[10px] font-medium">← Back</button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
            {contents.map((item, i) => {
              const isDir = !item.includes('.');
              const fullPath = `${cwd}/${item}`;
              const imageUrl = getImageUrl(item);

              return (
                <motion.button
                  key={item}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all text-center ${selectedFile === item ? 'bg-indigo-500/10 border border-indigo-500/15' : 'hover:bg-white/[0.03] border border-transparent'}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
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
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                      <img src={imageUrl} alt={item} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ) : (
                    <span className="text-xl">{isDir ? '📁' : item.endsWith('.md') ? '📝' : isPdf(item) ? '📄' : item.endsWith('.sh') ? '⚙️' : isImage(item) ? '🖼️' : item.endsWith('.pub') ? '🔑' : '📄'}</span>
                  )}
                  <span className="text-[9px] text-zinc-400 truncate w-full">{item.replace(/_/g, ' ').replace(/\.\w+$/, '')}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Preview panel */}
        {selectedFile && (
          <motion.div
            className="w-56 border-l border-white/[0.05] p-3 overflow-y-auto shrink-0"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-[11px] font-semibold text-indigo-400 mb-1.5">Preview</h3>
            <p className="text-[10px] text-zinc-500 mb-2">{selectedFile}</p>

            {/* Image preview */}
            {getImageUrl(selectedFile) ? (
              <div className="space-y-2">
                <img
                  src={getImageUrl(selectedFile)!}
                  alt={selectedFile}
                  className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setViewingImage(getImageUrl(selectedFile)!)}
                />
                <button
                  onClick={() => setViewingImage(getImageUrl(selectedFile)!)}
                  className="w-full py-1.5 rounded-md text-[10px] font-medium text-indigo-400 transition-colors"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}
                >
                  View Full Size
                </button>
              </div>
            ) : isPdf(selectedFile) ? (
              <div className="space-y-2">
                <div className="p-3 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-3xl">📄</span>
                  <p className="text-[10px] text-zinc-400 mt-1">PDF Document</p>
                </div>
                <a
                  href={PERSONAL.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-1.5 rounded-md text-[10px] font-medium text-center text-indigo-400 transition-colors"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}
                >
                  Open / Download
                </a>
              </div>
            ) : FILE_CONTENTS[selectedFile] ? (
              <pre className="text-[10px] text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed bg-black/20 p-2.5 rounded-lg">{FILE_CONTENTS[selectedFile]}</pre>
            ) : (
              <p className="text-[11px] text-zinc-600 italic">No preview available</p>
            )}
          </motion.div>
        )}
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingImage(null)}
          >
            <motion.div
              className="max-w-[90vw] max-h-[85vh] relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={viewingImage}
                alt="Preview"
                className="max-w-full max-h-[80vh] rounded-lg object-contain"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              />
              <button
                onClick={() => setViewingImage(null)}
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
