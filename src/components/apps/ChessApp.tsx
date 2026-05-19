'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Chess piece types and colors
type PieceColor = 'white' | 'black';
type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

type Board = (Piece | null)[][];
type Position = [number, number]; // [row, col]

const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
  black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' },
};

const PIECE_VALUES: Record<PieceType, number> = {
  pawn: 10, knight: 30, bishop: 30, rook: 50, queen: 90, king: 900,
};

// Position scoring tables for better AI
const PAWN_TABLE = [
  [0,0,0,0,0,0,0,0],
  [5,5,5,5,5,5,5,5],
  [1,1,2,3,3,2,1,1],
  [0.5,0.5,1,2.5,2.5,1,0.5,0.5],
  [0,0,0,2,2,0,0,0],
  [0.5,-0.5,-1,0,0,-1,-0.5,0.5],
  [0.5,1,1,-2,-2,1,1,0.5],
  [0,0,0,0,0,0,0,0]
];

const KNIGHT_TABLE = [
  [-5,-4,-3,-3,-3,-3,-4,-5],
  [-4,-2,0,0,0,0,-2,-4],
  [-3,0,1,1.5,1.5,1,0,-3],
  [-3,0.5,1.5,2,2,1.5,0.5,-3],
  [-3,0,1.5,2,2,1.5,0,-3],
  [-3,0.5,1,1.5,1.5,1,0.5,-3],
  [-4,-2,0,0.5,0.5,0,-2,-4],
  [-5,-4,-3,-3,-3,-3,-4,-5]
];

function createInitialBoard(): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  const backRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: backRow[col], color: 'black' };
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
    board[7][col] = { type: backRow[col], color: 'white' };
  }
  return board;
}

function cloneBoard(board: Board): Board {
  return board.map(row => row.map(cell => cell ? { ...cell } : null));
}

function isInBounds(r: number, c: number): boolean {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function getValidMoves(board: Board, row: number, col: number, checkKingSafety = true): Position[] {
  const piece = board[row][col];
  if (!piece) return [];

  const moves: Position[] = [];
  const color = piece.color;
  const enemy = color === 'white' ? 'black' : 'white';

  const addMove = (r: number, c: number) => {
    if (!isInBounds(r, c)) return false;
    const target = board[r][c];
    if (target && target.color === color) return false;
    moves.push([r, c]);
    return !target; // continue sliding if empty
  };

  const slideDirections = (dirs: [number, number][]) => {
    for (const [dr, dc] of dirs) {
      for (let i = 1; i < 8; i++) {
        if (!addMove(row + dr * i, col + dc * i)) break;
      }
    }
  };

  switch (piece.type) {
    case 'pawn': {
      const dir = color === 'white' ? -1 : 1;
      const startRow = color === 'white' ? 6 : 1;
      // Forward
      if (isInBounds(row + dir, col) && !board[row + dir][col]) {
        moves.push([row + dir, col]);
        if (row === startRow && !board[row + 2 * dir][col]) {
          moves.push([row + 2 * dir, col]);
        }
      }
      // Captures
      for (const dc of [-1, 1]) {
        const nr = row + dir, nc = col + dc;
        if (isInBounds(nr, nc) && board[nr][nc] && board[nr][nc]!.color === enemy) {
          moves.push([nr, nc]);
        }
      }
      break;
    }
    case 'knight': {
      const knightMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
      for (const [dr, dc] of knightMoves) addMove(row + dr, col + dc);
      break;
    }
    case 'bishop':
      slideDirections([[-1,-1],[-1,1],[1,-1],[1,1]]);
      break;
    case 'rook':
      slideDirections([[-1,0],[1,0],[0,-1],[0,1]]);
      break;
    case 'queen':
      slideDirections([[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]);
      break;
    case 'king': {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          addMove(row + dr, col + dc);
        }
      }
      break;
    }
  }

  // Filter moves that leave king in check
  if (checkKingSafety) {
    return moves.filter(([mr, mc]) => {
      const newBoard = cloneBoard(board);
      newBoard[mr][mc] = newBoard[row][col];
      newBoard[row][col] = null;
      return !isKingInCheck(newBoard, color);
    });
  }

  return moves;
}

