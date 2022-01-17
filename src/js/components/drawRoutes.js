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

    thisDrawRoutes.dom.grid.addEventListener('click', thisDrawRoutes.selectCell);
  }

  selectCell() {
    const activeHeader = document.querySelector(select.containerOf.headers.stepOne);
    
    if (activeHeader.classList.contains(classNames.step.stepActive)) {
      const clickedElement = event.target;
      event.preventDefault();

      let cellId = clickedElement.getAttribute('id');
      cellId = parseInt(cellId);

      const indexOfCellId = globalValue.selectedCell.indexOf(cellId);
      const indexOfLeftNeighbor = globalValue.selectedCell.indexOf(cellId - 1);
      const indexOfUpperNeighbor = globalValue.selectedCell.indexOf(cellId - 10);
      const indexOfRightNeighbor = globalValue.selectedCell.indexOf(cellId + 1);
      const indexOfLowerNeighbor = globalValue.selectedCell.indexOf(cellId + 10);
      const neighbors = [];
      const activeNeighbors = [];

      const col = clickedElement.getAttribute('col');
      const row = clickedElement.getAttribute('row');
      
      neighbors.push((cellId - 1), (cellId - 10), (cellId + 1), (cellId + 10));

      for (let neighbor of neighbors) {
        const cell = document.querySelector('div[id="' + neighbor + '"]');

        if (cell.classList.contains(classNames.grid.selectedCell)) {
          activeNeighbors.push(neighbor);
        }
      }


      if (indexOfCellId == -1
        && (globalValue.selectedCell.length == 0
        || indexOfLeftNeighbor !== -1
        || indexOfUpperNeighbor !== -1
        || indexOfRightNeighbor !== -1
        || indexOfLowerNeighbor !== -1)) {
        globalValue.selectedCell.push(cellId);

        clickedElement.classList.add(classNames.grid.selectedCell);

        changeGrid.addToGrid(row, col);
      } else if (indexOfCellId !== -1 && activeNeighbors.length <= 1) {
        globalValue.selectedCell.splice(indexOfCellId, 1);
        
        clickedElement.classList.remove(classNames.grid.selectedCell);

        changeGrid.removeFromGrid(row, col);
      } else {
        alert('This cell cannot be selected');
      }
    }
  }
}

export default drawRoutes;