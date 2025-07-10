import React, { useState, useEffect } from 'react';
import { findShortestPath } from './BFS';

const ROWS = 10, COLS = 10;

export default function GameGrid() {
  const createGrid = () => {
    const g = Array.from({length: ROWS}, () =>
      Array.from({length: COLS}, () => ({ blocked: false, visited: false }))
    );
    // Randomly set obstacles
    for (let i = 0; i < 20; i++) {
      const r = Math.floor(Math.random()*ROWS);
      const c = Math.floor(Math.random()*COLS);
      if ((r === 0 && c === 0) || (r === ROWS-1 && c === COLS-1)) continue;
      g[r][c].blocked = true;
    }
    return g;
  };

  const [grid, setGrid] = useState(createGrid());
  const [current, setCurrent] = useState([0,0]);
  const [steps, setSteps] = useState(0);
  const [best, setBest] = useState(null);

  const handleClick = (r,c) => {
    const [cr,cc] = current;
    const dr = Math.abs(cr-r), dc = Math.abs(cc-c);
    if ((dr+dc)===1 && !grid[r][c].blocked && !grid[r][c].visited) {
      const newGrid = grid.map(row => row.map(cell => ({...cell})));
      newGrid[r][c].visited = true;
      setGrid(newGrid);
      setCurrent([r,c]);
      setSteps(s => s+1);
    }
  };

  useEffect(() => {
    const [er,ec] = [ROWS-1, COLS-1];
    if (current[0]===er && current[1]===ec) {
      const path = findShortestPath(grid, [0,0], [er,ec]);
      if (path) {
        const sp = path.length - 1;
        if (best === null || sp < best) setBest(sp);
        alert(`You reached the exit in ${steps} steps.\nThe shortest path is ${sp} steps.` +
              (best===null || sp<best? "\n🎉 New record set!":""));
      }
    }
  }, [current]);

  return (
    <div>
      <div>Current Steps: {steps}</div>
      <div>Best Shortest Path: {best ?? '-'}</div>
      <div className="grid">
        {grid.map((row,r) =>
          row.map((cell,c) => {
            const cls = [
              'cell',
              cell.blocked ? 'blocked' : '',
              cell.visited ? 'visited' : '',
              r===0&&c===0 ? 'start' : '',
              r===ROWS-1&&c===COLS-1 ? 'exit' : ''
            ].join(' ');
            return (
              <div key={`${r}-${c}`} className={cls}
                   onClick={() => handleClick(r,c)}>
                {r===0&&c===0? 'S': (r===ROWS-1&&c===COLS-1? 'E':'')}
              </div>
            );
          })
        )}
      </div>
      <button onClick={()=>{
        setGrid(createGrid());
        setCurrent([0,0]);
        setSteps(0);
      }}>Restart Game</button>
    </div>
  );
}
