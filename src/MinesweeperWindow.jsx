import React, { useEffect, useState, useRef, useCallback } from 'react';

// --- MINESWEEPER LOGIC (Unchanged Core Functions) ---

const coordsToIndex = (r, c, cols) => r * cols + c;
const indexToCoords = (i, cols) => [Math.floor(i / cols), i % cols];

function generateEmptyBoard(rows, cols) {
  return Array.from({ length: rows * cols }, () => ({
    mine: false,
    revealed: false,
    flagged: false,
    adjacent: 0,
  }));
}

function placeMines(board, rows, cols, mines, safeIndex) {
  const size = rows * cols;
  const allowed = Array.from({ length: size }, (_, i) => i).filter(i => i !== safeIndex);
  for (let i = allowed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allowed[i], allowed[j]] = [allowed[j], allowed[i]];
  }
  const chosen = new Set(allowed.slice(0, mines));
  const newBoard = board.slice();
  chosen.forEach(i => { newBoard[i] = { ...newBoard[i], mine: true }; });

  const dirs = [-1, 1, -cols, cols, -cols - 1, -cols + 1, cols - 1, cols + 1];
  for (let i = 0; i < size; i++) {
    if (newBoard[i].mine) continue;
    const [r, c] = indexToCoords(i, cols);
    let count = 0;
    for (const d of dirs) {
      const ni = i + d;
      const [nr, nc] = indexToCoords(ni, cols);
      if (ni < 0 || ni >= size) continue;
      if (Math.abs(c - nc) > 1 || Math.abs(r - nr) > 1) continue;
      if (newBoard[ni].mine) count++;
    }
    newBoard[i] = { ...newBoard[i], adjacent: count };
  }

  return newBoard;
}

function floodReveal(board, rows, cols, startIndex) {
  const newBoard = board.slice();
  const q = [startIndex];
  const dirs = [-1, 1, -cols, cols, -cols - 1, -cols + 1, cols - 1, cols + 1];

  while (q.length) {
    const i = q.shift();
    const cell = newBoard[i];
    if (cell.revealed) continue;
    
    newBoard[i] = { ...cell, revealed: true };
    
    if (cell.adjacent === 0 && !cell.mine) {
      const [r, c] = indexToCoords(i, cols);
      for (const d of dirs) {
        const ni = i + d;
        const [nr, nc] = indexToCoords(ni, cols);
        
        if (ni < 0 || ni >= rows * cols) continue;
        if (Math.abs(c - nc) > 1 || Math.abs(r - nr) > 1) continue;
        
        const neighbor = newBoard[ni];
        if (!neighbor.revealed && !neighbor.flagged) {
          q.push(ni);
        }
      }
    }
  }
  return newBoard;
}

const defaultPresets = {
  Beginner: { rows: 9, cols: 9, mines: 10 },
};

// Map number to Windows 98 Minesweeper colors
const ADJACENT_COLORS = {
  1: '#0000FF', 
  2: '#008200',
  3: '#FF0000',
  4: '#000084', 
  5: '#840000', 
  6: '#008284', 
  7: '#000000', 
  8: '#808080', 
};