function isKingInCheck(board: Board, color: PieceColor): boolean {
  // Find king position
  let kingRow = -1, kingCol = -1;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.type === 'king' && board[r][c]?.color === color) {
        kingRow = r; kingCol = c;
      }
    }
  }
  if (kingRow === -1) return false;

  const enemy = color === 'white' ? 'black' : 'white';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.color === enemy) {
        const moves = getValidMoves(board, r, c, false);
        if (moves.some(([mr, mc]) => mr === kingRow && mc === kingCol)) return true;
      }
    }
  }
  return false;
}

function hasAnyValidMoves(board: Board, color: PieceColor): boolean {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.color === color) {
        if (getValidMoves(board, r, c).length > 0) return true;
      }
    }
  }
  return false;
}

function evaluateBoard(board: Board): number {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;
      const sign = piece.color === 'black' ? 1 : -1;
      let value = PIECE_VALUES[piece.type];

      // Position bonus
      if (piece.type === 'pawn') {
        const table = piece.color === 'black' ? PAWN_TABLE : [...PAWN_TABLE].reverse();
        value += table[r][c];
      } else if (piece.type === 'knight') {
        const table = piece.color === 'black' ? KNIGHT_TABLE : [...KNIGHT_TABLE].reverse();
        value += table[r][c];
      }

      score += sign * value;
    }
  }
  return score;
}

function minimax(board: Board, depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
  if (depth === 0) return evaluateBoard(board);

  const color = isMaximizing ? 'black' : 'white';

  if (!hasAnyValidMoves(board, color)) {
    if (isKingInCheck(board, color)) {
      return isMaximizing ? -10000 : 10000;
    }
    return 0; // Stalemate
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c]?.color === 'black') {
          for (const [mr, mc] of getValidMoves(board, r, c)) {
            const newBoard = cloneBoard(board);
            newBoard[mr][mc] = newBoard[r][c];
            newBoard[r][c] = null;
            // Pawn promotion
            if (newBoard[mr][mc]?.type === 'pawn' && mr === 7) {
              newBoard[mr][mc] = { type: 'queen', color: 'black' };
            }
            const evalScore = minimax(newBoard, depth - 1, alpha, beta, false);
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break;
          }
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c]?.color === 'white') {
          for (const [mr, mc] of getValidMoves(board, r, c)) {
            const newBoard = cloneBoard(board);
            newBoard[mr][mc] = newBoard[r][c];
            newBoard[r][c] = null;
            if (newBoard[mr][mc]?.type === 'pawn' && mr === 0) {
              newBoard[mr][mc] = { type: 'queen', color: 'white' };
            }
            const evalScore = minimax(newBoard, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break;
          }
        }
      }
    }
    return minEval;
  }
}

function getBestAIMove(board: Board): { from: Position; to: Position } | null {
  let bestMove: { from: Position; to: Position } | null = null;
  let bestEval = -Infinity;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.color === 'black') {
        for (const [mr, mc] of getValidMoves(board, r, c)) {
          const newBoard = cloneBoard(board);
          newBoard[mr][mc] = newBoard[r][c];
          newBoard[r][c] = null;
          if (newBoard[mr][mc]?.type === 'pawn' && mr === 7) {
            newBoard[mr][mc] = { type: 'queen', color: 'black' };
          }
          const evalScore = minimax(newBoard, 2, -Infinity, Infinity, false);
          if (evalScore > bestEval) {
            bestEval = evalScore;
            bestMove = { from: [r, c], to: [mr, mc] };
          }
        }
      }
    }
  }
  return bestMove;
}

