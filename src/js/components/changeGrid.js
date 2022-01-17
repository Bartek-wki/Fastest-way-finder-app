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