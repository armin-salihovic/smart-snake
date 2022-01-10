function Node(x, y) {
  this.block = false;
  this.x = x;
  this.y = y;
  this.parent = null;
  this.gScore = -1;
  this.fScore = -1;
}

export function createGrid(size) {
  const grid = new Array(size);
  for (let i = 0; i < size; i++) {
    grid[i] = new Array(size);
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] !== '-') {
        grid[i][j] = new Node(j, i);
      }
    }
  }

  return grid;
}
