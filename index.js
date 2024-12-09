const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");

const size = 4;
let grid = [];
let score = 0;

// Initialize the grid
function initializeGrid() {
  grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  spawnNewTile();
  spawnNewTile();

  updateBoard();
}

// Spawn a new tile (2 or 4)
function spawnNewTile() {
  let emptyCells = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) emptyCells.push({ row, col });
    }
  }
  if (emptyCells.length === 0) return;

  const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[row][col] = Math.random() < 0.9 ? 2 : 4;
}

// Update the board
function updateBoard() {
  board.innerHTML = "";
  grid.forEach((row) => {
    row.forEach((value) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (value !== 0) {
        cell.textContent = value;
        cell.setAttribute("data-value", value);
      }
      board.appendChild(cell);
    });
  });

  scoreDisplay.textContent = `Score: ${score}`;
}

// Handle moves
function slide(row) {
  let newRow = row.filter((value) => value !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = 0;
    }
  }
  newRow = newRow.filter((value) => value !== 0);
  while (newRow.length < size) newRow.push(0);
  return newRow;
}

function move(direction) {
  let rotated = false;
  if (direction === "up" || direction === "down") {
    grid = rotateGrid(grid);
    rotated = true;
  }
  if (direction === "down" || direction === "right") {
    grid = grid.map((row) => row.reverse());
  }

  let moved = false;
  grid = grid.map((row) => {
    const newRow = slide(row);
    if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
    return newRow;
  });

  if (direction === "down" || direction === "right") {
    grid = grid.map((row) => row.reverse());
  }
  if (rotated) {
    grid = rotateGrid(grid, true);
  }

  if (moved) {
    spawnNewTile();
    updateBoard();
    if (isGameOver()) {
      alert("Game Over!");
    }
  }
}

// Rotate the grid for vertical moves
function rotateGrid(grid, counterclockwise = false) {
  const newGrid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (counterclockwise) {
        newGrid[row][col] = grid[col][size - 1 - row];
      } else {
        newGrid[row][col] = grid[size - 1 - col][row];
      }
    }
  }
  return newGrid;
}

// Check if the game is over
function isGameOver() {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) return false;
      if (
        (col < size - 1 && grid[row][col] === grid[row][col + 1]) ||
        (row < size - 1 && grid[row][col] === grid[row + 1][col])
      )
        return false;
    }
  }
  return true;
}

// Handle key presses
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      move("up");
      break;
    case "ArrowDown":
      move("down");
      break;
    case "ArrowLeft":
      move("left");
      break;
    case "ArrowRight":
      move("right");
      break;
  }
});

// Restart the game
restartButton.addEventListener("click", initializeGrid);

// Start the game
initializeGrid();
