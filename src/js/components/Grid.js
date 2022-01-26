import { select, templates } from '../settings.js';
import { utils } from '../utils.js';

class Grid {
  constructor() {
    const thisGrid = this;

    thisGrid.initGrid();
    thisGrid.renderGrid();
    //const activeCell = thisGrid.findActiveCell();
    //thisGrid.removeActiveClass(activeCell);
    thisGrid.start = [];
    thisGrid.end = [];
    thisGrid.selectedCells = [];
    console.log(thisGrid.start, thisGrid.end, this.selectedCells);
  }

  initGrid() {
    const thisGrid = this;

    thisGrid.grid = new Array(10);

    for (let col = 0; col < 10; col++) {
      thisGrid.grid[col] = new Array(10);
    }

    const grid = function () {
      let cellId = 1;

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          thisGrid.grid[row][col] = new Object;
          thisGrid.grid[row][col].state = 'block';
          thisGrid.grid[row][col].cellRow = row;
          thisGrid.grid[row][col].cellCol = col;
          thisGrid.grid[row][col].cellId = cellId++;
        }
      }
    };
    grid();
  }

  renderGrid() {
    const thisGrid = this;

    for (let row of thisGrid.grid) {
      for (let cell of row) {
        const generatedHTML = templates.grid(cell);
        thisGrid.element = utils.createDOMFromHTML(generatedHTML);

        const gridContainer = document.querySelector(select.containerOf.grid);
        
        gridContainer.appendChild(thisGrid.element);

      }
    }
  }

  /*findActiveCell() {
    const activeCell = function () {
      document.querySelector('div[row="' + path.row + '"][col="' + path.col + '"]');
    };
  }*/


}

export default Grid;