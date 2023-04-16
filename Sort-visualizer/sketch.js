const WIDTH = 700;
const HEIGHT = 400;
const ARR_LEN = 100;
const BAR_WIDTH = WIDTH / ARR_LEN;
const PAD = 5;

const LIST = new Array(ARR_LEN);

let sortCounter;
let clock;
let sorting = false;
let sorted = false;
let selector;
let clockDisplay;
let timestamp;

function setup() {
  createCanvas(WIDTH, HEIGHT).parent('canvas-container');
  select('#reset-btn').mousePressed(initVisualizer);
  select('#start-btn').mousePressed(startSorting);

  selector = select('#algorithm-select');
  clockDisplay = select('#timer-span');

  frameRate(15);
  initVisualizer();
}

function startSorting() {
  if (sorted) return;
  const algo = selector.value();
  console.log('Selected: ', algo);
  sorting = true;
  timestamp = millis();
}

function initVisualizer() {
  generateRandom(PAD, HEIGHT - PAD);
  sorted = false;
  sorting = false;
  sortCounter = 0;
  clock = 0.0;
}

function draw() {
  background('#f8f9fa');

  LIST.forEach((value, i) => {
    const x = lerp(BAR_WIDTH, WIDTH - BAR_WIDTH, i / LIST.length);
    noStroke();
    if (i > LIST.length - 1 - sortCounter) fill('#84fab0');
    else fill('#ff6b6b');
    rect(x, HEIGHT - value, BAR_WIDTH, HEIGHT);
  });

  clockDisplay.elt.innerText = clock.toFixed(2);
  if (!sorting) return;
  sorted = bubbleSort(LIST);

  if (sorted) {
    sorting = false;
  } else {
    const current = millis();
    clock += parseInt(current - timestamp) / 1000;
    timestamp = current;
  }
}

function generateRandom(min, max) {
  for (let i = 0; i < LIST.length; i++) {
    LIST[i] = random(min, max);
  }
}

function bubbleSort(list) {
  if (sortCounter >= list.length) return true;

  for (let j = 0; j < list.length - 1 - sortCounter; j++) {
    if (list[j] > list[j + 1]) {
      swap(list, j, j + 1);
    }
  }

  sortCounter++;
  return false;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
