# 🌊Wave Function Collapse
This project uses the Wave Function Collapse algorithm to generate random 2D maps. 

## 🚀 [Map Generator Demo](https://indiecodermm.github.io/algo-lab/Map-generator/index.html)
<br>
<p align="center">
<img src="./wfc_demo.gif" width="70%">
</p>
<br><br>

<!-- ![Demo](./wfc_demo.gif) -->
## ⚙ Algorithm
Wave Function Collapse is a powerful algorithm used in CS and mathematics to solve problems in physics and engineering. But it can also be used to generate procedural random maps for games. 

WFC works with a grid system where each cell represents a tile. The algorithm analyzes the tiles and calculates the available options. Then it chooses the cell with least option and propagate the result to entire grid.

It's the same logic used in solving the Sudoku puzzle, where if one cell is filled, the options of other related cells decreases. This way, the algorithm can create unique and random map that still follows certain rules and parameters.

## 🚂 Implementation
These are the steps required to implement this algorithm.

1. Prepare tile images to use. Example:
![Demo Tiles](https://raw.githubusercontent.com/mxgmn/WaveFunctionCollapse/master/images/symmetry-system.png)

1. Create system or data to define which tiles can be adjacent to which, or which sides can be joined together. *For example, an array of `[0, 0, 0, 0]` can be used to represent a tile with same color sides.*


3. Initialize a grid (MxN array), and fill it with empty cell. This is an example `Cell` object.
    ```js
    const Cell = {
    pos: [0, 0],
    tile: null,
    options: [1,2,3,4],
    // Options are available tiles for this cell
    }
    ```

4. Select a cell with the *least options* and fill it with one of the tiles from its options. When the grid is empty, a random cell can be selected.

5. Create a function to update the available options of all neighbors based on tile of the collapsed cell.

6. Repeat steps 4 & 5 untill the grid is filled.
   - Find lowest-entropy cell
   - Collapse the cell
   - Propagate the effect


## 💎 Resources
- Offical WFC Repository: [WaveFunctionCollapse](https://github.com/mxgmn/WaveFunctionCollapse)
- Tutorial on implementing WFC in p5.js: [Coding Train: WFC](https://youtu.be/rI_y2GAlQFM)
- Tilemaps: [Kenney Assets](https://www.kenney.nl/assets)

