'use client';

import { useEffect, useState } from 'react';
import { useOS, WindowState } from '@/store/useOS';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

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
    activeWindowId,
  } = useOS();

  const isActive = activeWindowId === win.id;
  const dragControls = useDragControls();
  const [localSnap, setLocalSnap] = useState<'none' | 'left' | 'right'>('none');
  const [hoverSnap, setHoverSnap] = useState<'none' | 'left' | 'right' | 'top'>('none');
  const TASKBAR_H = 52;
  const [windowSize, setWindowSize] = useState({ width: 1280, height: 720 - 52 });

  useEffect(() => {
    const handleResize = () => {
      // Workspace = full viewport minus taskbar — matches the clip div in DesktopEnvironment
      setWindowSize({ width: window.innerWidth, height: window.innerHeight - TASKBAR_H });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDoubleClick = () => {
    if (win.isMaximized) {
      restoreWindow(win.id);
    } else {
      maximizeWindow(win.id);
      setLocalSnap('none');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && win.isMaximized) {
        restoreWindow(win.id);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [win.id, win.isMaximized, restoreWindow]);

  const startDrag = (event: React.PointerEvent) => {
    focusWindow(win.id);
    if (win.isMaximized || localSnap !== 'none') {
      restoreWindow(win.id);
      setLocalSnap('none');
    }
    dragControls.start(event);
  };

  // Also used as onDragStart callback for the motion.div
  const handleDragStart = () => {
    focusWindow(win.id);
  };

  const handleDrag = (_event: unknown, info: { point: { x: number; y: number } }) => {
    const x = info.point.x;
    const y = info.point.y;

    if (y < 45) {
      setHoverSnap('top');
    } else if (x < 45) {
      setHoverSnap('left');
    } else if (x > windowSize.width - 45) {
      setHoverSnap('right');
    } else {
      setHoverSnap('none');
    }
  };

  const handleDragEnd = (_event: unknown, info: { offset: { x: number; y: number } }) => {
    if (hoverSnap === 'top') {
      maximizeWindow(win.id);
      setLocalSnap('none');
    } else if (hoverSnap === 'left') {
      setLocalSnap('left');
    } else if (hoverSnap === 'right') {
      setLocalSnap('right');
    } else {
      setLocalSnap('none');
      const dx = info.offset.x;
      const dy = info.offset.y;

      // Clamp so the window can never escape the workspace:
      //   top:   y >= 0           (title bar never above top edge)
      //   left:  x >= 0           (window never past left edge)
      //   right: at least 100px visible on screen
      //   bottom: at least title bar (36px) stays above taskbar
      const TITLE_BAR_H = 36;
      const MIN_VISIBLE_X = 100;
      const newX = Math.max(0, Math.min(win.x + dx, windowSize.width - MIN_VISIBLE_X));
      const newY = Math.max(0, Math.min(win.y + dy, windowSize.height - TITLE_BAR_H));
      moveWindow(win.id, newX, newY);
    }
    setHoverSnap('none');
  };

  const windowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.91,
      filter: 'blur(10px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      x: localSnap === 'left' ? 8 : localSnap === 'right' ? windowSize.width / 2 + 4 : win.isMaximized ? 0 : win.x,
      top: localSnap !== 'none' ? 8 : win.isMaximized ? 0 : win.y,
      width: localSnap !== 'none' ? windowSize.width / 2 - 12 : win.isMaximized ? windowSize.width : win.width,
      // windowSize.height is already (viewport - taskbar). Maximized fills workspace; snapped has 8px top gap.
      height: localSnap !== 'none' ? windowSize.height - 8 : win.isMaximized ? windowSize.height : win.height,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 26,
        mass: 0.9,
      },
    },
    minimized: {
      scale: 0.12,
      y: windowSize.height + 40,
      x: windowSize.width / 2 - 80,
      opacity: 0,
      filter: 'blur(8px)',
      transition: {
        type: 'spring' as const,
        stiffness: 240,
        damping: 30,
      },
    },
    exit: {
      scale: 0.88,
      opacity: 0,
      filter: 'blur(8px)',
      y: -8,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const currentVariant = win.isClosing
    ? 'exit'
    : win.isMinimized
    ? 'minimized'
    : 'visible';

  const getSnapPreviewStyle = (snap: 'none' | 'left' | 'right' | 'top') => {
    // windowSize.height = workspace height (viewport minus taskbar)
    // 8px top gap, 8px bottom gap = 16px total vertical padding for snapped previews
    const snapH = windowSize.height - 16;
    switch (snap) {
      case 'top':
        return {
          left: 8,
          top: 8,
          width: `${windowSize.width - 16}px`,
          height: `${snapH}px`,
        };
      case 'left':
        return {
          left: 8,
          top: 8,
          width: `${windowSize.width / 2 - 12}px`,
          height: `${snapH}px`,
        };
      case 'right':
        return {
          left: `${windowSize.width / 2 + 4}px`,
          top: 8,
          width: `${windowSize.width / 2 - 12}px`,
          height: `${snapH}px`,
        };
      default:
        return {};
    }
  };

  // Active window: full glass + accent ring; inactive: dimmer glass
  const windowBg = isActive
    ? 'rgba(20, 20, 30, 0.94)'
    : 'rgba(14, 14, 22, 0.88)';

  const backdropFilter = isActive
    ? 'blur(56px) saturate(1.8) brightness(1.0)'
    : 'blur(44px) saturate(1.1) brightness(0.82)';

  const boxShadow = isActive
    ? '0 32px 96px rgba(0,0,0,0.65), 0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(99,102,241,0.18)'
    : '0 12px 40px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)';

  const titleBarBg = isActive
    ? 'linear-gradient(180deg, rgba(46, 46, 62, 0.72) 0%, rgba(30, 30, 44, 0.5) 100%)'
    : 'linear-gradient(180deg, rgba(26, 26, 36, 0.55) 0%, rgba(18, 18, 28, 0.38) 100%)';

  return (
    <>
      {/* Edge Snapping Visual Guide — absolute so it stays within workspace clip */}
      <AnimatePresence>
        {hoverSnap !== 'none' && (
          <motion.div
            className="absolute z-[8000] border border-indigo-500/25 bg-indigo-500/[0.07] rounded-xl backdrop-blur-sm pointer-events-none"
            style={{
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...getSnapPreviewStyle(hoverSnap),
            }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        drag={!win.isMaximized && localSnap === 'none'}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.02}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 40, power: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        initial="hidden"
        animate={currentVariant}
        exit="exit"
        variants={windowVariants}
        className="absolute rounded-xl overflow-hidden"
        style={{
          zIndex: win.zIndex,
          position: 'absolute',
          left: 0,
          top: 0,
          boxShadow,
          border: isActive
            ? '1px solid rgba(99, 102, 241, 0.18)'
            : '1px solid rgba(255, 255, 255, 0.06)',
          pointerEvents: win.isMinimized ? 'none' : 'auto',
          // Smooth CSS transition for active/inactive state changes
          transition: 'box-shadow 0.35s cubic-bezier(0.23,1,0.32,1), border-color 0.35s ease, filter 0.35s ease',
          filter: isActive ? 'brightness(1) saturate(1)' : 'brightness(0.78) saturate(0.72)',
        }}
        onMouseDown={() => focusWindow(win.id)}
      >
        <div
          className="flex flex-col h-full overflow-hidden"
          style={{
            background: windowBg,
            backdropFilter,
            WebkitBackdropFilter: backdropFilter,
            borderRadius: 'inherit',
          }}
        >
          {/* Title Bar */}
          <div
            className="flex items-center justify-between px-4 py-2 cursor-grab active:cursor-grabbing select-none shrink-0"
            style={{
              background: titleBarBg,
              borderBottom: isActive
                ? '1px solid rgba(99, 102, 241, 0.12)'
                : '1px solid rgba(255, 255, 255, 0.04)',
              minHeight: '36px',
            }}
            onPointerDown={startDrag}
            onDoubleClick={handleDoubleClick}
          >
            {/* Traffic-light buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                className="w-3 h-3 rounded-full transition-all group relative hover:brightness-110 cursor-pointer"
                style={{ background: '#ff5f57' }}
                title="Close"
              >
                <svg className="w-1.5 h-1.5 absolute inset-[3px] opacity-0 group-hover:opacity-100 text-red-900/80" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                className="w-3 h-3 rounded-full transition-all group relative hover:brightness-110 cursor-pointer"
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
                className="w-3 h-3 rounded-full transition-all group relative hover:brightness-110 cursor-pointer"
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

            {/* Title — centered, strict type scale */}
            <div
              className="absolute left-1/2 -translate-x-1/2 truncate max-w-[55%]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.01em',
                color: isActive ? 'rgba(220, 220, 235, 0.85)' : 'rgba(150, 150, 168, 0.6)',
                transition: 'color 0.3s ease',
              }}
            >
              {win.title}
            </div>

            <div className="w-16" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative">
            {/* Subtle focus overlay on inactive windows */}
            {!isActive && (
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'rgba(0,0,0,0.08)' }}
              />
            )}
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
}
