import { select, classNames, innerHTMLData} from '../settings.js';

class SelectStartAndEnd {
  constructor(element, grid, start, end, selectedCells, statusOfStepTwo, statusOfStepThree) {
    const thisSelect = this;

    thisSelect.getElement(element);
    //thisSelect.renderElement();
    thisSelect.initAction(selectedCells, grid, start, end, statusOfStepTwo);
    
    statusOfStepTwo.registerNewListener(function () {
      thisSelect.renderElement();
      thisSelect.changeStep(statusOfStepTwo, statusOfStepThree, start, end);
    });
  }

  getElement() {
    const thisSelect = this;

    thisSelect.dom = {
      grid: document.querySelector(select.containerOf.grid),
      header: document.querySelector(select.containerOf.stepHeader),
      button: document.querySelector(select.button),
    };
  }

  renderElement() {
    const thisSelect = this;

    thisSelect.dom.header.innerHTML = innerHTMLData.headerTwo.headerTitle;
    thisSelect.dom.button.innerHTML = innerHTMLData.buttonTwo.buttonTitle;
  }

  initAction(selectedCells, grid, start, end, statusOfStepTwo) {
    const thisSelect = this;

    thisSelect.dom.grid.addEventListener('click', function () {
      if (statusOfStepTwo.stepStatus == 'active') {
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
  }

  changeStep(statusOfStepTwo, statusOfStepThree, start, end) {
    const thisSelect = this;
    thisSelect.dom.button.addEventListener('click', function () {
      if (statusOfStepTwo.stepStatus == 'active' && start.length == 2 && end.length == 2) {
        statusOfStepTwo.stepStatus = 'inactive';
        statusOfStepThree.changeStep = 'active';
      }
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