export default function MinesweeperWindow({ onClose, onMinimize, onMaximize }) {
  
  const initialRows = defaultPresets.Beginner.rows;
  const initialCols = defaultPresets.Beginner.cols;
  const initialMines = defaultPresets.Beginner.mines;
  
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  const [mines, setMines] = useState(initialMines);

  // game state
  const [board, setBoard] = useState(() => generateEmptyBoard(initialRows, initialCols));
  const [started, setStarted] = useState(false);
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(initialMines);

  // UI state
  const [smiley, setSmiley] = useState('🙂');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  // reset / initialize new game
  const resetGame = useCallback(() => {
    setRows(initialRows);
    setCols(initialCols);
    setMines(initialMines);
    setBoard(generateEmptyBoard(initialRows, initialCols));
    setStarted(false);
    setLost(false);
    setWon(false);
    setFlagsLeft(initialMines);
    setSmiley('🙂');
    setElapsed(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // start timer when game starts
  useEffect(() => {
    if (started && !lost && !won) {
      timerRef.current = setInterval(() => setElapsed(e => Math.min(e + 1, 999)), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, lost, won]);

  // check win condition
  useEffect(() => {
    if (!started || lost || won) return;
    const nonMinesRevealed = board.every(cell => (cell.revealed || cell.mine));
    
    if (nonMinesRevealed) {
      setWon(true);
      setSmiley('😎');
      if (timerRef.current) clearInterval(timerRef.current);
      const revealedBoard = board.map(cell => ({ 
        ...cell, 
        flagged: cell.mine ? true : cell.flagged 
      }));
      setBoard(revealedBoard);
      setFlagsLeft(0);
    }
  }, [board, started, lost, won]);

  // Handle reveal 
  function handleReveal(i) {
    if (lost || won) return;
    
    if (!started) {
      const empty = generateEmptyBoard(rows, cols);
      const placed = placeMines(empty, rows, cols, mines, i);
      
      const finalBoard = placed[i].adjacent === 0 
        ? floodReveal(placed, rows, cols, i) 
        : placed.map((cell, idx) => idx === i ? { ...cell, revealed: true } : cell);

      setBoard(finalBoard);
      setStarted(true);
      return;
    }

    const cell = board[i];
    if (cell.revealed || cell.flagged) return;
    
    if (cell.mine) {
      const revealedBoard = board.map((c, idx) => {
        if (idx === i) return { ...c, revealed: true };
        if (c.mine) return { ...c, revealed: true };
        return c;
      });
      setBoard(revealedBoard);
      setLost(true);
      setSmiley('😵');
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    let newBoard = board.slice();
    if (cell.adjacent === 0) {
      newBoard = floodReveal(newBoard, rows, cols, i);
    } else {
      newBoard[i] = { ...newBoard[i], revealed: true };
    }
    setBoard(newBoard);
  }

  // Right-click to toggle flag 
  function handleFlag(e, i) {
    e.preventDefault();
    // ⬅️ FIX: Stop event from bubbling up to the desktop context menu handler
    e.stopPropagation(); 
    
    if (lost || won || !started) return;

    const newBoard = board.slice();
    const cell = newBoard[i];
    if (cell.revealed) return;

    if (cell.flagged) {
      newBoard[i] = { ...cell, flagged: false };
      setFlagsLeft(f => f + 1);
    } else {
      if (flagsLeft <= 0) return;
      newBoard[i] = { ...cell, flagged: true };
      setFlagsLeft(f => f - 1);
    }
    setBoard(newBoard);
  }

  // Chord reveal 
  function chordReveal(i) {
    if (lost || won) return;
    const cell = board[i];
    if (!cell.revealed || cell.adjacent === 0) return;

    const [r, c] = indexToCoords(i, cols);
    const dirs = [-1, 1, -cols, cols, -cols - 1, -cols + 1, cols - 1, cols + 1];
    let flagCount = 0;
    const neighbors = [];

    for (const d of dirs) {
      const ni = i + d;
      const [nr, nc] = indexToCoords(ni, cols);
      if (ni < 0 || ni >= rows * cols) continue;
      if (Math.abs(c - nc) > 1 || Math.abs(r - nr) > 1) continue;
      
      neighbors.push(ni);
      if (board[ni].flagged) flagCount++;
    }

    if (flagCount !== cell.adjacent) return;

    let newBoard = board.slice();
    let hasLost = false;

    for (const ni of neighbors) {
      const ncell = newBoard[ni];
      if (ncell.flagged || ncell.revealed) continue;

      if (ncell.mine) {
        hasLost = true;
        break; 
      }
      
      if (ncell.adjacent === 0) {
        newBoard = floodReveal(newBoard, rows, cols, ni);
      } else {
        newBoard[ni] = { ...ncell, revealed: true };
      }
    }

    if (hasLost) {
        newBoard = board.map((c, idx) => ({ 
            ...c, 
            revealed: c.revealed || c.mine || (idx === i ? true : false)
        }));
        setBoard(newBoard);
        setLost(true);
        setSmiley('😵');
        if (timerRef.current) clearInterval(timerRef.current);
    } else {
        setBoard(newBoard);
    }
  }


  // UI: render a cell
  function Cell({ cell, index }) {
    
    // Style for unrevealed cells (button look)
    const buttonStyle = {
      width: '24px', 
      height: '24px', 
      margin: '1px', 
      cursor: 'pointer',
      boxSizing: 'content-box',
      // ⬅️ FIX: Add border for grid visibility and authentic 98.css look
      border: '1px solid #c0c0c0', 
      borderTopColor: '#ffffff', 
      borderLeftColor: '#ffffff',
      background: 'silver',
    };

    // Style for revealed cells (sunken look)
    const revealedStyle = {
      width: '26px', 
      height: '26px', 
      margin: '0', 
      border: '1px solid #7f7f7f',
      background: '#c0c0c0',
      color: ADJACENT_COLORS[cell.adjacent] || 'black',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '26px',
      textAlign: 'center',
    };
    
    const isErrorMine = cell.mine && lost && cell.revealed;
    
    const onLeftClick = (e) => {
      e.preventDefault();
      if (cell.revealed && cell.adjacent > 0) {
        chordReveal(index);
      } else {
        handleReveal(index);
      }
    };

    return (
      <div
        onClick={onLeftClick}
        // ⬅️ The onContextMenu handler is here and calls handleFlag, which now stops propagation
        onContextMenu={(e) => handleFlag(e, index)}
        onMouseDown={(e) => { 
            if (e.button === 1) { 
                e.preventDefault();
                // ⬅️ Stop propagation on middle click as well
                e.stopPropagation();
                chordReveal(index); 
            }
        }}
        role="button"
        aria-label={`cell-${index}`}
        className={!cell.revealed ? 'button' : ''}
        style={cell.revealed ? { 
            ...revealedStyle,
            background: isErrorMine ? 'red' : revealedStyle.background
        } : buttonStyle}
      >
        {cell.revealed ? (
          cell.mine ? (isErrorMine ? '💥' : '💣') : (cell.adjacent > 0 ? cell.adjacent : '')
        ) : (
          cell.flagged ? '🚩' : ''
        )}
      </div>
    );
  }

  // Calculate window size dynamically based on fixed Beginner size (9x9 grid)
  const fixedWidth = initialCols * 28 + 36; 

  return (
    <div className="window" style={{ width: `${fixedWidth}px`, height: 'fit-content' }}>
        
        {/* Title bar */}
        <div className="title-bar">
            <div className="title-bar-text">Minesweeper</div>
            <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={onMinimize}></button> 
                <button aria-label="Maximize" onClick={onMaximize}></button> 
                <button aria-label="Close" onClick={onClose}></button>
            </div>
        </div>

        {/* Window body */}
        <div className="window-body" style={{ padding: 6 }}>
            
            {/* Menu Bar */}
            <div className="menu-bar">
                <ul className="menu">
                    <li onClick={() => resetGame()}>Game</li>
                    <li>Help</li>
                </ul>
            </div>

            {/* Top Stats - Mines Left, Reset, Timer */}
            <div className="window" style={{ padding: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Mine Counter */}
                <div className="status-bar" style={{ padding: '2px 4px', fontSize: '18px', background: 'black', color: 'red', lineHeight: '20px' }}>
                    {String(flagsLeft).padStart(3, '0')}
                </div>

                {/* Smiley/Game Status Icon */}
                <button
                    onClick={() => resetGame()}
                    className="button"
                    style={{ width: '30px', height: '30px', margin: 0, fontSize: '18px', lineHeight: '28px' }}
                    title="New Game"
                >
                    {smiley}
                </button>

                {/* Timer */}
                <div className="status-bar" style={{ padding: '2px 4px', fontSize: '18px', background: 'black', color: 'red', lineHeight: '20px' }}>
                    {String(elapsed).padStart(3, '0')}
                </div>
            </div>
            
            {/* Board */}
            <div 
                style={{ 
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    border: '3px solid #7f7f7f',
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                }}
                // This handler is now redundant but kept as a fallback for the entire grid area
                onContextMenu={(e) => e.preventDefault()} 
            >
                {board.map((cell, i) => (
                    <Cell key={i} cell={cell} index={i} />
                ))}
            </div>

            {/* Footer / status */}
            <div className="status-bar" style={{ marginTop: '8px', padding: '4px' }}>
                {!started && <div className="status-bar-field">Click any cell to start.</div>}
                {lost && <div className="status-bar-field" style={{ color: 'red', fontWeight: 'bold' }}>Game Over! Click the smiley to reset.</div>}
                {won && <div className="status-bar-field" style={{ color: 'green', fontWeight: 'bold' }}>You Win! Time: {elapsed}s</div>}
                {(started && !lost && !won) && <div className="status-bar-field">Game in progress...</div>}
            </div>
        </div>
    </div>
  );
}