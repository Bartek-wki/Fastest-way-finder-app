import { select, classNames, globalValue } from '../settings.js';
import { changeGrid } from './changeGrid.js';

class startAgain {
  constructor(element) {
    const thisStartAgain = this;

    thisStartAgain.getElement(element);
    thisStartAgain.initAction();
  }

  getElement(element) {
    const thisStartAgain = this;

    thisStartAgain.dom = {};

    thisStartAgain.dom.grid = element.querySelector(select.grid.grid);
    thisStartAgain.dom.buttonThreeWrapper = element.querySelector(select.containerOf.buttons.startAgain);
    thisStartAgain.dom.headerThreeWrapper = element.querySelector(select.containerOf.headers.stepThree);
    thisStartAgain.dom.buttonOneWrapper = element.querySelector(select.containerOf.buttons.finishDrawing);
    thisStartAgain.dom.headerOneWrapper = element.querySelector(select.containerOf.headers.stepOne);

    thisStartAgain.dom.buttonThree = element.querySelector(select.buttons.startAgain);
  }

  initAction() {
    const thisStartAgain = this;

    thisStartAgain.dom.buttonThree.addEventListener('click', function () {
      thisStartAgain.getData();
    });
  }

  getData() {
    const thisStartAgain = this;

    thisStartAgain.activeCells = document.querySelectorAll(select.grid.startCell);
    thisStartAgain.selectedCells = document.querySelectorAll(select.grid.selectedCell);
    thisStartAgain.endCell = document.querySelector(select.grid.endCell);

    thisStartAgain.activeStepOne();
  }

  activeStepOne() {
    const thisStartAgain = this;
    
    thisStartAgain.dom.buttonThreeWrapper.classList.remove(classNames.step.stepActive);
    thisStartAgain.dom.headerThreeWrapper.classList.remove(classNames.step.stepActive);
    thisStartAgain.dom.buttonOneWrapper.classList.add(classNames.step.stepActive);
    thisStartAgain.dom.headerOneWrapper.classList.add(classNames.step.stepActive);

    for (let activeCell of thisStartAgain.activeCells) {
      activeCell.classList.remove(classNames.grid.starCell);
    }

    for (let selectedCell of thisStartAgain.selectedCells) {
      selectedCell.classList.remove(classNames.grid.selectedCell);
    }

    thisStartAgain.endCell.classList.remove(classNames.grid.endCell);

    globalValue.selectedCell = [];
    globalValue.start = [];
    globalValue.end = [];
  }

}

export default startAgain;