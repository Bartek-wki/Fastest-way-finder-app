import { select, classNames, templates, handlebarsData } from '../settings.js';
import { utils } from '../utils.js';

class DrawRoutes {
  constructor(element, grid, selectedCells, activeStep) {
    const thisDrawRoutes = this;
    
    thisDrawRoutes.renderElement();
    thisDrawRoutes.getElement(element, grid);
    thisDrawRoutes.initAction(element, selectedCells, grid, activeStep);
    console.log(activeStep);
  }

  

  renderElement() {
    const thisDrawRoutes = this;

    // render header one
    const generatedHeaderHTML = templates.header(handlebarsData.headerOne);
    thisDrawRoutes.headerOne = utils.createDOMFromHTML(generatedHeaderHTML);
    const headerWrapper = document.querySelector(select.containerOf.header);
    headerWrapper.appendChild(thisDrawRoutes.headerOne);

    // render button one
    const generatedButtonHTML = templates.button(handlebarsData.buttonOne);
    thisDrawRoutes.buttonOne = utils.createDOMFromHTML(generatedButtonHTML);
    const buttonWrapper = document.querySelector(select.containerOf.button);
    buttonWrapper.appendChild(thisDrawRoutes.buttonOne);
  }

  getElement(element, grid) {
    const thisDrawRoutes = this;

    thisDrawRoutes.dom = {};

    thisDrawRoutes.dom.grid = element.querySelector(select.containerOf.grid);
    //thisDrawRoutes.dom.buttonOne = element.querySelector(select.buttons.finishDrawing);
  }

  initAction(element, selectedCells, grid, activeStep) {
    const thisDrawRoutes = this;
    thisDrawRoutes.dom.grid.addEventListener('click', function () {
      if (activeStep == 1) {
        const data = thisDrawRoutes.getData();
        if (thisDrawRoutes.checkIsCellSelected(data.cellId, selectedCells)) {
          thisDrawRoutes.selectCell(data, selectedCells, grid);
        } else if (!thisDrawRoutes.checkIsCellSelected(data.cellId, selectedCells)) {
          thisDrawRoutes.unselectCell(data, selectedCells, grid);
        }
      }
      console.log(grid, selectedCells);
    });
    thisDrawRoutes.buttonOne.addEventListener('click', function () {
      activeStep = 2;
    });
    console.log(thisDrawRoutes.buttonOne);
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