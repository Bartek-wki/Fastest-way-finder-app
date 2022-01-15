import { select, globalValue, classNames } from '../settings.js';
import { changeGrid } from './changeGrid.js';

class drawRoutes {
  constructor(element) {
    const thisDrawRoutes = this;
    
    thisDrawRoutes.getElement(element);
    thisDrawRoutes.initAction();

  }

  getElement(element) {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom = {};

    thisDrawRoutes.dom.grid = element.querySelector(select.grid.grid);

    console.log(thisDrawRoutes.dom);
  }

  initAction() {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom.grid.addEventListener('click', thisDrawRoutes.selectCell);
  }

  selectCell() {
    const clickedElement = event.target;
    event.preventDefault();

    let cellId = clickedElement.getAttribute('id');
    cellId = parseInt(cellId);

    const indexOfCellId = globalValue.selectedCell.indexOf(cellId);
    const indexOfLeftNeighbor = globalValue.selectedCell.indexOf(cellId - 1);
    const indexOfUpperNeighbor = globalValue.selectedCell.indexOf(cellId - 10);
    const indexOfRightNeighbor = globalValue.selectedCell.indexOf(cellId + 1);
    const indexOfLowerNeighbor = globalValue.selectedCell.indexOf(cellId + 10);

    const col = clickedElement.getAttribute('col');
    const row = clickedElement.getAttribute('row');

    if (indexOfCellId == -1
      && (globalValue.selectedCell.length == 0
      || indexOfLeftNeighbor !== -1
      || indexOfUpperNeighbor !== -1
      || indexOfRightNeighbor !== -1
      || indexOfLowerNeighbor !== -1)) {
      console.log(cellId);
      globalValue.selectedCell.push(cellId);

      clickedElement.classList.add(classNames.grid.selectedCell);

      changeGrid.addToGrid(col, row);
    } else if (indexOfCellId !== -1) {
      globalValue.selectedCell.splice(indexOfCellId, 1);
      
      clickedElement.classList.remove(classNames.grid.selectedCell);

      changeGrid.removeFromGrid(col, row);
    } else {
      alert('This cell cannot be selected');
    }
    
    console.log(globalValue.selectedCell);

  }
}

export default drawRoutes;