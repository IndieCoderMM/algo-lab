class Cell {
  constructor({ row, col, size }) {
    this.row = row;
    this.col = col;
    this.size = size;
    this.x = this.col * this.size;
    this.y = this.row * this.size;
    this.block = false;
    this.gScore = Number.POSITIVE_INFINITY;
    this.hScore = Number.POSITIVE_INFINITY;
    this.cameFrom = null;
    this.neighbors = [];
  }

  get fScore() {
    return this.gScore + this.hScore;
  }

  makeBlock() {
    this.block = true;
  }

  unBlock() {
    this.block = false;
  }

  draw(rgb = color(76, 175, 80)) {
    fill(rgb);
    noStroke();
    if (this.block) {
      fill(color(121, 85, 72));
    }
    rect(this.x, this.y, this.size, this.size);
  }

  updateNeighbors(grid) {
    for (let i = -1; i < 2; i += 2) {
      const row = this.row + i;
      const col = this.col + i;
      if (row >= 0 && row < grid.length) {
        this.neighbors.push(grid[row][this.col]);
      }
      if (col >= 0 && col < grid[0].length) {
        this.neighbors.push(grid[this.row][col]);
      }
    }
    this.neighbors = this.neighbors.filter((neighbor) => !neighbor.block);
  }
}
