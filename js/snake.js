'use strict';

import { aStarSearch } from './a-star-search.js';
import Helpers from './helpers.js';
import { createGrid } from './initialize-game-space.js';

const context = document.getElementById('canvas').getContext('2d');
const canvasSize = 800;
const size = 25;

const block = Math.floor(canvasSize / size);
console.log(block);

console.log(block);
let isGameOver = false;

const grid = createGrid(size);

let food = Helpers.generateRandomFoodPosition(size);

let startBlock = {
  x: Math.floor(size / 2),
  y: Math.floor(size / 2),
};

const snake = [];
snake.push(grid[startBlock.y][startBlock.x]);
grid[startBlock.y][startBlock.x].block = true;

function display() {
  if (!isGameOver) {
    for (let x = 0; x < size; ++x) {
      for (let y = 0; y < size; ++y) {
        if (y === food.y && x === food.x) {
          context.fillStyle = 'white';
        } else if (grid[y][x].block) {
          context.fillStyle = 'green';
        } else {
          context.strokeStyle = 'black';
          context.fillStyle = 'black';
        }
        context.fillRect(block * x, block * y, block, block);
      }
    }
  }
}

function getNextMove(food) {
  let lowestFScore = -1;
  let lowestFScoreNode = null;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (!Helpers.isSnakeInLimits(snake[0], i, j, grid)) {
        continue;
      }

      const neighbour = grid[snake[0].y + i][snake[0].x + j];

      const pathScore =
        neighbour.gScore +
        Helpers.calculateHeuristic(neighbour, food) +
        Helpers.pathLength(grid, size, neighbour) +
        1;

      if (pathScore > lowestFScore) {
        lowestFScore = pathScore;
        lowestFScoreNode = neighbour;
      }
    }
  }

  return lowestFScoreNode;
}

function update() {
  let tail;

  if (!isGameOver) {
    const path = aStarSearch(startBlock, food, grid, size);

    for (let j = 0; j < path.length - 1; j++) {
      path[j].parent = null;
      path[j].gScore = -1;
      path[j].fScore = -1;
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        grid[i][j].parent = null;
        grid[i][j].gScore = -1;
        grid[i][j].fScore = -1;
      }
    }

    let nextLocation = null;
    if (path) {
      nextLocation = path[path.length - 2];
    } else {
      let nextNode = getNextMove(food);
      if (nextNode == null) {
        isGameOver = true;
        alert('Game over');
        return;
      } else {
        nextLocation = nextNode;
      }
    }

    snake.unshift(nextLocation);
    nextLocation.block = true;
    startBlock = nextLocation;

    if (!Helpers.areNodesEqual(nextLocation, food)) {
      tail = snake.pop();
      tail.block = false;
      tail.gScore = -1;
      tail.fScore = -1;
    } else {
      do {
        food = Helpers.generateRandomFoodPosition(size);
      } while (grid[food.y][food.x].block === true);
    }
  }
}

function start() {
  display();
  setInterval(update, 50);
  setInterval(display, 50);
}

start();
