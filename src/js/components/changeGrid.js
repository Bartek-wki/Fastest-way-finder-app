import { globalValue } from '../settings.js';

export const changeGrid = {}; // eslint-disable-line no-unused-vars

changeGrid.addToGrid = function (col, row) {
  globalValue.grid[col][row].state = 'empty';
}; 

changeGrid.removeFromGrid = function (col, row) {
  globalValue.grid[col][row].state = 'block';
};

changeGrid.addGoal = function (col, row) {
  globalValue.grid[col][row].state = 'goal';
};