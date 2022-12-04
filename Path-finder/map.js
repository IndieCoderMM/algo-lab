class Map {
  constructor({ gridSize, cellSize }) {
    this.size = gridSize;
    this.cellSize = cellSize;
    this.grid = new Array(this.size);
    this.makeGrid();
    this.startPoint = null;
    this.targetPoint = null;
  }

  makeGrid() {
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = new Cell({ row: i, col: j, size: this.cellSize });
      }
    }
  }

  draw() {
    this.grid.forEach((row) => row.forEach((cell) => cell.draw()));
    if (this.startPoint) {
      fill(color(255));
      rect(
        this.startPoint.x,
        this.startPoint.y,
        this.cellSize,
        this.cellSize,
        5
      );
    }
    if (this.targetPoint) {
      fill(color(255, 235, 59));
      rect(
        this.targetPoint.x,
        this.targetPoint.y,
        this.cellSize,
        this.cellSize,
        5
      );
    }
  }

  updateCells() {
    this.grid.forEach((row) =>
      row.forEach((cell) => cell.updateNeighbors(this.grid))
    );
  }
}
