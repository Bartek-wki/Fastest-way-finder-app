import { globalValue } from '../settings.js';

export const changeGrid = {}; // eslint-disable-line no-unused-vars

changeGrid.addToGrid = function (row, col) {
  globalValue.grid[row][col].state = 'empty';
}; 

changeGrid.removeFromGrid = function (row, col) {
  globalValue.grid[row][col].state = 'block';
};

changeGrid.addGoal = function (row, col) {
  globalValue.grid[row][col].state = 'goal';
};

changeGrid.restartGrid = function () {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      delete globalValue.grid[row][col].parent;
      globalValue.grid[row][col].state = 'block';
    }
  }
};