class Tile {
  constructor(img, edges) {
    this.img = img;
    this.edges = edges;
    this.top = [];
    this.right = [];
    this.bot = [];
    this.left = [];
  }

  makeNeighbors(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      if (this.isMatch(this.edges[0], tile.edges[2])) this.top.push(tile);
      if (this.isMatch(this.edges[1], tile.edges[3])) this.right.push(tile);
      if (this.isMatch(this.edges[2], tile.edges[0])) this.bot.push(tile);
      if (this.isMatch(this.edges[3], tile.edges[1])) this.left.push(tile);
    }
  }

  isMatch(a, b) {
    return a === b.split('').reverse().join('');
  }
}
