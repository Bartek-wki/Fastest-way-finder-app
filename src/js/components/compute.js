import { select, classNames, innerHTMLData} from '../settings.js';

class Compute {
  constructor(element, grid, start, end, selectedCells, statusOfStepThree, statusOfStepZero) {
    const thisCompute = this;

    thisCompute.getElement(element);
    
    statusOfStepThree.registerNewListener(function () {
      thisCompute.renderElement();
      thisCompute.computeRoutes(grid, start, end);
      thisCompute.initAction(statusOfStepThree, statusOfStepZero, start, end);
    });
  }

  getElement() {
    const thisCompute = this;

    thisCompute.dom = {
      grid: document.querySelector(select.containerOf.grid),
      header: document.querySelector(select.containerOf.stepHeader),
      button: document.querySelector(select.button),
    };
  }

  renderElement() {
    const thisCompute = this;

    thisCompute.dom.header.innerHTML = innerHTMLData.headerThree.headerTitle;
    thisCompute.dom.button.innerHTML = innerHTMLData.buttonThree.buttonTitle;
  }

  initAction(statusOfStepThree, statusOfStepZero) {
    const thisCompute = this;
    thisCompute.dom.button.addEventListener('click', function () {
      console.log('ok');

      if (statusOfStepThree.stepStatus == 'active') {
        statusOfStepThree.stepStatus = 'inactive';
        statusOfStepZero.changeStep = 'active';
      }
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