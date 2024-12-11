// nico block of code
let gridValues = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
]
let gridElements = []
let grid = document.getElementById("grid")
let i = 0
for(let row = 0; row < 4; row++){
    gridElements.push([])
    for (let col = 0; col < 4; col++){
        gridElements[row][col] = grid.children[i]
        i++
    }
}
function updateValues() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            gridElements[row][col].textContent = gridValues[row][col] === 0 ? '' : gridValues[row][col];
        }
    }
}
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
        let { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        gridValues[row][col] = Math.random() < 0.9 ? 2 : 4;
        updateValues();
    }
}
generateRandomTile();
generateRandomTile();

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        moveUp();
    } else if (e.key === 'ArrowDown') {
        moveDown();
    } else if (e.key === 'ArrowLeft') {
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        moveRight();
    }
    generateRandomTile();
});
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = gridValues[row].filter(val => val !== 0); // Remove zeros
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
            }
        }
        newRow = newRow.filter(val => val !== 0); // Remove zeros again
        while (newRow.length < 4) newRow.push(0); // Add zeros to the end
        gridValues[row] = newRow;
    }
    updateValues();
}
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






console.log(gridElements)
// nico and adam code



