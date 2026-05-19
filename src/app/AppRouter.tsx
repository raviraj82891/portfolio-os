'use client';

import { useEffect, useState } from 'react';
import { useOS } from '@/store/useOS';
import BootSequence from '@/components/boot/BootSequence';
import LoginScreen from '@/components/boot/LoginScreen';
import DesktopEnvironment from '@/components/desktop/DesktopEnvironment';

export default function AppRouter() {
  const { bootPhase, soundEnabled } = useOS();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Sounds globally
  useEffect(() => {
    if (!mounted || !soundEnabled) return;

    let audio: HTMLAudioElement;
    if (bootPhase === 'kernel') {
      audio = new Audio('/sounds/hdd.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => { });
    } else if (bootPhase === 'login') {
      audio = new Audio('/sounds/startup.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => { });
    } else if (bootPhase === 'desktop') {
      audio = new Audio('/sounds/login.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => { });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [bootPhase, mounted, soundEnabled]);

  if (!mounted) return null;

  return (
    <main className="w-screen h-screen overflow-hidden bg-black text-white relative">
      {bootPhase === 'bios' || bootPhase === 'kernel' ? (
        <BootSequence />
      ) : bootPhase === 'login' ? (
        <LoginScreen />
      ) : (
        <DesktopEnvironment />
      )}
    </main>
  );
}
