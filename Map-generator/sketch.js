const WIDTH = 400;
const DIM = 15;
const TOTALTILES = 21;
const TILEWIDTH = WIDTH / DIM;
let grid = [];
const tiles = [];
const tileImages = [];
let waveFunc;

function preload() {
  const path = 'tiles/tiny-dungeon';
  for (let i = 0; i < TOTALTILES; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  createCanvas(WIDTH, WIDTH);
  for (let i = 0; i < TOTALTILES; i++) {
    tiles[i] = new Tile(tileImages[i], MAP_DATA[i]);
  }

  waveFunc = new Wavefunction(tiles, DIM, TILEWIDTH);
  waveFunc.init();
}

function draw() {
  background(0);
  waveFunc.draw();
  const selected = waveFunc.getNextCell();
  if (!selected) return;
  waveFunc.collapse(selected);
  waveFunc.propagate(selected);
}

// function isJoinable(e, f) {
//   const reverse = f.split('').reverse();
//   return e === reverse.join('');
// }

// function isMatch(tile1, tile2, cell1, cell2) {
//   if (cell1.x === cell2.x) {
//     const dy = cell1.y - cell2.y;
//     return dy > 0
//       ? isJoinable(tile1.edges[0], tile2.edges[2])
//       : isJoinable(tile1.edges[2], tile2.edges[0]);
//   }
//   if (cell1.y === cell2.y) {
//     const dx = cell1.x - cell2.x;
//     return dx > 0
//       ? isJoinable(tile1.edges[3], tile2.edges[1])
//       : isJoinable(tile1.edges[1], tile2.edges[3]);
//   }
// }

// function propagate(cell) {
//   let neighbors = getNeighbors(cell);
//   for (let neighbor of neighbors) {
//     let available = [];
//     for (let index of neighbor.options) {
//       if (isMatch(tiles[index], cell.tile, neighbor, cell))
//         available.push(index);
//     }
//     neighbor.options = available;
//   }
// }
