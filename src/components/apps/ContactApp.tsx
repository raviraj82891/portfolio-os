'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    url: PERSONAL.github,
    icon: '🐙',
    color: '#e4e4e7',
    accent: 'rgba(228,228,231,0.08)',
    border: 'rgba(228,228,231,0.12)',
  },
  {
    label: 'LinkedIn',
    url: PERSONAL.linkedin,
    icon: '💼',
    color: '#6366f1',
    accent: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.16)',
  },
  {
    label: 'Email',
    url: `mailto:${PERSONAL.email}`,
    icon: '📧',
    color: '#f43f5e',
    accent: 'rgba(244,63,94,0.08)',
    border: 'rgba(244,63,94,0.16)',
  },
];

const inputCls =
  'w-full bg-white/[0.03] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/45 focus:bg-indigo-950/[0.06] transition-all duration-200';

export default function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    }, 1500);
  };

  const btnStyle = {
    idle: {
      background: 'rgba(99,102,241,0.1)',
      color: '#818cf8',
      border: '1px solid rgba(99,102,241,0.22)',
    },
    sending: {
      background: 'rgba(99,102,241,0.08)',
      color: '#6366f1',
      border: '1px solid rgba(99,102,241,0.15)',
    },
    success: {
      background: 'rgba(34,197,94,0.1)',
      color: '#22c55e',
      border: '1px solid rgba(34,197,94,0.22)',
    },
    error: {
      background: 'rgba(239,68,68,0.1)',
      color: '#ef4444',
      border: '1px solid rgba(239,68,68,0.22)',
    },
  }[status];

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(30, 27, 75, 0.10) 0%, rgba(14, 14, 20, 0.99) 80%)',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.08) transparent',
      }}
    >
      <div className="max-w-md mx-auto px-5 py-5 flex flex-col gap-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="type-heading flex items-center gap-2">
            <span>✉️</span> Get in Touch
          </h1>
          <p className="type-caption mt-1">
            Send a message directly to{' '}
            <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{PERSONAL.handle}</span>
          </p>
        </motion.div>

        {/* Contact quick-links */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
        >
          {CONTACT_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg type-caption cursor-pointer"
              style={{
                background: link.accent,
                border: `1px solid ${link.border}`,
                color: link.color,
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 16 }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="type-caption" style={{ fontSize: 'var(--type-2xs)' }}>OR SEND A MESSAGE</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="type-label" style={{ color: 'var(--text-tertiary)' }}>Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputCls}
                placeholder="Your name"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 'var(--type-base)' }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="type-label" style={{ color: 'var(--text-tertiary)' }}>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputCls}
                placeholder="you@email.com"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 'var(--type-base)' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="type-label" style={{ color: 'var(--text-tertiary)' }}>Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputCls} resize-none`}
              placeholder="Your message..."
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'var(--type-base)' }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.button
              key={status}
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="w-full py-2.5 rounded-lg font-semibold cursor-pointer"
              style={{
                ...btnStyle,
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'var(--type-md)',
                letterSpacing: 'var(--tracking-wide)',
                transition: 'background 0.3s, color 0.3s, border 0.3s',
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              whileHover={status === 'idle' ? { scale: 1.01 } : {}}
              whileTap={status === 'idle' ? { scale: 0.98 } : {}}
            >
              {status === 'sending' && '⏳ Sending…'}
              {status === 'success' && '✓ Message Sent!'}
              {status === 'error' && '✕ Failed — Retry'}
              {status === 'idle' && 'Send Message →'}
            </motion.button>
          </AnimatePresence>
        </motion.form>

        {/* Footer note */}
        <motion.p
          className="type-caption text-center"
          style={{ fontSize: 'var(--type-2xs)', color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Responses typically within 24 hrs · {PERSONAL.email}
        </motion.p>
      </div>
    </div>
  );
}
