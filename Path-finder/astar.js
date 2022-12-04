class Astar {
  constructor() {
    this.exploreList = [];
    this.checkedList = [];
    this.path = [];
    this.start = null;
    this.target = null;
    this.current = null;
  }

  init(start, target) {
    this.start = start;
    this.target = target;
    this.start.gScore = 0;
    this.start.hScore = this.getDistance(this.start, this.target);
    astar.exploreList.push(this.start);
  }

  getNextCell() {
    // Get the cell with lowest fscore from open set
    let nextCell = this.exploreList[0];
    for (let i = 0; i < this.exploreList.length; i++) {
      if (this.exploreList[i].fScore < nextCell.fScore) {
        nextCell = this.exploreList[i];
      }
    }
    return nextCell;
  }

  search() {
    if (this.exploreList.length <= 0) return false;
    this.current = this.getNextCell();
    if (this.current === this.target) {
      return true;
    }
    this.exploreList.splice(this.exploreList.indexOf(this.current), 1);
    this.checkedList.push(this.current);
    for (let neighbor of this.current.neighbors) {
      if (this.checkedList.includes(neighbor)) continue;
      const tempG = this.current.gScore + 1;
      if (this.exploreList.includes(neighbor)) {
        if (tempG > neighbor.gScore) {
          continue;
        }
      } else this.exploreList.push(neighbor);
      neighbor.gScore = tempG;
      neighbor.hScore = astar.getDistance(neighbor, this.target);
      neighbor.cameFrom = this.current;
    }
    return false;
  }

  getDistance(fromCell, toCell) {
    return abs(toCell.row - fromCell.row) + abs(toCell.col - fromCell.col);
  }

  drawPath() {
    let cell = this.current;
    while (cell.cameFrom !== null) {
      if (cell !== this.target) cell.draw(color(0, 176, 255));
      cell = cell.cameFrom;
    }
  }

  drawSearch() {
    this.checkedList.forEach((cell) => {
      if (cell !== this.start) cell.draw(color(155, 89, 182));
    });
  }
}
