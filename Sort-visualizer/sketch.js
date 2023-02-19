const WIDTH = 450;
const HEIGHT = 300;
const ARR_LEN = 300;
const GAP = WIDTH / (ARR_LEN + 1);

let list;
let sortCounter;
let clock;
let sorting = false;
let sorted = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  newList();
}

function draw() {
  background(0, 0, 100);
  let x = 0;
  for (let len of list) {
    x += GAP;
    stroke(0, 255, 0);
    line(x, HEIGHT, x, HEIGHT - len);
  }
  if (!sorting) {
    if (sorted) {
      describe(
        `Bubble Sort Complete in ${clock} ms. Press [R]-to refresh`,
        LABEL,
      );
    } else describe('Press [Enter]-to sort; [R]-to refresh', LABEL);
    return;
  }
  sorted = bubbleSort();

  if (sorted) {
    sorting = false;
  } else {
    clock = parseInt(millis() - clock);
    describe(`Bubble Sort in Process...[${clock} ms]`, LABEL);
  }
}

function keyPressed() {
  if (key === 'Enter') {
    sorting = !sorting;
  } else if (!sorting && key === 'r') {
    sorted = false;
    newList();
  }
}

function newList() {
  list = randList(ARR_LEN);
  clock = millis();
  sortCounter = 0;
}

function randList(len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(random(HEIGHT));
  }
  return arr;
}

function bubbleSort() {
  if (sortCounter > list.length) return true;

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
