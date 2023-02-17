class Builder {
  constructor(cellSize, bgColor) {
    this.cellSize = cellSize;
    this.bgColor = bgColor;
  }
  draw(grid = []) {
    fill(this.bgColor);
    noStroke();
    if (!grid.length) return;
    grid.forEach((row) => {
      row.forEach((cell) => {
        rect(
          cell.pos.x * this.cellSize,
          cell.pos.y * this.cellSize,
          this.cellSize,
          this.cellSize,
        );
        if (cell.collapsed) {
          image(
            cell.tile.img,
            cell.pos.x * this.cellSize,
            cell.pos.y * this.cellSize,
            this.cellSize,
            this.cellSize,
          );
        }
      });
    });
  }
}
