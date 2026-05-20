'use client';

import { useOS } from '@/store/useOS';
import WindowFrame from './WindowFrame';
import Taskbar from './Taskbar';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
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
      className="fixed inset-0 ambient-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient Background Orbs — very subtle, balanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', top: '5%', right: '-15%' }}
          animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)', bottom: '10%', left: '-10%' }}
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)', top: '45%', left: '40%' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Particles */}
      <Particles />

      {/* Desktop Icons — iOS-style vertical stack layout */}
      <div className="absolute top-4 left-4 flex flex-col gap-0.5 z-10">
        {desktopIcons.map((icon, i) => (
          <motion.button
            key={icon.id}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.08] transition-all w-[68px] group"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 + 0.3, duration: 0.3 }}
            onDoubleClick={() => openWindow(icon.id, icon.label)}
          >
            <span className="text-2xl group-hover:scale-105 transition-transform duration-200">
              {icon.icon}
            </span>
            <span className="text-[9px] text-zinc-400 group-hover:text-zinc-200 truncate w-full text-center transition-colors duration-200">
              {icon.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Windows */}
      {windows.map((win) => (
        <WindowFrame key={win.id} window={win}>
          {getAppComponent(win.appId)}
        </WindowFrame>
      ))}

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
