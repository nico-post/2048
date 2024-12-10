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

function updateValues(){
    for(let row = 0; row<4; row++){
       for(let col = 0; col<4; col++)
        gridValues = gridElements[row][col]
       }
}




console.log(gridElements)
// nico and adam code



