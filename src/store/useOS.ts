import { create } from 'zustand';

export type BootPhase = 'bios' | 'kernel' | 'login' | 'desktop';

export interface WindowState {
  id: string;
  title: string;
  appId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isClosing?: boolean;
}

interface OSState {
  bootPhase: BootPhase;
  setBootPhase: (phase: BootPhase) => void;

  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;

  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;

  soundEnabled: boolean;
  toggleSound: () => void;

  crtEnabled: boolean;
  toggleCRT: () => void;

  matrixMode: boolean;
  setMatrixMode: (v: boolean) => void;

  systemTime: Date;
  updateTime: () => void;

  cpuUsage: number;
  ramUsage: number;
  updateStats: () => void;
}

let windowCounter = 0;

export const useOS = create<OSState>((set, get) => ({
  bootPhase: 'bios',
  setBootPhase: (phase) => set({ bootPhase: phase }),

  windows: [],
  activeWindowId: null,
  nextZIndex: 100,

  openWindow: (appId, title) => {
    const state = get();
    const existing = state.windows.find(w => w.appId === appId && !w.isClosing);
    if (existing) {
      if (existing.isMinimized) {
        set({
          windows: state.windows.map(w =>
            w.id === existing.id ? { ...w, isMinimized: false, zIndex: state.nextZIndex } : w
          ),
          activeWindowId: existing.id,
          nextZIndex: state.nextZIndex + 1,
        });
      } else {
        set({
          windows: state.windows.map(w =>
            w.id === existing.id ? { ...w, zIndex: state.nextZIndex } : w
          ),
          activeWindowId: existing.id,
          nextZIndex: state.nextZIndex + 1,
        });
      }
      return;
    }

    windowCounter++;
    const id = `window-${windowCounter}`;
    const offset = (windowCounter % 8) * 30;
    const newWindow: WindowState = {
      id,
      title,
      appId,
      x: 100 + offset,
      y: 60 + offset,
      width: appId === 'terminal' ? 750 : appId === 'snake' ? 520 : appId === 'chess' ? 500 : appId === 'gemini-chat' ? 600 : 800,
      height: appId === 'terminal' ? 480 : appId === 'snake' ? 600 : appId === 'chess' ? 650 : appId === 'gemini-chat' ? 550 : 550,
      isMinimized: false,
      isMaximized: false,
      zIndex: state.nextZIndex,
    };

    set({
      windows: [...state.windows, newWindow],
      activeWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    });
  },

  closeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w => w.id === id ? { ...w, isClosing: true } : w),
    }));
    setTimeout(() => {
      set(state => ({
        windows: state.windows.filter(w => w.id !== id),
        activeWindowId: state.activeWindowId === id
          ? (state.windows.filter(w => w.id !== id).sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null)
          : state.activeWindowId,
      }));
    }, 300);
  },

  minimizeWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

  maximizeWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: true, zIndex: state.nextZIndex } : w
      ),
      activeWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    })),

  restoreWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: false, isMinimized: false, zIndex: state.nextZIndex } : w
      ),
      activeWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    })),

  focusWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: state.nextZIndex } : w
      ),
      activeWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    })),

  moveWindow: (id, x, y) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      ),
    })),

  resizeWindow: (id, width, height) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, width, height } : w
      ),
    })),

  soundEnabled: false,
  toggleSound: () => set(state => ({ soundEnabled: !state.soundEnabled })),

  crtEnabled: true,
  toggleCRT: () => set(state => ({ crtEnabled: !state.crtEnabled })),

  matrixMode: false,
  setMatrixMode: (v) => set({ matrixMode: v }),

  systemTime: new Date(),
  updateTime: () => set({ systemTime: new Date() }),

  cpuUsage: 12,
  ramUsage: 34,
  updateStats: () => set({
    cpuUsage: Math.min(95, Math.max(5, 12 + Math.random() * 30 - 15 + Math.sin(Date.now() / 3000) * 10)),
    ramUsage: Math.min(90, Math.max(20, 34 + Math.random() * 15 - 7 + Math.cos(Date.now() / 5000) * 5)),
  }),
}));
