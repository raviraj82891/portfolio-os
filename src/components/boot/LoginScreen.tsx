'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/store/useOS';
import { PERSONAL } from '@/data/portfolio';

export default function LoginScreen() {
  const { setBootPhase } = useOS();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowPassword(true), 800);
  }, []);

  useEffect(() => {
    if (showPassword && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPassword]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setError('');

    setTimeout(() => {
      setBootPhase('desktop');
    }, 1500);
  };

  const timeStr = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.08) 0%, rgba(10,10,15,1) 70%)',
      }}
    >
      <div className="scanlines" />

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: i % 3 === 0 ? '#00ff41' : i % 3 === 1 ? '#00d4ff' : '#bf00ff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Time */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div
          className="text-7xl md:text-8xl font-light tracking-wider mb-2"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#e4e4e7',
            textShadow: '0 0 30px rgba(0,212,255,0.3)',
          }}
        >
          {timeStr}
        </div>
        <div className="text-zinc-500 text-lg tracking-widest uppercase">
          {dateStr}
        </div>
      </motion.div>

      {/* User Avatar */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <div
          className="w-24 h-24 rounded-full overflow-hidden border-2"
          style={{
            borderColor: 'rgba(0, 212, 255, 0.4)',
            boxShadow: '0 0 35px rgba(0,212,255,0.4), 0 0 70px rgba(191,0,255,0.25)',
          }}
        >
          <img
            src={PERSONAL.profilePhoto}
            alt={PERSONAL.name}
            className="w-full h-full object-cover select-none"
          />
        </div>
      </motion.div>

      {/* Username */}
      <motion.div
        className="text-xl font-medium mb-1 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {PERSONAL.name}
      </motion.div>
      <motion.div
        className="text-sm text-zinc-500 mb-8 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        @{PERSONAL.handle}
      </motion.div>

      {/* Password Input */}
      {showPassword && (
        <motion.form
          onSubmit={handleLogin}
          className="w-72"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (any key + Enter)"
              className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: error
                  ? '0 0 15px rgba(255,0,64,0.3)'
                  : '0 0 15px rgba(0,212,255,0.1)',
              }}
              autoComplete="off"
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: isLoggingIn
                  ? 'linear-gradient(135deg, #00ff41, #00d4ff)'
                  : 'rgba(0,212,255,0.15)',
              }}
            >
              {isLoggingIn ? (
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
                />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <motion.p
              className="text-red-400 text-xs mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <p className="text-zinc-600 text-xs mt-3 text-center">
            Press Enter to login • Any password works
          </p>
        </motion.form>
      )}

      {/* Login animation overlay */}
      {isLoggingIn && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(0,212,255,0.2) 0%, rgba(0,0,0,1) 70%)',
          }}
        />
      )}

      {/* OS Label */}
      <motion.div
        className="absolute bottom-8 text-zinc-600 text-xs font-mono tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        RavirajOS v2.0 • Hyprland • Wayland
      </motion.div>
    </motion.div>
  );
}
