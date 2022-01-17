import { select, classNames, globalValue } from '../settings.js';
import { changeGrid } from './changeGrid.js';

class selectStartAndEnd {
  constructor(element) {
    const thisSelect = this;
    thisSelect.getElement(element);
    thisSelect.initAction();
  }

  getElement(element) {
    const thisSelect = this;

    thisSelect.dom = {};

    thisSelect.dom.grid = element.querySelector(select.grid.grid);
    thisSelect.dom.buttonOneWrapper = element.querySelector(select.containerOf.buttons.finishDrawing);
    thisSelect.dom.buttonTwoWrapper = element.querySelector(select.containerOf.buttons.compute);
    thisSelect.dom.headerOneWrapper = element.querySelector(select.containerOf.headers.stepOne);
    thisSelect.dom.headerTwoWrapper = element.querySelector(select.containerOf.headers.stepTwo);
    thisSelect.dom.buttonOne = element.querySelector(select.buttons.finishDrawing);
  }

  initAction() {
    const thisSelect = this;

    thisSelect.dom.buttonOne.addEventListener('click', function () {
      thisSelect.activeStepTwo();
    });
  }

  activeStepTwo() {
    const thisSelect = this;
    
    thisSelect.dom.buttonOneWrapper.classList.remove(classNames.step.stepActive);
    thisSelect.dom.headerOneWrapper.classList.remove(classNames.step.stepActive);
    thisSelect.dom.buttonTwoWrapper.classList.add(classNames.step.stepActive);
    thisSelect.dom.headerTwoWrapper.classList.add(classNames.step.stepActive);

    thisSelect.getData();
  }

  getData() {
    const thisSelect = this;

    thisSelect.startAndEnd = [];

    if (thisSelect.dom.headerTwoWrapper.classList.contains(classNames.step.stepActive)) {
      thisSelect.dom.grid.addEventListener('click', function () {
        const clickedElement = event.target;

        thisSelect.cellId = clickedElement.getAttribute('id');
        thisSelect.cellCol = clickedElement.getAttribute('col');
        thisSelect.cellCol = parseInt(thisSelect.cellCol);
        thisSelect.cellRow = clickedElement.getAttribute('row');
        thisSelect.cellRow = parseInt(thisSelect.cellRow);
        thisSelect.indexOfCell = thisSelect.startAndEnd.indexOf(thisSelect.cellId);

        thisSelect.selectStartEnd();
      });
    }
  }

  selectStartEnd() {
    const thisSelect = this;
    const clickedElement = event.target;

    if (thisSelect.startAndEnd.length == 0
      && clickedElement.classList.contains(classNames.grid.selectedCell)) {
      clickedElement.classList.add(classNames.grid.starCell);
    
      thisSelect.startAndEnd.push(thisSelect.cellId);
    
      globalValue.start.push(thisSelect.cellRow, thisSelect.cellCol);
    
    } else if (thisSelect.startAndEnd.length == 1
      && clickedElement.classList.contains(classNames.grid.selectedCell)
      && thisSelect.indexOfCell == -1) {
      clickedElement.classList.add(classNames.grid.endCell);
    
      thisSelect.startAndEnd.push(thisSelect.cellId);
    
      globalValue.end.push(thisSelect.cellRow, thisSelect.cellCol);

      changeGrid.addGoal(thisSelect.cellRow, thisSelect.cellCol);
    }
  }
}

export default selectStartAndEnd;