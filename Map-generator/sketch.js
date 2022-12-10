const WIDTH = 400;
const DIM = 5;
const TILEWIDTH = WIDTH / DIM;
let grid = [];
const tiles = [];
const tileImages = [];

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collapsed = false;
    this.options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.tile = null;
  }
}

function preload() {
  const path = 'tiles/paper_dungeon';
  tileImages[0] = loadImage(path + '/wall-top.png');
  tileImages[1] = loadImage(path + '/wall-right.png');
  tileImages[2] = loadImage(path + '/wall-bottom.png');
  tileImages[3] = loadImage(path + '/wall-left.png');
  tileImages[4] = loadImage(path + '/corner-bottom-left.png');
  tileImages[5] = loadImage(path + '/corner-bottom-right.png');
  tileImages[6] = loadImage(path + '/corner-top-left.png');
  tileImages[7] = loadImage(path + '/corner-top-right.png');
  tileImages[8] = loadImage(path + '/floor_chest.png');
  tileImages[9] = loadImage(path + '/tiles.png');
  // tileImages[10] = loadImage(path + '/floor_trap.png');
  // tileImages[11] = loadImage(path + '/floor_dragon.png');
  tileImages[12] = loadImage(path + '/floor_door_closed.png');
  tileImages[13] = loadImage(path + '/floor_doorway.png');
}

function setup() {
  createCanvas(WIDTH, WIDTH);
  tiles[0] = new Tile(tileImages[0], ['XXX', 'XOO', 'OOO', 'OOX']);
  tiles[1] = new Tile(tileImages[1], ['OOX', 'XXX', 'XOO', 'OOO']);
  tiles[2] = new Tile(tileImages[2], ['OOO', 'OOX', 'XXX', 'XOO']);
  tiles[3] = new Tile(tileImages[3], ['XOO', 'OOO', 'OOX', 'XXX']);
  tiles[4] = new Tile(tileImages[4], ['XOO', 'OOX', 'XXX', 'XXX']);
  tiles[5] = new Tile(tileImages[5], ['OOX', 'XXX', 'XXX', 'XOO']);
  tiles[6] = new Tile(tileImages[6], ['XXX', 'XOO', 'OOX', 'XXX']);
  tiles[7] = new Tile(tileImages[7], ['XXX', 'XXX', 'XOO', 'OOX']);
  tiles[8] = new Tile(tileImages[8], ['OOO', 'OOO', 'OOO', 'OOO']);
  tiles[9] = new Tile(tileImages[9], ['OOO', 'OOO', 'OOO', 'OOO']);
  // tiles[10] = new Tile(tileImages[10], ['OOO', 'OOO', 'OOO', 'OOO']);
  // tiles[11] = new Tile(tileImages[11], ['OOO', 'OOO', 'OOO', 'OOO']);
  tiles[10] = new Tile(tileImages[12], ['OOO', 'XOO', 'OOO', 'OOX']);
  tiles[11] = new Tile(tileImages[13], ['OOO', 'XOO', 'OOO', 'OOX']);

  for (let y = 0; y < DIM; y++) {
    for (let x = 0; x < DIM; x++) {
      const cell = new Cell(x, y);
      grid.push(cell);
    }
  }
}

function draw() {
  background(0);
  for (let cell of grid) {
    fill(0);
    stroke(255);
    rect(cell.x * TILEWIDTH, cell.y * TILEWIDTH, TILEWIDTH, TILEWIDTH);
    if (cell.collapsed) {
      image(
        cell.tile.img,
        cell.x * TILEWIDTH,
        cell.y * TILEWIDTH,
        TILEWIDTH,
        TILEWIDTH
      );
    }
  }
  const selected = getLowestEntropy();
  if (selected === null) return;
  collapse(selected);
  propagate(selected);
}

function getLowestEntropy() {
  const selection = grid.filter((cell) => !cell.collapsed);
  let selected = selection[0] || null;
  for (let cell of selection) {
    if (cell.options.length < selected.options.length) selected = cell;
  }
  return selected;
}

function collapse(cell) {
  cell.collapsed = true;
  cell.tile = tiles[random(cell.options)];
}

function isNeighbor(a, b) {
  if (a.x === b.x) return a.y === b.y + 1 || a.y === b.y - 1;
  else if (a.y === b.y) return a.x === b.x + 1 || a.x === b.x - 1;
  return false;
}

function getNeighbors(cell) {
  let neighbors = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === cell) continue;
    if (grid[i].collapsed) continue;
    if (isNeighbor(grid[i], cell)) neighbors.push(grid[i]);
  }
  return neighbors;
}

function isJoinable(e, f) {
  const reverse = f.split('').reverse();
  return e === reverse.join('');
}

function isMatch(tile1, tile2, cell1, cell2) {
  if (cell1.x === cell2.x) {
    const dy = cell1.y - cell2.y;
    return dy > 0
      ? isJoinable(tile1.edges[0], tile2.edges[2])
      : isJoinable(tile1.edges[2], tile2.edges[0]);
  }
  if (cell1.y === cell2.y) {
    const dx = cell1.x - cell2.x;
    return dx > 0
      ? isJoinable(tile1.edges[3], tile2.edges[1])
      : isJoinable(tile1.edges[1], tile2.edges[3]);
  }
}

function propagate(cell) {
  let neighbors = getNeighbors(cell);
  for (let neighbor of neighbors) {
    let available = [];
    for (let index of neighbor.options) {
      if (isMatch(tiles[index], cell.tile, neighbor, cell))
        available.push(index);
    }
    neighbor.options = available;
  }
}
