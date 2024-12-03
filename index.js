const gameBoard = document.getElementById("game-board");
const boardSize = 4;
let board = [];

// Initialize the board
function initBoard() {
    board = Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => 0)
    );
    spawnTile();
    spawnTile();
    renderBoard();
}

// Spawn a new tile
function spawnTile() {
    let emptyCells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) emptyCells.push({ row, col });
        }
    }
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Render the board
function renderBoard() {
    gameBoard.innerHTML = "";
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            if (board[row][col] !== 0) {
                tile.textContent = board[row][col];
                tile.setAttribute("data-value", board[row][col]);
            }
            gameBoard.appendChild(tile);
        }
    }
}

// Move tiles in the specified direction
function move(direction) {
    let moved = false;
    if (direction === "up" || direction === "down") {
        for (let col = 0; col < boardSize; col++) {
            let column = board.map(row => row[col]);
            if (direction === "down") column.reverse();
            const newColumn = mergeTiles(column);
            if (direction === "down") newColumn.reverse();
            for (let row = 0; row < boardSize; row++) {
                if (board[row][col] !== newColumn[row]) moved = true;
                board[row][col] = newColumn[row];
            }
        }
    } else if (direction === "left" || direction === "right") {
        for (let row = 0; row < boardSize; row++) {
            let line = [...board[row]];
            if (direction === "right") line.reverse();
            const newLine = mergeTiles(line);
            if (direction === "right") newLine.reverse();
            if (board[row].toString() !== newLine.toString()) moved = true;
            board[row] = newLine;
        }
    }
    if (moved) {
        spawnTile();
        renderBoard();
        if (checkGameOver()) alert("Game Over!");
    }
}

// Merge tiles
function mergeTiles(line) {
    let result = line.filter(val => val !== 0);
    for (let i = 0; i < result.length - 1; i++) {
        if (result[i] === result[i + 1]) {
            result[i] *= 2;
            result[i + 1] = 0;
        }
    }
    return result.filter(val => val !== 0).concat(Array(boardSize).fill(0)).slice(0, boardSize);
}

// Check if the game is over
function checkGameOver() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) return false;
            if (col < boardSize - 1 && board[row][col] === board[row][col + 1]) return false;
            if (row < boardSize - 1 && board[row][col] === board[row + 1][col]) return false;
        }
    }
    return true;
}

// Handle key presses
document.addEventListener("keydown", e => {
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

// Start the game
initBoard();
