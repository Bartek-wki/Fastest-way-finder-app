import { select, classNames} from '../settings.js';

class startAgain {
  constructor(element, grid, start, end, selectedCells, statusOfStepZero, statusOfStepOne) {
    const thisStartAgain = this;

    statusOfStepZero.registerNewListener(function () {
      thisStartAgain.removeSelectedCells(start, end, selectedCells);
      thisStartAgain.restartGrid(grid);
      const cellWithClasses = thisStartAgain.findClasses();
      thisStartAgain.removeClasses(cellWithClasses);
      thisStartAgain.initStartOne(statusOfStepZero, statusOfStepOne);
    });
  }

  removeSelectedCells(start, end, selectedCells) {
    start.splice(0, start.length);
    end.splice(0, end.length);
    selectedCells.splice(0, selectedCells.length);
  }

  restartGrid(grid) {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        delete grid[row][col].parent;
        grid[row][col].state = 'block';
      }
    }
  }

  findClasses() {
    const cellWithClasses = {
      select: document.querySelectorAll(select.grid.selectedCell),
      start: document.querySelectorAll(select.grid.startCell),
      end: document.querySelectorAll(select.grid.endCell),
    };

    return cellWithClasses;
  }

  removeClasses(cellWithClasses) {
    for (let select of cellWithClasses.select) {
      select.classList.remove(classNames.grid.selectedCell);
    }

    for (let start of cellWithClasses.start) {
      start.classList.remove(classNames.grid.starCell);
    }
    for (let end of cellWithClasses.end) {
      end.classList.remove(classNames.grid.endCell);
    }
  }

  initStartOne(statusOfStepZero, statusOfStepOne) {
    statusOfStepZero.stepStatus = 'inactive';
    statusOfStepOne.changeStep = 'active';
  }

}

export default startAgain;