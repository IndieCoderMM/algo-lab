const WIDTH = 400;
const DIM = 15;
const TOTALTILES = 22;
const TILEWIDTH = WIDTH / DIM;

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
  // waveFunc.cellAt(0, 0).options = [0];
}

function draw() {
  background(0);
  waveFunc.draw();
  const selected = waveFunc.getNextCell();
  if (!selected) return;
  waveFunc.collapse(selected);
  waveFunc.propagate(selected);
}