export default function ChessApp() {
  const [board, setBoard] = useState<Board>(createInitialBoard);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>('white');
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [capturedWhite, setCapturedWhite] = useState<PieceType[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<PieceType[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Position; to: Position } | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const isThinkingRef = useRef(false);

  const checkGameState = useCallback((newBoard: Board, nextTurn: PieceColor) => {
    if (!hasAnyValidMoves(newBoard, nextTurn)) {
      setIsGameOver(true);
      if (isKingInCheck(newBoard, nextTurn)) {
        setGameResult(nextTurn === 'white' ? 'Black wins by Checkmate!' : 'White wins by Checkmate!');
      } else {
        setGameResult('Stalemate — Draw!');
      }
    }
  }, []);

  const makeAIMove = useCallback((currentBoard: Board) => {
    if (isThinkingRef.current) return;
    isThinkingRef.current = true;
    setIsThinking(true);

    setTimeout(() => {
      const move = getBestAIMove(currentBoard);
      if (move) {
        const newBoard = cloneBoard(currentBoard);
        const captured = newBoard[move.to[0]][move.to[1]];
        newBoard[move.to[0]][move.to[1]] = newBoard[move.from[0]][move.from[1]];
        newBoard[move.from[0]][move.from[1]] = null;

        // Pawn promotion
        if (newBoard[move.to[0]][move.to[1]]?.type === 'pawn' && move.to[0] === 7) {
          newBoard[move.to[0]][move.to[1]] = { type: 'queen', color: 'black' };
        }

        if (captured) {
          setCapturedWhite(prev => [...prev, captured.type]);
        }

        setBoard(newBoard);
        setLastMove(move);
        setCurrentTurn('white');
        setMoveCount(c => c + 1);
        checkGameState(newBoard, 'white');
      }
      setIsThinking(false);
      isThinkingRef.current = false;
    }, 500);
  }, [checkGameState]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (isGameOver || currentTurn !== 'white' || isThinking) return;

    const piece = board[row][col];

    if (selectedSquare) {
      // Check if this is a valid move
      if (validMoves.some(([mr, mc]) => mr === row && mc === col)) {
        const newBoard = cloneBoard(board);
        const captured = newBoard[row][col];
        newBoard[row][col] = newBoard[selectedSquare[0]][selectedSquare[1]];
        newBoard[selectedSquare[0]][selectedSquare[1]] = null;

        // Pawn promotion
        if (newBoard[row][col]?.type === 'pawn' && row === 0) {
          newBoard[row][col] = { type: 'queen', color: 'white' };
        }

        if (captured) {
          setCapturedBlack(prev => [...prev, captured.type]);
        }

        setBoard(newBoard);
        setSelectedSquare(null);
        setValidMoves([]);
        setLastMove({ from: selectedSquare, to: [row, col] });
        setCurrentTurn('black');
        setMoveCount(c => c + 1);

        // Check game state then AI moves
        if (!isGameOver) {
          checkGameState(newBoard, 'black');
          setTimeout(() => makeAIMove(newBoard), 300);
        }
        return;
      }

      // Deselect or select another piece
      if (piece && piece.color === 'white') {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      if (piece && piece.color === 'white') {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      }
    }
  }, [board, selectedSquare, validMoves, currentTurn, isGameOver, isThinking, checkGameState, makeAIMove]);

  const resetGame = useCallback(() => {
    setBoard(createInitialBoard());
    setSelectedSquare(null);
    setValidMoves([]);
    setCurrentTurn('white');
    setIsGameOver(false);
    setGameResult('');
    setIsThinking(false);
    isThinkingRef.current = false;
    setCapturedWhite([]);
    setCapturedBlack([]);
    setLastMove(null);
    setMoveCount(0);
  }, []);

  const inCheck = isKingInCheck(board, currentTurn);
  const CELL_SIZE = 52;

  return (
    <div className="h-full flex flex-col items-center justify-center" style={{ background: 'rgba(8,8,14,0.98)' }}>
      <div className="flex flex-col items-center gap-3">
        {/* Header */}
        <div className="flex items-center gap-4">
          <h1
            className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            CYBER CHESS
          </h1>
          <span className="text-zinc-600 font-mono text-xs">Moves: {moveCount}</span>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-3 text-xs font-mono">
          {isThinking ? (
            <motion.span
              className="text-purple-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ⚙ AI COMPUTING...
            </motion.span>
          ) : isGameOver ? (
            <span className="text-yellow-400">{gameResult}</span>
          ) : (
            <>
              <span className={currentTurn === 'white' ? 'text-white' : 'text-zinc-500'}>
                {currentTurn === 'white' ? '▶ ' : ''}White
              </span>
              <span className="text-zinc-700">|</span>
              <span className={currentTurn === 'black' ? 'text-zinc-300' : 'text-zinc-500'}>
                {currentTurn === 'black' ? '▶ ' : ''}Black (AI)
              </span>
              {inCheck && (
                <span className="text-red-400 animate-pulse ml-2">⚠ CHECK</span>
              )}
            </>
          )}
        </div>

        {/* Captured pieces (Black's captures = white pieces lost) */}
        <div className="flex items-center gap-1 h-5">
          <span className="text-zinc-600 text-[10px] font-mono mr-1">AI:</span>
          {capturedWhite.map((p, i) => (
            <span key={i} className="text-sm opacity-50">{PIECE_SYMBOLS.white[p]}</span>
          ))}
        </div>

        {/* Board */}
        <div
          className="relative"
          style={{
            width: 8 * CELL_SIZE + 2,
            height: 8 * CELL_SIZE + 2,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '4px',
            boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 80px rgba(191,0,255,0.05)',
          }}
        >
          {board.map((row, r) =>
            row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0;
              const isSelected = selectedSquare?.[0] === r && selectedSquare?.[1] === c;
              const isValidMove = validMoves.some(([mr, mc]) => mr === r && mc === c);
              const isLastMoveSquare = lastMove && (
                (lastMove.from[0] === r && lastMove.from[1] === c) ||
                (lastMove.to[0] === r && lastMove.to[1] === c)
              );
              const isCapture = isValidMove && piece !== null;

              let bg = isLight ? 'rgba(180,140,100,0.4)' : 'rgba(90,60,40,0.6)';
              if (isSelected) bg = 'rgba(0,212,255,0.35)';
              else if (isLastMoveSquare) bg = isLight ? 'rgba(191,0,255,0.15)' : 'rgba(191,0,255,0.25)';

              return (
                <div
                  key={`${r}-${c}`}
                  className="absolute cursor-pointer transition-colors duration-150 flex items-center justify-center"
                  style={{
                    left: c * CELL_SIZE,
                    top: r * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    background: bg,
                  }}
                  onClick={() => handleSquareClick(r, c)}
                >
                  {/* Valid move indicator */}
                  {isValidMove && !isCapture && (
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 14,
                        height: 14,
                        background: 'rgba(0,212,255,0.4)',
                        boxShadow: '0 0 8px rgba(0,212,255,0.3)',
                      }}
                    />
                  )}
                  {isCapture && (
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: CELL_SIZE - 6,
                        height: CELL_SIZE - 6,
                        border: '3px solid rgba(255,0,64,0.5)',
                        boxShadow: '0 0 8px rgba(255,0,64,0.3)',
                      }}
                    />
                  )}

                  {/* Piece */}
                  {piece && (
                    <span
                      className="relative z-10 select-none transition-transform duration-100"
                      style={{
                        fontSize: CELL_SIZE * 0.65,
                        filter: piece.color === 'white'
                          ? 'drop-shadow(0 0 4px rgba(255,255,255,0.3))'
                          : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      {PIECE_SYMBOLS[piece.color][piece.type]}
                    </span>
                  )}

                  {/* Rank/File labels */}
                  {c === 0 && (
                    <span className="absolute top-0.5 left-1 text-[8px] font-mono text-zinc-600 select-none">
                      {8 - r}
                    </span>
                  )}
                  {r === 7 && (
                    <span className="absolute bottom-0 right-1 text-[8px] font-mono text-zinc-600 select-none">
                      {String.fromCharCode(97 + c)}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Captured pieces (White's captures = black pieces captured) */}
        <div className="flex items-center gap-1 h-5">
          <span className="text-zinc-600 text-[10px] font-mono mr-1">YOU:</span>
          {capturedBlack.map((p, i) => (
            <span key={i} className="text-sm opacity-60">{PIECE_SYMBOLS.black[p]}</span>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={resetGame}
            className="px-5 py-2 rounded-lg font-bold tracking-wider text-xs transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(45deg, rgba(191,0,255,0.2), rgba(0,212,255,0.2))',
              border: '1px solid rgba(191,0,255,0.3)',
              color: '#e0e0e0',
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            NEW GAME
          </button>
        </div>
      </div>
    </div>
  );
}
