'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '@/store/useOS';

const DOCK_APPS = [
  { id: 'terminal', label: 'Terminal', icon: '⌨️' },
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'files', label: 'Files', icon: '📁' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'compiler', label: 'C++', icon: '💻' },
  { id: 'snake', label: 'Snake', icon: '🐍' },
  { id: 'chess', label: 'Chess', icon: '♟️' },
  { id: 'gemini-chat', label: 'AI Chat', icon: '🤖' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', icon: '🐙', url: 'https://github.com/raviraj82891' },
  { label: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/raviraj-sharma-969264289/?skipRedirect=true' },
  { label: 'Instagram', icon: '📸', url: 'https://www.instagram.com/_raviii__raj_?igsh=ZXJhOTE2Y3prZnll' },
];

export default function Taskbar() {
  const { windows, openWindow, focusWindow, restoreWindow, soundEnabled, toggleSound, crtEnabled, toggleCRT, cpuUsage, ramUsage, updateStats, updateTime, systemTime } = useOS();
  const [showTray, setShowTray] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
      updateStats();
    }, 1000);
    return () => clearInterval(interval);
  }, [updateTime, updateStats]);

  const timeStr = systemTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const dateStr = systemTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9000] h-[52px]">
      {/* Dock bar — frosted glass, centered like macOS */}
      <div className="flex items-center justify-between h-full mx-auto px-4" style={{
        background: 'rgba(20, 20, 28, 0.72)',
        backdropFilter: 'blur(50px) saturate(1.8)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        {/* Left — App Icons */}
        <div className="flex items-center gap-0.5">
          {/* Logo */}
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-semibold mr-1"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#818cf8',
            }}
          >
            ◆ ROS
          </div>

          <div className="w-px h-6 bg-white/[0.06] mx-1.5" />

          {/* Dock Icons */}
          {DOCK_APPS.map((app) => {
            const isOpen = windows.some(w => w.appId === app.id && !w.isClosing);
            return (
              <motion.button
                key={app.id}
                className="dock-icon relative px-2 py-1.5 rounded-lg text-sm transition-all hover:bg-white/[0.06]"
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  const existing = windows.find(w => w.appId === app.id);
                  if (existing?.isMinimized) {
                    restoreWindow(existing.id);
                  } else if (existing) {
                    focusWindow(existing.id);
                  } else {
                    openWindow(app.id, app.label);
                  }
                }}
                title={app.label}
              >
                <span className="text-base">{app.icon}</span>
                {isOpen && (
                  <motion.div
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#818cf8', boxShadow: '0 0 4px rgba(129,140,248,0.6)' }}
                    layoutId={`dot-${app.id}`}
                  />
                )}
              </motion.button>
            );
          })}

          <div className="w-px h-6 bg-white/[0.06] mx-1.5" />

          {/* Social Links */}
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-icon px-1.5 py-1 rounded-lg text-sm hover:bg-white/[0.06] transition-all"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              title={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Center — Active Windows */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {windows.filter(w => !w.isClosing).map(w => (
            <button
              key={w.id}
              onClick={() => w.isMinimized ? restoreWindow(w.id) : focusWindow(w.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all truncate max-w-[150px] ${w.isMinimized ? 'opacity-40' : 'opacity-70 hover:opacity-100'
                }`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {w.title}
            </button>
          ))}
        </div>

        {/* Right — System Tray */}
        <div className="flex items-center gap-3">
          {/* System Stats — clean, minimal */}
          <div className="hidden md:flex items-center gap-3 text-[10px] font-medium text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">CPU</span>
              <div className="w-12 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${cpuUsage}%`,
                    background: cpuUsage > 70
                      ? 'linear-gradient(90deg, #f43f5e, #ef4444)'
                      : 'linear-gradient(90deg, #6366f1, #818cf8)',
                  }}
                />
              </div>
              <span className="w-7 text-right tabular-nums">{Math.round(cpuUsage)}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">RAM</span>
              <div className="w-12 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${ramUsage}%`,
                    background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
                  }}
                />
              </div>
              <span className="w-7 text-right tabular-nums">{Math.round(ramUsage)}%</span>
            </div>
          </div>

          <div className="w-px h-5 bg-white/[0.06]" />

          {/* Tray Buttons */}
          <div className="relative">
            <button
              onClick={() => setShowTray(!showTray)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs text-zinc-400 hover:bg-white/[0.05] transition-all"
            >
              <span>{soundEnabled ? '🔊' : '🔇'}</span>
              <span>{crtEnabled ? '📺' : '🖥️'}</span>
            </button>

            <AnimatePresence>
              {showTray && (
                <motion.div
                  className="absolute bottom-full right-0 mb-2 rounded-lg p-2 min-w-[200px]"
                  style={{
                    background: 'rgba(28, 28, 38, 0.85)',
                    backdropFilter: 'blur(40px) saturate(1.6)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                  }}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="space-y-0.5">
                    <button
                      onClick={toggleSound}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] hover:bg-white/[0.05] transition-all"
                    >
                      <span className="text-zinc-300">Sound Effects</span>
                      <span className={`text-xs font-medium ${soundEnabled ? 'text-indigo-400' : 'text-zinc-500'}`}>
                        {soundEnabled ? 'ON' : 'OFF'}
                      </span>
                    </button>
                    <button
                      onClick={toggleCRT}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] hover:bg-white/[0.05] transition-all"
                    >
                      <span className="text-zinc-300">CRT Effect</span>
                      <span className={`text-xs font-medium ${crtEnabled ? 'text-indigo-400' : 'text-zinc-500'}`}>
                        {crtEnabled ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clock — iOS-like */}
          <div className="text-right pl-1">
            <div className="text-[13px] font-medium text-zinc-300 tabular-nums">{timeStr}</div>
            <div className="text-[10px] text-zinc-500">{dateStr}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
