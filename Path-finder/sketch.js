const WIDTH = 400;
const HEIGHT = 500;
const CELL_SIZE = 20;

let grid = [];
let startMarked = false;
let endMarked = false;

function setup() {
  createCanvas(WIDTH, WIDTH);
  frameRate(20);
  makeGrid();
}

function draw() {
  background(0);
  grid.forEach((cell) => cell.draw());
}

function makeGrid() {
  const totalRow = ceil(HEIGHT / CELL_SIZE);
  const totalCol = ceil(WIDTH / CELL_SIZE);
  for (let i = 0; i < totalRow; i++) {
    for (let j = 0; j < totalCol; j++) {
      const newCell = new Cell({ row: i, col: j, size: CELL_SIZE });
      grid.push(newCell);
    }
  }
}

function mousePressed() {
  if (!startMarked) {
    startMarked = true;
    editGrid('start');
    return;
  }
  if (!endMarked) {
    endMarked = true;
    editGrid('end');
    return;
  }
  editGrid();
}

function mouseDragged() {
  editGrid();
}

function editGrid(state = 'block') {
  const x = floor(mouseX / CELL_SIZE);
  const y = floor(mouseY / CELL_SIZE);
  grid.forEach((cell) => {
    if (cell.row === y && cell.col === x) {
      switch (state) {
        case 'block':
          cell.makeBlock();
          break;
        case 'start':
          cell.makeStart();
          break;
        case 'end':
          cell.makeEnd();
          break;
      }
    }
  });
}
