'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

export default function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="h-full overflow-y-auto px-3 py-2" style={{ background: 'rgba(14,14,20,0.98)' }}>
      <motion.div className="max-w-md mx-auto" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-base font-bold mb-1 text-indigo-400" style={{ fontFamily: "'Outfit', sans-serif" }}>✉️ Get in Touch</h1>
        <p className="text-[11px] text-zinc-400 mb-4">Send a message to {PERSONAL.handle}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide">Name</label>
            <input
              type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/40 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide">Email</label>
            <input
              type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/40 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide">Message</label>
            <textarea
              required rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/40 transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit" disabled={status === 'sending'}
            className="w-full py-2 rounded-lg text-[13px] font-semibold transition-all"
            style={{
              background: status === 'success' ? 'rgba(34,197,94,0.12)' : status === 'error' ? 'rgba(239,68,68,0.12)' : 'rgba(99,102,241,0.1)',
              color: status === 'success' ? '#22c55e' : status === 'error' ? '#ef4444' : '#818cf8',
              border: `1px solid ${status === 'success' ? 'rgba(34,197,94,0.2)' : status === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)'}`,
            }}
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Sent' : status === 'error' ? 'Failed' : 'Send Message'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-white/[0.05]">
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide mb-2">Also find me on</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'GitHub', url: PERSONAL.github, color: '#e4e4e7' },
              { label: 'LinkedIn', url: PERSONAL.linkedin, color: '#6366f1' },
              { label: 'Email', url: `mailto:${PERSONAL.email}`, color: '#ef4444' }
            ].map(link => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors" style={{ background: 'rgba(255,255,255,0.04)', color: link.color, border: '1px solid rgba(255,255,255,0.06)' }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
