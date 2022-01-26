import { select, classNames, handlebarsData } from '../settings.js';
import RenderElement from './RenderElement.js';
import Grid from './Grid.js';

class Compute {
  constructor(element, grid, start, end, activeStep, selectedCells) {
    console.log('Hi!');
    const thisCompute = this;
    
    thisCompute.renderElement();
    thisCompute.getElement(element);
    thisCompute.initAction(activeStep, selectedCells);
    thisCompute.computeRoutes(grid, start, end);
  }
  
  renderElement() {
    new RenderElement(handlebarsData.headerThree, handlebarsData.buttonThree);
  }

  getElement(element) {
    const thisCompute = this;

    thisCompute.dom = {
      grid: element.querySelector(select.containerOf.grid),
      headerThree: element.querySelector(select.containerOf.stepHeader),
      buttonThree: element.querySelector(select.buttons.startAgain),
      cells: element.querySelectorAll(select.grid.cell),
    };
  }

  initAction(activeStep, selectedCells) {
    const thisCompute = this;

    thisCompute.dom.buttonThree.addEventListener('click', function () {
      thisCompute.dom.headerThree.remove();
      thisCompute.dom.buttonThree.remove();
      for (let cell of thisCompute.dom.cells) {
        cell.remove();
      }
      
      //selectedCells = [];
      activeStep.changeStep = 1;
    });
  }

  computeRoutes(grid, start, end) {
    let amountOfRow = grid.length;
    let amountOfCol = grid[0].length;

    const isSafeNeighbor = function (row, col) {
      if (row < 0 || row >= amountOfRow) {
        return false;
      }
      if (col < 0 || col >= amountOfCol) {
        return false;
      }
      if (grid[row][col].state == 'block') {
        return false;
      }
      
      return true;
    };

    const exploreLocation = function (location) {
      let row = location.row;
      let col = location.col;
      let allNeighbors = [];

      //left
      if (isSafeNeighbor(row, col - 1)) {
        allNeighbors.push({ row: row, col: col - 1 });
      } 
      //right
      if (isSafeNeighbor(row, col + 1)) {
        allNeighbors.push({ row: row, col: col + 1 });
      } 
      //top
      if (isSafeNeighbor(row - 1, col)) {
        allNeighbors.push({ row: row - 1, col: col });
      } 
      //bottom
      if (isSafeNeighbor(row + 1, col)) {
        allNeighbors.push({ row: row + 1, col: col });
      } 
      
      return allNeighbors;
    };

    const markCell = function () {
      const location = {
        row: start[0],
        col: start[1],
      };
      const queue = [];
      queue.push(location);
      while (queue.length) {
        const currentLocation = queue.shift();

        if (currentLocation.row == end[0] && currentLocation.col == end[1]) {
          return currentLocation;
        }
        grid[currentLocation.row][currentLocation.col].state = 'visited';
        const neighbors = exploreLocation(currentLocation);

        for (let neighbor of neighbors)
        {
          if(grid[neighbor.row][neighbor.col].state != 'visited')
          {
            queue.push(neighbor);
            grid[neighbor.row][neighbor.col]['parent'] = currentLocation;
          }
        }
      }
      return false;
    };

    const findPath = function (markedPath) {
      let paths = [markedPath];
      /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
      while (true) {
        let row = markedPath.row;
        let col = markedPath.col;
        let parent = grid[row][col].parent;
        if (parent == undefined) {
          break;
        }
        paths.push(parent);
        markedPath = { row: parent.row, col: parent.col };
      }

      return paths;
    };

    const printPath = function (paths) {
      for (let path of paths) {
        const findCell = document.querySelector('div[row="' + path.row + '"][col="' + path.col + '"]');
        findCell.classList.add(classNames.grid.starCell);
      }
    };

    const markedPath = markCell();
    const paths = findPath(markedPath);
    printPath(paths);
  }
}

export default Compute;