class Tile {
  constructor(img, edges) {
    this.img = img;
    this.edges = edges;
  }
  isMatch(tile, dir) {
    if (dir === 0) {
      return this.isJoinable(tile.edges[2], this.edges[dir]);
    } else if (dir === 2) {
      return this.isJoinable(tile.edges[0], this.edges[dir]);
    } else if (dir === 1) {
      return this.isJoinable(tile.edges[3], this.edges[dir]);
    } else if (dir === 3) {
      return this.isJoinable(tile.edges[1], this.edges[dir]);
    }
  }

  isJoinable(a, b) {
    return a === b.split('').reverse().join('');
  }
}
