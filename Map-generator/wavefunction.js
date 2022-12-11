class Cell {
  constructor(pos) {
    this.pos = pos;
    this.collapsed = false;
    this.options = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    this.tile = null;
    this.neighbors = [];
  }
  get entropy() {
    return this.options.length;
  }
}

class Wavefunction {
  constructor(tiles, size, tilesize) {
    this.size = size;
    this.tiles = tiles;
    this.tilesize = tilesize;
    this.grid = [];
  }

  init() {
    this.initGrid();
    this.makeNeighbors();
  }

  initGrid() {
    for (let y = 0; y < this.size; y++) {
      let row = [];
      for (let x = 0; x < this.size; x++) {
        const cell = new Cell({ x, y });
        row.push(cell);
      }
      this.grid.push(row);
    }
  }

  makeNeighbors() {
    for (let row of this.grid) {
      for (let cell of row) {
        if (cell.pos.x > 0)
          cell.neighbors.push({ x: cell.pos.x - 1, y: cell.pos.y });
        if (cell.pos.x < this.size - 1)
          cell.neighbors.push({ x: cell.pos.x + 1, y: cell.pos.y });
        if (cell.pos.y > 0)
          cell.neighbors.push({ x: cell.pos.x, y: cell.pos.y - 1 });
        if (cell.pos.y < this.size - 1)
          cell.neighbors.push({ x: cell.pos.x, y: cell.pos.y + 1 });
      }
    }
  }

  cellAt(x, y) {
    return this.grid[y][x];
  }

  indexOf(cell) {
    for (let y = 0; y < this.size; y++)
      for (let x = 0; x < this.size; x++) {
        if (this.cellAt(x, y) === cell) return { x, y };
      }
  }

  getOpenCells() {
    let openCells = [];
    for (let y = 0; y < this.size; y++)
      for (let x = 0; x < this.size; x++) {
        if (this.cellAt(x, y).collapsed) continue;
        openCells.push(this.cellAt(x, y));
      }
    return openCells;
  }

  getNextCell() {
    const openCells = this.getOpenCells();
    if (openCells.length === 0) return;
    let lowestECell = openCells[0];
    for (let cell of openCells) {
      if (cell.entropy < lowestECell.entropy) lowestECell = cell;
    }
    return lowestECell;
  }

  isValidOption(guessTile, collapsedTile, dx, dy) {
    if (dx > 0) return collapsedTile.isMatch(guessTile, 1);
    if (dx < 0) return collapsedTile.isMatch(guessTile, 3);
    if (dy > 0) return collapsedTile.isMatch(guessTile, 2);
    if (dy < 0) return collapsedTile.isMatch(guessTile, 0);
  }

  collapse(cell) {
    cell.collapsed = true;
    cell.tile = this.tiles[random(cell.options)];
  }

  propagate(cell) {
    for (let pos of cell.neighbors) {
      let availableOpts = [];
      const allOptions = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ];
      const neighbor = this.cellAt(pos.x, pos.y);
      if (neighbor.collapsed) continue;
      const dx = pos.x - cell.pos.x;
      const dy = pos.y - cell.pos.y;
      for (let opt of allOptions) {
        if (this.isValidOption(this.tiles[opt], cell.tile, dx, dy)) {
          availableOpts.push(opt);
        }
      }
      if (availableOpts.length === 0) {
        cell.collapsed = false;
        return;
      }
      neighbor.options = availableOpts;
    }
  }

  draw() {
    fill(0);
    stroke(255);
    this.grid.forEach((row) =>
      row.forEach((cell) => {
        rect(
          cell.pos.x * this.tilesize,
          cell.pos.y * this.tilesize,
          this.tilesize,
          this.tilesize
        );
        if (cell.collapsed)
          image(
            cell.tile.img,
            cell.pos.x * this.tilesize,
            cell.pos.y * this.tilesize,
            this.tilesize,
            this.tilesize
          );
      })
    );
  }
}
