'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useOS } from '@/store/useOS';
import { PERSONAL, SKILLS, PROJECTS, NEOFETCH_ART, FILESYSTEM, FILE_CONTENTS, EDUCATION, CERTIFICATIONS } from '@/data/portfolio';

const COMMANDS = ['help','about','skills','projects','contact','social','github','linkedin','instagram','resume','clear','neofetch','whoami','sudo','hack','matrix','ls','cd','cat','exit','game','ascii','music','history','pwd','date','uptime','uname'];

export default function TerminalApp() {
  const { openWindow, setMatrixMode, closeWindow, windows } = useOS();
  const [lines, setLines] = useState<{text: string; color?: string}[]>([
    { text: `Welcome to RavirajOS Terminal v2.0`, color: '#00d4ff' },
    { text: `Type "help" for available commands.\n`, color: '#71717a' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cwd, setCwd] = useState('~');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, 10);
  }, []);

  const addLines = useCallback((newLines: {text: string; color?: string}[]) => {
    setLines(prev => [...prev, ...newLines]);
    scrollToBottom();
  }, [scrollToBottom]);

  const typeLines = useCallback(async (newLines: {text: string; color?: string}[]) => {
    setIsTyping(true);
    for (const line of newLines) {
      await new Promise(r => setTimeout(r, 30));
      setLines(prev => [...prev, line]);
      scrollToBottom();
    }
    setIsTyping(false);
  }, [scrollToBottom]);

  const processCommand = useCallback(async (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    addLines([{ text: `\n┌──(${PERSONAL.handle}@${PERSONAL.hostname})-[${cwd}]`, color: '#00d4ff' }, { text: `└─$ ${cmd}`, color: '#00ff41' }]);

    switch (command) {
      case 'help':
        await typeLines([
          { text: '\n╔══════════════════════════════════════╗', color: '#00d4ff' },
          { text: '║     RavirajOS Terminal — Commands    ║', color: '#00d4ff' },
          { text: '╠══════════════════════════════════════╣', color: '#00d4ff' },
          { text: '║  about      — About me               ║', color: '#00ff41' },
          { text: '║  skills     — Technical skills        ║', color: '#00ff41' },
          { text: '║  projects   — My projects             ║', color: '#00ff41' },
          { text: '║  contact    — Contact info            ║', color: '#00ff41' },
          { text: '║  social     — Social links            ║', color: '#00ff41' },
          { text: '║  neofetch   — System info             ║', color: '#00ff41' },
          { text: '║  whoami     — Who am I?               ║', color: '#00ff41' },
          { text: '║  github     — Open GitHub             ║', color: '#00ff41' },
          { text: '║  linkedin   — Open LinkedIn           ║', color: '#00ff41' },
          { text: '║  matrix     — Matrix rain             ║', color: '#00ff41' },
          { text: '║  hack       — Hacking simulation      ║', color: '#00ff41' },
          { text: '║  game       — Open Game Center        ║', color: '#00ff41' },
          { text: '║  sudo       — Try root access         ║', color: '#00ff41' },
          { text: '║  ls/cd/cat  — File navigation         ║', color: '#00ff41' },
          { text: '║  clear      — Clear terminal          ║', color: '#00ff41' },
          { text: '║  exit       — Close terminal          ║', color: '#00ff41' },
          { text: '╚══════════════════════════════════════╝', color: '#00d4ff' },
        ]);
        break;

      case 'about':
        await typeLines([
          { text: '\n┌─── ABOUT ME ───────────────────────┐', color: '#bf00ff' },
          { text: `│  Name:  ${PERSONAL.name}`, color: '#e4e4e7' },
          { text: `│  Role:  ${PERSONAL.title}`, color: '#e4e4e7' },
          { text: `│  University: ${PERSONAL.university}`, color: '#e4e4e7' },
          { text: `│  Location: ${PERSONAL.location}`, color: '#e4e4e7' },
          { text: '│', color: '#e4e4e7' },
          { text: `│  ${PERSONAL.bio.substring(0, 70)}`, color: '#71717a' },
          { text: `│  ${PERSONAL.bio.substring(70, 140)}`, color: '#71717a' },
          { text: `│  ${PERSONAL.bio.substring(140)}`, color: '#71717a' },
          { text: '└────────────────────────────────────┘', color: '#bf00ff' },
        ]);
        break;

      case 'skills':
        const skillLines: {text: string; color?: string}[] = [
          { text: '\n⚡ TECHNICAL SKILLS', color: '#ffb000' },
        ];
        Object.entries(SKILLS).forEach(([cat, skills]) => {
          const bar = '█'.repeat(Math.min(skills.length * 3, 20));
          skillLines.push({ text: `\n  ${cat.toUpperCase()}:`, color: '#00d4ff' });
          skillLines.push({ text: `  ${(skills as string[]).join(' • ')}`, color: '#e4e4e7' });
          skillLines.push({ text: `  [${bar}${'░'.repeat(20 - bar.length)}] ${skills.length} skills`, color: '#00ff41' });
        });
        await typeLines(skillLines);
        break;

      case 'projects':
        const projLines: {text: string; color?: string}[] = [{ text: '\n🚀 PROJECTS', color: '#ffb000' }];
        PROJECTS.forEach((p, i) => {
          projLines.push({ text: `\n  [${i + 1}] ${p.title}`, color: '#00d4ff' });
          projLines.push({ text: `      ${p.description.substring(0, 80)}...`, color: '#71717a' });
          projLines.push({ text: `      Tech: ${p.technologies.join(', ')}`, color: '#bf00ff' });
          if (p.url) projLines.push({ text: `      URL: ${p.url}`, color: '#00ff41' });
        });
        await typeLines(projLines);
        break;

      case 'contact':
        await typeLines([
          { text: '\n✉️  CONTACT', color: '#ffb000' },
          { text: `  Email:     ${PERSONAL.email}`, color: '#00d4ff' },
          { text: `  GitHub:    ${PERSONAL.github}`, color: '#e4e4e7' },
          { text: `  LinkedIn:  ${PERSONAL.linkedin}`, color: '#e4e4e7' },
          { text: `  Location:  ${PERSONAL.location}`, color: '#e4e4e7' },
        ]);
        break;

      case 'social':
        await typeLines([
          { text: '\n🌐 SOCIAL LINKS', color: '#ffb000' },
          { text: `  GitHub:    ${PERSONAL.github}`, color: '#e4e4e7' },
          { text: `  LinkedIn:  ${PERSONAL.linkedin}`, color: '#e4e4e7' },
          { text: `  Instagram: ${PERSONAL.instagram}`, color: '#e4e4e7' },
          { text: `  Twitter:   ${PERSONAL.twitter}`, color: '#e4e4e7' },
        ]);
        break;

      case 'neofetch':
        addLines(NEOFETCH_ART.split('\n').map(l => ({ text: l, color: undefined })));
        break;

      case 'whoami':
        addLines([{ text: `${PERSONAL.handle}`, color: '#00ff41' }]);
        break;

      case 'github':
        addLines([{ text: 'Opening GitHub...', color: '#00d4ff' }]);
        window.open(PERSONAL.github, '_blank');
        break;

      case 'linkedin':
        addLines([{ text: 'Opening LinkedIn...', color: '#00d4ff' }]);
        window.open(PERSONAL.linkedin, '_blank');
        break;

      case 'instagram':
        addLines([{ text: 'Opening Instagram...', color: '#00d4ff' }]);
        window.open(PERSONAL.instagram, '_blank');
        break;

      case 'sudo':
        await typeLines([
          { text: '\n[sudo] password for raviraj: ********', color: '#ff0040' },
          { text: 'raviraj is not in the sudoers file.', color: '#ff0040' },
          { text: 'This incident will be reported. 😈', color: '#ff0040' },
          { text: '\nJust kidding — nice try though! 😄', color: '#ffb000' },
        ]);
        break;

      case 'hack': {
        const hackLines = [
          'Initializing CyberAttack Framework v4.2...',
          'Loading exploit modules... [████████████████████] 100%',
          'Scanning target network: 192.168.1.0/24',
          'Found 42 open ports...',
          'Injecting payload into port 443...',
          'Bypassing firewall... ACCESS GRANTED',
          'Downloading mainframe data... [████████░░] 82%',
          'ERROR: Honeypot detected!',
          'Deploying counter-measures...',
          'Connection rerouted through 7 proxies',
          '>>> HACK SUCCESSFUL <<<',
          '',
          '...Just kidding. This is a portfolio website. 😎',
        ];
        for (const line of hackLines) {
          await new Promise(r => setTimeout(r, 200));
          setLines(prev => [...prev, { text: line, color: line.includes('ERROR') ? '#ff0040' : line.includes('SUCCESSFUL') ? '#00ff41' : '#00d4ff' }]);
          scrollToBottom();
        }
        break;
      }

      case 'matrix':
        addLines([{ text: 'Entering the Matrix...', color: '#00ff41' }]);
        setMatrixMode(true);
        setTimeout(() => setMatrixMode(false), 10000);
        break;

      case 'game':
        addLines([{ text: 'Opening Game Center...', color: '#00d4ff' }]);
        openWindow('game', 'Game Center');
        break;

      case 'ls': {
        const dir = args[0] ? (args[0].startsWith('~/') ? args[0] : `${cwd}/${args[0]}`.replace('//', '/')) : cwd;
        const contents = FILESYSTEM[dir];
        if (contents) {
          addLines(contents.map(f => ({
            text: `  ${f}`,
            color: f.includes('.') ? '#e4e4e7' : '#00d4ff',
          })));
        } else {
          addLines([{ text: `ls: cannot access '${dir}': No such file or directory`, color: '#ff0040' }]);
        }
        break;
      }

      case 'cd': {
        const target = args[0] || '~';
        const newDir = target === '..' ? cwd.split('/').slice(0, -1).join('/') || '~' :
                       target.startsWith('~') ? target : `${cwd}/${target}`;
        if (FILESYSTEM[newDir] || newDir === '~') {
          setCwd(newDir);
        } else {
          addLines([{ text: `cd: no such directory: ${target}`, color: '#ff0040' }]);
        }
        break;
      }

      case 'cat': {
        const file = args[0] || '';
        const content = FILE_CONTENTS[file];
        if (content) {
          addLines(content.split('\n').map(l => ({ text: l, color: '#e4e4e7' })));
        } else {
          addLines([{ text: `cat: ${file}: No such file or directory`, color: '#ff0040' }]);
        }
        break;
      }

      case 'pwd':
        addLines([{ text: `/home/${PERSONAL.handle}${cwd.replace('~', '')}`, color: '#e4e4e7' }]);
        break;

      case 'date':
        addLines([{ text: new Date().toString(), color: '#e4e4e7' }]);
        break;

      case 'uptime':
        addLines([{ text: ' up 420 days, 13:37, 1 user, load average: 0.42, 0.69, 1.00', color: '#e4e4e7' }]);
        break;

      case 'uname':
        addLines([{ text: 'RavirajOS 6.9.0-cyber x86_64 GNU/Linux', color: '#e4e4e7' }]);
        break;

      case 'resume':
        await typeLines([
          { text: '\n📄 RESUME — RAVIRAJ SHARMA', color: '#ffb000' },
          { text: '═'.repeat(45), color: '#00d4ff' },
          { text: '\n🎓 EDUCATION:', color: '#bf00ff' },
          ...EDUCATION.map(e => ({ text: `  ${e.icon} ${e.degree} — ${e.institution} (${e.period})`, color: '#e4e4e7' })),
          { text: '\n📜 CERTIFICATIONS:', color: '#bf00ff' },
          ...CERTIFICATIONS.map(c => ({ text: `  ✓ ${c.name} | ${c.issuer}`, color: '#e4e4e7' })),
        ]);
        break;

      case 'ascii':
        addLines([
          { text: '╔═══════════════════════════════════════════╗', color: '#bf00ff' },
          { text: '║  ██████╗  █████╗ ██╗   ██╗██╗██████╗     ║', color: '#00d4ff' },
          { text: '║  ██╔══██╗██╔══██╗██║   ██║██║██╔══██╗    ║', color: '#00d4ff' },
          { text: '║  ██████╔╝███████║██║   ██║██║██████╔╝    ║', color: '#00d4ff' },
          { text: '║  ██╔══██╗██╔══██║╚██╗ ██╔╝██║██╔══██╗    ║', color: '#00d4ff' },
          { text: '║  ██║  ██║██║  ██║ ╚████╔╝ ██║██║  ██║    ║', color: '#00d4ff' },
          { text: '║  ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═╝    ║', color: '#00d4ff' },
          { text: '╚═══════════════════════════════════════════╝', color: '#bf00ff' },
        ]);
        break;

      case 'clear':
        setLines([]);
        return;

      case 'exit': {
        const termWin = windows.find(w => w.appId === 'terminal');
        if (termWin) closeWindow(termWin.id);
        return;
      }

      case 'history':
        addLines(cmdHistory.map((c, i) => ({ text: `  ${i + 1}  ${c}`, color: '#71717a' })));
        break;

      default:
        if (command) {
          addLines([{ text: `bash: ${command}: command not found`, color: '#ff0040' },
                    { text: `Type "help" for available commands.`, color: '#71717a' }]);
        }
    }
  }, [cwd, addLines, typeLines, openWindow, setMatrixMode, closeWindow, windows, cmdHistory, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping || !input.trim()) return;
    const cmd = input.trim();
    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIdx(-1);
    setInput('');
    processCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
      setHistoryIdx(newIdx);
      setInput(cmdHistory[cmdHistory.length - 1 - newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = historyIdx > 0 ? historyIdx - 1 : -1;
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[cmdHistory.length - 1 - newIdx] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.filter(c => c.startsWith(input.toLowerCase()));
      if (match.length === 1) setInput(match[0]);
      else if (match.length > 1) addLines([{ text: match.join('  '), color: '#71717a' }]);
    }
  };

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(scrollToBottom, [lines, scrollToBottom]);

  return (
    <div
      className="h-full flex flex-col font-mono text-sm"
      style={{ background: 'rgba(5,5,10,0.95)' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.color || '#e4e4e7', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="shrink-0 px-4 pb-3">
        <div className="flex items-center gap-0 text-sm">
          <span style={{ color: '#00d4ff' }}>┌──(</span>
          <span style={{ color: '#00ff41' }}>{PERSONAL.handle}@{PERSONAL.hostname}</span>
          <span style={{ color: '#00d4ff' }}>)-[</span>
          <span style={{ color: '#e4e4e7' }}>{cwd}</span>
          <span style={{ color: '#00d4ff' }}>]</span>
        </div>
        <div className="flex items-center gap-1">
          <span style={{ color: '#00d4ff' }}>└─$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
            spellCheck={false}
            autoComplete="off"
            disabled={isTyping}
          />
        </div>
      </form>
    </div>
  );
}
