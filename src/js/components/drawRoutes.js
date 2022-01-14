import { select, classNames } from '../settings.js';

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

    thisDrawRoutes.dom.grid.addEventListener('click', function () {
      const clickedElement = event.target;

      event.preventDefault();

      console.log(clickedElement);
    });
  }
}

export default drawRoutes;