class Cell {
  constructor(pos) {
    this.pos = pos;
    this.collapsed = false;
    this.options = [...Object.keys(DUNGEON_DATA)];
    this.tile = null;
    this.neighbors = [];
  }
  get entropy() {
    return this.options.length;
  }
}

class WaveFunc {
  constructor(tileset, size) {
    this.tileset = tileset;
    this.size = size;
    this.grid = [];
    this.initGrid();
    this.makeNeighbors();
  }

  initGrid() {
    for (let y = 0; y < this.size; y++) {
      const row = [];
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

  getOpenCells() {
    const openCells = [];
    for (let row of this.grid) {
      for (let cell of row) {
        if (!cell.collapsed) openCells.push(cell);
      }
    }
    return openCells;
  }

  selectNextCell() {
    const openCells = this.getOpenCells();

    if (openCells.length === 0) return;
    let lowestECell = openCells[0];
    for (let cell of openCells) {
      if (cell.entropy < lowestECell.entropy) lowestECell = cell;
    }

    return lowestECell;
  }

  collapse(cell) {
    cell.collapsed = true;
    cell.tile = this.tileset[random(cell.options)];
  }

  isValid(tempTile, collapsedTile, dx, dy) {
    if (dx > 0) return collapsedTile.isMatch(tempTile, 1);
    if (dx < 0) return collapsedTile.isMatch(tempTile, 3);
    if (dy > 0) return collapsedTile.isMatch(tempTile, 2);
    if (dy < 0) return collapsedTile.isMatch(tempTile, 0);
  }

  propagate(cell) {
    for (let pos of cell.neighbors) {
      const neighbor = this.cellAt(pos.x, pos.y);
      if (neighbor.collapsed) continue;
      let availableOpts = [];
      const allOptions = [...Object.keys(DUNGEON_DATA)];
      const dx = pos.x - cell.pos.x;
      const dy = pos.y - cell.pos.y;
      for (let opt of allOptions) {
        if (this.isValid(this.tileset[opt], cell.tile, dx, dy))
          availableOpts.push(opt);
      }
      if (availableOpts.length === 0) {
        cell.collapsed = false;
        return;
      }
      neighbor.options = availableOpts;
    }
  }
}
