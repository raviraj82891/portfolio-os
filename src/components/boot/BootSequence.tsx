'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '@/store/useOS';

const BIOS_LINES = [
  'RavirajOS BIOS v2.4.1 — Cyberpunk Edition',
  'Copyright (C) 2024 Raviraj Systems, Inc.',
  '',
  'CPU: Raviraj CyberCore™ i9-13900X @ 5.8GHz',
  'RAM: 64GB DDR5-6400 Corsair Dominator',
  'GPU: NVIDIA RTX 5090 Ti 24GB GDDR7',
  'SSD: 2TB Samsung 990 Pro NVMe',
  '',
  'Initializing memory controller... [  OK  ]',
  'Detecting SATA devices... [  OK  ]',
  'Loading GPU firmware... [  OK  ]',
  'USB 3.2 Gen 2x2 initialized... [  OK  ]',
  'Network interface eth0 detected... [  OK  ]',
  'Secure Boot verification... [  OK  ]',
  'TPM 2.0 module active... [  OK  ]',
  '',
  'Press DEL to enter BIOS setup...',
  '',
  'Booting from NVMe0: RavirajOS...',
];

const KERNEL_LINES = [
  '[    0.000000] Linux version 6.9.0-cyber (raviraj@build-server)',
  '[    0.000012] Command line: BOOT_IMAGE=/vmlinuz root=/dev/nvme0n1p2',
  '[    0.000045] x86/fpu: Supporting XSAVE feature 0x001: x87 FP',
  '[    0.000089] BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff]',
  '[    0.001204] Booting paravirtualized kernel on bare hardware',
  '[    0.002100] clocksource: tsc-early: mask: 0xffffffffffffffff',
  '[    0.003455] Memory: 65536MB available (16384k kernel code)',
  '[    0.004102] ACPI: RSDP 0x00000000000E0000 000024 (v02 RVJRJS)',
  '[    0.005234] Security Framework initialized',
  '[    0.006001] SELinux: Initializing...',
  '[    0.007342] Dentry cache hash table entries: 8388608',
  '[    0.008901] Inode cache hash table entries: 4194304',
  '[    0.010234] Mount cache hash table entries: 131072',
  '[    0.012567] smpboot: CPU0: Raviraj CyberCore (family: 0x6)',
  '[    0.015234] Performance Events: PEBS fmt4, 32-deep LBR',
  '[    0.018901] rcu: Hierarchical SRCU implementation.',
  '[    0.023456] smp: Bringing up secondary CPUs ...',
  '[    0.028901] smp: Brought up 1 node, 24 CPUs',
  '[    0.034567] NET: Registered PF_INET protocol family',
  '[    0.040123] PCI: Using configuration type 1 for base access',
  '[    0.045678] thunderbolt: Networking mode enabled',
  '[    0.052345] nvidia: Loading NVIDIA GPU driver v560.31.02',
  '[    0.060123] nvidia: GPU NVIDIA RTX 5090 Ti detected',
  '[    0.067890] EXT4-fs (nvme0n1p2): mounted filesystem',
  '[    0.075432] systemd[1]: Detected architecture x86-64.',
  '[    0.082345] systemd[1]: Set hostname to <raviraj-os>.',
  '[    0.090123] systemd[1]: Starting Raviraj Desktop Environment...',
  '[    0.098765] systemd[1]: Loading Hyprland compositor...',
  '[    0.105432] systemd[1]: Starting NetworkManager...',
  '[    0.112345] systemd[1]: Starting Bluetooth service...',
  '[    0.120123] systemd[1]: Started PipeWire Multimedia Service.',
  '[    0.128901] systemd[1]: ░█▀▀ █▄█ █▀▄ █▀▀ █▀█',
  '[    0.136789] systemd[1]: ░█▄▄ ░█░ █▀▄ ██▄ █▀▄',
  '[    0.145678] systemd[1]: RavirajOS v2.0 — Ready.',
  '',
  'Starting display manager...',
];

export default function BootSequence() {
  const { setBootPhase } = useOS();
  const [biosLines, setBiosLines] = useState<string[]>([]);
  const [kernelLines, setKernelLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'bios' | 'kernel' | 'done'>('bios');
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (phase === 'bios') {
      let i = 0;
      const interval = setInterval(() => {
        if (i < BIOS_LINES.length) {
          setBiosLines(prev => [...prev, BIOS_LINES[i]]);
          setProgress((i / BIOS_LINES.length) * 40);
          i++;
          scrollToBottom();
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase('kernel'), 600);
        }
      }, 120);
      return () => clearInterval(interval);
    }
  }, [phase, scrollToBottom]);

  useEffect(() => {
    if (phase === 'kernel') {
      let i = 0;
      const interval = setInterval(() => {
        if (i < KERNEL_LINES.length) {
          setKernelLines(prev => [...prev, KERNEL_LINES[i]]);
          setProgress(40 + (i / KERNEL_LINES.length) * 60);
          i++;
          scrollToBottom();
        } else {
          clearInterval(interval);
          setPhase('done');
          setTimeout(() => setBootPhase('login'), 800);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase, setBootPhase, scrollToBottom]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[9999] flex flex-col"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="scanlines" />

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 md:p-10 boot-text"
        style={{ scrollBehavior: 'smooth' }}
      >
        <AnimatePresence>
          {phase === 'bios' && biosLines.map((line, i) => (
            <motion.div
              key={`bios-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className={line?.includes('[  OK  ]') ? 'text-green-400' : ''}
            >
              {line?.includes('[  OK  ]') ? (
                <>
                  {line.replace('[  OK  ]', '')}
                  <span className="text-green-400 font-bold">[  OK  ]</span>
                </>
              ) : line === '' ? (
                <br />
              ) : (
                line || ''
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {phase === 'kernel' && (
          <>
            <div className="mt-4 mb-2 text-cyan-400 font-bold text-sm">
              ═══ KERNEL INITIALIZATION ═══
            </div>
            {kernelLines.map((line, i) => (
              <motion.div
                key={`kernel-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05 }}
                className="text-xs md:text-sm"
                style={{
                  color: line?.includes('nvidia') ? '#76b900' :
                    line?.includes('systemd') ? '#00d4ff' :
                      line?.includes('░') ? '#bf00ff' :
                        line?.includes('Ready') ? '#00ff41' :
                          '#8b949e'
                }}
              >
                {line || <br />}
              </motion.div>
            ))}
          </>
        )}

        {phase !== 'done' && (
          <span className="boot-cursor" />
        )}
      </div>

      {/* Progress Bar */}
      <div className="px-6 md:px-10 pb-6">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-2 font-mono">
          <span>Booting RavirajOS...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00ff41, #00d4ff, #bf00ff)',
              boxShadow: '0 0 15px #00ff41, 0 0 30px rgba(0,255,65,0.3)',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
