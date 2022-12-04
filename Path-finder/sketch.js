const WIDTH = 400;
const GRID = 20;
const CELL_SIZE = WIDTH / GRID;

let map;
let astar;
let searching = false;

function setup() {
  createCanvas(WIDTH, WIDTH);
  frameRate(20);
  map = new Map({ gridSize: GRID, cellSize: CELL_SIZE });
  astar = new Astar();
}

function draw() {
  background(color(76, 175, 80));
  map.draw();
  if (!searching) return;
  astar.search();
  astar.drawSearch();
  astar.drawPath();
}

function keyPressed() {
  if (key === 'Enter') {
    if (map.startPoint && map.targetPoint) {
      map.updateCells();
      // start algorithm
      astar.init(map.startPoint, map.targetPoint);
      searching = true;
    }
  }
}

function mousePressed() {
  if (!map.startPoint) {
    const [row, col] = getRowColFromMouse();
    map.startPoint = map.grid[row][col];
    return;
  }

  if (!map.targetPoint) {
    const [row, col] = getRowColFromMouse();
    map.targetPoint = map.grid[row][col];
    return;
  }
  handleMouseEdit();
}

function mouseDragged() {
  if (!map.startPoint || !map.targetPoint) return;
  handleMouseEdit();
}

function handleMouseEdit() {
  const [row, col] = getRowColFromMouse();
  if (mouseButton === LEFT) map.grid[row][col].makeBlock();
  else map.grid[row][col].unBlock();
}

function getRowColFromMouse() {
  const row = floor(mouseY / CELL_SIZE);
  const col = floor(mouseX / CELL_SIZE);
  if (row < GRID && row >= 0 && col < GRID && col >= 0) return [row, col];
}
