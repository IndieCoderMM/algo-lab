class Cell {
  constructor({ row, col, size }) {
    this.row = row;
    this.col = col;
    this.size = size;
    this.x = this.col * this.size;
    this.y = this.row * this.size;
    this.block = false;
    this.color = color(255);
  }

  makeStart() {
    this.color = color(255, 40, 40);
  }

  makeEnd() {
    this.color = color(50, 250, 40);
  }

  makeBlock() {
    this.color = color(0);
  }

  unBlock() {
    this.color = color(255);
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}
