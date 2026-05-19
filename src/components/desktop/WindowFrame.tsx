'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useOS, WindowState } from '@/store/useOS';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function WindowFrame({ window: win, children }: WindowFrameProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
  } = useOS();

  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win.isMaximized) return;
      e.preventDefault();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        winX: win.x,
        winY: win.y,
      };
      focusWindow(win.id);

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        moveWindow(win.id, dragRef.current.winX + dx, dragRef.current.winY + dy);
      };

      const handleMouseUp = () => {
        dragRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [win.id, win.x, win.y, win.isMaximized, focusWindow, moveWindow]
  );

  const handleDoubleClick = useCallback(() => {
    if (win.isMaximized) {
      restoreWindow(win.id);
    } else {
      maximizeWindow(win.id);
    }
  }, [win.id, win.isMaximized, restoreWindow, maximizeWindow]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && win.isMaximized) {
        restoreWindow(win.id);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [win.id, win.isMaximized, restoreWindow]);

  const animClass = win.isClosing
    ? 'window-close'
    : win.isMinimized
    ? 'window-minimize'
    : 'window-open';

  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 52px)',
        zIndex: win.zIndex,
      }
    : {
        position: 'absolute',
        top: win.y,
        left: win.x,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  if (win.isMinimized && !win.isClosing) return null;

  return (
    <div
      ref={frameRef}
      className={`window-frame ${animClass}`}
      style={style}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        className="flex flex-col h-full overflow-hidden"
        style={{
          background: 'rgba(20, 20, 28, 0.92)',
          backdropFilter: 'blur(40px) saturate(1.6)',
          borderRadius: 'inherit',
        }}
      >
        {/* Title Bar — macOS-inspired with frosted glass */}
        <div
          className="flex items-center justify-between px-4 py-2.5 cursor-grab active:cursor-grabbing select-none shrink-0"
          style={{
            background: 'linear-gradient(180deg, rgba(40, 40, 52, 0.6) 0%, rgba(28, 28, 38, 0.4) 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
        >
          {/* Traffic-light buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
              className="w-3 h-3 rounded-full transition-all group relative hover:brightness-110"
              style={{ background: '#ff5f57' }}
              title="Close"
            >
              <svg className="w-1.5 h-1.5 absolute inset-[3px] opacity-0 group-hover:opacity-100 text-red-900/80" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
              className="w-3 h-3 rounded-full transition-all group relative hover:brightness-110"
              style={{ background: '#febc2e' }}
              title="Minimize"
            >
              <svg className="w-1.5 h-1.5 absolute inset-[3px] opacity-0 group-hover:opacity-100 text-yellow-900/80" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 6h8" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                win.isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id);
              }}
              className="w-3 h-3 rounded-full transition-all group relative hover:brightness-110"
              style={{ background: '#28c840' }}
              title={win.isMaximized ? 'Restore' : 'Maximize'}
            >
              <svg className="w-1.5 h-1.5 absolute inset-[3px] opacity-0 group-hover:opacity-100 text-green-900/80" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                {win.isMaximized ? (
                  <><path d="M3 1h8v8" /><path d="M1 3h8v8" /></>
                ) : (
                  <rect x="1" y="1" width="10" height="10" />
                )}
              </svg>
            </button>
          </div>

          {/* Title — centered, clean */}
          <div className="absolute left-1/2 -translate-x-1/2 text-[13px] text-zinc-400 truncate max-w-[60%] font-medium">
            {win.title}
          </div>

          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
}
