import { select, classNames, handlebarsData } from '../settings.js';
import RenderElement from './RenderElement.js';

class DrawRoutes {
  constructor(element, grid, selectedCells, activeStep) {
    const thisDrawRoutes = this;
    
    thisDrawRoutes.renderElement();
    thisDrawRoutes.getElement(element);
    thisDrawRoutes.initAction(selectedCells, grid, activeStep);
  }

  renderElement() {
    new RenderElement(handlebarsData.headerOne, handlebarsData.buttonOne);
  }

  getElement(element) {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom = {
      grid: element.querySelector(select.containerOf.grid),
      headerOne: element.querySelector(select.containerOf.stepHeader),
      buttonOne: element.querySelector(select.buttons.finishDrawing),
    };
  }

  initAction(selectedCells, grid, activeStep) {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom.grid.addEventListener('click', function () {
      if (activeStep.stepValue == 1) {
        const data = thisDrawRoutes.getData();

        if (thisDrawRoutes.checkIsCellSelected(data.cellId, selectedCells)) {
          thisDrawRoutes.selectCell(data, selectedCells, grid);
        } else if (!thisDrawRoutes.checkIsCellSelected(data.cellId, selectedCells)) {
          thisDrawRoutes.unselectCell(data, selectedCells, grid);
        }
      }
      console.log(selectedCells);
    });
    thisDrawRoutes.dom.buttonOne.addEventListener('click', function () {
      thisDrawRoutes.dom.headerOne.remove();
      thisDrawRoutes.dom.buttonOne.remove();

      activeStep.changeStep = 2;
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
    console.log(activeNeighbors);
    return activeNeighbors;
  }

  selectCell(data, selectedCells, grid) {
    const thisDrawRoutes = this;
    const clickedElement = event.target;

    if (selectedCells.length == 0
      || thisDrawRoutes.checkActiveNeighbors(data.cellId, selectedCells)) {
      selectedCells.push(data.cellId);

      clickedElement.classList.add(classNames.grid.selectedCell);

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