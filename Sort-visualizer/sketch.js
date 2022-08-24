const WIDTH = 500;
const HEIGHT = 400;
const MAXLENGTH = 100;
const TOTAL = 50;
let list;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  list = randList(TOTAL);
}

function draw() {
  background(0);
  let x = 0;
  let width = WIDTH / TOTAL;
  for (let len in list) {
    y = HEIGHT - (MAXLENGTH * len) / 1000;
    fill(255);
    rect(x * width, y, width, MAXLENGTH);
  }
}

function randList(len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(random(1, 1000));
  }
  console.log(arr);
  return arr;
}
