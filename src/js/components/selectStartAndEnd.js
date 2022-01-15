import { select, globalValue, classNames } from '../settings.js';

class selectStartAndEnd {
  constructor(element) {
    const thisSelect = this;

    thisSelect.getElement(element);
    thisSelect.initAction();
  }

  getElement(element) {
    const thisSelect = this;

    thisSelect.dom = {};

    thisSelect.dom.grid = element.querySelector(select.grid.grid);
    thisSelect.dom.buttonOne = element.querySelector(select.buttons.finishDrawing);

    console.log(thisSelect.dom);
  }

  initAction() {
    const thisSelect = this;

    thisSelect.dom.buttonOne.addEventListener('click', thisSelect.selectStart);
  }

  selectStart() {
    const clickedElement = event.target;
    event.preventDefault();

    
  }
}

export default selectStartAndEnd;