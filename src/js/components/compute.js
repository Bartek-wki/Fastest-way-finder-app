import { select, classNames, globalValue } from '../settings.js';


class compute {
  constructor(element) {
    const thisCompute = this;

    thisCompute.getElement(element);
    thisCompute.initAction();
  }

  getElement(element) {
    const thisCompute = this;

    thisCompute.dom = {};

    thisCompute.dom.grid = element.querySelector(select.grid.grid);
    thisCompute.dom.buttonTwoWrapper = element.querySelector(select.containerOf.buttons.compute);
    thisCompute.dom.headerTwoWrapper = element.querySelector(select.containerOf.headers.stepTwo);
    thisCompute.dom.buttonThreeWrapper = element.querySelector(select.containerOf.buttons.startAgain);
    thisCompute.dom.headerThreeWrapper = element.querySelector(select.containerOf.headers.stepThree);
    thisCompute.dom.buttonTwo = element.querySelector(select.buttons.compute);
  }

  initAction() {
    const thisCompute = this;

    thisCompute.dom.buttonTwo.addEventListener('click', function () {
      thisCompute.activeStepThree();
    });
  }

  activeStepThree() {
    const thisCompute = this;

    thisCompute.dom.buttonTwoWrapper.classList.remove(classNames.step.stepActive);
    thisCompute.dom.headerTwoWrapper.classList.remove(classNames.step.stepActive);
    thisCompute.dom.buttonThreeWrapper.classList.add(classNames.step.stepActive);
    thisCompute.dom.headerThreeWrapper.classList.add(classNames.step.stepActive);

    thisCompute.computeRoutes();
  }

  computeRoutes() {
    let grid = globalValue.grid;
    let start = globalValue.start;
    let end = globalValue.end;
    let row = grid.length;
    let col = grid[0].length;

    const safeNeighbor = function (r, c) {
      if (r < 0 || r >= row) return false;
      if (c < 0 || c >= col) return false;
      if (grid[r][c].state == 'block') return false;
      
      return true;
    };

    const exploreLocation = function (location) {
      let r = location.r;
      let c = location.c;
      let allNeighbors = [];

      //left
      if (safeNeighbor(r, c - 1)) allNeighbors.push({ r: r, c: c - 1 });
      //right
      if (safeNeighbor(r, c + 1)) allNeighbors.push({ r: r, c: c + 1 });
      //top
      if (safeNeighbor(r - 1, c)) allNeighbors.push({ r: r - 1, c: c });
      //bottom
      if (safeNeighbor(r + 1, c)) allNeighbors.push({ r: r + 1, c: c });
      
      return allNeighbors;
    };

    const findPath = function () {
      var location = {
        r: start[0],
        c: start[1],
      };
      var queue = [];
      queue.push(location);
      while (queue.length) {
        var currentLocation = queue.shift();

        if (currentLocation.r == end[0] && currentLocation.c == end[1])
          return currentLocation;
        grid[currentLocation.r][currentLocation.c].state = 'visited';
        var neighbors = exploreLocation(currentLocation);

        for (let neighbor of neighbors)
        {
          if(grid[neighbor.r][neighbor.c].state != 'visited')
          {
            queue.push(neighbor);
            grid[neighbor.r][neighbor.c]['parent'] = currentLocation;
          }
        }
      }
      return false;
    };

    const printPath = function (path) {
      let paths = [path];
      /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
      while (true) {
        let r = path.r;
        let c = path.c;
        let parent = grid[r][c].parent;
        if (parent == undefined)
          break;
        paths.push(parent);
        path = { r: parent.r, c: parent.c };
      }
      for (let path of paths) {
        const findCell = document.querySelector('div[row="' + path.r + '"][col="' + path.c + '"]');
        findCell.classList.add(classNames.grid.starCell);
      }
    };

    

    let path = findPath();
    printPath(path);
  }
}

export default compute;