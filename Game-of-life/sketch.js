const WIDTH = 400;
const ROWS = 20;
const COLS = 20;
const TILEWIDTH = WIDTH/ROWS;
const DELAY = 100;

	
let grid;
let savedGrid = null;
let mode = 'edit';	// simulate
let timestamp = 0;
let generation = 0;

const GLIDER = makeConstellation(0, 0, [0, 2], [1, 0], [1, 2], [2, 1], [2, 2]);
const SHIP = makeConstellation(0, 0, [0,0], [0,3], [1,4], [2,0], [2,4], [3,1], [3,2], [3,3], [3,4]);
const TOAD = makeConstellation(COLS/3, ROWS/4, [0,2], [1,0], [1,3], [2,0], [2,3], [3,1]);
// const CATHION = makeConstellation([[0,1], [1,0], [1,1], [1,2], []])


const DATA = [GLIDER, SHIP, TOAD];
 

class Cell {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.state = 0;
		this.gen = 0;
		this.randomState();
	}

	draw() {
		let color = [0, 0, 0];
		if (this.state == 1) {
			color = [10, 200, 30];
		} else if (this.state == 2) {
			color = [200, 20, 20];
		} else if (this.state == 3) {
			color = [0, 150, 200];	
		}
		fill(...color);
		rect(this.col*TILEWIDTH, this.row*TILEWIDTH, TILEWIDTH, TILEWIDTH, TILEWIDTH/4);
		if (this.gen > 0) {
			fill(255);
			text(this.gen, this.col*TILEWIDTH+TILEWIDTH/2, this.row*TILEWIDTH+TILEWIDTH/2);
		}
	}

	randomState() {
		this.state = floor(random(2));
	}

	nextState(n) {
		if (this.state == 1 && (n > 3 || n < 2)) {
			this.state = 2;
		} else if (this.state == 0 && n == 3) {
			this.state = 3;
		}
	}

	changeState() {
		if (this.state === 1) this.gen ++;
		else this.gen = 0;
		if (this.state === 2) this.state = 0;
		else if (this.state === 3) this.state = 1;
	}
}

function setup() {
	createCanvas(WIDTH, WIDTH);
	frameRate(20);
	textSize(10);
	textAlign(CENTER, CENTER);
	grid = makeGrid(ROWS, COLS);
	initGrid();
	recordGrid();
}


function draw() {
	background(0);
	for (let row of grid) {
		for (let cell of row) {
			cell.draw();
		}
	}
	if (mode == 'simulate') {
		now = millis();
		if (now - timestamp > DELAY) {
			timestamp = now;
			for (let row of grid) {
				for (let cell of row) {
					cell.changeState();
				}
			}
			nextGeneration(grid);
		}
		describe('Simulating @Generation : ' + generation + ' [ press SPACE to stop ]', LABEL);
	} else {
		describe('Editing [ "SPACE"-run, "p"-replay, "R"-refresh, "M_1"-Add, "M_2"-Remove ]', LABEL);
	}
}

function keyPressed() {
	if (key == ' ') {
		if (mode == 'edit') {
			mode = 'simulate';
			recordGrid();
		} else mode = 'edit';
		generation = 0;
	}

	if (!(mode == 'edit')) return;
	if (key == 'n') 
		nextGeneration(grid);
	if (key == 'r') {
		generation = 0;
		randomizeGrid();
	}
	if (key == 'p') 
		loadGrid(savedGrid);

	numKey = parseInt(key)
	if (!(isNaN(numKey))) {
		index = numKey - 1;
		if (!(index < 0 || index >= DATA.length)) 
			loadGrid(DATA[index]);
	}
} 

function mouseDragged() {
	if (mode !== 'edit') return;
	editGrid();
}

function mousePressed() {
	if (mode !== 'edit') return;
	editGrid();
}

function makeGrid(rows, cols) {
	let arr = new Array(rows);
	for (let i = 0; i < rows; i++) {
		let row = new Array(cols);
		arr[i] = row;
	}
	return arr;
}

function initGrid(){
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			grid[i][j] = new Cell(i, j);
		}
	}
}

function editGrid() {
	const row = floor(mouseY / TILEWIDTH);
	const col = floor(mouseX / TILEWIDTH);
	if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
	if (mouseButton == LEFT) {
		grid[row][col].state = 1;
		grid[row][col].gen = 0;
	} else if (mouseButton == CENTER) {
		grid[row][col].state = 0;
		grid[row][col].gen = 0;
	}
}


function recordGrid(){
	savedGrid = makeGrid(ROWS, COLS);
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			if (grid[i][j].state == 1) savedGrid[i][j] = 1;
			else savedGrid[i][j] = 0;
		}
	}
	print('Current grid is saved successfully.');
	// console.table(savedGrid);
}

function randomizeGrid() {
	for (let row of grid) {
		for (let cell of row) {
			cell.randomState();
			cell.gen = 0;
		}
	}
}

function loadGrid(data) {
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			grid[i][j].gen = 0;
			if (data[i][j] === 1) grid[i][j].state = 1;
			else grid[i][j].state = 0;
		}
	}
}

function makeConstellation(x, y, ...coors) {
	let arr = makeGrid(ROWS, COLS);
	for (let index of coors) {
		let row = index[0] + Math.ceil(y);
		let col = index[1] + Math.ceil(x);
		arr[row][col] = 1;
	}
	return arr;
}

function totalNeighbors(row, col) {
	let count = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (i == 0 && j == 0) continue;
			if (row+i < 0 || row+i >= ROWS || col+j < 0 || col+j >= COLS) continue;
			let state = grid[row+i][col+j].state;
			if (state == 1 || state == 2) count++;
		}
	}
	return count;
}


function nextGeneration() {
	for (let row of grid) {
		for (let cell of row) {
			let neighbors = totalNeighbors(cell.row, cell.col);
			cell.nextState(neighbors);
		}
	}
	generation++;
} 
