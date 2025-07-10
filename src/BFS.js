export function findShortestPath(grid, start, exit) {
  const [rows, cols] = [grid.length, grid[0].length];
  const queue = [[start, [start]]];
  const seen = new Set([start.toString()]);
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  while (queue.length) {
    const [[r,c], path] = queue.shift();
    if (r === exit[0] && c === exit[1]) return path;
    for (let [dr,dc] of dirs) {
      const nr = r+dr, nc = c+dc;
      if (
        nr>=0 && nr<rows && nc>=0 && nc<cols &&
        !grid[nr][nc].blocked &&
        !seen.has([nr,nc].toString())
      ) {
        seen.add([nr,nc].toString());
        queue.push([[nr,nc], path.concat([[nr,nc]])]);
      }
    }
  }
  return null;
}
