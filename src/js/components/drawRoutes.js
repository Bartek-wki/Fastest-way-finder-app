import { select, globalValue, classNames } from '../settings.js';
import { changeGrid } from './changeGrid.js';

class drawRoutes {
  constructor(element) {
    const thisDrawRoutes = this;
    
    thisDrawRoutes.getElement(element);
    thisDrawRoutes.activeDrawRoutes();
    thisDrawRoutes.initAction();

  }

  getElement(element) {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom = {};

    thisDrawRoutes.dom.grid = element.querySelector(select.grid.grid);
    thisDrawRoutes.dom.headerOne = element.querySelector(select.containerOf.headers.stepOne);
  }

  activeDrawRoutes() {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom.headerOne.classList.add(classNames.step.stepActive);
  }

  initAction() {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom.grid.addEventListener('click', function () {
      thisDrawRoutes.getData();
    });
  }

  getData() {
    const thisDrawRoutes = this;

    const activeHeader = document.querySelector(select.containerOf.headers.stepOne);
    
    if (activeHeader.classList.contains(classNames.step.stepActive)) {
      const clickedElement = event.target;
      event.preventDefault();

      thisDrawRoutes.cellId = clickedElement.getAttribute('id');
      thisDrawRoutes.cellId = parseInt(thisDrawRoutes.cellId);

      thisDrawRoutes.indexOfCellId = globalValue.selectedCell.indexOf(thisDrawRoutes.cellId);
      thisDrawRoutes.indexOfLeftNeighbor = globalValue.selectedCell.indexOf(thisDrawRoutes.cellId - 1);
      thisDrawRoutes.indexOfUpperNeighbor = globalValue.selectedCell.indexOf(thisDrawRoutes.cellId - 10);
      thisDrawRoutes.indexOfRightNeighbor = globalValue.selectedCell.indexOf(thisDrawRoutes.cellId + 1);
      thisDrawRoutes.indexOfLowerNeighbor = globalValue.selectedCell.indexOf(thisDrawRoutes.cellId + 10);
      thisDrawRoutes.cellCol = clickedElement.getAttribute('col');
      thisDrawRoutes.cellRow = clickedElement.getAttribute('row');

      thisDrawRoutes.selectCell();
    }
  }

  checkNeighbors() {
    const thisDrawRoutes = this;

    thisDrawRoutes.neighbors = [];
    thisDrawRoutes.activeNeighbors = [];

    thisDrawRoutes.neighbors.push((thisDrawRoutes.cellId - 1),
      (thisDrawRoutes.cellId - 10),
      (thisDrawRoutes.cellId + 1),
      (thisDrawRoutes.cellId + 10));

    for (let neighbor of thisDrawRoutes.neighbors) {
      const cell = document.querySelector('div[id="' + neighbor + '"]');

      if (cell.classList.contains(classNames.grid.selectedCell)) {
        thisDrawRoutes.activeNeighbors.push(neighbor);
      }
    }

    return thisDrawRoutes.activeNeighbors.length;
  }

  selectCell() {
    const thisDrawRoutes = this;
    const clickedElement = event.target;

    if (thisDrawRoutes.indexOfCellId == -1
      && (globalValue.selectedCell.length == 0
        || thisDrawRoutes.indexOfLeftNeighbor !== -1
        || thisDrawRoutes.indexOfUpperNeighbor !== -1
        || thisDrawRoutes.indexOfRightNeighbor !== -1
        || thisDrawRoutes.indexOfLowerNeighbor !== -1)) {
      globalValue.selectedCell.push(thisDrawRoutes.cellId);

      clickedElement.classList.add(classNames.grid.selectedCell);

      changeGrid.addToGrid(thisDrawRoutes.cellRow, thisDrawRoutes.cellCol);

      
    } else if (thisDrawRoutes.indexOfCellId !== -1 && thisDrawRoutes.checkNeighbors() <= 1) {
      globalValue.selectedCell.splice(thisDrawRoutes.indexOfCellId, 1);
    
      clickedElement.classList.remove(classNames.grid.selectedCell);

      changeGrid.removeFromGrid(thisDrawRoutes.cellRow, thisDrawRoutes.cellCol);
    } else {
      alert('This cell cannot be selected');
    }
  }
}

export default drawRoutes;