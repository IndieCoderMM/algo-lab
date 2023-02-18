class Cell {
  constructor(pos) {
    this.pos = pos;
    this.collapsed = false;
    this.options = [...Object.keys(CURRENT_MAP)];
    this.neighbors = [];
    this.tile = null;
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
    // this.makeNeighbors();
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

  cellAt(x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) return;
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
    let lowestECell = random(openCells);
    for (let cell of openCells) {
      if (cell.entropy < lowestECell.entropy) lowestECell = cell;
    }
    return lowestECell;
  }

  collapse(cell) {
    cell.collapsed = true;
    cell.tile = this.tileset[random(cell.options)];
  }

  validate(options, edge) {
    const copy = [...options];
    for (let i = options.length - 1; i >= 0; i--) {
      const option = this.tileset[options[i]];
      if (!edge.includes(option)) {
        options.splice(i, 1);
      }
    }
    if (options.length === 0) {
      copy.forEach((i) => options.push(i));
      return false;
    }
    return true;
  }

  propagate(cell) {
    const left = this.cellAt(cell.pos.x - 1, cell.pos.y);
    const right = this.cellAt(cell.pos.x + 1, cell.pos.y);
    const top = this.cellAt(cell.pos.x, cell.pos.y - 1);
    const bottom = this.cellAt(cell.pos.x, cell.pos.y + 1);
    if (left) {
      const valid = this.validate(left.options, cell.tile.left);
    }
    if (right) {
      const valid = this.validate(right.options, cell.tile.right);
    }
    if (top) {
      const valid = this.validate(top.options, cell.tile.top);
    }
    if (bottom) {
      const valid = this.validate(bottom.options, cell.tile.bot);
    }
    // console.table(left.options, top.options, right.options, bottom.options);
  }
}
