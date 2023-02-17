const WIDTH = 400;
const DIM = 10;
const TOTALTILES = 14;
const TILEWIDTH = WIDTH / DIM;

const tiles = [];
const tileImages = [];
let waveFunc;

function preload() {
  const path = 'assets/paper-dungeon';
  for (let i = 0; i < TOTALTILES; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  createCanvas(WIDTH, WIDTH);
  for (let i = 0; i < TOTALTILES; i++) {
    tiles[i] = new Tile(tileImages[i], PAPER_DATA[i]);
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
