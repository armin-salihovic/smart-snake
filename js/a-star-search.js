import Helpers from './helpers.js';

export function aStarSearch(start, food, grid, size) {
  const closedSet = [];

  const openSet = [];

  openSet.push(grid[start.y][start.x]);
  grid[start.y][start.x].gScore = 0;
  grid[start.y][start.x].fScore = Helpers.calculateHeuristic(start, food);

  while (openSet.length > 0) {
    openSet.sort(fScoreSort);
    const currentNode = openSet[0];

    if (Helpers.areNodesEqual(currentNode, food)) {
      return reconstructPath(grid, currentNode);
    }

    const index = openSet.indexOf(currentNode);
    openSet.splice(index, 1);

    closedSet.push(currentNode);

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!Helpers.isSnakeInLimits(currentNode, i, j, grid, size)) {
          continue;
        }

        const neighbour = grid[currentNode.y + i][currentNode.x + j];

        if (closedSet.indexOf(neighbour) !== -1) {
          continue;
        }

        const tScore = neighbour.gScore + 1;

        if (openSet.indexOf(neighbour) === -1) {
          openSet.push(neighbour);
        }

        neighbour.parent = currentNode;
        neighbour.gScore = tScore;
        neighbour.fScore =
          neighbour.gScore + Helpers.calculateHeuristic(neighbour, food);
      }
    }
  }

  return false;
}

function reconstructPath(grid_aStar, current) {
  let currentNode = current;
  const totalPath = [current];

  while (currentNode.parent != null) {
    totalPath.push(currentNode.parent);
    currentNode = currentNode.parent;
  }

  return totalPath;
}

function fScoreSort(a, b) {
  if (a.fScore < b.fScore) return -1;
  if (a.fScore > b.fScore) return 1;
  return 0;
}
