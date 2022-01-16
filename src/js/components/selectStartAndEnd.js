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

    thisSelect.selectStartEnd();
  }

  selectStartEnd() {
    const thisSelect = this;

    const startEnd = [];

    if (thisSelect.dom.headerTwoWrapper.classList.contains(classNames.step.stepActive)) {
      thisSelect.dom.grid.addEventListener('click', function () {
        const clickedElement = event.target;

        const cellId = clickedElement.getAttribute('id');
        let cellCol = clickedElement.getAttribute('col');
        cellCol = parseInt(cellCol);
        let cellRow = clickedElement.getAttribute('row');
        cellRow = parseInt(cellRow);
        const indexOfCell = startEnd.indexOf(cellId);

        if (startEnd.length == 0
          && clickedElement.classList.contains(classNames.grid.selectedCell)) {
          clickedElement.classList.add(classNames.grid.starCell);
        
          startEnd.push(cellId);
        
          globalValue.start.push(cellCol, cellRow);
        
          console.log(globalValue.start);
        } else if (startEnd.length == 1
          && clickedElement.classList.contains(classNames.grid.selectedCell)
          && indexOfCell == -1) {
          clickedElement.classList.add(classNames.grid.endCell);
        
          startEnd.push(cellId);
        
          globalValue.end.push(cellCol, cellRow);

          changeGrid.addGoal(cellCol, cellRow);
        
          console.log(globalValue.end);
        }
      });
    }
  }
}

export default selectStartAndEnd;