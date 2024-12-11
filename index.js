// // nico block of code
// let gridValues = [
//     [0,1,2,3],
//     [4,5,6,7],
//     [8,9,10,11],
//     [12,13,14,15],
// ]
// let gridElements = []
// let grid = document.getElementById("grid")
// let i = 0
// for(let row = 0; row < 4; row++){
//     gridElements.push([])
//     for (let col = 0; col < 4; col++){
//         gridElements[row][col] = grid.children[i]
//         i++
//     }
// }
// function updateValues(){
//     for(let row = 0; row<4; row++){
//        for(let col = 0; col<4; col++){
//             gridElements[row][col].textContent = gridValues[row][col] === 0 
//         }
//     }
// }




// console.log(gridElements)
// // nico and adam code


// Initialize the game grid and values
let gridValues = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let gridElements = [];
let grid = document.getElementById("grid");

// Map grid DOM elements
let i = 0;
for (let row = 0; row < 4; row++) {
    gridElements.push([]);
    for (let col = 0; col < 4; col++) {
        gridElements[row][col] = grid.children[i];
        i++;
    }
}

// Function to update the grid display
function updateValues() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const value = gridValues[row][col];
            gridElements[row][col].textContent = value === 0 ? "" : value;
            gridElements[row][col].style.backgroundColor = getColor(value);
        }
    }
}

// Function to generate random tiles
function generateRandomTile() {
    let emptyTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (gridValues[row][col] === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }
    if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        gridValues[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Helper function to get tile color based on value
function getColor(value) {
    const colors = {
        0: "#eee",
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e",
    };
    return colors[value] || "#3c3a32";
}

// Move tiles to the left
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = gridValues[row].filter(val => val !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
            }
        }
        newRow = newRow.filter(val => val !== 0);
        while (newRow.length < 4) newRow.push(0);
        gridValues[row] = newRow;
    }
}

// Move tiles to the right
function moveRight() {
    for (let row = 0; row < 4; row++) {
        let newRow = gridValues[row].filter(val => val !== 0);
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                newRow[i - 1] = 0;
            }
        }
        newRow = newRow.filter(val => val !== 0);
        while (newRow.length < 4) newRow.unshift(0);
        gridValues[row] = newRow;
    }
}

// Move tiles up
function moveUp() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (gridValues[row][col] !== 0) newCol.push(gridValues[row][col]);
        }
        for (let i = 0; i < newCol.length - 1; i++) {
            if (newCol[i] === newCol[i + 1]) {
                newCol[i] *= 2;
                newCol[i + 1] = 0;
            }
        }
        newCol = newCol.filter(val => val !== 0);
        while (newCol.length < 4) newCol.push(0);
        for (let row = 0; row < 4; row++) {
            gridValues[row][col] = newCol[row] || 0;
        }
    }
}

// Move tiles down
function moveDown() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (gridValues[row][col] !== 0) newCol.push(gridValues[row][col]);
        }
        for (let i = newCol.length - 1; i > 0; i--) {
            if (newCol[i] === newCol[i - 1]) {
                newCol[i] *= 2;
                newCol[i - 1] = 0;
            }
        }
        newCol = newCol.filter(val => val !== 0);
        while (newCol.length < 4) newCol.unshift(0);
        for (let row = 0; row < 4; row++) {
            gridValues[row][col] = newCol[row] || 0;
        }
    }
}

// Check for game over
function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (gridValues[row][col] === 0) return false;
            if (col < 3 && gridValues[row][col] === gridValues[row][col + 1]) return false;
            if (row < 3 && gridValues[row][col] === gridValues[row + 1][col]) return false;
        }
    }
    return true;
}

// Listen for key presses
document.addEventListener("keydown", (e) => {
    let moved = false;
    if (e.key === "ArrowLeft") {
        moveLeft();
        moved = true;
    } else if (e.key === "ArrowRight") {
        moveRight();
        moved = true;
    } else if (e.key === "ArrowUp") {
        moveUp();
        moved = true;
    } else if (e.key === "ArrowDown") {
        moveDown();
        moved = true;
    }
    if (moved) {
        generateRandomTile();
        updateValues();
        if (checkGameOver()) {
            alert("Game Over!");
        }
    }
});

// Initialize the game
generateRandomTile();
generateRandomTile();
updateValues();

