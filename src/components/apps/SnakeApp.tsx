'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 20;
const CELL_SIZE = 22;
const INITIAL_SPEED = 150;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export default function SnakeApp() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef<Direction>('RIGHT');
  const foodRef = useRef<Position>({ x: 15, y: 10 });
  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }]);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    const initialFood = generateFood(initialSnake);
    setSnake(initialSnake);
    snakeRef.current = initialSnake;
    setFood(initialFood);
    foodRef.current = initialFood;
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
    setIsPaused(false);
  }, [generateFood]);

  const startGame = useCallback(() => {
    resetGame();
    setIsPlaying(true);
  }, [resetGame]);

  const gameStep = useCallback(() => {
    const prevSnake = snakeRef.current;
    const head = { ...prevSnake[0] };
    const dir = directionRef.current;

    switch (dir) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setIsGameOver(true);
      setIsPlaying(false);
      return;
    }

    // Self collision
    if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
      setIsGameOver(true);
      setIsPlaying(false);
      return;
    }

    const newSnake = [head, ...prevSnake];
    const currentFood = foodRef.current;

    // Check food
    if (head.x === currentFood.x && head.y === currentFood.y) {
      setScore(s => {
        const newScore = s + 10;
        setHighScore(hs => Math.max(hs, newScore));
        // Speed up every 50 points
        if (newScore % 50 === 0) {
          setSpeed(sp => Math.max(60, sp - 15));
        }
        return newScore;
      });
      const nextFood = generateFood(newSnake);
      setFood(nextFood);
      foodRef.current = nextFood;
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    snakeRef.current = newSnake;
  }, [generateFood]);

  // Game loop
  useEffect(() => {
    if (isPlaying && !isPaused && !isGameOver) {
      gameLoopRef.current = setInterval(gameStep, speed);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isPaused, isGameOver, speed, gameStep]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPaused(p => !p);
        return;
      }

      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
        W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT',
      };

      const newDir = keyMap[e.key];
      if (!newDir) return;
      e.preventDefault();

      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
      };

      if (opposites[newDir] !== directionRef.current) {
        directionRef.current = newDir;
        setDirection(newDir);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Focus container
  useEffect(() => {
    containerRef.current?.focus();
  }, [isPlaying]);

  const getSnakeCellStyle = (index: number, total: number) => {
    const isHead = index === 0;
    const progress = index / total;
    if (isHead) {
      return {
        background: '#00ff41',
        boxShadow: '0 0 12px #00ff41, 0 0 24px rgba(0,255,65,0.4)',
        borderRadius: '4px',
      };
    }
    return {
      background: `rgba(0, ${Math.floor(255 - progress * 120)}, ${Math.floor(65 - progress * 40)}, ${1 - progress * 0.5})`,
      boxShadow: `0 0 ${6 - progress * 4}px rgba(0,255,65,${0.3 - progress * 0.2})`,
      borderRadius: '3px',
    };
  };

  const speedLevel = speed <= 75 ? 'INSANE' : speed <= 90 ? 'FAST' : speed <= 120 ? 'MEDIUM' : 'NORMAL';
  const speedColor = speed <= 75 ? '#ff0040' : speed <= 90 ? '#ff6b00' : speed <= 120 ? '#ffdd00' : '#00ff41';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="h-full flex flex-col items-center justify-center outline-none select-none"
      style={{ background: 'rgba(8,8,14,0.98)' }}
    >
      <AnimatePresence mode="wait">
        {!isPlaying && !isGameOver && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <h1
              className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              CYBER SNAKE
            </h1>
            <p className="text-zinc-500 font-mono text-xs mb-2">
              Use WASD or Arrow Keys to navigate
            </p>
            <p className="text-zinc-600 font-mono text-xs mb-6">
              Press SPACE to pause
            </p>
            {highScore > 0 && (
              <p className="text-cyan-400 font-mono text-sm mb-4">
                HIGH SCORE: {highScore}
              </p>
            )}
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-lg font-bold tracking-widest text-black transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(45deg, #00ff41, #00d4ff)',
                boxShadow: '0 0 20px rgba(0,255,65,0.4)',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '14px',
              }}
            >
              START GAME
            </button>
          </motion.div>
        )}

        {isGameOver && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <h2
              className="text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              SYSTEM CRASH
            </h2>
            <p className="text-zinc-400 font-mono text-sm mb-1">Final Score</p>
            <p className="text-4xl font-black text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {score}
            </p>
            {score >= highScore && score > 0 && (
              <p className="text-yellow-400 font-mono text-xs mb-4 animate-pulse">
                ★ NEW HIGH SCORE ★
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-lg font-bold tracking-widest text-black transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(45deg, #00ff41, #00d4ff)',
                  boxShadow: '0 0 15px rgba(0,255,65,0.3)',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '12px',
                }}
              >
                RETRY
              </button>
              <button
                onClick={() => { setIsGameOver(false); setIsPlaying(false); }}
                className="px-6 py-2.5 rounded-lg font-bold tracking-widest text-zinc-300 transition-all hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '12px',
                }}
              >
                MENU
              </button>
            </div>
          </motion.div>
        )}

        {isPlaying && !isGameOver && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            {/* HUD */}
            <div className="flex items-center gap-6 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">SCORE</span>
                <span className="text-cyan-400 font-bold text-sm">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">BEST</span>
                <span className="text-zinc-300 font-bold text-sm">{highScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">SPEED</span>
                <span className="font-bold text-sm" style={{ color: speedColor }}>{speedLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">LEN</span>
                <span className="text-green-400 font-bold text-sm">{snake.length}</span>
              </div>
            </div>

            {/* Game Board */}
            <div
              className="relative"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(0,255,65,0.15)',
                boxShadow: '0 0 30px rgba(0,255,65,0.05), inset 0 0 30px rgba(0,0,0,0.5)',
                borderRadius: '4px',
              }}
            >
              {/* Grid lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,255,65,1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)
                  `,
                  backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
                }}
              />

              {/* Food */}
              <motion.div
                className="absolute"
                style={{
                  left: food.x * CELL_SIZE + 2,
                  top: food.y * CELL_SIZE + 2,
                  width: CELL_SIZE - 4,
                  height: CELL_SIZE - 4,
                  background: '#ff0040',
                  boxShadow: '0 0 12px #ff0040, 0 0 24px rgba(255,0,64,0.4)',
                  borderRadius: '50%',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />

              {/* Snake */}
              {snake.map((seg, i) => (
                <div
                  key={`${i}-${seg.x}-${seg.y}`}
                  className="absolute transition-all"
                  style={{
                    left: seg.x * CELL_SIZE + 1,
                    top: seg.y * CELL_SIZE + 1,
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    ...getSnakeCellStyle(i, snake.length),
                  }}
                />
              ))}

              {/* Pause overlay */}
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10">
                  <div className="text-center">
                    <p
                      className="text-2xl font-black text-cyan-400 mb-2"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      PAUSED
                    </p>
                    <p className="text-zinc-500 font-mono text-xs">Press SPACE to resume</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-1 w-32 md:hidden">
              <div />
              <button
                onTouchStart={() => { if (directionRef.current !== 'DOWN') { directionRef.current = 'UP'; setDirection('UP'); } }}
                className="p-2 rounded bg-white/5 text-zinc-400 text-center text-lg active:bg-white/10"
              >▲</button>
              <div />
              <button
                onTouchStart={() => { if (directionRef.current !== 'RIGHT') { directionRef.current = 'LEFT'; setDirection('LEFT'); } }}
                className="p-2 rounded bg-white/5 text-zinc-400 text-center text-lg active:bg-white/10"
              >◀</button>
              <button
                onTouchStart={() => setIsPaused(p => !p)}
                className="p-2 rounded bg-white/5 text-zinc-400 text-center text-xs active:bg-white/10 font-mono"
              >⏸</button>
              <button
                onTouchStart={() => { if (directionRef.current !== 'LEFT') { directionRef.current = 'RIGHT'; setDirection('RIGHT'); } }}
                className="p-2 rounded bg-white/5 text-zinc-400 text-center text-lg active:bg-white/10"
              >▶</button>
              <div />
              <button
                onTouchStart={() => { if (directionRef.current !== 'UP') { directionRef.current = 'DOWN'; setDirection('DOWN'); } }}
                className="p-2 rounded bg-white/5 text-zinc-400 text-center text-lg active:bg-white/10"
              >▼</button>
              <div />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
