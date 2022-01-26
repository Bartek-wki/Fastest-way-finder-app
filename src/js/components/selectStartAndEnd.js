import { select, classNames, handlebarsData } from '../settings.js';
import RenderElement from './RenderElement.js';

class SelectStartAndEnd {
  constructor(element, grid, start, end, selectedCells, activeStep) {
    console.log(start, end, selectedCells, activeStep);
    const thisSelect = this;

    thisSelect.renderElement();
    thisSelect.getElement(element);
    thisSelect.initAction(selectedCells, grid, start, end, activeStep);
  }

  renderElement() {
    new RenderElement(handlebarsData.headerTwo, handlebarsData.buttonTwo);
  }

  getElement(element) {
    const thisSelect = this;

    thisSelect.dom = {
      grid: element.querySelector(select.containerOf.grid),
      headerTwo: element.querySelector(select.containerOf.stepHeader),
      buttonTwo: element.querySelector(select.buttons.compute),
    };
  }

  initAction(selectedCells, grid, start, end, activeStep) {
    const thisSelect = this;

    thisSelect.dom.grid.addEventListener('click', function () {
      if (activeStep.stepValue == 2) {
        const data = thisSelect.getData();

        if (!thisSelect.checkIsCellSelected(data.cellId, selectedCells)
          && start.length == 0) {
          thisSelect.selectStart(data, start);
        } else if (!thisSelect.checkIsCellSelected(data.cellId, selectedCells)
          && start.length == 2
          && end.length == 0
          && (start[0] !== data.cellRow || start[1] !== data.cellCol)) {
          thisSelect.selectEnd(grid, data, end);
        }
      }
      console.log(start, end);
    });
    thisSelect.dom.buttonTwo.addEventListener('click', function () {
      thisSelect.dom.headerTwo.remove();
      thisSelect.dom.buttonTwo.remove();

      activeStep.changeStep = 3;
    });
    
  }

  getData() {
    const clickedElement = event.target;

    const cellData = {
      cellId: parseInt(clickedElement.getAttribute('id')),
      cellCol: parseInt(clickedElement.getAttribute('col')),
      cellRow: parseInt(clickedElement.getAttribute('row')),
    };
    return cellData;
  }

  checkIsCellSelected(cellId, selectedCells) {
    const indexOfCellId = selectedCells.indexOf(cellId);

    if (indexOfCellId == -1) {
      return true;
    }
  }

  selectStart(data, start) {
    const clickedElement = event.target;

    clickedElement.classList.add(classNames.grid.starCell);

    start.push(data.cellRow, data.cellCol);
  }

  selectEnd(grid, data, end) {
    const clickedElement = event.target;

    clickedElement.classList.add(classNames.grid.endCell);

    end.push(data.cellRow, data.cellCol);

    grid[data.cellRow][data.cellCol].state = 'goal';
  }
}

export default SelectStartAndEnd;