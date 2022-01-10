export default {
  isSnakeInLimits(currentNode, i, j, grid, size = 25) {
    if (isOutOfBounds(currentNode, size, i, j)) {
      return false;
    }

    if (grid[currentNode.y + i][currentNode.x + j].block) {
      return false;
    }

    if (shouldSkipCurrentNode(currentNode, i, j)) {
      return false;
    }

    return true;
  },

  calculateHeuristic(snakePosition, food) {
    return Math.floor(
      Math.abs(food.x - snakePosition.x) + Math.abs(food.y - snakePosition.y)
    );
  },

  generateRandomFoodPosition(size) {
    return {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
  },

  areNodesEqual(node1, node2) {
    return node1.x === node2.x && node1.y === node2.y;
  },

  pathLength(grid, size, currentNode) {
    let currNode = currentNode;
    let numOfNodes = 0;

    const longestPathArray = [];

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!this.isSnakeInLimits(currNode, i, j, grid)) {
          continue;
        }

        currNode = grid[currNode.y + i][currNode.x + j];

        numOfNodes++;
        i = -1;
        j = -1;

        longestPathArray.push(currNode);

        if (checkIfAtLimit(currNode, grid, size)) {
          longestPathArray.forEach((node) => {
            node.block = false;
          });

          return numOfNodes;
        }
        currNode.block = true;
      }
    }
  },
};

function isOutOfBounds(currentNode, size, i, j) {
  return (
    currentNode.x + j < 0 ||
    currentNode.x + j > size - 1 ||
    currentNode.y + i < 0 ||
    currentNode.y + i > size - 1
  );
}

function shouldSkipCurrentNode(currentNode, i, j) {
  return (
    (currentNode.y + i === currentNode.y &&
      currentNode.x + j === currentNode.x) ||
    (i === -1 && j === -1) ||
    (i === -1 && j === 1) ||
    (i === 1 && j === -1) ||
    (i === 1 && j === 1)
  );
}

function checkIfAtLimit(currentNode, grid, size) {
  return (
    (!(currentNode.x + 1 >= 0 && currentNode.x + 1 < size) ||
      grid[currentNode.y][currentNode.x + 1] === undefined ||
      grid[currentNode.y][currentNode.x + 1].block) &&
    (!(currentNode.x - 1 >= 0 && currentNode.x - 1 < size) ||
      grid[currentNode.y][currentNode.x - 1] === undefined ||
      grid[currentNode.y][currentNode.x - 1].block) &&
    (!(currentNode.y + 1 >= 0 && currentNode.y + 1 < size) ||
      grid[currentNode.y + 1][currentNode.x] === undefined ||
      grid[currentNode.y + 1][currentNode.x].block) &&
    (!(currentNode.y - 1 >= 0 && currentNode.y - 1 < size) ||
      grid[currentNode.y - 1][currentNode.x] === undefined ||
      grid[currentNode.y - 1][currentNode.x].block)
  );
}
