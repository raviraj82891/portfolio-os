'use client';

import { useState, useEffect, useCallback } from 'react';
import { useOS } from '@/store/useOS';
import WindowFrame from './WindowFrame';
import Taskbar from './Taskbar';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from '../effects/MatrixRain';
import Particles from '../effects/Particles';

const TerminalApp = dynamic(() => import('../terminal/TerminalApp'), { ssr: false });
const AboutApp = dynamic(() => import('../apps/AboutApp'), { ssr: false });
const ProjectsApp = dynamic(() => import('../apps/ProjectsApp'), { ssr: false });
const FilesApp = dynamic(() => import('../apps/FilesApp'), { ssr: false });
const SkillsApp = dynamic(() => import('../apps/SkillsApp'), { ssr: false });
const ContactApp = dynamic(() => import('../apps/ContactApp'), { ssr: false });
const GameApp = dynamic(() => import('../apps/GameApp'), { ssr: false });
const SnakeApp = dynamic(() => import('../apps/SnakeApp'), { ssr: false });
const ChessApp = dynamic(() => import('../apps/ChessApp'), { ssr: false });
const GeminiChatApp = dynamic(() => import('../apps/GeminiChatApp'), { ssr: false });
const SearchEngineApp = dynamic(() => import('../apps/SearchEngineApp'), { ssr: false });
const CppCompilerApp = dynamic(() => import('../apps/CppCompilerApp'), { ssr: false });

function getAppComponent(appId: string) {
  switch (appId) {
    case 'terminal': return <TerminalApp />;
    case 'about': return <AboutApp />;
    case 'projects': return <ProjectsApp />;
    case 'files': return <FilesApp />;
    case 'skills': return <SkillsApp />;
    case 'contact': return <ContactApp />;
    case 'game': return <GameApp />;
    case 'snake': return <SnakeApp />;
    case 'chess': return <ChessApp />;
    case 'gemini-chat': return <GeminiChatApp />;
    case 'search': return <SearchEngineApp />;
    case 'compiler': return <CppCompilerApp />;
    default: return <div className="p-4 text-zinc-400 font-mono text-sm">Application not found</div>;
  }
}

export default function DesktopEnvironment() {
  const { windows, crtEnabled, matrixMode, openWindow } = useOS();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state with browser fullscreen changes (e.g. Esc key exit)
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const desktopIcons = [
    { id: 'terminal', label: 'Terminal', icon: '⌨️' },
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'files', label: 'Files', icon: '📁' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'compiler', label: 'C++ Code', icon: '💻' },
    { id: 'snake', label: 'Snake', icon: '🐍' },
    { id: 'chess', label: 'Chess', icon: '♟️' },
    { id: 'gemini-chat', label: 'AI Chat', icon: '🤖' },
  ];

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#080810' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Video Wallpaper — full quality, 100% opacity */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="https://cdn.pixabay.com/video/2023/08/04/174588-851804340_large.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ zIndex: 0 }}
      />

      {/* Thin bottom vignette only — keeps taskbar text legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 18%)',
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Desktop Icons — iOS-style vertical stack layout */}
      <div className="absolute top-4 left-4 flex flex-col gap-0.5 z-[5]">
        {desktopIcons.map((icon, i) => (
          <motion.button
            key={icon.id}
            className="flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-white/[0.05] active:bg-white/[0.09] w-[64px] group cursor-pointer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.09, y: -2 }}
            whileTap={{ scale: 0.93 }}
            transition={{
              opacity: { delay: i * 0.04 + 0.3, duration: 0.3 },
              y: { type: 'spring', stiffness: 400, damping: 15, delay: i * 0.04 + 0.3 },
              scale: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            onDoubleClick={() => openWindow(icon.id, icon.label)}
          >
            <span className="text-2xl">{icon.icon}</span>
            <span
              className="type-caption truncate w-full text-center group-hover:text-zinc-200 transition-colors"
              style={{ fontSize: 'var(--type-2xs)', lineHeight: '1.3' }}
            >
              {icon.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Fullscreen Toggle — top right corner */}
      <motion.button
        id="fullscreen-btn"
        onClick={toggleFullscreen}
        className="fixed top-3 right-3 z-[9500] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer"
        style={{
          background: 'rgba(22, 22, 32, 0.72)',
          backdropFilter: 'blur(20px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}
        whileHover={{
          scale: 1.06,
          background: 'rgba(99, 102, 241, 0.12)',
          borderColor: 'rgba(99, 102, 241, 0.25)',
        }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 420, damping: 16 }}
        title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isFullscreen ? (
            <motion.svg
              key="compress"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-indigo-300"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            >
              {/* Compress icon */}
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </motion.svg>
          ) : (
            <motion.svg
              key="expand"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-zinc-400"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            >
              {/* Expand icon */}
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </motion.svg>
          )}
        </AnimatePresence>
        <span
          className="type-caption hidden sm:block"
          style={{ fontSize: 'var(--type-2xs)', color: isFullscreen ? 'var(--accent-light)' : 'var(--text-tertiary)' }}
        >
          {isFullscreen ? 'Exit FS' : 'Fullscreen'}
        </span>
      </motion.button>

      {/* Windows — hard-clipped to workspace (top → above taskbar).
          clip-path: inset(0) is the only reliable way to clip GPU-composited
          Framer Motion elements that escape overflow: hidden via their
          compositing layer. contain: layout paint reinforces this. */}
      <div
        className="absolute inset-0"
        style={{
          bottom: '52px',
          zIndex: 20,
          overflow: 'hidden',
          clipPath: 'inset(0 0 0 0)',
          contain: 'layout paint',
          pointerEvents: 'none',  // container is click-through; windows set their own pointer-events
        }}
      >
        {windows.map((win) => (
          <WindowFrame key={win.id} window={win}>
            {getAppComponent(win.appId)}
          </WindowFrame>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar />

      {/* CRT Overlay */}
      {crtEnabled && <div className="crt-overlay" />}

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Matrix Rain */}
      {matrixMode && <MatrixRain />}
    </motion.div>
  );
}
