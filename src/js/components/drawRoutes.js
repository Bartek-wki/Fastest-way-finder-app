import { select, classNames, innerHTMLData} from '../settings.js';

class DrawRoutes {
  constructor(element, grid, selectedCells, statusOfStepOne, statusOfStepTwo, start, end) {
    const thisDrawRoutes = this;

    thisDrawRoutes.getElement(element);
    //thisDrawRoutes.renderElement();
    thisDrawRoutes.initAction(selectedCells, grid, statusOfStepOne);

    statusOfStepOne.registerNewListener(function () {
      thisDrawRoutes.renderElement();
      thisDrawRoutes.changeStep(statusOfStepOne, statusOfStepTwo, start, end);
    });
  }

  getElement() {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom = {
      grid: document.querySelector(select.containerOf.grid),
      header: document.querySelector(select.containerOf.stepHeader),
      button: document.querySelector(select.button),
    };
  }

  renderElement() {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom.header.innerHTML = innerHTMLData.headerOne.headerTitle;
    thisDrawRoutes.dom.button.innerHTML = innerHTMLData.buttonOne.buttonTitle;
  }

  initAction(selectedCells, grid, statusOfStepOne) {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom.grid.addEventListener('click', function () {
      if (statusOfStepOne.stepStatus == 'active') {
        const data = thisDrawRoutes.getData();

        if (thisDrawRoutes.checkIsCellSelected(data.cellId, selectedCells)) {
          thisDrawRoutes.selectCell(data, selectedCells, grid);
        } else if (!thisDrawRoutes.checkIsCellSelected(data.cellId, selectedCells)) {
          thisDrawRoutes.unselectCell(data, selectedCells, grid);
        }
      }
      console.log(selectedCells);
    });
   
  }

  changeStep(statusOfStepOne, statusOfStepTwo, start, end) {
    const thisDrawRoutes = this;
    console.log('ok3');
    thisDrawRoutes.dom.button.addEventListener('click', function () {
      if (statusOfStepOne.stepStatus == 'active' && start.length == 0 && end.length == 0) {
        statusOfStepOne.stepStatus = 'inactive';
        statusOfStepTwo.changeStep = 'active';
      }
    });
  }

  getData() {
    const clickedElement = event.target;
    event.preventDefault();

    const cellData = {
      cellId: parseInt(clickedElement.getAttribute('id')),
      cellCol: clickedElement.getAttribute('col'),
      cellRow: clickedElement.getAttribute('row'),
    };
    return cellData;
  }

  checkIsCellSelected(cellId, selectedCells) {
    const indexOfCellId = selectedCells.indexOf(cellId);

    if (indexOfCellId == -1) {
      return true;
    }
  }

  checkActiveNeighbors(cellId, selectedCells) {
    if (selectedCells.indexOf(cellId - 1) !== -1
      || selectedCells.indexOf(cellId + 1) !== -1
      || selectedCells.indexOf(cellId - 10) !== -1
      || selectedCells.indexOf(cellId + 10) !== -1) {
      return true;
    }
  }

  findActiveNeighbors(cellId, selectedCells) {
    const activeNeighbors = [];
    console.log(cellId);
    console.log(cellId - 10);

    if (selectedCells.indexOf(cellId - 1) !== -1) {
      activeNeighbors.push(cellId - 1);
    }
    if (selectedCells.indexOf(cellId + 1) !== -1) {
      activeNeighbors.push(cellId + 1);
    }
    if (selectedCells.indexOf(cellId - 10) !== -1) {
      activeNeighbors.push(cellId - 10);
    }
    if (selectedCells.indexOf(cellId + 10) !== -1) {
      activeNeighbors.push(cellId + 10);
    }
    return activeNeighbors;
  }

  selectCell(data, selectedCells, grid) {
    const thisDrawRoutes = this;
    const clickedElement = event.target;

    if (selectedCells.length == 0
      || thisDrawRoutes.checkActiveNeighbors(data.cellId, selectedCells)) {
      selectedCells.push(data.cellId);

      clickedElement.classList.add(classNames.grid.selectedCell);
      console.log('Hi!');

      grid[data.cellRow][data.cellCol].state = 'empty';   
    } else {
      alert('This cell cannot be selected');
    }
  }

  unselectCell(data, selectedCells, grid) {
    const thisDrawRoutes = this;
    const clickedElement = event.target;

    if (thisDrawRoutes.findActiveNeighbors(data.cellId, selectedCells).length <= 1) {
      const indexOfCellId = selectedCells.indexOf(data.cellId);
      selectedCells.splice(indexOfCellId, 1);
    
      clickedElement.classList.remove(classNames.grid.selectedCell);

      grid[data.cellRow][data.cellCol].state = 'block';
    } else {
      alert('This cell cannot be unselected');
    }
  }
}

export default DrawRoutes;