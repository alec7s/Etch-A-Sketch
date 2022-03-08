let gridSize = 16;
let cellSize = 25;

function setCellSize () {
    return +((400 / gridSize).toFixed(2));
}

function createCell (parent) {
    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.addEventListener('mouseover', e => e.target.classList.add('red-cell'));
    //TODO: CELL SIZE IS NOT RECALCULCATING WHEN NEW GRID IS CREATED
    newCell.setAttribute('style', `height: ${cellSize}px; width: ${cellSize}px;`);

    parent.appendChild(newCell);
}

function createRow (parent, numCells) {
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    
    for (let i = 0; i < numCells; i++) {
        createCell(newRow);
    }
    parent.appendChild(newRow);
}

function createGrid (parent, numRows) {
    const gridContainer = document.createElement('div');
    gridContainer.setAttribute('id', 'grid-container');
    
    for (let i = 0; i < numRows; i++) {
        createRow(gridContainer, numRows);
    }

    parent.appendChild(gridContainer);
    console.log(`cell size = ${cellSize}`);
}

function isInputValid (input) {
    //if input from gridSize prompt is NaN returns false, then convert from string to number.
    if (!isNaN(input)) {
        input = Number(input);
        //ensure that input is not negative or decimal
        if (input > 0 && Number.isInteger(input)) {
            return true;
        }
    }
    return false;
}

function clearGrid () {
    //clear grid:
    //create nodelist on all cells with red-cells class
    const redCells = document.querySelectorAll('.red-cell');
    //remove cell-filled class from all nodes
    for (let cell of redCells) {
        cell.classList.remove('red-cell');
    }
}

function updateGrid () {
    let input;
    do {
        input = prompt('Enter the size for the new grid: ');
        if (input === null) {
            return;
        }
    } while (!isInputValid(input));
    if (input > 100) input = 100;
    gridSize = input;
    
    cellSize = setCellSize();
    console.log(`new cell size: ${cellSize}`);

    clearGrid();
    const gridContainer = document.querySelector('#grid-container');
    gridContainer.remove();
    createGrid(body, gridSize);
}

//Add container for div grid
const body = document.body;

//Add a button to the top of the screen which will clear the current grid and send the user a popup asking for the number of squares per side for the new grid.
const btnContainer = document.createElement('div');
const newGridBtn = document.createElement('button');
newGridBtn.textContent = 'NEW GRID';
newGridBtn.addEventListener('click', updateGrid);
btnContainer.appendChild(newGridBtn);
body.appendChild(btnContainer);

//Create a webpage with a 16x16 grid of square divs.
createGrid(body, gridSize);
